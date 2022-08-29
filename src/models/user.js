export default class User {
  constructor(id, username, password, firstName, lastName, email, phone, address, zipCode, city, createTime, credit, role, token) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.zipCode = zipCode;
    this.city = city;
    this.createTime = createTime;
    this.credit = credit;
    this.role = role;
    this.token = token;
  }
}
