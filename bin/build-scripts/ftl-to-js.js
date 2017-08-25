#!/usr/bin/env node

// This is called by make. argv[2] is the destination directory. The the args
// after are the paths to ftl files.
//
// The destination directory has been created at this point.

const fs = require('fs');
const destDir = process.argv[2];
const ftlPaths = process.argv.slice(3);

for (let ftl of ftlPaths) {
  let locale = ftl.split('/')[1];
  let destFilePath = `${destDir}/${locale}.js`;
  let ftlFileContent = fs.readFileSync(ftl, 'utf8');
  // No UMD; for browser only.
  let jsFileContent = `
    (context => {
      let messages=${JSON.stringify(ftlFileContent)};
      context.l10nMessages = context.l10nMessages || {};
      context.l10nMessages['${locale}'] = messages;
    })(this);
  `;
  fs.writeFileSync(destFilePath, jsFileContent, 'utf8');
}
