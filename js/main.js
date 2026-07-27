window.addEventListener('resize', resize)
resize()
setupWave()
resetBall()
c.addEventListener('mousedown', (e) =>{
if(state === 'aim'){
drag = true
mx = e.clientX
my = e.clientY
mEl.classList.add('hidden')
 }
})
c.addEventListener('mousemove', (e) =>{
if(drag){
mx = e.clientX
my = e.clientY
 }
})
c.addEventListener('mouseup', () =>{
if (drag) {
drag = false
let dx = b.x - mx
let dy = b.y - my
let dist = Math.hypot(dx, dy)

let maxDist = 600
if(dist > maxDist){
dx = (dx / dist) * maxDist
dy = (dy / dist) * maxDist
}
if(dist > 100){
b.vx = dx * 0.15
b.vy = dy * 0.15
b.active = true
state = 'roll'
chain = 0
maxC = 0
}
else{
mEl.classList.remove('hidden')
mEl.innerText = 'PULL BACK FURTHER'
setTimeout(() =>{
if(state === 'aim')
mEl.innerText = 'DRAG TO AIM'
}, 1000)
 }
  }
})
document.addEventListener('keydown', (e) =>{
if(e.code === 'Space')
triggerBlast()
})
function loop(){
step()
draw()
requestAnimationFrame(loop)
}
loop()