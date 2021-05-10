<template>
  <div>
    <div class="icon-top">
      <q-btn @click="expertVendorDialogBox = true" flat
        ><img src="~assets/addMortgage.svg" height="24" width="24"
      /></q-btn>
    </div>
    <div class="listing-height">
      <div>
        <ClaimDetail />
      </div>
      <div class="q-mt-sm" v-if="vendorLists.Vendors">
        <q-card
          class="q-ma-md q-pa-md"
          v-for="(vendor, index) in vendorLists.Vendors"
        >
          <div class="text-bold text-capitalize q-mt-xs row">
            <span class="q-my-auto"> {{ vendor.value }}</span>
            <q-icon
              size="xs"
              name="create "
              color="primary"
              class="q-ml-auto"
              @click="onEdit(index)"
            ></q-icon>
            <q-icon
              class="q-my-auto"
              name="delete"
              size="xs"
              color="primary"
              @click="onDelete(index)"
            />
          </div>
          <div class="row q-mt-sm">
            <div class="heading-light col-3">Address Details</div>
            <div class="col-7" v-if="vendor.address">
              {{
                vendor.address.houseNumber ? vendor.address.houseNumber : '-'
              }}
              ,
              {{
                vendor.address.streetAddress
                  ? vendor.address.streetAddress
                  : '-'
              }}
              <div class="">
                {{
                  vendor.address.addressLocality
                    ? vendor.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  vendor.address.addressRegion
                    ? vendor.address.addressRegion
                    : '-'
                }}
              </div>
              <div>
                {{
                  vendor.address.addressCountry
                    ? vendor.address.addressCountry
                    : '-'
                }},
                {{
                  vendor.address.postalCode ? vendor.address.postalCode : '-'
                }}
                <q-icon
                  name="place"
                  color="primary"
                  @click="sendMap(vendor.address)"
                  style="position: absolute; right: 20px"
                  size="sm"
                ></q-icon>
              </div>
            </div>
          </div>
          <div class="row q-mt-sm" v-if="vendor.email">
            <span class="heading-light col-3"> Email </span>
            <span
              class="q-ml-none col clickLink"
              @click="onEmailClick(vendor.email, $event)"
            >
              {{ vendor.email ? vendor.email : '-' }}</span
            >
          </div>
          <div class="row">
            <div class="heading-light col-3">Phone Number</div>
            <div class="q-mt-xs col-6 q-ml-none">
              <div class="row" v-for="phone in vendor.phoneNumber">
                <div class="col-3">
                  {{ phone.type ? phone.type : '-' }}
                </div>
                <div
                  class="clickLink"
                  @click="onPhoneNumberClick(phone.number, $event)"
                >
                  {{ phone.number ? phone.number : '-' }}
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <div v-else class=" full-width">
        <div class=" q-mt-md  q-ml-xl">
          <div style="color: #666666;">
            You haven't added a Expert Vendor ..
          </div>
        </div>
      </div>
    </div>

    <!-- Mortgage Dialog -->
    <q-dialog
      v-model="expertVendorDialogBox"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="expertVendorDialogBox = false"
          :dialogName="'Expert Vendor'"
        />
        <div class="mobile-container-page q-pa-sm form-height">
          <q-form ref="estimatingInfoForm">
            <ExpertVendorInfo
              :expertVendorInfo="expertVendorInfo"
              :claimExpertVendor="true"
              :item="item"
              @vendorId="setVendorId"
            />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onSaveButtonClick"
          size="'xl'"
        />
      </q-card>
    </q-dialog>

    <!-- Edit Mortgage Dialog  -->
    <q-dialog
      v-model="editExpertVendorDialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="editExpertVendorDialog = false"
          :dialogName="' Edit Expert Vendor'"
        />
        <div class="mobile-container-page q-pa-sm form-height">
          <q-form ref="estimatingInfoForm">
            <div>
              <ExpertVendorInfo
                :expertVendorInfo="expertVendorInfo"
                :claimExpertVendor="true"
                :item="item"
                @vendorId="setVendorId"
              />
            </div>
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onEditSaveButtonClick"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import { constants } from '@utils/constant';
import ExpertVendorInfo from 'components/ExpertVendorInfo';
import { successMessage } from '@utils/validation';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
export default {
  components: {
    CustomBar,
    ClaimDetail,
    ExpertVendorInfo
  },
  data() {
    return {
      vendorId: '',
      item: {
        value: '',
        address: {
          houseNumber: '',
          streetAddress: '',
          addressLocality: '',
          addressRegion: '',
          addressCountry: '',
          postalCode: ''
        },
        email: '',
        phone: ''
      },
      expertVendorInfo: {
        isAlreadyHiredVendor: [{ industry: '', vendor: {} }],
        isHiredByClaimguru: [{ industry: '', vendor: {} }],
        anyOtherExpertHiredToggle: false,
        vendorExpertHiredToggle: false,
        notes: '',
        internalNotes: ''
      },

      id: '',
      mortgageID: '',
      expertVendorDialogBox: false,
      editExpertVendorDialog: false,
      constants: constants
    };
  },
  computed: {
    ...mapGetters(['mortgage', 'selectedClaimId', 'mortgages', 'vendorLists'])
  },
  async created() {
    await this.getClaimVendors(this.selectedClaimId);
  },
  methods: {
    ...mapActions(['addSingleVendor', 'getClaimVendors', 'deleteClaimVendor']),
    setVendorId(value) {
      this.vendorId = value;
    },

    onEdit(index) {
      this.item.value = this.vendorLists.Vendors[index].name;
      this.item.address = this.vendorLists.Vendors[index].address;
      this.item.email = this.vendorLists.Vendors[index].email;
      this.item.email = this.vendorLists.Vendors[index].email;
      this.item.phone = this.vendorLists.Vendors[index].phoneNumber[0].number;

      this.expertVendorDialogBox = false;
      this.editExpertVendorDialog = true;
      this.expertVendorInfo.isAlreadyHiredVendor[0].vendor = this.item;
    },
    async onEditSaveButtonClick() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          vendor: {
            vendorID: this.vendorId
          }
        }
      };
      await this.addSingleVendor(payload);
      this.editExpertVendorDialog = false;
      this.getClaimVendors(this.selectedClaimId);
    },
    async onDelete(index) {
      const vendor = {
        claimID: this.$route.params.id,
        vendorId: this.vendorLists.Vendors[index].id
      };
      await this.deleteClaimVendor(vendor);
      this.getClaimVendors(this.selectedClaimId);
    },
    onNameClick(value) {
      this.$router.push('/vendor-details/' + value);
    },
    successMessage,
    onPhoneNumberClick,
    onEmailClick,
    sendMap,
    async onSaveButtonClick() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          vendor: {
            vendorID: this.vendorId
          }
        }
      };

      const success = await this.addSingleVendor(payload);
      if (success) {
        this.successMessage(constants.successMessages.EXPERTVENDOR);
        this.expertVendorDialogBox = false;
        this.getClaimVendors(this.selectedClaimId);
      }
    }
  }
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
