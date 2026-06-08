import { useEffect, useRef } from "react";
import { useColour } from './ColourContext';

interface FileWithPreview extends File {
  preview: string;
}

function InteractiveCanvas({ file }: { file: FileWithPreview }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { colourHex, setColourHex } = useColour();

  useEffect(() => {
    // Return if the canvas doesn't exist
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Return if the canvas doesn't have a 2d context defined
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create an image from the file that was passed into this component
    const img = new Image();
    img.src = file.preview;

    // When the image loads, draw it on the canvas
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
    // Return if the canvas doesn't exist
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Return if the canvas doesn't have a 2d context defined
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get the x,y coordinated of the mouse click and convert them to
    // coordinates on the canvas element

    // Get the canvas bounding box
    const bounding = canvas.getBoundingClientRect();

    // We need to consider the thickness of the border in our calculations
    const borderThickness = 10;

    // Subtract the border from the container's outer measurements
    const contentWidth = bounding.width - (borderThickness * 2);
    const contentHeight = bounding.height - (borderThickness * 2);

    // Get the x,y coordinates of the mouse click relative to the canvas element
    const cssX = e.clientX - bounding.left - borderThickness;
    const cssY = e.clientY - bounding.top - borderThickness;

    // Scale coordinates to match the internal resolution of the canvas
    const x = cssX * (canvas.width / contentWidth);
    const y = cssY * (canvas.height / contentHeight);

    // Get info about the pixel that was clicked on
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    // Get the colour data from the pixel and convert the numbers to hex
    const red = data[0].toString(16).padStart(2, "0");
    const green = data[1].toString(16).padStart(2, "0");
    const blue = data[2].toString(16).padStart(2, "0");
    const hexColor = `#${red}${green}${blue}`;

    // Pop the colour onto the colourHex context value
    setColourHex((prevColours) => [...prevColours, hexColor]);
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseClick}
      className="mx-5 w-auto max-w-[calc(100%-40px)] h-auto max-h-100 border-10 border-neutral-50 cursor-crosshair rounded-lg"
    />
  );
}

export default InteractiveCanvas;
