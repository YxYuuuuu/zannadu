function loadingImgs(imgsNames, oImgs) {
    var len     = oImgs.length,
        imgPath = "",
        idx     = 0;
    //循坏添加图片
    for (var i = 0; i < len; i++){
        idx = oImgs[i].getAttribute("data-idx");
        imgPath = imgsNames[idx];
        oImgs[i].style.cssText = "background: url('" + imgPath + "') no-repeat center center";
    }
}
//淡入淡出轮播图切换图片
function moveImg(oImgs,index) {
    sessionStorage.setItem("isAnimating", true);
    for(var i=0;i<oImgs.length;i++){
        if (oImgs[i].classList.contains("show")){
            oImgs[i].classList.remove("show");
        }
    }
    oImgs[index].classList.add("show");
    var n = 1;
    var t = setInterval(function () {
        if (n == 0){
            clearInterval(t);
            sessionStorage.removeItem("isAnimating");
        }else{
            n--;
        }
    },1000);//浪费2s

}
//改变小圆点
function changeIdots(oIdots, index) {
    for (var i = 0, len = oIdots.length; i < len; i++){
        if (oIdots[i].classList.contains("active")){
            oIdots[i].classList.remove("active");
        }
    }
    oIdots[index].classList.add("active");
}
//字符串
var model = new Model();
function plusString(key) {
    var arr = [];
    model.get(key).forEach(function (dataObj) {
        var flag = dataObj.flag ? "<div class='flag'><p>" + dataObj.line1 + "</p><p>" + dataObj.line2 + "</p></div>" : '';
        var mask = dataObj.mask ? "<div class='mask'><div class='recommend'><p><span>100</span>%</p><p>会员推荐</p></div></div>" : '';
        var sale = dataObj.sale ? "<div class='sale'><div class='saleText'><p>优惠<span>" + dataObj.sale + "</span>%</p></div></div>" : '';
        var tips = dataObj.tips ? "<div class='tip'>" + dataObj.tips + "</div>" : '';
        var src = dataObj.src ? dataObj.src : '';
        //存放小图标
        var icons1 = '';
        dataObj.icons.forEach(function (icon) {
            icons1  += "<span>" + "<img src='" + icon + "'>" + "</span>";
        });
        var icons2 = '';
        dataObj.hideicons.forEach(function (icon) {
            icons2 += "<span>" + "<img src='" + icon + "'>" + "</span>"
        });
        var titles = '';
        dataObj.titles.forEach(function (title) {
            titles += "<p>" + title + "</p>"
        });
        var hidetitles = '';
        dataObj.hidetitles.forEach(function (hidetitle) {
            hidetitles += "<p>" + hidetitle + "</p>"
        });
        var str =
            "<section class='item'>" +
            "<a href = " + src + ">" +
            "<div class='corner corner1'></div>" +
            "<div class='corner corner2'></div>" + flag + sale +
            "<img src='" + dataObj.img + "' alt='' width='100%'>" +
            "<div class='details'>" + titles +
            "<div class='author'>" +
            "<span>" + dataObj.year + "</span>" +
            "<span>" + dataObj.name + "</span>" +
            "</div>" +
            "<div class='icons'>" + icons1 +
            "</div>" +
            "</div>" +
            "<div class='hide-box'>" + mask + tips +
            "<div class='hide-details'>" + hidetitles +
            "<div class='author'>" +
            "<span>" + dataObj.year + "</span>" +
            "<span>" + dataObj.name + "</span>" +
            "</div>" +
            "<div class='hide-icon'>" + icons2 +
            "</div>" +
            "</div>" +
            "</div>" +
            "</a>" +
            "</section>";
        arr.push(str);
    });
    return arr;
 }
//验证账号存在否
function judgeAccountIsExists(key, newusername) {
    // 记录用户是否存在
    var isExists = false;
    var users    = JSON.parse(localStorage.getItem(key));
    if(users) {
        for(var i = 0; i < users.length; i++) {
            if(users[i].newusername == newusername) {
                isExists = true;
                break;
            }
        }
    }
    return isExists;
}
//注册用户
function registerUsers(key, user, callback) {
    if(localStorage[key]) {
        users = JSON.parse(localStorage[key]);
    }else {
        users = [];
    }
    // 添加用户
    users.push(user);
    // 更新本地数据
    localStorage[key] = JSON.stringify(users);
    // 数据存储成功之后调用回调函数
    callback && callback();
}
//点击logo回到主页
function backIndex(value) {
   var headLogo = $.get("#header-logo");
   switch (value){
       case 0:{
           headLogo.onclick = function () {
               location.href = "../index.html";
           }
       }break;
       case 1:{
           headLogo.onclick = function () {
               location.href = "index.html";
           }
       }break;
   }

}
//切换效果
function changeType(box, index, className) {
    for(var i=0;i < box.length;i++){
        if (box[i].classList.contains(className)){
            box[i].classList.remove(className);
        }
    }
    box[index].classList.add(className);
}
//轴轮播图图片切换
function changeImgs(offset, box, min) {
    sessionStorage.removeItem("isAnimating");
    // 设置滚动帧动画
    var duration  = 800,
        interval  = 15,
        frames    = duration / interval,
        speed     = Math.ceil(offset / frames),
        curOffset = box.offsetLeft;
        tarOffset = curOffset + offset;
    sessionStorage.setItem("isAnimating", true);
    var t = setInterval(function () {
        curOffset = box.offsetLeft;
        if((offset < 0 && curOffset > tarOffset) ||(offset > 0 && curOffset < tarOffset)) {
            box.style.left = curOffset + speed + "px";
        }
        else {
            clearInterval(t);
            sessionStorage.removeItem("isAnimating");
            box.style.left = tarOffset + "px";
            // 边界值处理
            if(box.offsetLeft < min) {
                box.style.left = "0px";
            }else if(box.offsetLeft >0) {
               box.style.left = min + 'px';
            }
        }
    }, interval);
}
//固定回到顶部按钮和导航栏
function ToTop(btn, navValue, firstValue, lastValue) {
    window.onscroll = function () {
        var topScroll = pageYOffset;
        var hideSearchBox = $.get("#hide-searchbox");
        var destination = $.get("#submenu-list-destination");
        var route = $.get("#submenu-list-route");
        var oNav  = document.getElementById("nav");
        var hideLogo = $.get("#hidelogo");
        //滚动的距离,距离顶部的距离
        if (topScroll > navValue) {
            hideLogo.style.display = 'block';
            hideSearchBox.style.display = 'block';
            oNav.style.position = 'fixed';
            oNav.style.top = '0';
            oNav.style.height = "80px";
            destination.style.top = '65px';
            route.style.top = '65px';
        } else {
            oNav.style.position = 'static';
            oNav.style.height = "50px";
            hideLogo.style.display = 'none';
            hideSearchBox.style.display = 'none';
            destination.style.top = '100%';
            route.style.top = '100%';
        }
        if (topScroll > firstValue){
            btn.classList.remove("back-to-top-absolute");
            btn.classList.add("back-to-top-fixed");
        } else {
            btn.classList.add("back-to-top-absolute");
            btn.classList.remove("back-to-top-fixed");
        }
        if (topScroll > lastValue){
            btn.classList.add("back-to-top-absolute");
            btn.classList.remove("back-to-top-fixed");
        }
    }
}

