module.exports = {
    is_login:false,
    countDownTime:function(){
        var D = new Date(),
		    lefttime = (24 * 60) - ((D.getHours() * 60) + D.getMinutes());
	    return '距离明天还有：' + Math.floor(lefttime / 60) + '小时' + lefttime % 60 + '分钟';
    }(),
    error:undefined,
    userdata:undefined,
    template:undefined,
    rootdir:'/home/fuqiang/dev/tuer.me'
};
