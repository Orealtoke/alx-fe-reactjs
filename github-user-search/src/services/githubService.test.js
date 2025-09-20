import axios from "axios";
import { fetchAdvancedUsers } from "./githubService";

// Mock axios so we don’t make real API calls
jest.mock("axios");

describe("fetchAdvancedUsers", () => {
  it("calls GitHub API with correct query", async () => {
    // Pretend axios always returns empty items
    axios.get.mockResolvedValue({ data: { items: [] } });

    // Call our function
    await fetchAdvancedUsers("octocat", "lagos", 10);

    // Check that axios was called with the right query
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining(
        "q=octocat%20in%3Alogin%20location%3Alagos%20repos%3A%3E%3D10"
      )
    );
  });
});
