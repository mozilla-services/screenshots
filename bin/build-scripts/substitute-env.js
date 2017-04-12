#!/usr/bin/env node

const fs = require("fs");

if (process.argv.length <= 2 || process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log("Usage:");
  console.log("  substitute-env.js FILENAME");
  console.log("Prints out the contents of FILENAME with process.env.NAME substituted for the equivalent string, or for the empty string");
  process.exit()
}

let content = fs.readFileSync(process.argv[2], "UTF-8");

let newContent = content.replace(/process\.env\.([a-zA-Z0-9_]+)/g, (match, variable) => {
  let value = process.env[variable] || "";
  return JSON.stringify(value);
});

process.stdout.write(newContent);
