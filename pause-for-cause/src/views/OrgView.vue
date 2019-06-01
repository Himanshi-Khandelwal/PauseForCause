<template>
  <div :class="comp_tasks">
    <h1>User 1</h1>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list>
          <v-list-tile v-for="each_task in task" :key="task.task_id">
            <v-list-tile-content>
              <v-list-tile-title v-html="each_task.task_name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="each_task.description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn fab small href="https://github.com/vuetifyjs/vuetify/releases/latest">
                <v-icon>github</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn round color="primary" dark v-html="each_task.status"></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
</v-layout>
<div>
  <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="red lighten-2" dark v-on="on" >Add Task</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Create Task</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-container>
                <v-text-field label="Task Name" v-model="task_name"></v-text-field>
                <v-text-field label="Description" v-model="description"></v-text-field>
                <v-text-field label="GitHub Link" v-model="github_link"></v-text-field>
                <v-text-field label="Offering Amount" v-model="amount"></v-text-field>
              </v-container>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="createTask">Create Task</v-btn>
          </v-card-actions>
        </v-card>
  </v-dialog>
</div>
</div>
</template>

<script>
import gql from 'graphql-tag';
const GET_TASKS = gql`
  query getTasks {
    task(where: { comp_id: { _eq: 3 } }) {
      task_id
      task_name,
      github_link,
      comp_id,
      amount,
      ngo_id,
      description,
      status
  }
 }`;

 const ADD_TASK = gql`
   mutation insert_task(
     $task_name: String!,
     $description: String!,
     $github_link: String!,
     $amount: Int!,
     $comp_id: Int!,
     $ngo_id: Int!
     $status: String!
   ) {
     insert_task(objects:
       {task_name: $task_name,
        description: $description,
        github_link: $github_link,
        amount: $amount,
        comp_id: $comp_id,
        ngo_id: $ngo_id,
        status: $status}
     ) {
       affected_rows
       returning {
         task_id
         task_name,
         github_link,
         comp_id,
         amount,
         ngo_id,
         description,
         status
       }
     }
   }
 `;

  export default {
    name: 'organization',
    data() {
      return {
        task: [],
        dialog: false,

          task_name: '',
          description: '',
          github_link: '',
          amount: '',
          comp_id: 3,
          ngo_id: 0,
          status: 'open'

      }
    },
    apollo: {
      task: {
        query: GET_TASKS,
      },
    },
    methods: {
      createTask: function () {
        this.dialog = false;
        // insert new todo into db

        this.$apollo.mutate({
          mutation: ADD_TASK,
          variables: {
            task_name: this.task_name,
            description: this.description,
            github_link: this.github_link,
            amount: this.amount,
            comp_id: this.comp_id,
            ngo_id: this.ngo_id,
            status: this.status
        },
        update: (cache, { data: { insert_task } }) => {
          // Read the data from our cache for this query.
          // eslint-disable-next-line
          console.log(insert_task);
          try {
               const data = cache.readQuery({
                 query: GET_TASKS
               });
               const insertedTask = insert_task.returning;
               data.task.splice(0, 0, insertedTask[0]);
               cache.writeQuery({
                 query: GET_TASKS,
                 data
               });
           } catch (e) {
             console.error(e);
           }
          },
        });
      }
    }
  }
</script>
<style>
.comp_tasks {
  margin-top: 40px;
  text-align: center;
  width: 50%;
  display: inline-block;
}
.v-icon {
  margin-right: 15px;
}
<style>
