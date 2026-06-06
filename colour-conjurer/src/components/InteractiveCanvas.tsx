import { useEffect, useRef } from "react";
import { useColour } from './ColourContext';

interface FileWithPreview extends File {
  preview: string;
}

function InteractiveCanvas({ file }: { file: FileWithPreview }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { colourHex, setColourHex } = useColour();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = file.preview;

    img.onload = () => {
      // Scale canvas internal resolution to match actual image aspect ratio
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the uploaded image onto the canvas viewport
      ctx.drawImage(img, 0, 0);
    };
  }, [file.preview]);

  useEffect(() => {
    console.log(colourHex);
  }, [colourHex]);

  const handleMouseClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bounding = canvas.getBoundingClientRect();
    const x = e.clientX - bounding.left;
    const y = e.clientY - bounding.top;

    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const red = data[0].toString(16).padStart(2, "0");
    const green = data[1].toString(16).padStart(2, "0");
    const blue = data[2].toString(16).padStart(2, "0");

    const hexColor = `#${red}${green}${blue}`;

    setColourHex((prevColours) => [...prevColours, hexColor]);
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseClick}
      className="block w-auto max-h-150 border border-gray-300 cursor-crosshair rounded-lg"
    />
  );
}

export default InteractiveCanvas;
