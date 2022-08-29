import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "@/services/base.service";

const API_URL = BASE_API_URL + "/api/auction/type";

class AuctionTypeService {
  saveAuctionType(type) {
    const req = axios.post(API_URL, type, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  deleteAuctionType(type) {
    const req = axios.delete(API_URL + "/" + type.id, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  getAllAuctionTypes() {
    return axios.get(API_URL + "/all");
  }

  getAuctionById(id) {
    return axios.get(API_URL + "/" + id);
  }
}

export default new AuctionTypeService();
