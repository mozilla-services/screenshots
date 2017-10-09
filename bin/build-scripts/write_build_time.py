#!/usr/bin/env python

import time
now = time.time()
formatted = time.strftime("%B %d, %Y %H:%M:%S UTC", time.gmtime())

print 'exports.string = %r' % formatted
# Note Javascript uses milliseconds:
print 'exports.timestamp = %i' % int(now * 1000)

import subprocess
print 'exports.gitrevision = %r' % subprocess.check_output(
    ["git", "describe", "--tags", "--always"]).strip()
