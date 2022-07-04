import { _renderGame } from '../gameLogic.js'
import { _renderTimer } from './timer.js'
import '../confetti.min.js'

const name = localStorage.getItem('name')
document.getElementById('name').textContent = name

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

const popupBtn = document.querySelectorAll('.popupBtn')

const setHref = (el, index) => location.assign(el.dataset.href)

popupBtn.forEach((el, index) =>
  el.addEventListener('click', () => setHref(el, index))
)
console.log(localStorage.getItem('mode'))

_renderTimer()
_renderGame()
