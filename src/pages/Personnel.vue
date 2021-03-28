<template>
  <q-page>
    <!-- Company Personnel  Dialog Box for adding Info  -->
    <q-dialog
      v-model="addCompanyPersonnelDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="' Add Company Personnel'"
          @closeDialog="addCompanyPersonnelDailog = false"
        />

        <div class="mobile-container-page-without-search form-height">
          <q-form ref="addCompanyForm">
            <CompanyPersonnel :companyPersonnel="companyPersonnelPost" />
          </q-form>
        </div>

        <br />

        <q-btn
          @click="onSaveButtonClick"
          label="Save"
          color="primary"
          class="button-width-90"
          size="'xl'"
        ></q-btn>
      </q-card>
    </q-dialog>
    <!-- Company Personnel Dialog Box for Editing Info -->
    <q-dialog
      v-model="companyPersonnelDailog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="' Edit Company Personnel'"
          @closeDialog="companyPersonnelDailog = false"
        />

        <div class="mobile-container-page-without-search form-height">
          <q-form ref="companyForm">
            <CompanyPersonnel :companyPersonnel="companyPersonnel" />
          </q-form>
        </div>

        <br />

        <q-btn
          @click="onEditSaveButtonClick"
          label="Save"
          color="primary"
          class="button-width-90"
          size="'xl'"
        ></q-btn>
      </q-card>
    </q-dialog>
    <div class="actions-div">
      <q-separator vertical inset></q-separator>
      <q-btn @click="addCompanyPersonnelDailog = true" flat class="q-ml-auto"
        ><img src="~assets/add.svg"
      /></q-btn>
    </div>
    <div class="mobile-container-page ">
      <div class="q-pa-md">
        <div class="clients-list">
          <div
            class="clients-list q-pa-md"
            v-for="i in personnel.attributes.personnel.length"
          >
            <div class="row">
              <div class="form-heading">
                {{ personnel.attributes.personnel[i - 1].name }}
              </div>
              <q-icon
                @click="companyPersonnelDailog = true"
                class="q-my-auto"
                name="edit"
                color="primary"
                size="sm"
              />
            </div>
            <div>
              {{ personnel.attributes.personnel[i - 1].role }}
            </div>
            <div>
              Notes:
              {{ personnel.attributes.personnel[i - 1].note }}
            </div>
            <div>Fee - none</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import CompanyPersonnel from 'components/CompanyPersonnel';

import { validateDate } from '@utils/validation';
import { date } from 'quasar';

export default {
  components: { CustomBar, CompanyPersonnel },
  data() {
    return {
      //This Object is for Editing Existing Company Personnel
      companyPersonnel: {
        notes: '',
        endDate: '',
        startDate: '',
        buttonGroup: 'dollar',
        claimFeeRate: '',

        isFieldDisable: true,

        personnel: {
          id: '',
          role: ''
        },
        personParty: '',

        notes: '',

        filterRole: []
      },
      //This Object is for Adding new Company Personnel
      companyPersonnelPost: {
        notes: '',
        endDate: '',
        startDate: '',
        buttonGroup: 'dollar',
        claimFeeRate: '',
        isFieldDisable: true,
        personnel: {
          id: '',
          role: ''
        },
        personParty: '',
        notes: '',
        filterRole: []
      },
      companyPersonnelDailog: false,
      addCompanyPersonnelDailog: false
    };
  },
  computed: {
    ...mapGetters(['personnel', 'selectedClaimId', 'roleTypes', 'userRoles'])
  },
  created() {
    if (!this.selectedClaimId) {
      this.$router.push('/clients');
    }

    this.getRoles();
    this.getPersonnelInfo(this.selectedClaimId);
    this.companyPersonnel.startDate = this.companyPersonnelPost.startDate = this.companyPersonnelPost.endDate = this.companyPersonnel.endDate = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );
    let index = this.personnel.attributes.personnel.length;

    this.companyPersonnel.personnel.id = this.personnel.attributes.personnel[
      index - 1
    ].id;
    this.companyPersonnel.personnel.role = this.personnel.attributes.personnel[
      index - 1
    ].role;
    this.companyPersonnel.notes = this.personnel.attributes.personnel[
      index - 1
    ].note;
    this.companyPersonnel.personParty = this.personnel.attributes.personnel[
      index - 1
    ].name;
  },
  methods: {
    ...mapActions([
      'getPersonnelInfo',
      'getAllUsers',
      'addCompanyPersonnel',
      'getRoles'
    ]),
    //This Function is for Adding new Company Personnel
    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.addCompanyForm.validate();
      if (success) {
        this.addCompanyPersonnelDailog = false;
        const payload = {
          id: this.selectedClaimId,
          companyData: {
            id: this.companyPersonnelPost.personnel.id,
            name: this.companyPersonnelPost.personParty,
            role: this.companyPersonnelPost.personnel.role,
            note: this.companyPersonnelPost.notes
          }
        };
        this.addCompanyPersonnel(payload);
        await this.getPersonnelInfo(this.selectedClaimId);
        this.successMessage();
        this.$router.push('/claim-details');
      }
    },
    //This Function is for Editing Existing Company Personnel
    async onEditSaveButtonClick() {
      let success = false;
      success = await this.$refs.companyForm.validate();
      if (success) {
        this.companyPersonnelDailog = false;
        const payload = {
          id: this.selectedClaimId,
          companyData: {
            id: this.companyPersonnel.personnel.id,
            name: this.companyPersonnel.personParty,
            role: this.companyPersonnel.personnel.role,
            note: this.companyPersonnel.notes
          }
        };
        await this.addCompanyPersonnel(payload);
        await this.getPersonnelInfo(this.selectedClaimId);
        this.successMessage();
        this.$router.push('/claim-details');
      }
    },
    validateDate,
    successMessage() {
      this.$q.notify({
        type: 'positive',
        message: `Company Personnel Info Updated Successfully!`,
        position: 'center'
      });
    }
  }
};
</script>
<style lang="scss">
.form-heading {
  color: #333333;
  font-weight: bold;
  font-size: 14px;
}
.clients-list {
  background-color: #f4f4f4;
  border-bottom: 6px solid white;

  .client-list-item {
    padding: 20px;
    background-color: #f4f4f4;
    text-transform: capitalize;
  }
}
.form-height {
  height: calc(100vh - 150px);
  overflow: auto;
  margin: 10px;
}
</style>
