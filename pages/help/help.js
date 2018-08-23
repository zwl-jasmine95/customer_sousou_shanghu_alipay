const app = getApp();

Page({
  data: {
    help_time: ""
  },

  onLoad() {},

  select_time() {
    // 选择时间
    var start_date = app.get_date("yyyy-MM-dd h:m", app.get_timestamp() + 1800);
    var end_date = app.get_date(
      "yyyy-MM-dd h:m",
      app.get_timestamp() + 3600 * 24 * 3
    );

    // 选择日期
    my.datePicker({
      format: "yyyy-MM-dd HH:mm",
      currentDate: start_date,
      startDate: start_date,
      endDate: end_date,
      success: res => {
        this.setData({
          help_time: res.date
        });
      }
    });
  },

  form_submit(e) {
    // 表单数据
    var form_data = e.detail.value;

    // 数据校验
    var validation = [
      { fields: "time", msg: "请选择求助时间" },
      { fields: "num", msg: "请填写求助人数" },
      { fields: "reason", msg: "请填写求助原因" }
    ];

    if (app.fields_check(form_data, validation)) {
      console.log(form_data);
    }
  }
});
