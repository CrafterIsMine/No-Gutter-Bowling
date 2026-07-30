let a = new (window.AudioContext || window.webkitAudioContext)()
function w(){
if(a.state === 'suspended')
a.resume() 
}
function sndHit(n){
w()
let t = a.currentTime
let o = a.createOscillator()
let g = a.createGain()
o.type = 'square'
let freq = 300 + (n * 60)
o.frequency.setValueAtTime(freq, t)
o.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.15)
g.gain.setValueAtTime(0.2, t)
g.gain.exponentialRampToValueAtTime(0.01, t + 0.15)
o.connect(g)
g.connect(a.destination)
o.start(t)
o.stop(t + 0.2)
}
function sndClack(){
w()
let t = a.currentTime
let o = a.createOscillator()
let g = a.createGain()
o.type = 'triangle'
o.frequency.setValueAtTime(600, t)
o.frequency.exponentialRampToValueAtTime(200, t + 0.05)
g.gain.setValueAtTime(0.15, t)
g.gain.exponentialRampToValueAtTime(0.01, t + 0.05)
o.connect(g)
g.connect(a.destination)
o.start(t)
o.stop(t + 0.06)
}

function sndWall(){
w()
let t = a.currentTime
let o = a.createOscillator()
let g = a.createGain()
o.type = 'sine'
o.frequency.setValueAtTime(150, t)
o.frequency.exponentialRampToValueAtTime(50, t + 0.1)
g.gain.setValueAtTime(0.1, t)
g.gain.exponentialRampToValueAtTime(0.01, t + 0.1)
o.connect(g)
g.connect(a.destination)
o.start(t)
o.stop(t + 0.1)
}

function sndStrike(){
w()
let t = a.currentTime
let notes = [523, 659, 784]
notes.forEach((freq, i) =>{
let o = a.createOscillator()
let g = a.createGain()
o.type = 'sine'
o.frequency.value = freq
g.gain.setValueAtTime(0, t + i * 0.1)
g.gain.linearRampToValueAtTime(0.15, t + i * 0.1 + 0.05)
g.gain.exponentialRampToValueAtTime(0.01, t + i * 0.1 + 0.4)
o.connect(g)
g.connect(a.destination)
o.start(t + i * 0.1)
o.stop(t + i * 0.1 + 0.5)
})
}
function sndBomb(){
w()
let t = a.currentTime
let o = a.createOscillator()
let g = a.createGain()
o.type = 'sawtooth'
o.frequency.setValueAtTime(60, t)
o.frequency.exponentialRampToValueAtTime(10, t + 0.5)
g.gain.setValueAtTime(0.3, t)
g.gain.exponentialRampToValueAtTime(0.01, t + 0.5)
o.connect(g)
g.connect(a.destination)
o.start(t)
o.stop(t + 0.6)
}

function sndBlast(){
w()
let t = a.currentTime
let o = a.createOscillator()
let g = a.createGain()
o.type = 'sawtooth'
o.frequency.setValueAtTime(200, t)
o.frequency.exponentialRampToValueAtTime(20, t + 0.4)
g.gain.setValueAtTime(0.3, t)
g.gain.exponentialRampToValueAtTime(0.01, t + 0.4)
o.connect(g)
g.connect(a.destination)
o.start(t)
o.stop(t + 0.5)
}