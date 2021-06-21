<template>
  <div>
    <div>
      <div>
        <div class="q-mx-md">
          <q-separator class="q-my-sm" />

          <div class="row q-py-sm">
            <div class="col-6 heading-light">Total Payment</div>

            <div class="col row justify-between q-ml-auto text-bold">
              <div class="heading-light">$</div>
              hhhh
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Outstanding Expenses</div>

            <div class="col row justify-between q-ml-auto text-bold">
              <div class="heading-light">$</div>
              ll
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light ">
              Outstanding on Claim
            </div>
            <div class="col row justify-between q-ml-auto text-bold">
              <span class="heading-light">$</span>
              jj
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light ">
              Waiting Disbursement
            </div>

            <div class="col row justify-between q-ml-auto text-bold">
              <span class="heading-light">$</span>
            </div>
          </div>
          <!-- settlment -->
          <q-list class="q-mt-xs">
            <q-expansion-item
              group="Ledger"
              label="Payment"
              header-class="text-primary"
            >
              <q-btn
                @click="addPaymentDialog = true"
                label="Add Payment"
                size="xs"
                class="q-ml-sm"
                color="primary"
              />
            </q-expansion-item>
            <q-expansion-item
              group="Ledger"
              label="Expenses"
              header-class="text-primary"
              >Expenses >
            </q-expansion-item>
            <q-expansion-item
              group="Ledger"
              label="Disbursement"
              header-class="text-primary"
              >DisbursementDisbursement
            </q-expansion-item>
          </q-list>

          <q-separator class="q-my-sm" />
        </div>
      </div>
    </div>
    <!-- Add Estimator Dialog  -->
    <q-dialog
      v-model="addPaymentDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="addPaymentDialog = false"
          :dialogName="'Add Claim Payment '"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form>
            <div class="row" style="align-items: center">
              <span class="">Recieved Date</span>

              <q-input
                dense
                v-model="date"
                mask="##/##/####"
                label="DD/MM/YYYY"
                style="margin-left: auto; width: 50%"
                lazy-rules
                class="required"
                :rules="[
                  val =>
                    (val && val.length > 0 && validateDate(val)) ||
                    'Invalid date!'
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    name="event"
                    size="sm"
                    color="primary"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date" mask="MM/DD/YYYY"></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row" style="align-items: center">
              <span class="">Amount of Payment</span>

              <q-input
                dense
                v-model.number="amountsOfPayment"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Check Reference #</span>

              <q-input
                dense
                v-model="checkReference"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Net Settlement</span>

              <q-input
                dense
                v-model.number="amountsOfPayment"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Paid to Date</span>

              <q-input
                dense
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Outstanding</span>

              <q-input
                dense
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Aim To Apply</span>

              <q-input
                dense
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div>Notes</div>
            <textarea rows="3" class="full-width" />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EstimatingInfo from 'components/EstimatingInfo';
import CustomBar from 'components/CustomBar';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';
import ClaimDetail from 'components/ClaimDetail';
import { validateDate } from '@utils/validation';
export default {
  name: 'ClaimLedger',
  components: {
    EstimatingInfo,
    CustomBar,
    ClaimDetail
  },
  data() {
    return {
      date: '',
      checkReference: '',
      amountsOfPayment: null,
      addPaymentDialog: false
    };
  },

  computed: {
    ...mapGetters(['estimator', 'selectedClaimId', 'account'])
  },

  created() {
    this.getEstimateInfo(this.selectedClaimId);
    this.getAccountDetails(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'getEstimateInfo',
      'addClaimEstimator',
      'getAccountDetails'
    ]),
    onPhoneNumberClick,
    onEmailClick,
    validateDate
  }
};
</script>
