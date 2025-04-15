import { useEffect, useState } from "react";
import axios from "axios";
import "./Flashcards.css";
import { Link, useParams } from "react-router-dom";

function Flashcards() {
  const [cards, setCards] = useState<any[]>([]);
  const [backendData, setBackendData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("Loading first question");
  const [answer, setAnswer] = useState("Loading first answer");
  const [flashcardClasses, setFlashcardClasses] = useState("card");
  const [currentIndex, setCurrentIndex] = useState(0);
  const params = useParams();

  let flashcard = document.getElementById("flashcard");

  function updateCard(index: number) {
    console.log("updating card");
    console.log("curr i " + index);
    if (index < cards.length) {
      if (!flipped) {
        setQuestion(cards[index].question);
        setAnswer(cards[index].answer);
      } else if (flipped) {
        setQuestion(cards[index].question);
        flipCard();
        setTimeout(() => {
          setAnswer(cards[index].answer);
        }, 200);
      } else {
        setAnswer(cards[index].answer);
        flipCard();
        setTimeout(() => {
          setQuestion(cards[index].question);
        }, 200);
      }
    }
  }

  function flipCard() {
    flashcard?.classList.toggle("flipped");
    flipped = !flipped;
  }

  function next() {
    const newIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(newIndex);
  }

  function back() {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    setCurrentIndex(newIndex);
  }

  const fetchAPI = async () => {
    await axios
      .get("http://localhost:5000/flashcards/" + params.id)
      .then((response) => {
        setBackendData(response.data.cards);
        setCards(response.data.cards);
        if (response.data.cards.length > 0) {
          setQuestion(response.data.cards[0].question);
          setAnswer(response.data.cards[0].answer);
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    if (!loading && cards.length > 0) {
      updateCard(currentIndex);
    }
  }, [currentIndex]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <main>
        <div id="container">
          <label>
            <h2 id="title">Error Loading Set Name</h2>
            <div>
              <strong>Start on back of card</strong>
            </div>
          </label>

          <div className="flashcard" onClick={() => flipCard()}>
            <div className="card" id="flashcard">
              <div className="front" id="question">
                {question}
              </div>
              <div className="back" id="answer">
                {answer}
              </div>
            </div>
          </div>

          <div id="buttons">
            <button onClick={() => back()}>Back</button>
            <button onClick={() => next()}>Next</button>
          </div>
        </div>
      </main>
    </>
  );
}

var invert = false;
var flipped = false;

export default Flashcards;
