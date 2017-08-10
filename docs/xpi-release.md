# Releasing an XPI

If you aren't doing a simple [export to Firefox](./export-to-firefox.md) then you'll need to create an XPI that can be distributed to users.

To create a production-ready XPI, run:

```sh
$ git checkout firefox-export # you should probably be doing this from this branch
$ ./bin/build-prod-xpi
```

This will create `./screenshots-VERSION.xpi`. The xpi is unsigned. See [this bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1388879) for an example request to have the XPI signed (or (clone it directly)(https://bugzilla.mozilla.org/enter_bug.cgi?format=__default__&product=Cloud%20Services&cloned_bug_id=1388879)).
