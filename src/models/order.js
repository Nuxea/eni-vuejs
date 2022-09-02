export default class Order {
  constructor(userId, creditId, price, orderItem, id) {
    this.userId = userId;
    this.creditId = creditId;
    this.price = price;
    this.orderItem = orderItem;
    this.id = id;
  }
}
