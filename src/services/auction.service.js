import { BASE_API_URL } from "@/common/Constants";
import axios from "axios";
import { authHeader, handleResponseWithLoginCheck } from "@/services/base.service";

const API_URL = BASE_API_URL + "/api/auction";

class AuctionService {
  saveAuction(auction) {
    const req = axios.post(API_URL, auction, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  deleteAuction(auction) {
    const req = axios.delete(API_URL + "/" + auction.id, {headers: authHeader()});
    return handleResponseWithLoginCheck(req);
  }

  getAllAuctions() {
    return axios.get(API_URL + "/all");
  }

  getAuctionById(id) {
    return axios.get(API_URL + "/" + id);
  }
}

export default new AuctionService();
