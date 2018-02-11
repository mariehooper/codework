export function addIdToItems(items) {
  return Object.entries(items).map(([id, item]) => ({ ...item, id }));
}

export function emailIsWhitelisted(email) {
  const whitelist = ['marie.ashtari@gmail.com', 'patrick.d.hooper@gmail.com'];
  return email.endsWith('@umich.edu') || whitelist.includes(email);
}
