export const API_URL = 'http://localhost:8080';

async function makeRequest(endpoint, method = "GET", data = undefined, key = undefined) {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if(key) {
      headers.append('Authorization', `Bearer ${key}`);
    }
    const url = API_URL + endpoint;
    const response = await fetch(url, { method, body: data && JSON.stringify(data) })
    if(response.status === 200){
      return await response.json();
    }else {
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

export const userService = new UserService();