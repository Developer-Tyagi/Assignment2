<template>
  <div class="row border-top">
    <div class="col-sm-12 md-hide lg-hide xl-hide footerDiv">
      © ClaimGuru<span class="yearLabel"> {{ CurrentYear }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileFooter',
  computed: {
    CurrentYear() {
      const d = new Date();
      let year = d.getFullYear();
      return year;
    }
  }
};
</script>

<style lang="scss">
.footerDiv {
  margin: 18px 32px;
  font-weight: 400;
  color: #667085;
  font-size: 14px;
  background-color: white;
}
.border-top {
  border-top: 0px;
  @media (max-width: 1023px) {
    border-top: 1px solid #e5e5e5;
  }
}
</style>
