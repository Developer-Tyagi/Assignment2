<template>
  <q-page>
    <div class="mobile-container-page-without-search">
      <div class="stepper">
        <div class="step justify-between" id="step">
          <div
            class="column align-center q-px-md"
            v-for="(arr, index) in stepArr"
            @click="onStepClick(index)"
          >
            <div
              :class="{
                'icon-div-selected': index == step,
                'icon-div-done': index < step,
                'icon-div': index > step
              }"
              class="q-mx-auto"
            >
              <q-icon
                v-if="index == step"
                size="14px"
                name="create"
                color="white"
                style="margin: auto"
              />
              <q-icon
                v-if="index < stepClickValidTill && index != step"
                size="14px"
                name="done"
                color="white"
                style="margin: auto"
              />
            </div>
            <div class="label">{{ arr.name }}</div>
          </div>
        </div>
        <div class="form">
          <q-form
            @submit="onNextButtonClick(0)"
            :hidden="step != 0"
            ref="estimate"
          >
            <div class="stepper-heading">Upload Your Estimate</div>
            <q-card class="form-card q-pa-md">
              <div
                v-for="(doc, index) in claimDocument.attributes.documents"
                class="row-div"
              >
                <div class="vertical-center q-px-sm q-py-sm">
                  <div class="row">
                    <q-icon
                      :name="iconType(doc.mimeType)"
                      size="sm"
                      color="primary"
                    />
                    <span class="q-pl-md" @click="onDocClick(doc)">
                      {{ doc.name }}</span
                    >
                    <q-btn
                      class="q-ml-auto"
                      icon="delete"
                      size="sm"
                      text-color="primary"
                      @click="onDeleteDocument(doc, index)"
                      flat
                    />
                  </div>
                </div>
              </div>
              <div
                class="row"
                v-if="claimDocument.attributes.documents.length < 1"
              >
                <div class="column">
                  <q-btn
                    class="q-ml-md"
                    icon="cloud_upload"
                    text-color="primary"
                    style="width: 50px"
                    @click="onClickUploadButton"
                  />
                  <div class="form-heading q-ml-md">Upload</div>
                  <input
                    id="uploadFile"
                    type="file"
                    accept="image/*,.pdf"
                    hidden
                    @change="onEstimateFileInputClick"
                  />
                </div>
                <div>
                  <q-btn
                    class="q-ml-md"
                    icon="add_a_photo"
                    @click="addFile('estimate')"
                    text-color="primary"
                    style="width: 50px"
                  />
                  <div class="form-heading q-ml-lg">Scan</div>
                </div>
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey">Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(1)"
            @reset="onBackButtonClick(1)"
            :hidden="step != 1"
            ref="photos"
          >
            <q-card class=" q-mb-md">
              <div class="row">
                <p class="q-mx-none q-my-auto q-ml-sm">
                  Are you using photo id app to generate a Report
                </p>

                <q-toggle class="q-ml-auto" v-model="isGenerateReport" />
              </div>

              <span class="stepper-heading" v-if="isGenerateReport">
                <!-- get Reports from Photo ID App -->
                <!-- v-if="!photoReport" -->

                <div class="vertical-center q-px-sm q-py-sm" v-if="photoReport">
                  <div class="row">
                    <q-icon
                      :name="
                        iconType(photoReport.attributes.documents[0].mimeType)
                      "
                      size="sm"
                      color="primary"
                    />
                    <span
                      class="q-pl-md"
                      @click="onDocClick(photoReport.attributes.documents[0])"
                    >
                      {{ photoReport.attributes.documents[0].name }}</span
                    >
                  </div>
                </div>
                <q-btn
                  color="primary"
                  class=" q-mt-auto text-capitalize q-ma-sm"
                  @click="getReportClick"
                  :label="!photoReport ? 'Get Report' : 'Regenerate Report'"
                >
                </q-btn>
              </span>
            </q-card>
            <div v-if="!isGenerateReport">
              <q-card class="q-pa-md form-card">
                <div class="stepper-heading q-mb-md">
                  Please Upload Photos
                </div>
                <div v-for="(item, index) in claimDocumentArray">
                  <div
                    v-for="(doc, index) in claimPhoto.documents"
                    class="row-div"
                  >
                    <div class="vertical-center q-px-sm q-py-sm">
                      <div class="row q-ml-none">
                        <q-icon
                          :name="iconType(doc.mimeType)"
                          size="sm"
                          class="q-ml-none"
                          color="primary"
                        />
                        <span class="q-pl-md" @click="onDocClick(doc)">
                          {{ doc.name }}</span
                        >
                        <q-btn
                          class="q-ml-auto"
                          icon="delete"
                          size="sm"
                          text-color="primary"
                          @click="onDeleteDocument(doc, index)"
                          flat
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <div>
                      <input
                        id="uploadFile"
                        type="file"
                        hidden
                        @change="onPhotoFileInputClick"
                        accept="image/*,.pdf"
                      />
                      <q-btn
                        class="q-ml-md"
                        icon="cloud_upload"
                        text-color="primary"
                        style="width: 50px"
                        @click="onClickUploadButton"
                      />
                      <div class="form-heading q-ml-md">Upload</div>
                    </div>
                  </div>
                  <div>
                    <q-btn
                      class="q-ml-md"
                      icon="add_a_photo"
                      @click="addFile('uploadPhoto')"
                      text-color="primary"
                      style="width: 50px"
                    />
                    <div class="form-heading q-ml-lg">Scan</div>
                  </div>
                </div>
              </q-card>
            </div>

            <div class="row q-pt-md">
              <div>
                <q-btn
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="reset"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
          <q-form
            @submit="onNextButtonClick(2)"
            @reset="onBackButtonClick(2)"
            :hidden="step != 2"
            ref="sketches"
          >
            <span class="stepper-heading">Please Upload Sketches</span>
            <q-card class="q-pa-md form-card">
              <div v-for="(item, index) in claimSketches">
                <div
                  v-for="(doc, index) in claimSketch.documents"
                  class="row-div"
                >
                  <div class="vertical-center q-px-sm q-py-sm">
                    <div class="row">
                      <q-icon
                        :name="iconType(doc.mimeType)"
                        size="sm"
                        color="primary"
                      />
                      <span class="q-pl-md" @click="onDocClick(doc)">
                        {{ doc.name }}</span
                      >
                      <q-btn
                        class="q-ml-auto"
                        icon="delete"
                        size="sm"
                        text-color="primary"
                        @click="onDeleteDocument(doc, index)"
                        flat
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <div>
                    <q-btn
                      class="q-ml-md "
                      icon="cloud_upload"
                      text-color="primary"
                      style="width: 50px"
                      @click="onClickSketchUploadButton"
                    />
                    <div class="form-heading q-ml-md">Upload</div>
                    <input
                      id="uploadSketchFile"
                      type="file"
                      @change="onSketchFileInputClick"
                      accept="image/*,.pdf"
                      hidden
                    />
                  </div>
                </div>
                <div>
                  <q-btn
                    class="q-ml-md"
                    icon="add_a_photo"
                    text-color="primary"
                    @click="addFile('uploadSketches')"
                    style="width: 50px"
                  />
                  <div class="form-heading q-ml-lg">Scan</div>
                </div>
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="reset"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>

          <!-- We will Implement this stepper later   -->

          <!-- <q-form
            @submit="onNextButtonClick(3)"
            @reset="onBackButtonClick(3)"
            :hidden="step != 3"
            ref="esx"
          >
            <span class="stepper-heading">Please Upload ESX Files</span>
            <q-card class="q-pa-md form-card">
              <div v-for="(item, index) in claimSketches">
                <div v-for="(doc, index) in esxDocs.documents" class="row-div">
                  <div class="vertical-center q-px-md q-py-sm">
                    <div class="row">
                      <q-icon name="photo" size="sm" color="primary" />
                      <span class="q-pl-md" @click="onDocClick(doc)">
                        {{ doc.name }}</span
                      >
                      <q-btn
                        class="q-ml-auto"
                        icon="delete"
                        size="sm"
                        text-color="primary"
                        @click="onDeleteDocument(index)"
                        flat
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="column">
                  <div>
                    <input
                      id="uploadEsxFile"
                      type="file"
                      hidden
                      accept="application/esx"
                    />
                    <q-btn
                      class="q-ml-md"
                      icon="cloud_upload"
                      text-color="primary"
                      style="width: 50px"
                      @click="onClickUploadButton('upload3')"
                    />
                    <div class="form-heading q-ml-md">
                      Upload
                    </div>
                  </div>
                </div>
                <div>
                  <q-btn
                    class="q-ml-md"
                    icon="add_a_photo"
                    text-color="primary"
                    @click="addFile('esx')"
                    style="width: 50px"
                  />
                  <div class="form-heading q-ml-lg">Scan</div>
                </div>
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  type="reset"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form> -->
          <q-form
            @submit="onNextButtonClick(3)"
            @reset="onBackButtonClick(3)"
            :hidden="step != 3"
            ref="additionalDoc"
          >
            <q-card class="q-pa-md form-card">
              <div class="row">
                <p class="q-mx-none q-my-auto">
                  <label> Do you have any additional documents</label>
                </p>
                <q-toggle class="q-ml-auto" v-model="additionalDocuments" />
              </div>
              <div class="row" v-if="additionalDocuments">
                <div
                  v-for="(doc, index) in additionalDocs.documents"
                  class="row-div"
                >
                  <div class="vertical-center q-px-xs q-py-sm">
                    <div class="row">
                      <q-icon
                        :name="iconType(doc.mimeType)"
                        size="sm"
                        color="primary"
                      />
                      <span class="q-pl-md" @click="onDocClick(doc)">
                        {{ doc.name }}</span
                      >
                      <q-btn
                        class="q-ml-auto"
                        icon="delete"
                        size="sm"
                        text-color="primary"
                        @click="onDeleteDocument(doc, index)"
                        flat
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="additionalDocuments">
                <div class="column">
                  <div>
                    <input
                      id="uploadDocFile"
                      type="file"
                      hidden
                      @change="onDocFileInputClick"
                      accept="image/*,.pdf"
                    />
                    <q-btn
                      class="q-ml-md"
                      icon="cloud_upload"
                      text-color="primary"
                      style="width: 50px"
                      @click="onClickAdditionalUploadButton"
                    />
                    <div class="form-heading q-ml-md">Upload</div>
                  </div>
                </div>
                <div>
                  <q-btn
                    class="q-ml-md"
                    icon="add_a_photo"
                    text-color="primary"
                    @click="addFile('additionalDocs')"
                    style="width: 50px"
                  />
                  <div class="form-heading q-ml-lg">Scan</div>
                </div>
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  type="reset"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Next</span>
                <q-btn
                  class="rotate-180"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="submit"
                />
              </div>
            </div>
          </q-form>
          <q-form
            @reset="onBackButtonClick(4)"
            :hidden="step != 4"
            ref="estimateAmount"
          >
            <span class="stepper-heading"> Please enter estimate amount</span>
            <q-card class="q-pa-md form-card">
              <div class="row" style="align-items: center">
                <span class="form-heading">Estimated Loss Amount</span>
                <!-- <q-input
                  dense
                  mask="#.#"
                  type="number"
                  v-model.number="estimatedLossAmt"
                  placeholder="Estimated Loss Amount"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding required"
                  lazy-rules
                  :rules="[val => val || 'please fill Estimated Loss Amount']"
                /> -->
                <q-input
                  dense
                  v-model.number="estimatedLossAmt"
                  mask="#.#"
                  type="number"
                  class="required"
                  label="Estimated Loss Amount"
                  style="margin-left: auto; width: 50%"
                  lazy-rules
                  :rules="[val => val || 'please fill Estimated Loss Amount']"
                >
                  <template v-slot:prepend>
                    <q-icon name="$" size="sm"></q-icon>
                  </template>
                </q-input>
              </div>
              <div class="row" style="align-items: center">
                <span class="form-heading">Property Loss Amount</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  v-model.number="propertyValue"
                  label="Property Loss Amount"
                  style="margin-left: auto; width: 50%"
                  class="input-extra-padding required"
                  lazy-rules
                  :rules="[val => val || 'please fill Property Loss Amount']"
                >
                  <template v-slot:prepend>
                    <q-icon name="$" size="sm"></q-icon>
                  </template>
                </q-input>
              </div>
            </q-card>
            <div class="row q-pt-md">
              <div>
                <q-btn
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                  type="reset"
                />
                <span class="q-ml-md text-color-grey">Back</span>
              </div>
              <div class="q-ml-auto">
                <span class="q-mr-md text-color-grey"> Submit</span>
                <q-btn
                  class="rotate-180"
                  @click="onSubmit"
                  icon="keyboard_backspace"
                  text-color="primary"
                  padding="md"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>

    <!-- Alert delete Box -->
    <q-dialog v-model="alertDailog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure ! You want to delete this
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="alertDailog = false"
          ></q-btn>
          <q-btn
            flat
            label="Delete"
            color="primary"
            v-close-popup
            @click="removeDocument()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
import { getCurrentUser } from '@utils/auth';
// import { jsPDF } from 'jspdf';
const { Camera } = Plugins;

export default {
  data() {
    return {
      dataURl: '',
      photoReport: '',
      uploadEstimateFileName: '',
      estimateFileName: '',
      driveId: '',
      docType: '',
      alertDailog: false,
      files: '',
      model: null,
      fileName: '',
      sketchName: '',
      addDocName: '',
      esxFileName: '',
      addFileDialog: false,
      additionalDocuments: false,
      additionalDocsDialog: false,
      isGenerateReport: false,
      addSketchesDialog: false,
      esxDialog: false,
      estimatedLossAmt: '',
      propertyValue: '',
      depth: [],
      documents: [],
      step: 0,
      claimDocumentArray: [
        {
          id: '',
          value: '',
          machineValue: ''
        }
      ],
      claimSketches: [
        {
          id: '',
          value: '',
          machineValue: ''
        }
      ],
      additionalDocument: [
        {
          id: '',
          value: '',
          machineValue: ''
        }
      ],
      stepClickValidTill: 0,
      stepArr: [
        { name: 'upload estimate', ref: 'estimate' },
        { name: 'upload photos', ref: 'photos' },
        { name: 'upload sketches', ref: 'sketches' },
        // { name: 'upload ESX File', ref: 'esx' },
        { name: 'additional documents', ref: 'additionalDoc' },
        { name: 'estimate amount', ref: 'estimateAmount' }
      ]
    };
  },

  methods: {
    ...mapActions([
      'getClaimEstimateDoc',
      'uploadClaimDocument',
      'getClaimPhoto',
      'getClaimSketch',
      'getAdditionalDocs',
      'getEsxDocs',
      'completeEstimate',
      'deleteClaimDocument',
      'generatePhotoReport'
    ]),
    ...mapMutations(['setLoading', 'isLastRouteEdit']),
    async getReportClick() {
      const payload = {
        claimID: this.selectedClaimId,
        data: {}
      };
      const response = await this.generatePhotoReport(payload);

      this.photoReport = response;
      if (!response) {
        this.$q.notify({
          message: 'Assignment link has not been generated yet ',
          position: 'top',
          type: 'negative'
        });
      }
    },
    async removeDocument() {
      const payload = {
        claimID: this.selectedClaimId,
        driveID: this.driveId
      };

      await this.deleteClaimDocument(payload);
      this.driveId = '';
      switch (this.docType) {
        case 'estimate':
          this.getClaimEstimateDoc(this.selectedClaimId);
          break;
        case 'additional_doc':
          this.getAdditionalDocs(this.selectedClaimId);
          break;
        case 'photo_report':
          this.getClaimPhoto(this.selectedClaimId);
          break;
        case 'sketch':
          this.getClaimSketch(this.selectedClaimId);
          break;
        case 'esx':
          this.getEsxDocs(this.selectedClaimId);
          break;
      }
    },
    async onEstimateFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
      this.uploadPdfToServer('upload');
    },

    async onPhotoFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
      this.uploadPdfToServer('upload1');
    },

    async onSketchFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
      this.uploadPdfToServer('upload2');
    },

    async onDocFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
      this.uploadPdfToServer('upload4');
    },
    onFileInputClick() {},
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    onDeleteDocument(doc, index) {
      this.alertDailog = true;
      this.docType = doc.type;
      switch (this.docType) {
        case 'additional_doc':
          this.driveId = this.additionalDocs.documents[index].driveID;
          break;
        case 'estimate':
          this.driveId = this.claimDocument.attributes.documents[index].driveID;

          break;
        case 'photo_report':
          this.driveId = this.claimPhoto.documents[index].driveID;
          break;
        case 'sketch':
          this.driveId = this.claimSketch.documents[index].driveID;
          break;
        case 'esx':
          this.driveId = this.esxDocs.documents[index].driveID;
          break;
      }
    },
    onDocClick(document) {
      window.open(document.webViewLink);
    },
    async onSubmit() {
      const success = await this.$refs.estimateAmount.validate();
      if (success) {
        const payload = {
          claimID: this.selectedClaimId,
          data: {
            estimatedLossAmt: this.estimatedLossAmt,
            propertyValue: this.propertyValue
          }
        };
        if (!this.propertyValue) {
          delete payload.data.propertyValue;
        }
        await this.completeEstimate(payload);
        if (this.userRole == 'estimator') {
          this.$router.push('/claim-summary');
        } else {
          this.isLastRouteEdit(true);
          this.$router.push('/claim-details');
        }
      }
    },
    async uploadPdfToServer(value) {
      const formData = new FormData();
      switch (value) {
        case 'upload':
          formData.append('file', this.dataURItoBlob(this.dataURl));
          formData.append('type', 'estimate');
          const payload6 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload6);
          this.uploadEstimateFileName = '';
          this.uploadEstimateDialog = false;
          this.getClaimEstimateDoc(this.selectedClaimId);
          this.setLoading(false);
          this.dataURl = '';
          break;
        case 'upload1':
          formData.append('file', this.dataURItoBlob(this.dataURl));

          formData.append('type', 'photo_report');
          const payload1 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload1);

          this.getClaimPhoto(this.selectedClaimId);
          this.dataURl = '';
          this.setLoading(false);
          break;
        case 'upload2':
          formData.append('file', this.dataURItoBlob(this.dataURl));
          formData.append('type', 'sketch');
          const payload = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload);

          this.getClaimSketch(this.selectedClaimId);
          this.dataURl = '';
          this.setLoading(false);
          break;
        case 'upload4':
          formData.append('file', this.dataURItoBlob(this.dataURl));
          formData.append('type', 'additional_doc');
          const payload4 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload4);
          this.getAdditionalDocs(this.selectedClaimId);
          this.setLoading(false);
          break;
        // case 'upload3':
        //   formData.append(
        //     'file',
        //     this.dataURItoBlob(this.dataURl),
        //     this.upload3FileName
        //   );
        //   formData.append('type', 'esx');
        //   const payload3 = {
        //     id: this.selectedClaimId,
        //     formData: formData
        //   };
        //   await this.uploadClaimDocument(payload3);
        //   this.upload3FileName = '';
        //   this.upload3Dialog = false;
        //   this.getEsxDocs(this.selectedClaimId);
        //   this.setLoading(false);
        //   this.dataURl = '';
        //   break;
      }
    },
    onClickUploadButton() {
      document.getElementById('uploadFile').click();
    },
    onClickAdditionalUploadButton() {
      document.getElementById('uploadDocFile').click();
    },
    onClickSketchUploadButton() {
      document.getElementById('uploadSketchFile').click();
    },
    closeAddFile() {
      this.fileName = '';
      this.addFileDialog = false;
    },

    iconType(type) {
      const filetype = type.split('/').pop();
      switch (filetype) {
        case 'pdf':
          return 'picture_as_pdf';
        case 'png':
        case 'jpeg':
          return 'photo';
      }
    },
    async onStepClick(index) {
      if (this.step < index) {
        const validation = await this.$refs[
          this.stepArr[this.step].ref
        ].validate();
        if (index <= this.stepClickValidTill) {
          if (validation) {
            this.step = index;
          }
        }
      } else {
        const validation = await this.$refs[
          this.stepArr[this.step].ref
        ].validate();
        if (validation) {
          this.step = index;
        }
      }
    },

    addAnotherDocument(array) {
      array.push({ id: '', value: '', machineValue: '' });
    },

    async onNextButtonClick() {
      this.step++;

      switch (this.stepArr[this.step].ref) {
        case 'photos':
          this.getClaimPhoto(this.selectedClaimId);
          break;
        case 'sketches':
          this.getClaimSketch(this.selectedClaimId);
          break;
        case 'additionalDoc':
          this.getAdditionalDocs(this.selectedClaimId);
          break;
      }
      if (this.stepClickValidTill < this.step) {
        this.stepClickValidTill = this.step;
      }
      if (this.step == 1) {
        const payload = {
          claimID: this.selectedClaimId,
          data: {}
        };
        const response = await this.generatePhotoReport(payload);
        if (response) {
          this.isGenerateReport = true;
          this.photoReport = response;
        }
      }

      document.getElementById('step').scrollLeft += 50;
    },
    async addFile(value) {
      const imageData = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        direction: CameraDirection.Rear
      });
      await this.setLoading(true);
      // const jsPDFObj = new jsPDF('p', 'mm');
      // jsPDFObj.addImage(imageData.dataUrl, 10, 10);
      this.pdfImage = imageData.dataUrl;

      switch (value) {
        case 'estimate':
          this.addPdfFileToServer('estimate');
          break;
        case 'uploadPhoto':
          this.addPdfFileToServer('uploadPhoto');
          break;
        case 'uploadSketches':
          this.addPdfFileToServer('uploadSketch');
          break;
        case 'additionalDocs':
          this.addPdfFileToServer('additionalDocs');
          break;
        case 'esx':
      }
      this.setLoading(false);
    },

    onBackButtonClick() {
      this.step--;
      document.getElementById('step').scrollLeft -= 50;
    },
    async addPdfFileToServer(value) {
      this.setLoading(true);
      const formData = new FormData();
      switch (value) {
        case 'estimate':
          formData.append('file', this.dataURItoBlob(this.pdfImage));
          formData.append('type', 'estimate');
          const Estimatepayload = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(Estimatepayload);
          // this.estimateFileName = '';
          // this.addEstimateDialog = false;
          this.getClaimEstimateDoc(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'uploadSketch':
          formData.append('file', this.dataURItoBlob(this.pdfImage));
          formData.append('type', 'sketch');
          const sketchPayload = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(sketchPayload);

          this.getClaimSketch(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'uploadPhoto':
          formData.append('file', this.dataURItoBlob(this.pdfImage));
          formData.append('type', 'photo_report');
          const payload1 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload1);
          this.getClaimPhoto(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'additionalDocs':
          formData.append('file', this.dataURItoBlob(this.pdfImage));
          formData.append('type', 'additional_doc');
          const payload2 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload2);

          this.getAdditionalDocs(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'esxFile':
          formData.append('file', this.dataURItoBlob(this.pdfImage));
          formData.append('type', 'esx');
          const payload3 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload3);

          this.getEsxDocs(this.selectedClaimId);
          this.setLoading(false);
          break;
      }
    },
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    }
  },
  computed: {
    ...mapGetters([
      'selectedClaimId',
      'claimDocument',
      'claimPhoto',
      'claimSketch',
      'additionalDocs',
      'esxDocs'
    ])
  },

  async created() {
    this.userRole = getCurrentUser().attributes.roles[0].machineValue;
    this.getClaimEstimateDoc(this.selectedClaimId);
    //ToDo
    // this.getEsxDocs(this.selectedClaimId);
  }
};
</script>
<style lang="scss">
.text-color-grey {
  color: #333333;
}
.text-color-light-grey {
  color: #999999;
}

.form-card {
  min-height: 250px;
  max-height: calc(100vh - 230px);
  overflow: scroll;
}

.stepper {
  .step {
    display: flex;
    overflow-x: auto;
    padding: 10px;

    .icon-div-selected {
      background: $primary;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }
    .icon-div-done {
      background: green;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }

    .icon-div {
      background: $grey;
      display: flex;
      height: 18px;
      width: 18px;
      border-radius: 50%;
    }

    .label {
      text-transform: capitalize;
      text-align: center;
      font-size: x-small;
      margin-top: 10pxasd;
    }
  }

  .form {
    height: calc(100vh - 140px);
    padding: 10px;
  }
}
</style>
