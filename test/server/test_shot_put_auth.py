import urlparse
from clientlib import ScreenshotsClient
import random
import requests

# Hack to make this predictable:
random.seed(0)


def test_put_auth():
    first_user = ScreenshotsClient()
    second_user = ScreenshotsClient()
    first_user.login()
    second_user.login()
    shot_url = first_user.create_shot(docTitle="A_TEST_SITE_1")
    shot_id = urlparse.urlsplit(shot_url).path.strip("/")
    shot_page = first_user.read_shot(shot_url)
    print(first_user.read_shot(shot_url)["clip_url"], shot_page["clip_url"])
    assert first_user.read_shot(shot_url)["clip_content"] == shot_page["clip_content"]
    assert "A_TEST_SITE_1" in shot_page["page"]
    try:
        second_user.create_shot(shot_id=shot_id, docTitle="A_TEST_SITE_2")
    except requests.HTTPError as e:
        if e.response.status_code != 403:
            raise
    else:
        assert False, "Second attempt to upload should have failed"
    second_shot_page = first_user.read_shot(shot_url)
    assert "A_TEST_SITE_1" in second_shot_page["page"]
    assert "A_TEST_SITE_2" not in second_shot_page["page"]
    assert shot_page["clip_url"] == second_shot_page["clip_url"]
    assert shot_page["clip_content"] == second_shot_page["clip_content"]


def test_update():
    user = ScreenshotsClient()
    user.login()
    shot_url = user.create_shot(docTitle="A_TEST_SITE_1", image_index=0)
    shot_page = user.read_shot(shot_url)
    assert "A_TEST_SITE_1" in shot_page["page"]
    shot_id = urlparse.urlsplit(shot_url).path.strip("/")
    user.create_shot(shot_id=shot_id, docTitle="A_TEST_SITE_2", image_index=1)
    later_shot_page = user.read_shot(shot_url)
    assert "A_TEST_SITE_2" in later_shot_page["page"]
    assert later_shot_page["clip_content"]
    assert later_shot_page["clip_content"] != shot_page["clip_content"]
    assert later_shot_page["clip_url"] != shot_page["clip_url"]


if __name__ == "__main__":
    test_put_auth()
