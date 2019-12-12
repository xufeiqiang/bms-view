<template>
  <div class="login_box">
    <h1 style="margin: 0;">BMS管理系统</h1>
    <div class="w3ls-login box">
      <!--<img src="../images/logo.png" alt="logo_img" />-->
      <!-- form starts here -->
      <form>
        <div class="agile-field-txt">
          <input type="text" name="email" v-model="account.username" placeholder="账号" required=""/>
        </div>
        <div class="agile-field-txt">
          <input type="password" name="password" v-model="account.password" placeholder="密码" required="" id="myInput"/>
          <div class="agile_label">
            <input id="check3" name="check3" type="checkbox" value="show password">
            <label class="check" for="check3">记住我</label>
          </div>
        </div>
        <div class="w3ls-bot">
          <input type="submit" value="登录" @click="handleLogin">
        </div>
      </form>
    </div>
  </div>

</template>

<script>
  import API from "../api/api_user";


  export default{
    data(){
      return {
        account: {
          username: "admin",
          pwd: "123456"
        }
      }
    },
    methods: {
      handleLogin(){
        debugger;
        this.$router.push({path: "/dashboard"});
        let that = this;
        let loginParams = new FormData();
        loginParams.append('client_id', 'app');
        loginParams.append('client_secret', '123456');
        loginParams.append('grant_type', 'password');
        loginParams.append('username', this.account.username);
        loginParams.append('password', this.account.pwd);
        API.login(loginParams).then(
          function (result) {
            that.loading = false;
            if (result) {
              localStorage.setItem("access-token", "bearer " + result.access_token);
              console.log(result.router)
              localStorage.setItem("menus", JSON.stringify(result.router));
              localStorage.setItem("perms", JSON.stringify(result.perms));
              that.$router.push({path: "/dashboard"});
            } else {
              that.$message.error({
                showClose: true,
                message: result.msg || "登录失败",
                duration: 2000
              });
            }
          },
          function (err) {
            that.loading = false;
            that.$message.error({
              showClose: true,
              message: err.toString(),
              duration: 2000
            });
          }
        ).catch(function (error) {
          that.loading = false;
          console.log(error);
          that.$message.error({
            showClose: true,
            message: "请求出现异常",
            duration: 2000
          });
        });
      }
    }

  }

</script>

<style>
  @import "../css/style.css";
</style>
