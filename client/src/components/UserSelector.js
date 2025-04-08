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
      <div className="user-list ">
        {users.map((user) => (
          <UserProfile
            key={user.id}
            user={user}
            onSelect={setSelectedUser}
            selectedClass={`${selectedUser?.id === user.id ? "selected" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserSelector;

const UserProfile = ({ user, onSelect, selectedClass }) => {
  return (
    <div
      className={`user-profile ${selectedClass}`}
      onClick={() => onSelect(user)}
    >
      <img
        className="user-avatar"
        src={user?.avatar_url ?? DEFAULT_AVATAR_URL}
        alt={`${user.username}'s avatar`}
      />
      <div className="user-info">
        <div className="user-header">
          <span className="user-username">{user.username}</span>
          {user?.flair_url && (
            <img className="user-flair" src={user.flair_url} alt="User flair" />
          )}
        </div>
        {user?.first_name || user?.last_name ? (
          <div className="user-fullname">
            {user?.first_name} {user?.last_name}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const DEFAULT_AVATAR_URL =
  "https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-chess-icon-in-square-with-shadow-on-white-background-vector-png-image_6985169.png";
