import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import './App.css';

const App = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, browserSupportsContinuousListening } = useSpeechRecognition({
  });
  const [letra, setLetra] = useState("");
  const [wordCount, setWordCount] = useState(0);

  /* Speech Recognition START */
  SpeechRecognition.startListening({ continuous: true })

  useEffect(() => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening(); // inicia el reconocimiento de voz
    }
  }, []);

  // if (browserSupportsContinuousListening) {
  //   SpeechRecognition.startListening({ continuous: true })
  // } else {
  //   <p>Your browser doesn't support continuous listening</p>
  //   console.log("ADIOSSS ");
  // }

  /* Obtener archivo LRC */
  useEffect(() => {
    fetch("acdc.txt")
      .then(response => response.text())
      .then(letra => setLetra(letra))
  })


  /* Función que compara letra con transcripción */
  const compareLyrics = (transcript, letra) => {
    const cleanLyrics = letra.replace(/\[.*?\]/g, ""); // Elimina etiquetas de tiempo

    const cleanLineBreaks = cleanLyrics.split("\n").join(""); // Quita saltos de linia

    const wordsInLyrics = cleanLineBreaks.toLowerCase().split(" ");
    console.log(wordsInLyrics);

    const wordsInTranscript = transcript.toLowerCase().split(" ");
    console.log(wordsInTranscript);

    let count = 0;

    for (let i = 1; i < wordsInTranscript.length; i++) {
      if (wordsInLyrics.includes(wordsInTranscript[i])) {
        console.log(wordsInTranscript[i]);
        console.log(wordsInLyrics[i]);
        count++;
        console.log(count);
      }
    }
    return count;
  };
  const num = compareLyrics(transcript, letra);
  console.log(num);

  /* Función Contador de palabras coincidentes */
  const updateWordCount = () => {
    if (letra && transcript) {
      const count = compareLyrics(transcript, letra);
      setWordCount(count);
    }
  };

  const deleteScore = () => {
    setWordCount(0);
  }


  return (
    <div>
      <p className={!browserSupportsContinuousListening ? SpeechRecognition.startListening({ continuous: true }) : 'hidden'}>Your browser doesn't support continuous listening</p>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <button onClick={updateWordCount}>Obtener Puntuación</button>
      <button onClick={deleteScore}>Borrar Puntuación</button>
      <p>Palabras coincidentes: {wordCount}</p>
    </div>
  );
};

export default App;

// https://www.youtube.com/watch?v=T9z4rrcz9Ws