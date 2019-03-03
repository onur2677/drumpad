class Drumpad {
  constructor() {
    this.defaultColor = '#b2fef7'
    this.activeColor = '#4f9a94'
    this.sounds = {
      '808': new window.Audio('sounds/808.mp3'),
      clap: new window.Audio('sounds/clap.mp3'),
      cymbal: new window.Audio('sounds/cymbal.mp3'),
      'hi-hat': new window.Audio('sounds/hi-hat.mp3'),
      kick: new window.Audio('sounds/kick.mp3'),
      'open-hat': new window.Audio('sounds/open-hat.mp3')
    }
    window.onload = this.initialize.bind(this)
  }
  initialize() {
    document.onkeydown = this.key.bind(this)
    document.onkeyup = this.key.bind(this)

    const sounds = document.querySelectorAll('.sound')
    for (let sound of sounds) {
      sound.onclick = () => this.play(sound.dataset.id)
    }

    const volumes = document.querySelectorAll('input[type="range"]')
    for (let volume of volumes) {
      volume.onchange = () => this.sounds[volume.dataset.id].volume = volume.value
    }
  }

  key(e) {
    let key
    switch (e.code) {
      case 'KeyQ':
        key = 'kick'
        break
      case 'KeyW':
        key = '808'
        break
      case 'KeyE':
        key = 'clap'
        break
      case 'KeyA':
        key = 'cymbal'
        break
      case 'KeyS':
        key = 'hi-hat'
        break
      case 'KeyD':
        key = 'open-hat'
        break
      default:
        return false
    }

    let element = document.querySelector(`.sound[data-id='${key}']`)
    switch (e.type) {
      case 'keydown':
        this.play(key)
        element.style.background = this.activeColor
        break
      case 'keyup':
        element.style.background = this.defaultColor
        break
    }
  }

  play(key) {
    this.sounds[key].load()
    this.sounds[key].play()
  }
}
const drumpad = new Drumpad()