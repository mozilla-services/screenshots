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


def image_setup():
    for image in example_images:
        valid_data_image = image['url']
        return valid_data_image


def user_setup():
    with screenshots_session() as user:
        shot_id = make_random_id() + "/test.com"
        shot_data = urljoin(user.backend, "data/" + shot_id)
        shot_json = make_example_shot(user.deviceId)
        return (shot_data, shot_json, user)


def test_invalid_data_image():
    image = image_setup()
    (shot_data, shot_json, user) = user_setup()
    valid_header = "data:image/png;base64,iVBORw0KGgo"
    invalid_header = "data:image/png;base64,R0k"
    if valid_header in image:
        for clip_id in shot_json['clips']:
            shot_json['clips'][clip_id]['image']['url'] = invalid_header
            break

        resp = user.session.put(
            shot_data,
            json=shot_json,
        )
        print(resp.text)
        assert resp.status_code == 500


def test_invalid_data_image_decoded():
    image = image_setup()
    (shot_data, shot_json, user) = user_setup()
    if "iVBORw0KGgo" in image:
        invalid_data_image = image.replace('iVBORw0KGgo', 'someIM4gEgo')
        for clip_id in shot_json['clips']:
            shot_json['clips'][clip_id]['image']['url'] = invalid_data_image
            break

        resp = user.session.put(
            shot_data,
            json=shot_json,
        )
        print(resp.text)
        assert resp.status_code == 500


def test_invalid_data_url():
    image = image_setup()
    (shot_data, shot_json, user) = user_setup()
    if "data:image/png;base64" in image:
        invalid_data_url = image.replace('data:image/png', 'data:image/foo')
        for clip_id in shot_json['clips']:
            shot_json['clips'][clip_id]['image']['url'] = invalid_data_url
            break

        resp = user.session.put(
            shot_data,
            json=shot_json,
        )
        print(resp.text)
        assert resp.status_code == 500


if __name__ == "__main__":
    test_invalid_data_image()
    test_invalid_data_image_decoded()
    test_invalid_data_url()
