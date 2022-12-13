function fit() {
  let scale = 1
  function setRem() {
    const { clientWidth, clientHeight } = document.documentElement
    const node = document.querySelector('#h5-container')
    if (clientWidth >= clientHeight) {
      // 横屏
      node && (node.style.transform = `rotate(-90deg)`)
      scale = Math.max(clientWidth / 1500, clientHeight / 750)
      // doOffset(node, false)
    } else {
      // 竖屏
      scale = Math.max(clientHeight / 1500, clientWidth / 750)
      node && (node.style.transform = `rotate(0deg)`)
      // doOffset(node, true)
    }
    console.log('scale', scale, scale * 750, clientWidth, clientHeight)
    document.documentElement.style.fontSize = scale + 'px'
  }
  window.onresize = setRem
  setRem()
}
fit()
