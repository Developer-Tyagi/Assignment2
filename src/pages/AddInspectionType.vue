<template>
    <q-page  style="padding-top: 0; height: 100vh">
    <q-header bordered class="bg-white">
      <q-toolbar class="row bg-white">
        <img
          src="~assets/left-arrow.svg"
          alt="back-arrow"
          @click="$router.push('/inspection-types')"
          style="margin: auto 0"
        />
        <div
          class="text-uppercase text-bold text-black q-mx-auto"
        >
          {{ $route.name }}
        </div>
        </q-input>
      </q-toolbar>
    </q-header>
    <div style="padding-top: 51px" class="full-height ">
        <div class="q-pa-md full-height column">
            <q-card class="inspection-card" v-for="(subtype,index) in inspectionType.subtypes">
                <q-input v-model="inspectionType.name" placeholder="Type of Inspection" v-if="index == 0"/>
                <q-input placeholder="Sub Type of Inspection" v-model="inspectionType.subtypes[index].name"/>
                <div class="slider-div">
                    <label>Duration(hr)</label>
                    <q-slider v-model="inspectionType.subtypes[index].duration"  label-always markers :min="0" :max="4" :step="0.5" />
                </div>
            </q-card>      

            <div @click="onAddSubTypeButtonClick">+ another subtype of inspection</div>    
            <q-btn
          label="save"
          color="primary"
          class="full-width q-mt-auto text-capitalize"
          @click="onAddInspection"
          size="'xl'"
        ></q-btn>  
        </div>
        
    </div>
    
  </q-page>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return{
            inspectionType : {
                name: '',
                subtypes: [
                     {
                    "name": "",
                    "duration": 1,
                    "unit": "hour"
                }
                ]
            }

        }
    },

    methods:{
        ...mapActions(),
        
        onAddSubTypeButtonClick(){
            this.inspectionType.subtypes.push({
                    "name": "",
                    "duration": 0,
                    "unit": "hour"
                })
        },

        onAddInspection(){

        }
    }
    
}
</script>
<style lang="scss" scoped>
.inspection-card{
    padding: 16px 24px;
    margin-top :20px ;

    &:first-child{
        margin-top: 0px;
    }

    .slider-div {
    height: 80px;
    margin-top: 10px;

    .q-slider{
        margin-top: 30px;
    }
}
}
</style>