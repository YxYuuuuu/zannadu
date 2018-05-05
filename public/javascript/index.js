(function () {
    //获取装图片的大框imgs
    var oImgBox = document.getElementsByClassName("imgs")[0];
    //获取所有图片
    var oImgs = document.querySelectorAll(".img");
    //获取左边按钮
    var oPrev = document.querySelector(".prev");
    //获取右边按钮
    var oNext = document.querySelector(".next");
    //获取数据
    var model = new Model();
    var oContent = document.getElementById("carousel-content");
    var oIdots = document.querySelectorAll(".idot");
    var index = 0;
    var timer;
    //获取回到顶部按钮
    var btnToTop = $.get("#btn-totop");
    //播放视频的按钮
    var videoPlay = $.get("#video-play");
    var videoBox = $.get("#different-zanadu-video");
    var videoSee = $.get("#video-see");

    videoPlay.onclick = function () {
        videoBox.style.display = "block";
        videoSee.play();
        document.body.style.overflow = 'hidden'
    };
    videoBox.onclick = function () {
        videoBox.style.display = 'none';
        videoSee.pause();
        document.body.style.overflow = 'auto';
    };

    loadingImgs(model.imgNames, oImgs);

    //添加点击事件
    oPrev.addEventListener("click", function () {
        prev();
    }, false);
    function prev () {
        //如果当前正在做切换效果，则点击无效
        if(sessionStorage.getItem("isAnimating")) {
            return;
        }
        index -= 1;
        if(index< 0){
            index=4;
        }
        moveImg(oImgs,index);
        changeIdots(oIdots, index);
    }
    oNext.addEventListener("click", function () {
        next();
    }, false);
    function next() {
        if(sessionStorage.getItem("isAnimating")) {
            return;
        }
        index = parseInt(index) + 1;
        if(index> 4){
            index=0;
        }
        moveImg(oImgs,index);
        changeIdots(oIdots, index);
    }
    function autoPlay() {
        timer = setInterval(function () {
            next();
        }, 3000)
    }
    autoPlay();
    function stop() {
        clearInterval(timer);
    }
    oContent.onmouseover = stop;
    oContent.onmouseleave = autoPlay;
    //点击小圆点
    for (var i = 0, len = oIdots.length; i < len; i++){
        oIdots[i].addEventListener("click", function () {
            var tarIdx = this.dataset["idx"];
            index = tarIdx;
            moveImg(oImgs,index);
            changeIdots(oIdots, index);
        }, false);
    }
    //搜索框
    var oIpt = document.getElementById("hotelipt");
    var oDate = document.getElementsByClassName("date");
    oIpt.onclick = function () {
       for(var i = 0, len = oDate.length; i < len; i++){
           oDate[i].classList.remove("popup");
       }
    };

    ToTop(btnToTop, 430, 1050, 6842);

    //第一版块
    var oProductContent  = document.getElementById("product-content");
    oProductContent.innerHTML = plusString("products").join("");
    //第二板块
    var oJourneyContent  = document.getElementById("journey-content");
    oJourneyContent.innerHTML = plusString("journeys").join("");
    //第三板块
    var oOverseaContent  = document.getElementById("oversea-content");
    oOverseaContent.innerHTML = plusString("oversea").join("");
    //第四板块
    var oVillasContent  = document.getElementById("villas-content");
    oVillasContent.innerHTML = plusString("villas").join("");
    //第五板块
    var oCruisesContent  = document.getElementById("cruises-content");
    oCruisesContent.innerHTML = plusString("cruises").join("");
    //第六版块
    var oVacationContent = document.getElementById("vacation-content");
    oVacationContent.innerHTML = plusString("vacation").join("");
    //第七板块
    var oHotelContent = document.getElementById("Hotel-content");
    oHotelContent.innerHTML = plusString("hotel").join("");
    //第八板块
    var oMagazineContent = document.getElementById("magazine-content");
    oMagazineContent.innerHTML = plusString("magazine").join("");

    //设置回到顶部
    new HBRToTop({
        "element": btnToTop
    });
})();
