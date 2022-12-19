const tipsDuration = isTest ? 100 : 2500

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
  if (!node) return
  node.style.opacity = op
}

function setMargin(node, m) {
  if (!node) return
  node.style.margin = m
}

function scaleCtrl(node, scaleX = 1, scaleY = 1, deg) {
  if (!node) return
  node.style.transform = deg
    ? `rotate(${deg}deg) scale(${scaleX}, ${scaleY})`
    : `scale(${scaleX}, ${scaleY})`
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

function showModalAnimCtrl(box, mask, content, state, deg) {
  if (!box || !mask || !content) return
  box.style.zIndex = '99'
  showAnimCtrl(mask, state, '0', '0.3', '0', '0')
  showAnimCtrl(content, state, '0', '1', '0', '1')
  scaleCtrl(content, state ? '1' : '0.5', state ? '1' : '0.5', deg)
}

function showModal(contentNode, state, deg) {
  if (!contentNode || !modalBoxNode || !modalMaskNode) return
  showModalAnimCtrl(modalBoxNode, modalMaskNode, contentNode, state, deg)
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
const codeNameNode = getNode('.card-code')
// const accountBox = getNode('.my-prize-account-box')
const codeBox = getNode('.my-prize-code-box')
const myPrizeAddrss = getNode('.my-prize-address')
const prizeImg = getNode('.img-prize')
const prizeImg2 = getNode('.register-box-prize-img')
const prizeImg3 = getNode('.my-prize-img')
const btnRegister = getNode('.bg-btn3')
const copyTipsNode = getNode('.copy-tips')
const registerBox = getNode('.register-btn-box2')
const prizeName3 = getNode('.prize-name2')
const qcsTipsNode = getNode('.qcs-tips')
const wrapInfo = getNode('.my-prize-info-wrap')
const pcBg = getNode('.pb-bg-wrap')

noAccountContentNode &&
  (noAccountContentNode.innerHTML = `您还没有创建角色哦，
不如先来这里看看`)

displayCtrl(h5Node, true)

if (pcBg) {
  pcBg.style.zIndex = window.isPC ? '999' : '-999'
  pcBg.style.opacity = window.isPC ? '1' : '0'
}

// 无账户点击确认后路由到完美幻塔首页
function handleDownload() {
  window.open('https://ht.wanmei.com/', '_self')
  displayCtrl(h5Node, false)
}

function handleClose(contentNodeName, needChange, deg) {
  const contentNode = getNode(contentNodeName)
  contentNode && showModal(contentNode, false, deg)
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
  window.setLotteryState && window.setLotteryState()
}

// 登录窗口确定点击
async function handleConfirm() {
  if (isTest) serverData = serverDataMock
  if (!serverData) return
  const res2 = await reqUserInfo()
  if (res2)  window.userInfo = res2.result
  const { serverId, roleId } = serverData
  if (!serverId || !roleId) return
  const res = await reqGameData(roleId, serverId)
  if (res && res.result) window.gameData = res.result.info
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
  }
  updateUserInfo()
  showModal(shareStoryNode, false)
  displayCtrl(h5Node, false)
}

// 地址绑定提交
async function handleSubmitInfo() {
  if (!registerData || !registerData.name || !registerData.phone) {
    return
  }
  const res = await reqAddress(
    `${registerData.address} ${registerData.address2}`,
    registerData.name,
    registerData.phone
  )
  console.log(res)
  if (res.status === 1000) {
    // todo
  }
  updateUserInfo()
  showModal(registerPrizeNode, false)
  displayCtrl(h5Node, false)
}

// 点击进行地址绑定流程的按钮
function handleRegister() {
  console.log(giftType, 'handle register')
  if (giftType === 11) {
    showModal(myPrizeNode, false, 90)
    showModal(receivePrizeNode, false, 90)
    showModal(registerPrizeNode, true)
  } else {
    showModal(receivePrizeNode, false, 90)
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

function isSTGift() {
  const data = getPrizeData()
  if (data) {
    const id = data.pageId
    return Number(id) !== 6 && Number(id) !== 7 && Number(id) !== 9
  }
  return false
}

function isQCS() {
  const data = getPrizeData()
  if (data) {
    const id = data.pageId
    return Number(id) === 9
  }
  return false
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

  const pageId = res && res.result && res.result.pageId ||null
  const hasPrize = Boolean(
    pageId !== undefined && pageId !== null
  )
  giftType = (pageId !== 6 && pageId !== 7 && pageId !== 9) ? 11 : 12
  updateUserInfo()
  displayCtrl(h5Node, true)
  if (!hasPrize) {
    setText(noPrizeTitle, '// 很遗憾，大奖擦肩而过 _')
    setText(noPrizeContent, '别灰心~打开游戏跑跑地图！')
  } else {
    const d = getPrizeData()
    const name = (res && res.result && res && res.result.prizeName) || (d && d.prizeName) || ''
    setText(prizeName3, name)
    setText(btnGetPrizeName, giftType === 11 ? '前往登记领奖地址' : '确定')
    setCls(btnRegister, giftType === 11 ? 'bg-btn2' : 'bg-btn3')
  }
  showModal(hasPrize ? receivePrizeNode : noPrizeNode, true, 90)
}

/**
 * 点击我的奖品按钮
 */
window.onMyPrizeClick = () => {
  const hasPrize = Boolean(window.userInfo && window.userInfo.myPrize)
  giftType = isSTGift() ? 11 : 12
  console.log(giftType)
  displayCtrl(h5Node, true)
  // debugger
  if (!hasPrize) {
    setText(noPrizeTitle, '// 我的奖品')
    setText(noPrizeContent, '您还没有抽到奖品哦')
  } else {
    if (giftType === 11) { // 实体礼品
      setText(myPrizeInfo, '// 领奖邮寄地址 _')
      if (window.userInfo.myPrize.address) {
        setText(myPrizeAddrss, window.userInfo.myPrize.address)
        displayCtrl(registerBox, false)
      } else {
        setText('还未绑定领奖地址哦')
        displayCtrl(registerBox, true)
      }
      setOp(codeBox, 0)
      setOp(copyTipsNode, 0)
      setOp(myPrizeAddrss, 1)
      setOp(qcsTipsNode, 0)
    } else { // 虚拟礼品
      displayCtrl(registerBox, false)
      setText(myPrizeInfo, !isQCS() ? '// 奖品信息 _' : '// 券码信息 _')
      setText(codeNameNode, !isQCS() ? '卡密' : '激活码')
      if (isQCS()) {
        setMargin(wrapInfo, '9rem 0 0 0')
        setOp(qcsTipsNode, 1)
      } else {
        setMargin(wrapInfo, '1rem 0 0 0')
        setOp(qcsTipsNode, 0)
      }
      setOp(codeBox, 1)
      setOp(copyTipsNode, 1)
      setOp(myPrizeAddrss, 0)
    }
    setText(prizeName, getPrizeData() && getPrizeData().prizeName ? getPrizeData().prizeName : '')
    // setText(accountText, getPrizeData() && getPrizeData().card ? getPrizeData().card : '')
    setText(codeText, getPrizeData() && getPrizeData().card ? getPrizeData().card : '')
  }
  showModal(hasPrize ? myPrizeNode : noPrizeNode, true, 90)
}

// 用户点击游戏礼品按钮
window.onClickGift = async () => {
  const res = await reqCode()
  if (res && res.result) {
    const { code } = res.result
    window.handleGiftCB && window.handleGiftCB(code || '')
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
