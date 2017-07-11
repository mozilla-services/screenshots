# Exporting to Firefox

Firefox Screenshots is developed in GitHub, but on each release we export into the Firefox
source tree.

Start the system addon release process by copying the following checklist into a new github bug, then work through the list:

- [ ] Bump the minor version number in package.json, following our [version numbering conventions](https://github.com/mozilla-services/screenshots/issues/2647)
- [ ] Update changelog: `./bin/generate-commit-log --write stable..master`
- [ ] Create tag: `git tag MAJOR.MINOR.0` – the version should be higher than the version currently in `package.json` (e.g., if the in-development version is 10.0.0, then tag 10.1.0)
- [ ] Push tag: `git push --tags`
- [ ] Merge master to stable: `git checkout stable && git merge master && git push`
- [ ] Create a Bugzilla release bug, [cloning bug 1368146](https://bugzilla.mozilla.org/enter_bug.cgi?format=__default__&product=Cloud%20Services&cloned_bug_id=1368146)
  - Use "Show Advanced Fields" and review CC list and dependencies
  - Ensure the bug is filed under the Cloud Services product, Screenshots component
  - Assign yourself to the bug
- [ ] Export Screenshots to a local copy of Gecko (see 'Using export_mc.py' section below)
  - Ensure your commit message follows the [Firefox bug conventions](https://mdn.io/Committing_Rules_and_Responsibilities), for example: "Bug 1362550 - Export Screenshots 6.6.0 to Firefox; r?kmag"
- [ ] Review diff one last time, `git diff HEAD~..HEAD`
- [ ] Push the changes to the Try server
  - Suggested incantation: `./mach try -b o -p linux64,macosx64,win32,win64 -u all -t all --rebuild-talos 5`
- [ ] Add the Try link to the release bug
- [ ] Push the review request to reviewboard using mozreview, also known as [Mozilla VCS tools](https://mozilla-version-control-tools.readthedocs.io/en/latest/)
  - `git mozreview push` will work if you are using git-cinnabar and have mozreview configured
  - To configure mozreview for use with git and git-cinnabar, see [this helpful blog post](https://sny.no/2016/03/geckogit)
  - Note that this step should automatically attach the patch to the Bugzilla bug and request review from the reviewer mentioned in the commit message (should be reflected as an r? flag on the Bugzilla attachment)
- [ ] Bump the major version number in package.json, following our [version numbering conventions](https://github.com/mozilla-services/screenshots/issues/2647) (master only, this is to prepare for the next release)
- [ ] Open a Github PR with both version number commits and the changelog commit
- [ ] Relax! :beers:


### Using `export_mc.py`
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
* `--no-switch-branch`
  * If you encounter problems because your local copy doesn't have a 'default'
    branch, use this option to simply commit to whatever branch is checked out
    in your local copy of Gecko.
