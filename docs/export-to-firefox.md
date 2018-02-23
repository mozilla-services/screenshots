# Exporting to Firefox

Firefox Screenshots is developed in GitHub, but on each release we export into the Firefox
source tree.

Start the system addon release process by copying the following checklist into a new github bug, then work through the list:

- [ ] Bump the minor version number in package.json, following our [version numbering conventions](https://github.com/mozilla-services/screenshots/issues/2647)
- [ ] If exporting from a branch besides master, review differences in locales between the export: <br> `git diff --shortstat HEAD..master locales/` (`--shortstat` gives a summary, `--numstat` is more detailed, remove to see full diff)
- [ ] Update changelog: `./bin/generate-commit-log --write recent`
- [ ] Create tag: `git tag MAJOR.MINOR.0` – the version should be higher than the version currently in `package.json` (e.g., if the in-development version is 10.0.0, then tag 10.1.0)
- [ ] Push tag: `git push --tags`
- [ ] Merge master to `firefox-export` branch: `git checkout firefox-export && git merge master && git push`
- [ ] Create a Bugzilla release bug, [cloning bug 1403661](https://bugzilla.mozilla.org/enter_bug.cgi?format=__default__&product=Firefox&cloned_bug_id=1403661)
  - Use "Show Advanced Fields" and review CC list and dependencies
  - Ensure the bug is filed under the Cloud Services product, Screenshots component
  - Assign yourself to the bug
- [ ] Export Screenshots to a local copy of Gecko:
  - If you've never exported to Firefox before, do `make .venv` in the Screenshots repo
  - Make sure the mozilla-central branch is checked out in your local copy of Gecko, and make sure it is up to date
  - Export changes: `EXPORT_MC_LOCATION=path/to/gecko ./bin/export_mc.py --no-commit --no-switch-branch`
- [ ] In your copy of Gecko, double-check the diff, and split the changes into two commits: one containing any translations and any translation-related changes to the `moz.build` file, and one containing non-translation code.
  - Ensure your commit messages follow the [Firefox bug conventions](https://mdn.io/Committing_Rules_and_Responsibilities), for example: 
    - `"Bug 1436218 - Export Screenshots 29.0.0 to Firefox (code excluding translations); r?ianb"`
    - `"Bug 1436218 - Export Screenshots 29.0.0 to Firefox (translations only); r?ianb"`
  - Choosing reviewers:
    - For all changes, r? a [Screenshots owner or peer](https://wiki.mozilla.org/Modules/All#Screenshots) (currently ianb or 6a68)
    - For translation-only changes, also r? the [l10n driver for Firefox](https://wiki.mozilla.org/L10n:Mozilla_Team) (currently flod)
    - For changes to chrome-privileged code or security-sensitive content script code, also r? a [Firefox peer](https://wiki.mozilla.org/Modules/All#Firefox) (suggested: kmag or mossop)
    - For changes to screenshots UI code not inside a content script, also r? a Firefox peer if the additional review seems warranted
    - This guidance may change in the future. Last communication on this topic: [bug 1412091 comment 6](https://bugzilla.mozilla.org/show_bug.cgi?id=1412091#c6)
- [ ] Push the changes to the Try server
  - Suggested incantation: `./mach try -b o -p linux64,macosx64,win32,win64 -u all -t all --rebuild-talos 5 --no-artifact`
  - When running tests against mozilla-beta, run the above incantation for regular unit tests and Talos testing against osx, then also run this separate build to test Talos against pgo builds for windows and linux: `./mach try fuzzy -q 'pgo talos-'`
  - See [#2822](https://github.com/mozilla-services/screenshots/issues/2822) for Talos and Treeherder basics
- [ ] Add the Try links to the release bug
- [ ] Push the review request to reviewboard using mozreview, also known as [Mozilla VCS tools](https://mozilla-version-control-tools.readthedocs.io/en/latest/)
  - `git mozreview push` will work if you are using git-cinnabar and have mozreview configured
  - To configure mozreview for use with git and git-cinnabar, see [this helpful blog post](https://sny.no/2016/03/geckogit)
  - Note that this step should automatically attach the patch to the Bugzilla bug and request review from the reviewer mentioned in the commit message (should be reflected as an r? flag on the Bugzilla attachment)
- [ ] Bump the major version number in package.json, following our [version numbering conventions](https://github.com/mozilla-services/screenshots/issues/2647) (master only, this is to prepare for the next release)
- [ ] Open a Github PR with both version number commits and the changelog commit
- [ ] Relax! :beers:
