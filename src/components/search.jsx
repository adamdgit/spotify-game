import { createSignal, createEffect, For } from "solid-js"
import "./search.css"
import { searchSongs } from "../api/search"

export default function Search(props) {

  // destructure props, token prop passed as function getter 
  // is destructured as a variable
  const { token, username, userID } = props;
  const [searchQuery, setSearchQuery] = createSignal();
  const [searchResults, setSearchResults] = createSignal();

  async function handleSearch() {
    const { errorMsg, searchResult } = await searchSongs(token, searchQuery())
    console.log(searchResult.artists.items)
    setSearchResults(searchResult.artists.items);
  }

  return (
    <div class="library-container">
      <h1>Welcome: {props.username}</h1>
      <h2>Test your music knowledge</h2>
      <p>search and select an artist to play</p>
      <p>
        You will be given a random song preview to listen to, 
        try and guess which album out of 4 choices the song is from.
        Earn points for every correct guess.
      </p>
      <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={() => handleSearch()}>Search for an Artist</button>
      
      <div class="search-results">
      <For each={searchResults()}>
        {(item, index) =>
          <div>
            <img src={item.images[1].url} width={160} height={160} />
            {item.name}
          </div>}
      </For>
      </div>

    </div>
  )
}