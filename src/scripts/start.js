const form = document.getElementById('form')
const nameStorage = localStorage.getItem('name')
const nameInputStorage = document.getElementById('nameForm')

const startGame = (e) => {
  const mode = document.querySelector('input[type="radio"]:checked')
  const nameInput = document.getElementById('nameForm')

  e.preventDefault()
  localStorage.setItem('name', nameInput.value)
  location.assign(`${mode.id === 'attack' ? 'attack.html' : 'practice.html'}`)
}
if (nameStorage !== null) {
  nameInputStorage.value = nameStorage
}

form.addEventListener('submit', startGame)
