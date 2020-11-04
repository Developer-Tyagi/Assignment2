import {
  Stitch,
  RemoteMongoClient,
  UserPasswordCredential,
  BSON
} from "mongodb-stitch-browser-sdk";

class RealmService {
  constructor(email, password) {
    this.client = Stitch.initializeDefaultAppClient("application-0-kxsxd");
    this.db = this.client
      .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
      .db("claimguru");
    this.user = this.client.auth.loginWithCredential(
      new UserPasswordCredential(email, password)
    );
  }
  getCurrentUserId() {
    return this.client.auth.user.id;
  }
  async getCollection(collectionName) {
    return this.db
      .collection(collectionName)
      .find({ realmPartitionKey: this.client.auth.user.id }, { limit: 100 })
      .asArray()
      .then(collection => collection);
  }
  async insertObject(collectionName, data) {
    return this.db.collection(collectionName).insertOne({
      _id: new BSON.ObjectId(),
      realmPartitionKey: this.getCurrentUserId(),
      ...data,
      $inc: { "__stitch_sync_version.v": 1 }
    });
  }
}

export default RealmService;

// TODO: Use this when instatiating Realm service
// import RealmService from "src/services/realm";
// const Realm = new RealmService("email", "password");
