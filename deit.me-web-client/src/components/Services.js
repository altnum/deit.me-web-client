export const API_URL = 'http://localhost:8080';

async function makeRequest(endpoint, method = "GET", data = undefined, key = undefined) {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(key) {
      headers.append('Authorization', `Bearer ${key}`);
    }
    const url = API_URL + endpoint;
    const response = await fetch(url, { headers, method, body: data && JSON.stringify(data) })
    if(response.status === 200){
      return response.json();
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

class UserService {
  contructor(){ }

  async login(email, password){
    const res = await makeRequest('/auth/signin', 'POST', { email, password });
    if(res) {
      localStorage.setItem('user', JSON.stringify(res));
      return true
    } else {
      return false;
    }
  }

  async register(user) {
    const res = await makeRequest('/auth/signup', 'POST', user);
    if(res) {
      return true
    } else {
      return false;
    }
  }

  async getUserInfo() {
    return localStorage.getItem('user');
  }

  async browseUsers() {
    let user = JSON.parse(localStorage.getItem('user'))
    const res = await makeRequest('/api/browse?shouldMatchHobbies=false', 'GET', undefined, user.token)
    if(res) {
      return res
    } else {
      return false
    }
  }

  async likeUser(token, liked) {
    let user = JSON.parse(localStorage.getItem('user'))
    const res = await makeRequest('/api/browse', 'POST', {token, liked}, user.token)
    console.log(res)
    if (res.matched == true) {
      return true
    } else {
      return false
    }
  }

  async getUser(userId) {
    let user = JSON.parse(localStorage.getItem('user'))
    const res = await makeRequest('/api/user?userId=' + userId, 'GET', undefined, user.token)
    if (res) {
      return res
    } else {
      return false
    }
  }

  async getUserPictures() {
    let user = JSON.parse(localStorage.getItem('user'))
    let otherUser = JSON.parse(localStorage.getItem('otherUser'))
    const res = await makeRequest('/api/user/pictures/all?userId=' + otherUser.id, 'GET', undefined, user.token)
    return res
  }
}

class HobbyService {
  contructor(){ }

  async getAll() {
    const res = await makeRequest('/api/hobby', 'GET');
    if (res) {
      return JSON.stringify(res)
    } else {
      return false;
    }
  }
}

export const hobbyService = new HobbyService();
export const userService = new UserService();