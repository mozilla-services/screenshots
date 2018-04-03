from urlparse import urljoin
from clientlib import (
    make_example_shot,
    make_random_id,
    screenshots_session,
    example_images
)
import random


# Hack to make this predictable:
random.seed(0)

def test_invalid_image_url():
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

def test_invalid_data_image():
    with screenshots_session() as user:
        shot_url = user.create_shot(docTitle="TEST_JPEG", image_content_type="application/pdf", image_index=0)
        shot_page = user.read_shot(shot_url)
        assert shot_page["clip_content_type"] != "image/jpeg"


def test_invalid_data_image_decoded():
    pass

def test_invalid_data_url():
    pass

if __name__ == "__main__":
    test_invalid_data_image()
    test_invalid_data_image_decoded()
    test_invalid_data_url()
