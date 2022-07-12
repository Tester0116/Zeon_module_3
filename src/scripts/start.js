const form = document.getElementById('form')
const nameInput = document.getElementById('nameForm')
const storageData = JSON.parse(localStorage.getItem('players'))
const storageName = localStorage.getItem('storageName')
const rulesBtn = document.getElementById('rulesBtn')
const rulesBlock = document.getElementById('rulesBlock')
const closeRules = document.getElementById('closeRules')

const DEFAULT_USER = {
  highScore: 0,
}

const startGame = (e) => {
  e.preventDefault()

  setPlayer()
  location.assign('attack.html')
}

const setPlayer = () => {
  const mode = document.querySelector('input[type="radio"]:checked')
  const name = nameInput.value
  const leaderboardStorage = JSON.parse(
    localStorage.getItem(`${mode.id}-leaderboard`)
  )

  localStorage.setItem('storageName', name)
  localStorage.setItem('mode', mode.id)

  localStorage.setItem(
    `${mode.id}-leaderboard`,
    JSON.stringify({
      [name]: DEFAULT_USER,
      ...leaderboardStorage,
    })
  )
}

if (storageName) {
  nameInput.value = storageName
}

form.addEventListener('submit', startGame)

const toggleRules = () => {
  rulesBlock.classList.toggle('active')
  form.classList.toggle('dn')
}

rulesBtn.addEventListener('click', toggleRules)
closeRules.addEventListener('click', toggleRules)
