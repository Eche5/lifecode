"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllDestinations } from "@/actions/cities.actions";
import { loginUser, updateUser } from "@/actions/user.actions";
interface userData {
  score: number;
  username: string;
  gamesPlayed: number;
}

interface cityData {
  city: string;
  clues: string[];
  fun_fact: string[];
}
function GamePage() {
  const router = useRouter();
  const [currentCity, setCurrentCity] = useState<cityData | null>(null);
  const [clueIndex, setClueIndex] = useState(0);
  const [user, setUser] = useState<userData | null>(null);
  const [noGuess, setNoGuesses] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [citiesData, setCitiesData] = useState<cityData[] | []>([]);

  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const inviteScore = searchParams.get("score");
  const getAllDestinationData = async () => {
    const res = await getAllDestinations();
    setCitiesData(res);
  };
  const getMyData = async () => {
    if (!username) {
      console.error("Username is null or undefined");
      return;
    }
    const response = await loginUser(username);
    console.log(response);

    setUser(response);
  };
  useEffect(() => {
    // if (!username) {
    //   router.push("/");
    // }
    getAllDestinationData();
    getMyData();
  }, []);

  useEffect(() => {
    if (citiesData.length > 0) {
      startNewGame();
    }
  }, [citiesData]);

  const startNewGame = () => {
    const randomCity =
      citiesData[Math.floor(Math.random() * citiesData.length)];
    setCurrentCity(randomCity);
    setNoGuesses(0);
    setClueIndex(0);
    setGuess("");
    setMessage("");
    setGameOver(false);
  };

  const handleGuess = async () => {
    if (!username || !user) {
      console.error("Username is null or undefined");
      return;
    }
    setNoGuesses(noGuess + 1);
    if (guess.toLowerCase() === currentCity?.city.toLowerCase()) {
      setMessage(`🎉 Correct! ${currentCity?.city} is the answer.`);
      await updateUser(username, user?.score + 1);
      getMyData();
      setGameOver(true);
    }
    if (noGuess > 2) {
      setMessage(
        `You have ran out of chances. The answer is ${currentCity?.city}.`
      );
      setGameOver(true);

      await updateUser(username, user?.score);
      getMyData();
    } else {
      setMessage("❌ Wrong! Try again.");
    }
  };
  const revealNextClue = () => {
    if (currentCity?.clues && clueIndex < currentCity.clues.length - 1) {
      setClueIndex(clueIndex + 1);
    }
  };
  const handleChallengeFriend = () => {
    const inviteLink = `${window.location.origin}/?invite=true&score=${user?.score}`;
    const message = `🏆 I scored ${user?.score} in the Globetrotter Challenge! Think you can beat me? Play now: ${inviteLink}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center relative min-h-screen bg-gradient-to-r from-blue-700 to-purple-800 text-white text-center p-6">
      <div className="mb-4 absolute right-2 top-2">
        <p className="text-lg font-semibold">👤{username}</p>
        {inviteScore && (
          <p className="text-lg font-semibold">
            🏆Invitee score: {inviteScore}
          </p>
        )}
        <p className="text-lg font-semibold">🏆Score: {user?.score}</p>
        <p className="text-lg font-semibold">
          🎮 Games Played: {user?.gamesPlayed}
        </p>
        <button
          onClick={handleChallengeFriend}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
        >
          🎉 Challenge a Friend
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-4">🌍 Globetrotter Challenge</h1>

      {currentCity && !gameOver ? (
        <>
          <p className="text-lg font-semibold mb-2">
            Clue: {currentCity.fun_fact[clueIndex]}
          </p>

          <input
            type="text"
            className="text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            placeholder="Enter your guess..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />

          <button
            onClick={handleGuess}
            className="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded-md mt-4"
          >
            Submit Guess
          </button>

          {clueIndex < currentCity.clues.length - 1 && (
            <button
              onClick={revealNextClue}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md mt-2"
            >
              🔍 Get Another Clue
            </button>
          )}

          {message && <p className="mt-4">{message}</p>}
        </>
      ) : gameOver ? (
        <>
          <p className="text-lg font-semibold mb-4">{message}</p>
          <p className="text-md italic mb-4">
            Fun Fact: {currentCity?.fun_fact[0]}
          </p>
          <button
            onClick={startNewGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            🔄 Play Again
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button
        onClick={() => router.push("/")}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4"
      >
        ❌ Quit Game
      </button>
    </div>
  );
}

export default GamePage;
