const app = getApp();

Page({
  data: {
    id: -1,
    name: "",
    data_list: [
      {
        name: "dfjhdfd",
        id: "1"
      },
      {
        name: "Admindfjhdghgfd",
        id: "2"
      },
      {
        name: "gfghgh",
        id: "3"
      }
    ]
  },

  input_event(e) {
    this.setData({
      input_value: e.detail.value
    });
  },

  search_event(e) {
    console.log(e);
  },

  select_event(e) {
    var id = e.target.dataset.id,
      name = e.target.dataset.name;
    if (id == this.data.id) {
      id = -1;
      name = "";
    }
    this.setData({
      id: id,
      name: name
    });
  },

  submit_event() {
    var self = this,
      id = self.data.id;
    if (id != -1) {
      var pre = getCurrentPages()[getCurrentPages().length - 2];
      pre.setData({
        user: {
          name: self.data.name,
          id: id
        }
      });
      my.navigateBack();
    } else {
      my.showToast({
        type: "fail",
        content: "请先选择用户"
      });
    }
  }
});
