import axios from 'axios'

import store from '@/store'

var errorMessagr = {
  "kz": {
    "email_no_valid": "Жарамсыз пошта",
    "email": "Пошта кемінде 5 таңбадан тұруы керек",
    "password": "Құпия сөз кемінде 3 таңбадан тұруы керек",
    "error500": "Сұраныс өңдеу қатесі, әрекетті кейінірек қайталаңыз",
    "fieldNotMatch": "Өрістер сәйкес келмейді"
  },
  "ru": {
    "email_no_valid": "Не валидная почта",
    "email": "Почта должна состоять не менее чем из 5 символов",
    "password": "Пароль должна состоять не менее чем из 3 символов",
    "error500": "Ошибка обработки запроса попробуйте чуть позже",
    "fieldNotMatch": "Поля не совпадают"
  }
}

export function time_in_milliseconds(exp){
  let date1 = new Date();
  let date2 = new Date(exp * 1000);
  let timeDiff = date2.getTime() - date1.getTime();

  return timeDiff
}


export async function axiosMiddleware(methods, url, jsonData, auth=false, refreshToken=false, header={}, reqState=true){
  axios.defaults.baseURL = 'http://127.0.0.1:8081' + "/api/v1";

  let lang = store.getters.getLang;
  let result = {errorState: false};
  let request = null;
  let config = {
    headers: Object.assign({
      'accept-language': lang
    }, header)
  };

  if (auth){
    let token = (!refreshToken) ? store.getters.getAccessToken :store.getters.getRefreshToken
    config.headers['Authorization'] = `Bearer ${token}`
  }

  if (reqState){
    store.commit('setRequestStatus', true)
  }

  try{
    switch (methods){
      case "GET":
        request = await axios.get(url, config);
        break;

      case "POST":
        request = await axios.post(url, jsonData, config);
        break;

      case "PUT":
        request = await axios.put(url, jsonData, config);
        break;

      case "PATCH":
        request = await axios.patch(url, jsonData, config);
        break;

      case "DELETE":
        request = await axios.delete(url, config);
    }

    result.statusCode = request.status;
    if (request.status !== 204)
      result['data'] = request.data;

  }catch(err){
    result.errorState = true;

    if (err.response && err.response.status !== 500){
      let errorText = '';

      switch (err.response.status) {
        case 422:
          console.log(err.response.data)

          for (let i in err.response.data.detail){
            if (err.response.data.detail[i].loc[1] === 'email')
              err.response.data.detail[i].loc[1] = "email_no_valid"

            if (errorMessagr[lang][err.response.data.detail[i].loc[1]])
              errorText += `${errorMessagr[lang][err.response.data.detail[i].loc[1]]}. `

            else
              errorText += `${err.response.data.detail[i].loc[1]}, ${err.response.data.detail[i].msg}. `
          }

          result.statusCode = err.response.status;
          result.errorMessage = errorText;
          break;

        default:
          result.statusCode = err.response.status;
          result.errorMessage = err.response.data.detail;
      }
    }

    else
      result.errorMessage = errorMessagr[lang].error500;

  }
  finally{
    store.commit('setRequestStatus', false)
  }

  return result;
}


export function checkInput(inputs, compareKeys=[], customInput={}){
  let lang = store.getters.getLang;
  let langErrorMessagr = errorMessagr[lang];

  for (const [key, value] of Object.entries(inputs)) {
    let inputData = customInput[key];

    switch (key){
      case 'email':
        if (value.length < 5)
          return {'status': false, 'message': langErrorMessagr.email};
        break;

      case 'password':
        if (value.length < 3)
          return {'status': false, 'message': langErrorMessagr.password};
        break;

      default:
        if (inputData){
          switch (typeof value) {
            case 'number':
              if (value < inputData['minLength']){
                return {'status': false,
                        'message': `Поля '${inputData['inputName']}' не заполнено`
                };
              }
              break;

            case 'string':
              if (value.length < inputData['minLength']){
                return {'status': false,
                        'message': `Длина поля '${inputData['inputName']}' меньше ${inputData['minLength']} символов`
                };
              }
            }
          }
        }
      }

  if (compareKeys.length > 1){
    for (let key in compareKeys){
      for (let same in compareKeys){
        if (inputs[compareKeys[same]] !== inputs[compareKeys[key]])
          return {'status': false, 'message': langErrorMessagr.fieldNotMatch}
      }
      delete compareKeys[key]
    }
  }

  return {'status': true};
}


export default {time_in_milliseconds, axiosMiddleware, checkInput};
