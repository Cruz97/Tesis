import { local } from './LocalRealm';
import { v1 } from 'uuid';
import { schema } from './CloudRealm';


export class RealmObject {
  constructor(realm) {
    this.realm = realm;
  }

  create(objectName, object, callback = () => {}) {
    this.realm.write(() => {
      callback(this.realm.create(objectName, { uuid: v1(), ...object }, true));
    });
  }

  batchCreate(objectName, objects) {
    this.realm.write(() => {
      for (let i = 0, iMax = objects.length; i < iMax; i++) {
        try {
          this.realm.create(objectName, { uuid: v1(), ...objects[i] });
        } catch (e) {
          alert(e);
        }
      }
    });
  }

  update(objectName, object, callback = () => {}) {
    this.realm.write(() => {
      try {
        callback(this.realm.create(objectName, object, true));
      } catch (e) {
        console.log('Eso: ', e);
      }
    });
  }

  deleteByQuery(objectName, query) {
    this.realm.write(() => {
      this.realm.delete(this.search(objectName, query));
    });
  }

  deleteAllObjects(objectName) {
    this.realm.write(() => {
      this.realm.delete(this.realm.objects(objectName));
    });
  }

  delete(objectName, uuid) {
    this.realm.write(() => {
      this.realm.delete(this.get(objectName, uuid));
    });
  }

  get(objectName, uuid) {
    return this.realm.objectForPrimaryKey(objectName, uuid);
  }

  search(objectName, query) {
    return this.realm.objects(objectName).filtered(query);
  }

  searchAll(objectName) {
    return this.realm.objects(objectName);
  }
}

const Database = {
  User: null,
  LocalDB: null,
  CloudDB: null
};

export default Database;

// 'realms://oroverdedev.us1a.cloud.realm.io/dev3'
