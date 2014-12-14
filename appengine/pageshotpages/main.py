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
import urlparse


frame_html = tempita.HTMLTemplate.from_filename(os.path.join(base, "frame.html"))
content_html = tempita.HTMLTemplate.from_filename(os.path.join(base, "content.html"))
readable_html = tempita.HTMLTemplate.from_filename(os.path.join(base, "readable.html"))
collection_html = tempita.HTMLTemplate.from_filename(os.path.join(base, "collection.html"))


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

    @classmethod
    def get_collection_items(cls, name):
        data = cls.get_path("/collection-list/" + name)
        if not data:
            return []
        data = json.loads(data.content)
        return data


class PageTags(ndb.Model):

    path = ndb.StringProperty()
    tag = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def pages_for_tag(cls, tag):
        query = cls.query(cls.tag == tag)
        pages = query.fetch(1000, projection=[cls.path])
        return [page.path for page in pages]

    @classmethod
    def tags_for_page(cls, path):
        query = cls.query(cls.path == path)
        tags = query.fetch(500, projection=[cls.tag])
        return [tag.tag for tag in tags]

    @classmethod
    def associate(cls, path, tag):
        asc = cls(path=path, tag=tag)
        asc.put()

    @classmethod
    def disassociate(cls, path, tag):
        query = cls.query(ndb.AND(cls.path == path, cls.tag == tag))
        for asc in query:
            asc.key.delete()

    @classmethod
    def set_tags(cls, path, tags):
        query = cls.query(cls.path == path)
        for tag in query.fetch(500, projection=[cls.tag]):
            if tag.tag in tags:
                tags.remove(tag.tag)
            else:
                tag.key.delete()
        for tag in tags:
            cls.associate(path, tag)


class NewFrameHandler(webapp2.RequestHandler):

    def get(self):
        html = frame_html.substitute(
            data={},
            meta={},
            link_text=None,
            base=self.request.host_url,
            iframe_src=self.request.host_url + "/newpage.html",
            iframe_readable_src=None,
            comment="",
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
        if prefix in ('data', 'meta', 'collection-list'):
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
        elif prefix == "tag":
            self.request.path_info_pop()
            collection_name = self.request.path_info.strip("/")
            items = []
            for item_name in PageTags.pages_for_tag(collection_name):
                data, meta = PageData.get_data(item_name)
                if not data:
                    print "Error: no page with name %r" % item_name
                    continue
                images = []
                if data.get("screenshot"):
                    images.append({
                            "src": data["screenshot"],
                            "title": "Screenshot",
                            })
                images.extend(data["images"])
                if meta.get("activeImage") >= len(images):
                    meta["activeImage"] = 0
                items.append([item_name, data, meta, images])
            if not items:
                self.response.status = 404
                self.response.write("No such collection")
                return
            html = collection_html.substitute(
                collection_name=collection_name,
                items=items,
                base=self.request.host_url,
                images=images,
                htmlize=htmlize,
                domain=domain,
                json=json,
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
            comment = ""
            if "comment" in meta:
                comment = htmlize(meta["comment"])
                print "in", meta["comment"], "out", comment
            html = frame_html.substitute(
                data=data,
                meta=meta,
                base=self.request.host_url,
                link_text=link_text,
                iframe_src="/content" + urllib.quote(self.request.path_info),
                iframe_readable_src="/readable" + urllib.quote(self.request.path_info),
                comment=comment,
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
        if peek == "tags-for":
            self.request.path_info_pop()
            name = self.request.path_info
            PageTags.set_tags(name, json.loads(self.request.body))
            self.response.status = 204
            return
        elif peek not in ("meta", "data", "collection-list"):
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


def htmlize(text):
    text = cgi.escape(text)

    def link_repl(match):
        return '<a href="%s">%s</a>' % (match.group(0), match.group(0))

    def hashtag_repl(match):
        name = match.group(0)
        link = re.sub(r"^#", "", name)
        link = link.lower()
        link = re.sub(r"_", "-", link)
        return '<a class="tag" href="/tag/%s">%s</a>' % (link, name)

    text = re.sub(r"https?:\/\/[^\s\]\)]+", link_repl, text, flags=re.I)
    text = re.sub(r"\#[a-zA-Z0-9_\-]+", hashtag_repl, text)
    return text


def domain(link):
    return urlparse.urlsplit(link).netloc.split(":")[0]


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
