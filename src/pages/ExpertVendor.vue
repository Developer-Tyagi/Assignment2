<template>
  <div>
    <div>
      <div v-if="vendorLists.Vendors">
        <q-card class="q-pa-md" v-for="(vendor, index) in vendorLists.Vendors">
          <div
            class="form-heading  text-capitalize q-mt-xs row justify-between"
          >
            <span class="q-my-auto"> {{ vendor.name }}</span>
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
              {{ vendor.address.address1 ? vendor.address.address1 : '-' }}
              <div class="">
                {{ vendor.address.address2 ? vendor.address.address2 : '-' }}
              </div>
              <div>
                {{
                  vendor.address.addressLocality
                    ? vendor.address.addressLocality
                    : '-'
                }}
                ,
                {{
                  vendor.address.addressRegion
                    ? toGetStateShortName(vendor.address.addressRegion)
                    : '-'
                }}
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
      <div v-else class="full-width  text-center">
        <div class="q-mt-xs">
          <div style="color: #666666">
            You haven't added a Expert Vendor
          </div>
          <div class="text-center">
            <img
              src="~assets/add.svg"
              width="30px"
              height="30px"
              @click="onAddExpertVendorClick"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="q-ml-auto q-mt-sm"
          v-if="!expertVendorDialogBox && vendorLists.Vendors"
        >
          <q-btn
            @click="
              (expertVendorDialogBox = true), $emit('expertVendorClaim', true)
            "
            color="primary"
            label="Add Expert Vendor"
          ></q-btn>
        </div>
      </div>
      <!-- delete Dialog Box -->
      <q-dialog v-model="alert">
        <q-card>
          <DeleteAlert
            @close="alert = false"
            @onDelete="deleteSingleExpert(currentIndex)"
          />
        </q-card>
      </q-dialog>

      <!-- Mortgage Dialog -->
      <q-dialog
        v-model="expertVendorDialogBox"
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card>
          <CustomBar
            @closeDialog="
              (expertVendorDialogBox = false), $emit('expertVendorClaim', false)
            "
            :dialogName="'Expert Vendor'"
          />
          <div class="mobile-container-page q-pa-sm form-height">
            <q-form ref="estimatingInfoForm">
              <q-card class="row q-pa-sm">
                <p class="form-heading q-mx-none q-my-auto">
                  Is this vendor already hired ?
                </p>
                <q-toggle class="q-ml-auto" v-model="isAlreadyHired" />
              </q-card>

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
            class="single-next-button-style"
            @click="onSaveButtonClick"
            size="'xl'"
          />
        </q-card>
      </q-dialog>
    </div>
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
import DeleteAlert from 'components/DeleteAlert';
import { toGetStateShortName } from '@utils/common';
export default {
  name: 'ClaimExpertVendor',
  components: {
    CustomBar,
    ClaimDetail,
    ExpertVendorInfo,
    DeleteAlert
  },
  data() {
    return {
      alert: false,
      currentIndex: '',
      vendorId: '',
      isAlreadyHired: false,
      vendorName: '',
      item: {
        value: '',
        address: {
          houseNumber: '',
          address1: '',
          address2: '',
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
    ...mapActions([
      'addSingleVendor',
      'getClaimVendors',
      'deleteClaimVendor',
      'getVendorIndustries'
    ]),
    toGetStateShortName,
    setVendorId(value) {
      this.vendorId = value.id;
      this.vendorName = value.name;
    },
    onAddExpertVendorClick() {
      this.expertVendorDialogBox = true;
      this.getVendorIndustries();
    },
    onDelete(index) {
      this.currentIndex = index;
      this.alert = true;
    },
    async deleteSingleExpert(index) {
      const vendor = {
        claimID: this.selectedClaimId,
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
            vendorID: this.vendorId,
            value: this.vendorName,
            isAlreadyHired: this.isAlreadyHired
          }
        }
      };

      const success = await this.addSingleVendor(payload);
      if (success) {
        this.successMessage(constants.successMessages.EXPERTVENDOR);
        this.expertVendorDialogBox = false;
        this.expertVendorInfo.isAlreadyHiredVendor[0] = {
          industry: '',
          vendor: {}
        };
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
