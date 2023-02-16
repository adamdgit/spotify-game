import axios from "axios"

export async function getUserInfo(token) {

  let userData = []
  let errorMsg = false
  
  await axios.get(`https://api.spotify.com/v1/me/playlists`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }).then((res) => {
    userData = res.data
  }).catch(error => errorMsg = error)

  return { errorMsg, userData }
}
