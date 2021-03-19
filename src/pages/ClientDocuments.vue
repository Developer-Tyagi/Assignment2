<template>
  <q-page>
    <div class="height-without-header">
      <ul>
        <li>
          Folder 1
          <ul>
            <li>SubFile 1</li>
            <li>SubFile 2</li>
            <li>SubFile 3</li>
          </ul>
        </li>
        <li>
          Folder 2
          <ul>
            <li>SubFile 4</li>
            <li>SubFile 5</li>
            <li>SubFile 6</li>
          </ul>
        </li>
        <li>Main File 1</li>
        <li>Main File 2</li>
      </ul>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'ClientDocument',
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
