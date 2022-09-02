import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "@/services/base.service";

const API_URL = BASE_API_URL + "/api/order";

class OrderService {
  saveOrder(order) {
    const req = axios.post(API_URL, order, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  getAllOrderItems() {
    const req = axios.get(API_URL, {headers:authHeader()});
    return handleResponseWithLoginCheck(req);
  }
}

export default new OrderService();
