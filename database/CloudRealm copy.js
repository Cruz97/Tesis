export const MemberSchema = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    membresy: 'Membresy',
    name: 'string?',
    lastname: 'string?',
    password: 'string?',
    username: 'string?',
    email: 'string?',
    country: 'string?',
    address: 'string?',
    phone: 'string?',
    membership_number: 'string?',
    identification: 'string?'
  }
};

export const MembresySchema = {
  name: 'Membresy',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name_card: 'string?',
    digits_card: 'string?',
    date_expire: 'date?',
    partner_from: 'date?',
    visits: 'int?',
    consumption: 'float?',
    discount: 'float?',
    certificates: 'Certificates[]',
    transacctions: 'Transacctions[]'
  }
};




export const CertificatesSchema = {
  name: 'Certificates',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      title: 'string?',
      date_expire: 'date?',
      img: 'string?',
      qr: 'string?',
      status: 'string?',
      description: 'string?',
      quantity: 'int?',
      code: 'string?',
      odoo_id: 'int',
      odooid: 'int?'
    }
};

export const TransacctionsSchema = {
  name: 'Transacctions',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    concept: 'string?',
    date_purchase: 'date?',
    amount: 'float?'
  }
};

export const RestaurantsSchema = {
  name: 'Restaurants',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string?',
    status: 'string?',
    city: 'string?',
    stars: 'int?',
    phone: 'string?',
    latitude: 'string?',
    longitude: 'string?',
    schedule_ini: 'date?',
    schedule_fin: 'date?',
    schedule_weekend_ini: 'date?',
    schedule_weekend_fin: 'date?',
    address: 'string?',
    image: 'string?'
  }
};

export const InformationSchema = {
  name: 'Information',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    address: 'string?',
    la: 'string?',
    lo: 'string?',
    phone: 'string?'
  }
};

export const HotelsSchema = {
  name: 'Hotels',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string?',
    city: 'string?',
    address: 'string?',
    la: 'string?',
    lo: 'string?',
    stars: 'int?',
    phone: 'string?',
    email: 'string?',
    images: 'PictureHotel[]',
    img_main: 'string?',
    country: 'string?',
    location: 'string?'
    
  }
}

export const PicturesHotelSchema = {
  name: 'PictureHotel',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string?',
    url: 'string?',
    section: 'string?',
    city: 'string?'
  }
}


export const OffersSchema = {
  name: 'Offers',
  primaryKey: 'uuid',
  properties:{
    uuid: 'string',
    name: 'string?',
    image: 'string?',
    price_ini: 'float?',
    description: 'string?',
    disponibility: 'string?',
    types: 'TypeOffer[]',
    items: 'ItemPackage[]',
    additionals: 'ItemAdditional[]'

  }
}

export const TypeOfferSchema = {
  name: 'TypeOffer',
  primaryKey: 'uuid',
  properties:{
    uuid: 'string',
    id: 'int?',
    description: 'string?',
    name: 'string?',
    price: 'float?'
  }
}

export const ItemPackageSchema = {
  name: 'ItemPackage',
  primaryKey: 'uuid',
  properties:{
    uuid: 'string',
    description: 'string?'
  }
}

export const ItemAdditionalSchema = {
  name: 'ItemAdditional',
  primaryKey: 'uuid',
  properties:{
    uuid: 'string',
    description: 'string?'
  }
}

export const BenefitsSchema = {
  name: 'Benefits',
  primaryKey: 'uuid',
  properties:{
    uuid: 'string',
    title: 'string?',
    image: 'string?',
    type: 'string?',
    item: 'ItemBenefit[]'
  }
}

export const ItemBenefitSchema = {
  name: 'ItemBenefit',
  primaryKey: 'uuid',
  properties:{
    uuid: 'string',
    description: 'string?' 
  }
}


export const WeekdaysSchema = {
  name: 'Weekdays',
  primaryKey: 'keyday',
  properties:{
    keyday: 'string',
    day: 'string?'
  }
}




export const schema = [
  UserSchema,
  MembresySchema,
  CertificatesSchema,
  TransacctionsSchema,
  RestaurantsSchema,
  InformationSchema,
  HotelsSchema,
  PicturesHotelSchema,
  OffersSchema,
  TypeOfferSchema,
  ItemPackageSchema,
  ItemAdditionalSchema,
  BenefitsSchema,
  ItemBenefitSchema
];
