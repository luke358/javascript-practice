function animate(el,target,cb){
  if(el.timer) clearInterval(el.timer)
  el.timer = setInterval(() => {
    var step = (target - el.offsetLeft) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if(el.offsetLeft == target){
      clearInterval(el.timer)
      cb && cb()
    }
    el.style.left = el.offsetLeft + step + 'px'
  }, 15);
}