function computerPlay() {
  let randomizer = Math.random() * 3;
    return decodeGameChoice(randomizer);
  }

function decodeGameChoice(randomizer) {
  if (randomizer <= 1) {
    choice = "Rock";
  } else if (randomizer <= 2) {
    choice = "Paper";
  } else {
    choice = "Scissors";
  }
  return choice;
}

function playRound(playerSelected, computerSelected) {
  if (typeof playerSelected === 'string') {
    playerSelected = getCapitalizedWord(playerSelected);
    if (playerSelected == "Rock" || playerSelected == "Paper" || playerSelected == "Scissors") {
      let result = getResult(playerSelected, computerSelected);
      return result;
    }
  }
  return notValidResponse;
}

function getCapitalizedWord(word) {
  word = word.toLocaleLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getResult(playedSelected, computerSelected) {
  let result;
  switch (playedSelected) {
    case "Rock":
      if (computerSelected == "Paper") {
        result = lose;
      } else if (computerSelected == "Scissors") {
        result = win;
      } else {
        result = tie;
      }
      break;
  case "Paper":
      if (computerSelected == "Paper") {
        result = tie;
      } else if (computerSelected == "Scissors") {
        result = lose;
      } else {
        result = win;
      }
      break;
  default:
      if (computerSelected == "Paper") {
        result = win;
      } else if (computerSelected == "Scissors") {
        result = tie;
      } else {
        result = lose;
      }
  }
  return result;
}

function disableChoices() {
  choicesNodeList.forEach(choiceNode =>
    choiceNode.classList.add("unselectable"));
}

function showResetButton() {
  resetButton.style.display = "block";
}

function showOverallResultsAndResetButton() {
  overallResultsElement.style.display = "block";
  disableChoices();
  showResetButton();

  if (loseRecord == 5) {
    overallResultsElement.src = loserLink;      
  } else if (winRecord == 5) {
    overallResultsElement.src = winnerLink;
  }
}

function game(e) {
  const playerSelected = getCapitalizedWord(e.target.alt);
  const computerSelected = computerPlay();

  selectionsElement[playerSelection].src = e.target.src;
  selectionsElement[computerSelection].src = document.querySelector(`.${computerSelected.toLocaleLowerCase()}`).src;

  let result = playRound(playerSelected, computerSelected); 
    if (result == notValidResponse) {
      result += " Please try again.";
    } else {
      if (result == lose) {
        loseElement.textContent = ++loseRecord;
        result = loseMessage;
      } else if (result == win) {
        winElement.textContent = ++winRecord;
        result = winMessage;
      } else {
        tieElement.textContent = ++tieRecord;
        result = tieMessage;
      }
    }

    numberElement.textContent = ++round;
    responseElement.textContent = result;

    if (loseRecord == 5 || winRecord == 5) {
      showOverallResultsAndResetButton();
    }
}

function getSelectionsElement() {
  const selectionsNodeList = document.querySelectorAll(".selected");
  let selectionsElement = [];
  selectionsNodeList.forEach((selectionNode) => {
    let key = selectionNode.alt == playerSelection ? playerSelection : computerSelection;
    selectionsElement[key] = selectionNode;
  });
  return selectionsElement;
}

function reset() {
  loseRecord = 0;
  winRecord = 0;
  tieRecord = 0;
  round = 1;

  loseElement.textContent = loseRecord;
  winElement.textContent = winRecord;
  tieElement.textContent = tieRecord;
  numberElement.textContent = round;
  responseElement.textContent = startGame;
  
  selectionsElement[playerSelection].src = selectionLink;
  selectionsElement[computerSelection].src = selectionLink;

  overallResultsElement.style.display = "none";
  resetButton.style.display = "none";

  choicesNodeList.forEach(choiceNode =>
    choiceNode.classList.remove("unselectable"));
}

const startGame = "Start a game!";
const lose = "lose";
const win = "win";
const tie = "tie";
const loseMessage = "You lost!"
const winMessage = "You won!"
const tieMessage = "We tied!";
const playerSelection = "player_selection";
const computerSelection = "computer_selection";
const response = "response";
const notValidResponse = "Not a valid selection. The valid options are: rock, paper, scissors.";
const selectionLink = "images/question_mark.png"
const winnerLink = "https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif";
const loserLink = "https://media.giphy.com/media/rKj0oXtnMQNwY/giphy.gif";

let loseRecord = 0;
let winRecord = 0;
let tieRecord = 0;
let round = 1;

const numberElement = document.querySelector(".number");
const selectionsElement = getSelectionsElement();
const responseElement = document.querySelector(".response");
const loseElement = document.querySelector(".lose");
const winElement = document.querySelector(".win");
const tieElement = document.querySelector(".tie");
const loseRecordElement = document.querySelector(".lose .record");
const winRecordElement = document.querySelector(".win .record");
const tieRecordElement = document.querySelector(".tie .record");
const overallResultsElement = document.querySelector(".overall_results")
const resetButton = document.querySelector(".reset");

const choicesNodeList = document.querySelectorAll(".choice");
choicesNodeList.forEach(choiceNode => 
  choiceNode.addEventListener("click", game));
resetButton.addEventListener("click", reset);