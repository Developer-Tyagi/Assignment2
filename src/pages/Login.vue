<template>
  <q-page>
    <div class="appimage">
      <img
        alt="Claimguru"
        src="~assets/app-icon2.png"
        align="center"
        width="150"
        height="150"
      />
    </div>
    <div class="userinput">
      <q-input v-model="username" label="Username">
        <template v-slot:prepend>
          <q-icon name="person" color="orange"></q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="text = ''"></q-icon>
        </template>
      </q-input>
    </div>
    <div class="userinput">
      <q-input v-model="userpwd" type="password" label="Password">
        <template v-slot:prepend>
          <q-icon name="enhanced_encryption" color="orange"></q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="text = ''"></q-icon>
        </template>
      </q-input>
      <div class="userinputbutton">
        <q-btn
          style="background: #d64d25; color: white"
          label="Login"
          class="full-width"
          @click="login"
        ></q-btn>
      </div>
      <div class="forgotbtn">
        <a href="" style="color:#d64d25">"Forgot Password"</a>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  methods: {
    login() {
      this.$router.push("/dashboard");
    }
  },
  data() {
    return {
      username: "",
      userpwd: ""
    };
  }
};
</script>
<style>
.appimage {
  position: relative;
  left: 30%;
}
.userinput {
  max-width: 70%;
  position: relative;
  left: 20%;
  margin-top: 30px;
}
.userinputbutton {
  position: relative;
  margin-top: 50px;
}
.forgotbtn {
  margin-top: 20px;
}
</style>
