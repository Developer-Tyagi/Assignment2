<template>
  <q-header bordered class="bg-white">
    <q-toolbar class="row bg-white">
      <q-btn @click="onBackClick" flat>
        <img src="~assets/left-arrow.svg" alt="back-arrow" />
      </q-btn>
      <div class="text-uppercase text-bold text-black q-mx-auto">
        {{ $route.name }}
      </div>
      <q-btn class="no-visibility" flat>
        <img src="~assets/left-arrow.svg" alt="back-arrow" />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>
<script>
export default {
  name: 'CustomHeader',

  methods: {
    onBackClick() {
      this.$emit('backButton');
    }
  }
};
</script>
<style lang="scss" scoped>
.q-toolbar {
  padding: 0;
}

.q-btn {
  width: 50px;
}
.no-visibility {
  visibility: hidden;
}
</style>
