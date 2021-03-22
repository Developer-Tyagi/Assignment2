<template>
  <q-page>
    <div class="action-div">
      <q-btn name="add" @click="addElement()">add</q-btn>
    </div>
    <div id="fileSystem"></div>
  </q-page>
</template>
<script>
export default {
  name: 'ClientDocument',
  data() {
    return {
      fileSytem: [
        {
          name: 'docments',
          type: 'folder',
          children: [
            {
              name: 'ani',
              file: 'asfdasfsafsf',
              type: 'folder',
              children: [
                {
                  name: 'ani',
                  file: 'asfdasfsafsf',
                  type: 'file'
                }
              ]
            },
            {
              name: 'sonali',
              file: 'asfdasfsafsf',
              type: 'file'
            },
            {
              name: 'ani',
              file: 'asfdasfsafsf',
              type: 'file'
            }
          ]
        },
        {
          name: 'ani',
          file: 'asfdasfsafsf',
          type: 'folder',
          children: []
        }
      ],
      text: ''
    };
  },
  methods: {
    addFolder(id, text) {
      document.getElementById(
        id
      ).innerHTML += `<button onclick="clicked()">${text} </button>`;
    },

    clicked() {
      console.log('hi');
    }
  },

  mounted() {
    let i = 0;
    // this.fileSystem.forEach(element => {
    //   if (element.type == 'folder') {
    //     console.log(element.name);
    //     this.addFolder('fileSystem', element.name);
    //   }
    // });
  }
};
</script>
<style lang="scss" scoped></style>
