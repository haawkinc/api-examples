const fetch = require('node-fetch');

const apiKey = 'API KEY' // replace this

async function fetchChunk(maxId) {
  let url = 'https://api.identifyy.com/v1/youtube_whitelists'

  if (maxId) {
    url = `${url}?max_id=${maxId}`
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })

  return await response.json()
}

async function fetchAll() {
  let allItems = []
  let chunk = []
  let maxId = null

  do {
    chunk = await fetchChunk(maxId)

    if (!!chunk.length) {
      allItems = [...allItems, ...chunk]
      maxId = chunk[chunk.length - 1].id
    }
  } while (chunk.length == 100)

  return allItems
}


(async () => {
  try {
    let whitelists = await fetchAll()
    console.log(whitelists)
  } catch (e) {
    console.error(e)
  }
})();
