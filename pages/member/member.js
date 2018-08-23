const app = getApp();

Page({
  data: {
    data_list: [{
      name: 'dfjhdfd',
      time: '2018-12-30'
    },{
      name: 'Admindfjhdghgfd',
      time: '2018-12-30'
    },{
      name: 'gfghgh',
      time: '2018-12-30'
    }]
  },

  input_event(e) {
    this.setData({
      input_value: e.detail.value
    });
  },

  search_event() {

  }

});
