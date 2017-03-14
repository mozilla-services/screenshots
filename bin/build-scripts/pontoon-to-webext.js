#! /usr/bin/env node

/* eslint-disable promise/avoid-new */

const propertiesParser = require('properties-parser');
const path = require('path');
const FS = require('q-io/fs');
const argv = require('minimist')(process.argv.slice(2));

const Habitat = require('habitat');
Habitat.load();

const regexPlaceholders = /\{([A-Za-z0-9_@]*)\}/g;
let supportedLocales = process.env.SUPPORTED_LOCALES || '*';

const config = {
  'dest': argv.dest || 'dist/_locales',
  'src': argv.src || 'locales',
  'default_locale': argv.locale || 'en-US'
};

function log(...args) {
  console.log(...args);  // eslint-disable-line no-console
}

function error(...args) {
  console.error(...args);  // eslint-disable-line no-console
}

function fatal(...args) {
  error(...args);
  process.exit(1);
}

function getListLocales() {
  return new Promise((resolve, reject) => {
    if (supportedLocales === '*') {
      FS.listDirectoryTree(path.join(process.cwd(), config.src)).then((dirTree) => {
        const localeList = [];

        // Get rid of the top level, we're only interested with what's inside it
        dirTree.splice(0,1);
        dirTree.forEach((localeLocation) => {
          // Get the locale code from the end of the path. We're expecting the structure of Pontoon's output here
          const langcode = localeLocation.split(path.sep).slice(-1)[0];

          if (langcode) {
            localeList.push(langcode);
          }
        });
        return resolve(localeList);
      }).catch((e) => {
        reject(e);
      });
    } else {
      supportedLocales = supportedLocales.split(',').map(item => item.trim());
      resolve(supportedLocales);
    }
  });
}

function writeFiles(entries) {
  for (const entry of entries) {
    const publicPath = path.join(process.cwd(), config.dest, entry.locale.replace('-', '_'));
    const localesPath = path.join(publicPath, 'messages.json');

    FS.makeTree(publicPath).then(() => {
      return FS.write(localesPath, JSON.stringify(entry.content, null, 2));
    }).then(() => {
      log(`Done compiling locales at: ${localesPath}`);
    }).catch((e) => {
      fatal(e);
    });
  }
}

function readPropertiesFile(filePath) {
  return new Promise((resolve, reject) => {
    propertiesParser.read(filePath, (messageError, messageProperties) => {
      if (messageError && messageError.code !== 'ENOENT') {
        return reject(messageError);
      }
      resolve(messageProperties);
    });
  });
}

function getContentPlaceholders() {
  return new Promise((resolve, reject) => {
    FS.listTree(path.join(process.cwd(), config.src, config.default_locale), (filePath) => {
      return path.extname(filePath) === '.properties';
    }).then((files) => {
      return Promise.all(files.map(readPropertiesFile)).then((properties) => {
        const mergedPlaceholders = {};

        properties.forEach(messages => {
          const placeholders = {};
          Object.keys(messages).forEach(key => {
            const message = messages[key];
            if (message.indexOf('{') !== -1) {
              const placeholder = {};
              let index = 1;
              message.replace(regexPlaceholders, (item, key) => {
                placeholder[key.toLowerCase()] = { content: `$${index}` };
                index++;
              });
              placeholders[key] = placeholder;
            }
          });
          Object.assign(mergedPlaceholders, placeholders);
        });

        resolve(mergedPlaceholders);
      });
    }).catch((e) => {
      reject(e);
    });
  });
}

function getContentMessages(locale, placeholders) {
  return new Promise((resolve, reject) => {
    FS.listTree(path.join(process.cwd(), config.src, locale), (filePath) => {
      return path.extname(filePath) === '.properties';
    }).then((files) => {
      return Promise.all(files.map(readPropertiesFile)).then((properties) => {
        const mergedProperties = {};

        properties.forEach(messages => {
          Object.keys(messages).forEach(key => {
            let message = messages[key];
            messages[key] = { 'message': message };
            if (placeholders[key]) {
              message = message.replace(regexPlaceholders, (item, key) => `\$${key.toUpperCase()}\$`);
              messages[key] = {
                'message': message,
                'placeholders': placeholders[key]
              };
            }
          });
          Object.assign(mergedProperties, messages);
        });

        resolve({content: mergedProperties, locale: locale});
      });
    }).catch((e) => {
      reject(e);
    });
  });
}

function processMessageFiles(locales) {
  if (!locales) {
    fatal('List of locales was undefined. Cannot run pontoon-to-webext.');
  }
  if (locales.length === 0) {
    fatal('Locale list is empty. Cannot run pontoon-to-webext.');
  }
  log(`processing the following locales: ${locales.toString()}`);
  return getContentPlaceholders().then(placeholders => {
    return Promise.all(locales.map(locale => getContentMessages(locale, placeholders)));
  });
}

getListLocales().then(processMessageFiles)
.then(writeFiles).catch((err)=> {
  error(err);
});
