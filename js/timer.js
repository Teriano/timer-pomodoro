import Sounds from './sounds.js'

export default function Timer({
  displayMinutes,
  displaySeconds,
  resetDisplayButton
}) {
  let timeTimerOut
  let minutes = Number(displayMinutes.textContent)

  function updateTimer(newMin, seconds) {
    newMin = newMin === undefined ? minutes : newMin
    seconds = seconds === undefined ? 0 : seconds
    displayMinutes.textContent = String(newMin).padStart(2, '0')
    displaySeconds.textContent = String(seconds).padStart(2, '0')
  }

  function reset() {
    updateTimer(minutes, 0)
    clearTimeout(timeTimerOut)
  }

  function countdown() {
    timeTimerOut = setTimeout(() => {
      let seconds = Number(displaySeconds.textContent)
      let minutes = Number(displayMinutes.textContent)

      updateTimer(minutes, 0)

      if (minutes <= 0 && seconds <= 0) {
        resetDisplayButton()
        updateTimer()
        Sounds().timeEnd()
        return
      }

      if (seconds <= 0) {
        seconds = 60

        --minutes
      }

      updateTimer(minutes, seconds - 1)

      countdown()
    }, 1000)
  }

  function updateMinutes(newMin) {
    minutes = newMin
  }

  function hold() {
    clearTimeout(timeTimerOut)
  }

  return {
    countdown,
    reset,
    updateTimer,
    updateMinutes,
    hold
  }
}
