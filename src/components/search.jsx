import { createSignal, createEffect, For } from "solid-js"
import "./search.css"

export default function Search(props) {

  const [playlists, setPlaylists] = createSignal()

  

  return (
    <div class="library-container">
      <h1>Hello: {props.username}</h1>
      <h2>Playlists:</h2>
      <ul class="playlists">

      </ul>
    </div>
  )
}