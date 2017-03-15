# Exporting to Firefox

Page Shot is developed in GitHub, but on each release we export into the Firefox source tree.

To start the process, check Firefox out into some location, we'll say `~/src/gecko`

Then run:

```sh
$ EXPORT_MC_LOCATION=~/src/gecko make export_addon
$ cd ~/src/gecko
$ hg status
# Now add or remove files to create a commit
```
