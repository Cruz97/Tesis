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
from timeit import default_timer as timer



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
            # print(json_data)
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

def createMembresy(membresy,certificates, transacctions):
    
    ini = '{'
    body = ''
    value = ''
    for k, v in membresy.items():
        # print(str(v))
        value = ''
        if type(v) == int:
            value = str(v)
            continue
        elif v is None:
            value = 'null'
            continue
        elif type(v) == list:
            if k == 'certificates':
                
                hijo = ''
                for i in range(0,len(certificates)):
                    hijo += createSimpleInput(certificates[i])
                value += '['+str(hijo)+']'
                
            if k == 'transacctions':
                
                hijo = ''
                for i in range(0,len(transacctions)):
                    hijo += createSimpleInput(transacctions[i])
                value += '['+str(hijo)+']'
                # body += ','
        else:
            # body += k
            # body += ':'
            value = '\"'
            try:
                value += str(v).decode('ascii', 'ignore')
            except ValueError:
                body += 'null'
            value += '\"'
            # body += ','
            continue
        children = k+':'+value+','
        body += children
        # print('aaaaaa->'+str(body))
    fin = ini + body + '}'
    # print(str(fin))
    return fin


def createSimpleInput(item):
    # print(type(item))
    ini = '{'
    body = ''
    value = ''
    for k, v in item.items():
        value = ''
        if k == 'uuid':
            v = uuid.uuid1()
            value = str(v)
        if type(v) == int:
            value = str(v)
            continue
        elif v is None:
            value = 'null'
            continue
        elif type(v) == list:
            cad = ''
            for x in v:
                cad += str(createSimpleInput(x))
            
            value = '['+cad+']'
            continue
        elif type(v) == float:
            value = str(v)
            continue
        else:
            value = '\"'
            
            try:
                value += str(v)
            except ValueError:
                body += 'null'
            value += '\"'
        body += k+':'+value+','
    fin = ini + body + '}'
    # print(str(fin))
    return fin


def createList(lista):
    ini = '{'
    body = ''
    value = ''
    for k, v in lista.items():
        value = ''
        if type(v) == int:
            value = str(v)
            continue
        elif v is None:
            value = 'null'
            continue 
        else:
            value = '\"'
            try:
                value += str(v).decode('ascii', 'ignore')
            except ValueError:
                body += 'null'
            value += '\"'+','
            continue
        body += k+':'+value+','
    fin = ini + body + '}'
    return fin



# def item(k,v):
#     return k

def createInputWithRelations(user,membresy,certificates,transacctions):
    
    ini = '{'
    body = ''
    value = ''
    cont = 0
    for k, v in user.items():
        # value = ''
        value = ''
        
        if k == 'uuid': 
            # v = str(uuid.uuid1())
            # print(v)
            value = str(v)
            # print(value)
            
        if k == 'membresy':
            value = str(createMembresy(membresy,certificates,transacctions))
            # print('')
            # print('value: '+value)
            # print(value)
            # body += str(hijo)
            # body += ','
            continue
        elif type(v) == int:
            # body += k
            # body += ':'
            value = str(v)
            # body += ','
            continue
        elif type(v) == float:
            # body += k
            # body += ':'
            value = v
            # body += ','
            continue
        elif v is None:
            # body += k
            # body += ':'
            value = 'null'
            # body += ','
            continue
        else:
            # body += k
            # body += ':'
            value = '\"'
            # print(value)
            try:
                value += v
            except ValueError:
                body += 'null'
            value += '\"'
            # body += ','
            # continue
        cont += 1
        # print('value: '+value)
        children = k+':'+value+','
        # print(children)
        body += children
    fin = ini + body + '}'
    # print('fin '+fin)
    # print(str(fin))
    return str(fin)

start = timer()

t_obj = RealmToken('https://oroverdeprod.us1.cloud.realm.io', '/OroVerde', 'realm-token.json',
                   'oroverdeprueba', 'prueba')

client = t_obj.get_client()
# print(client)

with open('data4.json','r') as file:
    data = json.load(file)

# Process to SAVE User, membresy, Certificates, And Transacctions
user = data['User']
# print(user)
membresys = data['Membresy']
certificates = data['Certificates']
transacctions = data['Transacctions']
for i in range(0,len(user)):
    # print('')
    input = createInputWithRelations(user[i],membresys[i],certificates,transacctions)
    cadena = """mutation add{createUsers(input:"""+input+""", updatePolicy: ALL){uuid}}"""
    # print(cadena)
    a = client.execute(cadena)
    # print(a)
    
    
# Process to SAVE Benefits  and ItemBenefits
benefits = data['Benefits']
input = ''
for i in range(0,len(benefits)):
    input = createSimpleInput(benefits[i])
    # print(input)
    # print('')
    cadena = """mutation add{createBenefits(input:"""+input+""",updatePolicy: ALL){uuid}}"""
    # print (cadena)
    a = client.execute(cadena)
    # print(a)
    
    
# Process to SAVE Hotels  and Picture Hotels
hotels = data['Hotels']
input = ''
for i in range(0,len(hotels)):
    input = createSimpleInput(hotels[i])
    # print(input)
    # print('')
    cadena = """mutation add{createHotels(input:"""+input+""",updatePolicy: ALL){uuid}}"""
    # print (cadena)
    a = client.execute(cadena)
    # print(a)


#Process to SAVE Offers, ItemOffers, ItemPackage, Additional
offers = data['Offers']
input = ''
for i in range(0,len(offers)):
    input = createSimpleInput(offers[i])
    # print(input)
    # print('')
    cadena = """mutation add{createOffers(input:"""+input+""",updatePolicy: ALL){uuid}}"""
    # print (cadena)
    a = client.execute(cadena)
    # print(a)


#Process to SAVE Restaurants
restaurants = data['Restaurants']
input = ''
for i in range(0,len(restaurants)):
    input = createSimpleInput(restaurants[i])
    cadena = """mutation add{createRestaurants(input:"""+input+""", updatePolicy: ALL){uuid}}"""
    a = client.execute(cadena)
    # print(a)
    
#Process to SAVE Information
info = data['Information']
input = ''

for i in range(0,len(info)):
    input = createSimpleInput(info[i])
    cadena = """mutation add{createInformation(input:"""+input+""", updatePolicy: ALL){uuid}}"""
    a = client.execute(cadena)
    # print(a)

#Process to SAVE Information
# info = data['Information']
# input = ''
# input = createSimpleInput(info[0])
# cad = ''
# for j in range(0,1000):
#     input = createSimpleInput(info[0])
#     cad += input
# cadena = '['+cad+']'
# # print(cadena)
# a = client.execute(cadena)
# print(a)
    

# for x in range(0,10):
#     # for i in range(0,len(info)):
#     input = createSimpleInput(info[0])
#     cadena = """mutation add{createInformation(input:"""+input+"""){uuid}}"""
#     a = client.execute(cadena)
#     # print(a)


end = timer()
print(end - start) 







