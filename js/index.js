import Controls from './changebutton.js'
import Timer from './timer.js'
import Sound from './sounds.js'
import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet,
  buttonSoundOff,
  buttonSoundOn,
  displayMinutes,
  displaySeconds
} from './elements.js'

const controls = Controls({
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonStop
})

const timer = Timer({
  displayMinutes,
  displaySeconds,
  resetDisplayButton: controls.reset
})

const sound = Sound()

buttonPlay.addEventListener('click', function () {
  controls.play()
  timer.countdown()
  sound.pressButton()
})

buttonPause.addEventListener('click', function () {
  controls.pause()
  timer.hold()
  sound.pressButton()
})

buttonStop.addEventListener('click', function () {
  controls.reset()
  timer.reset()
  sound.pressButton()
})

buttonSet.addEventListener('click', function () {
  let newMin = controls.getMinutes()

  if (!newMin) {
    timer.reset()
    return
  }

  timer.updateTimer(newMin, 0)
  timer.updateMinutes(newMin)
})

buttonSoundOn.addEventListener('click', function () {
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')
  sound.bgAudio.pause()
})
buttonSoundOff.addEventListener('click', function () {
  buttonSoundOn.classList.remove('hide')
  buttonSoundOff.classList.add('hide')
  sound.bgAudio.play()
})
