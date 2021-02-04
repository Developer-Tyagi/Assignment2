<template>
  <q-page class="container bg-background   ">
    <br />
    <div class=" row justify-between q-mx-xl ">
      <div class=" bg-transparent col-1 q-ml-xl ">
        <q-img src="~assets/insideLogo.png" />
      </div>
      <div class="q-ma-lg">
        <q-img
          src="~assets/LogIn-Logout Icon.svg"
          style="height:24px;width:24px;"
        />
      </div>
    </div>
    <div class=" row   q-ml-xs q-mr-xl">
      <div class=" col-8"></div>
      <div class=" my-font text-bold col-4">Change Password</div>
    </div>
    <br />
    <div class="flex row" style="height:54%;width:90%;margin-left:8%;">
      <div class="bg-grey col-7"></div>
      <div class="col-5">
        <div class="   q-mx-xl full-height " style="border:1px solid #dddddd;">
          <center>
            <div class=" my-font text-uppercase text-bold text-black q-mt-xl">
              Choose Your Password
            </div>
          </center>
          <div class=" my-font  q-mx-xl q-mt-lg">
            Password
          </div>
          <q-input
            class="q-mx-xl"
            style="border:1px solid #DDDDDD;"
            filled
            v-model="password.password"
          />
          <div class="my-font q-mx-xl q-mt-lg">
            Confirm Password
          </div>
          <q-input
            class="q-mx-xl"
            style="border:1px solid #DDDDDD;"
            filled
            v-model="password.confirm"
          />
          <q-separator class="q-mt-lg" />
          <center>
            <q-btn
              style="width:30%"
              color="primary"
              label="Submit"
              class="q-my-md"
              @click="onClick"
            />
          </center>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'forgotPassword',
  data() {
    return {
      password: { password: '', confirm: '' }
    };
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 100%;
  width: 100%;
  height: 100vh;
}

.my-font {
  font-family: 'Lato';
}
</style>
