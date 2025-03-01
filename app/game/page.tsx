import GamePage from "@/components/GamePage/GamePage";
import React from "react";
import { Suspense } from "react";

function page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <GamePage />
    </Suspense>
  );
}

export default page;
