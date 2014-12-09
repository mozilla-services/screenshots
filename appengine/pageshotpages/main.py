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
import webapp2
import json
import os
from google.appengine.ext import ndb
import re
import urllib
import cgi


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

scripts = '''
<link rel="stylesheet" href="BASE/css/interface.css">
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="BASE/js/interface.js"></script>
'''

scripts_with_newframe = scripts + '''
<script src="BASE/js/newframe.js"></script>
'''


class NewFrameHandler(webapp2.RequestHandler):

    def get(self):
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "frame.html")) as fp:
            frame = fp.read()
        here_scripts = scripts_with_newframe.replace("BASE", self.request.host_url)
        vars = dict(
            __TITLE__="",
            __METAHEAD__="",
            __SCRIPT__=here_scripts,
            __LINK__="",
            __LINK_TEXT="",
            __IFRAME_SRC__=self.request.host_url + "/newpage.html",
            __SHORTCUT_ICON="",
            __SCREENSHOT__="",
            __SNIPPET__="",
            )
        for name, value in vars.iteritems():
            value = value or ""
            frame = frame.replace(name, value)
        self.response.write(frame)


class NewPageHandler(webapp2.RequestHandler):

    def get(self):
        with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "newpage.html")) as fp:
            content = fp.read()
        here_scripts = scripts.replace("BASE", self.request.host_url)
        content = content.replace("SCRIPT", here_scripts)
        self.response.write(content)


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
            print prefix, self.request.path_info
            ## FIXME: quoting isn't quite right here:
            data = PageData.get_path('/data' + self.request.path_info)
            if not data:
                print "nothing matched", repr("/data" + self.request.path_info)
                self.response.status = 404
                return
            data_content = json.loads(data.content)
            meta = PageData.get_path('/meta' + self.request.path_info)
            if meta:
                meta = json.loads(meta.content)
            else:
                print "no meta", repr('/meta' + self.request.path_info)
                meta = {}
            here_scripts = scripts.replace("BASE", self.request.host_url)
            snippet = meta.get("snippet") or ""
            if snippet:
                snippet = '<meta id="meta-snippet" property="og:image" content="' + snippet + '">\n'
            bodyAttrs = serialize_attributes(data_content.get("bodyAttrs", []))
            htmlAttrs = serialize_attributes(data_content.get("htmlAttrs", []))
            html = (
                '<!DOCTYPE html>\n' +
                '<html' + htmlAttrs + '>\n' +
                '<head>\n' +
                '<base href="' + data_content["location"] + '" target="_top">\n' +
                here_scripts +
                "<!--METADATA-->" +
                meta.get("head", "") +
                "<!--ENDMETA-->" +
                data_content["head"] +
                '<meta property="og:image" content="' + data_content["screenshot"] + '">\n' +
                snippet +
                '</head>\n' +
                '<body' + bodyAttrs + '>\n' +
                data_content["body"] +
                '<div id="pageshot-meta">' + meta.get("body", "") + '</div>' +
                '</body></html>')
            self.response.write(html)
        else:
            with open(os.path.join(os.path.dirname(__file__), "frame.html")) as fp:
                frame = fp.read()
            data = PageData.get_path("/data" + self.request.path_info)
            if not data:
                self.response.status = 404
                return
            data_content = json.loads(data.content)
            meta = PageData.get_path("/meta" + self.request.path_info)
            if meta:
                meta = json.loads(meta.content)
            else:
                meta = {}
            link_text = data_content["location"]
            link_text = re.sub(r"^https?://", "", link_text, flags=re.I)
            link_text = re.sub(r"/*$", "", link_text)
            here_scripts = scripts.replace("BASE", self.request.host_url)
            snippet = ""
            if meta.get("snippet"):
                ## FIXME: I'm a terrible person:
                snippet = '<meta id="meta-snippet" property="og:image" content="' + meta["snippet"] + '">\n'
            vars = dict(
                __TITLE__=meta.get("title") or data_content["location"],
                __METAHEAD__=meta.get("framehead"),
                __LINK__=data_content["location"],
                __LINK_TEXT__=link_text,
                __IFRAME_SRC__="/content" + urllib.quote(self.request.path_info, "/~$+"),
                __SCRIPT__=here_scripts,
                __SHORTCUT_ICON__=data_content.get("favicon"),
                __SCREENSHOT__=data_content.get("screenshot"),
                __SNIPPET__=snippet,
                )
            for var, value in vars.iteritems():
                value = str(value or "")
                frame = frame.replace(var, value)
            self.response.write(frame)

    def put(self):
        data = PageData.get_path(self.request.path)
        body = json.loads(self.request.body)
        peek = self.request.path_info_peek()
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
