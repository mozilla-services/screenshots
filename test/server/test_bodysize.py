#!../../.venv/bin/python

from clientlib import ScreenshotsClient
import random
from requests import HTTPError

# Hack to make this predictable:
random.seed(0)


def test_put_large_image():
    user = ScreenshotsClient()
    user.login()
    try:
        user.create_shot(pad_image_to_length=100 * 1000 * 1000)
    except HTTPError, e:
        if e.response.status_code != 413:
            raise


if __name__ == "__main__":
    test_put_large_image()
