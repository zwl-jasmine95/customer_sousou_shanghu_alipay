const app = getApp();

Page({
  data: {
    data_list: [{
      name: '快递支付',
      time: '2018-05-22 11:27',
      person: '系统',
      type: '增加',
      price: '100',
      original: '50',
      balance: '150'
    },{
      name: '余额提现',
      time: '2108-05-22 11:27',
      person: '用户',
      type: '减少',
      price: '50',
      original: '150',
      balance: '100'
    }]
  },

  onLoad() {
    
  }

  
});
