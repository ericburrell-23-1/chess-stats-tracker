const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const CHESS_COM_URL = "https://api.chess.com/pub/player/";

export const fetchUsers = async (searchTerm = "") => {
  try {
    const url = new URL(`${API_BASE_URL}/api/users`);
    if (searchTerm) {
      url.searchParams.append("search", searchTerm);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addNewUser = async (username) => {
  try {
    const url = new URL(`${API_BASE_URL}/api/users/new-user/${username}`);
    const response = await fetch(url, { method: "POST" });
    const data = await response.json();

    return { status: response.status, data };
  } catch (error) {
    console.error("Error adding new user:", error);
    return { status: 500, data: { error: "Network error" } };
  }
};

const headers = {
  "User-Agent": "Chess-stat-tracker client/1.0 (development phase)",
};
export const fetchChessComStats = async (username) => {
  try {
    const url = CHESS_COM_URL + username + "/stats";
    const response = await fetch(url, { headers: headers });

    return await response.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {};
  }
};
