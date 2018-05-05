//立即执行函数，为了保护函数里的变量不被其他污染
(function (window) {
    var DOMoperations = function () {
    };
    DOMoperations.prototype = {
        //方法放在这里
        //添加事件
        addEvent: function (element, type, callback) {
            //IE10
            if (element.attachEvent) {
                element.attachEvent('on' + type, callback);
            } else {
                element.addEventListener(type, callback, false);
            }
        },
        //获取非行间样式
        getStyle: function (element, attr) {
            // 兼容IE
            if (element.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(element, null)[attr];
            }
        },
        //添加其他对象的属性
        extend: function (oldObj, newObj) {
            for (var key in newObj) {
                oldObj[key] = newObj[key];
            }
            return oldObj;
        },
        //获取元素
        get: function $(Selector) {
        // 异常处理
        if (typeof Selector != 'string' || Selector == '' || /\s/.test(Selector) == true) {
            return null;
        }
        if (/^#/.test(Selector) == true) {
            return document.getElementById(Selector.slice(1));
        }
        if (/^\./.test(Selector) == true) {
            return document.getElementsByClassName(Selector.slice(1));
        }
        return document.getElementsByTagName(Selector);
    },
        //获取传的信息
        convertSearch: function(searchStr) {
            // 异常处理
            if (!searchStr) {
                return null;
            }else {
                let str = searchStr.slice(1);
                let strArr = str.split('&');
                let obj = {};
                strArr.forEach(item => {
                    let arr = item.split('=');
                    let key = decodeURI(arr[0]);
                    let val = decodeURI(arr[1]);
                    obj[key] = val;
                });
                return obj;
            }
        },
};
    window.$ = new DOMoperations();//让window可以直接用 $
    //每次调用$都是访问实例DOMoperations()，所以只运行
})(window);

