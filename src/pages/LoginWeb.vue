<template>
  <q-page class="container bg-login full-width">
    <div class="bg-prev q-pa-lg" style="height: 100vh">
      <div class="flex" style="height: 50vh">
        <q-img
          src="~assets/logo.png"
          style="height: 85px; width: 84px; margin-top: 25%; margin-left: 40%"
        />
        <q-img
          src="~assets/CG_Text_White.png"
          style="height: 80px; width: 170px; margin-top: -20%; margin-left: 31%"
        />
      </div>
      <div class="column" style="height: 40vh; margin-top: -100px">
        <div style="padding: 50px">
          <q-input
            dark
            text-color="white"
            label-color="white"
            color="white"
            v-model="login.email"
            label="Username"
          >
            <template v-slot:prepend>
              <q-icon name="person_outline" color="white" />
            </template>
          </q-input>

          <q-input
            dark
            label-color="white"
            color="white"
            style="border-bottom"
            v-model="login.password"
            label="Password"
            type="password"
          >
            <template v-slot:prepend>
              <q-icon name="lock_outline" color="white" />
            </template>
          </q-input>

          <q-btn
            color="#f05a26"
            label="Login"
            class="demo full-width q-my-md"
            @click="onUserLogin"
          />
          <a href style="color: white; text-decoration: none"
            >Forgot Password</a
          >
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      login: { password: '', email: '' }
    };
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 100%;
  width: 100%;
}

.bg-prev {
  width: 35%;
  background: #f05a26 0% 0% no-repeat padding-box;

  margin-right: 10%;
  margin-left: auto;
  //height: 757px;
}
.demo {
  border: 3px solid white;
}

@media screen and (max-width: 480px) {
  .bg-prev {
    width: 100%;
    background: #f05a26 0% 0% no-repeat padding-box;

    margin-right: 0;
    margin-left: 0;
  }
}
</style>
