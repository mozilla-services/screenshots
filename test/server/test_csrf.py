from clientlib import ScreenshotsClient, screenshots_session
from urlparse import urljoin, urlsplit
import json
import random
import re


# Hack to make this predictable:
random.seed(0)


def assert_httponly_csrf_cookie(response, cookie_name='_csrf'):
    "Test helper"
    assert response.cookies.get(cookie_name)  # cookie exists
    csrf_cookie = [c for c in response.cookies if c.name == cookie_name][0]
    assert csrf_cookie.has_nonstandard_attr('HttpOnly')  # is HttpOnly


def test_leave_screenshots_with_valid_csrftoken_ok():
    with screenshots_session() as user:
        leave_resp = user.session.get(user.backend + "/leave-screenshots/")
        assert leave_resp.status_code == 200
        assert_httponly_csrf_cookie(user.session)

        page = leave_resp.text
        csrf_match = re.search(r'<input.*name="_csrf".*value="([^"]*)"', page)
        csrf = csrf_match.group(1)
        resp = user.session.post(
            urljoin(user.backend, "/leave-screenshots/leave"),
            json={"_csrf": csrf})
        resp.raise_for_status()


def test_leave_screenshots_with_invalid_csrftoken_fails():
    with screenshots_session() as user:
        leave_resp = user.session.get(user.backend + "/leave-screenshots/")
        assert leave_resp.status_code == 200
        assert_httponly_csrf_cookie(user.session)

        resp = user.session.post(
            urljoin(user.backend, "/leave-screenshots/leave"),
            json={"_csrf": "bad-csrf-token"})

        print(resp.text)
        assert resp.status_code == 403


def test_leave_screenshots_without_csrftoken_fails():
    with screenshots_session() as user:
        leave_resp = user.session.get(user.backend + "/leave-screenshots/")
        assert leave_resp.status_code == 200
        assert_httponly_csrf_cookie(user.session)

        resp = user.session.post(
            urljoin(user.backend, "/leave-screenshots/leave"))

        print(resp.text)
        assert resp.status_code == 403


def test_leave_screenshots_with_get_fails():
    with screenshots_session() as user:
        leave_resp = user.session.get(user.backend + "/leave-screenshots/")
        assert leave_resp.status_code == 200
        assert_httponly_csrf_cookie(user.session)

        page = leave_resp.text
        csrf_match = re.search(r'<input.*name="_csrf".*value="([^"]*)"', page)
        csrf = csrf_match.group(1)
        resp = user.session.get(
            urljoin(user.backend, "/leave-screenshots/leave"),
            params={"_csrf": csrf})

        assert resp.status_code == 404


def test_leave_screenshots_with_duplicate_csrf_cookies_fails():
    with screenshots_session() as user:
        leave_resp = user.session.get(user.backend + "/leave-screenshots/")
        assert leave_resp.status_code == 200
        assert_httponly_csrf_cookie(user.session)

        page = leave_resp.text
        csrf_match = re.search(r'<input.*name="_csrf".*value="([^"]*)"', page)
        csrf = csrf_match.group(1)
        resp = user.session.post(
            urljoin(user.backend, "/leave-screenshots/leave"),
            cookies={'_csrf': user.session.cookies.get('_csrf'),   # noqa: F601
                     '_csrf': user.session.cookies.get('_csrf')},  # noqa: F601
            json={"_csrf": csrf})
        assert resp.status_code == 400


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
        assert_httponly_csrf_cookie(user.session)


def test_get_my_shots_sets_csrf_cookie():
    with screenshots_session() as user:
        user.read_my_shots()  # raises on error
        assert_httponly_csrf_cookie(user.session)


def test_delete_shot_with_valid_csrftoken_ok():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        user.delete_shot(shot_url)  # reads and uses csrf token from shot page


def test_delete_shot_with_invalid_csrftoken_fails():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        shot_id = user._get_id_from_url(shot_url)
        resp = user.session.post(
            urljoin(user.backend, "/api/delete-shot"),
            {"id": shot_id, "_csrf": "bad-csrf-token"})
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token

        user.delete_shot(shot_url)  # cleanup


def test_delete_shot_without_csrftoken_fails():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        shot_id = user._get_id_from_url(shot_url)
        resp = user.session.post(
            urljoin(user.backend, "/api/delete-shot"),
            {"id": shot_id})
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token

        user.delete_shot(shot_url)  # cleanup


def test_shot_set_expiration_with_valid_csrftoken_ok():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        user.set_expiration(shot_url, 290)  # reads and uses csrf token from shot page

        user.delete_shot(shot_url)  # cleanup


def test_shot_set_expiration_with_invalid_csrftoken_fails():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        shot_id = user._get_id_from_url(shot_url)
        resp = user.session.post(
            urljoin(user.backend, "/api/set-expiration"),
            {"id": shot_id, "expiration": "60", "_csrf": "bad-csrf-token"})
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token

        user.delete_shot(shot_url)  # cleanup


def test_shot_set_expiration_without_csrftoken_fails():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        shot_id = user._get_id_from_url(shot_url)
        resp = user.session.post(
            urljoin(user.backend, "/api/set-expiration"),
            {"id": shot_id, "expiration": "60"})
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token

        user.delete_shot(shot_url)  # cleanup


def test_shot_set_title_with_valid_csrftoken_ok():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        user.set_title(shot_url, "New Screenshot Title")  # reads and uses csrf token from shot page

        user.delete_shot(shot_url)  # cleanup


def test_shot_set_title_with_invalid_csrftoken_fails():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        shot_id = user._get_id_from_url(shot_url)
        resp = user.session.post(
            urljoin(urljoin(user.backend, "/api/set-title/"), shot_id),
            {"id": shot_id, "title": "new title", "_csrf": "bad-csrf-token"})
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token

        user.delete_shot(shot_url)  # cleanup


def test_shot_set_title_without_csrftoken_fails():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        shot_id = user._get_id_from_url(shot_url)
        resp = user.session.post(
            urljoin(urljoin(user.backend, "/api/set-title/"), shot_id),
            {"id": shot_id, "title": "new title"})
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token

        user.delete_shot(shot_url)  # cleanup

# TODO: figure out why this takes a minute to run
# def test_shot_edit_with_valid_csrftoken_ok():
#     with screenshots_session() as user:
#         shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
#         user.edit_shot(shot_url, dict(url="https://example.com/edited"))

#         user.delete_shot(shot_url)  # cleanup


def test_shot_edit_with_invalid_csrftoken_fails():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        shot_id = user._get_id_from_url(shot_url)

        body = {"shotId": shot_id, "_csrf": "bad-csrf-token"}
        body.update(dict(url="https://example.com/edited"))
        resp = user.session.post(
            urljoin(user.backend, '/api/save-edit'),
            body)
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token

        user.delete_shot(shot_url)  # cleanup


def test_shot_edit_without_csrftoken_fails():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        shot_id = user._get_id_from_url(shot_url)

        body = {"shotId": shot_id, "_csrf": "bad-csrf-token"}
        body.update(dict(url="https://example.com/edited"))
        resp = user.session.post(
            urljoin(user.backend, '/api/save-edit'),
            body)
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token

        user.delete_shot(shot_url)  # cleanup


def test_disconnect_device_with_valid_csrftoken_ok():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
        csrf = user.read_shot(shot_url)["csrf"]

        resp = user.session.post(
            urljoin(user.backend, '/api/disconnect-device/'),
            {"_csrf": csrf})
        print(resp.text)
        assert resp.status_code == 200  # ok?

        user.delete_shot(shot_url)  # cleanup


def test_disconnect_device_with_invalid_csrftoken_fails():
    with screenshots_session() as user:
        resp = user.session.post(
            urljoin(user.backend, '/api/disconnect-device/'),
            {"_csrf": "bad-token"})
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token


def test_disconnect_device_without_csrftoken_fails():
    with screenshots_session() as user:
        resp = user.session.post(
            urljoin(user.backend, '/api/disconnect-device/'))
        print(resp.text)
        assert resp.status_code == 403  # Bad CSRF Token


def test_login_with_invalid_headers():
    # might belong in test_auth.py instead
    unauthed_user = ScreenshotsClient()
    resp = unauthed_user.session.post(
        urljoin(unauthed_user.backend, "/api/login"),
        headers=dict(origin="https://localhost:8080"),
        data=dict(secret=unauthed_user.secret,
                  deviceInfo=json.dumps(unauthed_user.deviceInfo)))

    print resp.text
    assert resp.status_code == 403  # Invalid CSRF Headers


def test_register_with_invalid_headers():
    # might belong in test_auth.py instead
    unauthed_user = ScreenshotsClient()
    resp = unauthed_user.session.post(
        urljoin(unauthed_user.backend, "/api/register"),
        headers=dict(referer="https://localhost:8080/1Zv4srJfp50f5LaJ/localhost"),
        data=dict(deviceId=unauthed_user.deviceId,
                  secret=unauthed_user.secret,
                  deviceInfo=json.dumps(unauthed_user.deviceInfo)))

    print resp.text
    assert resp.status_code == 403  # Invalid CSRF Headers


if __name__ == "__main__":
    test_leave_screenshots_with_valid_csrftoken_ok()
    test_leave_screenshots_with_invalid_csrftoken_fails()
    test_leave_screenshots_without_csrftoken_fails()
    test_leave_screenshots_with_get_fails()
    test_leave_screenshots_with_duplicate_csrf_cookies_fails()
    test_get_settings_does_not_set_csrf_cookie()
    test_get_shot_sets_csrf_cookie()
    test_get_my_shots_sets_csrf_cookie()
    test_delete_shot_with_valid_csrftoken_ok()
    test_delete_shot_with_invalid_csrftoken_fails()
    test_delete_shot_without_csrftoken_fails()
    test_shot_set_expiration_with_valid_csrftoken_ok()
    test_shot_set_expiration_with_invalid_csrftoken_fails()
    test_shot_set_expiration_without_csrftoken_fails()
    test_shot_set_title_with_valid_csrftoken_ok()
    test_shot_set_title_with_invalid_csrftoken_fails()
    test_shot_set_title_without_csrftoken_fails()
    # test_shot_edit_with_valid_csrftoken_ok()
    test_shot_edit_with_invalid_csrftoken_fails()
    test_shot_edit_without_csrftoken_fails()
    test_disconnect_device_with_valid_csrftoken_ok()
    test_disconnect_device_with_invalid_csrftoken_fails()
    test_disconnect_device_without_csrftoken_fails()
    test_login_with_invalid_headers()
    test_register_with_invalid_headers()
