export default async function request(url) {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("We can't find a challenge with that URL!");
    } else if (response.status >= 500) {
      throw new Error('We are having trouble connecting to Codewars right now.');
    } else {
      throw new Error('Request failed!');
    }
  }
  const json = await response.json();
  return json;
}
