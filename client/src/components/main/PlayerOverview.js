import React, { useState, useEffect, useContext } from "react";
import { fetchChessComStats } from "../../api/userAPI";

import { UserContext } from "../../context/UserContext";
import "../../assets/styles/Home.css";

const PlayerOverview = () => {
  const { selectedUser } = useContext(UserContext);
  const [chessComStats, setChessComStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeControlSelected, setTimeControlSelected] = useState("");

  const handleSelectTimeControl = (timeControl) => {
    console.log("Need to define time control selection function");
    setTimeControlSelected(timeControl);
  };

  useEffect(() => {
    if (!selectedUser) return;

    const fetchStats = async () => {
      setLoading(true);
      const userStats = await fetchChessComStats(selectedUser["username"]);
      setChessComStats(userStats);
      setLoading(false);
    };

    fetchStats();
    // const mockStats = {
    //   chess_rapid: {
    //     last: {
    //       rating: 1200,
    //     },
    //     record: {
    //       win: 50,
    //       loss: 45,
    //       // draw: 4,
    //     },
    //   },
    //   chess_blitz: {
    //     last: {
    //       rating: 855,
    //     },
    //     record: {
    //       win: 500,
    //       loss: 458,
    //       draw: 40,
    //     },
    //   },
    //   chess_bullet: {
    //     last: {
    //       rating: 570,
    //     },
    //     record: {
    //       win: 15,
    //       loss: 17,
    //       draw: 2,
    //     },
    //   },
    // };
    // setLoading(false);
    // setChessComStats(mockStats);
  }, [selectedUser]);

  const TimeControl = ({ timeControl }) => {
    return (
      <div
        className={
          "time-control" +
          (timeControlSelected === timeControl ? " selected" : "")
        }
        onClick={() => handleSelectTimeControl(timeControl)}
      >
        <div className="time-control-title">
          <img
            src={`images/logo-${timeControl.slice(6)}.png`}
            alt={`${timeControl} Logo`}
          />
          <h3>
            {timeControl.slice(6).charAt(0).toUpperCase() +
              timeControl.slice(7)}
          </h3>
        </div>
        <p className="elo">
          {chessComStats[timeControl]?.last?.rating ?? "N/A"}
        </p>
        <p className="record">
          {formatRecord(chessComStats[timeControl]?.record)}
        </p>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading stats...</div>;

  return (
    <div className="player-overview">
      <h2>All-Time Record</h2>
      <div className="time-control-container">
        {["chess_rapid", "chess_blitz", "chess_bullet"].map((timeControl) => (
          <TimeControl timeControl={timeControl} />
        ))}
      </div>
    </div>
  );
};

const formatRecord = (record) => {
  const wins = record?.win ?? 0;
  const losses = record?.loss ?? 0;
  const draws = record?.draw ?? 0;

  return `(${wins} - ${losses} - ${draws})`;
};

export default PlayerOverview;
