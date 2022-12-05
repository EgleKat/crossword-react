import React from "react";
import CrosswordTile from "./CrosswordTile.tsx";

type CrosswordProps = {
  name: string;
};

export default function Crossword({ name }: CrosswordProps) {

  return (
    <div>
      This is crossword {name}

      <CrosswordTile />
    </div>
  );
}