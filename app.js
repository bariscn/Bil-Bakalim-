const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'İlk Dünya Kupasını Hangi Ülke Kazanmıştır?',
    answers: [
      { text: 'Brezilya', correct: false },
      { text: 'Almanya', correct: false },
      { text: 'Uruguay', correct:true },
      { text: 'İngiltere', correct:false}
    ]
  },
  {
    question: 'Bir kulüp formasıyla şampiyonlar liginde en çok gol atan futbolcu kimdir?',
    answers: [
      { text: 'Maradona', correct: false },
      { text: 'Lionel Messi', correct: true },
      { text: 'C.Ronaldo', correct: false },
      { text: 'Pele', correct: false}
    ]
  },
  {
    question: 'Maradona hangi maçta “Tanrı’nın eli” diye adlandırılan golü atmıştır?',
    answers: [
      { text: 'Arjantin – Brezilya', correct: false },
      { text: 'Arjantin – İngiltere', correct: true },
      { text: 'Arjantin – Almanya', correct: false },
      { text: 'Arjantin – Fransa', correct: false }
    ]
  },
  {
    question: 'En çok dünya kupası kazanan ülke hangisidir?',
    answers: [
      { text: 'İngiltere', correct: false },
      { text: 'Brezilya', correct: true },
      {text: 'İtalya' , correct:false},
      {text: 'Almanya', correct:false}
      
    ]
  },
  {
    question: 'Avrupada maç başına ortalama taraftar sayısı en fazla olan kulüp hangisidir?',
    answers: [
      { text: 'Manchester United', correct: false },
      { text: 'FC Bayern München', correct: false },
      {text: 'Borussia Dortmund' , correct:true},
      {text: 'Fc Barcelona', correct:false}
      
    ]
  }
  
]