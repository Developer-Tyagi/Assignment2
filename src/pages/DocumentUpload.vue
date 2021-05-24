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
                    @click="onClickUploadButton('upload')"
                  />
                  <div class="form-heading q-ml-md">Upload</div>
                  <input
                    id="uploadFile"
                    type="file"
                    accept="image/*,.pdf"
                    hidden
                    @change="onFileInputClick"
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
            <q-card class="q-pa-md  q-mb-md ">
              <div class="row">
                <p class="q-mx-none q-my-auto">
                  <label>
                    are you using photo id app to generate a Report</label
                  >
                </p>
                <q-toggle class="q-ml-auto" v-model="isGenerateReport" />
              </div>

              <span class="stepper-heading" v-if="isGenerateReport">
                get Reports from Photo ID App
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
                      <div class="row q-ml-none ">
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
                        @change="onFileInputClick"
                        accept="image/*,.pdf"
                      />
                      <q-btn
                        class="q-ml-md"
                        icon="cloud_upload"
                        text-color="primary"
                        style="width: 50px"
                        @click="onClickUploadButton('upload1')"
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
            <span class="stepper-heading ">Please Upload Sketches</span>
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
                    <input
                      id="uploadFile"
                      type="file"
                      hidden
                      @change="onFileInputClick"
                      accept="image/*,.pdf"
                    />
                    <q-btn
                      class="q-ml-md"
                      icon="cloud_upload"
                      text-color="primary"
                      style="width: 50px"
                      @click="onClickUploadButton('upload2')"
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
                  <div class="vertical-center q-px-xs q-py-sm ">
                    <div class="row ">
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
                      id="uploadFile"
                      type="file"
                      hidden
                      @change="onFileInputClick"
                      accept="image/*,.pdf"
                    />
                    <q-btn
                      class="q-ml-md"
                      icon="cloud_upload"
                      text-color="primary"
                      style="width: 50px"
                      @click="onClickUploadButton('upload4')"
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
                <q-input
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
                />
              </div>
              <div class="row" style="align-items: center">
                <span class="form-heading">Property Loss Amount</span>
                <q-input
                  dense
                  mask="#.#"
                  type="number"
                  v-model.number="propertyValue"
                  placeholder="Property Loss Amount"
                  style="margin-left: auto; width: 50%"
                  prefix="$"
                  class="input-extra-padding"
                />
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

    <!-- Add Photo Dialog  -->

    <q-dialog v-model="addFileDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="fileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="closeAddFile" />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="addPdfFileToServer('uploadPhoto')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Add EstimateDialog Dialog  -->

    <q-dialog v-model="addEstimateDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="estimateFileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="addEstimateDialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="addPdfFileToServer('estimate')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--    Add Sketches Dialog -->

    <q-dialog v-model="addSketchesDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add sketch as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="sketchName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="addSketchesDialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="addPdfFileToServer('uploadSketch')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Add Additional Document Dialog  -->

    <q-dialog v-model="additionalDocsDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add sketch as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="addDocName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="additionalDocsDialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="addPdfFileToServer('additionalDocs')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Add ESX  Document Dialog  -->

    <q-dialog v-model="esxDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add esx file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="esxFileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="esxDialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="addPdfFileToServer('esxFile')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Upload1 File Dialog under photos  -->

    <q-dialog v-model="upload1Dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="upload1FileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="upload1Dialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="uploadPdfToServer('upload1')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- uploadEstimateDialog File Dialog -->

    <q-dialog v-model="uploadEstimateDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="uploadEstimateFileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="uploadEstimateDialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="uploadPdfToServer('upload')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Upload1 File Dialog under photos  -->

    <q-dialog v-model="upload1Dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="upload1FileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="upload1Dialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="uploadPdfToServer('upload1')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Upload 2 File Dialog under photos  -->

    <q-dialog v-model="upload2Dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="upload2FileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="upload2Dialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="uploadPdfToServer('upload2')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Upload3 File Dialog under photos  -->

    <q-dialog v-model="upload3Dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="upload3FileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="upload3Dialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="uploadPdfToServer('upload3')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Upload 4 File Dialog under photos  -->

    <q-dialog v-model="upload4Dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="folder"
            color="primary"
            text-color="white"
            size="md"
          />
          <span class="q-ml-sm">Add file as</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense dense v-model="upload4FileName" autofocus />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="upload4Dialog = false"
          />
          <q-btn
            flat
            label="Submit"
            color="primary"
            @click="uploadPdfToServer('upload4')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
// import { jsPDF } from 'jspdf';
const { Camera } = Plugins;

export default {
  data() {
    return {
      dataURl: '',
      addEstimateDialog: false,
      uploadEstimateDialog: false,
      uploadEstimateFileName: '',
      estimateFileName: '',
      driveId: '',
      docType: '',
      alertDailog: false,
      files: '',
      upload1Dialog: false,
      upload2Dialog: false,
      upload3Dialog: false,
      upload4Dialog: false,
      upload1FileName: '',
      upload2FileName: '',
      upload3FileName: '',
      upload4FileName: '',
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
      'deleteClaimDocument'
    ]),
    ...mapMutations(['setLoading']),
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
    async onFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
    },
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
        await this.completeEstimate(this.selectedClaimId);
        this.$router.push('/claim-summary');
      }
    },
    async uploadPdfToServer(value) {
      const formData = new FormData();
      switch (value) {
        case 'upload':
          formData.append(
            'file',
            this.dataURItoBlob(this.dataURl),
            this.uploadEstimateFileName
          );
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
          formData.append(
            'file',
            this.dataURItoBlob(this.dataURl),
            this.upload1FileName
          );

          formData.append('type', 'photo_report');
          const payload1 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload1);
          this.upload1FileName = '';
          this.upload1Dialog = false;
          this.getClaimPhoto(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'upload2':
          formData.append(
            'file',
            this.dataURItoBlob(this.dataURl),
            this.upload2FileName
          );
          formData.append('type', 'sketch');
          const payload = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload);
          this.upload2FileName = '';
          this.upload2Dialog = false;
          this.getClaimSketch(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'upload4':
          formData.append(
            'file',
            this.dataURItoBlob(this.dataURl),
            this.upload4FileName
          );
          formData.append('type', 'additional_doc');
          const payload4 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload4);
          this.upload4FileName = '';
          this.upload4Dialog = false;
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
    async onClickUploadButton(value) {
      switch (value) {
        case 'upload':
          await document.getElementById('uploadFile').click();
          this.uploadEstimateDialog = true;
          break;
        case 'upload1':
          await document.getElementById('uploadFile').click();
          this.upload1Dialog = true;
          break;
        case 'upload2':
          await document.getElementById('uploadFile').click();
          this.upload2Dialog = true;
          break;
        case 'upload4':
          await document.getElementById('uploadFile').click();
          this.upload4Dialog = true;
          break;
        // case 'upload3':
        //   await document.getElementById('uploadEsxFile').click();
        //   this.upload3Dialog = true;
        //   break;
      }
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

    onNextButtonClick() {
      this.step++;
      if (this.stepClickValidTill < this.step) {
        this.stepClickValidTill = this.step;
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
      this.setLoading(true);
      // const jsPDFObj = new jsPDF('p', 'mm');
      // jsPDFObj.addImage(imageData.dataUrl, 10, 10);
      this.pdfImage = imageData.dataUrl;
      switch (value) {
        case 'estimate':
          this.addEstimateDialog = true;
          break;
        case 'uploadPhoto':
          this.addFileDialog = true;
          break;
        case 'uploadSketches':
          this.addSketchesDialog = true;

          break;
        case 'additionalDocs':
          this.additionalDocsDialog = true;
          break;
        case 'esx':
          this.esxDialog = true;
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
          formData.append(
            'file',
            this.dataURItoBlob(this.pdfImage),
            this.estimateFileName
          );
          formData.append('type', 'estimate');
          const Estimatepayload = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(Estimatepayload);
          this.estimateFileName = '';
          this.addEstimateDialog = false;
          this.getClaimEstimateDoc(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'uploadSketch':
          formData.append(
            'file',
            this.dataURItoBlob(this.pdfImage),
            this.sketchName
          );
          formData.append('type', 'sketch');
          const payload = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload);
          this.sketchName = '';
          this.addSketchesDialog = false;
          this.getClaimSketch(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'uploadPhoto':
          formData.append(
            'file',
            this.dataURItoBlob(this.pdfImage),
            this.fileName
          );
          formData.append('type', 'photo_report');
          const payload1 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload1);
          this.fileName = '';
          this.addFileDialog = false;
          this.getClaimPhoto(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'additionalDocs':
          formData.append(
            'file',
            this.dataURItoBlob(this.pdfImage),
            this.addDocName
          );
          formData.append('type', 'additional_doc');
          const payload2 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload2);
          this.addDocName = '';
          this.additionalDocsDialog = false;
          this.getAdditionalDocs(this.selectedClaimId);
          this.setLoading(false);
          break;
        case 'esxFile':
          formData.append(
            'file',
            this.dataURItoBlob(this.pdfImage),
            this.esxFileName
          );
          formData.append('type', 'esx');
          const payload3 = {
            id: this.selectedClaimId,
            formData: formData
          };
          await this.uploadClaimDocument(payload3);
          this.esxFileName = '';
          this.esxDialog = false;
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
    this.getClaimEstimateDoc(this.selectedClaimId);
    this.getClaimPhoto(this.selectedClaimId);
    this.getClaimSketch(this.selectedClaimId);
    this.getAdditionalDocs(this.selectedClaimId);
    this.getEsxDocs(this.selectedClaimId);
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
