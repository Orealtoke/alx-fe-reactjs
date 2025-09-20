import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { fetchGitHubUser } from "./services/githubService";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (username) => {
    try {
      setError("");
      const data = await fetchGitHubUser(username);
      setUser(data);
    } catch (err) {
      setError("User not found");
      setUser(null);
    }
  };

  return (
    <div>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserCard user={user} />
    </div>
  );
}

export default App;
