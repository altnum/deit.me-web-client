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
    }else {
      return false;
    }
  }

  async register(){

  }

  async getUserInfo() {
    return localStorage.getItem('user');
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