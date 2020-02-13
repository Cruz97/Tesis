# encoding=utf8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
import pandas as pd
from graphqlclient import GraphQLClient
from datetime import datetime
import json
import requests
import os.path
import uuid



class RealmToken:
    def __init__(self, url, path, filename, username, password):
        self._username = username
        self._password = password
        self._filename = filename
        self._url = url
        self._path = path
        self._reset()
        self._load()

    def _reset(self):
        self._token = None
        self._expires = None
        self._expired = None

    def _load(self):
        if os.path.isfile(self._filename):
            with open(self._filename) as f:
                data = json.load(f)
                self._token = data['token']
                self._expires = data['expires']

    def _check_expired(self):
        if self._expires:
            self._expired = datetime.fromtimestamp(self._expires) < datetime.now()

    def refresh_token(self):
        data = {
            'app_id': '',
            'provider': 'password',
            'data': self._username,
            'user_info': {
                'register': False,
                'password': self._password
            }
        }
        res = requests.post('{}/auth'.format(self._url), json=data)
        if res.ok:
            json_data = res.json()
            self._token = json_data['refresh_token']['token']
            self._expires = None
            self._expired = False
            self._save_token()
            return self._token
        return None

    def _save_token(self):
        with open(self._filename, 'w') as f:
            f.write(json.dumps({'token': self._token, 'expires': self._expires}))

    def get_client(self):
        token = self.refresh_token()
        if token:
            client = GraphQLClient('{}/graphql/{}'.format(self._url, self._path))
            client.inject_token(token)
            return client
        return None


# t_obj = RealmToken('https://csales-dev-1.us1a.cloud.realm.io', '/dev', 'realm-token.json',
#                    'guillermo.ramirez@5bits.com', 'bau5bits')
t_obj = RealmToken('https://oroverdeprod.us1.cloud.realm.io', '/OroVerde', 'realm-token.json',
                   'oroverdeprueba', 'prueba')

client = t_obj.get_client()

# uoms = pd.read_csv('product.uom.categ.csv')
# uoms = uoms.to_dict('records')
#
# a = client.execute("""
# mutation CreateProductUomCategories($input: [ProductUomCategoryInput!]) {
#   createProductUomCategories(input: $input, updatePolicy: ALL) {
#     uuid
#   }
# }
# """, variables={'input': uoms})


# uoms = pd.read_csv('product.uom.csv')
# uoms['category_id'] = uoms['category_id'].map(lambda x: {'uuid': x})
# uoms = uoms.to_dict('records')
#
# a = client.execute("""
# mutation CreateProductUoms($input: [ProductUomInput!]) {
#   createProductUoms(input: $input, updatePolicy: ALL) {
#     uuid
#   }
# }
# """, variables={'input': uoms})


def create_records(file, mutation, many2one_fields=[], one2many_fields=[]):
    records = pd.read_csv(file)
    records['uuid'] = records['uuid'].map(lambda x: str(x), na_action='ignore')
    for field in many2one_fields:
        records[field] = records[field].map(lambda x: {'uuid': str(x)}, na_action='ignore')

    for field in one2many_fields:
        records[field] = records[field].map(lambda x: [{'uuid': str(record)} for record in eval(x)], na_action='ignore')

    records = records.to_dict('records')
    records = [{k: v for k, v in x.items() if v == v} for x in records]

    records_len = len(records)

    for i in range((records_len // 100) + 1):
        start = i * 100
        end = start + 100
        try:
            print('Creando {} registros de {}'.format(start + 100, records_len))
            client.execute(mutation, variables={'input': records[start:end]})
        except Exception as e:
            print('Valio verga:', e)


def insert(nameMutation, nameInput, records):
    records_len = len(records)

    mutation = """
    mutation Create"""+nameMutation+"""($input: ["""+nameInput+"""Input!]) {
      create"""+nameMutation+"""(input: $input, updatePolicy: ALL) {
        uuid
      }
    }
    """
    for i in range((records_len // 100) + 1):
        start = i * 100
        end = start + 100
        try:
            print('Creando {} registros de {}'.format(start + 100, records_len))
            # print(records)
            a = client.execute(mutation, variables={'input': records[start:end]})
            print(a)
        except Exception as e:
            print('Valio:', e)

def generateRecord(nameSchema, nameSchemaChildren, param):
      print(nameSchema)
      for result in data[nameSchema]:
        id = uuid.uuid1()  
        # print(id)
        print(result[u'uuid'] + ' uuid => ' + str(id))
        result[u'uuid']= str(id)
       
        # result[param] = []
        # result[param]= 
        if param != None:
          result[param] = compareUUID(result[param],data[nameSchemaChildren])
          
def generateRecordMembresy(nameSchema, nameSchemaChildren, param):
      print(nameSchema)
      for result in data[nameSchema]:
        id = uuid.uuid1()  
        # print(id)
        print(result[u'uuid'] + ' uuid => ' + str(id))
        result[u'uuid']= str(id)
       
        # result[param] = []
        # result[param]= 
        if param != None:
          result[param] = compareUUID(result[param],data[nameSchemaChildren])
        
        # data[nameSchemaChildren][x] 
        # for x in data[nameSchemaChildren] if result[param]== data[nameSchemaChildren][x][u'uuid']]
        # records[field] = records[field].map(lambda x: [{'uuid': str(record)} for record in eval(x)], na_action='ignore')


def compareUUID(campJson,schema):
      array = []
      for item in campJson:
            for item2 in schema:
                  if(item == item2[u'uuid']):
                        array.append(item2)
      if len(array) == 1:
        return array[0]
      else:
        return array
                  
        
with open('datac.json','r') as file:
    data = json.load(file)

jsonString = json.dumps(data,ensure_ascii=False).encode('utf8')
# print(json.loads(jsonString)['User'])
data = json.loads(jsonString)






# #Insercion de Hoteles y sus imagenes
# generateRecord('Hotels','PictureHotel',u'images')
# insert('PictureHotels','PictureHotel',data['PictureHotel'])
# insert('Hotelss','Hotels',data['Hotels'])

# #Insercion de Beneficios
# generateRecord('Benefits','ItemBenefit',u'item')
# insert('ItemBenefitss','ItemBenefit',data['ItemBenefit'])
# insert('Benefitss','Benefits',data['Benefits'])



# #Insercion de las Ofertas
# generateRecord('Offers','TypeOffer',u'types')
# generateRecord('Offers','ItemPackage',u'items')
# generateRecord('Offers','ItemAdditional',u'additionals')
# insert('TypeOffers','TypeOffer',data['TypeOffer'])
# insert('ItemPackages','ItemPackage',data['ItemPackage'])
# insert('ItemAdditionals','ItemAdditional',data['ItemAdditional'])
# insert('Offerss','Offers',data['Offers'])

# #Insercion de Restaurantes
# insert('Restaurantss','Restaurants',data['Restaurants'])

# #Insercion de Restaurantes
# insert('Informations','Information',data['Information'])


# Insercion de certificados
generateRecord('Membresy','Certificates',u'certificates')
insert('Certificatess','Certificates',data['Certificates'])

# Insercion de transacciones
generateRecord('Membresy','Transacctions',u'transacctions')
insert('Transacctionss','Transacctions',data['Transacctions'])

# Insercion de membresias
generateRecord('User','Membresy',u'membresy')
# insert('Membresies','Membresy',data['Membresy'])
insert('Users','User',data['User'])












# insert('Informations','Information',json.loads(jsonString)['Information'])



          
      
      
