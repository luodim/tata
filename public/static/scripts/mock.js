const userInfo = {
  success: true,
  requestName: 'initUser',
  status: 1000,
  message: 'service success',
  traceId: '2fb0f60f8aaf4ef7bb7c2b2f108a3594',
  result: {
    myPrize: {
      id: null,
      status: 11,
      userid: null,
      createtime: '2022-12-06 15:13:42',
      date: null,
      ip: null,
      uniqueLock: null,
      prizeName: '京东卡',
      prize: null,
      pageId: 3,
      card: '103:948',
      address: '***hhhh',
      phone: '188****2222',
      name: '12*4',
      defaultStatus: null,
      prizePool: 'defaultPool',
    },
    user: {
      id: 1,
      status: 1,
      laohuUid: 32258983,
      userid: '9_32258983',
      createtime: '2022-12-06 14:47:36',
      ip: null,
      shareTime: '2022-12-06 15:12:53',
      shareContent: null,
      lotteryed: 1,
      code: '201:926',
    },
  },
}

const gameData = {
  success: true,
  requestName: 'getRoleInfo',
  status: 1000,
  message: 'service success',
  traceId: 'c4cfe03e263c482c99c874508fdba54a',
  result: {
    info: {
      first_singlecloneend_time: '2021-12-16 11:42:19',
      first_ssr_weapon: '1472',
      bx_cnt: '550',
      mytw_cnt: '0',
      roleid: '62281320759454',
      dfls_max_score: '0',
      wlsmtsd_cnt: '0',
      first_finish_taskid: 'q203040',
      award_max_ssr_weapon: '1478',
      wlmzzztsd_cnt: '0',
      mytw_max_score: '0',
      dfls_win_rate: '0.0',
      dfls_cnt: '0',
      yxtsd_cnt: '5315',
      wlwxsytsd_cnt: '0',
      unfinish_tsd_rate: '0.8674067606336535',
      first_ssr_weapon_time: '2021-12-16 10:20:28',
      ssr_weapon_cnt: '10',
      mx_weapon_cnt: '4',
      overtake_tsd_rate: '0.9504236205656408',
      yxhxd_itemid: '48',
      mytw_avg_damage: '0.0',
      jrhx_max_layer: '71',
      dsjxwf_cnt: '9',
      mj_win_cnt: '0',
      total_tsd_cnt: '5315',
      total_online_time: '386709',
      has_friend_cnt: '3',
      mytw_win_cnt: '0',
      mytw_avg_time: '0.0',
      jdtsd_cnt: '0',
      createrole_days: '354',
      jz_cnt: '4',
    },
  },
}

const codeData = {
  success: true,
  requestName: 'sendCode',
  status: 1001,
  message: '已领取',
  traceId: '8d9ae8c9de4a40ebb595fbc5fcaf160b',
  result: {
    code: '201:926',
  },
}

const shareResponse = {
  success: false,
  requestName: 'share',
  status: -3001,
  message: '已分享',
  traceId: 'eaa998c6ddf04a5abc04769e73ccdf0a',
  result: {},
}

const lotteryData = {
  success: true,
  requestName: 'lottery',
  status: 1000,
  message: 'service success',
  traceId: '6991ca839a86422ba13990600963d158',
  result: {
    prizeName: '京东卡',
    type: 12,
    pageId: 3,
  },
}

const addressData = {
  success: true,
  requestName: 'address',
  status: 1000,
  message: '地址绑定成功',
  traceId: '39c3bf1903604094a1709ef137f5c468',
  result: {},
}

export { userInfo, gameData, codeData, shareResponse, lotteryData, addressData }