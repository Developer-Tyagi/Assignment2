<template>
  <div>
    <q-card class="q-pa-md">
      <div class="form-heading  row q-ml-sm">
        Carrier Info
        <q-icon
          v-if="selectedClaimCarrier.carrier.id"
          size="xs"
          name="create "
          color="primary"
          @click="onAddCarrierClick"
          class="q-ml-auto"
        ></q-icon>
        <q-icon
          v-if="selectedClaimCarrier.carrier.id"
          class="q-my-auto q-ml-sm"
          name="delete"
          size="xs"
          color="primary"
          @click="onClickDelete(selectedClaimCarrier.carrier.id)"
        />
        <img
          v-if="!selectedClaimCarrier.carrier.id"
          class="q-ml-auto"
          src="~assets/add.svg"
          alt="add_icon"
          height="20px"
          @click="onAddCarrierClick"
        />
      </div>

      <div
        class="q-pa-sm"
        v-if="selectedClaimCarrier.carrier && selectedClaimCarrier.carrier.id"
      >
        <div class="form-heading  row" v-model="carrierName">
          {{ selectedClaimCarrier.carrier.name }}
        </div>

        <div class="row q-mt-sm">
          <div
            class="col-7 heading-light"
            v-if="selectedClaimCarrier.carrier.address"
          >
            <div>
              {{
                selectedClaimCarrier.carrier.address.houseNumber
                  ? selectedClaimCarrier.carrier.address.houseNumber
                  : '-'
              }}

              {{
                selectedClaimCarrier.carrier.address.address1
                  ? selectedClaimCarrier.carrier.address.address1
                  : '-'
              }}
            </div>
            <div
              v-if="
                selectedClaimCarrier.carrier.address &&
                  selectedClaimCarrier.carrier.address.address2
              "
            >
              {{ selectedClaimCarrier.carrier.address.address2 }}
            </div>
            <div>
              {{
                selectedClaimCarrier.carrier.address.addressLocality
                  ? selectedClaimCarrier.carrier.address.addressLocality
                  : '-'
              }}
              ,
              {{
                selectedClaimCarrier.carrier.address.addressRegion
                  ? toGetStateShortName(
                      selectedClaimCarrier.carrier.address.addressRegion
                    )
                  : '-'
              }}

              {{
                selectedClaimCarrier.carrier.address.postalCode
                  ? selectedClaimCarrier.carrier.address.postalCode
                  : '-'
              }}

              <q-icon
                name="place"
                color="primary"
                class="q-ml-auto"
                @click="sendMap(selectedClaimCarrier.carrier.address)"
                style="position: absolute; right: 20px"
                size="sm"
              ></q-icon>
            </div>
          </div>
        </div>
        <div
          class="q-mt-xs"
          v-for="phone in selectedClaimCarrier.carrier.phoneNumber"
        >
          <span v-if="phone.type">{{ phone.type ? phone.type : '-' }} : </span>
          <span
            class="clickLink"
            @click="onPhoneNumberClick(phone.number, $event)"
            >{{ phone.number ? phone.number : '-' }}</span
          >
        </div>
        <div
          class="click-link"
          @click="onEmailClick(selectedClaimCarrier.carrier.email, $event)"
        >
          {{
            selectedClaimCarrier.carrier.email
              ? selectedClaimCarrier.carrier.email
              : '-'
          }}
        </div>
      </div>
      <div v-else class="heading-light col q-ma-xs">
        Carrier info not added yet.
      </div>
    </q-card>
    <q-card class="q-mt-sm  q-pa-md">
      <div class="row">
        <span class="form-heading col q-ma-xs"> Carrier Personnel Info</span>
        <img
          class="q-mx-xs q-my-auto"
          src="~assets/add.svg"
          alt="add_icon"
          height="20px"
          @click="onAddAdjustorClick"
        />
      </div>
      <div v-if="selectedClaimCarrier.carrier.personnel">
        <div
          v-for="(personnel, index) in selectedClaimCarrier.carrier.personnel"
        >
          <div class="q-pa-sm text-bold row">
            <span v-if="personnel.name">
              {{ personnel.name ? personnel.name : '-' }}</span
            >
            <!-- <div v-if="personnel.role">
              <q-badge class="q-px-sm q-py-xs q-ml-xs" size="xs">
                {{ personnel.role.value }}</q-badge
              >
            </div> -->
            <q-icon
              v-if="personnel.id"
              size="xs"
              name="create "
              color="primary"
              class="q-ml-auto"
              @click="onEditAdjustorPersonnel(index)"
            ></q-icon>
            <q-icon
              v-if="personnel.id"
              class="q-my-auto q-ml-sm"
              name="delete"
              size="xs"
              color="primary"
              s
              @click="onClickPersonnelDelete(personnel.id)"
            />
          </div>

          <span class="col-7 heading-light" v-if="personnel.address">
            <div class="row q-ml-sm" v-if="personnel.address.houseNumber">
              {{
                personnel.address.houseNumber
                  ? personnel.address.houseNumber
                  : '-'
              }}
              ,
              {{
                personnel.address.address1 ? personnel.address.address1 : '-'
              }}
            </div>
            <div
              class="q-ml-sm"
              v-if="personnel.address && personnel.address.address2"
            >
              {{ personnel.address.address2 }}
            </div>
            <div class="row q-ml-sm" v-if="personnel.address.addressLocality">
              {{
                personnel.address.addressLocality
                  ? personnel.address.addressLocality
                  : '-'
              }}
              ,
              {{
                personnel.address.addressRegion
                  ? toGetStateShortName(personnel.address.addressRegion)
                  : '-'
              }}
              {{
                personnel.address.postalCode
                  ? personnel.address.postalCode
                  : '-'
              }}
            </div>
          </span>
          <span
            class="click-link q-ml-sm"
            @click="onEmailClick(personnel.email, $event)"
            >{{ personnel.email ? personnel.email : '-' }}</span
          >
          <div class="q-mt-xs q-ml-sm" v-for="phone in personnel.phoneNumber">
            <div v-if="phone.type && phone.number">
              <span>{{ phone.type ? phone.type : '-' }} : </span>
              <span
                class="clickLink"
                @click="onPhoneNumberClick(phone.number, $event)"
                >{{ phone.number ? phone.number : '-' }}</span
              >
            </div>
            <div v-else>No Phone</div>
          </div>

          <q-separator class="q-mb-sm q-mt-sm" />
        </div>
      </div>
      <div v-else class="heading-light q-ma-xs">
        no personnel has been added.
      </div>
    </q-card>
    <q-card class="q-mt-sm  q-pa-md" v-if="policy.policyInfo">
      <div class="row q-mt-xs">
        <span class="form-heading "> Policy Info</span>
        <q-icon
          name="edit"
          size="xs"
          color="primary"
          class="q-ml-auto"
          @click="onEditPolicyInfo"
        />
      </div>
      <div class="q-ml-xs">
        <div class="row q-mt-sm">
          <span class="heading-light col"> Policy Number </span>
          <span class="q-ml-md col">
            {{ policy.policyInfo ? policy.policyInfo.number : '-' }}
          </span>
        </div>

        <div class="row q-mt-xs">
          <span class="heading-light col"> Start Date </span>
          <span class="q-ml-md col" v-if="policy.policyInfo">
            {{ policy.policyInfo.effectiveDate | moment('MM/DD/YYYY') }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> End Date </span>
          <span class="q-ml-md col" v-if="policy.policyInfo">
            {{ policy.policyInfo.expirationDate | moment('MM/DD/YYYY') }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Category </span>
          <span
            class="q-ml-md col"
            v-if="policy.policyInfo && policy.policyInfo.category"
          >
            {{
              policy.policyInfo.category
                ? policy.policyInfo.category.value
                  ? policy.policyInfo.category.value
                  : '-'
                : '-'
            }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Policy Type </span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.type
                ? policy.policyInfo.type.value
                  ? policy.policyInfo.type.value
                  : '-'
                : '-'
            }}
          </span>
        </div>
        <div class="row q-mt-xs" v-if="policy.policyInfo">
          <span class="heading-light col"> Appraisal Clause </span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.hasAppraisalClause
                ? policy.policyInfo.hasAppraisalClause
                : '-'
            }}</span
          >
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Total Amount of Policy </span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.totalAmount
                ? policy.policyInfo.totalAmount
                : '-'
            }}</span
          >
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Dwelling Limit (A) </span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.limitCoverage.dwelling
                ? policy.policyInfo.limitCoverage.dwelling
                : '-'
            }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Other Structures (B) </span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.limitCoverage.otherStructure
                ? policy.policyInfo.limitCoverage.otherStructure
                : '-'
            }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Contents Limit (C) </span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.limitCoverage.content
                ? policy.policyInfo.limitCoverage.content
                : '-'
            }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Loss of Use/Ale Limit (D) </span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.limitCoverage.lossOfUse
                ? policy.policyInfo.limitCoverage.lossOfUse
                : '-'
            }}
          </span>
        </div>

        <div class="row q-mt-xs">
          <span class="heading-light col"> Ordinance or Law</span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.ordinance ? policy.policyInfo.ordinance : '-'
            }}</span
          >
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Debris Removal</span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.debrisRemoval
                ? policy.policyInfo.debrisRemoval
                : '-'
            }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Mold Fungi</span>
          <span class="q-ml-md col">
            {{ policy.policyInfo.mold ? policy.policyInfo.mold : '-' }}</span
          >
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Business Interruption</span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.businessInt
                ? policy.policyInfo.businessInt
                : '-'
            }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Depreciation</span>
          <span class="q-ml-md col">
            {{ policy.policyInfo ? policy.policyInfo.depreciation : '-' }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col">Deductible</span>
          <span class="q-ml-md col">
            {{
              policy.policyInfo.deductibleAmount
                ? policy.policyInfo.deductibleAmount
                : '-'
            }}
          </span>
        </div>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Additional Details</span>
        </div>
        <q-card class="q-mt-sm q-pa-sm full-width q-mb-sm row">
          <span class="q-mb-lg col"> -</span>
        </q-card>
        <div class="row q-mt-xs">
          <span class="heading-light col"> Notes</span>
        </div>
        <q-card class="q-pa-sm full-width q-mt-sm row">
          <span class="q-mb-lg col"> -</span>
        </q-card>
      </div>
    </q-card>
    <q-separator />

    <!-- Insurance Info Dialog -->

    <q-dialog
      v-model="insuranceInfoDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="
            (insuranceInfoDialog = false), $emit('editCarrierDialog', false)
          "
          :dialogName="'Insurance Info'"
        />
        <div class="q-ma-sm mobile-container-page-without-search">
          <q-form ref="insuranceInfoForm" class="form-height">
            <InsuranceInfo
              :insuranceDetails="insuranceDetails"
              :policyInfo="true"
              :showAppraisal="true"
            />
          </q-form>

          <q-btn
            label="Save"
            class="single-next-button-style"
            @click="onSaveButtonClick('insuranceInfoDialog')"
            size="'xl'"
          />
        </div>
      </q-card>
    </q-dialog>

    <!-- Carriers List Dialog -->

    <q-dialog
      v-model="carriersListDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="
            (carriersListDialog = false), $emit('editCarrierDialog', false)
          "
          :dialogName="'Select Carrier'"
        />
        <CarriersList
          @addCarrier="openAddCarrierDialog"
          :showCarrierDetails="false"
          :selectCarrier="true"
          @afterSelecting="onCloseCarrierList"
          :claimCarrier="true"
          :selectedCarrierName="carrierName"
        />
      </q-card>
    </q-dialog>

    <!-- Add Carrier Dialog -->

    <q-dialog
      v-model="addCarrierDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <AddCarrier
          @closeDialog="addCarrierDialog = false"
          :componentName="constants.industries.CARRIER"
          @onAddCarrier="onSetCarrier"
        />
      </q-card>
    </q-dialog>

    <!-- Adjustor List Dialog  -->

    <q-dialog
      v-model="adjustorListDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          @closeDialog="
            (adjustorListDialog = false),
              (onClickUncheck = false),
              $emit('editCarrierDialog', false)
          "
          :dialogName="'Select Adjustor'"
        />

        <q-btn @click="onClickAddAdjustor" flat class="add-icon">
          <img src="~assets/addAdjustor.svg" height="120" width="24" />
        </q-btn>

        <div class="actions-div">
          <div v-if="!params.industry" class="q-ml-xs row q-pr-md">
            <div class="row">
              <div @click="filterDialog = true" class="q-ml-md">
                <img src="~assets/filter.svg" /><span class="heading-light"
                  >Filter</span
                >
              </div>
            </div>
            <div class="q-ml-auto edit-icon">
              <q-btn
                v-if="params.role"
                class="q-ml-auto"
                color="white"
                text-color="grey"
                @click="clearFilter()"
                flat
                dense
                label="Clear"
              ></q-btn>
              <!-- Commented for some time -->
              <!-- <q-btn
                :disabled="isAssignDisabled"
                color="primary"
                class="q-mr-lg"
                size="sm"
                label="Assign"
                @click="assignDialog = true"
              /> -->
            </div>
          </div>
        </div>
        <div class="mobile-container-page">
          <div v-if="carrierPersonnel.personnel">
            <div
              v-for="personnel in carrierPersonnel.personnel"
              :key="carrierPersonnel.personnel.id"
              class="listing-item clients-list"
              style="overflow-y: auto"
            >
              <q-item-section @click="onCheckPersonnel(personnel)">
                <span>
                  <span class="text-bold"
                    >{{ personnel.fname }} {{ personnel.lname }}</span
                  >
                  <div v-if="personnel.address">
                    <div>
                      {{
                        personnel.address ? personnel.address.houseNumber : '-'
                      }}
                      {{
                        personnel.address.address1
                          ? personnel.address.address1
                          : '-'
                      }}
                    </div>
                    <div v-if="personnel.address && personnel.address.address2">
                      {{ personnel.address.address2 }}
                    </div>
                    <div class="row">
                      {{
                        personnel.address.addressLocality
                          ? personnel.address.addressLocality
                          : '-'
                      }},{{
                        personnel.address.addressRegion
                          ? toGetStateShortName(personnel.address.addressRegion)
                          : '-'
                      }}
                      {{
                        personnel.address.postalCode
                          ? personnel.address.postalCode
                          : '-'
                      }}
                    </div>
                  </div>
                  <div class="q-mt-xs" v-for="phone in personnel.phoneNumber">
                    <span v-if="phone.type"
                      >{{ phone.type ? phone.type : '' }} :
                    </span>
                    <span
                      class="clickLink"
                      @click="onPhoneNumberClick(phone.number, $event)"
                      >{{ phone.number ? phone.number : '-' }}</span
                    >
                  </div>
                  <span
                    class="click-link"
                    @click="onEmailClick(personnel.email, $event)"
                    >{{ personnel.email }}</span
                  >
                </span>
              </q-item-section>
              <q-icon
                v-if="checkID === personnel.id && onClickUncheck"
                name="done"
                size="xs"
                class="q-ml-auto"
              />
            </div>
          </div>
          <div v-else class="full-height full-width column">
            <div class="column absolute-center">
              <div style="color: #666666,align-items: center">
                You haven't added a Adjustor yet.
              </div>
              <img
                class="q-mx-lg q-pt-sm"
                src="~assets/add.svg"
                alt="add_icon"
                width="130px"
                height="100px"
                @click="addPersonnelDialog = true"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Add Adjustor Dialog -->

    <q-dialog
      v-model="addPersonnelDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Add Personnel'"
          @closeDialog="addPersonnelDialog = false"
        />
        <div class="mobile-container-page">
          <AddCarrierPersonnel :carrierPersonnel="personnel" />
        </div>
        <q-btn
          @click="onSaveCarrierPersonnel"
          label="Save"
          class="single-next-button-style"
          size="'xl'"
        />
      </q-card>
    </q-dialog>

    <!-- Edit Personnel Dialog -->

    <q-dialog
      v-model="editPersonnelDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <CustomBar
          :dialogName="'Edit Personnel'"
          @closeDialog="editPersonnelDialog = false"
        />
        <q-form ref="editPersonnel">
          <div class="mobile-container-page">
            <AddCarrierPersonnel :carrierPersonnel="editPersonnel" />
          </div>
        </q-form>
        <q-btn
          @click="onEditSaveCarrierPersonnel"
          label="Save"
          class="single-next-button-style"
          size="'xl'"
        />
      </q-card>
    </q-dialog>

    <!-- Filter Dialog  -->

    <q-dialog
      v-model="filterDialog"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-bar
          style="height: 51px; border-bottom: 1px solid #0000001f"
          class="bg-white"
        >
          <img
            src="~assets/close.svg"
            alt="close"
            @click="filterDialog = false"
          />
          <q-space />
          <div class="text-uppercase text-bold text-black">Filters</div>
          <q-space />
          <q-btn color="primary" text-color="white" @click="applyFilter()"
            >Apply</q-btn
          >
        </q-bar>
        <div class="mobile-container-page-without-search">
          <div
            v-for="filter in claimRoles"
            :key="filter.id"
            class="filters-list-item"
          >
            <div class="row">
              {{ filter.name }}
              <q-radio
                v-model="selectedFilter"
                :val="filter.machineValue"
                dense
                class="q-ml-auto"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- Assign Dialog -->

    <q-dialog v-model="assignDialog">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <div class="mobile-container-page">
          <div class="form-heading q-ml-sm text-h5">
            Assign to Claim as
          </div>
          <div class=" q-ma-lg">
            <div v-for="filter in claimRoles" :key="filter.id" class="q-mt-xs">
              <div class="row">
                <q-radio
                  @input="setFilterName(filter.name)"
                  v-model="assignFilter"
                  :val="filter.machineValue"
                  dense
                  class="q-mb-lg"
                />
                <div class="q-pt-none">
                  <span class="q-ml-sm q-mt-xs"> {{ filter.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white q-mb-md  ">
            <div class="row">
              <div class="q-ml-auto">
                <q-btn
                  @click="assignDialog = false"
                  color="primary"
                  flat
                  label="cancel"
                />
              </div>
              <div>
                <q-btn
                  color="primary"
                  flat
                  label="assign"
                  @click="onSelectPersonnel(personnelObject)"
                />
              </div>
            </div>
          </div>
        </div>
      </q-layout>
    </q-dialog>
    <q-dialog v-model="deleteAlertDialog">
      <q-card>
        <DeleteAlert
          @close="deleteAlertDialog = false"
          @onDelete="onDeleteCarrier"
        />
      </q-card>
    </q-dialog>
    <q-dialog v-model="deletePersonnelAlert">
      <q-card>
        <DeleteAlert
          @close="deletePersonnelAlert = false"
          @onDelete="onDeleteAdjustor"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomBar from 'components/CustomBar';
import ClaimDetail from 'components/ClaimDetail';
import moment from 'moment';
import { toGetStateShortName } from '@utils/common';
import InsuranceInfo from 'components/InsuranceInfo';
import AddCarrier from 'components/AddCarrier';
import DeleteAlert from 'components/DeleteAlert';
import CarriersList from 'components/CarriersList';
import { validateDate } from '@utils/validation';
import { onEmailClick, onPhoneNumberClick, sendMap } from '@utils/clickable';
import AddCarrierPersonnel from 'components/AddCarrierPersonnel';
import { dateToShow } from '@utils/date';
import { dateToSend } from '@utils/date';
import { date } from 'quasar';
import { constants } from '@utils/constant';

export default {
  name: 'CarrierAndPolicy',
  components: {
    CustomBar,
    InsuranceInfo,
    ClaimDetail,
    CarriersList,
    AddCarrier,
    AddCarrierPersonnel,
    DeleteAlert
  },

  data() {
    return {
      personnelId: '',
      deletePersonnelAlert: false,
      deleteAlertDialog: false,
      carrierID: '',
      params: {
        role: '',
        name: ''
      },
      onClickUncheck: false,
      isAssignDisabled: true,
      filterName: '',
      personnelObject: {},
      checkID: '',
      assignDialog: false,
      assignFilter: '',
      personnelID: '',
      id: '',
      editPersonnelDialog: false,
      selectedFilter: '',
      filterDialog: false,
      personnel: {
        options: [],
        role: { id: '', value: null, machineValue: '' },
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        },
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
          address1: '',
          address2: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        },
        phoneNumber: [
          {
            type: 'main',
            number: ''
          }
        ],
        email: '',

        notes: ''
      },
      editPersonnel: {
        options: [],
        role: { id: '', value: null, machineValue: '' },
        honorific: {
          id: '',
          value: 'Mr.',
          machineValue: 'mr_'
        },
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
          address1: '',
          address2: '',
          dropBox: {
            info: '',
            isPresent: false
          }
        },
        phoneNumber: [
          {
            type: 'main',
            number: ''
          }
        ],
        email: '',

        notes: ''
      },
      addPersonnelDialog: false,
      adjustorListDialog: false,
      carrierName: '',
      claimID: '',
      carrierDetails: '',
      carriersListDialog: false,
      addCarrierDialog: false,
      searchText: '',
      constants: constants,
      params: {
        name: ''
      },
      carrierListDialog: false,
      insuranceInfoDialog: false,
      insuranceDetails: {
        totalAmount: '',
        ordinance: '',
        debrisRemoval: '',
        mold: '',
        businessInt: '',
        hasAppraisalClause: false,
        hasClaimBeenFilledToggle: false,
        isThisIsForcedPlacedPolicyToggle: false,
        policy: {
          id: '',
          value: ''
        },
        type: '',
        details: '',
        id: '',
        machineValue: '',
        policyCategory: {
          id: '',
          value: '',
          machineValue: ''
        },
        carrierName: '',
        carrierId: '',
        insuranceClaimNumber: '',
        policyNumber: '',
        policyEffectiveDate: '',
        policyExpireDate: '',
        dwellingLimitA: '',
        contentsLimit: '',
        otherStructureB: '',
        lossOfUSD: '',
        deprecation: '',
        deductible: '',
        priorPayment: '',
        reasonsOfLD: ''
      }
    };
  },

  computed: {
    ...mapGetters([
      'policy',
      'policyTypes',
      'policyCategories',
      'selectedClaimId',
      'selectedClaimCarrier',
      'carrierPersonnel',
      'contactTypes',
      'titles',
      'carriers',
      'claimRoles'
    ]),
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
      }
    }
  },

  created() {
    this.getClaimCarrier(this.selectedClaimId);
    this.getPolicy(this.selectedClaimId);
    this.insuranceDetails.policyEffectiveDate = this.insuranceDetails.policyExpireDate = date.formatDate(
      Date.now(),
      'MM/DD/YYYY'
    );
  },
  methods: {
    ...mapActions([
      'getPolicy',
      'getPolicyTypes',
      'getPolicyCategory',
      'editInsurancePolicy',
      'getSelectedClaim',
      'getClaimCarrier',
      'deleteClaimCarrier',
      'getClaimCarrierPersonnel',
      'addCarrierPersonnel',
      'getCarrierPersonnel',
      'addClaimPersonnel',
      'deleteClaimCarrierPersonnel',
      'getCarriers',
      'addClaimCarrier',
      'editCarrierPersonnelToClaim',
      'getClaimRoles'
    ]),
    sendMap,
    toGetStateShortName,
    async applyFilter() {
      if (this.filterName) {
        this.params.role = this.filterName;
      }
      this.params.role = this.selectedFilter;
      const paramsObject = {
        id: this.selectedClaimCarrier.carrier.carrierID,
        params: this.params
      };
      await this.getCarrierPersonnel(paramsObject);
      this.filterDialog = false;
    },

    clearFilter() {
      this.params.role = '';
      this.selectedFilter = '';
      const paramsObject = {
        id: this.selectedClaimCarrier.carrier.carrierID,
        params: this.params
      };
      this.getCarrierPersonnel(paramsObject);
    },
    onClickAddAdjustor() {
      this.addPersonnelDialog = true;
      this.getClaimRoles();
    },
    setFilterName(name) {
      this.filterName = name;
    },
    onCheckPersonnel(personnel) {
      this.onSelectPersonnel(personnel);

      this.checkID = personnel.id;
      this.personnelObject = personnel;

      if (this.onClickUncheck) {
        this.onClickUncheck = false;
        this.isAssignDisabled = true;
      } else {
        this.onClickUncheck = true;
        this.isAssignDisabled = false;
      }
      // this.onClickUncheck = true;
    },
    async onEditSaveCarrierPersonnel() {
      const success = await this.$refs.editPersonnel.validate();
      if (success) {
        const payload = {
          claimID: this.selectedClaimId,
          carrierID: this.selectedClaimCarrier.id,
          id: this.id,
          data: {
            personnel: {
              personnelID: this.personnelID,
              name: this.editPersonnel.fname + ' ' + this.editPersonnel.lname,
              email: this.editPersonnel.email,

              note: this.editPersonnel.notes,
              phoneNumber: this.editPersonnel.phoneNumber,
              address: this.editPersonnel.address
            }
          }
        };

        await this.editCarrierPersonnelToClaim(payload);
        this.editPersonnelDialog = false;
        this.$emit('editCarrierDialog', false);
        this.getClaimCarrier(this.selectedClaimId);
      }
    },

    //This Function is for prefilling the values while editing the Adjustor

    onEditAdjustorPersonnel(index) {
      this.id = this.selectedClaimCarrier.carrier.personnel[index].id;
      this.personnelID = this.selectedClaimCarrier.carrier.personnel[
        index
      ].personnelID;
      const name = this.selectedClaimCarrier.carrier.personnel[
        index
      ].name.split(' ');

      this.editPersonnelDialog = true;
      this.$emit('editCarrierDialog', true);

      this.editPersonnel.fname = name && name[0] ? name[0] : '';

      this.editPersonnel.lname = name && name[1] ? name[1] : '';
      this.editPersonnel.email = this.selectedClaimCarrier.carrier.personnel[
        index
      ].email
        ? this.selectedClaimCarrier.carrier.personnel[index].email
        : '';
      this.editPersonnel.phoneNumber = this.selectedClaimCarrier.carrier
        .personnel[index].phoneNumber
        ? this.selectedClaimCarrier.carrier.personnel[index].phoneNumber
        : '';
      if (this.selectedClaimCarrier.carrier.personnel[index].address) {
        this.editPersonnel.address = this.selectedClaimCarrier.carrier.personnel[
          index
        ].address;
      }

      this.editPersonnel.notes = this.selectedClaimCarrier.carrier.personnel[
        index
      ].note;
    },

    validateDate,
    onEmailClick,
    onPhoneNumberClick,

    onEditPolicyInfo() {
      this.insuranceInfoDialog = true;
      this.getPolicyCategory();
      this.getPolicyTypes();
      this.$emit('editCarrierDialog', true);
      this.insuranceDetails.isThisIsForcedPlacedPolicyToggle = this.policy
        .policyInfo.isForcedPlaced
        ? this.policy.policyInfo.isForcedPlaced
        : false;
      this.insuranceDetails.hasAppraisalClause = this.policy.policyInfo.hasAppraisalClause;
      this.insuranceDetails.totalAmount = this.policy.policyInfo.totalAmount;
      this.insuranceDetails.ordinance = this.policy.policyInfo.ordinance;
      this.insuranceDetails.debrisRemoval = this.policy.policyInfo.debrisRemoval;
      this.insuranceDetails.mold = this.policy.policyInfo.mold;

      this.insuranceDetails.businessInt = this.policy.policyInfo.businessInt;
      if (this.policy.policyInfo.type) {
        this.insuranceDetails.policy.id = this.policy.policyInfo.type.id
          ? this.policy.policyInfo.type.id
          : '';
        this.insuranceDetails.policy.value = this.policy.policyInfo.type.value
          ? this.policy.policyInfo.type.value
          : '';
        this.insuranceDetails.policy.machineValue = this.policy.policyInfo.type
          .machineValue
          ? this.policy.policyInfo.type.machineValue
          : '';
      }
      if (this.policy.policyInfo.category) {
        this.insuranceDetails.policyCategory.id = this.policy.policyInfo
          .category
          ? this.policy.policyInfo.category.id
          : '';

        this.insuranceDetails.policyCategory.value = this.policy.policyInfo
          .category
          ? this.policy.policyInfo.category.value
          : '';
        this.insuranceDetails.policyCategory.machineValue = this.policy
          .policyInfo.category
          ? this.policy.policyInfo.category.machineValue
          : '';
      }

      this.insuranceDetails.policyNumber = this.policy.policyInfo.number
        ? this.policy.policyInfo.number
        : '';
      if (this.policy.policyInfo.effectiveDate) {
        this.insuranceDetails.policyEffectiveDate = dateToShow(
          this.policy.policyInfo.effectiveDate
        );
      }
      if (this.policy.policyInfo.expirationDate) {
        this.insuranceDetails.policyExpireDate = dateToShow(
          this.policy.policyInfo.expirationDate
        );
      }

      this.insuranceDetails.dwellingLimitA = this.policy.policyInfo.limitCoverage.dwelling;
      this.insuranceDetails.contentsLimit = this.policy.policyInfo.limitCoverage.content;
      this.insuranceDetails.otherStructureB = this.policy.policyInfo.limitCoverage.otherStructure;
      this.insuranceDetails.lossOfUSD = this.policy.policyInfo.limitCoverage.lossOfUse;
      this.insuranceDetails.deprecation = this.policy.policyInfo.depreciation;
      this.insuranceDetails.deductible = this.policy.policyInfo.deductibleAmount;
      this.insuranceDetails.priorPayment = this.policy.policyInfo.priorPayment;
      this.insuranceDetails.reasonsOfLD = this.policy.policyInfo.limitReason;
    },
    async onCloseCarrierList() {
      this.carriersListDialog = false;
      this.$emit('editCarrierDialog', false);
      await this.getClaimCarrier(this.selectedClaimId);
    },
    async onSetCarrier(carrierID) {
      this.carriersListDialog = false;

      await this.getClaimCarrier(this.selectedClaimId);
      const payload = {
        id: this.selectedClaimId,
        data: {
          carrier: {
            carrierID: carrierID
          }
        }
      };
      await this.addClaimCarrier(payload);
      this.getClaimCarrier(this.selectedClaimId);
    },
    onClickPersonnelDelete(id) {
      this.deletePersonnelAlert = true;
      this.personnelId = id;
    },
    async onDeleteAdjustor() {
      const adjustor = {
        claimID: this.selectedClaimId,
        carrierID: this.selectedClaimCarrier.carrier.id,
        personnelD: this.personnelId
      };
      await this.deleteClaimCarrierPersonnel(adjustor);

      this.getClaimCarrier(this.selectedClaimId);
    },
    onAddAdjustorClick() {
      this.isAssignDisabled = true;
      this.adjustorListDialog = true;
      this.$emit('editCarrierDialog', true);
      const paramsObject = {
        id: this.selectedClaimCarrier.carrier.carrierID,
        params: ''
      };
      this.getCarrierPersonnel(paramsObject);
    },
    //This Function is for when create a new personnel

    async onSaveCarrierPersonnel() {
      const payload = {
        id: this.selectedClaimCarrier.carrier.carrierID,
        data: {
          personnel: {
            honorific: {
              id: this.personnel.honorific.id,
              value: this.personnel.honorific.value,
              machineValue: this.personnel.honorific.machineValue
            },
            fname: this.personnel.fname,
            lname: this.personnel.lname,
            email: this.personnel.email,
            phoneNumber: this.personnel.phoneNumber,

            address: {
              ...this.personnel.address
            },
            note: this.personnel.notes
          }
        }
      };

      const response = await this.addCarrierPersonnel(payload);
      this.addPersonnelDialog = false;
      this.getCarrierPersonnel(this.selectedClaimCarrier.carrier.carrierID);
      this.onSelectPersonnel(response.attributes.personnel);

      this.personnel.fname = '';
      this.personnel.lname = '';
      this.personnel.email = '';
      this.personnel.address.houseNumber = '';
      this.personnel.address.addressCountry = '';
      this.personnel.address.addressLocality = '';
      this.personnel.address.addressRegion = '';
      this.personnel.address.address1 = '';
      this.personnel.address.address2 = '';
      this.personnel.address.postalCode = '';
      this.personnel.notes = '';
      this.personnel.departmentName = '';
    },
    //This Function is called when we click on adjustor list and select a personnel
    async onSelectPersonnel(personnel) {
      const urlID = {
        claimID: this.selectedClaimId,
        carrierID: this.selectedClaimCarrier.id
      };
      const payload1 = {
        personnelID: personnel.id,
        name: personnel.fname + ' ' + personnel.lname,
        email: personnel.email,
        note: personnel.note,
        phoneNumber: personnel.phoneNumber,
        address: personnel.address
      };
      if (this.assignDialog) {
        const payload2 = {
          ...urlID,
          data: {
            personnel: {
              ...payload1,
              role: { value: this.filterName, machineValue: this.assignFilter }
            }
          }
        };

        await this.addClaimPersonnel(payload2);
      } else {
        const payload2 = {
          ...urlID,
          data: {
            personnel: {
              ...payload1,
              role: {
                value: this.personnel.role.value,
                machineValue: this.personnel.role.machineValue
              }
            }
          }
        };

        await this.addClaimPersonnel(payload2);
      }
      this.assignDialog = false;
      this.$emit('editCarrierDialog', false);
      this.adjustorListDialog = false;

      this.getClaimCarrier(this.selectedClaimId);

      this.filterName = '';
      this.assignFilter = '';
    },

    async onClickDelete(id) {
      this.deleteAlertDialog = true;
      this.carrierID = id;
    },
    async onDeleteCarrier() {
      const carrier = {
        claimID: this.selectedClaimId,
        carrierID: this.carrierID
      };
      await this.deleteClaimCarrier(carrier);
      this.getClaimCarrier(this.selectedClaimId);
      this.carrierName = '';
    },
    async onSaveButtonClick() {
      let success = false;
      success = await this.$refs.insuranceInfoForm.validate();

      if (success) {
        const payload = {
          id: this.selectedClaimId,
          data: {
            policyInfo: {
              number: this.insuranceDetails.policyNumber,
              isClaimFiled: this.insuranceDetails.hasClaimBeenFilledToggle,
              isForcedPlaced: this.insuranceDetails
                .isThisIsForcedPlacedPolicyToggle,
              hasAppraisalClause: this.insuranceDetails.hasAppraisalClause,
              category: {
                id: this.insuranceDetails.policyCategory.id,
                value: this.insuranceDetails.policyCategory.value,
                machineValue: this.insuranceDetails.policyCategory.machineValue
              },
              type: {
                id: this.insuranceDetails.policy.id,
                value: this.insuranceDetails.policy.value,
                machineValue: this.insuranceDetails.policy.machineValue
              },

              effectiveDate: dateToSend(
                this.insuranceDetails.policyEffectiveDate
              ),
              expirationDate: dateToSend(
                this.insuranceDetails.policyExpireDate
              ),
              isClaimFiled: this.insuranceDetails.hasClaimBeenFilledToggle,
              isForcedPlaced: this.insuranceDetails
                .isThisIsForcedPlacedPolicyToggle,
              limitCoverage: {
                dwelling: this.insuranceDetails.dwellingLimitA
                  ? this.insuranceDetails.dwellingLimitA
                  : 0,
                otherStructure: this.insuranceDetails.otherStructureB
                  ? this.insuranceDetails.otherStructureB
                  : 0,
                content: this.insuranceDetails.contentsLimit
                  ? this.insuranceDetails.contentsLimit
                  : 0,
                lossOfUse: this.insuranceDetails.lossOfUSD
                  ? this.insuranceDetails.lossOfUSD
                  : 0
              },
              totalAmount: this.insuranceDetails.totalAmount
                ? this.insuranceDetails.totalAmount
                : 0,
              ordinance: this.insuranceDetails.ordinance
                ? this.insuranceDetails.ordinance
                : 0,
              debrisRemoval: this.insuranceDetails.debrisRemoval
                ? this.insuranceDetails.debrisRemoval
                : 0,
              mold: this.insuranceDetails.mold ? this.insuranceDetails.mold : 0,
              businessInt: this.insuranceDetails.businessInt
                ? this.insuranceDetails.businessInt
                : 0,
              deductibleAmount: this.insuranceDetails.deductible
                ? this.insuranceDetails.deductible
                : 0,
              depreciation: this.insuranceDetails.deprecation
                ? this.insuranceDetails.deprecation
                : 0,
              priorPayment: this.insuranceDetails.priorPayment
                ? this.insuranceDetails.priorPayment
                : 0,
              limitReason: this.insuranceDetails.reasonsOfLD,
              declaration: {
                isDeclared: true,
                fileInfo: {
                  id: '',
                  value: ''
                }
              }
            }
          }
        };

        await this.editInsurancePolicy(payload);
        this.insuranceInfoDialog = false;
        this.getPolicy(this.selectedClaimId);
      }
    },

    async selecting() {
      this.carriersListDialog = false;
      await this.getClaimCarrier(this.selectedClaimId);
    },

    openAddCarrierDialog(e) {
      this.addCarrierDialog = e;
    },
    onSearchBackButtonClick() {
      this.searchText = '';
      this.search();
    },
    onAddButtonClick() {
      this.$emit('addCarrier', true);
    },
    search(event) {
      this.params.name = event;
    },
    onAddCarrierClick() {
      this.carriersListDialog = true;
      this.$emit('editCarrierDialog', true);
      this.carrierName = this.selectedClaimCarrier.carrier.name;
    }
  }
};
</script>
<style lang="scss">
.form-height {
  height: calc(100vh - 120px);
  overflow: auto;
  margin: 10px;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
.filters-list-item {
  color: #666666;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  text-transform: capitalize;
}
</style>
