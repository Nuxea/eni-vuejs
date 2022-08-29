import { BASE_API_URL } from "@/common/Constants";
import { authHeader, handleResponseWithLoginCheck } from "@/services/base.service";
import axios from "axios";

const API_URL = BASE_API_URL + "/api/credit";

class CreditService {
  saveCredit(credit) {
    const req = axios.post(API_URL, credit, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  deleteCredit(credit) {
    const req = axios.delete(API_URL + "/" + credit.id, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  getAllCredits() {
    return axios.get(API_URL);
  }
}

export default new CreditService();
