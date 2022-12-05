import React from "react";

type CrosswordProps = {
  name: string;
};

export default function Crossword({ name }: CrosswordProps) {

  return (
    <div>
      This is crossword {name}
    </div>
  );
}