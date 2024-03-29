

export function sendNotification(arrayTokens,title,body){
    const FIREBASE_API_KEY = "AAAAOwqljT4:APA91bF8EG_orGbo4DXJUmT5Tq6YS973pkFjPUE18DH_HOkkUiTKrBRTNYE64zq8joJGci3b_tFt_skS1ejMy2ukPYUL6nRX-c-itAtlPvRyNeTjTYYlpHmwr3mb3LWJodD0Zx75D-lH";
                          const message = {
                            registration_ids: arrayTokens, 
                             notification: {
                               title: title,
                               body: body,
                               "vibrate": 1,
                               "sound": 1,
                               "show_in_foreground": true,
                               "priority": "high",
                               "content_available": true,
                             },
                         }

                         let headers = new Headers({
                          "Content-Type": "application/json",
                          "Authorization": "key=" + FIREBASE_API_KEY
                        });
                      
                        fetch("https://fcm.googleapis.com/fcm/send", { method: "POST", headers, body: JSON.stringify(message) }).then((value)=>{
                        }).catch(error=>{
                          alert(JSON.stringify(error,null,4))
                        });
}