import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const MainContentHeader = () => {
  const { selectedUser } = useContext(UserContext);
  return (
    <div className="main-content-header">
      <h2>
        {selectedUser ? (
          <>
            Overview for{" "}
            <span className="username">{selectedUser.username}</span>
          </>
        ) : (
          "Start by selecting a user to track their performance"
        )}
      </h2>
    </div>
  );
};

export default MainContentHeader;
