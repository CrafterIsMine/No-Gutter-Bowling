W = window.innerWidth
H = window.innerHeight
b ={
x: W / 2, y: H * 0.85,
vx: 0, vy: 0,
r: 22,
m: 20,
active: false 
}
pins = []
state = 'aim'
drag = false
mx = 0
my = 0
function setupWave(){
pins = []
let sx = W / 2
let sy = H * 0.2
let sp = 65
for(let r = 0; r < 4; r++){
for(let c = 0; c <= r; c++){
let px = sx + (c - r / 2) * sp
let py = sy + r * sp * 0.866
pins.push({ x: px, y: py, r: 20, alive: true })
 }
  } 
}
function resetBall(){
b.x = W / 2
b.y = H * 0.85
b.vx = 0
b.vy = 0
b.active = false
state = 'aim'
drag = false
}

function step(){
if(state !== 'roll')
return
b.x += b.vx
b.y += b.vy
b.vx *= .992
b.vy *= .992

if(b.x < b.r){
b.x = b.r; b.vx *= -.6 
}
if(b.x > W - b.r){
b.x = W - b.r; b.vx *= -.6 
}
if(b.y < b.r){
b.y = b.r; b.vy *= -.6 
}
for(let p of pins){
if(!p.alive)
continue
let dx = b.x - p.x
let dy = b.y - p.y
let dist = Math.hypot(dx, dy)
if(dist < b.r + p.r){
p.alive = false
b.vx -= (dx / dist) * 2
b.vy -= (dy / dist) * 2
 }
  }
}