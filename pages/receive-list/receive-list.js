const app = getApp();

Page({
  data: {
    data_list: [
      {
        sender_name: "张三",
        sender_tel: "18312568059",
        sender_time: "2018-6-14 14:30",
        receive_name: "李四",
        receive_tel: "15867584932",
        status_text: "待确认",
        appointment_time: "2018-6-14 14:30",
        arrival_time: "",
        price: "",
        status: 1
      },
      {
        sender_name: "张三",
        sender_tel: "18312568059",
        sender_time: "2018-6-14 14:30",
        receive_name: "李四",
        receive_tel: "15867584932",
        status_text: "已确认",
        appointment_time: "2018-6-14 14:30",
        arrival_time: "2018-6-14 14:30",
        price: "",
        status: 2
      },
      {
        sender_name: "张三",
        sender_tel: "18312568059",
        sender_time: "2018-6-14 14:30",
        receive_name: "李四",
        receive_tel: "15867584932",
        status_text: "待支付",
        appointment_time: "2018-6-14 14:30",
        arrival_time: "2018-6-14 14:30",
        price: "128",
        status: 3
      },
      {
        sender_name: "张三",
        sender_tel: "18312568059",
        sender_time: "2018-6-14 14:30",
        receive_name: "李四",
        receive_tel: "15867584932",
        status_text: "已收件",
        appointment_time: "",
        arrival_time: "",
        price: "",
        status: 4
      },
      {
        sender_name: "张三",
        sender_tel: "18312568059",
        sender_time: "2018-6-14 14:30",
        receive_name: "李四",
        receive_tel: "15867584932",
        status_text: "已出库",
        appointment_time: "",
        arrival_time: "",
        price: "",
        status: 5
      },
      {
        sender_name: "张三",
        sender_tel: "18312568059",
        sender_time: "2018-6-14 14:30",
        receive_name: "李四",
        receive_tel: "15867584932",
        status_text: "已出库",
        appointment_time: "",
        arrival_time: "",
        price: "",
        status: 5
      }
    ],

    popup_type: null,
    company_list: [],
    company_value: null
  },

  onLoad() {
    this.get_company_list();
  },

  input_event(e) {
    this.setData({
      input_value: e.detail.value
    });
  },

  search_event() {},

  get_company_list() {
    this.setData({
      company_list: ["韵达快递", "圆通快递"]
    });
  },

  select_company(e) {
    this.setData({
      company_value: e.detail.value
    });
  },

  // 确认
  confirm_event() {},

  // 确认金额
  confirm_price() {},

  // 修改金额
  modify_price() {
    this.setData({
      popup_type: 1
    })
  },

  // 出库
  out_event() {
    this.setData({
      popup_type: 2
    })
    console.log(this.data.popup_type)
  },

  // 弹框事件
  close_event() {
    this.setData({
      popup_type: null
    })
  },

  confirm_modify_price() {},

  confirm_out_event(e) {
    var self = this,
      data = self.data;
    // 表单数据
    var form_data = e.detail.value;
    // 数据校验
    var validation = [
      { fields: "company", msg: "请选择快递公司", is_can_zero: 1 },
      { fields: "number", msg: "请输入快递编号" }
    ];

    if (app.fields_check(form_data, validation)) {
      // form_data["company"] = data.company_list[data.company_value].id;
      // form_data["shelf"] = data.shelf_list[data.shelf_value].id;
    }
  }

  //end 弹框事件
});
