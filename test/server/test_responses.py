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
        try:
            user.create_shot(pad_image_to_length=100 * 1000 * 1000)
        except HTTPError, e:
            if e.response.status_code != 413:
                raise
    finally:
        user.delete_account()


def test_bad_id():
    user = ScreenshotsClient()
    user.login()
    try:
        try:
            user.create_shot(shot_id="!!!/test.com")
        except HTTPError, e:
            if e.response.status_code != 400:
                raise
    finally:
        user.delete_account()


if __name__ == "__main__":
    test_put_large_image()
    test_bad_id()
