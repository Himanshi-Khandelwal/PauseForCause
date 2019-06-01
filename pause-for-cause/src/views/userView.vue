<template>
  <div :class="comp_tasks">
    <h1>User 1</h1>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list>
          <v-list-tile v-for="each_task in task" :key="each_task.task_id">
            <v-list-tile-content>
              <v-list-tile-title v-html="each_task.task_name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="each_task.description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn fab small href="https://github.com/vuetifyjs/vuetify/releases/latest">
                <v-icon>github</v-icon>
              </v-btn>
              <!-- <v-icon  >fab </v-icon> -->
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn round color="primary" :disabled="checkDisable(each_task)"  v-html="each_task.status" @click="updateStatus(each_task.task_id, each_task.status)"></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
</v-layout>
<div>

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
      status,
      user_id
  }
 }`;

 const UPDATE_TASK = gql`
   mutation insert_task($task_id: Int!, $status: String!, $user_id: Int!) {
     update_task(where: { task_id: { _eq: $task_id } }, _set: { status: $status, user_id: $user_id }) {
       affected_rows
     }
   }
 `;

  export default {
    name: 'organization',
    data() {
      return {
        task: [],
        status: '',
        user_id: 1
      }
    },
    apollo: {
      task: {
        query: GET_TASKS,
      },
    },
    methods: {
      checkDisable: function (task) {
        return (task.user_id !== this.user_id && task.status !== 'open')
      },
      updateStatus: function (taskId, status) {
        var that = this;
        if (status === 'open') {
          this.status = 'assigned';
        } else if (status === 'assigned') {
          this.status = 'completed';
        }
          this.$apollo.mutate({
            mutation: UPDATE_TASK,
            variables: {
              task_id: taskId,
              status: this.status,
              user_id: this.user_id
          },
          update: (store, { data: { update_task } }) => {
            if (update_task.affected_rows) {
             // eslint-disable-next-line
             console.log(update_task);
               // Read the data from our cache for this query.
               const data = store.readQuery({
                 query: GET_TASKS,
               });
               const updatedItem = data.task.find(t => t.task_id === taskId);
               console.log(updatedItem);
               console.log(that.status);
               updatedItem.status = that.status;
               updatedItem.user_id = that.user_id;
               store.writeQuery({
                 query: GET_TASKS,
                 data
               });
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
