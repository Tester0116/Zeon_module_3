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

const mode = localStorage.getItem('mode')
const scoreTable = JSON.parse(localStorage.getItem(`${mode}-leaderboard`))
const list = document.getElementById('leaderList')

for (let key in scoreTable) {
  const item = document.createElement('div')
  item.classList.add('leaderboard__list--item')
  const userScore = scoreTable[key].highScore

  item.innerHTML = `
   <div class="leaderboard__list--item" id="leaderBoardItem">
  <span id="leaderBoardName">${key}:&nbsp;</span>
  <span id="leaderBoardScore">${userScore}</span>
</div>`
  list.appendChild(item)
}
