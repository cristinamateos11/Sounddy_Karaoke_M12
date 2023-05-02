import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

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
      SpeechRecognition.startListening();
    }
  }, []);

  if (browserSupportsContinuousListening || browserSupportsSpeechRecognition) {
    SpeechRecognition.startListening({ continuous: true })
  } else {
    <span>Your browser doesn't support continuous listening</span>
  }

  /* Obtener archivo LRC */
  useEffect(() => {
    fetch("taylor.txt")
      .then(response => response.text())
      .then(letra => setLetra(letra))
  })

  let wordsInTranscript = 0;
  let wordsInLyrics = 0;

  // Función para comparar la transcripción con la letra del archivo LRC
  const compareLyrics = (transcript, letra) => {
    const cleanLyrics = letra.replace(/\[.*?\]/g, "");

    const cleanLineBreaks = cleanLyrics.split("\n").join("");

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

  // Funcion que devuelve una frase segun el porcentaje obtenido
  const frasesPuntuacion = (porcentaje) => {
    let frase = '';
    if (porcentaje >= 90) {
      frase = '¡Eres un/a crack! 🤩🎤🎶';
    } else if (porcentaje >= 70) {
      frase = 'Muy bien, sigue así 👍🎤🎶';
    } else if (porcentaje >= 50) {
      frase = 'No está mal, pero puedes hacerlo mejor 🤔🎤🎶';
    } else if (porcentaje >= 30) {
      frase = 'Necesitas practicar más 🙄🎤🎶';
    } else {
      frase = 'Dedícate a otra cosa 😒🎤🎶';
    }
    return frase;
  }


  return (
    <>
      <div>
        <h2>Microphone: {listening ? 'on' : 'off'}</h2>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
        <button onClick={updateWordCount}>Obtener Puntuación</button>
        <button onClick={deleteScore}>Borrar Puntuación</button>

        <button onClick={percent}>Obtener Porcentaje</button>
        <p>Palabras coincidentes: {wordCount}</p>

        <p>Porcentaje de aciertos: {percentatge}%</p>
        <p>{frasesPuntuacion(percentatge)}</p>
      </div>
    </>
  );
};

export default App;