<template>
    <q-page>
    <h5><q-icon name="menu" @click="openMenu"></q-icon>  Dashboard</h5>
    </q-page>   
</template>
<script>
export default {
    methods: {
    openMenu() {
         this.$router.push('/index');
     }
 }
}
</script>
<style>
img {
  display: block;
  margin-bottom:auto;
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
