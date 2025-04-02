const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
