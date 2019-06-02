<template>
  <div class="login">
    <v-form ref="form" v-model="valid" >
      <v-container :class="login-form">
        <h3>Sign In</h3>
        <v-text-field label="Email" v-model="email" type="email" :rules="emailRules"></v-text-field>
        <v-text-field label="Password" :append-icon="'visibility_off'" :type="'password'" :rules="passwordRules" v-model="password"></v-text-field>
        <v-overflow-btn :items="roles" label="Select Role" class="pa-0" :rules="roleRules" v-model="role"></v-overflow-btn>
        <v-btn @click="login" :disabled="!valid">Login</v-btn>
        <p>You don't have an account? You can <router-link to="/signUp">create a one</router-link></p>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        role: '',
        roles: [{ text: 'User'}, { text:'Company'}, { text: 'NGO'}],
        emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        passwordRules: [
          v => !!v || 'Password is required',
          v =>
            v.length >= 6 ||
            'Password must be greater than 6 characters'
        ],
        roleRules: [
          v => !!v || 'Role is required'
        ]
      };
    },
    methods: {
      login: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (userInfo) => {
            console.log(userInfo);
            if (this.$refs.form.validate()) {
              this.$store.state.userInfo = {
                email: this.email,
                role: this.role
              };
              if (this.role === 'User') {
                this.$router.replace('user');
                this.$store.state.links = this.$store.state.userLinks;
                this.$store.state.userInfo.name = 'User 1'
              } else if (this.role === 'Company') {
                this.$router.replace('organization');
                this.$store.state.links = this.$store.state.companyLinks;
                this.$store.state.userInfo.name = 'Company 1'
              } else {
                this.$router.replace('user');
                // this.$router.replace('ngo');
                // this.$store.state.links = this.$store.state.ngoLinks;
                // this.$store.state.userInfo.name = 'Small Change NGO'
              }
            }
          },
          (err) => {
            alert('Oops ' + err.message)
          }
        );
      }
    },
    created() {
        this.$store.state.links = [];
    }
  }
</script>

<style scoped>
  .login {
    margin-top: 40px;
    text-align: center;
    width: 50%;
    display: inline-block;
  }
  .login-form {
    display: inline-block;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
