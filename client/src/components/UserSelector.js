import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { fetchUsers } from "../api/userAPI";

const UserSelector = () => {
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(searchTerm);
        setUsers(data?.users ?? []); // Use optional chaining and nullish coalescing
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Ensure users is always an array
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="user-selector">
      <input
        className="user-search"
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setSelectedUser(user.id)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSelector;
