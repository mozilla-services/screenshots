# Server release How-To

To release the server:

- [ ] Bump the version in `package.json`
- [ ] Generate a new changelog with:
  - `./bin/generate-commit-log --write recent`
- [ ] Commit version change and changelog
- [ ] Tag with `git tag VERSION`
- [ ] Push version and tags, `git push && git push --tags`
- [ ] Merge to `server-prod`:
  - `git checkout server-prod && git merge master && git push`
  - This will trigger a deploy to stage
  - IRC will be updated
  - https://screenshots.stage.mozaws.net/__version__ will show the status
- [ ] Ping relud on IRC to deploy to prod
  - https://screenshots.firefox.com/__version__ will show the status
