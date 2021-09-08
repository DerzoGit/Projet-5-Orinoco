"use strict";

const order = JSON.parse(localStorage.getItem("order"));
console.log(order);
const basketPrice = localStorage.getItem("basketPrice");
console.log(basketPrice);

const orderName = document.querySelector(".order-name");
console.log(order.contact.firstName);
orderName.innerHTML = order.contact.firstName + " " + order.contact.lastName;

const orderPrice = document.querySelector(".order-price");
orderPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
}).format(basketPrice);

const orderId = document.querySelector(".order-id");
orderId.innerHTML = order.orderId;

const orderMail = document.querySelector(".order-mail");
orderMail.innerHTML = order.contact.email;

const orderAddress = document.querySelector(".order-address");
orderAddress.innerHTML = order.contact.address + ", " + order.contact.city;

localStorage.clear();