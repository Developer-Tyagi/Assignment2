<template>
  <q-page>
    <div
      :class="{
        'mobile-container-page-without-search': !$q.platform.is.iphone,
        'mobile-container-page': $q.platform.is.iphone
      }"
    >
      <div>
        <q-list>
          <q-item clickable>
            <q-item-section class="form-list">My Schedule</q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="'/inspection-types'">
            <q-item-section class="form-list">
              Type of Inspection
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section class="form-list">
              Prefered Max Distance of Travel
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section class="form-list"> Documents </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Settings'
};
</script>
<style lang="scss">
.form-list {
  color: #333333;
  font-weight: bold;
  font-size: 16px;
  margin: 5px 0;
}
</style>
