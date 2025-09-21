import axios from "axios";

export const fetchUserData = async (username, location, repos) => {
  const query = `q=${username ? username : ""}${
    location ? `+location:${location}` : ""
  }${repos ? `+repos:>=${repos}` : ""}`;

  const response = await axios.get(
    `https://api.github.com/search/users?${query}`
  );

  return response.data.items;
};

