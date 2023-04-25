import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { LRC } from "./data";

const App = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, browserSupportsContinuousListening } = useSpeechRecognition({
  });
  const [letra, setLetra] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [percentatge, setpercentatge] = useState(0);
  

  /* Speech Recognition START */
  SpeechRecognition.startListening({ continuous: true })

  useEffect(() => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening(); // inicia el reconocimiento de voz
    }
  }, []);

  if (browserSupportsContinuousListening) {
    SpeechRecognition.startListening({ continuous: true })
  } else {
    <span>Your browser doesn't support continuous listening</span>
  }


  /* Obtener archivo LRC */
  useEffect(() => {
    fetch("acdc.txt")
      .then(response => response.text())
      .then(letra => setLetra(letra))
  })

  let wordsInTranscript = 0;
  let wordsInLyrics = 0;

  // Función para comparar la transcripción con la letra del archivo LRC
  const compareLyrics = (transcript, letra) => {
    const cleanLyrics = letra.replace(/\[.*?\]/g, ""); // Elimina las etiquetas de tiempo

    const cleanLineBreaks = cleanLyrics.split("\n").join(""); // Quitar saltos de linia

    wordsInLyrics = cleanLineBreaks.toLowerCase().split(" ");

    wordsInTranscript = transcript.toLowerCase().split(" ");

    let count = 0;

    for (let i = 1; i < wordsInTranscript.length; i++) {
      if (wordsInLyrics.includes(wordsInTranscript[i])) {
        count++;
      }
    }
    return count;
  };
  const num = compareLyrics(transcript, letra);
  console.log(num);


  // Función para actualizar el contador de palabras coincidentes
  const updateWordCount = () => {
    if (letra && transcript) {
      const count = compareLyrics(transcript, letra);
      setWordCount(count);
    }
  };

  // Funcion que hace el porcentage
  const percent = () => {
    const perAciertos = ((wordsInLyrics.length - wordCount) * 100) / wordsInLyrics.length;
    const perTotal = Math.round(100 - perAciertos);
    setpercentatge(perTotal);
  }

  // Funcion que borra la puntuacion
  const deleteScore = () => {
    setWordCount(0);
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser doesn't support speech to text</span>
  }


  return (
    <>
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        <button onClick={updateWordCount}>Obtener Puntuación</button>
        <button onClick={deleteScore}>Borrar Puntuación</button>

        <button onClick={percent}>Obtener Porcentaje</button>
        <p>Palabras coincidentes: {wordCount}</p>

        <p>Porcentaje de aciertos: {percentatge}%</p>
      </div>

      <div>
       {/* lrc={LRC}*/}
      </div>
    </>
  );
};

export default App;