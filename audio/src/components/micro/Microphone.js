import React, { useState, useEffect, useContext } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import playerContext from '../../context/playerContext'
import Confetti from 'react-confetti';
import './micro.css'

const App = ({ end }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, browserSupportsContinuousListening } = useSpeechRecognition({});

  const [letra, setLetra] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [percentatge, setpercentatge] = useState(0);

  const { currentSong, songslist } = useContext(playerContext);

  const [popup, setPopup] = useState(false);
  const [fraseScore, setFraseS] = useState('');

  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);

  /**
   * Comprovem que el navegador suporta el Speech Recognition
   */
  useEffect(() => {
    if (SpeechRecognition.browserSupportsSpeechRecognition()) {
      SpeechRecognition.startListening();
    }
    setLetra(songslist[currentSong].letra);
  }, [songslist]);

  SpeechRecognition.startListening({ continuous: true })

  if (browserSupportsContinuousListening || browserSupportsSpeechRecognition) {
    SpeechRecognition.startListening({ continuous: true })
  }

  let wordsInTranscript = 0;
  let wordsInLyrics = 0;


  /**
   * Funcio que compara la transcripció del micròfon amb la lletra original de la cançó.
   * @param {string} transcript - La transcripció del micròfon.
   * @param {string} letra - La lletra original de la cançó.
   * @returns El nombre de paraules de la transcripció que coincideixen amb la lletra.
   */
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
  // console.log(num);
  console.log(transcript);

  /**
   * Actualitza el contador de paraules que coincideixen entre la transcripció i la lletra.
   */
  const updateWordCount = () => {
    if (letra && transcript) {
      const count = compareLyrics(transcript, letra);
      setWordCount(count);
    }
  };

  /**
   * Calcula el percentatge d'encerts comparant la longitud de la lletra de la cançó i el recompte de paraules coincidents.
   */
  const percent = () => {
    console.log(wordCount);
    console.log(wordsInLyrics.length);

    const perAciertos = ((wordsInLyrics.length - wordCount) * 100) / wordsInLyrics.length;
    console.log(perAciertos);

    const perTotal = Math.round(100 - perAciertos);
    console.log(perTotal);

    setpercentatge(perTotal);
  }

  // Funcion que borra la puntuacion
  const deleteScore = () => {
    setWordCount(0);
  }

  /**
   * Retorna una frase basada en el percentatge d'encerts i actualitza l'estat de les estrelles i el confeti.
   * @param {number} porcentaje - El percentatge d'encerts.
   */
  const frasesPuntuacion = (porcentaje) => {
    let frase = '';

    if (porcentaje >= 90) {
      frase = '🎤 YOU ARE A STAR! 🎤';
      setStar1(true);
      setStar2(true);
      setStar3(true);
      setStar4(true);
      setStar5(true);
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
      if (porcentaje >= 70) {
        frase = 'Very well, you are on fire today! 👍🎤';
        setStar1(true);
        setStar2(true);
        setStar3(true);
        setStar4(true);
      } else if (porcentaje >= 50) {
        frase = 'Not bad, but you can do it better! 🤔🎤';
        setStar1(true);
        setStar2(true);
        setStar3(true);
      } else if (porcentaje >= 30) {
        frase = 'Mmmh... it seems like you need to practice more 🙄🎤';
        setStar1(true);
        setStar2(true);
      } else {
        frase = 'Iugh, are you even trying? 😒🎤';
        setStar1(true);
      }
    }

    setFraseS(frase);
    setPopup(true);
  }

  /**
   * S'activa quan canvia el valor end
   */
  useEffect(() => {
    if (end) {
      updateWordCount();
      percent();
      frasesPuntuacion(90);
    } else {
      setPopup(false);

      setStar1(false);
      setStar2(false);
      setStar3(false);
      setStar4(false);
      setStar5(false);
      setShowConfetti(false);
    }
  }, [end]);

  return (
    <>
      {/* <div>
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
      </div>   */}

      {showConfetti && <Confetti />}
      <div className={'popup ' + (popup ? '' : 'hiden')}>
        <div className="div-star">

          <div className="stars">
            <p className={(star1 ? 'st-ok' : '')}><i class='bx bxs-star'></i></p>
            <p className={(star2 ? 'st-ok' : '')}><i class='bx bxs-star'></i></p>
            <p className={(star3 ? 'st-ok' : '')}><i class='bx bxs-star'></i></p>
            <p className={(star4 ? 'st-ok' : '')}><i class='bx bxs-star'></i></p>
            <p className={(star5 ? 'st-ok' : '')}><i class='bx bxs-star'></i></p>
          </div>

          <p>{fraseScore}</p>
          {/* <p>You hit {percentatge}% right</p> */}
        </div>

      </div>
    </>
  );
};

export default App;