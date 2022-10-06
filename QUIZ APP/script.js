"use strict";
/********************************
 Select Elements
********************************/
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const btnLogin = document.querySelector(".login__btn");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const labelWelcome = document.querySelector(".welcome");
const main = document.querySelector(".main");

//question array
const myQuestions = [
  {
    question: "In 1768, Captain James Cook set out to explore which ocean?",
    answers: {
      a: "Pacific Ocean",
      b: "Atlantic Ocean",
      c: "Indian Ocean",
      d: "Arctic Ocean",
    },
    correctAnswer: "a",
  },
  {
    question: "What is actually electricity?",
    answers: {
      a: "A flow of water",
      b: "A flow of air",
      c: "A flow of electrons",
      d: "A flow of atoms",
    },
    correctAnswer: "c",
  },

  {
    question: "Which of the following is not an international organisation?",
    answers: {
      a: "FIFA",
      b: "NATO",
      c: "ASEAN",
      d: "FBI",
    },
    correctAnswer: "d",
  },
  {
    question: "Which of the following disorders is the fear of being alone?",
    answers: {
      a: "Agoraphobia",
      b: "Aerophobia",
      c: "Acrophobia",
      d: "Arachnophobia",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Which of the following is a song by the German heavy metal band “Scorpions”?",
    answers: {
      a: "Stairway to Heaven",
      b: "Wind of Change",
      c: "Don’t Stop Me Now",
      d: "Hey Jude",
    },
    correctAnswer: "b",
  },
  {
    question: "What is the speed of sound?",
    answers: {
      a: "120 km/h",
      b: "1,200 km/h",
      c: "400 km/h",
      d: "700 km/h",
    },
    correctAnswer: "b",
  },
  {
    question: "Which is the easiest way to tell the age of many trees?",
    answers: {
      a: "To measure the width of the tree",
      b: "To count the rings on the trunk",
      c: "To count the number of leaves",
      d: "To measure the height of the tree",
    },
    correctAnswer: "b",
  },
  {
    question: "What do we call a newly hatched butterfly?",
    answers: {
      a: "A moth",
      b: "A butter",
      c: "A caterpillar",
      d: "A chrysalis",
    },
    correctAnswer: "a",
  },
  {
    question: "In total, how many novels were written by the Bronte sisters?",
    answers: {
      a: "4",
      b: "5",
      c: "6",
      d: "7",
    },
    correctAnswer: "d",
  },
  {
    question: "Which did Viking people use as money?",
    answers: {
      a: "Rune stones",
      b: "Jewellery",
      c: "Seal skins",
      d: "Wool",
    },
    correctAnswer: "d",
  },
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich",
      d: "John Snow",
    },
    correctAnswer: "c",
  },
  {
    question: "Which is the easiest way to tell the age of many trees?",
    answers: {
      a: "To measure the width of the tree",
      b: "To count the rings on the trunk",
      c: "To count the number of leaves",
      d: "To measure the height of the tree",
    },
    correctAnswer: "b",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm",
      d: "React.js",
    },
    correctAnswer: "c",
  },
  {
    question:
      "In the United States, football is called soccer. So what is American football called in the United Kingdom?",
    answers: {
      a: "Rugby",
      b: "American football",
      c: "Handball",
      d: "Combball",
    },
    correctAnswer: "b",
  },
  {
    question:
      "What was the first country to use tanks in combat during World War I?",
    answers: {
      a: "France",
      b: "Japan",
      c: "Britain",
      d: "Germany",
    },
    correctAnswer: "c",
  },
  {
    question: "What is the main component of the sun?",
    answers: {
      a: "Liquid lava",
      b: "Gas",
      c: "Molten iron",
      d: "Rock",
    },
    correctAnswer: "b",
  },
  {
    question: "Which two months are named after Emperors of the Roman Empire?",
    answers: {
      a: "January and February",
      b: "March and April",
      c: "May and June",
      d: "July and August",
    },
    correctAnswer: "d",
  },
  {
    question: "Which of the following animals can run the fastest?",
    answers: {
      a: "Cheetah",
      b: "Leopard",
      c: "Tiger",
      d: "Lion",
    },
    correctAnswer: "a",
  },
  {
    question: "Where did the powers of Spiderman come from?",
    answers: {
      a: "He was born with them",
      b: "He was bitten by a radioactive spider",
      c: "He went through a scientific experiment",
      d: "He woke up with them after a dream",
    },
    correctAnswer: "b",
  },
  {
    question:
      "What is the most points that a player can score with a single throw in darts?",
    answers: {
      a: "20",
      b: "40",
      c: "60",
      d: "80",
    },
    correctAnswer: "c",
  },
];

//initial stored accounts
const account1 = {
  owner: "Ottis Emanuel",
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  pin: 4444,
};

//account array
const accounts = [account1, account2, account3, account4];

class App {
  #result = { name: "", ans: {}, grade: "" };
  #currentAccount;
  #results = [];
  #click = 0;
  constructor() {
    // Get data from local storage
    this.getLocalStorage();
    // create usrname for each accounts
    this.createUsernames();
    //render questions and asnwers in DOM
    this.renderQuiz();

    // Attach event handlers
    submitButton.addEventListener("click", this.showResults.bind(this));
    btnLogin.addEventListener("click", this.login.bind(this));
  }

  renderQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (let letter in currentQuestion.answers) {
        // ...add an HTML radio button

        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${questionNumber + 1}. ${
          currentQuestion.question
        } </div>
            <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and render on the page
    quizContainer.innerHTML = output.join("");
  }

  showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
      //track if quiz has already been submitted
      if (this.#click >= 1) return;
      //store selected answers in result
      this.#result.ans[questionNumber + 1] = userAnswer;
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    //store grade in result
    this.#result.grade = `${Math.round(
      (numCorrect / myQuestions.length) * 100
    )}%`;
    //store results in local storage
    this.setLocalStorage();
    //update click count
    this.#click++;
  }

  //create username from each account
  createUsernames() {
    accounts.forEach(function (acc) {
      acc.username = acc.owner.toLowerCase();
    });
  }

  //implement login functionality
  login(e) {
    // Prevent form from submitting
    e.preventDefault();
    //check if input username exist in accounts
    this.#currentAccount = accounts.find(
      (acc) => acc.username === inputLoginUsername.value.toLowerCase()
    );
    if (!this.#currentAccount) {
      alert("Account does not exist. Please enter correct details.");
      return;
    }
    //chech if input pin correlates with stored pin
    if (this.#currentAccount?.pin === Number(inputLoginPin.value)) {
      // Display UI and message
      labelWelcome.textContent = `Welcome, ${
        this.#currentAccount.owner.split(" ")[0]
      }`;
      //display questions
      main.style.opacity = 100;
      //set loign field back to empty text
      inputLoginUsername.value = inputLoginPin.value = "";
      inputLoginPin.blur();
    } else {
      return alert("The password you entered is incorrect. Please try again.");
    }
    //store user's name on result
    this.#result.name = this.#currentAccount.owner;
  }

  setLocalStorage() {
    //check if current user's result already exist
    let a = this.#results.filter(
      (acc) => acc.name === this.#currentAccount.owner
    );
    //do nothing if already exist
    if (a.length > 0) return;
    //if no store result
    this.#results.push(this.#result);
    localStorage.setItem("RESULT", JSON.stringify(this.#results));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("RESULT"));

    if (!data) return;

    this.#results = data;
  }
}

const app = new App();
