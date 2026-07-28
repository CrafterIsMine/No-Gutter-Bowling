let orb ={
x: 0,
y: 0,
vx: 0,
vy: 0,
r: 14 
}
let gobs = []
let bricks = []
let sparks = []
let dust = []
let pts = 0
let wave = 1
let combo = 0
let state = 'aim'
let drag = false
let mx = 0
let my = 0
let sx = 0
let sy = 0
let hitstop = 0

function resetOrb(){
orb.x = window.innerWidth * 0.15
orb.y = window.innerHeight * 0.5
orb.vx = 0
orb.vy = 0
state = 'aim'
combo = 0
document.getElementById('m').innerText = 'DRAG TO AIM'
document.getElementById('m').style.opacity = '0.8'
}
function spawnWave(){
gobs = []
bricks = []
const cx = window.innerWidth * 0.6
const cy = window.innerHeight * 0.5
const count = 5 + wave * 2
for(let i = 0; i < count; i++){
let gx, gy
const pattern = wave % 3
if(pattern === 0){
const angle = (i / count) * Math.PI * 2
const radius = 100 + Math.random() * 50
gx = cx + Math.cos(angle) * radius
gy = cy + Math.sin(angle) * radius
}
else if(pattern === 1){
gx = cx + (Math.random() - 0.5) * 300
gy = cy + (Math.random() - 0.5) * 400
}
else{
gx = cx + (i % 3 - 1) * 60 + Math.random() * 20
gy = cy + Math.floor(i / 3) * 60 + Math.random() * 20
}
gobs.push({
x: gx,
y: gy,
r: 16,
vx: 0,
vy: 0,
alive: true,
twitch: Math.random() * 100,
id: i
 })
}

const bCount = 2 + Math.floor(wave / 2)
for(let i = 0; i < bCount; i++){
bricks.push({
x: window.innerWidth * 0.3 + Math.random() * (window.innerWidth * 0.4),
y: window.innerHeight * 0.2 + Math.random() * (window.innerHeight * 0.6),
w: 50 + Math.random() * 100,
h: 50 + Math.random() * 100
 })
}
resetOrb()
}
function burst(x, y, color, amount){
for(let i = 0; i < amount; i++){
const angle = Math.random() * Math.PI * 2
const speed = 3 + Math.random() * 7
sparks.push({
x: x,
y: y,
vx: Math.cos(angle) * speed,
vy: Math.sin(angle) * speed,
life: 30 + Math.random() * 30,
color: color,
size: 2 + Math.random() * 4
})
 }
}
function updateEntities(){
if(hitstop > 0){
hitstop--
return
}

if(state === 'roll'){
orb.x += orb.vx
orb.y += orb.vy
orb.vx *= 0.985
orb.vy *= 0.985
if(orb.x - orb.r < 0){
orb.x = orb.r; orb.vx *= -0.7; sx = 4; 
sndBounce() 
}
if(orb.x + orb.r > window.innerWidth){
orb.x = window.innerWidth - orb.r; orb.vx *= -0.7; sx = 4;
sndBounce() 
}
if(orb.y - orb.r < 0){
orb.y = orb.r; orb.vy *= -0.7; sy = 4;
sndBounce() 
}
if(orb.y + orb.r > window.innerHeight){
orb.y = window.innerHeight - orb.r; orb.vy *= -0.7; sy = 4;
sndBounce() 
}

for(let b of bricks){
const cx = Math.max(b.x, Math.min(orb.x, b.x + b.w))
const cy = Math.max(b.y, Math.min(orb.y, b.y + b.h))
const dx = orb.x - cx
const dy = orb.y - cy
const distSq = dx * dx + dy * dy
if(distSq < orb.r * orb.r){
const dist = Math.sqrt(distSq)
const overlap = orb.r - dist
const nx = dist === 0 ? 1 : dx / dist
const ny = dist === 0 ? 0 : dy / dist
orb.x += nx * overlap
orb.y += ny * overlap
const dot = orb.vx * nx + orb.vy * ny
orb.vx = (orb.vx - 2 * dot * nx) * 0.6
orb.vy = (orb.vy - 2 * dot * ny) * 0.6
sx = 6
sy = 6
sndBounce()
burst(cx, cy, '#442222', 6)
 }
}
const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy)

for(let g of gobs){
if(!g.alive)
continue
const dx = orb.x - g.x
const dy = orb.y - g.y
const dist = Math.sqrt(dx * dx + dy * dy)

if(speed > 2.5 && dist < 180){
const avoidX = dx / dist
const avoidY = dy / dist
g.vx -= avoidX * 0.4
g.vy -= avoidY * 0.4
}

g.x += g.vx
g.y += g.vy
g.vx *= 0.9
g.vy *= 0.9
if(dist < orb.r + g.r){
if(speed > 1.8){
g.alive = false
combo++
const mult = 1 + (combo * 0.5)
pts += Math.floor(15 * mult)
sx = 10
sy = 10
hitstop = 5
sndSmash()
if(combo > 1)
sndCombo(combo)
burst(g.x, g.y, '#44ff44', 20)
burst(g.x, g.y, '#ffffff', 8)
orb.vx *= 0.75
orb.vy *= 0.75
const overlap = (orb.r + g.r) - dist
const nx = dx / dist
const ny = dy / dist
orb.x += nx * overlap
orb.y += ny * overlap
}
else{
const overlap = (orb.r + g.r) - dist
const nx = dx / dist
const ny = dy / dist
orb.x += nx * overlap
orb.y += ny * overlap
orb.vx *= -0.4
orb.vy *= -0.4
sndBounce()
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
if(state === 'roll' && Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy) > 1.5){
dust.push({
x: orb.x,
y: orb.y,
life: 25,
size: orb.r * 0.9 
 })
}
for(let i = dust.length - 1; i >= 0; i--){
dust[i].life--
dust[i].size *= 0.92
if(dust[i].life <= 0)
dust.splice(i, 1)
}
for(let i = sparks.length - 1; i >= 0; i--){
const s = sparks[i]
s.x += s.vx
s.y += s.vy
s.vx *= 0.9
s.vy *= 0.9
s.life--
if(s.life <= 0)
sparks.splice(i, 1)
}

if(sx > 0)
sx *= 0.85
if(sy > 0)
sy *= 0.85
if(sx < 0.5)
sx = 0
if(sy < 0.5)
sy = 0
document.getElementById('p').innerText = pts
document.getElementById('x').innerText = combo > 1 ? 'x' + combo : '1'
document.getElementById('w').innerText = wave
}
