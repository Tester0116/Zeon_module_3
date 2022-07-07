import { gameOver } from '../gameLogic.js'

export const _renderTimer = () => {
  const FULL_DASH_ARRAY = 283
  const WARNING_THRESHOLD = 10
  const ALERT_THRESHOLD = 5

  const COLOR_CODES = {
    info: {
      color: 'green',
    },
    warning: {
      color: 'orange',
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: 'red',
      threshold: ALERT_THRESHOLD,
    },
  }

  const TIME_LIMIT = 90
  let timePassed = 0
  let timeLeft = TIME_LIMIT
  let timerInterval = null
  let remainingPathColor = COLOR_CODES.info.color

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    let seconds = time % 60

    if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
  }

  document.getElementById('timer').innerHTML = `
<div class="game-container__timer">
  <svg class="game-container__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="game-container__circle">
      <circle class="game-container__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="timer-path-remaining"
        stroke-dasharray="283"
        class="game-container__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="timer-label" class="game-container__label">${formatTime(
    timeLeft
  )}</span>
</div>
`

  const onTimesUp = () => {
    clearInterval(timerInterval)
    gameOver()
  }

  document.getElementById('stopGamebtn').addEventListener('click', onTimesUp)

  const startTimer = () => {
    setTimeout(() => {
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1
        timeLeft = TIME_LIMIT - timePassed
        document.getElementById('timer-label').innerHTML = formatTime(timeLeft)
        setCircleDasharray()
        setRemainingPathColor(timeLeft)

        if (timeLeft === 0) {
          onTimesUp()
        }
      }, 1000)
    }, 3000)
  }

  const setRemainingPathColor = (timeLeft) => {
    const pathRemaining = document.getElementById('timer-path-remaining')

    const { alert, warning, info } = COLOR_CODES
    if (timeLeft <= alert.threshold) {
      pathRemaining.classList.remove(warning.color)
      pathRemaining.classList.add(alert.color)
    } else if (timeLeft <= warning.threshold) {
      pathRemaining.classList.remove(info.color)
      pathRemaining.classList.add(warning.color)
    }
  }

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / TIME_LIMIT
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
  }

  const setCircleDasharray = () => {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`
    document
      .getElementById('timer-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray)
  }
  startTimer()
}
