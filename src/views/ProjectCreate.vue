<template>
  <div class="">
      <h1>Nouveau projet</h1>
        <form @submit.prevent="saveProject()">
            <b-form-group id="projectNameFieldset" label="Nom du projet" label-for="projectName">
                <b-form-input id="projectName" v-model.trim="project.name" placeholder="Nom du projet" required></b-form-input>
            </b-form-group>
            <div class="d-flex mb-4">
                <h4>Gestion des blocks</h4>
            </div>
            <div v-for="block in this.blocks" :key="block.id">
                <b-card class="mb-4">
                    <b-form-group id="blockNameFieldset" label="Nom du block" label-for="blockName">
                        <b-form-input id="blockName" v-model.trim="block.name" placeholder="Nom du block" required></b-form-input>
                    </b-form-group>

                    <b-row>
                        <b-col cols="12" md="6">
                            <b-form-group id="blockRowsFieldset" label="Nombre de rangs" label-for="blockRows">
                                <b-form-input id="blockRows" type="number" v-model.number="block.rows" required min="0"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group id="blockMaxRowsFieldset" label="Nombre de rangs maximum" label-for="blockMaxRows">
                                <b-form-input id="blockMaxRows" type="number" v-model.number="block.maxRows" required min="0"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col cols="12" md="6">
                            <b-form-group id="blockStitchsFieldset" label="Nombre de mailles" label-for="blockStitchs">
                                <b-form-input id="blockStitchs" type="number" v-model.number="block.stitchs" required min="0"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col cols="12" md="6">
                            <b-form-group id="blockMaxStitchsFieldset" label="Nombre de mailles maximum" label-for="blockMaxStitchs">
                                <b-form-input id="blockMaxStitchs" type="number" v-model.number="block.maxStitchs" required min="0"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-col cols="12" md="12">
                            <b-form-group id="blockCommentFieldset" label="Commentaire" label-for="blockComment">
                                    <b-form-textarea id="textarea1" v-model="block.comment" :rows="3" :max-rows="6"></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <div class="d-flex">
                        <b-button class="ml-auto" variant="danger" size="sm" v-on:click="removeBlock(key)"><i class="far fa-trash-alt"></i></b-button>
                    </div>
                </b-card>
            </div>
            
            <div class="d-flex">
                <b-button class="m-auto" variant="outline-primary" v-on:click="addBlock()"><i class="fas fa-plus mr-2"></i>Ajouter un block</b-button>
            </div>

            <div class="d-flex">
                <router-link to="/" class="btn btn-secondary">Annuler</router-link>
                <b-button class="ml-auto" variant="primary" type="submit">Enregistrer</b-button>
            </div>
        </form>
  </div>
</template>

<script>
const firebase = require('../firebaseConfig.js');
export default {
  name: 'ProjectEdit',
  data: function () {
      return {
        project: [],
        blocks: []
      }
  },
  methods: {
      addBlock: function() {
          this.blocks.push({name: '', rows: 0, maxRows: 1, stitchs: 0, maxStitchs: 1});
          this.project.blocks = this.blocks;
      },
      removeBlock: function(blockId) {
          this.blocks.splice(blockId, 1);
          this.project.blocks = this.blocks;
      },
      saveProject: function(projectId) {
        this.project.time = 0;
        firebase.db.ref('/projects/').push(this.project);
        this.$router.push({ name: 'projects'})
      }
  }
}
</script>

<style scoped>

</style>
