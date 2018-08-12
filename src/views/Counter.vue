<template>
  <div class="">
        <div class="d-flex align-items-center mb-2">
          <h1>Compteur pour le projet : {{project.name}}</h1>
          <router-link :to="{ name: 'projectEdit', params: { projectId: project.id }}" class="btn btn-primary ml-auto">Editer le projet</router-link>
        </div>
        <div v-for="(block, key) in project.blocks" :key="block.id">
          <b-card class="mb-4">
            <h2 slot="header" class="mb-0">{{ block.name }}</h2>
            <div class="mb-3">
              <p>Nombre de rangs</p>
              <b-progress :max="parseInt(block.maxRows)" show-value class="mb-3">
                <b-progress-bar v-if="parseInt(block.rows) < parseInt(block.maxRows)" :value="parseInt(block.rows)" variant="primary"></b-progress-bar>
                <b-progress-bar v-else-if="parseInt(block.rows) == parseInt(block.maxRows)" :value="parseInt(block.rows)" variant="success"></b-progress-bar>
                <b-progress-bar v-else :value="parseInt(block.rows)" variant="danger"></b-progress-bar>
              </b-progress>
              <div class="d-flex justify-content-around align-items-center">
                <b-button variant="primary" v-on:click="removeRow(key)">- 1</b-button>
                <h3 class="mb-0">{{ block.rows }}</h3>
                <b-button variant="primary" v-on:click="addRow(key)">+ 1</b-button>
              </div>
            </div>
            <div>
              <p>Nombre de mailles</p>
              <b-progress :max="parseInt(block.maxStitchs)" show-value class="mb-3">
                <b-progress-bar v-if="parseInt(block.stitchs) < parseInt(block.maxStitchs)" :value="parseInt(block.stitchs)" variant="primary"></b-progress-bar>
                <b-progress-bar v-else-if="parseInt(block.stitchs) == parseInt(block.maxStitchs)" :value="parseInt(block.stitchs)" variant="success"></b-progress-bar>
                <b-progress-bar v-else :value="parseInt(block.stitchs)" variant="danger"></b-progress-bar>
              </b-progress>
              <div class="d-flex justify-content-around align-items-center">
                <b-button variant="primary" v-on:click="removeStitch(key)">- 1</b-button>
                <h3 class="mb-0">{{ block.stitchs }}</h3>
                <b-button variant="primary" v-on:click="addStitch(key)">+ 1</b-button>
              </div>
            </div>
          </b-card>
        </div>
  </div>
</template>

<script>
const firebase = require('../firebaseConfig.js');

export default {
  name: 'Counter',
  data: function () {
      return {
        project: []
      }
  },
  methods: {
    addRow: function (blockId) {
      this.project.blocks[blockId].rows += 1;
      firebase.db.ref('/projects/' + this.$route.params.projectId + '/blocks/' + blockId).update(this.project.blocks[blockId]);
    },
    removeRow: function(blockId) {
        if(this.project.blocks[blockId].rows > 0) {
            this.project.blocks[blockId].rows -= 1;
            firebase.db.ref('/projects/' + this.$route.params.projectId + '/blocks/' + blockId).update(this.project.blocks[blockId]);
        }
    },
    addStitch: function (blockId) {
      this.project.blocks[blockId].stitchs += 1;
      firebase.db.ref('/projects/' + this.$route.params.projectId + '/blocks/' + blockId).update(this.project.blocks[blockId]);
    },
    removeStitch: function(blockId) {
        if(this.project.blocks[blockId].stitchs > 0) {
            this.project.blocks[blockId].stitchs -= 1;
            firebase.db.ref('/projects/' + this.$route.params.projectId + '/blocks/' + blockId).update(this.project.blocks[blockId]);
        }
    }
  },
  created() {
    firebase.db.ref('/projects/' + this.$route.params.projectId).once('value', snapshot => {
      this.project = snapshot.val();
      this.project.id = snapshot.key;
    });
  }
}
</script>

<style scoped>

</style>
