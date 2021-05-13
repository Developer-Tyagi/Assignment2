<template>
  <q-page>
    <div v-for="(item, index) in claimDocumentArray">
      <q-form ref="validationForm">
        <q-card class="q-ma-sm q-mt-sm">
          <q-select
            dense
            class="input-extra-padding q-ma-sm required"
            v-model="item.id"
            option-value="id"
            option-label="name"
            map-options
            options-dense
            use-input
            input-debounce="0"
            behavior="menu"
            emit-value
            :options="templateOptions"
            @input="setTypes(dropdown, item.id)"
            label="List of Templates"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please fill the template'
            ]"
          />

          <q-btn
            v-if="item.id"
            icon="cloud_upload"
            color="primary"
            @click="uploadFile"
            size="md"
            class="q-ml-xs"
          />
          <div class="q-ml-xs text-bold q-ma-xs " v-if="item.id">Upload</div>
          <div v-for="(doc, index) in claimDocument" class="row-div">
            <div class="vertical-center q-px-md q-py-sm">
              <q-icon name="photo" size="sm" color="primary" />
              <span class="q-pl-md "> {{ claimDocument.documents }}</span>
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
        </q-card>
      </q-form>
    </div>
    <div class=" row justify-between">
      <div>
        <q-btn
          class="q-ma-md"
          size="sm"
          label="Add More"
          color="primary"
          @click="addAnotherDocument(claimDocumentArray)"
        />
      </div>
      <div>
        <q-btn
          v-if="claimDocumentArray.length > 1"
          size="sm"
          class="q-ma-md"
          label="remove"
          color="primary"
          @click="removeAnotherTemplate(claimDocumentArray)"
        />
      </div>
    </div>

    <!-- Add File Dialog  -->

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
            @click="addPdfFileToServer"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CustomBar from 'components/CustomBar';
import FileManager from 'components/FileManager';
import { getCurrentUser } from '@utils/auth';
import request from '@api';
import { jsPDF } from 'jspdf';
import { Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
const { Camera } = Plugins;
export default {
  components: { CustomBar, FileManager },
  data() {
    return {
      isTemplate: '',
      claimDocumentArray: [
        {
          id: '',
          value: '',
          machineValue: ''
        }
      ],
      depth: [],
      addFileDialog: false,
      fileName: '',
      documents: [],
      userRole: ''
    };
  },
  async created() {
    this.getClaimDocument(this.selectedClaimId);
    this.getTemplates();
    this.userRole = getCurrentUser().attributes.roles[0];
  },
  computed: {
    ...mapGetters(['templateOptions', 'selectedClaimId', 'claimDocument'])
  },

  methods: {
    ...mapActions(['getTemplates', 'getClaimDocument', 'uploadClaimDocument']),
    ...mapMutations(['setLoading']),

    setTypes(types, data) {
      const obj = types.find(item => {
        return item.id === data.id;
      });
      data.machineValue = obj.machineValue;
      data.value = obj.name;
      this.isTemplate = data.id;
    },
    onDeleteDocument(index) {},
    addAnotherDocument(array) {
      const len = array.length;
      if (array[len - 1] && array[len - 1].id) {
        array.push({ id: '', value: '', machineValue: '' });
      } else {
        this.$q.notify({
          message: 'fill the template type first  ',
          position: 'top',
          type: 'negative'
        });
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
    },
    closeAddFile() {
      this.fileName = '';
      this.addFileDialog = false;
    },
    async addPdfFileToServer() {
      if (this.fileName) {
        this.setLoading(true);
        const formData = new FormData();
        formData.append(
          'file',
          this.dataURItoBlob(this.pdfImage),
          this.fileName
        );
        formData.append('location', 'estimation');
        const payload = {
          id: this.selectedClaimId,
          formData: formData
        };

        await this.uploadClaimDocument(payload);
        this.fileName = '';
        this.addFileDialog = false;
        this.uploadFilesOptions = false;
        this.getClaimDocument(this.selectedClaimId);
      }
    },

    async uploadFile() {
      const success = true;
      if (success) {
        const imageData = await Camera.getPhoto({
          quality: 100,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
          direction: CameraDirection.Rear
        });
        this.setLoading(true);

        const jsPDFObj = new jsPDF('p', 'mm');
        jsPDFObj.addImage(imageData.dataUrl, 10, 10);
        this.pdfImage = jsPDFObj.output('datauristring');
        this.addFileDialog = true;
        this.setLoading(false);
      }
    },
    removeAnotherTemplate(array) {
      array.pop();
    }
  }
};
</script>
