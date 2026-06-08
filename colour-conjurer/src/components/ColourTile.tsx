function getLightOrDark(hexColor: string): 'text-neutral-50' | 'text-neutral-800' {
  // Remove the '#' if it's present
  const cleanHex = hexColor.replace('#', '');

  // Parse r, g, b values as base 10 integers
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // YIQ formula calculates perceived brightness
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // If brightness is greater than 128, the color is light (return dark text)
  return yiq >= 128 ? 'text-neutral-800' : 'text-neutral-50';
}

function ColourTile({ colour }: {colour: string}) {
  const textColorClass = getLightOrDark(colour);

  return (
    <div style={{ backgroundColor: colour }} className={`flex h-30 w-25 items-end justify-center ${textColorClass}`}>
      {colour}
    </div>
  );
}

export default ColourTile;