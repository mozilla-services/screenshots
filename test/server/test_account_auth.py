import urllib
from clientlib import ScreenshotsClient, ScreenshotsBase
import random
import time
import re
from requests import HTTPError

# Hack to make this predictable:
random.seed(0)


def get_url(url, expect=None):
    result = urllib.urlopen(url)
    if expect and result.getcode() != expect:
        raise Exception("GET {} returned status {}".format(url, result.getcode()))
    return result.read()


def setup_shot_on_device():
    user = ScreenshotsClient(hasAccount=True)
    user.login()
    shot_url = user.create_shot(docTitle="A_TEST_SITE_1")
    return {'user': user, 'shot_url': shot_url}


# Change expiration and delete shots made previously
def test_owned_shot_with_fxa_auth():
    setup_session = setup_shot_on_device()
    shot_url = setup_session['shot_url']
    browser_only_user = ScreenshotsBase()

    # Use accountId used on device to setup to login to a browser only session
    result = browser_only_user.login(setup_session['user'].accountId)
    assert setup_session['user'].deviceId == result['deviceid'], "Associated deviceId should match"

    # Read shot page to check if browser_only_user can set expiration and delete shot
    page = browser_only_user.read_shot(shot_url)
    browser_only_user.set_expiration(shot_url, 1)
    time.sleep(2)
    expired_page = browser_only_user.read_shot(shot_url)
    # An expired page happens to be unparseable:
    assert expired_page["clip_content"] is None
    get_url(page["clip_url"], expect=404)
    get_url(shot_url, expect=200)
    browser_only_user.delete_shot(shot_url)  # cleanup
    setup_session['user'].delete_account()


# test we cannot change expiration or delete shots made with a different deviceId/accountId
def test_not_owned_shot():
    setup_session_1 = setup_shot_on_device()
    shot_url = setup_session_1['shot_url']

    setup_session_2 = setup_shot_on_device()

    # Read !owned shot created in first set up session
    setup_session_2['user'].read_shot(shot_url)

    # set expiration and delete on the shot should throw 404
    try:
        try:
            setup_session_2['user'].set_expiration(shot_url, 1)
            assert False, "set_expiration should fail"
        except HTTPError, e:
            if e.response.status_code != 404:
                raise
        try:
            setup_session_2['user'].delete_shot(shot_url)
            assert False, "delete_shot should fail"
        except HTTPError, e:
            if e.response.status_code != 404:
                raise
    finally:
        setup_session_1['user'].delete_account()
        setup_session_2['user'].delete_account()


# test we cannot change expiration or delete shots made with a different deviceId/accountId
def test_not_owned_shot_with_fxa_auth():
    setup_session_1 = setup_shot_on_device()
    shot_url = setup_session_1['shot_url']

    setup_session_2 = setup_shot_on_device()
    browser_only_user = ScreenshotsBase()

    # Use setup_session_2 accountId to login to a browser only session
    result = browser_only_user.login(setup_session_2['user'].accountId)
    assert setup_session_2['user'].deviceId == result['deviceid'], "Associated deviceId should match"

    # Read !owned shot created in first setup session
    browser_only_user.read_shot(shot_url)

    # set expiration and delete on the shot should throw 404
    try:
        try:
            browser_only_user.set_expiration(shot_url, 1)
            assert False, "set_expiration should fail"
        except HTTPError, e:
            if e.response.status_code != 404:
                raise

        try:
            browser_only_user.delete_shot(shot_url)
            assert False, "delete_shot should fail"
        except HTTPError, e:
            if e.response.status_code != 404:
                raise
    finally:
        setup_session_1['user'].delete_account()
        setup_session_2['user'].delete_account()


def match_shot_ui_element(user, shot_url, pattern):
    resp = user.session.get(shot_url)
    resp.raise_for_status()
    page = resp.text
    is_match = re.search(pattern, page)
    return is_match


# test we can change expiration and delete shots made previously
def test_owned_shot_ui_with_fxa_auth():
    setup_session = setup_shot_on_device()
    shot_url = setup_session['shot_url']
    browser_only_user = ScreenshotsBase()

    # Use setup user accountId to login to a browser only session
    result = browser_only_user.login(setup_session['user'].accountId)
    assert setup_session['user'].deviceId == result['deviceid'], "Associated deviceId should match"

    unauth_user = ScreenshotsClient()

    copy_element = r'<img src="/static/img/icon-copy.svg[^"]*'
    copy_match = match_shot_ui_element(browser_only_user, shot_url, copy_element)
    assert copy_match, "Copy button is visible"

    copy_match = match_shot_ui_element(unauth_user, shot_url, copy_element)
    assert copy_match is None, "Copy button is not visible"

    edit_element = r'<img src="/static/img/icon-pen.svg[^"]*'
    edit_match = match_shot_ui_element(browser_only_user, shot_url, edit_element)
    assert edit_match, "Edit button is visible"

    edit_match = match_shot_ui_element(unauth_user, shot_url, edit_element)
    assert edit_match is None, "Edit button is not visible"

    setup_session['user'].delete_account()


def test_my_shots_with_fxa_auth():
    setup_session = setup_shot_on_device()
    setup_session['user'].create_shot(docTitle="A_TEST_SITE_2")
    setup_session['user'].create_shot(docTitle="A_TEST_SITE_3")

    browser_only_user = ScreenshotsBase()

    # Use setup_session user accountId to login to a browser only session
    result = browser_only_user.login(setup_session['user'].accountId)
    assert setup_session['user'].deviceId == result['deviceid'], "Associated deviceId should match"

    resp = setup_session['user'].read_my_shots_json()
    assert resp.json()['totalShots'] == '3', "Total 3 shots created in setup"

    resp = browser_only_user.read_my_shots_json()
    assert resp.json()['totalShots'] == '3', "Total 3 shots seen in my shots with browser only login"

    setup_session['user'].delete_account()


if __name__ == "__main__":
    test_owned_shot_with_fxa_auth()
    test_not_owned_shot()
    test_not_owned_shot_with_fxa_auth()
    test_owned_shot_ui_with_fxa_auth()
    test_my_shots_with_fxa_auth()
