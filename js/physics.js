W = window.innerWidth
H = window.innerHeight
b ={
x: W / 2,
y: H * 0.85,
vx: 0,
vy: 0,
r: 22,
m: 20,
active: false 
}
pins = []
bombs = []
parts = []
obs = []
score = 0
frame = 1
roll = 1
chain = 0
state = 'aim'
drag = false
mx = 0
my = 0
diff = 1
ret = false
sEl = document.getElementById('s')
function setupWave(){
pins = []
bombs = []
obs = []
ret = false
let sx = W / 2
let sy = H * 0.2
let sp = 65

for(let r = 0; r < 4; r++){
for(let c = 0; c <= r; c++){
let px = sx + (c - r / 2) * sp
let py = sy + r * sp * 0.866
if(Math.random() > 0.85 && diff > 2){
bombs.push({ x: px, y: py, r: 20, alive: true })
}
else{
pins.push({ x: px, y: py, r: 20, alive: true, fade: 1 })
 }
  }
}
if(diff > 3){
let n = Math.min(Math.floor(diff / 3), 4)
for(let i = 0; i < n; i++){
let ox = 80 + (i + 0.5) * ((W - 160) / n)
let oy = H * 0.35 + Math.random() * H * 0.25
obs.push({ x: ox - 35, y: oy - 12, w: 70, h: 24, alive: true })
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
ret = false
chain = 0
document.getElementById('m').classList.remove('hidden')
}
function burst(x, y, col, n){
for(let i = 0; i < n; i++){
let a = Math.random() * Math.PI * 2
let s = 2 + Math.random() * 7
parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 40, col, sz: 3 + Math.random() * 5 })
 } 
}
function advanceRound(){
if(roll === 1){
score += 50 + diff * 20
sndStrike()
}
frame++
diff = Math.floor(frame / 2) + 1
roll = 1
chain = 0
sEl.innerText = Math.floor(score)
setupWave()
resetBall()
}
function step(){
for(let i = parts.length - 1; i >= 0; i--){
let p = parts[i]
p.x += p.vx
p.y += p.vy
p.vx *= .92
p.vy *= .92
if(--p.life <= 0)
parts.splice(i, 1)
}

if(state !== 'roll')
return

let spd = Math.hypot(b.vx, b.vy)
b.x += b.vx
b.y += b.vy
b.vx *= .992
b.vy *= .992

if(b.x < b.r){
b.x = b.r; b.vx = Math.abs(b.vx) * .6; sndWall() 
}
if(b.x > W - b.r){
b.x = W - b.r; b.vx = -Math.abs(b.vx) * .6; sndWall() 
}
if(b.y < b.r){
b.y = b.r; b.vy = Math.abs(b.vy) * .6; sndWall() 
}
if(b.y > H + b.r + 50 && !ret){
ret = true
b.y = H + b.r + 100
b.vx = 0
b.vy = -5
}

if(ret && b.vy < 0 && b.y <= H * 0.85){
b.y = H * 0.85
b.vy = 0
b.vx = 0
state = 'aim'
let aliveP = pins.some(p => p.alive)
let aliveB = bombs.some(p => p.alive)

if(!aliveP && !aliveB){
advanceRound()
}
else if(roll === 1){
roll = 2
chain = 0
resetBall()
}
else{
advanceRound()
}
return
}

for(let o of obs){
if(!o.alive)
continue
let cx = Math.max(o.x, Math.min(b.x, o.x + o.w))
let cy = Math.max(o.y, Math.min(b.y, o.y + o.h))
let dx = b.x - cx
let dy = b.y - cy
if(dx * dx + dy * dy < b.r * b.r){
let d = Math.hypot(dx, dy) || 1
let nx = dx / d
let ny = dy / d
b.x += nx * (b.r - d + 2)
b.y += ny * (b.r - d + 2)
let dot = b.vx * nx + b.vy * ny
if(dot < 0){
b.vx = (b.vx - 2 * dot * nx) * .7
b.vy = (b.vy - 2 * dot * ny) * .7
}
sndClack()
 }
}
for(let bm of bombs){
if(!bm.alive)
continue
if(Math.hypot(b.x - bm.x, b.y - bm.y) < b.r + bm.r){
bm.alive = false
sndBomb()
burst(bm.x, bm.y, '#f44', 25)
b.vx *= .3
b.vy *= .3
score = Math.max(0, score - 100)
sEl.innerText = Math.floor(score)
 }
}
for(let p of pins){
if(!p.alive)
continue
let dx = b.x - p.x
let dy = b.y - p.y
let dist = Math.hypot(dx, dy)
if(dist < b.r + p.r && spd > 1){
p.alive = false
p.fade = 1
chain++
score += 10 * (1 + chain * .3)
sEl.innerText = Math.floor(score)
sndHit(chain)
burst(p.x, p.y, '#4f4', 15)
b.vx -= (dx / dist) * 2
b.vy -= (dy / dist) * 2
if(!pins.some(pi => pi.alive) && !bombs.some(bi => bi.alive)){
advanceRound()
return
 }
  }
}
if(spd < .2 && !ret && b.y < H * 0.75){
ret = true
b.vy = -4
}
}
