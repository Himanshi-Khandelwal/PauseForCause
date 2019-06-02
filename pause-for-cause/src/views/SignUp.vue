<template>
  <div class="sign-up">
    <v-form ref="form" v-model="valid">
      <v-container :class="signup-form">
        <p>Create a new account!</p>
        <v-text-field label="Email" v-model="email" type="email" :rules="emailRules"></v-text-field>
        <v-text-field label="Password" :append-icon="'visibility_off'" :type="'password'" v-model="password" :rules="passwordRules"></v-text-field>
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="Payment Key" v-model="payment_key"></v-text-field>
        <v-overflow-btn :items="roles" label="Select Role" class="pa-0" :rules="roleRules" v-model="role"></v-overflow-btn>
        <v-btn @click="signUp" :disabled="!valid">Sign Up</v-btn>
        <span>Go back to  <router-link to="/login">Login.</router-link></span>
      </v-container>
    </v-form>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import gql from 'graphql-tag';
  const ADD_USER = gql`
    mutation insert_user_info($name: String!,$role: String!,$payment_key: String!) {
      insert_user_info(objects:{name: $name,role: $role,payment: 0,payment_key: $payment_key}) {
        affected_rows
        returning {
          user_id,
          name
          role,
          payment_key
        }
      }
    }
  `;

  export default {
    name: 'signUp',
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        role: '',
        roles: [{ text: 'User'}, { text:'Company'}, { text: 'NGO'}],
        name: '',
        payment_key: '',
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
      signUp: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (userInfo) => {
            if (this.$refs.form.validate()) {
              this.$apollo.mutate({
                mutation: ADD_USER,
                variables: {
                  name: this.name,
                  role: this.role,
                  payment_key: this.payment_key
              },
              update: (cache, { data: { insert_user_info } }) => {
                const insertedUser = insert_user_info.returning[0];
                this.$store.state.userInfo = {
                  email: insertedUser.email,
                  role: insertedUser.role,
                  payment_key: insertedUser.payment_key,
                  user_id: insertedUser.user_id,
                  name: insertedUser.name
                  };
                  if (insertedUser.role === 'User') {
                    this.$router.replace('user');
                    this.$store.state.links = this.$store.state.userLinks;
                  } else if (insertedUser.role === 'Company') {
                    this.$router.replace('organization');
                    this.$store.state.links = this.$store.state.companyLinks;
                  } else {
                    this.$router.replace('user');
                    // this.$router.replace('ngo');
                    // this.$store.state.links = this.$store.state.ngoLinks;
                    // this.$store.state.userInfo.name = 'Small Change NGO'
                  }
                }
              });
            }
          },
          (err) => {
            alert('Oops ' + err.message)
          }
        );
      },
      createTask: function () {
        var that = this;
        // insert new todo into db


      },
    }
  }
</script>

<style scoped>
  .sign-up {
    margin-top: 40px;
    text-align: center;
    width: 50%;
    display: inline-block;
  }
  .signup-form {
    display: inline-block;
  }
  span {
    display: block;
    margin-top: 10px;
    font-size: 11px;
  }
</style>
