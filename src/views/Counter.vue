<template>
  <div class="">
        <div class="d-flex align-items-center mb-2">
          <h1>Compteur pour le projet : {{project.name}}</h1>
          <router-link :to="{ name: 'projectEdit', params: { projectId: project.id }}" class="btn btn-primary ml-auto"><i class="fas fa-edit mr-2"></i>Editer le projet</router-link>
        </div>
        <b-card class="mb-4">
          <h2 slot="header" class="mb-0">Chronomètre</h2>
          <div class="d-flex">
            <h3 id="stopwatch" class="d-block mx-auto">{{ hours }} : {{ minutes }} : {{ seconds }}</h3>
          </div>
          <div class="d-flex mb-2">
            <div class="mx-auto">
              <b-button variant="primary" v-if="!timer" v-on:click="startTimer" title="Lancer"><i class="fas fa-play"></i></b-button>
              <b-button variant="warning" v-if="timer" v-on:click="pauseTimer" title="Pause"><i class="fas fa-pause"></i></b-button>
              <b-button variant="secondary" class="ml-2" v-on:click="resetTimer" title="Réinitialiser"><i class="fas fa-redo"></i></b-button>
            </div>
          </div>
          <span><i class="fas fa-info-circle"></i> Le temps du chronomètre sera enregistré uniquement quand il sera mis sur pause. La remise à zero efface totalement l'ancien temps.</span>
        </b-card>
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
                <b-button variant="primary" v-on:click="removeRow(key)"><i class="fas fa-minus"></i></b-button>
                <h3 class="mb-0">{{ block.rows }}</h3>
                <b-button variant="primary" v-on:click="addRow(key)"><i class="fas fa-plus"></i></b-button>
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
                <b-button variant="primary" v-on:click="removeStitch(key)"><i class="fas fa-minus"></i></b-button>
                <h3 class="mb-0">{{ block.stitchs }}</h3>
                <b-button variant="primary" v-on:click="addStitch(key)"><i class="fas fa-plus"></i></b-button>
              </div>
            </div>
            <p>{{ block.comment }}</p>
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
        timer: null,
        pauseButton: false,
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
    },
    startTimer: function() {
      this.timer = setInterval(() => this.project.time++, 1000);
      this.pauseButton = true;
    },
    pauseTimer: function() {
      firebase.db.ref('/projects/' + this.$route.params.projectId).update(this.project);
      clearInterval(this.timer);
      this.timer = null;
      this.pauseButton = false;
    },
    resetTimer: function() {
      this.project.time = 0;
      firebase.db.ref('/projects/' + this.$route.params.projectId).update(this.project);
      clearInterval(this.timer);
      this.timer = null;
      this.pauseButton = false;
    },
    padTime: function(time) {
      return (time < 10 ? '0' : '') + time;
    }
  },
  computed: {
    hours: function() {
      const hours = Math.floor(this.project.time / 3600);
      return this.padTime(hours);
    },
    minutes: function() {
      const minutes = Math.floor((this.project.time - (this.hours * 3600)) / 60);
      return this.padTime(minutes);
    },
    seconds: function() {
      const seconds = Math.floor(this.project.time - (this.hours * 3600) - (this.minutes * 60));
      return this.padTime(seconds);
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
