<template>
  <div :class="comp_tasks">
    <h1>Company Tasks</h1>
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
              <v-btn flat small href="https://github.com/vuetifyjs/vuetify/releases/latest">
                <v-icon>fab fa-github</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn round small :color="each_task.status" dark v-on:click="confirmDialog = true; dialog_task = each_task, blockchain()"  v-html="each_task.status"></v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
</v-layout>
<div>
  <v-btn color="primary" flat @click="blockchain">Start Payment</v-btn>
  <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="red lighten-2" dark v-on="on" >Create Task</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Create Task</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-container>
                <v-text-field label="Task Name" v-model="task_name"></v-text-field>
                <v-text-field label="Description" v-model="description"></v-text-field>
                <v-text-field label="GitHub Link" v-model="github_link"></v-text-field>
                <v-text-field label="Offering Amount in Rupees" v-model="amount"></v-text-field>
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
<div>
  <v-dialog v-model="confirmDialog && dialog_task.status === 'completed'" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>Confirm Action</v-card-title>
          <v-card-text v-show="dialog_task.status === 'completed'">
              Are you sure you wanna accept this task?
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="updateStatus(dialog_task.task_id, dialog_task.status)">Accept</v-btn>
            <v-btn color="primary" flat @click="confirmDialog = false; dialog_task.status = 'open'">Reject</v-btn>
          </v-card-actions>
          <p>Payment</p>
          <qr-code
      text="0xc31F8e6b0ca24eC2fDd42f5c258A3e8C0123D860"
      size="500"
      error-level="L">
  </qr-code>
        </v-card>


  </v-dialog>
</div>
</div>
</template>

<script>
import gql from 'graphql-tag';
import matDecoder from "eth-decoder"
const { LogDecoder } = matDecoder
console.log(LogDecoder);
const ERC20TokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_token","type":"address"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amountOrTokenId","type":"uint256"},{"indexed":false,"name":"input1","type":"uint256"},{"indexed":false,"name":"input2","type":"uint256"},{"indexed":false,"name":"output1","type":"uint256"},{"indexed":false,"name":"output2","type":"uint256"}],"name":"LogTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"amountOrTokenId","type":"uint256"},{"indexed":false,"name":"input1","type":"uint256"},{"indexed":false,"name":"output1","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"token","type":"address"},{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"amountOrTokenId","type":"uint256"},{"indexed":false,"name":"input1","type":"uint256"},{"indexed":false,"name":"output1","type":"uint256"}],"name":"Withdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const decoder = new LogDecoder(
  [
    ERC20TokenABI,
    // ... other ABIs
  ]
);

const ADD_TRANSACTION = gql`
   mutation insert_transaction(
     $from: String!,
     $to: String!,
     $block_number: Int!,
     $amount: float8!
   ) {
     insert_transaction(objects:
       {from: $from,
        to: $to,
        block_number: $block_number,
        amount: $amount
        }
     ) {
       affected_rows
       returning {
         from, to, block_number, amount
       }
     }
   }
 `;


const GET_TASKS = gql`
  query getTasks {
    task(where: { comp_id: { _eq: 12 } }) {
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
     $amount: float8!,
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

 const UPDATE_TASK = gql`
   mutation insert_task($task_id: Int!, $status: String!) {
     update_task(where: { task_id: { _eq: $task_id } }, _set: { status: $status }) {
       affected_rows
     }
   }
 `;

  export default {
    name: 'organization',
    data() {
      return {
        task: [],
        dialog: false,
        dialog_task: [],
        confirmDialog: false,

          task_name: '',
          description: '',
          github_link: '',
          amount: '',
          comp_id: 12,
          ngo_id: 0,
          status: 'open'

      }
    },
    apollo: {
      task: {
        query: GET_TASKS,
      },
    },
    created () {
      if (this.$store.state.links.length === 0) {
        //this.$store.state.userInfo.name = 'Company 1';
        this.$store.state.links = this.$store.state.companyLinks;
      }
    },
    methods: {
      createTask: function () {
        var that = this;
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
           that.task_name = '';
           that.description = '';
           that.github_link = '';
           that.amount = 0;
          },
        });
      },
      updateStatus: function (taskId, status) {
        var that = this;
        this.confirmDialog = false;
        if (status === 'completed') {
          this.status = 'closed';
        }
          this.$apollo.mutate({
            mutation: UPDATE_TASK,
            variables: {
              task_id: taskId,
              status: this.status
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
               store.writeQuery({
                 query: GET_TASKS,
                 data
               });
             }
            },
          });
      },
      blockchain: function(data, removed){
        var Dagger = window.Dagger
        var Dagger = require("eth-dagger");
        var dagger = new Dagger("wss://matic.dagger2.matic.network")




        dagger.on("latest:addr/0xc31F8e6b0ca24eC2fDd42f5c258A3e8C0123D860/tx", (result) => {
          console.log("****************");
          console.log("here block created: ", result);
          const parsedLogs = decoder.decodeLogs(result.receipt.logs) // For truffle testsuite, use `receipt.receipt.logs`

          console.log(parsedLogs);
          console.log("abcdefgh");
          console.log(parsedLogs[0].values[2]._hex);
          var am = parseInt(parsedLogs[0].values[2]._hex, 16)/1e18;

          this.$apollo.mutate({
            mutation: ADD_TRANSACTION,
            variables: {
              from: parsedLogs[0].values[0],
              to: parsedLogs[0].values[1],
              block_number: result.blockNumber,
              amount: am
            },
            update: (cache, { data: { insert_task } }) => {
                //after update
            }
            })
        });



        dagger.on("latest:addr/0xa204939897257b22eBE0D01078F560dE5E8Caba3/tx", (result) => {
          console.log("New block created: ", result);
          console.log(result.from);
          console.log(result.to);
          console.log(result.blockNumber);
          ;

            // parse logs
            const parsedLogs = decoder.decodeLogs(result.receipt.logs) // For truffle testsuite, use `receipt.receipt.logs`

            console.log(parsedLogs);
            console.log("abcdefgh");
            console.log(parsedLogs[0].values[2]._hex);
            var am = parseInt(parsedLogs[0].values[2]._hex, 16)/1e18;

            this.$apollo.mutate({
              mutation: ADD_TRANSACTION,
              variables: {
                from: parsedLogs[0].values[0],
                to: parsedLogs[0].values[1],
                block_number: result.blockNumber,
                amount: am
              },
              update: (cache, { data: { insert_task } }) => {
                  //after update
              }
              })

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
