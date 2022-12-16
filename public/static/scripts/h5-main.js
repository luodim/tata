const tipsDuration = 2500

let mockTestCount = 0
let isLogin = false
let noAccount = false
let serverData = null
let storyContent = null
let registerData = { name: '', phone: '', address: '', address2: '' }
let giftType = null

function displayCtrl(node, state) {
  if (!node) return
  node.style.zIndex = state ? '999' : '-9'
  // node.style.left = state ? '0' : '-200vw'
  // node.style.right = state ? '0' : '-200vw'
}

function showAnimCtrl(node, state, min = '0', max = '1', minZ = '-9', maxZ = '9') {
  if (!node) return
  node.style.opacity = state ? max : min
  node.style.zIndex = state ? maxZ : minZ
  node.style.transition = `opacity 0.3s ease`
}

function setOp(node, op) {
  node.style.opacity = op
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

function setSrc(node, url) {
  if (!node) return
  node.src = url
}

function setCls(node, cls) {
  if (!node) return
  node.className = cls
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
const prizeName = getNode('.prize-name')
const prizeName2 = getNode('.dialog-header-content')
const btnGetPrizeName = getNode('.btn-title-get-prize')
const myPrizeInfo = getNode('.dialog-title2')
const accountText = getNode('.card-account-text')
const codeText = getNode('.card-code-text')
const accountBox = getNode('.my-prize-account-box')
const codeBox = getNode('.my-prize-code-box')
const myPrizeAddrss = getNode('.my-prize-address')
const prizeImg = getNode('.img-prize')
const prizeImg2 = getNode('.register-box-prize-img')
const prizeImg3 = getNode('.my-prize-img')
const btnRegister = getNode('.bg-btn3')

noAccountContentNode &&
  (noAccountContentNode.innerHTML = `您还没有创建角色哦，
不如先来这里看看`)

displayCtrl(h5Node, true)

// 无账户点击确认后路由到完美幻塔首页
function handleDownload() {
  window.open('https://ht.wanmei.com/', '_self')
  displayCtrl(h5Node, false)
}

function handleClose(contentNodeName, needChange) {
  const contentNode = getNode(contentNodeName)
  contentNode && showModal(contentNode, false)
  if (needChange) displayCtrl(h5Node, false)
}

// 更新奖品信息
function setPrizeInfo() {
  const data = getPrizeData()
  if (!data) return
  const pid = data.pageId
  const el = prizeConfig[`${pid}`]
  if (el && el.pic) {
    setSrc(prizeImg, el.pic)
    setSrc(prizeImg2, el.pic)
    setSrc(prizeImg3, el.pic)
  }
  if (data.prizeName) {
    setText(prizeName, data.prizeName)
    setText(prizeName2, data.prizeName)
  }
}

// 更新用户信息
async function updateUserInfo() {
  const res2 = await reqUserInfo()
  window.userInfo = res2.result
  console.log('update user info', JSON.stringify(window.userInfo))
  setPrizeInfo()
  window.setLotteryState && window.setLotteryState(getUserData() && getUserData().lotteryed === 0)
}

// 登录窗口确定点击
async function handleConfirm() {
  if (isTest) serverData = serverDataMock
  if (!serverData) return
  const { serverId, roleId } = serverData
  if (!serverId || !roleId) return
  const res = await reqGameData(roleId, serverId)
  window.gameData = res.result.info
  updateUserInfo()
  showAnimCtrl(loginDialogBoxNode, false)
  showAnimCtrl(bgLoadingNode, false)
  showAnimCtrl(tipsNode, true)
  setTimeout(() => {
    showModal(tipsNode, false)
    displayCtrl(h5Node, false)
    window.onGameInit && window.onGameInit()
  }, tipsDuration)
}

// 分享故事提交
async function handleSubmit() {
  const res = await reqShareStory(storyContent)
  console.log(res)
  if (res.status === 1000) {
    // todo
    updateUserInfo()
  }
  showModal(shareStoryNode, false)
  displayCtrl(h5Node, false)
}

// 地址绑定提交
async function handleSubmitInfo() {
  if (!registerData || !registerData.name || !registerData.phone) return
  const res = await reqAddress(
    `${registerData.address} ${registerData.address2}`,
    registerData.name,
    registerData.phone
  )
  console.log(res)
  if (res.status === 1000) {
    // todo
    updateUserInfo()
  }
  showModal(registerPrizeNode, false)
  displayCtrl(h5Node, false)
}

// 点击进行地址绑定流程的按钮
function handleRegister() {
  showModal(receivePrizeNode, false)
  if (giftType === 11) {
    showModal(registerPrizeNode, true)
  } else {
    displayCtrl(h5Node, false)
  }
}

function getUserData() {
  if (window.userInfo && window.userInfo.user) return window.userInfo.user
  return null
}

function getPrizeData() {
  if (window.userInfo && window.userInfo.myPrize) return window.userInfo.myPrize
  return null
}

function handleTAChange(v) {
  storyContent = v
}

function handleIpt(v, id) {
  console.log(v, id)
  const obj = { ...registerData }
  obj[id] = v
  registerData = obj
}

function handleCopy(id) {
  let text = ''
  if (id === 'account') {
    text = accountText ? accountText.innerHTML : ''
  } else if (id === 'code') {
    text = codeText ? codeText.innerHTML : ''
  }
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    // 赋值
    textarea.value = text
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)
    // 移除输入框
    document.body.removeChild(textarea)
  }
}

window.onLoadProgress = (progress) => {
  progress = progress > 1 ? 1 : progress
  if (progressBlueNode) progressBlueNode.style.width = `${progress * 100}%`
  if (progressMatrix) progressMatrix.style.left = `${progress * 99}%`
  if (progressTextNode)
    progressTextNode.innerHTML = `塔塔正在赶往周年庆活动中.. ${Number(progress * 100).toFixed(0)}%`
}

window.onLoadComplete = () => {
  showAnimCtrl(progressBoxNode, false)
  if (isLogin) {
    showAnimCtrl(loadingContentNode, false)
    showModal(noAccount ? noAccountDialogNode : loginDialogBoxNode, true)
  } else {
    showAnimCtrl(loginBtn, true)
    scaleCtrl(rect1BgNode, 1, 1.5)
    rect1TextNode.className = `${rect1TextNode.className}2`
    setText(rect1TextNode, `欢迎来参加周年庆活动，先登录您的账号吧~`)
  }
}

// 点击分享故事按钮
window.onClickShareStory = () => {
  displayCtrl(h5Node, true)
  showModal(shareStoryNode, true)
}

// 生成海报后
window.onClickSharePoster = async () => {}

/**
 * 点击抽奖按钮
 */
window.onClickLottory = async () => {
  const res = await reqLottery()
  const hasPrize = Boolean(
    res && res.result && res.result.pageId !== undefined && res.result.pageId !== null
  )
  giftType = res && res.result ? res.result.type : 12
  updateUserInfo()
  displayCtrl(h5Node, true)
  if (!hasPrize) {
    setText(noPrizeTitle, '// 很遗憾，大奖擦肩而过 _')
    setText(noPrizeContent, '别灰心~打开游戏跑跑地图！')
  } else {
    setText(btnGetPrizeName, giftType === 11 ? '前往登记领奖地址' : '确定')
    setCls(btnRegister, giftType === 11 ? 'bg-btn2' : 'bg-btn3')
  }
  showModal(hasPrize ? receivePrizeNode : noPrizeNode, true)
}

/**
 * 点击我的奖品按钮
 */
window.onMyPrizeClick = () => {
  const hasPrize = Boolean(window.userInfo && window.userInfo.myPrize)
  displayCtrl(h5Node, true)
  if (!hasPrize) {
    setText(noPrizeTitle, '// 我的奖品')
    setText(noPrizeContent, '您还没有抽到奖品哦')
    showModal(noPrizeNode, true)
  } else {
    setText(myPrizeInfo, window.userInfo.myPrize.address ? '// 领奖邮寄地址 _' : '// 奖品信息 _')
    setText(prizeName, getPrizeData() && getPrizeData().prizeName ? getPrizeData().prizeName : '')
    setText(accountText, getPrizeData() && getPrizeData().card ? getPrizeData().card : '')
    setText(codeText, getUserData() && getUserData().code ? getUserData().code : '')
    setOp(accountBox, window.userInfo.myPrize.address ? 0 : 1)
    setOp(codeBox, window.userInfo.myPrize.address ? 0 : 1)
    setOp(myPrizeAddrss, window.userInfo.myPrize.address ? 1 : 0)
  }
  showModal(hasPrize ? myPrizeNode : noPrizeNode, true)
}

// 用户点击游戏礼品按钮
window.onClickGift = () => {
  if (window.userInfo && window.userInfo.user && window.userInfo.user.code) {
    window.handleGiftCB(window.userInfo.user.code)
  } else {
    window.handleGiftCB(null)
  }
}

if (isTest) {
  let count = 0
  // mock
  const timer = setInterval(() => {
    if (count >= 100) {
      timer && clearInterval(timer)
      onLoadComplete()
    } else {
      count++
      onLoadProgress(count / 100)
    }
  }, 20)
}
