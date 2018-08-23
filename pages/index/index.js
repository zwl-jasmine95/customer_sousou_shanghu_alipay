const app = getApp();

Page({
  data: {
    img: app.data.default_user_head_src,
    name: "商户中心",
    banner_list: [{
      images_url:'/images/default-user.png'
    }],
    grid_list: [{
      url:'scan/scan',
      icon:'index-1',
      text:'到件扫描'
    },{
      url:'take-list/take-list?state=2',
      icon:'index-2',
      text:'取件通知',
      num: '23'
    },{
      url:'take-list/take-list?state=3',
      icon:'index-3',
      text:'配送完成',
      num: '45'
    },{
      url:'receive-list/receive-list?state=1',
      icon:'index-4',
      text:'寄件通知',
      num: '5'
    },{
      url:'receive-list/receive-list?state=2',
      icon:'index-5',
      text:'取件入库',
      num: '6'
    },{
      url:'receive-list/receive-list?state=3',
      icon:'index-6',
      text:'快递出库',
      num: '23'
    },{
      url:'query/query',
      icon:'index-7',
      text:'信息查询'
    },{
      url:'help-list/help-list',
      icon:'index-8',
      text:'配送求助'
    },{
      url:'invitation/invitation',
      icon:'index-9',
      text:'我的邀请'
    }]
  },

  onLoad() {

  }
});
