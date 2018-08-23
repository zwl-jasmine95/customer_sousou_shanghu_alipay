const app = getApp();
Page({
  data: {
    is_show_input: false,
    code: '',
  },

  onLoad() {
    this.scan_event();
  },

  // 扫一扫
  scan_event() {
    my.scan({
      type: 'bar',
      success: (res) => {
        this.setData({code: res.code});
        this.nav_scan_detail();
      },
      fail: (e) => {
        this.setData({
          is_show_input: true,
        });
      }
    });
  },

  // 进入录取订单页面
  nav_scan_detail() {
    my.redirectTo({
      url: '/pages/scan-detail/scan-detail?code=' + this.data.code
    });
  },

  // 输入框同步事件
  bind_form_code_input(e)
  {
    this.setData({code: e.detail.value});
  },

  // 确认事件
  code_submit_event(e) {
    if((this.data.code || null) == null)
    {
      my.showToast({
        type: 'fail',
        content: '请输入快递单号',
      });
    } else {
      this.nav_scan_detail();
    }
  }
  
});
