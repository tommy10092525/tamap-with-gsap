// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // github pagesなどの場合は以下の一行を追加
  //output: "export",
});