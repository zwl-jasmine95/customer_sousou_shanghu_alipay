const app = getApp();

Page({
  data: {
    img: app.data.default_user_head_src,
    name: 'Admin',
    distribution_total: 193,
    take_receive_total: 457,
    complaint_total: 13,
    invitation_total: 35,

    available_money: 128,
    unavailable_money: 28,

    customer_tel: '400-888-8888'
  },

  onLoad() {

  },

  put_forward() {
    my.switchTab({
      url: '/pages/put-forward/put-forward'
    })
  }
});
