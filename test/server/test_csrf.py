from clientlib import ScreenshotsClient, screenshots_session
from urlparse import urljoin, urlsplit
import random
import requests
import json
import re


# Hack to make this predictable:
random.seed(0)


def test_leave_screenshots_with_valid_csrftoken_ok():
    user = ScreenshotsClient()
    user.login()

    leave_resp = user.session.get(user.backend + "/leave-screenshots/")
    assert leave_resp.status_code == 200
    assert leave_resp.cookies.get('_csrf')

    page = leave_resp.text
    csrf_match = re.search(r'<input.*name="_csrf".*value="([^"]*)"', page)
    csrf = csrf_match.group(1)
    resp = user.session.post(
        urljoin(user.backend, "/leave-screenshots/leave"),
        json={"_csrf": csrf})
    resp.raise_for_status()


def test_leave_screenshots_with_invalid_csrftoken_fails():
    user = ScreenshotsClient()
    user.login()

    leave_resp = user.session.get(user.backend + "/leave-screenshots/")
    assert leave_resp.status_code == 200
    assert leave_resp.cookies.get('_csrf')

    resp = user.session.post(
        urljoin(user.backend, "/leave-screenshots/leave"),
        json={"_csrf": "bad-csrf-token"})

    print(resp.text)
    assert resp.status_code == 403

    user.delete_account()


def test_leave_screenshots_without_csrftoken_fails():
    user = ScreenshotsClient()
    user.login()

    leave_resp = user.session.get(user.backend + "/leave-screenshots/")
    assert leave_resp.status_code == 200
    assert leave_resp.cookies.get('_csrf')

    resp = user.session.post(
        urljoin(user.backend, "/leave-screenshots/leave"))

    print(resp.text)
    assert resp.status_code == 403

    user.delete_account()


def test_leave_screenshots_with_get_fails():
    user = ScreenshotsClient()
    user.login()

    leave_resp = user.session.get(user.backend + "/leave-screenshots/")
    assert leave_resp.status_code == 200
    assert leave_resp.cookies.get('_csrf')

    page = leave_resp.text
    csrf_match = re.search(r'<input.*name="_csrf".*value="([^"]*)"', page)
    csrf = csrf_match.group(1)
    resp = user.session.get(
        urljoin(user.backend, "/leave-screenshots/leave"),
        params={"_csrf": csrf})

    assert resp.status_code == 404

    user.delete_account()


def test_get_settings_does_not_set_csrf_cookie():
    with screenshots_session() as user:
        resp = user.get_settings()  # GET /settings/
        assert resp.status_code == 200
        assert resp.cookies.get('_csrf', None) is None

        # whether the 302 /settings/ -> /settings
        # with set-cookie actually sets _csrf
        # depends on the client
        resp = user.get_uri(urljoin(user.backend, "/settings"))
        assert resp.status_code == 200
        assert resp.cookies.get('_csrf', None) is None


def test_get_shot_sets_csrf_cookie():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1", image_index=0)
        shot_id = urlsplit(shot_url).path.strip("/")
        user.create_shot(shot_id=shot_id, docTitle="A_TEST_SITE_2", image_index=1)

        resp = user.session.get(shot_url)
        resp.raise_for_status()
        assert resp.cookies.get('_csrf')


def test_get_my_shots_sets_csrf_cookie():
    with screenshots_session() as user:
        user.read_my_shots()  # raises on error
        assert user.session.cookies.get('_csrf')


if __name__ == "__main__":
    pass
