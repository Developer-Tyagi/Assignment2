<template>
  <div>
    <div>
      <div>
        <div class="q-mx-md">
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Total Payment</div>

            <div class="col row justify-between q-ml-auto">
              <div class="heading-light">$</div>
              {{ account.totalPayment }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Outstanding Expenses</div>

            <div class="col row justify-between q-ml-auto">
              <div class="heading-light">$</div>
              {{ account.totalExpense }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Outstanding on Claim</div>
            <div class="col row justify-between q-ml-auto">
              <span class="heading-light">$</span>
              {{ account.netClaimed }}
            </div>
          </div>
          <div class="row q-py-sm">
            <div class="col-6 heading-light">Waiting Disbursement</div>

            <div class="col row justify-between q-ml-auto">
              <span class="heading-light">$</span>
            </div>
            {{ account.pendingDisbursement }}
          </div>
          <div class="text-center q-my-xs heading-light">
            Accepted Settlements
          </div>

          <q-card class="q-my-sm" v-for="settlement in account.settlements">
            <div class="row q-px-md q-pt-xs justify-center">
              <div>{{ settlement.desc }}</div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light">Net Claimed</div>
              <div class="col row justify-between q-ml-auto">
                <span class="heading-light">$</span>
                {{ settlement.netSettlement }}
              </div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light">Total Recieved</div>
              <div class="col row justify-between q-ml-auto">
                <span class="heading-light">$</span>
                {{ settlement.totalPaid }}
              </div>
            </div>
            <div class="row q-px-sm">
              <div class="col-6 heading-light">Outstanding</div>
              <div class="col row justify-between q-ml-auto q-mb-sm">
                <span class="heading-light">$</span>
                {{ settlement.outstanding }}
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

              <div>
                <div v-if="payment.payments != null">
                  <q-card
                    class="q-pa-sm q-ma-sm"
                    v-for="pay in payment.payments"
                  >
                    <div class="row justify-end">
                      <div class="q-mr-xs">
                        <q-icon
                          name="create"
                          size="xs"
                          color="primary"
                          @click="editPayments(pay)"
                        />

                        <q-icon
                          class="q-mx-xs"
                          name="delete"
                          size="xs"
                          @click="deletePrePayment(pay)"
                          color="primary"
                        />
                      </div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Date</div>
                      <div>{{ pay.receviedDate | moment('MM/DD/YYYY') }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Amount</div>
                      <div>$ {{ pay.amount ? pay.amount : '' }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Reference Number</div>
                      <div>{{ pay.reference }}</div>
                    </div>
                  </q-card>
                </div>
                <div v-else class="text-center heading-light q-my-md">
                  No Payment Is Received Yet !
                </div>
              </div>
              <div class="justify-end row q-mr-sm">
                <q-btn
                  @click="openAddPaymentDialog"
                  label="Add "
                  size="sm"
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
                  <div class="row justify-between">
                    <div class="q-pl-sm q-pt-xs">
                      <q-badge color="primary">{{
                        expense.payableBy.value
                      }}</q-badge>
                      <q-badge
                        class="q-ml-sm"
                        v-if="expense.amount - expense.paid < 1"
                        color="green"
                        >Paid</q-badge
                      >
                    </div>
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
                        @click="deleteExpense(expense)"
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
                      <div>{{ expense.payee }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Amount</div>
                      <div>$ {{ expense.amount }}</div>
                    </div>
                    <div class="row justify-between">
                      <div class="heading-light">Balance</div>
                      <div>$ {{ expense.amount - expense.paid }}</div>
                    </div>

                    <div class="row justify-between">
                      <div class="heading-light">Reference</div>
                      <div>{{ expense.reference }}</div>
                    </div>
                  </div>
                </q-card>
              </div>
              <div v-else class="text-center heading-light q-my-md">
                No Expense is Received Yet !
              </div>

              <div class="row justify-end">
                <div class="q-mr-md q-mt-sm">
                  <q-btn
                    size="sm"
                    color="primary"
                    label="Add"
                    @click="openAddExpensesDialog"
                  />
                </div>
              </div>
            </q-expansion-item>
            <q-expansion-item
              group="Ledger"
              label="Disbursement"
              header-class="text-primary"
              @click="toDisbursement()"
            >
              <div v-if="disbursements.disbursements != null">
                <q-card
                  class="q-pa-lg q-ma-sm"
                  v-for="pay in disbursements.disbursements"
                >
                  <div class="q-my-sm row justify-between">
                    <div class="row">
                      <div>Date - {{ pay.created | moment('MM/DD/YYYY') }}</div>

                      <div class="q-ml-sm">Total : ${{ pay.amount }}</div>
                    </div>
                    <div class="heading-light">
                      <q-icon
                        name="delete"
                        color="primary"
                        size="xs"
                        @click="askToDeleteDisbursement(pay)"
                      />
                    </div>
                  </div>

                  <div class="row justify-between">
                    <div class="col-3">Payee</div>
                    <div class="col-2">Amount</div>
                    <div class="col-2">Type</div>
                  </div>
                  <div class="q-my-sm row justify-between">
                    <div class="col-3 heading-light">Company</div>

                    <div class="col-2 heading-light">
                      $ {{ pay.paidToCompany ? pay.paidToCompany : 0 }}
                    </div>
                    <div class="col-2 heading-light">Company</div>
                  </div>
                  <div class="row justify-between">
                    <div class="col-3 heading-light">Client</div>

                    <div class="col-2 heading-light">
                      $ {{ pay.paidToClient ? pay.paidToClient : 0 }}
                    </div>
                    <div class="col-2 heading-light">Client</div>
                  </div>
                  <!-- {{ finalExpenses }} -->
                  <div
                    class="q-mt-sm row justify-between"
                    v-for="exp in pay.expenses"
                  >
                    <div class="col-3 heading-light">
                      {{ exp.payee ? exp.payee : '-' }}
                    </div>

                    <div class="col-2 heading-light">
                      $ {{ exp.paid ? exp.paid : 0 }}
                    </div>
                    <div class="col-2 heading-light">Vendor</div>
                  </div>
                  <!-- Listing of Commission Payments -->
                  <div
                    class="q-mt-sm row justify-between"
                    v-for="commission in pay.commissions"
                    :key="commission.id"
                  >
                    <div class="name-ellipsis col-3 heading-light">
                      {{ commission.payee ? commission.payee : '' }}
                    </div>

                    <div class="col-2 heading-light">
                      $ {{ commission.paid ? commission.paid : 0 }}
                    </div>
                    <div class="col-2 heading-light">Personnel</div>
                  </div>
                </q-card>
              </div>
              <div v-else class="text-center heading-light q-my-md">
                No Disbursement Is Received Yet !
              </div>
              <div class="row justify-end">
                <div class="q-mr-md q-mt-sm">
                  <q-btn
                    size="sm"
                    color="primary"
                    label="Add "
                    @click="openDisbursementBox"
                  />
                </div>
              </div>
            </q-expansion-item>
          </q-list>

          <q-separator class="q-my-sm" />
        </div>
      </div>
    </div>
    <q-dialog
      v-model="editPaymentDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="editPaymentDialog = false"
          :dialogName="'Edit Claim Payment '"
        />
        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form ref="EditPaymentForm">
            <div class="row" style="align-items: center">
              <span class="heading-light">Recieved Date</span>

              <q-input
                dense
                v-model="payments.date"
                mask="##/##/####"
                label="MM/DD/YYYY"
                style="margin-left: auto; width: 50%"
                lazy-rules
                class="required"
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
                        @input="() => $refs.qDateProxy.hide()"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row" style="align-items: center">
              <span class="heading-light">Amount Of Payment</span>

              <q-input
                dense
                v-model.number="payments.amountsOfPayment"
                type="number"
                style="margin-left: auto; width: 50%"
                prefix="$"
                class="input-extra-padding"
                lazy-rules
                :rules="[val => val > 0 || 'Please fill Amount of payment']"
              />
            </div>
            <div class="row" style="align-items: center">
              <span class="heading-light">Check Reference #</span>

              <q-input
                dense
                v-model="payments.checkReference"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding"
              />
            </div>
            <div>
              <div class="q-pa-sm" v-if="showValue">
                <q-card
                  class="q-ma-sm justify-between"
                  v-for="(settlement, index) in account.settlements"
                >
                  <div class="q-pt-sm row justify-center">
                    <div>{{ settlement.desc }}</div>
                  </div>

                  <div class="q-mx-md row justify-between">
                    <span class="heading-light">Net Settlement</span>
                    <span class>$ {{ settlement.netSettlement }}</span>
                  </div>
                  <div class="q-mx-md row justify-between" style>
                    <span class="heading-light">Paid To Date</span>

                    <span class>$ {{ settlement.totalPaid }}</span>
                  </div>
                  <div class="q-mx-md row justify-between" style>
                    <span class="heading-light">Outstanding</span>

                    <span class>$ {{ settlement.outstanding }}</span>
                  </div>
                  <div class="q-ml-md row" style="align-items: center">
                    <span class="heading-light">Amt To Apply</span>

                    <q-input
                      dense
                      style="margin-left: auto; width: 30%"
                      v-model.number="payments.settlements[index].amountPaid"
                      prefix="$"
                      lazy-rules
                      @blur="calculateRemainingAmount(index)"
                    />
                  </div>
                </q-card>
                <div
                  v-if="payments.remainingAmount < 0"
                  class="row justify-between q-mr-lg q-ml-md q-my-md"
                >
                  <div class="heading-light">Remaining Amount</div>
                  <div class="bg-primary">
                    $ {{ payments.remainingAmount }} ( Over)
                  </div>
                </div>

                <div v-else class="row justify-between q-mr-lg q-ml-md q-my-md">
                  <div class="heading-light">Remaining Amount</div>
                  <div>$ {{ payments.remainingAmount }}</div>
                </div>
              </div>
            </div>

            <div class="heading-light">Notes</div>
            <textarea v-model="payments.notes" rows="3" class="full-width" />
          </q-form>
        </div>
        <q-btn
          :disable="payments.remainingAmount < 0"
          label="Save"
          color="primary"
          class="single-next-button-style"
          @click="onClickSaveEditPayment"
          size="'xl'"
        />
      </q-card>
    </q-dialog>
    <!-- edit Payment Dialog  -->
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
        <div class="q-ma-sm q-pa-sm mobile-container-page listing-height">
          <q-form ref="paymentForm">
            <div class="row justify-between" style="align-items: center">
              <span class="heading-light">Recieved Date</span>

              <q-input
                dense
                v-model="payments.date"
                mask="##/##/####"
                label="MM/DD/YYYY"
                style="width: 50%"
                lazy-rules
                class="required q-pr-md input-style input-overlay"
                borderless
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
                        @input="() => $refs.qDateProxy.hide()"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row justify-between" style="align-items: center">
              <span class="heading-light">Amount Of Payment</span>

              <q-input
                dense
                v-model.number="payments.amountsOfPayment"
                type="number"
                style="width: 50%"
                prefix="$"
                @blur="remainingCalculation(payments.amountsOfPayment)"
                class="input-extra-padding input-style input-overlay"
                borderless
                lazy-rules
                :rules="[val => val || 'Please fill Amount of payment']"
              />
            </div>
            <div class="row justify-between" style="align-items: center">
              <div class="heading-light">Check Reference #</div>

              <q-input
                v-model="payments.checkReference"
                style="width: 50%"
                class="input-extra-padding q-pl-xl input-style input-overlay"
                borderless
              />
            </div>
            <div class="q-ma-sm">
              <!-- <div class=" q-mt-sm row justify-between">
                <span class="col-7 bg-red q-pt-xs q-ml-md">Settlements</span>
                <span class="col-3">Amounts</span>
              </div>-->

              <div class="q-pa-sm" v-if="showValue">
                <q-card
                  class="q-my-sm q-pa-xs"
                  v-for="(settlement, index) in account.settlements"
                >
                  <div class="row q-mt-md justify-center">
                    <div>{{ settlement.desc }}</div>
                  </div>
                  <div class="q-mx-md row justify-between" style>
                    <span class="heading-light">Net Settlement</span>
                    <span>$ {{ settlement.netSettlement }}</span>
                  </div>
                  <div class="q-mx-md row justify-between" style>
                    <span class="heading-light">Paid To Date</span>
                    <span>$ {{ settlement.totalPaid }}</span>
                  </div>
                  <div class="q-mx-md row justify-between" style>
                    <span class="heading-light">Outstanding</span>
                    <span class>$ {{ settlement.outstanding }}</span>
                  </div>
                  <div class="q-mb-md q-ml-md row" style="align-items: center">
                    <span class="heading-light">Amt To Apply</span>

                    <q-input
                      class="q-px-sm"
                      dense
                      style="margin-left: auto; width: 30%"
                      v-model.number="payments.settlements[index].amountPaid"
                      prefix="$"
                      @blur="calculateRemainingAmount(index)"
                    />
                  </div>
                </q-card>
                <div
                  v-if="payments.remainingAmount < 0"
                  class="row justify-between q-mr-lg q-ml-md q-my-md"
                >
                  <div class="heading-light">Remaining Amount</div>
                  <div class="bg-primary">
                    $ {{ payments.remainingAmount }} ( Over)
                  </div>
                </div>
                <div v-else class="row justify-between q-mr-lg q-ml-md q-my-md">
                  <div class="heading-light">Remaining Amount</div>
                  <div>$ {{ payments.remainingAmount }}</div>
                </div>
              </div>
            </div>

            <div class="heading-light">Notes</div>
            <q-input
              type="textarea"
              v-model="payments.notes"
              rows="3"
              class="full-width input-style input-overlay"
              borderless
            />
          </q-form>
        </div>
        <q-btn
          label="Save"
          :disable="payments.remainingAmount < 0"
          color="primary"
          class="single-next-button-style"
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
        <div class="q-ma-sm q-pa-sm mobile-container-page listing-height">
          <q-form ref="addExpensesForm">
            <div class="row justify-between" style="align-items: center">
              <span class="heading-light">Recieved Date</span>

              <q-input
                dense
                v-model="addexpenses.receviedDate"
                mask="##/##/####"
                label="DD/MM/YYYY"
                style="width: 50%"
                lazy-rules
                class="required input-style input-overlay"
                borderless
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
                        @input="() => $refs.qDateProxy.hide()"
                        mask="MM/DD/YYYY"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="row justify-between" style="align-items: center">
              <span class="heading-light">Expense Amount</span>

              <q-input
                dense
                v-model.number="addexpenses.amount"
                mask="#.#"
                type="number"
                style="width: 50%"
                prefix="$"
                class="input-extra-padding input-style input-overlay"
                borderless
                lazy-rules
                :rules="[val => val > 0 || 'Please fill Amount ']"
              />
            </div>

            <div class="row" style="align-items: center">
              <span class="heading-light">Company Fee</span>

              <q-toggle class="q-ml-auto" v-model="toggleOnOff" />
            </div>

            <div class="row justify-between" style="align-items: center">
              <span class="heading-light">Payee</span>

              <q-input
                v-model="addexpenses.payee"
                style="width: 50%"
                borderless
                class="input-extra-padding input-style input-overlay"
              />
            </div>
            <div class="row justify-between" style="align-items: center">
              <span class="heading-light">Payable By</span>

              <q-select
                v-model="addexpenses.payableBy.value"
                :options="options"
                dense
                borderless
                option-value="value"
                option-label="value"
                behavior="menu"
                @input="setResponsibleBy(addexpenses.payableBy.value)"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding input-style input-overlay"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill Payable By'
                ]"
              ></q-select>
            </div>
            <div class="row" style="align-items: center">
              <span class="heading-light">Exclude from Company Fee</span>

              <q-toggle class="q-ml-auto" v-model="toggleOnOff" />
            </div>
            <div class="row" style="align-items: center">
              <span class="heading-light">Invoice reference Number</span>

              <q-input
                v-model="addexpenses.reference"
                style="margin-left: auto; width: 50%"
                class="input-extra-padding input-style input-overlay"
                borderless
              />
            </div>

            <div class="heading-light">Description</div>
            <q-input
              type="textarea"
              v-model="addexpenses.desc"
              rows="3"
              class="input-style input-overlay"
              borderless
            />
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="single-next-button-style"
          size="'xl'"
          @click="addExpensesSaveClick"
        />
      </q-card>
    </q-dialog>
    <!-- Disbursement Dialog Box -->
    <q-dialog
      v-model="addDisbursementDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="closeDisbursmentBox"
          :dialogName="'Add Claim  Disbursment'"
        />

        <div class="q-ma-sm mobile-container-page listing-height">
          <q-form ref="DisbursementForm">
            <q-card class="q-mx-sm q-pa-sm">
              <span class="q-my-md">Opening Balance</span>
              <div class="row q-my-sm">
                <span class="col-8 heading-light">Amount Available</span>
                <div>
                  $
                  {{
                    account.pendingDisbursement
                      ? account.pendingDisbursement
                      : '0'
                  }}
                </div>
              </div>
              <div class="row justify-between">
                <span class="q-mt-md heading-light">Amount to Disburse</span>
                <q-input
                  dense
                  v-model.number="addDisbursement.amountToDisbuse"
                  mask="#.#"
                  type="number"
                  prefix="$"
                  class="col-4"
                  @blur="setValueForClientAndCompany"
                  :rules="[
                    val =>
                      val < checkValidationForDisbursement() ||
                      'Amount Exceeds Above'
                  ]"
                />
              </div>
              <q-separator class="q-mt-sm" />
              <div class="row justify-between q-my-sm">
                <span class="col-5 heading-light"
                  >Outstanding Expenses Payable By both company and Client</span
                >
                <span class="col-4">
                  $
                  {{
                    totalExpensesOfClientAndCompany -
                      alreadyPaidByClientAndCompany
                  }}
                </span>
              </div>
              <div>
                <q-card
                  class="q-ma-xs q-pa-sm"
                  v-if="clientAndCompany.length > 0"
                  flat
                  bordered
                >
                  <table class="full-width">
                    <tr>
                      <td style="width:30%;">Payee</td>
                      <td style="width:30%;">Due</td>
                      <td style="width:20%;">Pay ?</td>

                      <td style="width:30%;">Paid</td>
                    </tr>

                    <tr
                      v-if="exp.amount - exp.dilivered != 0"
                      class="heading-light"
                      v-for="(exp, index) in clientAndCompany"
                    >
                      <td>{{ exp.payee ? exp.payee : '-' }}</td>
                      <td>
                        {{ exp.amount ? exp.amount - exp.dilivered : '-' }}
                      </td>
                      <td>
                        <q-toggle
                          size="xs"
                          v-model="wantToPay[index].value"
                          @input="
                            setValueToPayClientAndCompany(
                              index,
                              exp.amount - exp.dilivered
                            )
                          "
                        />
                      </td>
                      <td>
                        <q-input
                          :disable="wantToPay[index].value == false"
                          v-model="clientAndCompanyAmount[index]"
                          prefix="$"
                          class="col-2"
                          @blur="onFillingValue()"
                        />
                      </td>
                    </tr>
                  </table>
                </q-card>
              </div>

              <div class="row q-my-md">
                <span class="col-8 heading-light">Net Expense To Pay</span>
                <div>
                  $ {{ netExpenseToPayByBoth ? netExpenseToPayByBoth : 0 }}
                </div>
              </div>

              <div class="row q-my-sm">
                <span class="heading-light col-8 q-my-xs"
                  >Net Amount to Disburse</span
                >
                $ {{ addDisbursement.amountToDisbuse - netExpenseToPayByBoth }}
              </div>
              <div class="row q-my-sm">
                <span class="col-8 heading-light"
                  >Client Expenses Exempt from Company Fee</span
                >
                $ 0
              </div>
              <div class="row" style="align-items: center">
                <span class="heading-light col-8"
                  >Amount Subject to Company Fee</span
                >
                $
                {{
                  addDisbursement.amountToDisbuse - netExpenseToPayByBoth
                    ? addDisbursement.amountToDisbuse - netExpenseToPayByBoth
                    : 0
                }}
              </div>
              <div class="q-mt-md row">
                <div class="col-7 q-my-sm heading-light">Company Fee Type</div>

                <q-btn-toggle
                  v-model="feesType"
                  push
                  glossy
                  toggle-color="primary"
                  :options="[
                    { label: ' $', value: 'dollar' },
                    { label: ' %', value: 'percentage' },
                    { value: 'update', icon: 'update' }
                  ]"
                  @click="
                    (partialCompanyValue = ''),
                      (addDisbursement.companyFee = '')
                  "
                ></q-btn-toggle>
              </div>

              <div v-if="feesType == 'percentage'" class="row justify-between">
                <span class="q-mt-sm heading-light">Company Fee</span>
                <q-input
                  dense
                  v-model.number="partialCompanyValue"
                  mask="#.#"
                  type="number"
                  @input="CalculationOfCompanyFee(partialCompanyValue)"
                  class="col-4"
                >
                  <template v-slot:append>
                    <span class="text-bold" style="font-size:20px;">%</span>
                  </template>
                </q-input>
              </div>
              <div v-else-if="feesType == 'update'">
                <div class="row q-mt-md justify-between">
                  <span class="q-mt-md heading-light">Company Fee</span>
                  <q-input
                    dense
                    v-model.number="companyPerHour"
                    type="number"
                    @blur="hourToFeeCalculation"
                    @input="CalculationOfCompanyFee(partialCompanyValue)"
                    class="col-3"
                    outlined
                  ></q-input>
                  <div class="q-mt-sm text-h6">*</div>

                  <q-input
                    dense
                    v-model.number="partialCompanyValue"
                    mask="#.#"
                    type="number"
                    prefix="$"
                    @blur="hourToFeeCalculation"
                    @input="CalculationOfCompanyFee(partialCompanyValue)"
                    class="col-4"
                  >
                    <template v-slot:append>
                      <span class="text-bold" style="font-size:20px;">/hr</span>
                    </template>
                  </q-input>
                </div>
              </div>

              <div v-else class="row justify-between">
                <span class="q-mt-sm heading-light">Company Fee</span>

                <q-input
                  dense
                  v-model.number="addDisbursement.companyFee"
                  @input="setCompanyTotalAmount(addDisbursement.companyFee)"
                  mask="#.#"
                  type="number"
                  prefix="$"
                  class="col-4"
                />
              </div>

              <div class="row q-mt-lg">
                <span class="col-8 heading-light">Calculated Company Fee</span>
                $
                {{
                  addDisbursement.companyFee ? addDisbursement.companyFee : 0
                }}
              </div>
              <div class="row q-mt-lg">
                <span class="col-8 heading-light"
                  >Company Starting Balance</span
                >
                $
                {{
                  addDisbursement.companyFee ? addDisbursement.companyFee : 0
                }}
              </div>
              <div class="row q-my-md">
                <span class="heading-light col-8">Client Starting Balance</span>
                $
                {{
                  addDisbursement.amountToDisbuse -
                    netExpenseToPayByBoth -
                    addDisbursement.companyFee
                }}
              </div>
            </q-card>
            <q-card class="q-ma-sm q-pa-sm">
              <span class="q-my-sm">Client Breakdown</span>
              <div class="row q-my-sm">
                <span class="col-8 heading-light">Client Starting Balance</span>
                $
                {{
                  addDisbursement.amountToDisbuse -
                    netExpenseToPayByBoth -
                    addDisbursement.companyFee
                }}
              </div>

              <div class="row" style="align-items: center">
                <span class="heading-light col-8"
                  >Expenses Payable by Client</span
                >
                $ {{ clientAmount[0] ? clientAmount[0] : 0 }}
              </div>
              <div>
                <q-card
                  class="q-ma-xs q-pa-sm"
                  v-if="clientOnly.length > 0"
                  flat
                  bordered
                >
                  <table class="full-width">
                    <tr>
                      <td style="width:30%;">Payee</td>
                      <td style="width:30%;">Due</td>

                      <td style="width:20%;">Pay ?</td>
                      <td style="width:30%;">Paid</td>
                    </tr>

                    <tr
                      v-if="exp.amount - exp.dilivered != 0"
                      class="heading-light"
                      v-for="(exp, index) in clientOnly"
                    >
                      <td>{{ exp.payee }}</td>
                      <td>$ {{ exp.amount - exp.dilivered }}</td>
                      <q-toggle
                        size="xs"
                        class="q-mt-sm"
                        v-model="wantToPayClient[index].value"
                        @input="
                          setValueToPayClient(index, exp.amount - exp.dilivered)
                        "
                      />
                      <td>
                        <q-input
                          :disable="wantToPayClient[index].value == false"
                          v-model="clientAmount[index]"
                          prefix="$"
                          dense
                          class="col-2"
                          @blur="onFillingClient()"
                        />
                      </td>
                    </tr>
                  </table>
                </q-card>
              </div>

              <div class="q-my-sm row">
                <span class="col-8">Total Amount to Client</span>
                <div class="q-mr-xl text-bold">
                  $ {{ netExpenseToPayByClient }}
                </div>
              </div>
            </q-card>
            <q-card class="q-ma-sm q-pa-sm">
              <span class="q-my-sm">Company Breakdown</span>
              <div class="q-my-sm row">
                <span class="heading-light col-8"
                  >Company Starting Balance</span
                >
                <div class="q-mr-xl">$ {{ addDisbursement.companyFee }}</div>
              </div>
              <div class="q-my-sm row">
                <span class="heading-light col-8"
                  >Expenses Payable by Company</span
                >
                $ {{ companyAmounts[0] ? companyAmounts[0] : 0 }}
              </div>
              <div>
                <q-card
                  class="q-ma-x s q-pa-sm"
                  v-if="companyOnly.length > 0"
                  flat
                  bordered
                >
                  <table class="full-width">
                    <tr>
                      <td style="width:30%;">Payee</td>
                      <td style="width:30%;">Due</td>
                      <td style="width:20%;">Pay ?</td>

                      <td style="width:30%;">Paid</td>
                    </tr>

                    <tr
                      class="heading-light"
                      v-if="exp.amount - exp.dilivered"
                      v-for="(exp, index) in companyOnly"
                    >
                      <td>{{ exp.payee }}</td>
                      <td>{{ exp.amount - exp.dilivered }}</td>
                      <td>
                        <q-toggle
                          class="q-pt-sm"
                          size="xs"
                          v-model="wantToPayCompany[index].value"
                          @input="
                            setValueToPayCompany(
                              index,
                              exp.amount - exp.dilivered
                            )
                          "
                        />
                      </td>
                      <td>
                        <q-input
                          :disable="wantToPayCompany[index].value == false"
                          v-model="companyAmounts[index]"
                          prefix="$"
                          dense
                          class="col-2"
                          @blur="onFillingCompany()"
                        />
                      </td>
                    </tr>
                  </table>
                </q-card>
              </div>
              <!--  Commissions  Payments Calculation-->
              <div class="q-my-sm row">
                <span class="heading-light col-8"
                  >Amount Available for Commission Payments</span
                >
                $
                {{
                  amountAvailableForCommissions == 0
                    ? addDisbursement.companyFee
                    : amountAvailableForCommissions
                }}
              </div>
              <div class="q-my-sm row">
                <span class="heading-light col-8">Commission Payments</span>
              </div>
              <div>
                <q-card class="q-ma-xs q-pa-sm" v-if="personnel" flat bordered>
                  <div full-width>
                    <div
                      class="row full-width"
                      v-for="(person, index) in personnel.personnel"
                      :key="index"
                    >
                      <q-separator v-if="index >= 1" class="q-my-sm" />
                      <div class="row q-mr-xs" style="width: 100%">
                        <div class="col">
                          <div>Payee</div>
                          <div class="name-ellipsis">{{ person.name }}</div>
                        </div>
                        <div class="col column items-center">
                          <div>Due</div>

                          <div v-if="toggleType[index] === 'dollar'">
                            $
                            {{
                              person.fees && person.fees.rate
                                ? person.fees.rate
                                : '0'
                            }}
                          </div>

                          <div
                            v-if="
                              toggleType[index] === 'percentage' && person.fees
                            "
                          >
                            $
                            {{
                              ((amountAvailableForCommissions
                                ? amountAvailableForCommissions
                                : addDisbursement.companyFee) *
                                person.fees.rate) /
                              100
                                ? ((amountAvailableForCommissions
                                    ? amountAvailableForCommissions
                                    : addDisbursement.companyFee) *
                                    person.fees.rate) /
                                  100
                                : '0'
                            }}
                          </div>
                          <div v-if="toggleType[index] === 'update'">
                            {{
                              person.fees && person.fees.rate
                                ? person.fees.rate *
                                  parseInt(hourCal[index] ? hourCal[index] : 0)
                                : '0'
                            }}
                          </div>
                        </div>
                        {{ personnelPayToggle }}
                        <div class="col column items-center">
                          <div>Pay</div>
                          <div class="q-mr-sm">
                            <q-toggle
                              size="xs"
                              v-model="personnelPayToggle[index].value"
                              @input="
                                onPersonnelPaidToggleClick(
                                  index,
                                  person.fees,
                                  hourCal,
                                  personnelPayToggle[index].value
                                )
                              "
                            />
                          </div>
                        </div>
                        <div class="col column items-center">
                          <div>Paid</div>
                          <div v-if="toggleType[index] === 'dollar'">
                            $
                            {{
                              person.fees && person.fees.rate
                                ? person.fees.rate
                                : '0'
                            }}
                          </div>

                          <div
                            v-if="
                              toggleType[index] === 'percentage' && person.fees
                            "
                          >
                            $
                            {{
                              ((amountAvailableForCommissions
                                ? amountAvailableForCommissions
                                : addDisbursement.companyFee) *
                                person.fees.rate) /
                              100
                                ? ((amountAvailableForCommissions
                                    ? amountAvailableForCommissions
                                    : addDisbursement.companyFee) *
                                    person.fees.rate) /
                                  100
                                : '0'
                            }}
                          </div>
                          <div v-if="toggleType[index] === 'update'">
                            {{
                              person.fees && person.fees.rate
                                ? person.fees.rate *
                                  parseInt(hourCal[index] ? hourCal[index] : 0)
                                : '0'
                            }}
                          </div>
                        </div>
                      </div>

                      <div class="row" style="width:100%">
                        <div>Rate</div>
                        <div class="row full-width">
                          <q-input
                            v-if="toggleType[index] == 'dollar'"
                            :disable="personnelPayToggle[index].value == false"
                            prefix="$"
                            type="number"
                            dense
                            outlined
                            style="width:20%;"
                            v-model.number="personnelPaidAmount[index]"
                            @input="onTotalCommission(index)"
                          />

                          <q-input
                            v-if="toggleType[index] == 'percentage'"
                            :disable="personnelPayToggle[index].value == false"
                            suffix="%"
                            dense
                            outlined
                            style="width:20%"
                            v-model.number="personnelPaidAmount[index]"
                            @input="onTotalCommission(index)"
                          />
                          <div
                            class="row"
                            style="width:36%"
                            v-if="toggleType[index] == 'update'"
                          >
                            <q-input
                              :disable="
                                personnelPayToggle[index].value == false
                              "
                              suffix="/hr"
                              style="width:50%"
                              dense
                              outlined
                              v-model.number="personnelPaidAmount[index]"
                              @input="onTotalCommission(index)"
                            />

                            <div class="text-primary q-px-xs q-my-sm">X</div>
                            <q-input
                              :disable="
                                personnelPayToggle[index].value == false
                              "
                              v-model.number="hourCal[index]"
                              dense
                              style="width:34% ;"
                              outlined
                              @input="onTotalCommission(index)"
                            />
                          </div>
                          <div>
                            <td>
                              <div>
                                <q-btn-toggle
                                  @input="onTotalCommission(index)"
                                  class="q-ml-xs"
                                  v-model="toggleType[index]"
                                  push
                                  glossy
                                  size="md"
                                  toggle-color="primary"
                                  :options="[
                                    { label: ' $', value: 'dollar' },
                                    { label: ' %', value: 'percentage' },
                                    { value: 'update', icon: 'update' }
                                  ]"
                                ></q-btn-toggle>
                              </div>
                            </td>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>

              <div class="row q-my-md">
                <span class="col-8">Total Amount to Company</span>
                <div class="q-mr-xl text-bold">
                  $ {{ netExpenseToPayByCompany }}
                </div>
              </div>
            </q-card>
          </q-form>
        </div>
        <q-btn
          label="Save"
          color="primary"
          class="single-next-button-style"
          size="'xl'"
          @click="onSaveDisbursement"
        />
      </q-card>
    </q-dialog>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none"
          >Are you sure ! You want to delete this payment!</q-card-section
        >

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="alert = false"
          ></q-btn>
          <q-btn
            flat
            label="Delete"
            color="primary"
            v-close-popup
            @click="deletePayment(currenPaymentID)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alertForDisbursement">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none"
          >Are you sure ! You want to delete this Disbursement!</q-card-section
        >

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="alert = false"
          ></q-btn>
          <q-btn
            flat
            label="Delete"
            color="primary"
            v-close-popup
            @click="deleteDisbursement(currentDisbursementID)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="alertForExpense">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none"
          >Are you sure ! You want to delete this Expense!</q-card-section
        >

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="alert = false"
          ></q-btn>
          <q-btn
            flat
            label="Delete"
            color="primary"
            v-close-popup
            @click="deleteFinalexpense(currentExpenseID)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import { dateToShow } from '@utils/date';
import { onPhoneNumberClick, onEmailClick } from '@utils/clickable';
import { validateDate } from '@utils/validation';
import { dateToSend } from '@utils/date';
import { date } from 'quasar';
export default {
  name: 'ClaimLedger',
  components: {
    CustomBar
  },
  data() {
    return {
      amountAvailableForCommissions: 0,
      hourCal: [],
      toggleType: [],
      commissions: [],
      personnelPaidAmount: [],
      personnelRateType: '',
      rateType: [],
      personnelPayToggle: [{ value: false }],
      currenPaymentID: '',
      currentDisbursementID: '',
      expenseID: '',
      alreadyPaidByClient: 0,
      alreadyPaidByCompany: 0,
      alreadyPaidByClientAndCompany: 0,
      alert: false,
      alertForExpense: false,
      alertForDisbursement: false,
      currentExpenseID: '',
      editPaymentId: '',
      companyPerHour: 0,
      isExpenseEdit: false,
      partialCompanyValue: '',
      finalExpenses: [],
      totalAmount: null,
      netExpenseToPayByBoth: null,
      netExpenseToPayByClient: 0,
      netExpenseToPayByCompany: 0,
      netCommissionToPayByPersonnel: 0,
      clientAndCompanyAmount: [],
      clientAmount: [],
      feesType: 'dollar',
      companyAmounts: [],
      totalExpensesOfClient: 0,
      totalExpensesOfClientAndCompany: 0,
      totalExpensesOfCompany: 0,
      wantToPay: [],
      wantToPayClient: [],
      wantToPayCompany: [],
      clientAndCompany: [],
      clientOnly: [],
      companyOnly: [],
      fakeDisbustments: 2000,
      showValue: false,
      showExpences: false,
      options: [
        { value: 'Client', machineValue: 'client' },
        { value: 'Company', machineValue: 'company' },
        { value: 'Client and Company', machineValue: 'client_company' }
      ],

      payments: {
        remainingAmount: 0,
        date: '',
        amountsOfPayment: '',
        checkReference: '',
        netSettlement: '',
        paidToDate: '',
        settlements: [],
        outstanding: '',
        aimToApply: '',
        notes: ''
      },
      addDisbursement: {
        companyFee: 0,

        amountToDisbuse: '',
        amount: '',
        paidToClient: '',
        paidToCompany: '',
        expenses: []
      },
      addexpenses: {
        amount: '',
        receviedDate: '',
        reference: '',
        payee: '',
        payableBy: {
          value: '',
          machineValue: ''
        },
        desc: ''
      },
      date: '',
      checkReference: '',
      amountsOfPayment: null,
      addPaymentDialog: false,
      toggleOnOff: false,
      addExpensesDialog: false,
      addDisbursementDialog: false,
      editPaymentDialog: false
    };
  },

  computed: {
    ...mapGetters([
      'estimator',
      'selectedClaimId',
      'account',
      'payment',
      'expenses',
      'disbursements',
      'personnel'
    ])
  },
  async created() {
    this.getEstimateInfo(this.selectedClaimId);
    this.getAllPayment(this.selectedClaimId);
    this.getAllDisbursements(this.selectedClaimId);
    this.getAllExpenses(this.selectedClaimId);
    this.getPersonnelInfo(this.selectedClaimId);
    await this.getAccountDetails(this.selectedClaimId);
    await this.getAccountDetails(this.selectedClaimId).then(async () => {
      if (this.account.settlements) {
        this.account.settlements.forEach(val => {
          this.payments.settlements.push({
            id: val.id,
            amountPaid: 0
          });
          this.showValue = true;
        });
      }
    });
    this.$emit('scrollAfterCreation', true);
  },
  methods: {
    ...mapMutations(['setPersonnel']),
    ...mapActions([
      'editPersonnel',
      'getEstimateInfo',
      'addClaimEstimator',
      'getAccountDetails',
      'getAllPayment',
      'getAllExpenses',
      'addPayment',
      'getAllDisbursements',
      'addExpenses',
      'createDisbursement',
      'deleteExpenses',
      'deleteSinglePayment',
      'editPayment',
      'editExpenses',
      'deleteSingleDisbursement',
      'editClaimInfo',
      'getPersonnelInfo'
    ]),
    onPhoneNumberClick,
    onEmailClick,
    validateDate,
    dateToShow,
    dateToSend,
    toDisbursement() {
      this.getPersonnelInfo(this.selectedClaimId);

      if (this.personnel.personnel && this.personnel.personnel.length) {
        for (let i = 0; i < this.personnel.personnel.length; i++) {
          this.personnelPayToggle.push({
            value: false
          });
          this.hourCal[i] = 1;
          this.personnelPaidAmount.push(
            parseInt(
              this.personnel.personnel[i].fees &&
                this.personnel.personnel[i].fees.rate
                ? this.personnel.personnel[i].fees.rate
                : 0
            )
          );
          this.toggleType.push(
            this.personnel.personnel[i].fees &&
              this.personnel.personnel[i].fees.type
              ? this.personnel.personnel[i].fees.type
              : 'dollar'
          );
        }
      }
    },
    onFillingCompany() {
      let total = 0;
      for (var i in this.companyAmounts) {
        this.companyOnly[i].paid = parseInt(this.companyAmounts[i]);
        total += parseInt(this.companyAmounts[i]);
      }
      this.amountAvailableForCommissions =
        this.addDisbursement.companyFee - total;
      this.netExpenseToPayByCompany = this.amountAvailableForCommissions;
    },
    //this function is used to calculate the final commision. here we add only those filled data whose toggle is ON
    onTotalCommission(index) {
      this.onFillingCompany();
      var totalRate = 0;
      for (let i = 0; i < this.toggleType.length; i++) {
        if (
          this.toggleType[i] == 'dollar' &&
          this.personnelPayToggle[i].value
        ) {
          totalRate += this.personnelPaidAmount[i]
            ? this.personnelPaidAmount[i]
            : 0;
        } else if (
          this.toggleType[i] == 'percentage' &&
          this.personnelPayToggle[i].value
        ) {
          totalRate +=
            (this.amountAvailableForCommissions *
              parseInt(
                this.personnelPaidAmount[i] ? this.personnelPaidAmount[i] : 0
              )) /
            100;
        } else if (
          this.toggleType[i] == 'update' &&
          this.personnelPayToggle[i].value
        ) {
          totalRate +=
            (this.personnelPaidAmount[i] ? this.personnelPaidAmount[i] : 0) *
            parseInt(this.hourCal[i] ? this.hourCal[i] : 0);
        }
      }

      this.netExpenseToPayByCompany =
        this.amountAvailableForCommissions - totalRate;
      if (this.personnel.personnel[index].fees)
        this.personnel.personnel[index].fees.rate = this.personnelPaidAmount[
          index
        ];
    },
    /* Toggle button Function  for company   */
    setValueToPayCompany(i, value) {
      if (this.wantToPayCompany[i].value) {
        this.companyAmounts[i] = value;
      } else {
        this.companyAmounts[i] = 0;
      }

      // this.companyOnly[i].amount;
      this.onFillingCompany();
    },
    /* Toggle button Function for client     */
    setValueToPayClient(i, value) {
      if (this.wantToPayClient[i].value) {
        this.clientAmount[i] = value;
      } else {
        this.clientAmount[i] = 0;
      }

      this.onFillingClient();
    },
    /* Toggle button Function for company and client     */
    setValueToPayClientAndCompany(i, value) {
      if (this.wantToPay[i].value) {
        this.clientAndCompanyAmount[i] = value;
      } else {
        this.clientAndCompanyAmount[i] = 0;
      }
      // this.clientAndCompanyAmount[i] = value;
      this.onFillingValue();
    },

    // Toggle Button Function for Personnel
    onPersonnelPaidToggleClick(index, fees, hourCal, toggleState) {
      this.onFillingCompany();
      if (toggleState) {
        this.personnelPaidAmount[index] = parseInt(
          fees && fees.rate ? fees.rate : 0
        );
      }
      var totalRate = 0;
      for (let i = 0; i < this.toggleType.length; i++) {
        if (
          this.personnelPayToggle[i].value &&
          this.toggleType[i] == 'dollar'
        ) {
          totalRate += this.personnelPaidAmount[i]
            ? this.personnelPaidAmount[i]
            : 0;
        } else if (
          this.personnelPayToggle[i].value &&
          this.toggleType[i] == 'percentage'
        ) {
          totalRate +=
            (this.amountAvailableForCommissions * this.personnelPaidAmount[i]) /
            100;
        } else if (
          this.personnelPayToggle[i].value &&
          this.toggleType[i] == 'update'
        ) {
          totalRate +=
            this.personnelPaidAmount[i] * parseInt(hourCal[i] ? hourCal[i] : 1);
        }
      }
      this.netExpenseToPayByCompany =
        this.amountAvailableForCommissions - totalRate;
    },

    /* Hour To Fees Calculation     */
    hourToFeeCalculation() {
      this.addDisbursement.companyFee =
        this.companyPerHour * this.partialCompanyValue;

      this.netExpenseToPayByClient =
        this.addDisbursement.amountToDisbuse -
        this.addDisbursement.companyFee -
        this.netExpenseToPayByBoth;

      this.netExpenseToPayByCompany = this.addDisbursement.companyFee;
    },
    /* Open Expenses Dialog Box     */

    openAddExpensesDialog() {
      this.isExpenseEdit = false;

      (this.addexpenses = {
        amount: '',
        receviedDate: '',
        reference: '',
        payee: '',
        payableBy: {
          value: '',
          machineValue: ''
        },
        desc: ''
      }),
        (this.addexpenses.receviedDate = date.formatDate(
          Date.now(),
          'MM/DD/YYYY'
        ));
      this.expenseID = '';
      this.addExpensesDialog = true;
    },
    /* Open Payment Dialog Box     */

    openAddPaymentDialog() {
      this.editPaymentId = '';
      this.payments.date = date.formatDate(Date.now(), 'MM/DD/YYYY');
      this.payments.amountsOfPayment = '';
      this.payments.checkReference = '';
      this.payments.notes = '';
      for (let i in this.payments.settlements) {
        this.payments.settlements[i].amountPaid = 0;
      }

      // this.payments.settlements = [];
      this.addPaymentDialog = true;
    },
    /* Open Disbursement Dialog Box     */

    openDisbursementBox() {
      this.commissions = [];
      this.totalExpensesOfClientAndCompany = 0;
      this.totalExpensesOfCompany = 0;
      this.totalExpensesOfClient = 0;
      this.finalExpenses = [];
      this.alreadyPaidByClientAndCompany = 0;
      this.alreadyPaidByClient = 0;
      this.alreadyPaidByCompany = 0;
      this.clientAndCompanyAmount = [];
      this.companyAmounts = [];
      this.personnelPaidAmount = [];
      this.clientAmount = [];
      this.companyPerHour = 0;
      this.totalExpensesOfClient = this.totalExpensesOfClientAndCompany = this.totalExpensesOfCompany = 0;
      this.addDisbursement.amountToDisbuse = this.account.pendingDisbursement;

      if (this.addDisbursement.amountToDisbuse === 0) {
        this.addDisbursement.companyFee = this.partialCompanyValue = this.account.fees.rate = 0;
      }

      this.addDisbursement.companyFee = this.partialCompanyValue =
        this.account.fees && this.account.fees.rate
          ? this.account.fees.rate
          : 0;
      this.netExpenseToPayByClient =
        this.addDisbursement.amountToDisbuse - this.addDisbursement.companyFee;
      this.clientAndCompany = [];
      this.wantToPay = [];
      this.wantToPayClient = [];
      this.wantToPayCompany = [];
      this.clientOnly = [];
      this.companyOnly = [];
      /* Dividing the array into 3 different array ! client , company, client & company     */
      if (this.expenses.expenses) {
        this.expenses.expenses.forEach(val => {
          if (val.payableBy.machineValue == 'client_company') {
            this.clientAndCompany.push({
              amount: val.amount,
              id: val.id,
              payee: val.payee,
              dilivered: val.paid,
              paid: 0
            });
            this.alreadyPaidByClientAndCompany =
              this.alreadyPaidByClientAndCompany + val.paid;
            this.totalExpensesOfClientAndCompany =
              this.totalExpensesOfClientAndCompany + val.amount;
            this.wantToPay.push({ value: false });
          }
          if (val.payableBy.machineValue == 'client') {
            this.clientOnly.push({
              amount: val.amount,
              id: val.id,
              payee: val.payee,
              dilivered: val.paid,
              paid: 0
            });
            this.alreadyPaidByClient = this.alreadyPaidByClient + val.paid;

            this.totalExpensesOfClient =
              this.totalExpensesOfClient + val.amount;
            this.wantToPayClient.push({ value: false });
          }
          if (val.payableBy.machineValue == 'company') {
            this.companyOnly.push({
              amount: val.amount,
              id: val.id,
              payee: val.payee,
              dilivered: val.paid,
              paid: 0
            });
            this.alreadyPaidByCompany = this.alreadyPaidByCompany + val.paid;
            this.totalExpensesOfCompany =
              this.totalExpensesOfCompany + val.amount;
            this.wantToPayCompany.push({ value: false });
          }

          this.showValue = true;
        });
      }

      this.netExpenseToPayByCompany =
        this.account.fees && this.account.fees.rate
          ? this.account.fees.rate
          : 0;
      this.feesType = this.account.fees.type;
      if (this.account.fees.type == 'update') {
        this.hourToFeeCalculation();
      } else if (this.account.fees.type == 'percentage') {
        this.CalculationOfCompanyFee(this.partialCompanyValue);
      }

      this.addDisbursementDialog = true;
      this.getAccountDetails(this.selectedClaimId);
      this.getPersonnelInfo(this.selectedClaimId);
    },

    /* delete Api's   */

    /* delete Expense   */
    async deleteFinalexpense() {
      const payload = {
        claimID: this.selectedClaimId,
        expenseID: this.currentExpenseID
      };
      await this.deleteExpenses(payload);
      await this.getAllExpenses(this.selectedClaimId);
      await this.getAccountDetails(this.selectedClaimId);
    },
    /* delete Disbursement   */
    async deleteDisbursement(value) {
      const payload = {
        claimID: this.selectedClaimId,
        paymentId: this.currentDisbursementID
      };
      await this.deleteSingleDisbursement(payload);
      await this.getAllDisbursements(this.selectedClaimId);
      await this.getAllExpenses(this.selectedClaimId);
      await this.getAccountDetails(this.selectedClaimId);
    },
    /* delete Payment   */
    async deletePayment(value) {
      const payload = {
        claimID: this.selectedClaimId,
        paymentId: this.currenPaymentID
      };
      await this.deleteSinglePayment(payload);
      await this.getAllPayment(this.selectedClaimId);
      await this.getAccountDetails(this.selectedClaimId);
    },

    /* All The Calculations   */

    remainingCalculation() {
      this.payments.remainingAmount = this.payments.amountsOfPayment;
    },
    checkValidationForDisbursement() {
      return this.account.pendingDisbursement + 1;
    },
    checkValidation() {
      let sum = 0;
      for (let i in this.payments.settlements) {
        sum = sum + this.payments.settlements[i].amountPaid;
      }
      this.payments.remainingAmount = this.payments.amountsOfPayment - sum;
      return this.payments.remainingAmount;
    },

    calculateRemainingAmount(index) {
      let sum = 0;
      for (let i in this.payments.settlements) {
        sum = sum + this.payments.settlements[i].amountPaid;
      }
      this.payments.remainingAmount = this.payments.amountsOfPayment - sum;
    },
    /* Save Api for Payment    */

    async onClickSaveEditPayment() {
      const valid = await this.$refs.EditPaymentForm.validate();
      if (valid) {
        const payload = {
          id: this.selectedClaimId,
          paymentID: this.editPaymentId,

          data: {
            amount: this.payments.amountsOfPayment,

            receviedDate: dateToSend(this.payments.date),
            reference: this.payments.checkReference,
            settlements: this.payments.settlements,
            note: this.payments.notes
          }
        };
        const success = await this.editPayment(payload);
        if (success) {
          await this.getAllPayment(this.selectedClaimId);
          await this.getAccountDetails(this.selectedClaimId);
          this.editPaymentDialog = false;
        }
      }
    },

    async deleteExpense(value) {
      this.currentExpenseID = value.id;
      this.alertForExpense = true;
    },
    editPayments(value) {
      this.editPaymentId = value.id;
      this.payments.remainingAmount = 0;
      this.payments.date = dateToShow(value.receviedDate);
      this.payments.amountsOfPayment = value.amount;
      this.payments.checkReference = value.reference;
      this.payments.notes = value.notes ? value.notes : '';
      for (let i in this.payments.settlements) {
        this.payments.settlements[i].amountPaid = value.settlements[i]
          ? value.settlements[i].amountPaid
          : 0;
      }
      this.editPaymentDialog = true;
    },

    deletePrePayment(value) {
      this.currenPaymentID = value.id;
      this.alert = true;
    },
    askToDeleteDisbursement(value) {
      this.currentDisbursementID = value.id;
      this.alertForDisbursement = true;
    },

    onFillingClient() {
      this.totalAmount = 0;
      for (var i in this.clientAmount) {
        this.clientOnly[i].paid = parseInt(this.clientAmount[i]);
        this.totalAmount += parseInt(this.clientAmount[i]);
      }
      this.netExpenseToPayByClient =
        this.addDisbursement.amountToDisbuse -
        this.addDisbursement.companyFee -
        this.totalAmount -
        this.netExpenseToPayByBoth;
    },
    setCompanyTotalAmount(value) {
      this.netExpenseToPayByCompany = parseInt(value);
      this.netExpenseToPayByClient =
        this.addDisbursement.amountToDisbuse -
        this.addDisbursement.companyFee -
        this.netExpenseToPayByBoth;
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    },
    CalculationOfCompanyFee(value) {
      this.addDisbursement.companyFee = this.netExpenseToPayByCompany =
        (value / 100) *
        (this.addDisbursement.amountToDisbuse - this.netExpenseToPayByBoth);
      this.netExpenseToPayByCompany;

      this.netExpenseToPayByClient =
        this.addDisbursement.amountToDisbuse -
        this.addDisbursement.companyFee -
        this.netExpenseToPayByBoth;

      this.netExpenseToPayByCompany = this.addDisbursement.companyFee;
    },
    setValueForClientAndCompany() {
      this.netExpenseToPayByClient =
        this.addDisbursement.amountToDisbuse -
        this.addDisbursement.companyFee -
        this.netExpenseToPayByBoth;

      this.netExpenseToPayByCompany = this.addDisbursement.companyFee;
    },

    onFillingValue() {
      let total = 0;
      for (var i in this.clientAndCompanyAmount) {
        this.clientAndCompany[i].paid = parseInt(
          this.clientAndCompanyAmount[i]
        );

        total += parseInt(this.clientAndCompanyAmount[i]);
      }
      this.netExpenseToPayByBoth = total;
      this.netExpenseToPayByClient =
        this.addDisbursement.amountToDisbuse -
        this.addDisbursement.companyFee -
        this.netExpenseToPayByBoth;

      this.netExpenseToPayByCompany = this.addDisbursement.companyFee;
    },
    closeDisbursmentBox() {
      this.addDisbursement.amountToDisbuse = 0;
      this.partialCompanyValue = 0;
      this.addDisbursement.companyFee = 0;
      this.clientAndCompany = [];
      this.clientOnly = [];
      this.companyOnly = [];
      this.addDisbursementDialog = false;
    },

    async onClickSavePayment() {
      const valid = await this.$refs.paymentForm.validate();
      if (valid) {
        const payload = {
          id: this.selectedClaimId,
          data: {
            amount: this.payments.amountsOfPayment,

            receviedDate: dateToSend(this.payments.date),
            reference: this.payments.checkReference,
            settlements: this.payments.settlements,
            note: this.payments.notes
          }
        };

        const success = await this.addPayment(payload);
        if (success) {
          this.getAllPayment(this.selectedClaimId);
          await this.getAccountDetails(this.selectedClaimId);
          this.addPaymentDialog = false;
        }
      }
    },

    setResponsibleBy(data) {
      const obj = this.options.find(item => {
        return item.value === data.value;
      });
      this.addexpenses.payableBy.machineValue = obj.machineValue;
      this.addexpenses.payableBy.value = obj.value;
    },

    async addExpensesSaveClick() {
      const validate = await this.$refs.addExpensesForm.validate();
      if (validate) {
        const payload = {
          id: this.selectedClaimId,
          expenseID: this.expenseID,

          data: {
            amount: this.addexpenses.amount,
            receviedDate: dateToSend(this.addexpenses.receviedDate),
            reference: this.addexpenses.reference,
            payee: this.addexpenses.payee,
            payableBy: {
              value: this.addexpenses.payableBy.value,
              machineValue: this.addexpenses.payableBy.machineValue
            },
            desc: this.addexpenses.desc
          }
        };

        if (this.isExpenseEdit) {
          const success = await this.editExpenses(payload);
          if (success) {
            await this.getAllExpenses(this.selectedClaimId);
            await this.getAccountDetails(this.selectedClaimId);
          }
        } else {
          const success = await this.addExpenses(payload);
          if (success) {
            await this.getAllExpenses(this.selectedClaimId);
            await this.getAccountDetails(this.selectedClaimId);
          }
        }
        this.addExpensesDialog = false;
      }
    },
    async onSaveDisbursement() {
      if (this.addDisbursement.amountToDisbuse < 1) {
        this.$q.notify({
          message: 'Amount to Disburse can Not be less than $1  ',
          position: 'top',
          type: 'negative'
        });
        return;
      }

      this.clientAndCompany.forEach(val => {
        this.finalExpenses.push({
          id: val.id,
          paid: parseInt(val.paid)
        });
      });
      this.clientOnly.forEach(val => {
        this.finalExpenses.push({
          id: val.id,
          paid: parseInt(val.paid)
        });
      });
      this.companyOnly.forEach(val => {
        this.finalExpenses.push({
          id: val.id,
          paid: parseInt(val.paid)
        });
      });
      this.personnel.personnel.forEach(val => {
        this.commissions.push({
          id: val.id,
          paid: val.fees.rate,
          payee: val.name,
          type: val.fees.type
        });
      });

      const payload = {
        id: this.selectedClaimId,
        data: {
          amount: this.addDisbursement.amountToDisbuse,
          paidToClient: this.netExpenseToPayByClient,
          paidToCompany: this.netExpenseToPayByCompany,
          expenses: this.finalExpenses,
          commissions: this.commissions
        }
      };
      const success = await this.createDisbursement(payload);

      // Calling the info API for updating the Company fee on Save
      const updatePayload = {
        id: this.selectedClaimId,
        data: {
          contractInfo: {
            fees: {
              type: this.feesType,
              rate:
                this.feesType == 'percentage' && this.feesType == 'updated'
                  ? this.partialCompanyValue
                  : this.addDisbursement.companyFee
            }
          }
        }
      };

      await this.editClaimInfo(updatePayload);

      //Calling the Update Personnel Info API for updating the fees object
      for (let index = 0; index < this.commissions.length; index++) {
        var personnelPayload = {
          id: this.selectedClaimId,
          personnelId: this.commissions[index].id,
          companyData: {
            personnel: {
              personnelID: this.commissions[index].id,
              fees: {
                type: this.commissions[index].type,
                rate: this.commissions[index].paid
                  ? this.commissions[index].paid
                  : 0
              }
            }
          }
        };
        await this.editPersonnel(personnelPayload);
      }

      if (success) {
        await this.getAllDisbursements(this.selectedClaimId);
        await this.getAccountDetails(this.selectedClaimId);
        await this.getAllExpenses(this.selectedClaimId);
        this.clientAndCompany = [];
        this.clientOnly = [];
        this.companyOnly = [];
        this.wantToPayCompany = [];
        this.wantToPay = [];
        this.commissions = [];
        this.wantToPayClient = [];
        this.clientAndCompanyAmount = [];
        this.companyAmounts = [];
        this.personnelPaidAmount = [];
        this.clientAmount = [];
        this.netExpenseToPayByBoth = 0;
        this.addDisbursementDialog = false;

        this.addDisbursement.amountToDisbuse = 0;
        this.partialCompanyValue = 0;
        this.addDisbursement.companyFee = 0;
      }
    },
    editExpense(value) {
      this.isExpenseEdit = true;
      this.addexpenses = value;
      this.expenseID = value.id;
      this.addexpenses.receviedDate = dateToShow(value.receviedDate);
      this.addExpensesDialog = true;
    }
  }
};
</script>
<style lang="css">
.name-ellipsis {
  white-space: nowrap;
  max-width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
