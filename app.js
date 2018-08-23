App({
    data: {
      // 用户信息缓存key
      cache_user_info_key: "cache_sousou_user_info_key",
  
      // 用户站点信息缓存key
      cache_user_merchant_key: "cache_sousou_user_merchant_key",
  
      // 设备信息缓存key
      cache_system_info_key: "cache_sousou_system_info_key",
  
      // 用户传入信息缓存key
      cache_launch_info_key: "cache_sousou_launch_info_key",
  
      // 默认用户头像
      default_user_head_src: "/images/default-user.png",
  
      // 请求地址
      request_url: "http://mei.la/customer_sousou_service/",
      //request_url: 'http://localhost/my/customer_sousou_service/',
      //request_url: 'http://default.com/project/customer_sousou_service/',
  
      // 基础信息
      application_title: "嗖嗖递",
      application_describe: "嗖嗖递，快递收取，寄件。",
  
      // 性别
      sex_list: ["保密", "女", "男"]
    },
  
    /**
     * 小程序初始化
     */
    onLaunch(options) {
      // 设置设备信息
      this.set_system_info();
      my.setStorage({
        key: this.data.cache_launch_info_key,
        data: options
      });
      // 启动query参数处理
      this.startup_query(options);
    },
  
    /**
     * 启动query参数处理
     */
    startup_query(options) {
      // 没有启动参数则返回
      if ((options.query || null) == null) {
        return false;
      }
  
      // 启动处理类型
      var type = options.query.type || null;
      switch (type) {
        // type=page
        case "page":
          // 页面
          var page = options.query.page || null;
  
          // 参数值
          var value = options.query.value || null;
  
          // 附带参数值
          var params = null;
  
          // 进入逻辑处理
          switch (page) {
            // 进入店铺   page=shop
            case "shop":
  
            // 进入项目详情   page=detail
            case "detail":
              if (value != null) {
                params = "id=" + value;
              }
              break;
  
            // 店铺买单   page=shoppay
            case "shoppay":
              if (value != null) {
                params = "shop_id=" + value;
              }
              break;
  
            default:
              break;
          }
          break;
  
        default:
          break;
      }
  
      // 是否需要进行页面跳转
      if (params != null) {
        my.navigateTo({
          url: "/pages/" + page + "/" + page + "?" + params
        });
      }
    },
  
    /**
     * 获取设备信息
     */
    get_system_info() {
      let system_info = my.getStorageSync({
        key: this.data.cache_system_info_key
      });
      if ((system_info.data || null) == null) {
        return this.set_system_info();
      }
      return system_info.data;
    },
  
    /**
     * 设置设备信息
     */
    set_system_info() {
      var system_info = my.getSystemInfoSync();
      my.setStorage({
        key: this.data.cache_system_info_key,
        data: system_info
      });
      return system_info;
    },
  
    /**
     * 请求地址生成
     */
    get_request_url(a, c, m, params) {
      a = a || "Index";
      c = c || "Index";
      m = m || "Home";
      params = params || "";
      if (params != "" && params.substr(0, 1) != "&") {
        params = "&" + params;
      }
      var user = this.GetUserCacheInfo();
      var app_client_user_id = user == false ? "" : user.alipay_openid;
      var user_id = user == false ? 0 : user.id;
      var nickname = user == false ? "" : user.nickname;
      return (
        this.data.request_url +
        "index.php?m=" +
        m +
        "&c=" +
        c +
        "&a=" +
        a +
        "&app_client_type=alipay&app_client_user_id=" +
        app_client_user_id +
        "&user_id=" +
        user_id +
        "&nickname=" +
        nickname +
        "&ajax=ajax&application=app&app_client=kehu" +
        params
      );
    },
  
    /**
     * 获取用户信息,信息不存在则唤醒授权
     * object     回调操作对象
     * method     回调操作对象的函数
     * return     有用户数据直接返回, 则回调调用者
     */
    GetUserInfo(object, method) {
      var user = this.GetUserCacheInfo();
      if (user == false) {
        // 唤醒用户授权
        this.UserAuthCode(object, method);
  
        return false;
      } else {
        return user;
      }
    },
  
    /**
     * 从缓存获取用户信息
     */
    GetUserCacheInfo() {
      var user = my.getStorageSync({ key: this.data.cache_user_info_key });
      if ((user.data || null) == null) {
        return false;
      }
      return user.data;
    },
  
    /**
     * 用户授权
     * object     回调操作对象
     * method     回调操作对象的函数
     */
    UserAuthCode(object, method) {
      // 邀请人参数
      var params = my.getStorageSync({key: this.data.cache_launch_info_key});
      var referrer = params.data.query.referrer || 0;
  
      // 加载loding
      my.showLoading({ content: "授权中..." });
  
      // 请求授权接口
      my.getAuthCode({
        scopes: "auth_user",
        success: res => {
          if (res.authCode) {
            my.httpRequest({
              url: this.get_request_url("GetAlipayUserInfo", "User"),
              method: "POST",
              data: {
                authcode: res.authCode,
                referrer: referrer
              },
              dataType: "json",
              success: res => {
                my.hideLoading();
                if (res.data.code == 0) {
                  my.setStorage({
                    key: this.data.cache_user_info_key,
                    data: res.data.data
                  });
  
                  if (typeof object === "object" && (method || null) != null) {
                    object[method]();
                  }
                } else {
                  my.showToast({
                    type: "fail",
                    content: res.data.msg,
                    duration: 3000
                  });
                }
              },
              fail: () => {
                my.hideLoading();
  
                my.showToast({
                  type: "fail",
                  content: "服务器请求出错",
                  duration: 3000
                });
              }
            });
          }
        },
        fail: e => {
          my.hideLoading();
  
          my.showToast({
            type: "fail",
            content: "授权失败",
            duration: 3000
          });
        }
      });
    },
  
    /**
     * 获取位置权限
     * object     回调操作对象
     * method     回调操作对象的函数
     */
    use_location(object, method) {
      my.showLoading({ content: "定位中..." });
  
      my.getLocation({
        success(res) {
          my.hideLoading();
  
          // 回调
          if (typeof object === "object" && (method || null) != null) {
            object[method]({ lng: res.longitude, lat: res.latitude, status: 1000 });
          }
        },
        fail(e) {
          my.hideLoading();
          var error = 0;
          switch (e.error) {
            case 11:
            case 2001:
              error = 2001;
              my.alert({
                title: "温馨提示",
                content: "点击右上角->关于->右上角->设置->打开地理位置权限",
                buttonText: "我知道了",
                success: () => {
                  if (typeof object === "object" && (method || null) != null) {
                    object[method]({ status: 400 });
                  }
                }
              });
              break;
  
            case 12:
              my.showToast({ content: "网络异常，请重试[" + e.error + "]" });
              break;
  
            case 13:
              my.showToast({ content: "定位失败，请重试[" + e.error + "]" });
              break;
  
            default:
              my.showToast({ content: "定位超时，请重试[" + e.error + "]" });
          }
  
          if(error != 2001)
          {
            setTimeout(function()
            {
              // 回调
              if (typeof object === "object" && (method || null) != null) {
                object[method]({ status: 400 });
              }
            }, 2000);
          }
        }
      });
    },
  
    /**
     * 字段数据校验
     * data           待校验的数据, 一维json对象
     * validation     待校验的字段, 格式 [{fields: 'mobile', msg: '请填写手机号码'}, ...]
     */
    fields_check(data, validation) {
      for (var i in validation) {
        var temp_value = data[validation[i]["fields"]];
        var temp_is_can_zero = validation[i]["is_can_zero"] || null;
        
        if ((temp_value == undefined || temp_value.length == 0 || temp_value == -1) || (temp_is_can_zero == null && temp_value == 0)
        ) {
          my.showToast({
            type: "fail",
            content: validation[i]["msg"]
          });
          return false;
        }
      }
      return true;
    },
  
    /**
     * 获取当前时间戳
     */
    get_timestamp() {
      return parseInt(new Date().getTime() / 1000);
    },
  
    /**
     * 获取日期
     * format       日期格式（默认 yyyy-MM-dd h:m:s）
     * timestamp    时间戳（默认当前时间戳）
     */
    get_date(format, timestamp) {
      var d = new Date((timestamp || this.get_timestamp()) * 1000);
      var date = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        "S+": d.getMilliseconds()
      };
      if (/(y+)/i.test(format)) {
        format = format.replace(
          RegExp.$1,
          (d.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? date[k]
              : ("00" + date[k]).substr(("" + date[k]).length)
          );
        }
      }
      return format;
    },
  
    /**
     * 获取对象、数组的长度、元素个数
     * obj      要计算长度的元素（object、array、string）
     */
    get_length(obj) {
      var obj_type = typeof obj;
      if (obj_type == "string") {
        return obj.length;
      } else if (obj_type == "object") {
        var obj_len = 0;
        for (var i in obj) {
          obj_len++;
        }
        return obj_len;
      }
      return false;
    },
  
    /**
     * 价格保留两位小数
     * price      价格保留两位小数
     */
    price_two_decimal(x) {
      var f_x = parseFloat(x);
      if (isNaN(f_x)) {
        return 0;
      }
      var f_x = Math.round(x * 100) / 100;
      var s_x = f_x.toString();
      var pos_decimal = s_x.indexOf(".");
      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += ".";
      }
      while (s_x.length <= pos_decimal + 2) {
        s_x += "0";
      }
      return s_x;
    }
  });
  