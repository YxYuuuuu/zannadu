(function () {
    //登录
    var oLoginaccount = document.getElementById("loginaccount");
    var oLoginpsd = document.getElementById("loginpsd");
    var oBtnLogin = document.getElementById("btn-login");

    //点击登录时
    oBtnLogin.onclick = function () {
        var user = {
            newusername: oLoginaccount.value,
            password: oLoginpsd.value
        };
        function login(key, real, response) {
            var users = JSON.parse(localStorage[key]);
            for(var i = 0; i < users.length; i++) {
                if (!user.newusername || !user.password) {
                    response(0);
                }
                else if ((users[i].newusername == real.newusername) && (users[i].password == real.password)) {
                    response(200, user);
                }
                else {
                    response(2);
                }
            }
        }
        login("users", user, function (status) {
            switch (status) {
                case 0: {
                    alert("请输入账号或密码！");
                } break;
                case 2: {
                    alert("账号或密码错误，请重新输入！");
                } break;
                case 200: {
                    alert("恭喜您，登陆成功！");
                    sessionStorage.setItem("loginUser", JSON.stringify(user));
                    location.href = "index.html";
                } break;
            }
        });
    };

    backIndex(1);
})();