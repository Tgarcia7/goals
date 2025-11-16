import config from '../config'
import axios from 'axios'
import Router from '../router'

const api = { baseUrl: config.apiUrl, baseToken: config.baseToken }

// Token refresh lock to prevent race conditions
let isRefreshing = false
let refreshSubscribers = []

// Initialize authorization header
const storedToken = localStorage.getItem('token')
if (storedToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
}
setInterceptors()

/*** Users ***/
api.authenticate = async function (user) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${api.baseToken}` },
      data: { email: user.email, password: user.password },
      url: `${api.baseUrl}/signIn`,
      validateStatus: status => status < 500
    }

    const response = await axios(requestOptions)

    if (response.status === 401) {
      throw new Error('Usuario y/o contraseña incorrecta')
    }

    const authUser = parseJwt(response.data.token).sub
    const authToken = response.data.token
    const refreshToken = response.data.refreshToken

    localStorage.setItem('token', authToken)
    localStorage.setItem('refresh-token', refreshToken)
    localStorage.setItem('user', JSON.stringify(authUser))
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

    return response
  } catch (error) {
    console.error('Authentication error:', error.message)
    localStorage.removeItem('token')
    throw new Error(error.message || 'Error de autenticación')
  }
}

api.register = async function (user) {
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

    const response = await axios(requestOptions)

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('refresh-token', response.data.refreshToken || '')
    localStorage.setItem('user', JSON.stringify(parseJwt(response.data.token).sub))
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

    return response
  } catch (error) {
    if (error.response?.status === 409) {
      throw new Error('El email ya está registrado')
    }

    console.error('Registration error:', error.message)
    localStorage.removeItem('token')
    throw new Error('Error al registrar al usuario')
  }
}

api.socialAuth = async function (authResult, provider) {
  try {
    // TODO: Implement proper social auth with backend
    // For now, store the token from the auth result
    if (authResult && authResult.access_token) {
      localStorage.setItem('token', authResult.access_token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${authResult.access_token}`
    }
    return authResult
  } catch (error) {
    console.error('Social auth error:', error.message)
    throw new Error('Error en autenticación social')
  }
}

api.logout = function () {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh-token')
  localStorage.removeItem('user')
  delete axios.defaults.headers.common['Authorization']
}

api.forgetPassword = async function (email) {
  try {
    // TODO: Replace with actual backend call
    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${api.baseToken}` },
      data: { email },
      url: `${api.baseUrl}/users/forgot-password`
    }

    await axios(requestOptions)
    return '¡Listo! Las instrucciones para reestablecer la contraseña fueron enviadas a la cuenta ingresada'
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('El correo ingresado no está asociado con ninguna cuenta')
    }
    console.error('Password reset error:', error.message)
    throw new Error('Error al enviar instrucciones de recuperación')
  }
}

api.updateUser = async function (user) {
  try {
    const updateUser = JSON.parse(JSON.stringify(user))

    const requestOptions = {
      method: 'PUT',
      url: `${api.baseUrl}/users/${updateUser.id}`,
      data: updateUser
    }

    const response = await axios(requestOptions)

    const storageUser = getStorageUser()
    if (storageUser) {
      storageUser.name = updateUser.name || storageUser.name
      storageUser.email = updateUser.email || storageUser.email
      setStorageUser(storageUser)
    }

    return response.data
  } catch (error) {
    if (error.response?.status === 409) {
      throw new Error('El email ya está registrado')
    }

    console.error('Update user error:', error.message)
    throw error
  }
}

api.changePassword = async function (id, email, password, newPassword) {
  try {
    const updateUser = {
      email,
      newPassword,
      password
    }

    const requestOptions = {
      method: 'PATCH',
      url: `${api.baseUrl}/users/${id}/change-password`,
      data: updateUser
    }

    const response = await axios(requestOptions)
    return response.data
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error('Contraseña incorrecta')
    }

    console.error('Change password error:', error.message)
    throw error
  }
}

api.changeLanguage = function (newLanguage) {
  const storageUser = getStorageUser()
  if (!storageUser) {
    console.error('No user found in storage')
    return
  }

  const user = {
    id: storageUser.userId,
    lang: newLanguage
  }

  api.updateUser(user)
}

function subscribeTokenRefresh (callback) {
  refreshSubscribers.push(callback)
}

function onTokenRefreshed (newToken) {
  refreshSubscribers.forEach(callback => callback(newToken))
  refreshSubscribers = []
}

function setInterceptors () {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      // Check if error has response and is 401
      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error)
      }

      // Don't retry if already retried or no token
      if (originalRequest._retry || !localStorage.getItem('token')) {
        return Promise.reject(error)
      }

      if (isRefreshing) {
        // Wait for token refresh to complete
        return new Promise(resolve => {
          subscribeTokenRefresh(newToken => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            resolve(axios.request(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const newToken = await api.requestNewtoken()
        onTokenRefreshed(newToken)
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return axios.request(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
  )
}

api.requestNewtoken = async function () {
  try {
    const storageUser = getStorageUser()
    const storedRefreshToken = localStorage.getItem('refresh-token')

    if (!storageUser || !storedRefreshToken) {
      throw new Error('No refresh token available')
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${api.baseToken}` },
      data: { email: storageUser.email, refreshToken: storedRefreshToken },
      url: `${api.baseUrl}/users/refresh-token`
    }

    const response = await axios(requestOptions)
    const authToken = response.data.message || response.data.token

    localStorage.setItem('token', authToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

    return authToken
  } catch (error) {
    console.error('Token refresh failed:', error.message)
    localStorage.removeItem('token')
    localStorage.removeItem('refresh-token')
    localStorage.removeItem('user')
    Router.push({ name: 'login' })
    throw new Error('Session expired')
  }
}

/*** Goals ***/
api.getGoals = async function () {
  try {
    const requestOptions = {
      method: 'GET',
      url: `${api.baseUrl}/goals`
    }

    const response = await axios(requestOptions)
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      return []
    }

    console.error('Get goals error:', error.message)
    throw error
  }
}

api.setGoal = async function (goal) {
  try {
    const storageUser = getStorageUser()
    if (!storageUser) {
      throw new Error('User not found')
    }

    goal.userId = storageUser.userId

    const requestOptions = {
      method: 'POST',
      url: `${api.baseUrl}/goals`,
      data: goal
    }

    const response = await axios(requestOptions)
    return response.data
  } catch (error) {
    console.error('Set goal error:', error.message)
    throw error
  }
}

api.updateGoal = async function (goal) {
  try {
    const updateGoal = JSON.parse(JSON.stringify(goal))
    updateGoal._id = updateGoal.id
    delete updateGoal.id

    const requestOptions = {
      method: 'PUT',
      url: `${api.baseUrl}/goals/${updateGoal._id}`,
      data: updateGoal
    }

    const response = await axios(requestOptions)
    return response.data
  } catch (error) {
    console.error('Update goal error:', error.message)
    throw error
  }
}

api.getGraphsStats = async function () {
  try {
    const requestOptions = {
      method: 'GET',
      url: `${api.baseUrl}/graphs-stats`
    }

    const response = await axios(requestOptions)
    return response.data
  } catch (error) {
    console.error('Get stats error:', error.message)
    throw error
  }
}

/*** Utils ***/
function getStorageUser () {
  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      return null
    }
    return JSON.parse(userStr)
  } catch (error) {
    console.error('Failed to parse user from storage:', error.message)
    return null
  }
}

function setStorageUser (user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function parseJwt (token) {
  if (!token || typeof token !== 'string') {
    throw new Error('Invalid token')
  }

  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid token format')
  }

  try {
    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    throw new Error('Failed to parse JWT: ' + error.message)
  }
}

export default api
