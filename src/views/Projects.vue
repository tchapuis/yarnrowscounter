<template>
  <div class="">
    <div class="d-flex align-items-center mb-2">
      <h1>Mes projets</h1>
      <router-link :to="{ name: 'projectCreate'}" class="btn btn-primary ml-auto"><i class="fas fa-plus mr-2"></i>Nouveau projet</router-link>
    </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Nom du projet</th>
            <th scope="col">Nombre de blocs</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, key) in projects" :key="project.id">
              <td>{{project.name}}</td>
              <td>{{project.blocks ? project.blocks.length : 0}}</td>
              <td>
                <router-link :to="{ name: 'counter', params: { projectId: key }}" class="btn btn-primary mb-2 mr-2">Compteur</router-link>
                <router-link :to="{ name: 'projectEdit', params: { projectId: key }}" class="btn btn-primary mb-2 mr-2">Editer</router-link>
                <b-button variant="danger" v-on:click="deleteProject(key)" class="mb-2">Supprimer</b-button>
              </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
const firebase = require('../firebaseConfig.js');
export default {
  name: 'Projects',
  data: function () {
      return {
        projects: []
      }
  },
  methods: {
    deleteProject: function(projectId) {
      this.$swal({
        title: 'Confirmer la suppression ?',
        text: 'La suppression est définitive !',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Pas de soucis',
        cancelButtonText: 'Non!',
      }).then((result) => {
        if (result.value) {
          firebase.db.ref('projects/' + projectId).remove();
        }
      })
    }
  },
  created() {
    firebase.db.ref('projects').on('value', snapshot => this.projects = snapshot.val());
  }
}
</script>

<style scoped>

</style>
