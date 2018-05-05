(function () {
    var btnToTop = $.get("#btn-totop");
    //固定导航、固定回到顶部
    var oNav  = document.getElementById("nav");//获取到导航栏id
    //插入图片
    oNav.insertAdjacentHTML("afterbegin", "<img src='../public/images/common/bird.png' id='hidelogo'>");
    //取到注册登录
    var registerLogin = $.get("#register-login");
    var oRecommendList = document.getElementById("recommendList");
    var productIdots = $.get(".products-idot");
    var index = 0;
    var leftArrow = $.get("#recommendLeftArrow");
    var rightArrow = $.get("#recommendRightArrow");

    //插入搜索框
    registerLogin.insertAdjacentHTML("beforebegin", " <form id='hide-searchbox'><input type='text' placeholder='目的地/酒店/游轮' id='hide-search'><span></span></form>");
    backIndex(1);
    oRecommendList.innerHTML = plusString("recommend").join("");

    $.addEvent(rightArrow, "click", function () {
        if(sessionStorage.getItem("isAnimating")) {
            return;
        }
        changeImgs(-1030, oRecommendList, -6000 );
        if(oRecommendList.offsetLeft < -4000) {
            rightArrow.classList.add("hidden");
        }else if (oRecommendList.offsetLeft < 1){
            leftArrow.classList.remove("hidden");
        }
        if(index == 5) {
            index = 0;
        }else {
            index++;
        }
        changeIdots(productIdots, index);
    });
    leftArrow.classList.add("hidden");
    $.addEvent(leftArrow, "click", function () {
        if(sessionStorage.getItem("isAnimating")) {
            return;
        }
        changeImgs(1030, oRecommendList, -5000 );
        if(oRecommendList.offsetLeft > -5000) {
            rightArrow.classList.remove("hidden");
        }
        if(oRecommendList.offsetLeft > -2000){
            leftArrow.classList.add("hidden");
        }
        if(index == 0) {
            index = 5;
        }else {
            index--;
        }
        //console.log(productIdots);
        changeIdots(productIdots, index);
    });
    for(var i = 0, len = productIdots.length; i < len; i++) {
        productIdots[i].addEventListener("click", function () {
            var desIdx = this.getAttribute("data-productIdx");
            var offset = -(desIdx - index) * 1030;
            if(sessionStorage.getItem("Animating") || desIdx == index) {
                return;
            }
            changeImgs(offset, oRecommendList);
            index = desIdx;
            changeIdots(productIdots, index);
        }, false);
    }
    ToTop(btnToTop,170, 1050, 2942) ;

    //设置回到顶部
    new HBRToTop({
        "element": btnToTop
    });
})();