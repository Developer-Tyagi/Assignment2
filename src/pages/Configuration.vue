<template>
  <q-page class="row height-without-header">
    <SubSideBar
      class="col-2"
      :list="configurationType"
      @onListClick="setSelectedTab"
      :selectedItem="tab.key"
    />
    <div class="col-10">
      <div class="my-font text-bold row q-ma-md">Setup Company Account</div>

      <div class="q-mx-md" flat bordered v-if="tab.key != 'template'">
        <div class="row full-width justify-between">
          <span class="text-bold" style="line-height: 36px">{{
            tab.name
          }}</span>
          <q-btn @click="onClickingAddButton(tab)" color="primary">
            Add {{ tab.name }}
          </q-btn>
        </div>
        <div
          class="bg-grey-3 q-mt-md"
          style="
            position: relative;
            height: calc(100vh - 170px);
            overflow: auto;
            display: flex;
          "
        >
          <table class="table" v-if="table.length">
            <thead>
              <tr class="table-tr" v-if="tab.key !== 'inspectionType'">
                <th class="table-th">Name</th>
                <th class="table-th">Action</th>
              </tr>
              <tr class="table-tr" v-if="tab.key == 'inspectionType'">
                <th class="table-th">Name</th>
                <th class="table-th">Duration</th>
                <th class="table-th">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="table-tr"
                v-for="list in table"
                v-if="tab.key !== 'inspectionType'"
              >
                <td class="table-td">{{ list.value || list.name }}</td>
                <td class="table-td">
                  <span>
                    <!-- <q-icon size="sm" color="primary" name="create" /> -->
                  </span>
                  <span>
                    <!-- <q-icon
                      class="q-ml-xs"
                      size="sm"
                      color="primary"
                      name="delete"
                    /> -->
                  </span>
                </td>
              </tr>
              <tr
                class="table-tr"
                v-for="list in table"
                v-if="tab.key === 'inspectionType'"
              >
                <td class="table-td">
                  <div class="text-bold">{{ list.value }}</div>
                  <div v-for="type in list.subtypes">
                    <div>{{ type.value }}</div>
                  </div>
                </td>
                <td class="table-td">
                  <div>&nbsp;</div>
                  <div v-for="type in list.subtypes">
                    <div>{{ type.duration }}</div>
                  </div>
                </td>
                <td class="table-td">
                  <div>&nbsp;</div>
                  <div v-for="type in list.subtypes">
                    <span>
                      <!-- <q-icon size="sm" color="primary" name="create" /> -->
                    </span>
                    <span>
                      <!-- <q-icon
                        class="q-ml-xs"
                        size="sm"
                        color="primary"
                        name="delete"
                      /> -->
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="q-pa-lg q-ma-auto" v-else>You Have Not Added AnyYet</div>
        </div>
      </div>
      <div v-else>
        <div class="q-mx-md">
          <div class="row full-width justify-between">
            <span class="text-bold" style="line-height: 36px">{{
              tab.name
            }}</span>
            <q-btn @click="openAddTemplateBox" color="primary">
              Add Template
            </q-btn>
          </div>
          <div
            class="bg-grey-3 q-mt-md"
            style="
              position: relative;
              height: calc(100vh - 170px);
              overflow: auto;
              display: flex;
            "
          >
            <table class="table" v-if="table.length">
              <thead>
                <tr class="table-tr">
                  <th class="table-th">Name</th>

                  <th class="table-th">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr class="table-tr" v-for="list in templates">
                  <td class="table-td">{{ list.name.type.value }}</td>

                  <td class="table-td">
                    <span>
                      <q-icon
                        size="sm"
                        color="primary"
                        name="create"
                        @click="onEditTemplate(list)"
                      />
                    </span>
                    <span>
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
          'inspection-dialog-box': tab.key === 'inspectionType',
          'other-dialog-box': tab.key !== 'inspectionType'
        }"
      >
        <q-bar
          class="row justify-between bg-primary text-white"
          style="height: 50px"
        >
          <div class="col-7 text-bold">Add {{ dialogBoxName.name }}</div>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section
          :class="{
            'dialog-box-content': tab.key === 'inspectionType',
            'other-dialog-box-content': tab.key !== 'inspectionType'
          }"
        >
          <div class="column">
            <q-form ref="form" v-if="tab.key !== 'inspectionType'">
              <div class="q-pl-xs">
                <q-input
                  dense
                  v-model="payload.value"
                  class="full-width"
                  outlined
                  :rules="[
                    val =>
                      (val && val.length > 0) ||
                      'Please Fill ' + dialogBoxName.name
                  ]"
                />
              </div>
            </q-form>
            <q-form ref="form" v-if="tab.key == 'inspectionType'">
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
            v-if="tab.key == 'inspectionType'"
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
        <div class="row justify-center q-pa-md">
          <div>
            <q-btn
              color="primary"
              label="Clear"
              class="q-mx-lg"
              @click="clear"
            />
          </div>
          <div>
            <q-btn
              color="primary"
              label="Save"
              class="q-mx-lg"
              @click="onSubmit(tab)"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- Token Dialog Box -->
    <q-dialog
      v-model="tokenDialogBox"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="q-ma-sm" style="width: 35%; height: 75vh">
        <div class="row justify-end" style="height: 50px">
          <q-btn dense flat icon="close" color="black" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </div>
        <table class="table">
          <tr>
            <th class="table-th1" style="width: 26%">NAME</th>
            <th class="table-th" style="">VALUE</th>
            <th class="table-th" style="">DESCRIPTION</th>
          </tr>
        </table>

        <table class="q-ma-md table">
          <div class="full-width" v-for="(usr, index) in tokens">
            <q-expansion-item
              class="q-mx-md"
              expand-separator
              :label="`${usr.group}`"
            >
              <tr class="table-tr" v-for="(user, ind) in usr.tokens">
                <td class="table-td" style="width: 20%">
                  {{ user.name }}
                </td>
                <td
                  class="table-td clickable text-primary"
                  style="height: 26px; font-size: 10px"
                  @click="setValueToTemplate(user.value)"
                >
                  {{ user.value }}
                </td>
                <td class="table-td" style="height: 26px; font-size: 10px">
                  {{ user.desc }}
                </td>
              </tr>
            </q-expansion-item>
          </div>
        </table>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="addTemplateDialogBox"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card style="height: 80%; width: 60%">
        <div class="row justify-between bg-primary" style="height: 50px">
          <div class="text-white text-h6 q-pa-sm">Add Template</div>
          <q-btn dense flat icon="close" color="white" v-close-popup>
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
                dense
                class="input-extra-padding q-ma-sm required"
                v-model="templatetype.value"
                option-value="name"
                option-label="name"
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

            <!-- <q-editor
              v-model="post.body"
              :dense="$q.screen.lt.md"
              :definitions="{
                save: {
                  tip: 'Save your work',
                  icon: 'save',
                  label: 'Save',
                  handler: uploadIt
                },
                upload: {
                  tip: 'Upload to cloud',
                  icon: 'insert_photo',
                  label: 'Upload',
                  handler: insertImg
                },
                create: {
                  tip: 'Upload token',
                  icon: 'add_circle',
                  label: 'Token',
                  handler: tokenDialog
                }
              }"
              :toolbar="[
                [
                  'bold',
                  'italic',
                  'strike',
                  'underline',
                  'right',
                  'center',
                  'justify',
                  'left',
                  'print'
                ],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7'
                    ]
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana'
                    ]
                  },
                  'removeFormat'
                ],
                ['upload', 'save', 'create']
              ]"
              :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana'
              }"
            >
            </q-editor> -->
            <Ckeditor
              :markup="post.body"
              @updateMarkup="updateMarkup"
            ></Ckeditor>
          </div>
          <div class="row justify-center">
            <q-btn
              color="primary"
              label="Save"
              @click="onSaveTemplate"
              class="align-content-center"
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
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { validateEmail } from '@utils/validation';
import SubSideBar from 'components/SubSideBar';
import CustomBar from 'components/CustomBar';
import Ckeditor from 'components/Ckeditor';
import { event } from 'quasar';

export default {
  name: 'SetConfiguration',
  components: {
    SubSideBar,
    CustomBar,
    Ckeditor
  },

  data() {
    return {
      indexValue: '',
      isEdit: false,
      alert: false,
      addTemplateDialogBox: false,
      tokenDialogBox: false,
      templatetype: { value: '', machineValue: '' },
      definitions: {
        insert_img: {
          tip: 'Insertar Imagen',
          icon: 'photo',
          handler: this.insertImg // handler will call insertImg() method
        }
      },
      title: '',
      post: { body: '' },
      editorConfig: {
        // The configuration of the editor.
      },
      dialogBox: false,
      dialogBoxName: {},
      tab: {},
      table: [],
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

  created() {
    this.getTemplates();
    this.getTemplateToken();
    this.getAllTemplate();
    this.getInspectionTypes().then(async () => {
      this.table = this.inspectionTypes;
    });
    this.tab = this.configurationType[0];
  },

  computed: {
    ...mapGetters([
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
      'getTitles',
      'getClientTypes',
      'getContactTypes',
      'getInspectionTypes',
      'getVendorIndustries',
      'getPolicyTypes',
      'getPolicyCategory',
      'getPropertyTypes',
      'getSeverityClaim',
      'getClaimReasons',
      'getLossCauses',
      'getTemplates',
      'addTemplate',
      'getTemplateToken',
      'getAllTemplate',
      'editTemplate',
      'deleteTemplate',
      'addTemplateType'
    ]),
    updateMarkup(val) {
      this.post.body = val;
    },

    openAddTemplateBox() {
      this.isEdit = false;
      this.addTemplateDialogBox = true;
    },

    async onSaveTemplate() {
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
      this.post.body = value.name.value;
      this.templatetype.value = value.name.type.value;
      this.templatetype.machineValue = value.name.type.machineValue;

      this.addTemplateDialogBox = true;
    },

    pasteCapture() {
      console.log(event);
    },
    dragCapture() {
      console.log(event);
    },

    setTypes(value) {
      const obj = this.templateOptions.find(item => {
        return item.name === value;
      });
      this.templatetype.machineValue = obj.machineValue;
    },
    insertImg() {
      // insertImg method
      const post = this.post;
      // create an input file element to open file dialog
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.png, .jpg'; // file extensions allowed
      let file;
      input.onchange = _ => {
        const files = Array.from(input.files);
        file = files[0];

        // lets load the file as dataUrl
        const reader = new FileReader();
        let dataUrl = '';
        reader.onloadend = function() {
          dataUrl = reader.result;

          // append result to the body of your post
          post.body +=
            '<div><img src="' + dataUrl + '" style="height:200px;" /></div>';
        };
        reader.readAsDataURL(file);
      };
      input.click();
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

    async setSelectedTab(e) {
      this.tab = e;
      switch (this.tab.key) {
        case 'inspectionType':
          await this.getInspectionTypes();
          this.table = this.inspectionTypes;
          break;
        case 'honorific':
          await this.getTitles();
          this.table = this.titles;
          break;
        case 'industryType':
          await this.getVendorIndustries();
          this.table = this.vendorIndustries;
          break;
        case 'phoneType':
          await this.getContactTypes();
          this.table = this.contactTypes;
          break;
        case 'clientType':
          await this.getClientTypes();
          this.table = this.clientTypes;
          break;
        case 'policyType':
          await this.getPolicyTypes();
          this.table = this.policyTypes;
          break;
        case 'policyCategories':
          await this.getPolicyCategory();
          this.table = this.policyCategories;
          break;
        case 'propertyType':
          await this.getPropertyTypes();
          this.table = this.propertyTypes;
          break;
        case 'claimReason':
          await this.getClaimReasons();
          this.table = this.claimReasons;
          break;
        case 'lossCause':
          await this.getLossCauses();
          this.table = this.lossCauses;
          break;
        case 'claimSeverity':
          await this.getSeverityClaim();
          this.table = this.claimSeverity;
          break;
        case 'templateType':
          await this.getTemplates();
          this.table = this.templateOptions;
      }
    },

    validateEmail,

    async onSubmit(tab) {
      var vald = await this.$refs.form.validate();
      if (vald) {
        switch (tab.key) {
          case 'inspectionType':
            for (var i = 0; i <= this.inspectionType.subtypes.length - 1; i++) {
              if (this.inspectionType.subtypes[i].value == '') {
                this.inspectionType.subtypes[
                  i
                ].value = this.inspectionType.value;
              }
            }

            var response = await this.addInspectionType(this.inspectionType);
            break;
          case 'honorific':
            var response = await this.addHonorifics(this.payload);
            break;
          case 'industryType':
            var response = await this.addIndustry(this.payload);
            break;
          case 'phoneType':
            var response = await this.addPhone(this.payload);
            break;
          case 'clientType':
            var response = await this.addClientType(this.payload);
            break;
          case 'policyType':
            var response = await this.addPolicy(this.payload);
            break;
          case 'policyCategories':
            var response = await this.addPolicyCategories(this.payload);
            break;
          case 'propertyType':
            var response = await this.addProperty(this.payload);
            break;
          case 'claimReason':
            var response = await this.addClaimReason(this.payload);
            break;
          case 'lossCause':
            var response = await this.addLoss(this.payload);
            break;
          case 'claimSeverity':
            var response = await this.addClaimSeverity(this.payload);
            break;
          case 'templateType':
            var response = await this.addTemplateType(this.payload);
            break;
        }
        if (response) {
          this.setSelectedTab(tab);
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
      if (this.tab.key == 'inspectionType') {
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
        this.getInspectionTypes();
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
  border-collapse: collapse;
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
  padding: 12px;
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
