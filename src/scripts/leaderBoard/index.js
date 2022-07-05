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
