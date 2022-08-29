import { BASE_API_URL } from "@/common/Constants";
import { authHeader, handleResponseWithLoginCheck } from "@/services/base.service";
import axios from "axios";

const API_URL = BASE_API_URL + "/api/user";

class UserService {
  changeRole(user, role) {
    const req = axios.put(API_URL + "/" + user.id + "/change/" + role, {}, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  saveUser(user) {
    const req = axios.post(API_URL, user, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  deleteUser(user) {
    const req = axios.delete(API_URL + "/" + user.id, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  getAllUsers() {
    return axios.get(API_URL + "/all");
  }

  getUserById(id) {
    return axios.get(API_URL + "/" + id);
  }
}

export default new UserService();
