//二级菜单
var siteBox = $.get(".siteBox"),
    submenuIdx   = $.get(".continent");
for(var i = 0, len = submenuIdx.length; i < len; i++) {
    submenuIdx[i].dataset.submenuidx = i;
    $.addEvent(submenuIdx[i], "mouseenter", function () {
        // 获取点击菜单下标
        var idx = this.dataset["submenuidx"];
        for(var j = 0, length = submenuIdx.length; j < length; j++) {
            if(submenuIdx[j].classList.contains("changecolor")) {
                submenuIdx[j].classList.remove("changecolor");
                siteBox[j].classList.remove("on");
                break;
            }
        }
        // 修改选中菜单项的样式
        this.classList.add("changecolor");
        // 显示对应的内容
        siteBox[idx].classList.add("on");
    });   //固定导航、固定回到顶部
    var oNav  = document.getElementById("nav");//获取到导航栏id
    //插入图片
    oNav.insertAdjacentHTML("afterbegin", "<img src='../public/images/common/bird.png' id='hidelogo'>");
    //取到注册登录
    var registerLogin = $.get("#register-login");
    //插入搜索框
    registerLogin.insertAdjacentHTML("beforebegin", " <form id='hide-searchbox'><input type='text' placeholder='目的地/酒店/游轮' id='hide-search'><span></span></form>");
}
