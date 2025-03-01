"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser, RegisterUser } from "@/actions/user.actions";
import toast, { Toaster } from "react-hot-toast";

function MainMenu() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [gameType, setGameType] = useState("");
  const notify = (message: string, icon: string) => toast(message, { icon });
  const searchParams = useSearchParams();

  const inviteScore = searchParams.get("score");
  const handleStartGame = async () => {
    if (!username.trim()) return;
    if (gameType === "continue") {
      const response = await loginUser(username);

      if (response.error) {
        notify(response.error, "❌");
      } else {
        notify("Login successfully!", "✨");
        router.push(
          `/game?${gameType}=true&username=${encodeURIComponent(username)}`
        );
        setShowModal(false);
      }
    } else if (gameType === "new") {
      const response = await RegisterUser(username);
      if (response.error) {
        notify(response.error, "❌");
      } else {
        notify("Account created successfully!", "✨");
        router.push(
          `/game?${gameType}=true&username=${encodeURIComponent(username)}`
        );
        setShowModal(false);
      }
    } else {
      const response = await RegisterUser(username);

      if (response.error) {
        notify(response.error, "❌");
      } else {
        notify("Account created successfully!", "✨");

        router.push(
          `/game?${gameType}=true&username=${encodeURIComponent(
            username
          )}&invite=true&score=${inviteScore}`
        );
      }
    }
  };

  useEffect(() => {
    if (inviteScore) {
      setShowModal(true);
    }
  }, [inviteScore]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
      <Toaster />

      <h1 className="text-5xl font-bold mb-6">🌍 Globetrotter Challenge</h1>
      <p className="text-lg mb-8">
        Guess famous destinations & challenge your friends!
      </p>

      {/* Open Modal for New Player */}
      <button
        onClick={() => {
          setShowModal(true);
          setGameType("new");
        }}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl text-lg mb-4 transition duration-300"
      >
        🆕 New Player
      </button>

      {/* Open Modal for Continue */}
      <button
        onClick={() => {
          setShowModal(true);
          setGameType("continue");
        }}
        className="bg-blue-400 hover:bg-blue-500 text-black font-semibold py-3 px-6 rounded-xl text-lg mb-4 transition duration-300"
      >
        ⏳ Continue
      </button>

      <button
        onClick={() => router.push("/leaderboard")}
        className="bg-white hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-xl text-lg transition duration-300"
      >
        🏆 View Leaderboard
      </button>

      {/* Username Input Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white text-black p-6 rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Enter Username</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleStartGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              Start
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 text-gray-600 hover:underline w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
