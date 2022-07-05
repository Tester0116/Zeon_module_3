import { _renderGame } from '../gameLogic.js'
import { _renderTimer } from './timer.js'
import '../confetti.min.js'

const storageData = JSON.parse(localStorage.getItem('players'))
document.getElementById('name').textContent =
  storageData[storageData.length - 1].name
const nameNtimer = document.getElementById('nameNtimer')

// start delay for 3 second
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
// end delay

// start Game Over
const popupBtn = document.querySelectorAll('.popupBtn')

const setHref = (el, index) => location.assign(el.dataset.href)

popupBtn.forEach((el, index) =>
  el.addEventListener('click', () => setHref(el, index))
)
// end Game Over

if (storageData[storageData.length - 1].mode === 'attack') _renderTimer()
else nameNtimer.style.justifyContent = 'center'

_renderGame()
