#!/usr/bin/env python

import os
import sys
import json
base = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

template = open(os.path.join(base, "addon", "template.update.rdf")).read()
package_json = json.loads(sys.stdin.read())
version = package_json["version"]
rdf = template.replace("VERSION", version)
print rdf
