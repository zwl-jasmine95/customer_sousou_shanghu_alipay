const app = getApp()

Page({
    data:{
        data_list: [{
            order_time: '2018-6-15 13:50',
            money: '100',
            receivable: 'Admin',
            status_text: '待打款',
            status: '0'
        },{
            order_time: '2018-6-15 13:50',
            money: '100',
            receivable: 'Admin',
            status_text: '打款失败',
            status: '1',
            error: '账户不正确',
        },{
            order_time: '2018-6-15 13:50',
            money: '100',
            receivable: 'Admin',
            status_text: '已打款',
            status: '2'
        }]
    }
})