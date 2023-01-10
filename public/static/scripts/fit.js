function fit() {
  let scale = 1
  function setRem() {
    const { clientWidth, clientHeight } = document.documentElement
    const node = document.querySelector('#h5-container')
    const node2 = document.querySelector('#toast-self')
    if (clientWidth >= clientHeight) {
      // 横屏
      node && (node.style.transform = `rotate(-90deg)`)
      node2 && (node2.style.transform = `rotate(-90deg)`)
      scale = Math.max(clientWidth / 1500, clientHeight / 750)
      // doOffset(node, false)
    } else {
      // 竖屏
      scale = Math.max(clientHeight / 1500, clientWidth / 750)
      node && (node.style.transform = `rotate(0deg)`)
      node2 && (node2.style.transform = `rotate(0deg)`)
      // doOffset(node, true)
    }
    // 解决uc浏览器rem自适应问题（当根标签html字体小于12px时，按照12px绘制）
    document.documentElement.style.fontSize = scale * 10 + 'px'
  }
  window.onresize = setRem
  setRem()
}

function needRouter() {
  if (!(
    /(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(
      navigator.userAgent
    )
  )) {
    console.log('is pc')
    window.isPC = true
    // window.open('https://ht.wanmei.com/', '_self')
  }
}

fit()
needRouter()
// window.console.log = function() {}
