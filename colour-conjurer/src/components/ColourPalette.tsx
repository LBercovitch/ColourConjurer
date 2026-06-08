import { useEffect, useState } from "react";
import { useColour } from './ColourContext';

import ColourTile from "./ColourTile";

function ColourPalette() {
  const { colourHex, setColourHex } = useColour();
  const [ colourTiles, setColourTiles ] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    // Reset colourTiles
    setColourTiles([]);

    for (const colour of colourHex) {
      setColourTiles((prevColours) => {
        let colourDiv = <ColourTile colour={colour} />
        return [...prevColours, colourDiv]
    });
    }
  }, [colourHex])

  return (
    <div className={`col-span-3 flex w-fit h-fit
      ${colourTiles.length > 0 ? "bg-neutral-50 p-6 rounded-xl" : ""}`
    }>
      {colourTiles.map((tile, index) => {
        return (
          <div key={index}>
            {tile}
          </div>
        )
      })}
    </div>
  );
}

export default ColourPalette;