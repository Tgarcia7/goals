import userData from '../assets/user.json'
import configService from './config'
import axios from 'axios'

const api = { baseUrl: configService.apiUrl, baseToken: configService.baseToken }
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

api.authenticate = function (user) {
  return new Promise(async (resolve, reject) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${api.baseToken}` },
        data: { email: user.email, password: user.password},
        url: `${api.baseUrl}/signIn`,
        validateStatus: status => status < 500
      }

      let response = await axios(requestOptions)
      
      if (response.status === 401) return reject('Usuario y/o contraseña incorrecta')

      user.name = userData.name
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(parseJwt(response.data.token).sub))
      axios.defaults.headers.common['Authorization'] = response.data.token

      resolve(response)
    } catch (error) {
      console.error(error)
      localStorage.removeItem('token')
      reject('Usuario y/o contraseña incorrecta')
    }
  })
}

api.register = function (user) {
  return new Promise((resolve) => {
    localStorage.setItem('token', JSON.stringify(user))
    resolve()
  })
}

api.socialAuth = function (token) {
  return new Promise(async (resolve) => {
    console.log(token)
    // request to database with token
    localStorage.setItem('token', JSON.stringify(userData))
    resolve()
      
  })
}

api.logout = function () {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  delete axios.defaults.headers.common['Authorization']
}

api.forgetPassword = function (email) {
  return new Promise(async (resolve, reject) => {
    if (email !== 'tgarciamiranda@gmail.com') {
      reject('El correo ingresado no está asociado con ninguna cuenta')
    } else {
      resolve('¡Listo! Las instrucciones para reestablecer la contraseña fueron enviadas a la cuenta ingresada')
      resolve()
    }
  })
}

api.getGoals = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${api.baseToken}` },
        url: `${api.baseUrl}/goals`
      }

      let response = await axios(requestOptions)
      
      resolve(response.data)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

api.setGoal = function (goal) {
  return new Promise(async (resolve, reject) => {
    try {
      goal.userId = getUser()

      const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${api.baseToken}` },
        url: `${api.baseUrl}/goals`,
        data: goal
      }

      let response = await axios(requestOptions)
      
      resolve(response.data)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

api.updateGoal = function (goal) {
  return new Promise(async (resolve, reject) => {
    try {
      let updateGoal = JSON.parse(JSON.stringify(goal))
      updateGoal._id = updateGoal.id
      delete updateGoal.id

      const requestOptions = {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${api.baseToken}` },
        url: `${api.baseUrl}/goals/${updateGoal._id}`,
        data: updateGoal
      }

      let response = await axios(requestOptions)
      
      resolve(response.data)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

api.getGraphsStats = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${api.baseToken}` },
        url: `${api.baseUrl}/graphs-stats/`
      }

      let response = await axios(requestOptions)
      
      resolve(response.data)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

function getUser () {
  let payload = JSON.parse(localStorage.getItem('user'))
  return payload.userId
}

function parseJwt (token) {
  let base64Url = token.split('.')[1]
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  let jsonPayload = decodeURIComponent(atob(base64)
    .split('')
    .map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

  return JSON.parse(jsonPayload)
};

export default api