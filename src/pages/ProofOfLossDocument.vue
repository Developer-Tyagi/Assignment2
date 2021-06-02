<template>
  <q-page>
    <q-card class="form-card q-pa-md q-ma-md">
      <div class="vertical-center q-px-sm q-py-sm">
        <div
          class="row"
          v-if="claimPOLDocument.documents && claimPOLDocument.documents.length"
        >
          <q-icon
            :name="iconType(claimPOLDocument.documents[0].mimeType)"
            size="sm"
            color="primary"
          />
          <span
            class="q-pl-md"
            @click="onDocClick(claimPOLDocument.documents[0])"
          >
            {{ claimPOLDocument.documents[0].name }}</span
          >
          <q-btn
            class="q-ml-auto"
            icon="delete"
            size="sm"
            text-color="primary"
            flat
          />
        </div>
      </div>

      <div class="row" v-if="claimPOLDocument.documents.length < 1">
        <div class="row">
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
              @change="onPOLFileInputClick"
            />
          </div>
          <div>
            <q-btn
              class="q-ml-md"
              icon="add_a_photo"
              @click="addFile"
              text-color="primary"
              style="width: 50px"
            />
            <div class="form-heading q-ml-lg">Scan</div>
          </div>
        </div>
      </div>
    </q-card>

    <!-- Alert Question Box -->
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="q-pt-lg">
          do you want to send an estimate and proof of loss to carrier?
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
            label="send"
            color="primary"
            v-close-popup
            @click="onSendClick()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { Plugins, CameraResultType, CameraDirection } from '@capacitor/core';
import { getBase64 } from '@utils/common';
const { Camera } = Plugins;
export default {
  data() {
    return { dataURl: '', selectFile: '', alert: false };
  },

  computed: {
    ...mapGetters(['selectedClaimId', 'claimPOLDocument'])
  },

  created() {
    this.getClaimPOLDocument(this.selectedClaimId);
  },
  methods: {
    ...mapActions([
      'uploadClaimDocument',
      'getClaimPOLDocument',
      'sendPOLToCarrier'
    ]),
    ...mapMutations(['setLoading']),
    async onSendClick() {
      const payload = {
        claimID: this.selectedClaimId,
        data: {}
      };
      await this.sendPOLToCarrier(payload);
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
    async onPOLFileInputClick(event) {
      this.dataURl = await this.getBase64(event.target.files[0]);
      const file = document.getElementById('uploadFile').value;
      this.selectFile = file.split('\\').pop();
      this.selectFile = this.selectFile.split('.');
      this.uploadPdfToServer();
    },

    getBase64,
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
    async addPdfFileToServer() {
      this.setLoading(true);
      const formData = new FormData();
      formData.append('file', this.dataURItoBlob(this.pdfImage));
      formData.append('type', 'pol_notarized');
      const payload = {
        id: this.selectedClaimId,
        formData: formData
      };
      await this.uploadClaimDocument(payload);
      this.getClaimPOLDocument(this.selectedClaimId);
      this.alert = true;
    },

    async uploadPdfToServer() {
      const formData = new FormData();
      formData.append(
        'file',
        this.dataURItoBlob(this.dataURl),
        this.selectFile[0]
      );
      formData.append('type', 'pol_notarized');
      const payload = {
        id: this.selectedClaimId,
        formData: formData
      };
      await this.uploadClaimDocument(payload);
      this.getClaimPOLDocument(this.selectedClaimId);
      this.alert = true;
      this.setLoading(false);
      this.selectFile[0] = '';
      this.dataURl = '';
    }
  }
};
</script>
