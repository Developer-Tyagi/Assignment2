<template>
  <q-page class="container bg-background   ">
    <br />
    <div class=" row justify-between q-mx-xl ">
      <div class=" bg-transparent col-1 q-ml-xl ">
        <q-img src="~assets/insideLogo.png" />
      </div>
      <div class=" q-mr-xl">
        <q-img
          src="~assets/LogIn-Logout Icon.svg"
          style="height:24px;width:24px;"
        />
      </div>
    </div>

    <div class=" row  q-ma-xl" style="height:75vh;width:90%;margin-left:10%;">
      <div class=" flex row q-ma-xl full-width" style="height:40%;">
        <q-card class="my-card q-ma-lg text">
          <div class="my-font q-ma-md text-bold ">Manage Users</div></q-card
        >
        <q-card class="my-card q-ma-lg "
          ><div class="my-font q-ma-md text-bold">
            My Profile / Credit Cards
          </div>
        </q-card>
        <q-card class="my-card q-ma-lg"
          ><div class="my-font q-ma-md text-bold">Change Password</div>
        </q-card>
      </div>
      <div class=" row full-width " style="height:50%;">
        <q-card class="my-card q-ma-lg">
          <div class="my-font q-ma-md text-bold">My plan</div></q-card
        >
        <q-card class="my-card q-ma-lg "
          ><div class="my-font  q-ma-md text-bold">My Payment</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Account',
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
  height: 110vh;
}
.my-card {
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 150px;
}
.my-font {
  font-family: 'Lato';
  font-size: 20px;
  color: #333333;
}
</style>
