// eslint-disable-next-line import/prefer-default-export
export function emailIsWhitelisted(email) {
  const whitelist = ['marie.ashtari@gmail.com', 'patrick.d.hooper@gmail.com'];
  return email.endsWith('@umich.edu') || whitelist.includes(email);
}
