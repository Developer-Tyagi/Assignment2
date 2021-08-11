<template>
  <div>
    <div class="stepper-heading q-ma-md q-ml-sm">
      Please Upload Vendor Documents
    </div>
    <q-card class="q-pa-md q-ma-md q-mt-sm">
      <div v-for="(doc, index) in vendorDocument.documents" class="row-div">
        <div class="vertical-center q-px-sm q-py-sm">
          <div class="row">
            <q-icon :name="iconType(doc.mimeType)" size="sm" color="primary" />
            <span class="q-pl-md" @click="onDocClick(doc)">
              {{ doc.name }}</span
            >
            <q-btn
              class="q-ml-xl"
              icon="delete"
              size="sm"
              text-color="primary"
              @click="onDeleteDocument(index)"
              flat
            />
          </div>
        </div>
      </div>

      <div class="row justify-center">
        <div class="column q-mr-md">
          <img
            class="q-ml-lg q-my-xs  "
            src="~assets/upload.svg"
            style="width:50%;"
            @click="onClickUploadButton"
          />
          <div class="form-heading q-ml-lg">Upload</div>
          <input
            id="uploadFile"
            type="file"
            accept="image/*,.pdf"
            hidden
            @change="onVendorFileInputClick"
          />
        </div>
        <div>
          <img
            class="q-ml-lg q-my-xs  "
            src="~assets/scan.svg"
            style="width:50%;"
            @click="onClickUploadButton"
          />
          <div class="form-heading text-center">Scan</div>
        </div>
      </div>
    </q-card>
    <!-- Alert delete Box -->
    <q-dialog v-model="alertDailog">
      <q-card>
        <DeleteAlert @close="alertDailog = false" @onDelete="removeDocument" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
import DeleteAlert from 'components/DeleteAlert';
const { Camera } = Plugins;
export default {
  name: 'VendorDocument',
  components: { DeleteAlert },
  data() {
    return {
      driveId: '',
      alertDailog: false,
      claimDocumentArray: [
        {
          id: '',
          value: '',
          machineValue: ''
        }
      ]
    };
  },

  computed: {
    ...mapGetters(['vendorDocument', 'selectedClaimId'])
  },

  created() {
    this.getVendorDocument(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'getVendorDocument',
      'uploadVendorDocument',
      'deleteClaimDocument'
    ]),
    async removeDocument() {
      const payload = {
        claimID: this.selectedClaimId,
        driveID: this.driveId
      };

      await this.deleteClaimDocument(payload);
      this.driveId = '';
      this.getVendorDocument(this.selectedClaimId);
    },
    ...mapMutations(['setLoading']),
    onDeleteDocument(index) {
      this.alertDailog = true;
      this.driveId = this.vendorDocument.documents[index].driveID;
    },
    onClickUploadButton() {
      document.getElementById('uploadFile').click();
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
    async uploadPdfToServer() {
      const formData = new FormData();

      formData.append('file', this.dataURItoBlob(this.dataURl));
      formData.append('type', 'vendor');
      const payload = {
        id: this.selectedClaimId,
        formData: formData
      };
      await this.uploadVendorDocument(payload);
      this.getVendorDocument(this.selectedClaimId);
      this.setLoading(false);
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async onVendorFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
      this.uploadPdfToServer();
    },
    async addFile() {
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
      this.addPdfFileToServer();
      this.setLoading(false);
    },
    async addPdfFileToServer(value) {
      this.setLoading(true);
      const formData = new FormData();

      formData.append('file', this.dataURItoBlob(this.pdfImage));
      formData.append('type', 'vendor');
      const payload = {
        id: this.selectedClaimId,
        formData: formData
      };
      await this.uploadVendorDocument(payload);
      // this.estimateFileName = '';
      // this.addEstimateDialog = false;
      this.getVendorDocument(this.selectedClaimId);
      this.setLoading(false);
    }
  }
};
</script>
<style lang="scss"></style>
