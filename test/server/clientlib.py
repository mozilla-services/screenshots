import os
import re
import contextlib
import requests
from urlparse import urljoin
import json
import uuid
import random
import time
from pglib import attach_device

example_images = {}
execfile(os.path.normpath(os.path.join(__file__, "../../../bin/load_test_exercise_images.py")), example_images)
example_images = example_images["example_images"]


class ScreenshotsClient(object):

    def __init__(self, backend="http://localhost:10080"):
        self.backend = backend
        self.deviceInfo = make_device_info()
        self.deviceId = make_uuid()
        self.secret = make_uuid()
        self.accountId = make_random_id()
        self.session = requests.Session()
        self.session.headers.update({'Accept-Language': 'en-US'})

    def login(self):
        resp = self.session.post(
            urljoin(self.backend, "/api/login"),
            data=dict(deviceId=self.deviceId, secret=self.secret, deviceInfo=json.dumps(self.deviceInfo)))
        if resp.status_code == 404:
            resp = self.session.post(
                urljoin(self.backend, "/api/register"),
                data=dict(deviceId=self.deviceId, secret=self.secret, deviceInfo=json.dumps(self.deviceInfo)))
            account_info = attach_device(self.deviceId, self.accountId)
            self.session.cookies.update(account_info)
        resp.raise_for_status()
        return resp

    def delete_account(self):
        page = self.session.get(self.backend + "/leave-screenshots/").text
        csrf_match = re.search(r'<input.*name="_csrf".*value="([^"]*)"', page)
        csrf = csrf_match.group(1)
        resp = self.session.post(
            urljoin(self.backend, "/leave-screenshots/leave"),
            json={"_csrf": csrf})
        resp.raise_for_status()

    def create_shot(self, shot_id=None, **example_args):
        if not shot_id:
            shot_id = make_random_id() + "/test.com"
        shot_url = urljoin(self.backend, shot_id)
        shot_data = urljoin(self.backend, "data/" + shot_id)
        shot_json = make_example_shot(self.deviceId, **example_args)
        resp = self.session.put(
            shot_data,
            json=shot_json,
        )
        resp.raise_for_status()
        return shot_url

    def read_shot(self, url):
        # FIXME: should get at least the clip image subresource itself
        resp = self.session.get(url)
        resp.raise_for_status()
        page = resp.text
        clip_match = re.search(r'<img id="clipImage"[^>]*src="([^"]+)"', page)
        clip_url = clip_content = clip_content_type = None
        if clip_match:
            clip_url = clip_match.group(1)
            if clip_url:
                resp = self.session.get(clip_url)
                clip_content = resp.content
                clip_content_type = resp.headers['content-type']
        csrf_match = re.search(r'"csrfToken":"([^"]*)"', page)
        csrf = None
        if csrf_match:
            csrf = csrf_match.group(1)
        title_match = re.search(r'<title>([^<]*)</title>', page)
        title = None
        if title_match:
            title = title_match.group(1)
        download_match = re.search(r'"([^"]+?download=[^"]+)"', page)
        download_url = None
        if download_match:
            download_url = download_match.group(1).replace("&amp;", "&")
        return {
            "page": page,
            "clip_url": clip_url,
            "clip_content": clip_content,
            "clip_content_type": clip_content_type,
            "csrf": csrf,
            "title": title,
            "download_url": download_url,
        }

    def set_expiration(self, url, seconds):
        shot_id = self._get_id_from_url(url)
        csrf = self.read_shot(url)["csrf"]
        assert csrf, "No CSRF found"
        resp = self.session.post(
            self.backend + '/api/set-expiration',
            {"id": shot_id, "expiration": str(seconds), "_csrf": csrf})
        resp.raise_for_status()

    def set_title(self, url, new_title):
        shot_id = self._get_id_from_url(url)
        csrf = self.read_shot(url)["csrf"]
        assert csrf, "No CSRF found"
        resp = self.session.post(
            urljoin(urljoin(self.backend, '/api/set-title/'), shot_id),
            {"id": shot_id, "title": new_title, "_csrf": csrf})
        resp.raise_for_status()

    def edit_shot(self, url, edits):
        shot_id = self._get_id_from_url(url)
        csrf = self.read_shot(url)["csrf"]
        assert csrf, "No CSRF found"
        body = {"shotId": shot_id, "_csrf": csrf}
        body.update(edits)
        resp = self.session.post(
            urljoin(self.backend, '/api/save-edit'),
            body)
        resp.raise_for_status()

    def delete_shot(self, url):
        shot_id = self._get_id_from_url(url)
        csrf = self.read_shot(url)["csrf"]
        assert csrf, "No CSRF found"
        resp = self.session.post(
            self.backend + "/api/delete-shot",
            {"id": shot_id, "_csrf": csrf})
        resp.raise_for_status()

    def _get_id_from_url(self, url):
        assert url.startswith(self.backend)
        id = url[len(self.backend):]
        id = id.strip('/')
        return id

    def read_my_shots(self):
        resp = self.session.get(urljoin(self.backend, "/shots"))
        resp.raise_for_status()
        return resp

    def search_shots(self, q):
        resp = self.session.get(urljoin(self.backend, "/shots"), params={"q": q})
        resp.raise_for_status()

    def get_settings(self):
        resp = self.session.get(urljoin(self.backend, "/settings/"))
        resp.raise_for_status()
        return resp

    def get_uri(self, uri):
        return self.session.get(urljoin(self.backend, uri))


def make_example_shot(deviceId, pad_image_to_length=None, image_index=None, image_content_type=None, **overrides):
    pick_from_images = example_images
    if image_content_type:
        pick_from_images = [i for i in pick_from_images if ("data:" + image_content_type) in i["url"]]
    if image_index is None:
        image = random.choice(pick_from_images)
    else:
        image = pick_from_images[image_index]
    text = []
    for i in range(10):
        text.append(random.choice(text_strings))
    text = " ".join(text)
    image_url = image["url"]
    if pad_image_to_length:
        image_url = image_url + "A" * (pad_image_to_length - len(image_url))
    return dict(
        deviceId=deviceId,
        url="http://test.com/?" + make_uuid(),
        docTitle=overrides.get("docTitle", "Load test page"),
        createdDate=int(time.time() * 1000),
        favicon=None,
        siteName="test site",
        firefoxChannel="release",
        clips={
            make_uuid(): dict(
                createdDate=int(time.time() * 1000),
                sortOrder=100,
                image=dict(
                    url=image_url,
                    captureType="selection",
                    text=text,
                    location=dict(
                        top=100,
                        left=100,
                        bottom=100 + image["height"],
                        right=100 + image["width"],
                    ),
                    dimensions=dict(
                        x=image["width"],
                        y=image["height"],
                    ),
                ),
            ),
        },
    )


text_strings = """
Example strings like apple orange banana some stuff like whatever and whoever
and bucket blanket funky etc keyboard screen house window tree leaf leaves
feather feathers
""".split()


def make_device_info():
    return dict(
        addonVersion='0.1.2014test',
        platform='test',
    )


def make_uuid():
    return str(uuid.uuid1())


def make_random_id():
    return make_uuid().replace("-", "")[:16]


@contextlib.contextmanager
def screenshots_session(backend=None):
    if backend:
        user = ScreenshotsClient(backend=backend)
    else:
        user = ScreenshotsClient()
    user.login()
    yield user
    user.delete_account()
