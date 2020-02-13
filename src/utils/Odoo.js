// import Database from '../../database';
// //import { USER_PASSWORD_ERROR } from './constants/Errors';



// const  USER_PASSWORD_ERROR = '9999';
// export const authenticate = (login, password, host, database) => {
//   // alert('host'+login)
//   return new Promise((resolve, reject) => {
//     const params = {
//       db: database,
//       login,
//       password
//     };
    
//     const json = JSON.stringify({ params });
//     // const url = `${host}/web/session/authenticate`;
//     const url = `${host}/web/login`;
//     // alert(url)
//      alert(JSON.stringify(json))
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'Content-Length': json.length
//       },
//       body: json
//     };
//     alert(options)
    
//     fetch(url, options)
//       .then(res => res.json())
//       .then(data => {
//         if (data.error) {
//           //alert(JSON.stringify(options))
//           //alert(JSON.stringify(data))
//           reject(JSON.stringify(data.error,null,4));
//         } else {
//           const { session_id: sessionId, uid } = data.result;
//           alert('se conecto')
//           // alert('entro')
//           // const users = Database.LocalDB.searchAll('User');
          
//           // const user = users.length ? users[0] : null;
//           // if (user) {
//           //   Database.LocalDB.update('User', {
//           //     ...user,
//           //     sessionId,
//           //     user: login,
//           //     password,
//           //     host,
//           //     database
//           //   });
//           // } else {
//           //   Database.LocalDB.create('User', {
//           //     uid,
//           //     sessionId,
//           //     user: login,
//           //     password,
//           //     host,
//           //     database
//           //   });
//           // }
//           resolve();
//         }
//       })
//       .catch(err => {
//         alert(JSON.stringify({ loc: 'fetch', err }));
//         reject(err);
//       });
//   });
// };

// //TODO: Check if password changed and user was deleted
// const request = (path, args) => {
//   return new Promise((resolve, reject) => {
//     const users = Database.LocalDB.searchAll('User');
//     const user = users.length ? users[0] : null;
//     const { host, sessionId, uid } = user;
//     const url = `${host + (path || '/')}`;
//     const context = { lang: 'es_ES', tz: 'America/Guayaquil', uid };
//     const params = { ...args };
//     params.kwargs.context = context;
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Cookie: `session_id=${sessionId};`
//       },
//       body: JSON.stringify({
//         jsonrpc: '2.0',
//         id: new Date().getUTCMilliseconds(),
//         method: 'call',
//         params
//       })
//     };
//     fetch(url, options)
//       .then(res => res.json())
//       .then(
//         data => {
//           if (data.error) {
//             if (data.error.code === 404) {
//               authenticate(user.user, user.password, host).then(() =>
//                 request(path, args)
//               );
//             } else {
//               reject(data.error);
//             }
//           } else {
//             resolve(data.result);
//           }
//         },
//         err => {
//           reject(err);
//         }
//       );
//   });
// };

// export const search = (model, params) => {
//   return request('/web/dataset/call_kw', {
//     kwargs: {},
//     model,
//     method: 'search',
//     args: [params.domain]
//   });
// };

// export const searchRead = (model, params) => {
//   return request('/web/dataset/call_kw', {
//     model,
//     method: 'search_read',
//     args: [],
//     kwargs: {
//       domain: params.domain,
//       offset: params.offset,
//       limit: params.limit,
//       order: params.order,
//       fields: params.fields
//     }
//   });
// };

// export const write = (model, id, params) => {
//   if (id) {
//     return request('/web/dataset/call_kw', {
//       kwargs: {},
//       model,
//       method: 'write',
//       args: [[id], params]
//     });
//   }
// };

// export const modelMethod = (model, method, args) => {
//   return request('/web/dataset/call_kw', {
//     kwargs: {},
//     model,
//     method,
//     args
//   });
// };
