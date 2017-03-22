exports.addReactScripts = function (body, addScript, cspNonce) {
  if (addScript) {
    let footer = "</body></html>";
    let frontmatter = body.slice(0, body.length - footer.length);
    addScript = addScript.replace(/<script/ig, "\\x3cscript").replace(/<\/script/ig, "\\x3c/script");
    return (`<!DOCTYPE html>
  ${frontmatter}
  <script nonce="${cspNonce}">
  ${addScript}
  </script>
  ${footer}`
    );
  } else {
    return `<!DOCTYPE html>\n${body}`;
  }
};
