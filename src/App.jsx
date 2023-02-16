import { createSignal } from "solid-js";
import Search from "./components/Search";
import { getUserInfo } from "./api/getUserInfo";

function App() {

  const CLIENT_ID = SOLID_APP_SPOTIFY_ID;
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = 'user-library-read%20user-library-modify%20user-top-read%20user-read-private%20user-read-recently-played%20user-read-email%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-modify-public%20playlist-read-private%20streaming'

  const [token, setToken] = createSignal(null)
  const [username, setUsername] = createSignal()
  const [userID, setUserID] = createSignal()

  let hash = window.location.hash

  // get token from redirected URL and save to local storage
  if (!token() && hash) {
    console.log('redirected success')
    let token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
    window.location.hash = ''
    window.localStorage.setItem('token', token)
    setToken(token)
  }

  (async function() {
    if(token() !== null) {
      console.log('get user info')
      const { errorMsg, data } = await getUserInfo(token());
      if(errorMsg) {
        console.error(errorMsg)
        setToken('')
        window.localStorage.removeItem('token')
      }
      else {
        setUserID(data.id)
        setUsername(data.display_name)
      }
    }
  })();

  return (
    <div class="app">
      {!token() ?
        <span>
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`} className="login">
            Login
          </a>
        </span>
      : 
        <Search token={token()} userID={userID()} username={username()}/>
      }
    </div>
  );
}

export default App;
