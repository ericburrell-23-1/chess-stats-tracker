import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { fetchUsers, addNewUser } from "../api/userAPI";

const UserSelector = () => {
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const exactMatch = users.some(
    (u) => u.username.toLowerCase() === searchTerm.toLowerCase()
  );
  const showAddUserOption =
    searchTerm.length > 0 &&
    !exactMatch &&
    !users.some((u) => u.username === "loading");

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

  const displayedUsers = isExpanded ? users : users.slice(0, 3);

  return (
    <div className="user-selector">
      <input
        className="user-search"
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div
        className="user-list "
        style={{ maxHeight: isExpanded ? "1000px" : "250px" }}
      >
        {displayedUsers.map((user) => (
          <UserProfile
            key={user.id}
            user={user}
            onSelect={setSelectedUser}
            selectedClass={`${selectedUser?.id === user.id ? "selected" : ""}`}
          />
        ))}
        {showAddUserOption && (
          <AddUserProfile
            username={searchTerm}
            onAdd={() => {
              addNewUser(searchTerm);
            }}
          />
        )}
      </div>
      {users.length > 3 && (
        <button
          className="toggle-user-list"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <div className="toggle-arrow">^</div>
              Show Less
            </>
          ) : (
            <>
              Show More
              <div className="toggle-arrow">⌄</div>
            </>
          )}
        </button>
      )}
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

const AddUserProfile = ({ username, onAdd }) => {
  return (
    <div className="user-profile add-user-profile" onClick={onAdd}>
      <div className="add-user-icon">➕</div>
      <div className="user-info">
        <div className="user-username">
          Search for and add "<strong>{username}</strong>"
        </div>
      </div>
    </div>
  );
};

const DEFAULT_AVATAR_URL =
  "https://png.pngtree.com/png-vector/20240529/ourmid/pngtree-chess-icon-in-square-with-shadow-on-white-background-vector-png-image_6985169.png";
