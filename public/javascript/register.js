(function () {
    //注册
    var oRegisteraccount = document.getElementById("registeraccount");
    var oRegisterpsd = document.getElementById("registerpsd");
    var oBtnregister = document.getElementById("btn-register");

    //点击注册时
    oBtnregister.onclick = function () {
        var user = {
            newusername: oRegisteraccount.value,
            password: oRegisterpsd.value
        };
        if (!user.newusername || !user.password) {
            alert("请输入账号或密码！");
        }
        else if (judgeAccountIsExists("users", user.newusername)) {
            alert("用户已存在，请重新注册！");
        }
        else {
            registerUsers("users", user, function () {
                alert("恭喜您，注册成功！");
                sessionStorage.setItem("loginUser", JSON.stringify(user));
            });
        }
    };

    backIndex(1);

})();

