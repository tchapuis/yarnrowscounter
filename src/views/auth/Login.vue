<template>
    <div>
        <h1>Connexion</h1>
        <b-form @submit.prevent="login()">
            <b-form-group id="loginInputGroup"
                        label="Adresse e-mail:"
                        label-for="loginInput">
                <b-form-input id="loginInput"
                            type="email"
                            v-model.trim="email"
                            required
                            placeholder="Entrez votre adresse e-mail">
                </b-form-input>
            </b-form-group>
            <b-form-group id="passwordInputGroup"
                        label="Mot de passe:"
                        label-for="passwordInput">
                <b-form-input id="passwordInput"
                            type="password"
                            v-model.trim="password"
                            required
                            placeholder="Entrez votre mot de passe">
                </b-form-input>
            </b-form-group>
            <b-alert variant="danger" :show="showError">{{ errorMessage }}</b-alert>
            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>
const firebase = require('../../firebaseConfig.js')
export default {
    name: 'Login',
    data: () => {
        return {
            email: "",
            password: "",
            showError: false,
            errorCode: ""
        }
    },
    methods: {
        login: function() {
            this.showError = false;
            firebase.auth.signInWithEmailAndPassword(this.email, this.password)
              .then(user => {
                  this.$store.commit('setIsAuthenticated', true);
                  this.$store.commit('setCurrentUser', user.user);
                  this.$router.push('/projects');
              }).catch(err => {
                  // eslint-disable-next-line
                  console.error(err);
                  this.showError = true;
                  this.errorCode = err.code;
              });
        }
    },
    computed: {
        errorMessage() {
            let errorMessage = "";
            switch(this.errorCode) {
                case 'auth/user-not-found':
                    errorMessage = "Utilisateur introuvable";
                    break;
                default:
                    errorMessage = "Une erreur s'est produite"
            } 
            return errorMessage;
        }
    }
}
</script>

<style>

</style>
