<template>
  <q-page class="container bg-background">
    <div class="flex row q-pa-xl justify-between">
      <div class="bg-grey col-7"></div>
      <div class="col-4">
        <div class="full-height" style="border: 1px solid #dddddd">
          <center>
            <div class="my-font text-uppercase text-bold text-black q-mt-xl">
              Choose Your Password
            </div>
          </center>
          <div class="my-font q-mx-xl q-mt-lg">Password</div>
          <q-input
            type="password"
            class="q-mx-xl"
            style="border: 1px solid #dddddd"
            filled
            v-model="password.password"
          />
          <div class="my-font q-mx-xl q-mt-lg">Confirm Password</div>
          <q-input
            type="password"
            class="q-mx-xl"
            style="border: 1px solid #dddddd"
            filled
            v-model="password.confirm"
          />
          <q-separator class="q-mt-lg" />
          <center>
            <q-btn
              style="width: 30%"
              color="primary"
              label="Submit"
              class="q-my-md"
              @click="onSubmitPassword"
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
  },
  methods: {
    onSubmitPassword() {
      if (
        this.password.password &&
        this.password.password === this.password.confirm
      ) {
        this.$router.push('/login');
      }
    }
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
