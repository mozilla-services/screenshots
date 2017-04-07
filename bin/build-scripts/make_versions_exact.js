const fs = require("fs");

let packageJson = JSON.parse(fs.readFileSync("./package.json"));

for (let key of ["dependencies", "devDependencies", "optionalDependencies"]) {
  if (! (key in packageJson)) {
    continue;
  }
  let deps = packageJson[key];
  for (let packageName in deps) {
    packageJson[key][packageName] = packageJson[key][packageName].replace(/^\^/, "");
  }
}

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, "  ")+"\n");
