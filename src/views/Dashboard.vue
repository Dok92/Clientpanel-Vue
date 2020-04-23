<template>
  <div>
    <v-container>      
      <v-row justify="center">
        <v-col cols="12" lg="6" md="10" xs="12">
          <v-data-table
            :headers="headers"
            :items="clients"
            sort-by="balance"
            class="elevation-1"
            item-key="name"
            show-expand
          >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title><h3>Clients</h3></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn small color="primary darken-2" v-on="on"><i class="mdi mdi-account-plus pr-1"></i>Add Client</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          ref="name" 
                          required 
                          v-model="editedItem.name" 
                          :rules="requiredRules" 
                          label="Name">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field 
                          required 
                          v-model="editedItem.balance" 
                          :rules="balanceRules" 
                          label="Balance">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.email" 
                          :rules="emailRules" 
                          hint="* optional"
                          persistent-hint
                          label="Email">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field 
                          v-model="editedItem.phone" 
                          :rules="phoneRules" 
                          hint="* optional"
                          persistent-hint
                          label="Phone">
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click.prevent="save" :disabled="invalid ? true : false">Save</v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        color="yellow darken-2"
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        color="error"
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <div block>
          Phone: {{ item.phone }} 
        </div>         
          Email: {{ item.email }}        
      </td>
    </template>
  </v-data-table>
        </v-col>
      </v-row>     
    </v-container>
  </div> 
</template>

<script>
import "@firebase/firestore";
import db, { timestamp } from "@/main";
export default {
  name: "Dashboard",
   data() {
     return {
      dialog: false,
      singleExpand: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Balance', value: 'balance' },
        { text: 'Actions', value: 'actions', sortable: false },   
      ],

      requiredRules: [
        value => !!value || "Required.",
        v => /^([a-zA-Z]+\ ?)([-\s'][a-zA-Z]+)*?$/.test(v) || "enter name correctly"
      ],
      balanceRules: [
        value => !!value || "Required.",
        v => /^[0-9]*$/.test(v) || "must be a number"
      ],
      emailRules: [
        v => /.+@.+/.test(v) || "e-mail must be valid"
      ],
      phoneRules: [
        v => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/.test(v) || "enter phone number"
      ],

      clients: [],
      editedIndex: -1,
      editedItem: {
        name: null,
        balance: null,
        email: null,
        phone: null,
        id: null
      },
      defaultItem: {
        name: null,
        balance: null,
        email: null,
        phone: null,
        id: null
      }
     }
   },

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
      },  
      invalid() {
        const { name, balance, email, phone } = this.editedItem
        if (name == null) {
          return true
        }
        else if (/^([a-zA-Z]+\ ?)([-\s'][a-zA-Z]+)*?$/.test(name) &&
                 /^[0-9]*$/.test(balance) &&
                 (/.+@.+/.test(email) || email == null) &&
                 (/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/.test(phone) || phone == null)) {    
          return false
        }
        return true
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
        setTimeout(() => {          
          this.$refs.form.resetValidation()
        }, 0);
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize() {
      db.collection("clients")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          const { name, balance, email, phone } = doc.data()
          this.clients.unshift({
            name,
            balance,
            email,
            phone,
            id: doc.id
          });          
        });
      });      
      },

      editItem (item) {
        this.editedIndex = this.clients.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.clients.indexOf(item)
        confirm('Are you sure you want to delete this client?') && this.clients.splice(index, 1)
        db.collection("clients").doc(this.clients[index].id).delete()
      },

      close () {                
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        // edit or add client depending on edited index
        const { name, balance, email, phone } = this.editedItem
        // edit client
        if (this.editedIndex > -1) {
          Object.assign(this.clients[this.editedIndex], this.editedItem)
          db.collection("clients").doc(this.clients[this.editedIndex].id)
          .set({
            name,
            balance,
            email,
            phone
          })
        } else {
           // set new client in firebase
           db.collection("clients").doc().set({
            name,
            balance,
            email,
            phone,
            createdAt: timestamp()
          })
          // get last created client from firebase and update clients arr
          .then(db.collection("clients")
          .orderBy('createdAt', 'desc')
          .limit(1)
          .get()
          .then(snap => {
            snap.forEach(doc => {
              const { name, balance, email, phone } = doc.data()
              this.clients.unshift({
                name,
                balance,
                email,
                phone,
                id: doc.id
              });                
            })
          }))
        }        
        this.close()
      },  
    },
  }
</script>

<style scoped>
</style>
