export function addIdToItems(items) {
  return Object.entries(items).map(([id, item]) => ({ ...item, id }))
}

export function emailIsWhitelisted(email) {
  const whitelist = ['marie.ashtari@gmail.com', 'patrick.d.hooper@gmail.com']
  return email.endsWith('@umich.edu') || whitelist.includes(email)
}

export async function getCodewarsChallenge(idOrSlug) {
  const response = await fetch(`/api/codewars/code-challenges/${idOrSlug}`)
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("We can't find a challenge with that URL!")
    } else if (response.status >= 500) {
      throw new Error('We are having trouble connecting to Codewars right now.')
    } else {
      throw new Error('Request failed!')
    }
  }
  const json = await response.json()
  return json
}

export function pluralize(word, count) {
  return `${count} ${word}${count === 1 ? '' : 's'}`
}

export function getFirebaseConfig(env) {
  if (env === 'production') {
    return {
      apiKey: 'AIzaSyAZ7UqAP3jO6DF6TGtGyFu2iGbcZWilWto',
      authDomain: 'letscodework.firebaseapp.com',
      databaseURL: 'https://letscodework.firebaseio.com',
      projectId: 'letscodework',
      storageBucket: 'letscodework.appspot.com',
      messagingSenderId: '1067511513584',
      appId: '1:1067511513584:web:1a3af87ef8ce56810e1d35'
    }
  }
  return {
    apiKey: 'AIzaSyDaUN3Jw6zowmzt5xEq0jiMX-H184EjH28',
    authDomain: 'letscodework-dev.firebaseapp.com',
    databaseURL: 'https://letscodework-dev.firebaseio.com',
    projectId: 'letscodework-dev',
    storageBucket: 'letscodework-dev.appspot.com',
    messagingSenderId: '365633932330',
    appId: '1:365633932330:web:b6ef76719bceded0a50753'
  }
}
