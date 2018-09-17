from __future__ import print_function
from clientlib import ScreenshotsClient
import urllib


def test_download_key():
    user = ScreenshotsClient()
    user.login()
    shot_1_url = user.create_shot(docTitle="A_TEST_SITE_1")
    shot_2_url = user.create_shot(docTitle="A_TEST_SITE_2")
    shot_1_page = user.read_shot(shot_1_url)
    shot_2_page = user.read_shot(shot_2_url)
    shot_1_download_url = shot_1_page["download_url"]
    shot_2_download_url = shot_2_page["download_url"]
    resp = user.session.get(shot_1_download_url)
    # This should normally work:
    print("Normal download URL:", shot_1_download_url)
    assert resp.headers["Content-Disposition"], "Should get a proper download response"
    mixed_up = shot_1_download_url.split("?")[0] + "?" + shot_2_download_url.split("?")[1]
    # Getting mixed_up should fail, since the signed download parameter comes from shot_2
    # but we're fetching the image from shot_1
    resp = user.session.get(mixed_up)
    print("Mixed-up URL:", mixed_up)
    print("Response:", resp)
    print("Content-Disposition header:", resp.headers.get("Content-Disposition"))
    assert not resp.headers.get("Content-Disposition"), "The signature shouldn't work"


def test_scopes():
    user = ScreenshotsClient()
    user.login()
    abtests = user.session.cookies["abtests"]
    abtests_sig = user.session.cookies["abtests.sig"]
    print(abtests, abtests_sig)
    shot = user.create_shot(docTitle="A_TEST_SITE")
    page = user.read_shot(shot)
    download_url = page["download_url"]
    resp = user.session.get(download_url)
    assert resp.headers.get("Content-Disposition")
    mixed_up = "%s?download=%s&sig=%s" % (
        download_url.split("?")[0],
        urllib.quote(abtests),
        urllib.quote(abtests_sig),
    )
    resp = user.session.get(mixed_up)
    assert not resp.headers.get("Content-Disposition")


if __name__ == "__main__":
    test_download_key()
    test_scopes()
