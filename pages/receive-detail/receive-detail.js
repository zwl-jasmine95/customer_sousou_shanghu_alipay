const app = getApp();

Page({
  data: {
    take_name:'张三',
    take_tel:'13568546890',
    take_address:'上海市上海市上海市上海市上海市',
    post_name:'李四',
    post_tel:'17643546686',
    post_address:'上海市上海市上海市上海市上海市',
    express:'顺丰快递',
    express_num:'45454656',
    order_time:'2018-3-55 12:30',
    appointment_time:'2018-3-55 12:30',
    pre_arrival_time:'2018-3-55 12:30',
    receive_time:'2018-3-55 12:30',
    finish_time:'2018-3-55 12:30',
    price:'128',
    status_text:'待配送'
  },
  
  onLoad(options){
    console.log(options)
  }
});
