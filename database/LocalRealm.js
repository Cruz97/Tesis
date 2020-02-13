

const schema = [
  {
    name: 'User',
    primaryKey: 'uid',
    properties: {
      uid: 'int',
      uuid: 'string?',
      sessionId: 'string?',
      user: 'string?',
      password: 'string?',
      host: 'string?',
      database: 'string?',
      user_identify: 'string?',
      email: 'string?',
      number: 'string?',
      mid: 'int?',
      token: 'string?',
      code: 'string?',

    }
  },
  {
    name: 'AppSettings',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      connectionwifi: 'bool?',
      languaje: 'string?',
      distance: 'string?',
      alerts: 'bool?',
      show_oferts: 'bool?',
      version: 'string?',
      last_update: 'date?',
      last_session: 'date?',
    }
  },
  // {
  //   name: 'Certificates',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: 'string',
  //     title: 'string?',
  //     date_expire: 'date?',
  //     img: 'string?',
  //     qr: 'string?',
  //     status: 'string?',
  //     description: 'string?',
  //     quantity: 'int?',
  //     code: 'string?',
  //     odoo_id: 'int',
  //     odooid: 'int?'

  //   }
  // }
];

const realmOptions = {
  schema,
  schemaVersion : 11
};



export const local = null;
