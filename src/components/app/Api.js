const apiKey = '23a6b118f764474058c6d026b8ee1343'

async function getResource(query, pageState, choiseState, userIdState) {
  const page = pageState
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  const url =
    choiseState === 'search'
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
      : `https://api.themoviedb.org/3/guest_session/${userIdState}/rated/movies?api_key=${apiKey}&page=${page}&sort_by=created_at.asc`

  const resp = await fetch(url, options)
  const data = await resp.json()
  // console.log('data')
  // console.log(data)
  return data
}

async function getGenres() {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  const options = { method: 'GET', headers: { accept: 'application/json' } }
  const resp = await fetch(url, options)
  const data = await resp.json()
  const { genres } = data
  return genres
}

async function createSession() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}&`
  const resp = await fetch(url, options)
  const data = await resp.json()
  const userId = data.guest_session_id
  return userId
}

async function addRating(userId, movieId, value) {
  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' },
    body: `{"value":${value}}`,
  }
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?&api_key=${apiKey}&guest_session_id=${userId}`
  fetch(url, options)
}

export { getResource, createSession, addRating, getGenres }
