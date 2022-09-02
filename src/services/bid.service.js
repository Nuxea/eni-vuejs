import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "@/services/base.service";

const API_URL = BASE_API_URL + "/api/bid";

class BidService {
  saveBid(bid) {
    const req = axios.post(API_URL, bid, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  getAllBidItems() {
    const req = axios.get(API_URL, {headers:authHeader()});
    return handleResponseWithLoginCheck(req);
  }
}

export default new BidService();
