const form = document.getElementById('form')
const nameInput = document.getElementById('nameForm')
const storageData = JSON.parse(localStorage.getItem('players'))

const startGame = (e) => {
  e.preventDefault()

  setPlayer()
  location.assign('attack.html')
}

const setPlayer = () => {
  const mode = document.querySelector('input[type="radio"]:checked')

  let data = {
    name: nameInput.value,
    attackModeScore: 0,
    practiceModeScore: 0,
    mode: mode.id,
  }

  if (storageData) {
    storageData.push(data)
    localStorage.setItem('players', JSON.stringify(storageData))
  } else localStorage.setItem('players', JSON.stringify([data]))
}

if (storageData !== null) {
  nameInput.value = storageData[storageData.length - 1].name
}

form.addEventListener('submit', startGame)
