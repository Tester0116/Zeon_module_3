document.addEventListener('mousemove', parallax)
const parallaxThings = document.querySelectorAll('.leaderboard__parallax')

function parallax(e) {
  parallaxThings.forEach((el) => {
    const position = el.getAttribute('data-position')
    const x = (window.innerWidth - e.pageX * position) / 100
    const y = (window.innerHeight - e.pageY * position) / 100
    el.style.transform = `translateX(${x}px) translateY(${y}px)`
  })
}
function t(mode = storageMode) {
  return JSON.parse(localStorage.getItem(`${mode}-leaderboard`))
}

const chooseMode = document.getElementById('gameMode')
const storageMode = localStorage.getItem('mode')
const list = document.getElementById('leaderList')

chooseMode.addEventListener('change', () => {
  list.innerHTML = ''
  setScores(t(chooseMode.value))
})

const setScores = (table) => {
  for (let key in table) {
    const item = document.createElement('li')
    item.classList.add('leaderboard__list--item')
    const userScore = table[key].highScore

    item.innerHTML = `
    <span id="leaderBoardName">${key}:&nbsp;</span>
    <span id="leaderBoardScore">${userScore}</span>
  `
    list.append(item)
  }
}
chooseMode.value = storageMode
setScores(t())
