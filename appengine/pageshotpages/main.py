#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import sys
import os
base = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(base, "vendor"))
import webapp2
import json
import os
from google.appengine.ext import ndb
import re
import urllib
import cgi
import tempita


frame_html = tempita.HTMLTemplate.from_filename(os.path.join(base, "frame.html"))
content_html = tempita.HTMLTemplate.from_filename(os.path.join(base, "content.html"))
readable_html = tempita.HTMLTemplate.from_filename(os.path.join(base, "readable.html"))


class PageData(ndb.Model):
    """Models an individual Guestbook entry with content and date."""
    path = ndb.StringProperty()
    content = ndb.TextProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def get_path(cls, path):
        path = urllib.unquote(path)
        result = cls.query(cls.path == path)
        result = list(result)
        if result:
            return result[0]
        else:
            return None

    @classmethod
    def get_data(cls, path):
        data = cls.get_path("/data" + path)
        if not data:
            return None, None
        data = json.loads(data.content)
        meta = cls.get_path("/meta" + path)
        if meta:
            meta = json.loads(meta.content)
        else:
            meta = {}
        return data, meta


class NewFrameHandler(webapp2.RequestHandler):

    def get(self):
        html = frame_html.substitute(
            data={},
            meta={},
            link_text=None,
            base=self.request.host_url,
            iframe_src=self.request.host_url + "/newpage.html",
            iframe_readable_src=None,
            is_newpage=True,
            )
        self.response.write(html)


class NewPageHandler(webapp2.RequestHandler):

    def get(self):
        html = content_html.substitute(
            data={},
            meta={},
            base=self.request.host_url,
            is_newpage=True,
            htmlAttrs="",
            bodyAttrs="",
            )
        self.response.write(html)


class MainHandler(webapp2.RequestHandler):

    def get(self):
        prefix = self.request.path_info_peek()
        if prefix in ('data', 'meta'):
            data = PageData.get_path(self.request.path)
            if data:
                self.response.write(data.content)
            else:
                self.response.status = 404
                return
        elif prefix == "content":
            self.request.path_info_pop()
            data, meta = PageData.get_data(self.request.path_info)
            if not data:
                self.response.status = 404
                return
            bodyAttrs = serialize_attributes(data.get("bodyAttrs", []))
            htmlAttrs = serialize_attributes(data.get("htmlAttrs", []))
            html = content_html.substitute(
                data=data,
                meta=meta,
                base=self.request.host_url,
                bodyAttrs=bodyAttrs,
                htmlAttrs=htmlAttrs,
                is_newpage=False,
                )
            self.response.write(html)
        elif prefix == "readable":
            self.request.path_info_pop()
            data, meta = PageData.get_data(self.request.path_info)
            if not data:
                self.response.status = 404
                return
            html = readable_html.substitute(
                data=data,
                meta=meta,
                base=self.request.host_url,
                )
            self.response.write(html)
        else:
            data, meta = PageData.get_data(self.request.path_info)
            if not data:
                self.response.status = 404
                return
            link_text = data["location"]
            link_text = re.sub(r"^https?://", "", link_text, flags=re.I)
            link_text = re.sub(r"/*$", "", link_text)
            html = frame_html.substitute(
                data=data,
                meta=meta,
                base=self.request.host_url,
                link_text=link_text,
                iframe_src="/content" + urllib.quote(self.request.path_info),
                iframe_readable_src="/readable" + urllib.quote(self.request.path_info),
                is_newpage=False,
                )
            self.response.write(html)

    def put(self):
        data = PageData.get_path(self.request.path)
        body = json.loads(self.request.body)
        peek = self.request.path_info_peek()
        print "Saving %r kb of data" % (len(self.request.body) / 1000)
        if peek == "data":
            if 'head' not in body or 'body' not in body or 'location' not in body:
                self.response.status = 400
                self.response.write("Must include head, body, and location")
                return
        elif peek != "meta":
            self.response.status = 404
            return
        if data:
            data.content = self.request.body
            data.put()
        else:
            data = PageData(path=self.request.path_info,
                            content=self.request.body)
            print "Saving data", len(self.request.body)
            data.put()
        self.response.status = 204


def serialize_attributes(attrs):
    s = []
    for name, value in attrs:
        s.append('%s="%s"' % (name, cgi.escape(value)))
    return " ".join(s)

app = webapp2.WSGIApplication([
        (r'/newframe.html', NewFrameHandler),
        (r'/newpage\.html', NewPageHandler),
        ('/.*', MainHandler),
], debug=True)
