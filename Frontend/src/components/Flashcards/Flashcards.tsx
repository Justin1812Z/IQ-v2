import { useEffect, useState } from "react";
import axios from "axios";
import "./Flashcards.css";
import { Link, useParams } from 'react-router-dom';



function Flashcards() {
    const [backendData, setBackendData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const params = useParams();

    console.log("parameters: " + params.id)

    const fetchAPI = async () => {
        await axios
            .get("http://localhost:5000/flashcards/" + params.id)
            .then((response) => {
                console.log("params: " + params);
                setBackendData(response.data.cards);
                cards = response.data.cards;

                // You should NOT log backendData here, it's not updated yet
                // // Log directly from the response
            })
            .then(() => {
                setLoading(false)
            })
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return <>
        <body>
            <main>
                <div id="container">
                    <label>
                        <h2 id="title">Error Loading Set Name</h2>
                        <div>
                            <strong>Start on back of card</strong>
                            {/* <md-checkbox id="showAnswerCheckbox" onclick="updateCard() "></md-checkbox> */}
                        </div>
                    </label>

                    <div className="flashcard" onClick={() => flipCard()}>
                        <div className="card" id="flashcard">
                            <div className="front" id="question">Click to see question/answer</div>
                            <div className="back" id="answer">Click to see question/answer</div>
                        </div>
                    </div>

                    <div id="buttons">
                        <button onClick={() => back()}>Back</button>
                        <button onClick={() => next()}>Next</button>
                    </div>
                </div>


            </main>
        </body>
    </>
}

var cards: any[] = [];
var title = document.getElementById('title') as HTMLTextAreaElement;
//title.innerHTML = "testing innerhtml";
console.log(cards);

// console.log(cards);
var currentIndex = 0;

function updateCard() {
    //var showAnswer = document.getElementById('showAnswerCheckbox').checked as HTMLInputElement;
    var questionElement = document.getElementById('question') as HTMLElement;
    var answerElement = document.getElementById('answer') as HTMLElement;
    var flashcard = document.getElementById('flashcard') as HTMLElement;

    questionElement.innerHTML = cards[currentIndex].question;
    answerElement.innerHTML = cards[currentIndex].answer;

    const showAnswerCheckbox = document.getElementById('showAnswerCheckbox') as HTMLInputElement;


    if (currentIndex < cards.length) {
        if (showAnswerCheckbox?.checked && flashcard.classList.contains('flipped') || (!showAnswerCheckbox.checked && !flashcard.classList.contains('flipped'))) {
            questionElement.textContent = cards[currentIndex].question;
            answerElement.textContent = cards[currentIndex].answer;
        } else if (showAnswerCheckbox.checked) {
            answerElement.textContent = cards[currentIndex].answer;
            flipCard();
            flashcard.addEventListener('transitionend', () => {
                questionElement.textContent = cards[currentIndex].question;
            });
        } else {
            questionElement.textContent = cards[currentIndex].question;
            flipCard();
            flashcard.addEventListener('transitionend', () => {
                answerElement.textContent = cards[currentIndex].answer;
            });


        }
    }
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard?.classList.toggle('flipped');
}

function next() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCard();
}

function back() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCard();
}


document.addEventListener('DOMContentLoaded', function () {
    updateCard();  // Initial display of card
});

export default Flashcards;