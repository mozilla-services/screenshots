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
import logging
from google.appengine.ext import ndb


class PageData(ndb.Model):
    """Models an individual Guestbook entry with content and date."""
    path = ndb.StringProperty()
    content = ndb.TextProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def get_path(cls, path):
        result = cls.query(cls.path == path)
        result = list(result)
        if result:
            return result[0]
        else:
            return None


class MainHandler(webapp2.RequestHandler):

    def get(self):
        if self.request.path_info_peek() in ('data', 'meta'):
            data = PageData.get_path(self.request.path)
            if data:
                self.response.write(data.content)
            else:
                self.response.status = 404
                return
        else:
            data = PageData.get_path('/data' + self.request.path)
            if not data:
                self.response.status = 404
                return
            data_content = json.loads(data.content)
            meta = PageData.get_path('/meta' + self.request.path)
            if meta:
                meta = json.loads(meta.content)
            else:
                meta = {}
            html = (
                '<!DOCTYPE html>\n' +
                '<html>\n' +
                '<head>\n' +
                '<base href="' + data_content["location"] + '">\n' +
                ('<script src="%s/js/interface.js"></script>\n' % self.request.host_url) +
                meta.get("head", "") +
                data_content["head"] +
                '</head>\n' +
                '<body>\n' +
                data_content["body"] +
                meta.get("body", "") +
                '</body></html>')
            self.response.write(html)

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
            data = PageData(path=self.request.path,
                            content=self.request.body)
            data.put()
        self.response.status = 204


app = webapp2.WSGIApplication([
    ('/.*', MainHandler)
], debug=True)
