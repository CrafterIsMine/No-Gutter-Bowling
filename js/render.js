c = document.getElementById('c')
ctx = c.getContext('2d')
function resize(){
W = window.innerWidth
H = window.innerHeight
c.width = W
c.height = H
if(state === 'aim'){
b.x = W / 2
b.y = H * 0.85
 }
}
function draw(){
ctx.fillStyle = '#111'
ctx.fillRect(0, 0, W, H)
ctx.strokeStyle = '#333'
ctx.lineWidth = 2
ctx.beginPath()
ctx.moveTo(50, 0)
ctx.lineTo(50, H)
ctx.moveTo(W - 50, 0)
ctx.lineTo(W - 50, H)
ctx.stroke()
ctx.strokeStyle = '#222'
ctx.lineWidth = 1
for(let y = 0; y < H; y += 50){
ctx.beginPath()
ctx.moveTo(50, y)
ctx.lineTo(W - 50, y)
ctx.stroke()
}

ctx.fillStyle = '#1a1a1a'
ctx.fillRect(0, H * 0.85, W, H * 0.15)

for(let o of obs){
if(!o.alive)
continue
ctx.fillStyle = '#ff6666'
ctx.fillRect(o.x, o.y, o.w, o.h)
}
for(let bm of bombs){
if(!bm.alive)
continue
ctx.fillStyle = '#ff4444'
ctx.beginPath()
ctx.arc(bm.x, bm.y, bm.r, 0, Math.PI * 2)
ctx.fill()
}
for(let p of pins){
if(!p.alive){
if(p.fade > 0){
ctx.globalAlpha = p.fade
ctx.fillStyle = '#44ff44'
ctx.beginPath()
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
ctx.fill()
ctx.globalAlpha = 1
 }
continue
}
ctx.fillStyle = '#44ff44'
ctx.beginPath()
ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
ctx.fill()
}

for(let p of parts){
ctx.fillStyle = p.col
ctx.fillRect(p.x - p.sz / 2, p.y - p.sz / 2, p.sz, p.sz)
}

if(blast){
ctx.strokeStyle = '#ff8844'
ctx.lineWidth = 4
ctx.beginPath()
ctx.arc(blast.x, blast.y, blast.r, 0, Math.PI * 2)
ctx.stroke()
}
for(let t of trail){
ctx.fillStyle = 'rgba(68, 170, 255, ' + (t.life / 25) + ')'
ctx.beginPath()
ctx.arc(t.x, t.y, t.sz, 0, Math.PI * 2)
ctx.fill()
}
if(state === 'aim' && drag){
let dx = b.x - mx
let dy = b.y - my
let dist = Math.hypot(dx, dy)
let maxDist = 600
if(dist > maxDist){
dx = (dx / dist) * maxDist
dy = (dy / dist) * maxDist
}
ctx.strokeStyle = '#fff'
ctx.lineWidth = 2
ctx.setLineDash([10, 10])
ctx.beginPath()
ctx.moveTo(b.x, b.y)
ctx.lineTo(b.x + dx, b.y + dy)
ctx.stroke()
ctx.setLineDash([])
ctx.fillStyle = '#aaa'
ctx.beginPath()
ctx.arc(b.x + dx, b.y + dy, 8, 0, Math.PI * 2)
ctx.fill()
}
ctx.fillStyle = '#fff'
ctx.beginPath()
ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
ctx.fill()
ctx.strokeStyle = '#44aaff'
ctx.lineWidth = 4
ctx.beginPath()
ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
ctx.stroke()
}