const isTest = false

function reqGet(api) {
  return new Promise((resolve, reject) => {
    fetch(api, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
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
          r(userInfo)
        }, 1000)
      })
    : reqGet('/m/ht/anniver/initUser')
}

// 获取用户游戏信息
function reqGameData(roleId, serverId) {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(gameData)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/getRoleInfo?roleId=${roleId}&serverId=${serverId}`)
}

// 获取兑换码
function reqCode() {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(codeData)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/sendCode`)
}

// 上传更新分享故事
function reqShareStory(content) {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(shareResponse)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/share?content=${content}`)
}

// 抽奖
function reqLottery() {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(lotteryData)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/lottery`)
}

// 绑定地址
function reqAddress(address, name, phone) {
  return isTest
    ? new Promise((r, r2) => {
        setTimeout(() => {
          r(addressData)
        }, 1000)
      })
    : reqGet(`/m/ht/anniver/address?address=${address}&name=${name}&phone=${phone}`)
}
