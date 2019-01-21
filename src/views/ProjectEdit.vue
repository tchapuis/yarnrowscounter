<template>
  <div class="">
      <div class="d-flex align-items-center mb-2">
        <h1>Edition du projet</h1>
        <router-link :to="{ name: 'counter', params: { projectId: $route.params.projectId }}" class="btn btn-primary ml-auto">Compteur</router-link>
      </div>
        <form @submit.prevent="saveProject($route.params.projectId)">
            <b-form-group id="projectNameFieldset" label="Nom du projet" label-for="projectName">
                <b-form-input id="projectName" v-model.trim="project.name" placeholder="Nom du projet" required></b-form-input>
            </b-form-group>
            <hr>
            <div class="d-flex mb-4">
                <h4>Gestion des blocks</h4>
                <b-button class="ml-auto" variant="primary" v-on:click="addBlock()">Ajouter un block</b-button>
            </div>
            <div v-for="(block, key) in blocks" :key="block.id">
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
                        <b-button class="ml-auto" variant="danger" size="sm" v-on:click="removeBlock(key)">Supprimer le block</b-button>
                    </div>
                </b-card>
            </div>
            <div class="d-flex">
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
          firebase.db.ref('/projects/' + this.$route.params.projectId + '/blocks/').set(this.project.blocks);
      },
      removeBlock: function(blockId) {
          if(this.blocks[blockId].rows > 0 || this.blocks[blockId].stitchs > 0) {
            this.$swal({
                title: 'Confirmer la suppression ?',
                text: 'Le block que tu veux supprimer est déjà entamé.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#007bff',
                cancelButtonColor: '#dc3545',
                confirmButtonText: 'Pas de soucis',
                cancelButtonText: 'Non!',
            }).then((result) => {
                if (result.value) {
                    this.blocks.splice(blockId, 1);
                    this.project.blocks = this.blocks;
                    firebase.db.ref('/projects/' + this.$route.params.projectId + '/blocks/').set(this.project.blocks);
                }
            })
          } else {
            this.blocks.splice(blockId, 1);
            this.project.blocks = this.blocks;
            firebase.db.ref('/projects/' + this.$route.params.projectId + '/blocks/').set(this.project.blocks);
          }
      },
      saveProject: function(projectId) {
        firebase.db.ref('/projects/' + this.$route.params.projectId).update(this.project, () => {
            this.$swal({
                type: 'success',
                title: 'Projet enregistré avec succès !'
            }).then((result) => {
                if(result.value) {
                    this.$router.go(-1);
                }
            });
        });
      }
  },
  created() {
    firebase.db.ref('/projects/' + this.$route.params.projectId).on('value', snapshot => {
        this.project = snapshot.val();
        this.blocks = this.project.blocks;
    });
    
  }
}
</script>

<style scoped>

</style>
