export default function addIdToItems(items) {
  return Object.entries(items).map(([id, item]) => ({ ...item, id }));
}
