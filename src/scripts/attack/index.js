import { _renderTimer } from './timer.js'

const name = localStorage.getItem('name')
document.getElementById('name').textContent = name

_renderTimer()
