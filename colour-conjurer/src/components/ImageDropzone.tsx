import { useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";

import UploadImage from "../icons/UploadImage";

interface FileWithPreview extends File {
  preview: string;
}

function InteractiveCanvas({ file }: { file: FileWithPreview }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);

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
    console.log(selectedColours);
  }, [selectedColours]);

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

    setSelectedColours((prevColours) => {
      return [...prevColours, hexColor];
    });
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseClick}
      className="block w-auto max-h-150 border border-gray-300 cursor-crosshair rounded-lg"
    />
  );
}

function ImageDropzone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  // Initialize the dropzone
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  // Clear files
  const removeImage = () => {
    setFiles([]);
  };

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <InteractiveCanvas file={file} />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="flex justify-center">
      <div
        {...getRootProps()}
        className={`
          ${files.length == 0 ? "flex" : "hidden"}
          flex-col items-center justify-center p-5 border-2 border-dashed
          rounded-2xl bg-gray-50 text-gray-400 transition-colors duration-200
          text-center m-5 w-full min-h-100
          ${isFocused ? "border-blue-500" : "border-gray-300"}
          ${isDragAccept ? "border-green-400" : ""}
          ${isDragReject ? "border-red-500 bg-red-500/10" : ""}
        `}
      >
        {/* The dropzone input */}
        <input {...getInputProps()} />

        {/* Error message for rejected files */}
        {(fileRejections.length > 0 || isDragReject) && (
          <em className="text-xl font-semibold">
            Only *.png, *.jpg, *.jpeg, *.gif, and *.webp files are accepted.
          </em>
        )}

        {/* Dropzone Content */}
        <div className="w-30 my-10">
          <UploadImage />
        </div>
        <p className="text-xl">Drop an image to begin</p>
        <p className="text-sm">or click to browser files</p>
      </div>
      <div
        className={`${files.length == 0 ? "hidden" : "block"} relative w-fit`}
      >
        <button
          onClick={removeImage}
          className="absolute z-10 right-5 top-5 cursor-pointer border-2 rounded-full text-4xl pb-2 w-13 bg-neutral-50"
        >
          &times;
        </button>
        {thumbs}
      </div>
    </section>
  );
}

export default ImageDropzone;
