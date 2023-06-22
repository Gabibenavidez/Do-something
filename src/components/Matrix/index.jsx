import React, { useEffect, useRef } from 'react';
import './styles/index.scss'

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const matrix = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}';
    const matrixChars = matrix.split('');
    const defaultFontSize = 20; // Default font size for matrix characters
    const doSomethingFontSize = 30; // Font size for "Do Something"
    const columns = Math.floor(canvas.width / defaultFontSize);
    const drops = [];

    // Initialize the starting position of the drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * canvas.height / defaultFontSize) + 1;
    }

    const drawMatrixText = () => {
      // Clear the canvas and set the background color
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const text = 'Do Something!';
      const textWidth = ctx.measureText(text).width;
      const numInstances = 40;

      for (let i = 0; i < numInstances; i++) {
        const y = Math.floor(Math.random() * (canvas.height - defaultFontSize)); // Random y-coordinate
        const x = Math.floor(Math.random() * (canvas.width - textWidth)); // Random x-coordinate

        // Render the matrix characters
        for (let j = 0; j < columns; j++) {
          const charIndex = Math.floor(Math.random() * matrixChars.length);
          const char = matrixChars[charIndex];
          const charY = (j * defaultFontSize) + y;
          const charX = (drops[j] * defaultFontSize) + x;

          // Render the matrix character
          ctx.fillStyle = '#00FF00';
          ctx.font = `${defaultFontSize}px arial`;
          ctx.fillText(char, charX, charY);

          // Check if the character position overlaps with the "Do Something" text position
          if (
            charY >= y && charY < y + defaultFontSize &&
            charX >= x && charX < x + textWidth
          ) {
            // Render the "Do Something" text with a different font size and color
            ctx.fillStyle = '#1db954';
            ctx.font = `${doSomethingFontSize}px arial`;
            ctx.fillText(text, x, y + defaultFontSize - 2); // Adjust the y-position for better alignment
            ctx.fillStyle = '#00FF00'; // Reset the fill style for the matrix characters
          }

          // Move the character down and reset its position if it goes off-screen
          if (charX > canvas.width && Math.random() > 0.975) {
            drops[j] = 0;
          }

          drops[j]++;
        }
      }
    };

    const intervalId = setInterval(drawMatrixText, 150);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="matrix-rain-container">
      <canvas ref={canvasRef} width={1920} height={1080} />
    </div>
  );
};

export default MatrixRain;
