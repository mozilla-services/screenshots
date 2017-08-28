from clientlib import ScreenshotsClient, screenshots_session
import urlparse
from urlparse import urljoin
import random
import requests
from requests import HTTPError


# Hack to make this predictable:
random.seed(0)


def test_put_large_image():
    user = ScreenshotsClient()
    user.login()
    try:
        try:
            user.create_shot(pad_image_to_length=100 * 1000 * 1000)
        except HTTPError, e:
            if e.response.status_code != 413:
                raise
    finally:
        user.delete_account()


def test_bad_id():
    user = ScreenshotsClient()
    user.login()
    try:
        try:
            user.create_shot(shot_id="!!!/test.com")
        except HTTPError, e:
            if e.response.status_code != 400:
                raise
    finally:
        user.delete_account()


def test_settings_page():
    with screenshots_session() as user:
        user.get_settings()  # raises for http error


def test_settings_page_requires_auth():
    user = ScreenshotsClient()

    resp = requests.get(urljoin(user.backend, "/settings"))
    assert resp.status_code == 403


def test_metrics_page():
    unauthed_user = ScreenshotsClient()

    resp = requests.get(urljoin(unauthed_user.backend, "/metrics"))
    assert resp.status_code == 200


def test_landing_page():
    unauthed_user = ScreenshotsClient()

    resp = unauthed_user.get_uri("/")
    assert resp.status_code == 200


def test_creating_page():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="A_TEST_SITE_1", image_index=0)
        shot_id = urlparse.urlsplit(shot_url).path.strip("/")

        resp = user.get_uri("/creating/" + shot_id)
        assert resp.status_code == 200

    unauthed_user = ScreenshotsClient()

    resp = requests.get(urljoin(unauthed_user.backend, "/creating/") + shot_id)
    assert resp.status_code == 200


def test_404_page():
    unauthed_user = ScreenshotsClient()
    response = unauthed_user.get_uri("/404")
    if response.status_code != 404:
        response.raise_for_status()


def test_contribute_json():
    unauthed_user = ScreenshotsClient()
    response = unauthed_user.get_uri("/contribute.json")
    if response.status_code != 200:
        response.raise_for_status()


def test_dunder_version():
    unauthed_user = ScreenshotsClient()
    response = unauthed_user.get_uri("/__version__")
    response.raise_for_status()


def test_heartbeat():
    unauthed_user = ScreenshotsClient()
    response = unauthed_user.get_uri("/__heartbeat__")
    response.raise_for_status()


def test_lbheartbeat():
    unauthed_user = ScreenshotsClient()
    response = unauthed_user.get_uri("/__lbheartbeat__")
    response.raise_for_status()


def test_my_shots_page():
    with screenshots_session() as user:
        user.read_my_shots()

    # e.g. direct navigation to /shots in private window
    unauthed_user = ScreenshotsClient()
    response = unauthed_user.get_uri("/shots")
    response.raise_for_status()


if __name__ == "__main__":
    test_put_large_image()
    test_bad_id()
    test_settings_page()
    test_settings_page_requires_auth()
    test_metrics_page()
    test_landing_page()
    test_creating_page()
    test_404_page()
    test_contribute_json()
    test_dunder_version()
    test_heartbeat()
    test_lbheartbeat()
    test_my_shots_page()
