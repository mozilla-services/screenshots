#!/usr/bin/env node

// This is called by make. argv[2] is the destination directory. The the args
// after are the paths to ftl files.
//
// The destination directory has been created at this point.

const fs = require('fs');
const destDir = process.argv[2];
const ftlPaths = process.argv.slice(3);

for (const ftl of ftlPaths) {
  const locale = ftl.split('/')[1];
  const destFilePath = `${destDir}/${locale}.js`;
  const ftlFileContent = fs.readFileSync(ftl, 'utf8');
  const jsFileContent = `
    (function(context) {
      var messages=${JSON.stringify(ftlFileContent)};
      if (typeof exports === 'object' && context === exports) {
        exports.messages = messages;
      } else {
        if (window && window.notifyL10nLoaded) {
          window.notifyL10nLoaded(${JSON.stringify(locale)}, messages);
        }
        context.l10nMessages = context.l10nMessages || {};
        context.l10nMessages[${JSON.stringify(locale)}] = messages;
      }
    })(this);
  `;
  fs.writeFileSync(destFilePath, jsFileContent, 'utf8');
}
