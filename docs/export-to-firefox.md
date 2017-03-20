# Exporting to Firefox

Page Shot is developed in GitHub, but on each release we export into the Firefox
source tree.

The process of exporting will checkout the default branch, and then create a new
branch (in git), or a new bookmark (in mercurial).

To start the process, check Firefox out into some location, we'll say `~/src/gecko`

Then run:

```sh
$ make .venv
$ ./bin/export_mc.py --branch export-version-abc \
    --commit-message "Bug 123456 - Export Add-on Version TBD to m-c." \
    --mozilla-central-repo=~/src/gecko
$ cd ~/src/gecko
```

You can avoid setting `--mozilla-central-repo` each time by defining
EXPORT_MC_LOCATION in the environment.

See `--help` for the full list of options. In particular you may wish to use:

* `--server`
  * The server for the add-on to connect to, i.e. local, dev, stage or prod.
* `--build`
  * Automatically build Firefox once exported
* `--run-tests`
  * Automatically run tests once built (needs the `--build` option)
* `--push-to-try`
  * Automatically push the result to try, running on all platforms and most
  relevant test suites. If you want to run on others, you can do a simple export
  and manually push to try with `./mach try`
