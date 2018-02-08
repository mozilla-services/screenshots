const fs = require("fs");

const packageJson = JSON.parse(fs.readFileSync("./package.json"));

for (const key of ["dependencies", "devDependencies", "optionalDependencies"]) {
  if (!(key in packageJson)) {
    continue;
  }
  const deps = packageJson[key];
  for (const packageName in deps) {
    packageJson[key][packageName] = packageJson[key][packageName].replace(/^\^/, "");
  }
}

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, "  ") + "\n");
