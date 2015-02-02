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


class User(ndb.Model):
    nickname = ndb.StringProperty()
    name = ndb.StringProperty()
    path = ndb.StringProperty()


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
            readable=False,
            comment="",
            is_newpage=True,
            json=json,
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
                self.response.write("No %s for page" % prefix)
                return
        elif prefix == "content":
            self.request.path_info_pop()
            data, meta = PageData.get_data(self.request.path_info)
            if not data:
                self.response.status = 404
                self.response.write("No such page")
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
                self.response.write("No such page")
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
                microdatas = format_microdatas(data.get('microdata'))
                items.append([item_name, data, meta, images, microdatas])
            if not items:
                self.response.status = 404
                self.response.write("No such collection")
                return
            html = collection_html.substitute(
                collection_name=collection_name,
                is_collection=True,
                items=items,
                is_panel='panel' in self.request.query,
                show_microdata='microdata' in self.request.query,
                self_url=self.request.path_url,
                base=self.request.host_url,
                htmlize=htmlize,
                domain=domain,
                normalize_text=normalize_text,
                json=json,
                )
            self.response.write(html)
        elif prefix == "summary":
            self.request.path_info_pop()
            data, meta = PageData.get_data(self.request.path_info)
            if not data:
                self.response.status = 404
                self.response.write("No such page")
                return
            images = []
            if data.get("screenshot"):
                images.append({
                        "src": data["screenshot"],
                        "title": "Screenshot",
                        })
            images.extend(data["images"])
            microdatas = format_microdatas(data.get("microdata"))
            html = collection_html.substitute(
                is_collection=False,
                title=data['title'],
                items=[[self.request.path_info, data, meta, images, microdatas]],
                is_panel='panel' in self.request.query,
                show_microdata='microdata' in self.request.query,
                self_url=self.request.path_url,
                base=self.request.host_url,
                htmlize=htmlize,
                domain=domain,
                normalize_text=normalize_text,
                json=json,
                )
            self.response.write(html)
        elif prefix == "snippet":
            self.request.path_info_pop()
            data, meta = PageData.get_data(self.request.path_info)
            if not meta or not meta.get('snippet'):
                self.response.status = 404
                if not data:
                    self.response.write("No such page")
                else:
                    self.response.write("No such snippet")
                return
            s = meta['snippet']
            assert s.startswith('data:')
            s = s[5:]
            content_type, s = s.split(';', 1)
            assert s.startswith('base64,')
            s = s.split('base64,', 1)[1]
            body = s.decode('base64')
            self.response.content_type = str(content_type)
            self.response.write(body)
        elif prefix == "tags-for":
            self.request.path_info_pop()
            tags = PageTags.tags_for_page(self.request.path_info)
            self.response.content_type = "application/json"
            self.response.write(json.dumps(tags))
        else:
            data, meta = PageData.get_data(self.request.path_info)
            if not data:
                self.response.status = 404
                self.response.write("No such page")
                return
            link_text = data["location"]
            link_text = re.sub(r"^https?://", "", link_text, flags=re.I)
            link_text = re.sub(r"/*$", "", link_text)
            comment = ""
            if "comment" in meta:
                comment = htmlize(meta["comment"])
            readable = 'readable' in self.request.query
            html = frame_html.substitute(
                data=data,
                meta=meta,
                base=self.request.host_url,
                link_text=link_text,
                iframe_src="/content" + urllib.quote(self.request.path_info),
                iframe_readable_src="/readable" + urllib.quote(self.request.path_info),
                readable=readable,
                comment=comment,
                is_newpage=False,
                json=json,
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


def format_microdatas(datas):
    if not datas or not datas.get("items"):
        return []
    htmls = []
    for item in datas["items"]:
        types = item["type"]
        for type in types:
            type = type.lower()
            type = re.sub(r'[^a-z\-]', "", type)
            filename = os.path.join(base, "microformat", type + ".html")
            print "check for", type, filename

            def first(*names):
                val = item["properties"]
                for name in names:
                    print "search", name, val
                    if isinstance(val, list):
                        val = val[0]
                    val = val.get(name)
                    if not val:
                        return ""
                if isinstance(val, basestring):
                    return val
                return val[0]

            if os.path.exists(filename):
                tmpl = tempita.HTMLTemplate.from_filename(filename)
                htmls.append(tmpl.substitute(first=first, **item))
                break
    return htmls


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


def normalize_text(t):
    if not t:
        return ""
    t = re.sub(r'<.*?>', t, '')
    t = re.sub(r'\s+', t, ' ')
    t = t.strip()
    return t


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
