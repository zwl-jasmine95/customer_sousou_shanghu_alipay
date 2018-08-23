const app = getApp();

Page({
  data: {
    status: 2,
    number: 6
  },

  onLoad() {

  },

  back_event() {
    my.navigateBack()
  },

  audit_event() {
    my.navigateTo({
        url: '/pages/contract/contract'
    })
  }
});
