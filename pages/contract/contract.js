const app = getApp();

Page({
  data: {
    province_list: [],
    city_list: [],
    county_list: [],

    license_list: [],
    license_list_data: [],
    certificate_list: [],
    certificate_list_data: []
  },

  onLoad() {
    this.get_province_list();
    this.setData({
      license_list: [],
      license_list_data: [],
      certificate_list: [],
      certificate_listdata: []
    });
  },

  // 获取选择的省市区
  get_province_list() {
    var self = this;
    my.httpRequest({
      url: app.get_request_url("Index", "Region"),
      method: "POST",
      data: {},
      dataType: "json",
      success: res => {
        if (res.data.code == 0) {
          var data = res.data.data;
          self.setData({
            province_list: data
          });
        } else {
          my.showToast({
            type: "fail",
            content: res.data.msg
          });
        }
      },
      fail: () => {
        my.showToast({
          type: "fail",
          content: "服务器请求出错"
        });
      }
    });
  },

  get_city_list(parent) {
    var self = this;
    my.httpRequest({
      url: app.get_request_url("Index", "Region"),
      method: "POST",
      data: {
        pid: parent.id
      },
      dataType: "json",
      success: res => {
        if (res.data.code == 0) {
          var data = res.data.data;
          self.setData({
            city_list: data
          });
        } else {
          my.showToast({
            type: "fail",
            content: res.data.msg
          });
        }
      },
      fail: () => {
        my.showToast({
          type: "fail",
          content: "服务器请求出错"
        });
      }
    });
  },
  get_county_list(parent) {
    var self = this;
    my.httpRequest({
      url: app.get_request_url("Index", "Region"),
      method: "POST",
      data: {
        pid: parent.id
      },
      dataType: "json",
      success: res => {
        if (res.data.code == 0) {
          var data = res.data.data;
          self.setData({
            county_list: data
          });
        } else {
          my.showToast({
            type: "fail",
            content: res.data.msg
          });
        }
      },
      fail: () => {
        my.showToast({
          type: "fail",
          content: "服务器请求出错"
        });
      }
    });
  },

  select_province(e) {
    var value = e.detail.value,
      data = this.data.province_list[value];
    this.setData({
      province_value: value,
      city_value: null,
      county_value: null
    });
    this.get_city_list(data);
  },

  select_city(e) {
    var value = e.detail.value,
      data = this.data.city_list[value];
    this.setData({
      city_value: value,
      county_value: null
    });
    this.get_county_list(data);
  },

  select_county(e) {
    this.setData({
      county_value: e.detail.value
    });
  },

  upload_event(e) {
    var self = this,
      temp_upload_list,
      temp_upload_list_data;

    if (e.target.dataset.tag == 0) {
      temp_upload_list = self.data.license_list;
      temp_upload_list_data = self.data.license_list_data;
    } else {
      temp_upload_list = self.data.certificate_list;
      temp_upload_list_data = self.data.certificate_list_data;
    }
    my.chooseImage({
      count: 1,
      success: res => {
        for (var i in res.apFilePaths) {
          my.uploadFile({
            url: app.get_request_url("Images", "Upload"),
            fileType: "image",
            fileName: "file",
            filePath: res.apFilePaths[i],
            success: res => {
              var data =
                typeof res.data == "object" ? res.data : JSON.parse(res.data);
              if (data.code == 0) {
                temp_upload_list.push(data.data.url);
                temp_upload_list_data.push(data.data.path);

                if (e.target.dataset.tag == 0) {
                  self.setData({
                    license_list: temp_upload_list,
                    license_list_data: temp_upload_list_data
                  });
                } else {
                  self.setData({
                    certificate_list: temp_upload_list,
                    certificate_list_data: temp_upload_list_data
                  });
                }
              } else {
                my.showToast({
                  type: "fail",
                  content: data.msg
                });
              }
            },
            fail: res => {
              my.showToast({
                type: "fail",
                content: "图片上传失败"
              });
            }
          });
        }
      }
    });
  },

  form_submit(e) {
    // 表单数据
    var form_data = e.detail.value, self = this, data = self.data
    form_data["license"] = data.license_list_data.join(",");
    form_data["certificate"] = data.certificate_list_data.join(",");
    // 数据校验
    var validation = [
      { fields: "merchant", msg: "请填写站点名称" },
      { fields: "name", msg: "请填写个体户名称" },
      { fields: "number", msg: "请填写营业执照号码" },
      { fields: "receive_province", msg: "请选择省份", is_can_zero: 1 },
      { fields: "receive_city", msg: "请选择城市", is_can_zero: 1 },
      { fields: "receive_county", msg: "请选择区县", is_can_zero: 1 },
      { fields: "address", msg: "请填写详细地址" },
      { fields: "person", msg: "请填写负责人" },
      { fields: "tel", msg: "请填写联系电话" },
      { fields: "num", msg: "请填写可配送人员数量" },
      { fields: "license", msg: "请上传营业执照照片" },
      { fields: "certificate", msg: "请上传配送人员健康证照片" }
    ];

    if (app.fields_check(form_data, validation)) {
      form_data["receive_province"] = data.province_list[data.province_value].id;
      form_data["receive_city"] = data.city_list[data.city_value].id;
      form_data["receive_county"] = data.county_list[data.county_value].id;
      console.log(form_data);
    }
  },

  form_reset(e) {
    my.navigateBack()
  }
});
