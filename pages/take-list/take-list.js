const app = getApp();

Page({
  data: {
    data_list: [{
      express: '顺丰快递',
      express_num: '35434565724233435455',
      arrive_time: '2018-5-23 14:30',
      status_text: '待配送',
      status: 4
    },{
      express: '顺丰快递',
      express_num: '35434565724233435455',
      arrive_time: '2018-5-23 14:30',
      status_text: '已预约',
      status: 1
    },{
      express: '顺丰快递',
      express_num: '35434565724233435455',
      arrive_time: '2018-5-23 14:30',
      status_text: '配送中',
      status: 2
    },{
      express: '顺丰快递',
      express_num: '35434565724233435455',
      arrive_time: '2018-5-23 14:30',
      status_text: '已完成',
      status: 3
    }]
  },

  onLoad() {
    
  },

  input_event(e) {
    this.setData({
      input_value: e.detail.value
    });
  },

  search_event() {
    
  },

  // 配送
  distributed_event() {

  },

  // 完成
  complete_event() {

  }
});
