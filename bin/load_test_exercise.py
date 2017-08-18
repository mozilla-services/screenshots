#!/usr/bin/env python

import requests
import argparse
from urlparse import urljoin
import uuid
import os
import time
import random
import json

parser = argparse.ArgumentParser(description='Run some tests on a Screenshots server')
parser.add_argument('url', metavar='URL', type=str, nargs=1,
                    help='URL of the backend to test')

parser.add_argument('--create', metavar='N', type=int, default=1,
                    help='Create a shot N times')
parser.add_argument('--little-image', action='store_true',
                    help='Only create shots with the little image')
parser.add_argument('--read-shot', metavar='N', type=int, default=1,
                    help='Read a shot N times (should create one before)')
parser.add_argument('--read-my-shots', metavar='N', type=int, default=1,
                    help='Read /shots N times')
parser.add_argument('--search', metavar='N', type=int, default=1,
                    help='Search /shots N times with randomish queries')
parser.add_argument('--times', metavar='M', type=int, default=1,
                    help='Do everything M times (i.e., do each action N x M times)')
parser.add_argument('--new-account', action='store_true',
                    help='Create a new account on each run')
parser.add_argument('--quiet', '-q', action='count',
                    help='Be a little more quiet')
# FIXME: no option for /redirect
# FIXME: no option for /event

example_images = {}
execfile(os.path.join(os.path.dirname(__file__), "load_test_exercise_images.py"), example_images)
example_images = example_images["example_images"]

args = parser.parse_args()

backend = args.url[0]


def make_device_info():
    return dict(
        addonVersion='0.1.2014test',
        platform='test',
    )


def make_uuid():
    return str(uuid.uuid1()).replace("-", "")


def make_random_id():
    return make_uuid()[:16]


def reset_device_info():
    global deviceInfo, deviceId, secret, session
    deviceInfo = make_device_info()
    deviceId = make_uuid()
    secret = make_uuid()
    session = requests.Session()


reset_device_info()


def login():
    resp = session.post(
        urljoin(backend, "/api/login"),
        data=dict(deviceId=deviceId, secret=secret, deviceInfo=json.dumps(deviceInfo)))
    if resp.status_code == 404:
        resp = session.post(
            urljoin(backend, "/api/register"),
            data=dict(deviceId=deviceId, secret=secret, deviceInfo=json.dumps(deviceInfo)))
    resp.raise_for_status()


def delete_account():
    resp = session.post(
        urljoin(backend, "/leave-screenshots/leave"),
        json={})
    resp.raise_for_status()


def create_shot():
    shot_id = make_random_id() + "/test.com"
    shot_url = urljoin(backend, shot_id)
    shot_data = urljoin(backend, "data/" + shot_id)
    resp = session.put(
        shot_data,
        json=make_example_shot(),
    )
    resp.raise_for_status()
    return shot_url


def read_shot(url):
    # FIXME: should get at least the clip image subresource itself
    resp = session.get(url)
    resp.raise_for_status()


def read_my_shots():
    resp = session.get(urljoin(backend, "/shots"))
    resp.raise_for_status()


def search_shots(q=None):
    if q is None:
        q = make_search_query()
    resp = session.get(urljoin(backend, "/shots"), params={"q": q})
    resp.raise_for_status()


def make_example_shot():
    if args.little_image:
        image = example_images[-1]
    else:
        image = random.choice(example_images)
    text = []
    for i in range(10):
        text.append(random.choice(text_strings))
    text = " ".join(text)
    return dict(
        deviceId=deviceId,
        url="http://test.com/?" + make_uuid(),
        docTitle="Load test page",
        createdDate=int(time.time() * 1000),
        favicon=None,
        siteName="test site",
        clips={
            make_uuid(): dict(
                createdDate=int(time.time() * 1000),
                sortOrder=100,
                image=dict(
                    url=image["url"],
                    captureType="selection",
                    text=text,
                    location=dict(
                        top=100,
                        left=100,
                        bottom=100 + image["height"],
                        right=100 + image["width"],
                    ),
                    dimensions=dict(
                        x=image["width"],
                        y=image["height"],
                    ),
                ),
            ),
        },
    )


def make_search_query():
    return random.choice(search_strings)


text_strings = """
Example strings like apple orange banana some stuff like whatever and whoever
and bucket blanket funky etc keyboard screen house window tree leaf leaves
feather feathers
""".split()

search_strings = """
nothing 12345
""".split() + text_strings

login_happened = False


def run():
    global login_happened
    shot_urls = []
    total = 0
    counts = (
        [create_shot, args.create],
        [read_shot, args.read_shot],
        [read_my_shots, args.read_my_shots],
        [search_shots, args.search],
    )
    for func, count in counts:
        total += count
    while total:
        if not login_happened:
            login()
            login_happened = True
            continue
        num = random.randrange(total)
        for item in counts:
            num -= item[1]
            if num <= 0:
                if not args.quiet:
                    print("Running %13s of %5i (from %5i)" % (item[0].__name__, item[1], total))
                if item[0] == read_shot and not shot_urls:
                    print("  Skipping because there are no shots")
                    continue
                if item[0] == read_shot:
                    result = item[0](random.choice(shot_urls))
                else:
                    result = item[0]()
                if item[0] == create_shot:
                    shot_urls.append(result)
                    if not args.quiet:
                        print("  Created %i shot: %s" % (len(shot_urls), result))
                item[1] -= 1
                total -= 1
                break


def main():
    try:
        for i in range(args.times):
            run()
            print("Finished run %i/%i" % (i + 1, args.times))
            if args.new_account:
                reset_device_info()
                login()
    except KeyboardInterrupt:
        print("Early abort")
    # uncomment after supporting csrf token
    # print "Deleting account"
    # delete_account()


if __name__ == "__main__":
    main()
