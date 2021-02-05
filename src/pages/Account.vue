<template>
  <q-page class="container bg-background">
    <div class="row q-ma-xl" style="height: 75vh; width: 90%; margin: auto">
      <div class="flex wrap row q-ma-xl full-width">
        <q-card
          class="my-card q-ma-lg text"
          @click="onCardClick('manage-users')"
        >
          <div class="my-font q-ma-md text-bold">Manage Users</div>
        </q-card>
        <q-card class="my-card q-ma-lg" @click="onCardClick('profile')">
          <div class="my-font q-ma-md text-bold">My Profile / Credit Cards</div>
        </q-card>
        <q-card class="my-card q-ma-lg" @click="onCardClick()">
          <div class="my-font q-ma-md text-bold">Change Password</div>
        </q-card>
        <q-card class="my-card q-ma-lg" @click="onCardClick('my-plan')">
          <div class="my-font q-ma-md text-bold">My plan</div></q-card
        >
        <q-card class="my-card q-ma-lg" @click="onCardClick('payment')">
          <div class="my-font q-ma-md text-bold">My Payment</div>
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
  },
  methods: {
    onCardClick(route) {
      this.$router.push(`/${route}`);
    }
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
