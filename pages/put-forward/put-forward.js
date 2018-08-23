const app = getApp();

Page({
  data: {
    money: 3456
  },

  onLoad() {},

  form_submit(e) {
    // 表单数据
    var form_data = e.detail.value;

    // 数据校验
    var validation = [
      { fields: "money_num", msg: "请填写提现金额" },
      { fields: "name", msg: "请填写收款姓名" },
      { fields: "alipay_account", msg: "请填写收款支付宝账户" }
    ];

    if (app.fields_check(form_data, validation)) {
      console.log(form_data);
      my.showToast({
        type: "success",
        content: "提现成功"
      });

      setTimeout(function(){
        my.navigateTo({
          url: '/pages/put-forward-list/put-forward-list'
        })
      },1000)
    }
  }
});
