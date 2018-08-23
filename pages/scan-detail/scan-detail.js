const app = getApp();

Page({
  data: {
    user: {
      id: -1,
      name: "请选择用户"
    },
    company_list: [],
    shelf_list: [],
    company_value: null,
    shelf_value: null
  },

  onLoad(params) {
    this.setData({
      number: params.code
    });
    this.get_company_list();
    this.get_shelf_list();
  },

  get_company_list() {
    this.setData({
      company_list: ["韵达快递", "圆通快递"]
    });
  },

  get_shelf_list() {
    this.setData({
      shelf_list: ["11-2", "11-3"]
    });
  },

  select_company(e) {
    console.log(e);
    this.setData({
      company_value: e.detail.value
    });
  },

  select_shelf(e) {
    this.setData({
      shelf_value: e.detail.value
    });
  },

  form_submit(e) {
    var self = this,
      data = self.data;
    // 表单数据
    var form_data = e.detail.value;
    form_data["user"] = data.user.id;
    // 数据校验
    var validation = [
      { fields: "company", msg: "请选择快递公司", is_can_zero: 1 },
      { fields: "user", msg: "请选择用户", is_can_zero: 1 },
      { fields: "shelf", msg: "请选择货架编号", is_can_zero: 1 }
    ];

    if (app.fields_check(form_data, validation)) {
      // form_data["company"] = data.company_list[data.company_value].id;
      // form_data["shelf"] = data.shelf_list[data.shelf_value].id;
      my.confirm({
        title: "添加成功",
        // content: "您还未绑定地址",
        confirmButtonText: "回到首页",
        cancelButtonText: "继续添加",
        success: res => {
          if (res.confirm) {
            my.switchTab({
              url: "/pages/index/index"
            });
          } else {
            my.redirectTo({
              url: '/pages/scan/scan'
            });
          }
        }
      });
    }
  }
});
