const app = getApp();

Page({
  data: {
    name:'张三',
    tel:'13568546890',
    address:'上海市上海市上海市上海市上海市',
    express:'顺丰快递',
    express_num:'45454656',
    arrive_time:'2018-3-55 12:30',
    appointment_time:'2018-3-55 12:30',
    pre_arrival_time:'2018-3-55 12:30',
    finish_time:'2018-3-55 12:30',
    status_text:'待配送'
  },
  
  onLoad(options){
    console.log(options)
  }
});
