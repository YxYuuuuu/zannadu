(function () {
    var oNewsWrap  = document.getElementById("newsWrap");
    oNewsWrap.innerHTML = plusString("news").join("");

    var btnToTop = $.get("#btn-totop");
    ToTop(btnToTop,4000, 100, 3442) ;
    //设置回到顶部
    new HBRToTop({
        "element": btnToTop
    });
    backIndex(1);

})();