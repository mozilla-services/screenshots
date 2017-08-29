from urlparse import urljoin
from clientlib import (
    make_example_shot,
    make_random_id,
    screenshots_session,
)
import random


# Hack to make this predictable:
random.seed(0)


def test_shotindex_image_url():  # bug 1389705
    with screenshots_session() as user:
        shot_id = make_random_id() + "/test.com"
        shot_url = urljoin(user.backend, shot_id)
        shot_data = urljoin(user.backend, "data/" + shot_id)

        shot_json = make_example_shot(user.deviceId)
        test_url = "https://example.com/?aaA=bbb=\"); background-color: red;"
        for clip_id in shot_json['clips']:
            shot_json['clips'][clip_id]['image']['url'] = test_url
            break

        resp = user.session.put(
            shot_data,
            json=shot_json,
        )
        resp.raise_for_status()

        shot_page = user.read_shot(urljoin(user.backend, '/' + shot_id))['page']
        model_json_start = shot_page.find("<script id=\"json-data\" type=\"data\">")
        assert '); background-color: red' not in shot_page[:model_json_start]

        user.delete_shot(shot_url)


if __name__ == "__main__":
    test_shotindex_image_url()
