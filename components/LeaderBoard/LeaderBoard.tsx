"use client";

import { getLeaderBoard } from "@/actions/user.actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface userData {
  _id: string;
  score: number;
  username: string;
  gamesPlayed: number;
}

function LeaderBoard() {
  const [leaderboard, setLeaderBoard] = useState([]);
  const getLeaderBoardData = async () => {
    const res = await getLeaderBoard();
    setLeaderBoard(res);
  };
  useEffect(() => {
    getLeaderBoardData();
  }, []);
  return (
    <div className="w-full p-4">
      {/* Home Link */}
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      <h3 className="text-xl font-bold mb-4 text-center">🏆 Leaderboard</h3>

      {leaderboard.length > 0 ? (
        <div className="w-full overflow-auto">
          <table className="table-auto bg-white w-full border-collapse shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#000080] text-white text-left">
                <th className="py-3 px-5 border-b border-r text-[12px]">
                  Rank
                </th>
                <th className="py-3 px-5 border-b border-r text-[12px]">
                  Username
                </th>
                <th className="py-3 px-2 border-b text-[12px]">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((board: userData, index: number) => (
                <tr
                  key={board._id}
                  className="hover:bg-gray-100 border-b text-gray-700 text-[12px]"
                >
                  <td className="py-3 px-5 border-r">{index + 1}</td>
                  <td className="py-3 px-5 border-r">{board?.username}</td>
                  <td className="py-3 px-5">{board?.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No leaderboard data available.
        </p>
      )}

      {/* Home Link at Bottom */}
      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default LeaderBoard;
