<template>
  <q-page class="window-height bg-background full-width   ">
    <br />
    <!-- This Style is needed for inner div-->
    <div class=" q-pa-xs" style="height:60%;width:90%;">
      <div class=" full-width">
        <div class=" my-font text-bold row q-my-lg q-mx-xl">
          My Payment
        </div>
      </div>
      <div class="row  full-width full-height">
        <div class=" col-3 q-mx-xl   full-height ">
          <q-card class=" row  q-mt-xs  justify-between " flat bordered>
            <div class=" full-height col-2 q-px-lg q-py-md text-justify">
              <div class="  q-px-xs q-pt-xs text-weight-light ">
                17/12/2020
              </div>
              <div class=" text-primary q-px-xs q-pt-xs" style="width:90px;">
                View Invoice
              </div>
            </div>
            <div class="  col-4 ">
              <div class=" column text-h6 ext-weight-bold q-pr-xl q-pt-md">
                $99.00
              </div>
            </div>
          </q-card>
          <q-card class="  row q-mt-lg justify-between" flat bordered>
            <div class="  col-4 q-px-lg q-py-md full-height ">
              <div class="  q-px-xs q-pt-xs text-weight-light ">
                17/12/2020
              </div>
              <div
                class=" row text-primary q-px-xs q-pt-xs"
                style="width:90px;"
              >
                View Invoice
              </div>
            </div>
            <div class=" col-4   ">
              <div class=" text-h6 ext-weight-bold q-pr-xl  q-pt-md ">
                $99.00
              </div>
            </div>
          </q-card>
        </div>
        <q-separator vertical />
        <div class="  col-6  q-ml-xl   ">
          <!-- This is for right empt y division! there is no data shown in the wireframes -->
          <q-card class="full-width full-height" flat bordered> </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'Payment',
  data() {
    return {};
  }
};
</script>
