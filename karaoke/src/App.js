import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

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
    /// .catch(error => console.log(error));
  })
  // console.log(letra);

  // Función para comparar la transcripción con la letra del archivo LRC
  const compareLyrics = (transcript, letra) => {
    const cleanLyrics = letra.replace(/\[.*?\]/g, ""); // Elimina las etiquetas de tiempo
    // console.log(cleanLyrics);

    const cleanLineBreaks = cleanLyrics.split("\n").join(""); // Quitar saltos de linia
    //console.log(cleanBlankSpaces);

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

  // Función para actualizar el contador de palabras coincidentes
  const updateWordCount = () => {
    if (letra && transcript) {
      const count = compareLyrics(transcript, letra);
      setWordCount(count);
    }
  };

  const deleteScore = () => {
    setWordCount(0);
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser doesn't support speech to text</span>
  }


  return (
    <div>
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