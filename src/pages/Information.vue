<template>
  <q-page>
    <div class="q-pa-md height-without-header">
      <q-card
        class="q-ma-xl q-pa-xl bg-grey-3 "
        style="height: calc(100vh - 220px)"
      >
        <div class=" column text-center">
          <div>
            <q-icon name="check_circle_outline" color="green" size="300px" />
          </div>
          <div class="text-bold text-h4">Check Your Email For Confirmation</div>
          <div class="q-my-md  text-h5 heading-light">
            An Email has seen send to with a link to activate you account
          </div>
          <div class="  text-h5 heading-light">
            Please check your spam or junk mail if you have not received it
            within the next 5 min..
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<style lang="scss">
tr:nth-child(even) {
  background-color: $grey-3 !important;
}
</style>
