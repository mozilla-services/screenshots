from clientlib import ScreenshotsClient, screenshots_session
from urlparse import urljoin
import random
import requests
import json


# Hack to make this predictable:
random.seed(0)


def test_register_without_deviceid_fails():
    unauthed_user = ScreenshotsClient()
    resp = unauthed_user.session.post(
        urljoin(unauthed_user.backend, "/api/register"),
        data=dict(deviceId='',
                  secret=unauthed_user.secret,
                  deviceInfo=json.dumps(unauthed_user.deviceInfo)))

    assert resp.status_code == 400, "register without device id worked"


def test_register_without_secret_fails():
    unauthed_user = ScreenshotsClient()
    resp = unauthed_user.session.post(
        urljoin(unauthed_user.backend, "/api/register"),
        data=dict(deviceId=unauthed_user.deviceId,
                  deviceInfo=json.dumps(unauthed_user.deviceInfo)))

    print resp.text
    assert resp.status_code == 400


def test_register_without_deviceinfo_ok():
    unauthed_user = ScreenshotsClient()
    resp = unauthed_user.session.post(
        urljoin(unauthed_user.backend, "/api/register"),
        data=dict(deviceId=unauthed_user.deviceId,
                  secret=unauthed_user.secret))

    print resp.text
    assert resp.status_code == 200
    unauthed_user.delete_account()


def test_register_ok():
    unauthed_user = ScreenshotsClient()
    resp = unauthed_user.session.post(
        urljoin(unauthed_user.backend, "/api/register"),
        data=dict(deviceId=unauthed_user.deviceId,
                  secret=unauthed_user.secret,
                  deviceInfo=json.dumps(unauthed_user.deviceInfo)))

    print resp.text
    assert resp.status_code == 200
    unauthed_user.delete_account()


def test_register_with_same_deviceid_twice_fails():
    unauthed_user = ScreenshotsClient()
    resp = unauthed_user.session.post(
        urljoin(unauthed_user.backend, "/api/register"),
        data=dict(deviceId=unauthed_user.deviceId,
                  secret=unauthed_user.secret,
                  deviceInfo=json.dumps(unauthed_user.deviceInfo)))

    print resp.text
    assert resp.status_code == 200

    # registering twice as same user should fail
    resp = unauthed_user.session.post(
        urljoin(unauthed_user.backend, "/api/register"),
        data=dict(deviceId=unauthed_user.deviceId,
                  secret=unauthed_user.secret,
                  deviceInfo=json.dumps(unauthed_user.deviceInfo)))

    print resp.text
    assert resp.status_code == 401  # user exists

    unauthed_user.delete_account()

    # registering as second user should fail
    second_unauthed_user = ScreenshotsClient()

    resp = second_unauthed_user.session.post(
        urljoin(second_unauthed_user.backend, "/api/register"),
        data=dict(deviceId=unauthed_user.deviceId,
                  secret=second_unauthed_user.secret,
                  deviceInfo=json.dumps(second_unauthed_user.deviceInfo)))

    print resp.text
    assert resp.status_code == 401  # user exists


def test_login_missing_deviceid():
    with screenshots_session() as user:
        resp = requests.post(
            urljoin(user.backend, "/api/login"),
            data=dict(secret=user.secret, deviceInfo=json.dumps(user.deviceInfo)))

        print(resp.text, resp.status_code)
        assert resp.status_code == 404  # no such user


def test_login_without_secret():
    with screenshots_session() as user:
        resp = requests.post(
            urljoin(user.backend, "/api/login"),
            data=dict(deviceId=user.deviceId, deviceInfo=json.dumps(user.deviceInfo)))

        print(resp.text, resp.status_code)
        assert resp.status_code == 400


def test_login_wrong_secret():
    with screenshots_session() as user:
        resp = requests.post(
            urljoin(user.backend, "/api/login"),
            data=dict(deviceId=user.deviceId, secret="wrong_secret", deviceInfo=json.dumps(user.deviceInfo)))

        print(resp.text, resp.status_code)
        assert resp.status_code == 404


def test_login_invalid_json_deviceinfo():
    with screenshots_session() as user:
        resp = requests.post(
            urljoin(user.backend, "/api/login"),
            data=dict(deviceId=user.deviceId, secret=user.secret, deviceInfo="}"))

        print(resp.text, resp.status_code)
        assert resp.status_code == 200


def test_login_ownership_check():
    with screenshots_session() as user:
        resp = requests.post(
            urljoin(user.backend, "/api/login"),
            data=dict(deviceId=user.deviceId,
                      secret=user.secret,
                      deviceInfo=json.dumps(user.deviceInfo),
                      ownershipCheck="fooo"))

        print(resp.text, resp.status_code)
        assert resp.status_code == 200


def test_login():
    with screenshots_session() as user:
        resp = requests.post(
            urljoin(user.backend, "/api/login"),
            data=dict(deviceId=user.deviceId,
                      secret=user.secret,
                      deviceInfo=json.dumps(user.deviceInfo),
                      ownershipCheck="fooo"))

        print(resp.text, resp.status_code)
        assert resp.status_code == 200


if __name__ == "__main__":
    test_register_without_deviceid_fails()
    test_register_without_secret_fails()
    test_register_without_deviceinfo_ok()
    test_register_ok()
    test_register_with_same_deviceid_twice_fails()
    test_login_missing_deviceid()
    test_login_without_secret()
    test_login_wrong_secret()
    test_login_invalid_json_deviceinfo()
    test_login_ownership_check()
    test_login()
