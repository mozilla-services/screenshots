from urlparse import urljoin
from clientlib import (
    make_example_shot,
    make_random_id,
    screenshots_session,
)
import random


# Hack to make this predictable:
random.seed(0)


def test_invalid_clip_image_url_not_saved():
    with screenshots_session() as user:
        shot_id = make_random_id() + "/test.com"
        shot_data = urljoin(user.backend, "data/" + shot_id)

        shot_json = make_example_shot(user.deviceId)
        invalid_url = "https://example.com/?aaA=bbb=\"); background-color: red;"
        for clip_id in shot_json['clips']:
            shot_json['clips'][clip_id]['image']['url'] = invalid_url
            break

        resp = user.session.put(
            shot_data,
            json=shot_json,
        )
        print(resp.text)
        assert resp.status_code == 500  # assertion failure on clip image url


def test_edit_to_set_invalid_clip_image_url_fails():
    with screenshots_session() as user:
        shot_id = make_random_id() + "/test.com"
        shot_url = urljoin(user.backend, shot_id)
        shot_data = urljoin(user.backend, "data/" + shot_id)

        shot_json = make_example_shot(user.deviceId)
        invalid_url = "https://example.com/?aaA=bbb=\"); background-color: red;"

        # save a shot
        resp = user.session.put(
            shot_data,
            json=shot_json,
        )
        assert resp.status_code == 200

        csrf = user.read_shot(shot_url)['csrf']

        # don't allow editing to set an invalid shot image url
        resp = user.session.post(
            urljoin(user.backend, "/api/save-edit"),
            {"shotId": shot_id, "url": invalid_url, "_csrf": csrf},
        )
        print(resp.text)
        assert resp.status_code == 400

        user.delete_shot(shot_url)


if __name__ == "__main__":
    test_invalid_clip_image_url_not_saved()
    test_edit_to_set_invalid_clip_image_url_fails()
