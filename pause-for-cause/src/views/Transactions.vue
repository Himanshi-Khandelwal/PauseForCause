<template>
  <div :class="comp_tasks">
    <h1>All Transactions</h1>
    <v-data-table
    :headers="headers"
    :items="transaction" hide-actions
  >
    <template v-slot:items="props">
      <td>{{ props.item.from_user.name }}</td>
      <td>{{ props.item.to_user.name }}</td>
      <td>{{ props.item.block_number }}</td>
      <td>{{ props.item.amount }}</td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import gql from 'graphql-tag';
const GET_TRANSACTIONS = gql`
  query getTransaction {
    transaction(where: {}) {
      from_user {
        name
      },
      to_user {
        name
      }
      block_number,
      amount
    }
 }`;

  export default {
    name: 'transaction',
    data() {
      return {
        transaction: [],
        headers: [
         {
           text: 'From',
           align: 'center',
           sortable: false,
           value: 'from'
         },
         { text: 'To', value: 'to',sortable: false, sortable: false, align: 'center'},
         { text: 'Block Number', value: 'block_number', sortable: false, align: 'center'},
         { text: 'Amount', value: 'amount', sortable: false, align: 'center',}
       ],
      }
    },
    apollo: {
      transaction: {
        query: GET_TRANSACTIONS,
      },
    },
    methods: {

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
