function fit() {
  let scale = 1
  function setRem() {
    const {clientWidth, clientHeight} = document.documentElement
    const node = document.querySelector('#h5-container')
    if (clientWidth >= clientHeight) { // 横屏
      // if (scale === 1) scale = clientWidth / 1500
      node && (node.style.transform = `rotate(-90deg)`)
      scale = clientWidth / 1500
    } else { // 竖屏
      scale = clientHeight / 1500
      node && (node.style.transform = `rotate(0deg)`)
    }

    console.log('scale', scale, scale * 750,  clientWidth, clientHeight)
    // scale = document.documentElement.clientHeight / 1500
    // document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
    document.documentElement.style.fontSize = scale + 'px'
  }
  window.onresize = setRem
  setRem()
}
fit()