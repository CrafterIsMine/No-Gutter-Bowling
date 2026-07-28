let orb ={
x: 0,
y: 0,
vx: 0,
vy: 0,
r: 14 
}
let gobs = []
let sparks = []
let pts = 0
let wave = 1
let combo = 0
let state = 'aim'
let drag = false
let mx = 0
let my = 0

function resetOrb(){
orb.x = window.innerWidth * 0.15
orb.y = window.innerHeight * 0.5
orb.vx = 0
orb.vy = 0
state = 'aim'
combo = 0
document.getElementById('m').innerText = 'DRAG TO AIM'
}
function spawnWave(){
gobs = []
const cx = window.innerWidth * 0.6
const cy = window.innerHeight * 0.5
const count = 5 + wave * 2

for(let i = 0; i < count; i++){
gobs.push({
x: cx + (Math.random() - 0.5) * 300,
y: cy + (Math.random() - 0.5) * 400,
r: 16,
vx: 0,
vy: 0,
alive: true,
id: i
 })
}
resetOrb()
}

function burst(x, y, color, amount){
for(let i = 0; i < amount; i++){
const angle = Math.random() * Math.PI * 2
const speed = 3 + Math.random() * 7
sparks.push({
x: x, y: y,
vx: Math.cos(angle) * speed,
vy: Math.sin(angle) * speed,
life: 30,
color: color,
size: 3
 })
  }
}

function updateEntities(){
if(state === 'roll'){
orb.x += orb.vx
orb.y += orb.vy
orb.vx *= 0.985
orb.vy *= 0.985
if(orb.x - orb.r < 0){
orb.x = orb.r; orb.vx *= -0.7 
}
if(orb.x + orb.r > window.innerWidth){
orb.x = window.innerWidth - orb.r; orb.vx *= -0.7 
}
if(orb.y - orb.r < 0){
orb.y = orb.r; orb.vy *= -0.7 
}
if(orb.y + orb.r > window.innerHeight){
orb.y = window.innerHeight - orb.r; orb.vy *= -0.7 
}
const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy)
for(let g of gobs){
if(!g.alive)
continue

const dx = orb.x - g.x
const dy = orb.y - g.y
const dist = Math.sqrt(dx * dx + dy * dy)
if(dist < orb.r + g.r){
if(speed > 1.8){
g.alive = false
combo++
pts += 15 * combo
burst(g.x, g.y, '#44ff44', 10)
orb.vx *= 0.8
orb.vy *= 0.8
}
else{
orb.vx *= -0.4
orb.vy *= -0.4
 }
 }
}
if(speed < 0.15){
const aliveCount = gobs.filter(g => g.alive).length
if(aliveCount === 0){
wave++
spawnWave()
}
else{
resetOrb()
  }
 }
}

for(let i = sparks.length - 1; i >= 0; i--){
const s = sparks[i]
s.x += s.vx
s.y += s.vy
s.life--
if(s.life <= 0)
sparks.splice(i, 1)
}
document.getElementById('p').innerText = pts
document.getElementById('w').innerText = wave
}