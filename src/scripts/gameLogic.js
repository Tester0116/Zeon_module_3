const firstNumber = document.getElementById('firstNumber')
const secondNumber = document.getElementById('secondNumber')
const operator = document.getElementById('operator')
const result = document.getElementById('result')
const form = document.getElementById('gameForm')
const scoreElement = document.getElementById('scoreForm')
const task = document.getElementById('task')
const scoreCounter = document.getElementById('scoreCounter')
const correct = document.getElementById('correctAnswer')
const incorrect = document.getElementById('incorrectAnswer')
const totalScore = document.getElementById('totalScore')

const getRandom = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const operators = ['+', '-', '*', '/']

const calculate = (a, b, operator) => {
  switch (operator) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '/':
      return a / b
    default:
      return a * b
  }
}

const generateExample = () => {
  // 0 is pointless, you can't divide by it, sum/multiply/minus are pointless too, so 1 is floor
  const firstNumber = getRandom(1, 10)
  const secondNumber = getRandom(1, 10)
  const operator = operators[getRandom(0, 3)]

  if (operator === '/') {
    if (firstNumber % secondNumber !== 0) {
      return generateExample()
    }
  }

  const result = calculate(firstNumber, secondNumber, operator)
  return { firstNumber, secondNumber, operator, result }
}

const renderExample = (data) => {
  task.classList.remove('animation')
  firstNumber.textContent = data.firstNumber
  secondNumber.textContent = data.secondNumber
  operator.textContent = data.operator
}

let example = generateExample()
renderExample(example)

const runAnimation = () => {
  task.classList.remove('animationIn')

  scoreCounter.classList.remove('animation')

  requestAnimationFrame(() => {
    scoreCounter.classList.add('animation')
    task.classList.add('animationIn')
  })
}

let activeCount = 0
let correctAnswer = 0
let incorrectAnswer = 0

const scoreCounterIncrement = () => {
  scoreCounter.textContent = '+1'
  scoreCounter.classList.remove('incorrect')
  scoreCounter.classList.add('correct')
  correctAnswer++

  // for animation score
  scoreElement.classList.remove('in??orrect')
}
const scoreCounterDecrement = () => {
  scoreCounter.textContent = '-1'
  scoreCounter.classList.remove('correct')
  scoreCounter.classList.add('incorrect')
  incorrectAnswer++

  // for animation score
  scoreElement.classList.add('in??orrect')
  setTimeout(() => {
    scoreElement.classList.remove('in??orrect')
  }, 1000)
}

const onSubmit = (e) => {
  e.preventDefault()
  runAnimation()

  if (!result.value) return
  if (Number(result.value) === Number(example.result)) {
    activeCount += 1
    scoreElement.textContent = '+1'
    scoreCounterIncrement()
  } else {
    activeCount -= 1
    scoreElement.textContent = '-1'
    scoreCounterDecrement()
  }
  scoreElement.textContent = activeCount
  result.value = ''
  example = generateExample()
  renderExample(example)
}

export const _renderGame = () => {
  task.classList.add('animationIn')
  form.addEventListener('submit', onSubmit)
  document.getElementById('stopGamebtn').addEventListener('click', gameOver)
}

export const gameOver = () => {
  correct.textContent = correctAnswer
  incorrect.textContent = incorrectAnswer
  totalScore.textContent = activeCount

  const storageName = localStorage.getItem('storageName')
  const mode = localStorage.getItem('mode')
  const scoreTable = JSON.parse(localStorage.getItem(`${mode}-leaderboard`))
  const user = scoreTable[storageName]

  if (activeCount > user.highScore) {
    scoreTable[storageName] = { ...user, highScore: activeCount }
    localStorage.setItem(`${mode}-leaderboard`, JSON.stringify(scoreTable))
  }

  const popup = document.getElementById('popup')
  const congratulations = document.getElementById('congratulations')

  popup.classList.add('active')
  form.style.display = 'none'
  congratulations.classList.add('active')
  const confettiSettings = { target: 'congratulations' }
  const confetti = new ConfettiGenerator(confettiSettings)
  confetti.render()
}
