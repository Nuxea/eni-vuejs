export default class Auction {
  constructor(id, name, userId, auctionTypeId, createTime, price, description, endTime, imageUrl) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.auctionTypeId = auctionTypeId;
    this.createTime = createTime;
    this.price = price;
    this.description = description;
    this.endTime = endTime;
    this.imageUrl = imageUrl;
  }
}
