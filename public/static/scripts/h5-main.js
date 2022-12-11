let mockTestCount = 0

function displayCtrl(node, state) {
  console.log('display ctrl', node, state)
  if (!node) return
  console.log(node.style)
  console.log(node.className)
  node.style.zIndex = state ? '999' : '-9'
  node.style.left = state ? '0' : '-200vw'
  node.style.right = state ? '0' : '-200vw'
}

function showAnimCtrl(node, state, min = '0', max = '1', minZ = '-9', maxZ = '9') {
  if (!node) return
  node.style.opacity = state ? max : min
  node.style.zIndex = state ? maxZ : minZ
  node.style.transition = `opacity 0.3s ease`
}

function scaleCtrl(node, scaleX = 1, scaleY = 1) {
  if (!node) return
  node.style.transform = `scale(${scaleX}, ${scaleY})`
  node.style.transition = `transform 0.3s ease`
}

function setText(node, text) {
  if (!node) return
  node.innerHTML = text
}

function showModalAnimCtrl(box, mask, content, state) {
  if (!box || !mask || !content) return
  box.style.zIndex = '99'
  showAnimCtrl(mask, state, '0', '0.3', '0', '0')
  showAnimCtrl(content, state, '0', '1', '0', '1')
  scaleCtrl(content, state ? '1' : '0.5', state ? '1' : '0.5')
}

function showModal(contentNode, state) {
  if (!contentNode || !modalBoxNode || !modalMaskNode) return
  showModalAnimCtrl(modalBoxNode, modalMaskNode, contentNode, state)
}

function getNode(selector) {
  return document.querySelector(selector)
}

// const gameNode = getNode('#GameDiv')
const h5Node = getNode('#h5-container')
const progressBoxNode = getNode('.progress-box')
const progressBlueNode = getNode('.progress-blue')
const progressMatrix = getNode('.progress-matrix')
const loginBtn = getNode('.login-btn-box')
const rect1BgNode = getNode('.loading-rect1')
const rect1TextNode = getNode('.loading-rect1-title')
const progressTextNode = getNode('.progress-title')
const loadingContentNode = getNode('.loading-content-box')
const modalBoxNode = getNode('.modal-box')
const modalMaskNode = getNode('.mask')
const loginDialogBoxNode = getNode('.login-dialog-box')
const noAccountDialogNode = getNode('.no-account-dialog-box')
const noAccountContentNode = getNode('.no-account-dialog-text')
const bgLoadingNode = getNode('.bg-loading')
const tipsNode = getNode('.tips-img')
const shareStoryNode = getNode('.share-story-box')
const receivePrizeNode = getNode('.receive-prize-box')
const noPrizeNode = getNode('.no-prize-box')
const registerPrizeNode = getNode('.register-prize-box')
const noPrizeTitle = getNode('.receive-prize-title')
const noPrizeContent = getNode('.no-prize-content')
const myPrizeNode = getNode('.my-prize-box')

noAccountContentNode &&
  (noAccountContentNode.innerHTML = `您在幻塔中没有创建过角色,不如到应
用商店下载游戏玩玩~`)

displayCtrl(h5Node, true)

function handleLoginClick() {
  console.log('login click')
  showAnimCtrl(loadingContentNode, false)
  showModal(mockTestCount % 2 === 0 ? loginDialogBoxNode : noAccountDialogNode, true)
  mockTestCount++
}

function handleConfirm() {
  showAnimCtrl(loginDialogBoxNode, false)
  scaleCtrl(loginDialogBoxNode, 0.5, 0.5)
  showAnimCtrl(bgLoadingNode, false)
  showAnimCtrl(tipsNode, true)
  setTimeout(() => {
    showModal(tipsNode, false)
    displayCtrl(h5Node, false)
    window.onGameInit && window.onGameInit()
  }, 1000)
}

function handleDownload() {
  window.open('https://www.baidu.com', '_self')
  displayCtrl(h5Node, false)
}

function handleClose(contentNodeName, needChange) {
  const contentNode = getNode(contentNodeName)
  console.log(contentNode)
  contentNode && showModal(contentNode, false)

  if (needChange) displayCtrl(h5Node, false)
}

function handleSubmit() {
  showModal(shareStoryNode, false)
  displayCtrl(h5Node, false)
}

function handleSubmitInfo() {
  showModal(registerPrizeNode, false)
  displayCtrl(h5Node, false)
}

function handleRegister() {
  showModal(receivePrizeNode, false)
  showModal(registerPrizeNode, true)
}

window.onLoadProgress = (progress) => {
  if (progressBlueNode) progressBlueNode.style.width = `${progress * 100}%`
  if (progressMatrix) progressMatrix.style.left = `${progress * 99}%`
  if (progressTextNode)
    progressTextNode.innerHTML = `塔塔正在赶往周年庆活动中.. ${Number(progress * 100).toFixed(0)}%`
}

window.onLoadComplete = () => {
  showAnimCtrl(progressBoxNode, false)
  showAnimCtrl(loginBtn, true)
  scaleCtrl(rect1BgNode, 1, 1.5)
  rect1TextNode.className = `${rect1TextNode.className}2`
  setText(
    rect1TextNode,
    `欢迎来参加周年庆活动，
先登录您的账号吧~`
  )
}

// 点击分享故事按钮
window.onClickShareStory = () => {
  displayCtrl(h5Node, true)
  showModal(shareStoryNode, true)
}

/**
 * 点击抽奖按钮
 * @param {*} hasPrize 是否中奖
 */
window.onClickLottory = (hasPrize) => {
  displayCtrl(h5Node, true)
  if (!hasPrize) {
    setText(noPrizeTitle, '// 很遗憾，大奖擦肩而过 _')
    setText(noPrizeContent, '别灰心，打开游戏刷刷地图吧！')
  }
  showModal(hasPrize ? receivePrizeNode : noPrizeNode, true)
}

/**
 * 点击我的奖品按钮
 * @param {*} hasPrize 是否有奖
 */
window.onMyPrizeClick = (hasPrize) => {
  displayCtrl(h5Node, true)
  if (!hasPrize) {
    setText(noPrizeTitle, '// 我的奖品')
    setText(noPrizeContent, '您还没有抽到奖品哦')
    showModal(noPrizeNode, true)
  }
  showModal(hasPrize ? myPrizeNode : noPrizeNode, true)
}

// let count = 0
// // mock
// const timer = setInterval(() => {
//   if (count >= 100) {
//     timer && clearInterval(timer)
//     onLoadComplete()
//   } else {
//     count++
//     onLoadProgress(count / 100)
//   }
// }, 20)
