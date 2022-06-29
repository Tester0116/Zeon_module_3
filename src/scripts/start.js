const form = document.getElementById('form')
const modes = document.querySelectorAll('.start-screen__mode--btn')

const startGame = (e) => {
  e.preventDefault()
  console.log(document.querySelector('input[type="radio"]:checked').id)
}

// const buttons = [false, false]

// const changeActivity = (i) => {
//   buttons.map((button, index) => {})
// }

const setActiveMode = (mode, index) => {
  // modes.forEach((mode) => {
  //   mode.classList.remove('active')
  // })
  // mode.classList.toggle('active')
}

export const _renderStart = () => {
  form.addEventListener('submit', startGame)
}
