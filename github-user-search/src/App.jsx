import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Search from "./components/Search";

  function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
   const [count, setCount] = useState(0)

  const handleSearch = async () => {
    if (!query) return;
    const results = await searchUsers(query);
    setUsers(results);
  };

  return (
    <>
     <div>
      <h1>GitHub User Search</h1>
      <Search />
    </div>
    
    <div>
      <h1>GitHub User Search</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
