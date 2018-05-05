(function () {
    var index = 0;
    var bigVideo = $.get(".bigVideo");
    var smallVideo = $.get(".smallvideo");
    var changeImg = $.get(".focusImgs")[0];
    var focusBtn = $.get(".focusBtn");
    var leftArrow = $.get("#leftArrow");
    var rightArrow = $.get("#rightArrow");
    var swiperWrapper = $.get("#swiper-wrapper");
    var btnToTop = $.get("#btn-totop");

    for (var i = 0, len = smallVideo.length; i < len; i++){
        smallVideo[i].addEventListener("click", function () {
            var tarIdx = this.getAttribute("data-videonum");
            index = tarIdx;
            changeType(bigVideo, index, "showVideo");
            changeType(smallVideo, index, "blueBorder");
        }, false);
    }
    for (var i = 0, len = focusBtn.length; i < len; i++){
        focusBtn[i].addEventListener("mouseover", function () {
            if(sessionStorage.getItem("isAnimating") || tarIdx == index) {
                return;
            }
            var tarIdx = this.getAttribute("data-imgIdx");
            var offset = -(tarIdx - index) * 1000;
            changeImgs(offset, changeImg, -3000);
            index = tarIdx;
            changeType(focusBtn, index, "changeOpcity");
        }, false)
    }
    //向前移动
    function fordnext(value) {
        if(sessionStorage.getItem("isAnimating")) {
            return;
        }
        if(index == value) {
            index = 0;
        }else {
            index++;
        }
        changeImgs(-1000, changeImg, -3000);
        changeType(focusBtn, index, "changeOpcity");
    }
    //向后移动
    function autoPlay() {
        timer = setInterval(function () {
            fordnext(3);
        }, 3000);

    }
    autoPlay();
    $.addEvent(rightArrow, "click", function () {
        if(sessionStorage.getItem("isAnimating")) {
            return;
        }
       changeImgs(-335, swiperWrapper, -3000 );
        if(swiperWrapper.offsetLeft < -1340) {
            rightArrow.classList.add("hidden");
        }else if (swiperWrapper.offsetLeft < 1){
            leftArrow.classList.remove("hidden");
        }
    });
    leftArrow.classList.add("hidden");
    $.addEvent(leftArrow, "click", function () {
        if(sessionStorage.getItem("isAnimating")) {
            return;
        }
        changeImgs(335, swiperWrapper, -3000 );
        if(swiperWrapper.offsetLeft > -2345) {
            rightArrow.classList.remove("hidden");
        }
        if(swiperWrapper.offsetLeft > -355){
            leftArrow.classList.add("hidden");
        }

    });
    ToTop(btnToTop,3000, 1050, 2392) ;
    //设置回到顶部
    new HBRToTop({
        "element": btnToTop
    });
    backIndex(0);
})();