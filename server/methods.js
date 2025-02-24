import IDDao from '/imports/IDDao'
import { Mongo } from 'meteor/mongo'
//h
const iddaoAdmin = new IDDao(Meteor.settings.public.idDaoAddr,Meteor.settings.public.idDaoPKey) // using idDao Admin on the server side in the name of us - the creators - using a specific address&pKey to create idDao instance and do actions in the name of it.
const Wallets = new Mongo.Collection("wallets") // keep our record of which address got initial money.
//
Meteor.methods({
  /*
  ** Creating walltet to a new user and transferring intial money to it, from the GoodDollar creators.
  ** Existing address should not get initial money - Wallets.insert will throw exception and break
  */
  async 'loadWallet'(addr) { 
      try
      {

        Wallets.insert({_id:addr}) // will throw exception if the wallet exists
        console.log("Loading wallet",addr)
        return iddaoAdmin.loadWallet(addr)
      }
      catch(e) {
        console.log(e.message)
        return;
      }
  }
})
