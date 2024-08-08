import FlagGame from "@/components/Game";
import { Difficulty, GameMode } from "@/types";
import { Stack, useGlobalSearchParams } from "expo-router";

export default function GameScreen() {
  const glob = useGlobalSearchParams();
  const { mode, difficulty } = glob;
  return (
    <>
      <Stack.Screen options={{ title: "Game" }} />
      <FlagGame
        mode={mode as GameMode}
        difficulty={difficulty as Difficulty}
        route={{
          params: {
            difficulty: "Easy",
            mode: "Find Flag by Name",
          },
        }}
      />
    </>
  );
}
