import React, { useState } from "react";
import { fetchUserData } from "../services/githubService"; 

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        
      const data = await fetchUserData(username, location, minRepos);
      setResults(data);
    } catch (err) {
      setError("Looks like we can't find the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Search username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Min repositories..."
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="mt-4">
        {results.length > 0 &&
          results.map((user) => (
            <div key={user.id} className="border p-2 mb-2">
              <img src={user.avatar_url} alt={user.login} className="w-16" />
              <p>{user.login}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
