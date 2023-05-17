import React, { useState, useEffect } from "react";
import { BiPalette } from "react-icons/bi";
import './styles.css';

function DiscoButton() {
  const [color, setColor] = useState('#ffffff');
  const [disco, setDisco] = useState(false);

  /**
   * Funció que genera un color aleatori en format HSL
   * @returns HSL random color
   */
  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 361);
    const saturation = (80 + Math.random() * 20) | 0;
    const lightness = (80 + Math.random() * 20) | 0;
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }

  /**
   * Es dispara quan l'estat de disco canvia.
   * Si disco == true canvia el color de fons cada segon.
   * Si disco == false es cancela.
   */
  useEffect(() => {
    let intervalId;
    if (disco) {
      intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomPastelColor();
      }, 1000); 
    } else {
      document.body.style.backgroundColor = "#dee3ed"; // Restaura el color de fons original quan s'atura el disco
    }
    return () => clearInterval(intervalId);
  }, [disco]);

  /**
   * Canvia l'estat disco al valor contrari quan es fa click
   */
  const handleClick = () => {
    setDisco(!disco);
  };

  return (
    <div className="disco-container" >
      <button onClick={handleClick} className="disco-button">
      <BiPalette />
      </button>
    </div>
  );
}

export default DiscoButton;