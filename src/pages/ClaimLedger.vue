<template>
  <div>
    <div>
      <div>
        <div class="q-mx-md">
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Total Payment</div>

            <div class="col row justify-between q-ml-auto ">
              <div class="heading-light">$</div>
              {{ account.totalPayment }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Outstanding Expenses</div>

            <div class="col row justify-between q-ml-auto ">
              <div class="heading-light">$</div>
              {{ account.totalExpense }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light ">
              Outstanding on Claim
            </div>
            <div class="col row justify-between q-ml-auto ">
              <span class="heading-light">$</span>
              {{ account.totalReplCost }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light ">
              Waiting Disbursement
            </div>

            <div class="col row justify-between q-ml-auto ">
              <span class="heading-light">$</span>
            </div>
            {{ account.pendingDisbursement }}
          </div>

          <q-card class="q-my-sm" v-for="settlement in account.settlements">
            <div class="row q-px-md q-pt-xs justify-center">
              <div>{{ settlement.desc }}</div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light ">
                Net Settlement
              </div>
              <div class="col row justify-between q-ml-auto ">
                <span class="heading-light">$</span>
                {{ settlement.netSettlement }}
              </div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light ">
                Outstanding
              </div>
              <div class="col row justify-between q-ml-auto ">
                <span class="heading-light">$</span>
                {{ settlement.outstanding }}
              </div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light ">
                Total Paid
              </div>
              <div class="col row justify-between q-ml-auto  q-mb-sm ">
                <span class="heading-light">$</span>
                {{ settlement.totalPaid }}
              </div>
            </div>
          </q-card>
          <q-list>
            <q-expansion-item
              group="Ledger"
              label="Payment"
              header-class="text-primary"
            >
              <div class="heading-light q-ml-sm">
                Payments Issued by Carrier
              </div>
              <div class="row justify-between q-my-sm">
                <div class="heading-light q-ml-sm">Total Recieved</div>
                <div class="heading-light q-ml-sm">$</div>

                <div class="q-mr-sm">{{ payment.totalReplCost }}</div>
              </div>
              <div>
                <div v-if="payment.payments != null">
                  <q-card
                    class="q-pa-sm q-ma-sm"
                    v-for="pay in payment.payments"
                  >
                    <div class="row justify-between">
                      <div class="heading-light">Date</div>
                      <div>{{ pay.receviedDate | moment('MM/DD/YYYY') }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Amount</div>
                      <div>{{ pay.amount }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Reference Number</div>
                      <div>{{ pay.reference }}</div>
                    </div>
                  </q-card>
                </div>
                <div v-else class="text-center heading-light q-my-md">
                  No Payment Is added Yet !
                </div>
              </div>
              <div class="justify-end row q-mr-sm">
                <q-btn
                  @click="addPaymentDialog = true"
                  label="Add Payment"
                  size="xs"
                  class="q-ml-sm"
                  color="primary"
                />
              </div>
            </q-expansion-item>
            <q-expansion-item
              group="Ledger"
              label="Expenses"
              header-class="text-primary"
            >
              <div v-if="expenses.expenses != null">
                <q-card class="q-ma-xs" v-for="expense in expenses.expenses">
                  <div class=" row justify-end">
                    <div class="q-mr-xs">
                      <q-icon
                        name="create"
                        size="xs"
                        color="primary"
                        @click="editExpense(expense)"
                      />
                      <q-icon
                        class="q-mx-xs"
                        name="delete"
                        size="xs"
                        color="primary"
                      />
                    </div>
                  </div>
                  <div class="q-pa-sm">
                    <div class="row q-mt-xs justify-between">
                      <div class="heading-light">Date</div>
                      <div>
                        {{ expense.receviedDate | moment('MM/DD/YYYY') }}
                      </div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Payee</div>
                      <div>{{ expense.amount }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Reference</div>
                      <div>{{ expense.reference }}</div>
                    </div>

                    <div class="row justify-between">
                      <div class="heading-light">Note</div>
                      <div>{{ expense.desc }}</div>
                    </div>
                  </div>
                </q-card>
              </div>
              <div v-else class="text-center heading-light q-my-md">
                No Expense is Added Yet !
              </div>

              <div class=" row justify-end">
                <div class="q-mr-md q-mt-sm">
                  <q-btn
                    size="xs"
                    color="primary"
                    label="Add"
                    @click="addExpensesDialog = true"
                  />
                </div>
              </div>
            </q-expansion-item>
            <q-expansion-item
              group="Ledger"
              label="Disbursement"
              header-class="text-primary"
            >
              <div class=" row justify-end">
                <div class="q-mr-md q-mt-sm">
                  <q-btn
                    size="xs"
                    color="primary"
                    label="Add Disbursement"
                    @click="addDisbursementDialog = true"
                  />
                </div>
              </div>
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
                v-model="payments.date"
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
                      <q-date
                        v-model="payments.date"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row" style="align-items: center">
              <span class="">Amount of Payment</span>

              <q-input
                dense
                v-model.number="payments.amountsOfPayment"
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
                v-model="payments.checkReference"
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
                v-model.number="payments.netSettlement"
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
                v-model.number="payments.paidToDate"
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
                v-model="payments.outstanding"
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
                v-model="payments.aimToApply"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div>Notes</div>
            <textarea v-model="payments.notes" rows="3" class="full-width" />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          @click="onClickSavePayment"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="addExpensesDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="addExpensesDialog = false"
          :dialogName="'Add Claim  Expenses'"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form>
            <div class="row" style="align-items: center">
              <span class="">Recieved Date</span>

              <q-input
                dense
                v-model="addexpenses.receviedDate"
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
                      <q-date
                        v-model="addexpenses.receviedDate"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row" style="align-items: center">
              <span class="">Expense Amount</span>

              <q-input
                dense
                v-model.number="addexpenses.amount"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class=""> Amount Collected</span>

              <q-input
                dense
                v-model="addexpenses.reference"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              />
            </div>

            <div class="row" style="align-items: center">
              <span class=""> Company Fee</span>

              <q-toggle class="q-ml-auto" v-model="toggleOnOff" />
            </div>

            <div class="row" style="align-items: center">
              <span class="">Payee</span>

              <q-input
                dense
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Resposible Party</span>

              <q-input
                v-model="addexpenses.responsible.value"
                dense
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class=""> Exclude from Company Fee</span>

              <q-toggle class="q-ml-auto" v-model="toggleOnOff" />
            </div>
            <div class="row" style="align-items: center">
              <span class="">Invoice reference Number</span>

              <q-input
                dense
                v-model="addexpenses.reference"
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div>

            <div>Description</div>
            <textarea v-model="addexpenses.desc" rows="3" class="full-width" />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="button-width-90"
          size="'xl'"
          @click="addExpensesSaveClick"
        />
      </q-card>
    </q-dialog>
    <!-- Expenses Dialog Box -->
    <q-dialog
      v-model="addDisbursementDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="addDisbursementDialog = false"
          :dialogName="'Add Claim  Disbursment'"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form>
            <q-card class="q-mx-sm q-pa-sm">
              <span class="">Opening Balance </span>
              <div class="row" style="align-items: center">
                <span class="heading-light">Amount Available </span>

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
                <span class="heading-light">Amount to Disburse</span>

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
                <span class="col-5 heading-light">
                  Outstanding Expenses Payable By both company and Client
                </span>

                <q-input
                  dense
                  v-model="checkReference"
                  mask="#.#"
                  prefix="$"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  class="input-extra-padding"
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="">Net Expense To Pay</span>

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
                <span class="heading-light"> Net Amount to Disburse</span>

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
                <span class="col-5 heading-light"
                  >Client Expenses Exempt from Company Fee</span
                >

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
                <span class="heading-light">Amount Subject to Company Fee</span>

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
                <span class="heading-light"> Company Fee Type</span>

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
                <span class="heading-light">Percentage</span>

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
                <span class="heading-light">Company Fee</span>

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
                <span class="heading-light">Company Starting Balance</span>

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
                <span class="heading-light">Client Starting Balance</span>

                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
            </q-card>
            <q-card class="q-ma-sm q-pa-sm">
              <span class="">Client Breakdown </span>
              <div class="row" style="align-items: center">
                <span class="heading-light">Client Starting Balance</span>

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
                <span class="heading-light">Total Amount to Client</span>

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
                <span class="heading-light">Expenses Payable by Client</span>

                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
            </q-card>
            <q-card class="q-ma-sm q-pa-sm">
              <span class="">Company Breakdown </span>
              <div class="row" style="align-items: center">
                <span class="heading-light">Company Starting Balance</span>

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
                <span class="heading-light">Expenses Payable by Company</span>

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
                <span class="heading-light"
                  >Amount Available for Commission Calculations</span
                >

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
                <span class="heading-light">Expenses/Fees Owed to Company</span>

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
                <span class="heading-light">Total Amount to Company</span>

                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
              </div>
            </q-card>
            <!-- <div class="row" style="align-items: center">
              <span class="">Aim To Apply</span>

              <q-input
                dense
                mask="#.#"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
              />
            </div> -->
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
import { dateToShow } from '@utils/date';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';
import ClaimDetail from 'components/ClaimDetail';
import { validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
export default {
  name: 'ClaimLedger',
  components: {
    EstimatingInfo,
    CustomBar,
    ClaimDetail
  },
  data() {
    return {
      payments: {
        date: '',
        amountsOfPayment: '',
        checkReference: '',
        netSettlement: '',
        paidToDate: '',
        outstanding: '',
        aimToApply: '',
        notes: ''
      },
      addexpenses: {
        amount: '',
        receviedDate: '2020-09-24T11:18:06Z',
        reference: '',
        responsible: {
          value: 'Client',
          machineValue: 'client'
        },
        desc: ''
      },
      date: '',
      checkReference: '',
      amountsOfPayment: null,
      addPaymentDialog: false,
      toggleOnOff: false,
      addExpensesDialog: false,
      addDisbursementDialog: false
    };
  },

  computed: {
    ...mapGetters([
      'estimator',
      'selectedClaimId',
      'account',
      'payment',
      'expenses'
    ])
  },

  created() {
    this.getEstimateInfo(this.selectedClaimId);
    this.getAllPayment(this.selectedClaimId);
    this.getAccountDetails(this.selectedClaimId);
    this.getAllExpenses(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'getEstimateInfo',
      'addClaimEstimator',
      'getAccountDetails',
      'getAllPayment',
      'getAllExpenses',
      'addPayment',
      'addExpenses'
    ]),
    onPhoneNumberClick,
    onEmailClick,
    validateDate,
    dateToShow,

    async onClickSavePayment() {
      const payload = {
        id: this.selectedClaimId,
        data: {
          amount: this.payments.amount,
          receviedDate: dateToSend(this.payments.date),
          reference: this.payments.checkReference,
          settlements: [
            {
              id: '1212121212121212',
              amountPaid: 300.0
            }
          ],
          note: this.payments.notes
        }
      };

      const success = await this.addPayment(payload);
      if (success) {
        this.addPaymentDialog = false;
      }
    },
    async addExpensesSaveClick() {
      const payload = {
        id: this.selectedClaimId,
        data: this.addexpenses
      };

      const success = await this.addExpenses(payload);
      if (success) {
        await this.getAllExpenses(this.selectedClaimId);
        await this.getAccountDetails(this.selectedClaimId);
        this.addExpensesDialog = false;
      }
    },
    editExpense(value) {
      this.addexpenses = value;
      this.addExpensesDialog = true;
    }
  }
};
</script>
