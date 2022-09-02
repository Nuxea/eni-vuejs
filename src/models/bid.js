export default class Bid {
  constructor(userId, auctionId, price, bidItem, id) {
    this.userId = userId;
    this.auctionId = auctionId;
    this.price = price;
    this.bidItem = bidItem;
    this.id = id;
  }
}
