<template>
  <q-page>
    <div class="actions-div">
      <q-separator vertical inset></q-separator>
      <q-btn @click="addPersonnelDialog = true" flat class="q-ml-auto"
        ><img src="~assets/add.svg"
      /></q-btn>
    </div>

    <div class="clients-list q-pa-md">
      <div class="row"></div>
      <div class="text-h7" v-for="personnel in vendorPersonnel.personnel">
        <div class="q-mt-md ">{{ personnel.fname }}</div>
        <q-separator />
      </div>
    </div>

    <!-- Add Personnel Dialog -->
    <q-dialog
      v-model="addPersonnelDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add Adjustor'"
          @closeDialog="addPersonnelDialog = false"
        />
        <div class="mobile-container-page-without-search">
          <q-card class="q-ma-md q-pa-md q-mt-sm ">
            <q-select
              class="required"
              dense
              v-model="honorific.id"
              :options="titles"
              option-value="id"
              option-label="value"
              map-options
              options-dense
              behavior="menu"
              @input="setTitleName(honorific)"
              emit-value
              label="Title"
              options-dense
            />
            <q-input dense v-model="personnel.fname" label="First Name" />
            <q-input dense v-model="personnel.lname" label="Last Name" />
            <q-input
              dense
              v-model="personnel.departmentName"
              label="Organization / Department Name"
            />
          </q-card>
          <q-card class="q-ma-md q-pa-md q-mt-sm"
            ><span class="text-bold">Address Details</span>
            <AutoCompleteAddress
              :address="personnel.address"
              :isDropBoxEnable="false"
              :isChecksEnable="false"
              :value="false"
            />
          </q-card>
          <q-card class="q-ma-md q-pa-md q-mt-sm">
            <div class="row justify-between">
              <q-select
                dense
                v-model="personnel.type"
                class=" col-5"
                :options="contactTypes"
                option-value="machineValue"
                option-label="name"
                map-options
                emit-value
                behavior="menu"
                options-dense
                label="Type"
              />
              <q-input
                dense
                v-model.number="personnel.phone"
                class="required col-6"
                label="Phone"
                mask="(###) ###-####"
              />
            </div>
            <div class="row justify-between">
              <q-select
                dense
                v-model="personnel.type2"
                class=" col-5"
                :options="contactTypes"
                option-value="machineValue"
                option-label="name"
                map-options
                emit-value
                behavior="menu"
                options-dense
                label="Type"
              />
              <q-input
                dense
                v-model.number="personnel.phone2"
                class="required col-6"
                label="Phone"
                mask="(###) ###-####"
              />
            </div>
            <div class="row">
              <q-btn
                outline
                class="q-mt-sm"
                @click="addAnotherContact"
                color="primary"
                label="Add"
                style="margin-right: auto"
              />
            </div>
          </q-card>
          <q-card class="q-ma-md q-pa-md q-mt-sm">
            <q-input
              dense
              v-model="personnel.email"
              input
              type="email"
              novalidate="true"
              label="Email"
            />
            <q-select
              v-model="name"
              class=" col-5"
              label="Type"
              :options="personnel.defaultRoles"
              option-value="name"
              behavior="menu"
              emit-value
            />
            <div class="form-heading q-mt-md">Notes</div>
            <div class="floating-label">
              <textarea
                rows="3"
                required
                class="full-width"
                v-model="personnel.notes"
                style="resize: none"
                placeholder="Take notes here..."
              ></textarea>
            </div>
          </q-card>
          <q-btn
            @click="onSave"
            label="Save"
            color="primary"
            class="button-width-90"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import AutoCompleteAddress from 'components/AutoCompleteAddress';

export default {
  components: {
    CustomBar,
    AutoCompleteAddress
  },
  data() {
    return {
      name: '',
      addPersonnelDialog: false,
      addAditionalPhoneNumberToggle: false,
      honorific: {
        id: '602a5eaa312a2b57ac2b00ad',
        value: 'Mr.',
        machineValue: 'mr_'
      },
      personnel: {
        fname: '',
        lname: '',
        departmentName: '',
        address: {
          houseNumber: '',
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postOfficeBoxNumber: '',
          postalCode: '',
          streetAddress: ''
        },
        phone: '',
        type: 'main',
        phone2: '',
        type2: 'main',
        email: '',
        defaultRoles: ['Sonali'],
        notes: ''
      }
    };
  },
  computed: {
    ...mapGetters(['contactTypes', 'titles', 'vendorPersonnel'])
  },
  created() {
    this.getVendorPersonnel(this.$route.params.id);
    this.getContactTypes();
    this.getTitles();
  },
  methods: {
    ...mapActions([
      'getContactTypes',
      'getTitles',
      'addVendorPersonnel',
      'getVendorPersonnel'
    ]),
    addAnotherContact() {},
    setTitleName() {
      const title = this.titles.find(obj => {
        return obj.id === this.honorific.id;
      });

      this.honorific.value = title.value;

      this.honorific.machineValue = title.machineValue;
    },

    async onSave() {
      const payload = {
        id: this.$route.params.id,

        data: {
          personnel: {
            honorific: {
              id: this.honorific.id,
              value: this.honorific.value,
              machineValue: this.honorific.machineValue
            },
            fname: this.personnel.fname,
            lname: this.personnel.lname,
            email: this.personnel.email,
            phoneNumber: [
              {
                type: this.personnel.phone,
                number: this.personnel.type
              }
            ],
            role: {
              value: 'Adjuster',
              machineValue: 'adjuster'
            },
            address: {
              ...this.personnel.address
            }
          },
          note: this.personnel.notes
        }
      };
      await this.addVendorPersonnel(payload);
      this.addPersonnelDialog = false;
      this.getVendorPersonnel(this.$route.params.id);
      this.personnel.fname = '';
      this.personnel.lname = '';
      this.personnel.email = '';
      this.personnel.phone = '';
      this.personnel.phone2 = '';
      this.personnel.address = '';
      this.personnel.notes = '';
      this.personnel.departmentName = '';
    }
  }
};
</script>
