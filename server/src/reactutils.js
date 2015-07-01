exports.addReactScripts = function (body, addScript) {
  let footer = "</body></html>";
  let frontmatter = body.slice(0, body.length - footer.length);
  return (`<!DOCTYPE html>
${frontmatter}
<script>
${addScript}
</script>
${footer}`
  );
};
