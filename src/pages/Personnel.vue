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
    <div class="mobile-container-page">
      <ClaimDetail />
      <div class="q-pa-md">
        <div v-if="personnel.personnel">
          <div>
            <q-card
              class="q-pa-md q-ma-sm"
              v-for="(personnel, index) in personnel.personnel"
            >
              <div class="text-bold text-capitalize q-mt-xs row">
                <div class="col-10 ">
                  {{ personnel.name }}
                </div>
                <q-icon
                  @click="onEditButtonClick(index)"
                  class="q-my-auto col"
                  name="edit"
                  color="primary"
                  size="xs"
                />
                <q-icon
                  class="q-my-auto"
                  name="delete"
                  size="xs"
                  color="primary"
                  @click="onDelete(index)"
                />
              </div>

              <div class="row  q-mt-sm" v-if="personnel.role">
                <span class="heading-light col-3"> Role:</span>
                <span class="q-ml-lg col"> {{ personnel.role.value }}</span>
              </div>
              <div class="row  q-mt-sm" v-if="personnel.name">
                <span class="heading-light col-3"> Person Party:</span>
                <span class="q-ml-lg col"> {{ personnel.name }}</span>
              </div>
              <div class="row  q-mt-sm" v-if="personnel.fees">
                <span class="heading-light col-3"> Fee:</span>
                <span class="q-ml-lg col">
                  <div v-if="personnel.fees.type == 'dollar'">
                    {{ personnel ? '$' + personnel.fees.rate : '-' }}
                  </div>
                  <div v-else-if="personnel.fees.type == 'update'">
                    {{ personnel ? personnel.fees.rate + ' /hour' : '-' }}
                  </div>
                  <div v-else>
                    {{ personnel ? personnel.fees.rate + ' %' : '-' }}
                  </div>
                </span>
              </div>
              <div class="row  q-mt-sm" v-if="personnel.startDate">
                <span class="heading-light col-3"> Start Date:</span>
                <span class="q-ml-lg col">
                  {{ personnel.startDate | moment('MM/DD/YYYY') }}</span
                >
              </div>
              <div class="row  q-mt-sm" v-if="personnel.endDate">
                <span class="heading-light col-3"> End Date:</span>
                <span class="q-ml-lg col">
                  {{ personnel.endDate | moment('MM/DD/YYYY') }}</span
                >
              </div>
              <div class="row  q-mt-sm" v-if="personnel.note">
                <span class="heading-light col-3"> Note:</span>
                <span class="q-ml-lg col"> {{ personnel.note }}</span>
              </div>
            </q-card>
          </div>
        </div>

        <div v-else class="full-height full-width column">
          <div class=" column absolute-center q-mt-xl">
            <div style="color: #666666,align-items: center;margin-top:100px">
              You haven't added a Company Personnel yet.
            </div>
            <img
              class="q-mx-lg q-pt-sm"
              src="~assets/add.svg"
              alt="add_icon"
              width="130px"
              height="100px"
              @click="addCompanyPersonnelDailog = true"
            />
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
import ClaimDetail from 'components/ClaimDetail';
import { dateToSend } from '@utils/date';

import { validateDate } from '@utils/validation';
import { date } from 'quasar';

export default {
  components: { CustomBar, CompanyPersonnel, ClaimDetail },
  data() {
    return {
      personnelId: '',
      //This Object is for Editing Existing Company Personnel
      companyPersonnel: {
        notes: '',
        options: [],
        endDate: '',
        startDate: '',
        buttonGroup: 'dollar',
        claimFeeRate: '',
        isFieldDisable: true,
        personnel: {
          id: '',
          value: '',
          machineValue: ''
        },
        personParty: {
          id: '',
          name: ''
        },
        role: {
          machineValue: ''
        },
        notes: '',
        filterRole: []
      },

      //This Object is for Adding new Company Personnel
      companyPersonnelPost: {
        options: [],
        notes: '',
        endDate: '',
        startDate: '',
        buttonGroup: 'dollar',
        claimFeeRate: '',
        isFieldDisable: true,
        personnel: {
          id: '',
          role: '',
          value: '',
          machineValue: ''
        },
        personParty: {
          id: '',
          name: ''
        },
        role: {
          machineValue: ''
        },
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
  },
  methods: {
    ...mapActions([
      'getPersonnelInfo',
      'getAllUsers',
      'addCompanyPersonnel',
      'getRoles',
      'editPersonnel',
      'deleteClaimPersonnel'
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
            personnel: {
              personnelID: this.companyPersonnelPost.personParty.id,
              name: this.companyPersonnelPost.personParty.value,
              role: {
                value: this.companyPersonnelPost.personnel.value.name,
                machineValue: this.companyPersonnelPost.personnel.value
                  .machineValue
              },
              note: this.companyPersonnelPost.notes,
              fees: {
                type: this.companyPersonnelPost.buttonGroup,
                rate: this.companyPersonnelPost.claimFeeRate
                  ? this.companyPersonnelPost.claimFeeRate
                  : 0
              },
              startDate: dateToSend(this.companyPersonnelPost.startDate),
              endDate: dateToSend(this.companyPersonnelPost.endDate)
            }
          }
        };
        if (!this.companyPersonnelPost.personParty.id) {
          delete payload.companyData.personnel;
        }
        await this.addCompanyPersonnel(payload);
        await this.getPersonnelInfo(this.selectedClaimId);
        this.companyPersonnelPost.personParty.id = '';
        this.companyPersonnelPost.personParty.value = '';
        this.companyPersonnelPost.personnel.id = '';
        this.companyPersonnelPost.personnel.value = '';
        this.companyPersonnelPost.personnel.machineValue = '';
        this.companyPersonnelPost.notes = '';
        this.companyPersonnelPost.buttonGroup = '';
        this.companyPersonnelPost.claimFeeRate = '';
        this.companyPersonnel.startDate = this.companyPersonnelPost.startDate = this.companyPersonnelPost.endDate = this.companyPersonnel.endDate = date.formatDate(
          Date.now(),
          'MM/DD/YYYY'
        );
      }
    },
    onEditButtonClick(index) {
      this.companyPersonnelDailog = true;
      this.companyPersonnel.isFieldDisable = false;
      this.personnelId = this.personnel.personnel[index].id;

      this.companyPersonnel.personnel.id = this.personnel.personnel[index].id;

      this.companyPersonnel.personnel.value = this.personnel.personnel[
        index
      ].role.value;
      this.companyPersonnel.personnel.machineValue = this.personnel.personnel[
        index
      ].role.machineValue;
      this.companyPersonnel.notes = this.personnel.personnel[index].note;
      this.companyPersonnel.personParty.id = this.personnel.personnel[
        index
      ].personnelID;
      this.companyPersonnel.personParty.name = this.personnel.personnel[
        index
      ].name;
      this.companyPersonnel.buttonGroup = this.personnel.personnel[
        index
      ].fees.type;
      this.companyPersonnel.claimFeeRate = this.personnel.personnel[
        index
      ].fees.rate;
    },
    async onDelete(index) {
      const personnel = {
        claimID: this.selectedClaimId,
        personnelID: this.personnel.personnel[index].id
      };
      await this.deleteClaimPersonnel(personnel);
      await this.getPersonnelInfo(this.selectedClaimId);
    },
    //This Function is for Editing Existing Company Personnel
    async onEditSaveButtonClick() {
      let success = false;
      success = await this.$refs.companyForm.validate();

      if (success) {
        this.companyPersonnelDailog = false;

        const payload = {
          id: this.selectedClaimId,
          personnelId: this.personnelId,
          companyData: {
            personnel: {
              personnelID: this.companyPersonnel.personParty.id,
              name: this.companyPersonnel.personParty.value,
              role: {
                value: this.companyPersonnel.personnel.value.name,
                machineValue: this.companyPersonnel.personnel.value.machineValue
              },
              note: this.companyPersonnel.notes,
              fees: {
                type: this.companyPersonnel.buttonGroup,
                rate: this.companyPersonnel.claimFeeRate
                  ? this.companyPersonnel.claimFeeRate
                  : 0
              },
              startDate: dateToSend(this.companyPersonnel.startDate),
              endDate: dateToSend(this.companyPersonnel.endDate)
            }
          }
        };
        if (!this.companyPersonnel.personParty.id) {
          delete payload.companyData.personnel;
        }
        await this.editPersonnel(payload);
        await this.getPersonnelInfo(this.selectedClaimId);

        this.$router.push('/company-personnel');
      }
    },
    validateDate
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
  }
}
.form-height {
  height: calc(100vh - 150px);
  overflow: auto;
  margin: 10px;
}
</style>
