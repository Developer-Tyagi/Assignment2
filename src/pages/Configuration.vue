<template>
  <q-page class="row q-ml-xl height-without-header">
    <div class="col-10">
      <div class="my-font text-bold text-h4 row q-ma-md">
        Global Master Data Management
      </div>
      <div class="q-ml-md text-body1">
        <p>
          Master Data management allows you to edit and refine those values that
          are used by all ClaimGuru accounts .please be aware that changes you
          make will effect all users and accounts so be judicious. To manage
          master data, select the Data type from the menu below and edit the
          data in the table shown.
        </p>
      </div>

      <div class="row q-ml-md">
        <div class="col-1 q-mt-sm">Data Type</div>

        <div class="col-4">
          <q-select
            dense
            class="col-3 input-extra-padding"
            outlined
            v-model="configuration.dataType"
            :options="setAllConfigurationData"
            option-label="dataTypeValue"
            option-value="dataTypeMachineValue"
            @input="setSelectedTabs(configuration.dataType, 'true')"
            options-dense
            behavior="menu"
            label="Please select a data type"
          />
        </div>
      </div>
      <q-separator class="q-my-md" />
      <div class="q-mx-md" flat bordered v-if="tab != 'template'">
        <div class="row full-width justify-between">
          <span class="text-bold" style="line-height: 36px">{{ newTab }}</span>
          <div class="row">
            <q-icon
              name="add_box"
              size="lg"
              @click="onClickingAddButton(tab)"
              class="q-ml-md cursor-pointer"
            ></q-icon>
            <span class="q-my-sm">Add Item</span>
          </div>
        </div>
        <div class="bg-grey-3 q-mt-md">
          <table class="table" v-if="table.length">
            <thead>
              <tr class="table-tr" v-if="tab !== 'inspections'">
                <th class="table-th text-white">Name</th>
                <th class="table-th text-white">Action</th>
              </tr>
              <tr class="table-tr" v-if="tab == 'inspections'">
                <th class="table-th text-white">Name</th>
                <th class="table-th text-white">SubType</th>
                <th class="table-th text-white">Duration (hrs)</th>
                <th class="table-th text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-tr"
                v-for="(list, index) in table"
                :key="index"
                v-if="tab !== 'inspections'"
              >
                <td class="table-td">
                  <q-input
                    v-model="toEditConfigurationWithoutSubtype.attributes.value"
                    class="input-style text-center"
                    borderless
                    v-if="
                      toEditConfigurationData == true &&
                      updatedEditConfigurationDataIndex == index
                    "
                  ></q-input>
                  <span v-else>{{ list.value || list.name }}</span>
                </td>
                <td class="table-td">
                  <div class="justify-between">
                    <q-icon
                      name="block"
                      size="sm"
                      @click="toCancelConfigurationEdit()"
                      v-if="
                        toEditConfigurationData &&
                        updatedEditConfigurationDataIndex == index
                      "
                      class="q-pr-md cursor-pointer"
                    >
                      <q-tooltip>Cancel</q-tooltip>
                    </q-icon>
                    <q-icon
                      name="edit"
                      size="sm"
                      @click="toEditConfiguration(list, index, newTab)"
                      v-else
                      class="q-pr-md cursor-pointer"
                    >
                      <q-tooltip>Edit</q-tooltip>
                    </q-icon>

                    <q-icon
                      name="save"
                      size="sm"
                      @click="toSaveConfigurationEdit()"
                      v-if="
                        toEditConfigurationData &&
                        updatedEditConfigurationDataIndex == index
                      "
                      class="q-pl-md cursor-pointer"
                    >
                      <q-tooltip>Save</q-tooltip>
                    </q-icon>
                    <q-icon
                      name="visibility"
                      size="sm"
                      v-else
                      class="q-pl-md cursor-pointer"
                    >
                    </q-icon>
                  </div>
                </td>
              </tr>
              <tr
                class="table-tr"
                v-for="(list, index) in table"
                v-if="tab === 'inspections'"
              >
                <td class="table-td">
                  <div
                    v-if="
                      toEditConfigurationData &&
                      updatedEditConfigurationDataIndex == index
                    "
                  >
                    <q-input
                      borderless
                      class="input-style"
                      type="text"
                      v-model="inspectionType.value"
                    ></q-input>
                  </div>
                  <div class="text-bold" v-else>{{ list.value }}</div>
                </td>
                <td class="table-td">
                  <div
                    v-if="
                      toEditConfigurationData &&
                      updatedEditConfigurationDataIndex == index
                    "
                  >
                    <div
                      v-for="(item, index) in inspectionType.subtypes"
                      :key="index"
                    >
                      <q-input
                        v-model="item.value"
                        borderless
                        class="input-style"
                      ></q-input>
                    </div>
                  </div>
                  <div
                    v-else
                    v-for="(type, index) in list.subtypes"
                    :key="index"
                  >
                    <div>{{ type.value }}</div>
                  </div>
                </td>
                <td class="table-td">
                  <div
                    v-if="
                      toEditConfigurationData &&
                      updatedEditConfigurationDataIndex == index
                    "
                  >
                    <div
                      v-for="(item, index) in inspectionType.subtypes"
                      :key="index"
                    >
                      <q-input
                        v-model="item.duration"
                        borderless
                        class="input-style"
                      ></q-input>
                    </div>
                  </div>
                  <div
                    v-else
                    v-for="(type, index) in list.subtypes"
                    :key="index"
                  >
                    <div>{{ type.duration }}</div>
                  </div>
                </td>
                <td class="table-td">
                  <div class="justify-between">
                    <q-icon
                      name="block"
                      size="sm"
                      @click="toCancelConfigurationEdit()"
                      v-if="
                        toEditConfigurationData &&
                        updatedEditConfigurationDataIndex == index
                      "
                      class="q-pr-md cursor-pointer"
                    />
                    <q-icon
                      name="edit"
                      size="sm"
                      v-else
                      @click="toUpdateConfigurationDataWithSubtype(list, index)"
                      class="q-pr-md cursor-pointer"
                    ></q-icon>
                    <span>
                      <q-icon
                        name="save"
                        size="sm"
                        @click="toSaveConfigurationEdit()"
                        v-if="
                          toEditConfigurationData &&
                          updatedEditConfigurationDataIndex == index
                        "
                        class="q-pl-md cursor-pointer"
                      />
                      <q-icon
                        name="visibility"
                        size="sm"
                        v-else
                        class="q-pl-md cursor-pointer"
                      ></q-icon>
                    </span>
                  </div>
                </td>
              </tr>
              <!-- <td>
                <q-icon
                  name="add_box"
                  size="md"
                  class="q-ml-md cursor-pointer"
                ></q-icon>
              </td>
              <td></td>
              <td v-if="tab == 'inspections'"></td>
              <td v-if="tab == 'inspections'"></td> -->
            </tbody>
          </table>

          <div class="q-pa-lg q-ma-auto" v-else>You Have Not Added AnyYet</div>
        </div>
      </div>
      <div v-else>
        <div class="q-mx-md">
          <div class="row full-width justify-between">
            <span class="text-bold" style="line-height: 36px">{{ tab }}</span>

            <div class="row">
              <q-btn @click="openAddTemplateBox" color="primary">
                Add Template
              </q-btn>
              <q-btn
                class="q-ml-lg"
                @click="uploadTemplateDialogBox = true"
                color="primary"
              >
                Upload Template
              </q-btn>
            </div>
          </div>
          <div class="bg-grey-3 q-mt-md">
            <table class="table" v-if="table.length">
              <thead>
                <tr class="table-tr">
                  <th class="table-th">Name</th>

                  <th class="table-th">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  class="table-tr"
                  v-for="(list, index) in templates"
                  :key="index"
                >
                  <td class="table-td">{{ list.name.type.value }}</td>

                  <td class="table-td">
                    <span class="cursor-pointer">
                      <q-icon
                        size="sm"
                        color="primary"
                        name="create"
                        @click="onEditTemplate(list)"
                      />
                    </span>
                    <span class="cursor-pointer">
                      <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                        @click="onDeleteTemplate(list)"
                      />
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="q-pa-lg q-ma-auto" v-else>
              You Have Not Added AnyYet
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialogBox">
      <q-card
        :class="{
          'inspection-dialog-box': tab === 'inspections',
          'other-dialog-box': tab !== 'inspections'
        }"
      >
        <q-bar
          class="row justify-between bg-primary text-white"
          style="height: 50px"
        >
          <div class="col-7 text-bold">Add {{ dialogBoxName }}</div>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section
          :class="{
            'dialog-box-content': tab === 'inspections',
            'other-dialog-box-content': tab !== 'inspections'
          }"
        >
          <div class="column">
            <q-form ref="form" v-if="tab !== 'inspections'">
              <div class="q-pl-xs">
                <q-input
                  dense
                  v-model="payload.value"
                  class="full-width"
                  outlined
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please Fill ' + dialogBoxName
                  ]"
                />
              </div>
            </q-form>
            <q-form ref="form" v-if="tab == 'inspections'">
              <q-card
                class="q-ma-md q-pa-md"
                v-for="(subtype, index) in inspectionType.subtypes"
                :key="index"
              >
                <q-input
                  dense
                  v-model="inspectionType.value"
                  placeholder="Type of Inspection"
                  v-if="index == 0"
                  :rules="[
                    val =>
                      (val && val.length > 0) || 'Please fill inspection name'
                  ]"
                />
                <q-input
                  dense
                  placeholder="Sub Type of Inspection"
                  v-model="inspectionType.subtypes[index].value"
                />
                <div class="slider-div">
                  <label>Duration(hr)</label>
                  <q-slider
                    v-model="inspectionType.subtypes[index].duration"
                    label-always
                    markers
                    :min="0.5"
                    :max="4"
                    :step="0.5"
                  />
                </div>
              </q-card>
            </q-form>
          </div>
          <div
            class="row justify-between text-primary"
            v-if="tab == 'inspections'"
          >
            <div class="q-ml-xl" @click="addAnotherSubType">
              + Another Sub Type Of Inspection
            </div>
            <div
              class="q-mr-xl"
              v-if="inspectionType.subtypes.length > 1"
              @click="onClickRemoveSubType"
            >
              Remove
            </div>
          </div>
        </q-card-section>
        <div class="row justify-center">
          <div class="col-8">
            <q-btn
              label="Clear"
              class="back-button-style"
              padding="md"
              @click="clear"
            />
            <q-btn
              padding="md"
              label="Save"
              class="next-button-style"
              @click="onSubmit(tab)"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Token Dialog Box -->
    <q-dialog
      v-model="addTemplateDialogBox"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="height: 85%; width: 60%">
        <div class="row bg-primary" style="height: 5%">
          <div
            v-if="!this.isEdit"
            class="text-white text-center text-h6 q-pa-sm"
          >
            Add Template
          </div>
          <div v-else class="text-white text-h6 q-pa-sm">Edit Template</div>
          <q-space />
          <q-btn
            class="q-mr-md"
            dense
            flat
            icon="close"
            color="white"
            v-close-popup
          >
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </div>
        <div class="q-mx-lg">
          <div
            style="
              height: calc(100% - 100px);
              overflow-y: auto;
              margin-bottom: 10px;
            "
          >
            <div class="text-bold q-mt-xl">Template Type</div>
            <div>
              <q-select
                :disable="isEdit"
                dense
                class="input-extra-padding q-ma-sm required"
                v-model="templatetype.value"
                option-value="value"
                option-label="value"
                map-options
                options-dense
                behavior="menu"
                emit-value
                :options="templateOptions"
                @input="setTypes(templatetype.value)"
                label="List of Templates"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Please fill the template'
                ]"
              />
            </div>
            <div class="text-bold q-py-sm">BODY</div>
            <Ckeditor
              :markup="post.body"
              :templateTokens="templateTokens"
              :groupedTokens="groupedTokens"
              @updateMarkup="updateMarkup"
            ></Ckeditor>
          </div>
          <div class="row q-mt-xl justify-center">
            <q-btn
              class="single-next-button-style"
              label="Save"
              @click="onSaveTemplate"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- delete dialog -->
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure ! You want to delete This Template!
        </q-card-section>

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
            @click="onDeleteConfirmation(indexValue)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Upload Template Dialog Box -->

    <q-dialog
      v-model="uploadTemplateDialogBox"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="height: 85%; width: 60%">
        <div class="row justify-between bg-primary" style="height: 50px">
          <div class="text-white text-h6 q-pa-sm">Upload Template</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </div>
        <div class="q-mx-lg">
          <div>
            <div class="text-bold q-mt-xl q-ml-xs">Template Type</div>
            <q-form ref="uploadTemplateForm">
              <div>
                <q-select
                  dense
                  class="input-extra-padding q-ma-sm required"
                  v-model="uploadTemplatetype.value"
                  option-value="value"
                  option-label="value"
                  map-options
                  options-dense
                  behavior="menu"
                  emit-value
                  :options="templateOptions"
                  @input="setTypes(uploadTemplatetype.value)"
                  label="List of Templates"
                  lazy-rules
                  :rules="[
                    val => (val && val.length > 0) || 'Please fill the template'
                  ]"
                />
              </div>
              <div>
                <input
                  id="uploadFile"
                  type="file"
                  style="width: 250px"
                  accept=".doc,.docx,"
                  @change="onFileInputClick"
                />
                <span class="form-heading q-mt-lg text-capitalize q-pa-sm">
                  only doc and docx files are allowed
                </span>
              </div>
              <q-btn
                class="q-mt-md"
                size="md"
                color="primary"
                label="upload"
                @click="uploadFileToServer()"
              />
            </q-form>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { constants } from '@utils/constant';
import { validateEmail, errorMessage } from '@utils/validation';
import SubSideBar from 'components/SubSideBar';
import CustomBar from 'components/CustomBar';
import Ckeditor from 'components/Ckeditor';
import { getBase64 } from '@utils/common';

export default {
  name: 'SetConfiguration',
  components: {
    SubSideBar,
    CustomBar,
    Ckeditor
  },

  data() {
    return {
      toEditConfigurationData: false,
      updatedEditConfigurationDataIndex: '',
      newTab: '',
      uploadTemplateDialogBox: false,
      dataURl: '',
      indexValue: '',
      isEdit: false,
      alert: false,
      addTemplateDialogBox: false,
      tokenDialogBox: false,
      templateTokens: [],
      groupedTokens: [],
      templatetype: { value: '', machineValue: '' },
      configuration: {
        dataType: ''
      },
      toEditConfigurationWithoutSubtype: {
        editedDataMachineValue: '',
        attributes: {
          value: '',
          type: {
            value: '',
            machineValue: ''
          }
        }
      },
      uploadTemplatetype: { value: '', machineValue: '', id: '' },
      definitions: {
        insert_img: {
          tip: 'Insertar Imagen',
          icon: 'photo',
          handler: this.insertImg // handler will call insertImg() method
        }
      },
      title: '',
      post: { body: '' },
      dialogBox: false,
      dialogBoxName: '',
      tab: '',
      table: [],
      inspectionPayload: {
        editedDataMachineValue: '',
        attributes: {
          value: '',
          subtypes: [],
          type: {
            value: '',
            machineValue: ''
          }
        }
      },
      inspectionType: {
        value: '',
        subtypes: [{ value: '', duration: 0.5, unit: 'hour' }]
      },
      payload: {
        value: ''
      },

      configurationType: [
        { name: 'Inspection Type', key: 'inspectionType' },
        { name: ' Industry Type', key: 'industryType' },
        { name: 'Honorific', key: 'honorific' },
        { name: 'Phone Type', key: 'phoneType' },
        { name: 'Client Type', key: 'clientType' },
        { name: 'Policy Categories', key: 'policyCategories' },
        { name: 'Policy Type', key: 'policyType' },
        { name: 'Property Type', key: 'propertyType' },
        { name: 'Claim Reason', key: 'claimReason' },
        { name: 'Loss Cause', key: 'lossCause' },
        { name: 'Claim Severity', key: 'claimSeverity' },
        { name: 'Template Type', key: 'templateType' },
        { name: 'Template', key: 'template' }
      ]
    };
  },
  watch: {
    webSubOptionMenuTab() {
      (this.tab = this.webSubOptionMenuTab.key),
        this.setSelectedTab(this.tab, 'false');
    }
  },
  async created() {
    this.getAllConfigurationData();
  },

  computed: {
    ...mapGetters([
      'setAllConfigurationData',
      'webSubOptionMenuTab',
      'contactTypes',
      'titles',
      'inspectionTypes',
      'vendorIndustries',
      'clientTypes',
      'policyTypes',
      'policyCategories',
      'propertyTypes',
      'claimReasons',
      'lossCauses',
      'claimSeverity',
      'templateOptions',
      'tokens',
      'templates'
    ])
  },

  methods: {
    ...mapActions([
      'editConfigurationData',
      'getAllConfigurationTableData',
      'getAllConfigurationData',
      'addUser',
      'addInspectionType',
      'addHonorifics',
      'addIndustry',
      'addPhone',
      'addClientType',
      'addPolicy',
      'addPolicyCategories',
      'addProperty',
      'addClaimReason',
      'addLoss',
      'addClaimSeverity',
      'addOnboardingStep',
      'getAllConfigurationTableData',
      'addTemplateRemote',
      'getTemplateToken',
      'getAllTemplate',
      'editTemplate',
      'deleteTemplate',
      'addTemplateType',
      'uploadDocFileToServer',
      'addTemplate'
    ]),
    ...mapMutations(['setLoading', 'setNotification', 'webMenuSubOptionTab']),
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },

    getBase64,
    //function is used to update configuration data with subtype information
    toUpdateConfigurationDataWithSubtype(list, index) {
      this.inspectionPayload.editedDataMachineValue = list.machineValue;
      this.inspectionTypeEditedValue = list.value;
      this.inspectionEditedType = this.updatedEditConfigurationDataIndex =
        index;
      this.toEditConfigurationData = true;
      this.inspectionType.value = list.value;
      this.inspectionType.subtypes = list.subtypes;
    },
    //function is used to cancel the edit configuration data
    toCancelConfigurationEdit() {
      this.toEditConfigurationData = false;
      this.updatedEditConfigurationDataIndex = '';
    },
    //function is used to save the configuration edit data
    async toSaveConfigurationEdit() {
      this.toEditConfigurationData = false;
      this.updatedEditConfigurationDataIndex = '';
      if (this.tab != 'inspections')
        await this.editConfigurationData(
          this.toEditConfigurationWithoutSubtype
        );
      else {
        this.inspectionPayload.attributes.value = this.inspectionType.value;
        this.inspectionPayload.attributes.subtypes =
          this.inspectionType.subtypes;
        this.inspectionPayload.attributes.type.value = this.newTab;
        this.inspectionPayload.attributes.type.machineValue = this.tab;
        await this.editConfigurationData(this.inspectionPayload);
      }
      this.setSelectedTabs(this.configuration.dataType, 'true');
    },
    //funvtion is used to edit the configurationData
    toEditConfiguration(data, index, newTab) {
      this.toEditConfigurationData = true;
      this.updatedEditConfigurationDataIndex = index;
      this.toEditConfigurationWithoutSubtype.editedDataMachineValue =
        data.machineValue;
      this.toEditConfigurationWithoutSubtype.attributes.value = data.value
        ? data.value
        : data.name;
      this.toEditConfigurationWithoutSubtype.attributes.type.machineValue =
        this.tab;
      this.toEditConfigurationWithoutSubtype.attributes.type.value = newTab;
    },
    async onFileInputClick(event) {
      document.getElementById('uploadFile').click();
      this.dataURI = await this.getBase64(event.target.files[0]);

      document.getElementById('uploadFile').value;
    },
    async uploadFileToServer() {
      var success = await this.$refs.uploadTemplateForm.validate();
      if (success && this.dataURI) {
        this.setLoading(true);

        const formData = new FormData();
        formData.append('templateValue', this.uploadTemplatetype.value);
        formData.append('file', this.dataURItoBlob(this.dataURI));

        const payload = {
          templateMachineValue: this.uploadTemplatetype.machineValue,
          formData: formData
        };
        await this.uploadDocFileToServer(payload);
        await this.getAllTemplate();

        this.setLoading(false);
        this.uploadTemplateDialogBox = false;
        this.$q.notify({
          message: ' please wait for sometime if document is not visible',
          position: 'top',
          type: 'positive',
          timeout: 7500
        });
        this.uploadTemplatetype = {};
      } else {
        this.$q.notify({
          message: 'Please fill the above details first',
          position: 'top',
          type: 'negative'
        });
      }
    },
    updateMarkup(val) {
      this.post.body = val;
    },

    openAddTemplateBox() {
      this.getAllConfigurationTableData({ name: 'template_types' });
      this.table = this.templateOptions;
      this.isEdit = false;
      this.templateTokens = [];
      this.groupedTokens = [];
      this.tokens.forEach(val => {
        var grpName = val.attributes.group;
        var tokenArr = [];

        val.attributes.tokens.forEach(token => {
          let arr = [];
          arr[0] = token.name;
          arr[1] = token.value;
          this.templateTokens.push(arr);
          tokenArr.push(arr);
        });
        this.groupedTokens.push({ groupName: grpName, tokens: tokenArr });
      });
      this.templatetype.value = '';
      this.post.body = '';
      this.addTemplateDialogBox = true;
    },

    async onSaveTemplate() {
      if (this.templatetype.value == '') {
        this.errorMessage(constants.successMessages.TEMPLATE_TYPE_NOT_SELECTED);
      } else if (this.post.body == '') {
        this.errorMessage(constants.successMessages.CKEDITOR_BODY_EMPTY);
      } else {
        if (this.isEdit) {
          const payload = {
            value: this.post.body,
            type: {
              machineValue: this.templatetype.machineValue,
              value: this.templatetype.value
            }
          };
          const success = await this.editTemplate(payload);
          if (success) {
            this.addTemplateDialogBox = false;
            await this.getAllTemplate();
          }
        } else {
          const payload = {
            value: this.post.body,
            type: {
              machineValue: this.templatetype.machineValue,
              value: this.templatetype.value
            }
          };
          const success = await this.addTemplate(payload);

          if (success) {
            this.addTemplateDialogBox = false;
            await this.getAllTemplate();
          }
        }

        this.post.body = '';
        this.templatetype.value = '';
        this.templatetype.machineValue = '';
        this.isEdit = false;
      }
    },

    async onDeleteConfirmation(val) {
      const payload = {
        type: this.indexValue
      };
      await this.deleteTemplate(payload);
      await this.getAllTemplate();
    },

    onDeleteTemplate(value) {
      this.indexValue = value.name.type.machineValue;
      this.alert = true;
    },

    onEditTemplate(value) {
      this.isEdit = true;
      this.templateTokens = [];
      this.groupedTokens = [];
      this.tokens.forEach(val => {
        // grp token code goes here
        var grpName = val.attributes.group;
        var tokenArr = [];

        // ends here
        val.attributes.tokens.forEach(token => {
          let arr = [];
          arr[0] = token.name;
          arr[1] = token.value;
          this.templateTokens.push(arr);
          tokenArr.push(arr);
        });
        this.groupedTokens.push({ groupName: grpName, tokens: tokenArr });
      });
      this.post.body = value.name.value;
      this.templatetype.value = value.name.type.value;
      this.templatetype.machineValue = value.name.type.machineValue;

      this.addTemplateDialogBox = true;
    },

    setTypes(value) {
      const obj = this.templateOptions.find(item => {
        return item.value === value;
      });
      this.templatetype.machineValue = obj.machineValue;
      this.uploadTemplatetype.machineValue = obj.machineValue;
      this.uploadTemplatetype.id = obj.id;
    },

    saveWork() {
      this.$q.notify({
        message: 'Saved your text to local storage',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
      });
    },

    uploadIt() {
      this.$q.notify({
        message: 'Server unavailable. Check connectivity.',
        color: 'red-5',
        textColor: 'white',
        icon: 'warning'
      });
    },

    tokenDialog() {
      this.tokenDialogBox = true;
    },

    setValueToTemplate(value) {
      this.post.body += value;
      this.tokenDialogBox = false;
    },
    setSelectedTabs(e, value) {
      this.toEditConfigurationData = false;
      this.updatedEditConfigurationDataIndex = '';
      this.newTab = value == 'true' ? e.dataTypeValue : '';
      this.tab = value == 'true' ? e.dataTypeMachineValue : e;
      this.setSelectedTab(e, value);
    },
    async setSelectedTab(e, status) {
      if (status == 'true') {
        this.webMenuSubOptionTab('');
      }

      switch (this.tab) {
        case 'inspections':
          await this.getAllConfigurationTableData({ name: 'inspections' });
          this.table = this.inspectionTypes;
          break;
        case 'honorifics':
          await this.getAllConfigurationTableData({ name: 'honorifics' });
          this.table = this.titles;
          break;
        case 'industries':
          await this.getAllConfigurationTableData({ name: 'industries' });
          this.table = this.vendorIndustries;
          break;
        case 'phone_types':
          await this.getAllConfigurationTableData({ name: 'phone_types' });
          this.table = this.contactTypes;
          break;
        case 'client_types':
          await this.getAllConfigurationTableData({ name: 'client_types' });
          this.table = this.clientTypes;
          break;
        case 'policy_types':
          await this.getAllConfigurationTableData({ name: 'policy_types' });
          this.table = this.policyTypes;
          break;
        case 'policy_categories':
          await this.getAllConfigurationTableData({
            name: 'policy_categories'
          });
          this.table = this.policyCategories;
          break;
        case 'property_types':
          await this.getAllConfigurationTableData({ name: 'property_types' });
          this.table = this.propertyTypes;
          break;
        case 'claim_reasons':
          await this.getAllConfigurationTableData({ name: 'claim_reasons' });
          this.table = this.claimReasons;
          break;
        case 'loss_causes':
          await this.getAllConfigurationTableData({ name: 'loss_causes' });
          this.table = this.lossCauses;
          break;
        case 'claim_severities':
          await this.getAllConfigurationTableData({ name: 'claim_severities' });
          this.table = this.claimSeverity;
          break;
        case 'template_types':
          await this.getAllConfigurationTableData({ name: 'template_types' });
          this.table = this.templateOptions;
          break;
        case 'template':
          await this.getAllConfigurationTableData({ name: 'template_types' });
          await this.getAllTemplate();
          await this.getTemplateToken();
          this.table = this.templates;
      }
    },

    validateEmail,
    errorMessage,

    async onSubmit(tab) {
      var vald = await this.$refs.form.validate();
      if (vald) {
        switch (tab) {
          case 'inspections':
            for (var i = 0; i <= this.inspectionType.subtypes.length - 1; i++) {
              if (this.inspectionType.subtypes[i].value == '') {
                this.inspectionType.subtypes[i].value =
                  this.inspectionType.value;
              }
            }
            var response = await this.addInspectionType(this.inspectionType);
            await this.getAllConfigurationTableData({ name: 'inspections' });
            this.table = this.inspectionTypes;
            break;
          case 'honorifics':
            var response = await this.addHonorifics(this.payload);
            await this.getAllConfigurationTableData({ name: 'honorifics' });
            this.table = this.titles;
            break;
          case 'industries':
            var response = await this.addIndustry(this.payload);
            await this.getAllConfigurationTableData({ name: 'industries' });
            this.table = this.vendorIndustries;
            break;
          case 'phone_types':
            var response = await this.addPhone(this.payload);
            await this.getAllConfigurationTableData({ name: 'phone_types' });
            this.table = this.contactTypes;
            break;
          case 'client_types':
            var response = await this.addClientType(this.payload);
            await this.getAllConfigurationTableData({ name: 'client_types' });
            this.table = this.clientTypes;
            break;
          case 'policy_types':
            var response = await this.addPolicy(this.payload);
            await this.getAllConfigurationTableData({ name: 'policy_types' });
            this.table = this.policyTypes;
            break;
          case 'policy_categories':
            var response = await this.addPolicyCategories(this.payload);
            await this.getAllConfigurationTableData({
              name: 'policy_categories'
            });
            this.table = this.policyCategories;
            break;
          case 'property_types':
            var response = await this.addProperty(this.payload);
            await this.getAllConfigurationTableData({ name: 'property_types' });
            this.table = this.propertyTypes;
            break;
          case 'claim_reasons':
            var response = await this.addClaimReason(this.payload);
            await this.getAllConfigurationTableData({ name: 'claim_reasons' });
            this.table = this.claimReasons;
            break;
          case 'loss_causes':
            var response = await this.addLoss(this.payload);
            await this.getAllConfigurationTableData({ name: 'loss_causes' });
            this.table = this.lossCauses;
            break;
          case 'claim_severities':
            var response = await this.addClaimSeverity(this.payload);
            await this.getAllConfigurationTableData({
              name: 'claim_severities'
            });
            this.table = this.claimSeverity;
            break;
          case 'template_types':
            var response = await this.addTemplateType(this.payload);
            await this.getAllConfigurationTableData({ name: 'template_types' });
            this.table = this.templateOptions;
            break;
        }
        if (response) {
          this.clear();
          this.dialogBox = false;
        }
      }
    },

    // This is Secondary Dialog Box
    onClickingAddButton(key) {
      this.dialogBoxName = key;
      this.dialogBox = true;
    },

    async addAnotherSubType() {
      var ValidateSubType = await this.$refs.form.validate();
      if (ValidateSubType) {
        this.inspectionType.subtypes.push({ type: ' ', duration: 0.5 });
      }
    },

    onClickRemoveSubType() {
      this.inspectionType.subtypes.pop();
    },

    //For clearing the Secondary Dilog box Data when clicked to clearing
    clear() {
      if (this.tab == 'inspections') {
        this.inspectionType = {
          value: '',

          subtypes: [{ value: '', duration: 0.5, unit: 'hour' }]
        };
      } else {
        this.payload.value = '';
      }
    },

    // onSaveInspectionType
    async onSaveInspectionType() {
      if (response) {
        this.getAllConfigurationTableData({ name: 'inspections' });
        this.InspectionDialogBox = false;
        this.inspection = {
          value: '',

          subtypes: [
            { value: ' ', duration: 0.5, unit: 'hour', machineValue: '' }
          ]
        };
      } else {
        this.$q.notify({
          message: ' Server Response Failed',
          position: 'top',
          type: 'negative'
        });
      }
    }
  }
};
</script>
<style lang="scss">
.table {
  width: 100%;
  overflow: auto;
}
.table-th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: orangered;
  color: white;
}
.table-th1 {
  position: sticky;
  top: 0;
  z-index: 2;
  background: orangered;
  color: white;
}

.table-th,
.table-td {
  text-align: center;
  padding: 12px;
}

.table-tr:nth-child(odd) {
  background-color: white;
}
.table-tr:nth-child(even) {
  background-color: $grey-3;
}
.table-data {
  width: 33.33%;
  text-align: center;
}

::-webkit-scrollbar {
  width: 0px;
}

.inspection-dialog-box {
  height: 60vh;
  width: 50vw;

  .dialog-box-content {
    height: calc(55vh - 90px);
    overflow: auto;
  }
}
.other-dialog-box {
  height: 30vh;
  width: 40vw;
}
</style>
