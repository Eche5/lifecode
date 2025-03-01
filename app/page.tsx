import { Suspense } from "react";
import MainMenu from "../components/MainMenu/MainMenu";

export default function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MainMenu />
    </Suspense>
  );
}
