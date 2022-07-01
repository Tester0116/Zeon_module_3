import { _renderGame } from '../gameLogic.js'
import { _renderTimer } from './timer.js'

const name = localStorage.getItem('name')
document.getElementById('name').textContent = name

let counter = 3

setInterval(() => {
  counter--

  if (counter >= 0) {
    const count = document.getElementById('countDownText')
    count.innerText = counter
  }
  if (counter === 0) {
    const countdown = document.querySelector('.countdown')
    countdown.style.display = 'none'
  }
}, 1000)

_renderTimer()
_renderGame()
