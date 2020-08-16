import userData from '../assets/user.json'
import config from '../config'
import axios from 'axios'
import Router from '../router'

const api = { baseUrl: config.apiUrl, baseToken: config.baseToken }
const token = localStorage.getItem('token')
const refreshToken = localStorage.getItem('refresh-token')
axios.defaults.headers.common['Authorization'] = token ? `Bearer ${localStorage.getItem('token')}` : ''
setInterceptors()

/*** Users ***/
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
      
      const authUser = parseJwt(response.data.token).sub
      const authToken = response.data.token
      const refreshToken = response.data.refreshToken

      localStorage.setItem('token', authToken)
      localStorage.setItem('refresh-token', refreshToken)
      localStorage.setItem('user', JSON.stringify(authUser))
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      resolve(response)
    } catch (error) {
      console.error(error)
      localStorage.removeItem('token')
      reject('Error de autenticación')
    }
  })
}

api.register = function (user) {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = {
        name: user.username,
        email: user.email,
        password: user.password
      }
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${api.baseToken}` },
        data: newUser,
        url: `${api.baseUrl}/signUp`
      }

      let response = await axios(requestOptions)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(parseJwt(response.data.token).sub))
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

      resolve(response)
    } catch (error) {
      if (error.response.status === 409) return reject('El email ya está registrado')

      console.error(error)
      localStorage.removeItem('token')
      reject('Error al registrar al usuario')
    }
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

api.updateUser = function (user) {
  return new Promise(async (resolve, reject) => {
    try {
      let updateUser = JSON.parse(JSON.stringify(user))

      const requestOptions = {
        method: 'PUT',
        url: `${api.baseUrl}/users/${updateUser.id}`,
        data: updateUser
      }

      let response = await axios(requestOptions)

      const storageUser = getStorageUser()
      storageUser.name = updateUser.name
      storageUser.email = updateUser.email
      setStorageUser(storageUser)

      resolve(response.data)
    } catch (error) {
      if (error.response.status === 409) return reject('El email ya está registrado')

      console.error(error)
      reject(error)
    }
  })
}

api.changePassword = function (id, email, password, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      let updateUser = {
        email,
        newPassword, 
        password
      }

      const requestOptions = {
        method: 'PATCH',
        url: `${api.baseUrl}/users/${id}/change-password`,
        data: updateUser,
        validateStatus: status => status < 500
      }

      if (response.status === 401) return reject('Contraseña incorrecta')

      let response = await axios(requestOptions)
      
      resolve(response.data)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

api.changeLanguage = function (newLanguage) {
  const user = {
    id: getStorageUser().userId,
    lang: newLanguage
  }

  api.updateUser(user)
}

function setInterceptors () {
  axios.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response.status !== 401 || !token) return Promise.reject(error)

    return api.requestNewtoken()
      .then(newToken => {
        error.config.headers['Authorization'] = `Bearer ${newToken}`
        return axios.request(error.config)
      })
  })
}

api.requestNewtoken = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const userEmail = getStorageUser().email
      const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${api.baseToken}` },
        data: { email: userEmail, refreshToken },
        url: `${api.baseUrl}/users/refresh-token`
      }

      let response = await axios(requestOptions)

      const authToken = response.data.message

      localStorage.setItem('token', authToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

      resolve(authToken)
    } catch (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh-token')
      Router.push({ name: 'login' })
    }
  })
}

/*** Goals ***/
api.getGoals = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const requestOptions = {
        method: 'GET',
        url: `${api.baseUrl}/goals`
      }

      const response = await axios(requestOptions)    
      const goals = response.data
      
      resolve(goals)
    } catch (error) {
      if (error.response.status === 404) resolve([])

      console.error(error)
      reject(error)
    }
  })
}

api.setGoal = function (goal) {
  return new Promise(async (resolve, reject) => {
    try {
      goal.userId = getStorageUser().userId

      const requestOptions = {
        method: 'POST',
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

/*** Utils ***/
function getStorageUser () {
  let payload = JSON.parse(localStorage.getItem('user'))
  return payload
}

function setStorageUser (user) {
  localStorage.setItem('user', JSON.stringify(user))
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
}

export default api