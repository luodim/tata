const isTest = false
const baseUrl = 'https://event.games.wanmei.com'

function reqGet(api) {
  return new Promise((resolve, reject) => {
    fetchJsonp(`${baseUrl}${api}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function handleErr(err, resolve) {
  if (err && resolve) {
    if (err.response) {
      resolve(err.response)
    } else {
      resolve({ status: 400, data: { code: -1, message: '请求失败！' } })
    }
  }
}

// 获取用户信息
function reqUserInfo() {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(userInfoMock)
        }, 1000)
      })
    : reqGet('/m/ht/anniver/initUser')
}

// 获取用户游戏信息
function reqGameData(roleId, serverId) {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(gameDataMock)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/getRoleInfo?roleId=${roleId}&serverId=${serverId}`)
}

// 获取兑换码
function reqCode() {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(codeDataMock)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/sendCode`)
}

// 上传更新分享故事
function reqShareStory(content) {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(shareResponseMock)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/share?content=${content}`)
}

// 抽奖
function reqLottery() {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(lotteryDataMock)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/lottery`)
}

// 绑定地址
function reqAddress(address, name, phone) {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(addressDataMock)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/address?address=${address}&name=${name}&phone=${phone}`)
}

const prizeConfig = {
  1: { pageId: 1, name: 'iPhone 14 Pro', pic: 'static/res/p1.png' },
  2: { pageId: 2, name: 'Xbox Series X 主机 国行', pic: 'static/res/p2.png' },
  3: { pageId: 3, name: 'AirPods (第三代) 配闪充盒', pic: 'static/res/p3.png' },
  4: { pageId: 4, name: 'HomePod mini 智能音响', pic: 'static/res/p4.png' },
  5: { pageId: 5, name: '幻塔周年庆礼盒', pic: 'static/res/p5.png' },
  6: { pageId: 6, name: '京东卡200元面值', pic: 'static/res/p6.png' },
  7: { pageId: 7, name: '京东卡50元面值', pic: 'static/res/p7.png' },
  8: { pageId: 8, name: '随机周边礼包', pic: 'static/res/p8.png' },
  9: { pageId: 9, name: '屈臣氏SPA服务券', pic: 'static/res/p9.png' },
}
