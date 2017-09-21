const fs = require('fs');
const path = require('path');

const redirects = `
  /api/codewars/* https://www.codewars.com/api/v1/:splat 200
  /* /index.html 200
`;

fs.writeFileSync(path.resolve(__dirname, '../build/_redirects'), redirects);
