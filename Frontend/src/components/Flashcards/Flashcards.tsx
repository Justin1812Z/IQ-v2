import { useEffect, useState } from "react";
import axios from "axios";
import "./Flashcards.css";
import { Link, useParams } from 'react-router-dom';



function Flashcards() {
    const [backendData, setBackendData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const [question, setQuestion] = useState("Loading first question");
    const [answer, setAnswer] = useState("Loading first answer");

    
    function updateCard2() {

        //title.textContent = (cards[0].setName)
    
        
    
        console.log("setting question")
        // questionElement.innerHTML = cards[currentIndex].question;
        // answerElement.innerHTML = cards[currentIndex].answer;
    
        const showAnswerCheckbox = document.getElementById('showAnswerCheckbox') as HTMLInputElement;
    
    
        if (currentIndex < cards.length) {
            if ((invert && !flipped) || (!invert && flipped)) {
                // questionElement.textContent = cards[currentIndex].question;
                // answerElement.textContent = cards[currentIndex].answer;
                setQuestion(cards[currentIndex].question);
                setAnswer(cards[currentIndex].answer);
                
            } else if (invert) {
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
   

    const fetchAPI = async () => {
        await axios
            .get("http://localhost:5000/flashcards/" + params.id)
            .then((response) => {
                setBackendData(response.data.cards);
                cards = response.data.cards;
                loadElements();


                // You should NOT log backendData here, it's not updated yet
                // // Log directly from the response
            })
            .then(() => {
                setLoading(false)
                updateCard2()
            })
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    if (loading) {
        return <h1>Loading...</h1>
    }

    return <>
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
                        <div className="front" id="question">{question}</div>
                        <div className="back" id="answer">{answer}</div>
                    </div>
                </div>

                <div id="buttons">
                    <button onClick={() => back()}>Back</button>
                    <button onClick={() => next()}>Next</button>
                </div>
            </div>


        </main>
    </>
}

var cards: any[] = [];
var title = document.getElementById('title') as HTMLTextAreaElement;

var currentIndex = 0;
var questionElement = document.getElementById('question') as HTMLElement;
var answerElement = document.getElementById('answer') as HTMLElement;
var flashcard = document.getElementById('flashcard') as HTMLElement;

var invert = false;
var flipped = false;

function loadElements() {
    //var showAnswer = document.getElementById('showAnswerCheckbox').checked as HTMLInputElement;
    questionElement = document.getElementById('question') as HTMLElement;
    answerElement = document.getElementById('answer') as HTMLElement;
    flashcard = document.getElementById('flashcard') as HTMLElement;

    console.log("Element loaded")
}

function updateCard() {

    //title.textContent = (cards[0].setName)

    

    console.log("setting question")
    // questionElement.innerHTML = cards[currentIndex].question;
    // answerElement.innerHTML = cards[currentIndex].answer;

    const showAnswerCheckbox = document.getElementById('showAnswerCheckbox') as HTMLInputElement;


    if (currentIndex < cards.length) {
        if ((invert && !flipped) || (!invert && flipped)) {
            // questionElement.textContent = cards[currentIndex].question;
            // answerElement.textContent = cards[currentIndex].answer;
   
            
        } else if (invert) {
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
    flipped = !flipped;
}

function next() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCard();
}

function back() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCard();
}




export default Flashcards;