export default async function request(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Request failed!');
  }
  const json = await response.json();
  return json;
}
