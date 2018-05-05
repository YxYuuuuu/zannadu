;(function (window) {
    var HBRToTop = function (options) {
        //设置默认参数
        this.config = {
            "element": "",//目标元素
            "duration": 500,//持续时间
            "pageScroll": function () {},//页面滚动时回调
            "complete": function () {}//回到顶部后回调
        };
        //拓展默认参数
        options && $.extend(this.config, options);
        //记录当前偏移
        this.offset = 0;
        //添加滚动事件
        //.bind(this)绑定this对象
        $.addEvent(window, "scroll", this.pageScroll.bind(this));
        //添加点击事件
        $.addEvent(this.config.element, "click", this.clickBtn.bind(this));
    };
    HBRToTop.prototype = {
        pageScroll: function () {
            var _config = this.config;
            this.offset = pageYOffset;
            //执行回调函数
            _config.pageScroll && _config.pageScroll(this.offset);
        },
        clickBtn: function () {

            var _duration =  this.config.duration;
            var _offset = this.offset;
            var _interval = 15;
            var _frames = _duration / _interval;
            var _speed = Math.ceil(_offset / _frames);

            var t = setInterval(function () {
                //更新 _offset
                _offset = this.offset;
                if (_offset > 0){
                    document.body.scrollTop = document.documentElement.scrollTop = _offset - _speed;
                }else{
                    clearInterval(t);
                    //触发回调函数
                    var _configs = this.configs;
                    _configs.complete && _configs.complete();
                    //更新scrollTop
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

            }.bind(this), _interval);












        }
    };
    window.HBRToTop = HBRToTop;
})(window);