const app = getApp();

Page({
  data: {
    upload_list: [],
    upload_list_data: []
  },

  onLoad() {
    this.setData({
      upload_list: [],
      upload_list_data: []
    });
  },

  upload_event() {
    var self = this,
      temp_upload_list = self.data.upload_list,
      temp_upload_list_data = self.data.upload_list_data;
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
                self.setData({
                  upload_list: temp_upload_list,
                  upload_list_data: temp_upload_list_data
                });
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
    var form_data = e.detail.value;
    form_data['images'] = this.data.upload_list_data.join(',')
    // 数据校验
    var validation = [
      { fields: "address", msg: "请填写详细地址" },
      { fields: "person", msg: "请填写负责人" },
      { fields: "tel", msg: "请填写联系电话" },
      { fields: "num", msg: "请填写可配送人员数量" },
      { fields: "images", msg: "请上传配送人员健康证照片" }
    ];

    if (app.fields_check(form_data, validation)) {
      console.log(form_data);
    }
  }
});
