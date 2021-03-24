<template>
  <q-page>
    <!-- Note Dialog -->
     <q-dialog
      v-model="addNoteDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add New Note'"
          @closeDialog="addNoteDialog = false"
        />
        <q-card-section>
          <div class="mobile-container-page-without-search form-height">
           
            <q-input class="full-width" label="Take Notes here" v-model="note"/>
                </div>
          <q-btn
            @click="onSave"
            label="Save"
            color="primary"
            class="button-width-90"
            size="'xl'"
          />
</q-card-section>
      </q-card>
    </q-dialog>
    <div>
      <div class="actions-div">
        <q-separator vertical inset></q-separator>
        <q-btn @click="addNote" flat class ="q-ml-auto"><img src="~assets/add.svg"/></q-btn>
      </div>
      <div class="mobile-container-page">
        <div
          class="clients-list q-ma-sm "
          v-if="editSelectedClient.attributes.notes.length"
          >
          <div
            class="clients-list"
            v-for="note,index in editSelectedClient.attributes.notes"
          >
            <q-item-section>
              <div class="client-list-item">
                
                <div class="row">
                
                  {{ editSelectedClient.attributes.notes[index].addedAt | moment('DD/MM/YYYY')}} <br />
                  {{ editSelectedClient.attributes.notes[index].desc }}</br/>
              
                  
                 
                  <div class="row"></div>
                </div>
              </div>
            </q-item-section>
          </div>
        </div>
        <div v-else class="full-height full-width column">
          <div style="color: #666666" class="text-center q-mt-auto">
            You haven't added a Client yet.
          </div>
          <img
            src="~assets/add.svg"
            alt="add_icon"
            width="80px"
            height="80px"
            @click="addClient"
            class="q-mb-auto q-mx-auto q-mt-sm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import moment from 'moment';

export default {
  name: 'Clients',
   components: { CustomBar },
  data() {
    return {
     addNoteDialog:false,
     note:'',
    };
  },

  computed: {
    ...mapGetters(['clients', 'selectedClientId', 'editSelectedClient','notes'])
  },
 formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY','HH:MM');
      }
    },
  created() {
   
 this.getSingleClientDetails(this.selectedClientId);
 },
  methods: {
    ...mapActions(['getSingleClientDetails','addNotes']),
    ...mapMutations(['setSelectedClientId']),

  
  addNote(){
this.addNoteDialog = true;

  },
 async onSave(){
const payload = {
    id:this.selectedClientId,
  notesData:{
note:this.note
  }
 }
  await this.addNotes(payload)
  this.addNoteDialog=false;
  this.successMessage();
// this.addNotes(payload);
this.getSingleClientDetails(this.selectedClientId);
},
successMessage() {
      this.$q.notify({
        type: 'positive',
        message: `Client Info Updated Successfully!`,
        position: 'center'
      });
    },
  }
};
</script>
<style lang="scss">
.clients-list {
  background-color: #f4f4f4;
  border-bottom: 6px solid white;

  .client-list-item {
    padding: 20px;
    background-color: #f4f4f4;
    text-transform: capitalize;
    p {
      margin: 0 0 6px;
    }
  }
}
.form-height {
  height: calc(100vh - 145px);
  overflow: auto;
  margin: 10px;
}
</style>
