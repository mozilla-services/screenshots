#!/usr/bin/env python
import sys

if not sys.argv[1:] or '-h' in sys.argv:
    print "Usage:"
    print "  %s variableName FILENAME.css > FILE.js"
    print "Turns the content of FILENAME.css into a variable in FILE.js"
    sys.exit()

variable = sys.argv[1]
filename = sys.argv[2]
content = open(filename, 'rb').read()
content = content.replace('\\', '\\\\').replace('`', '\\`')
print """/* Created from %s */
window.%s = `
%s
`;
null;
""" % (filename, variable, content)
