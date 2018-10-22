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


def user_setup():
    with screenshots_session() as user:
        shot_id = make_random_id() + "/test.com"
        shot_data = urljoin(user.backend, "data/" + shot_id)
        shot_json = make_example_shot(user.deviceId)
        return (shot_data, shot_json, user)


def test_invalid_png_data_image():
    image = example_images[0]['url']
    (shot_data, shot_json, user) = user_setup()
    valid_header = "data:image/png;base64,iVBORw0KGgo"
    invalid_header = 'data:image/png;base64,R0k'
    assert valid_header in image

    clip_id = next(iter(shot_json['clips']))
    shot_json['clips'][clip_id]['image']['url'] = invalid_header

    resp = user.session.put(shot_data, json=shot_json,)
    print(resp.text)
    assert resp.status_code == 500


def test_invalid_png_data_image_decoded():
    image = example_images[0]['url']
    (shot_data, shot_json, user) = user_setup()
    assert "iVBORw0KGgo" in image

    invalid_data_image = 'data:image/png;base64,someIM4gEgo'

    clip_id = next(iter(shot_json['clips']))
    shot_json['clips'][clip_id]['image']['url'] = invalid_data_image

    resp = user.session.put(shot_data, json=shot_json,)
    print(resp.text)
    assert resp.status_code == 500


def test_invalid_data_url():
    image = example_images[0]['url']
    (shot_data, shot_json, user) = user_setup()
    assert "data:image/png;base64" in image
    invalid_data_url = image.replace('data:image/png', 'data:image/foo')

    clip_id = next(iter(shot_json['clips']))
    shot_json['clips'][clip_id]['image']['url'] = invalid_data_url

    resp = user.session.put(shot_data, json=shot_json,)
    print(resp.text)
    assert resp.status_code == 500


def test_invalid_jpeg_data_image():
    image = example_images[3]['url']
    (shot_data, shot_json, user) = user_setup()
    valid_header = "data:image/jpeg;base64,/9j/2wBDAAQDAwQDAwQEAwQFBAQ"
    invalid_header = "data:image/jpeg;base64,BAAQ"
    assert valid_header in image

    clip_id = next(iter(shot_json['clips']))
    shot_json['clips'][clip_id]['image']['url'] = invalid_header

    resp = user.session.put(shot_data, json=shot_json,)
    print(resp.text)
    assert resp.status_code == 500


def test_invalid_data_jpeg_image_decoded():
    image = example_images[3]['url']
    (shot_data, shot_json, user) = user_setup()
    assert '/9j/2wBDAAQDAwQDAw' in image
    invalid_data_image = 'data:image/jpeg;base64,someIM4gEt0Try'

    clip_id = next(iter(shot_json['clips']))
    shot_json['clips'][clip_id]['image']['url'] = invalid_data_image

    resp = user.session.put(shot_data, json=shot_json,)
    print(resp.text)
    assert resp.status_code == 500


if __name__ == "__main__":
    test_invalid_jpeg_data_image()
    test_invalid_png_data_image()
    test_invalid_png_data_image_decoded()
    test_invalid_data_jpeg_image_decoded()
    test_invalid_data_url()
