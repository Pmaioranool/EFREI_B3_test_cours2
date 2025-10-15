const {
  Basket,
  addToBasket,
  removeFromBasket,
  transactionAllowed,
  payBasket,
} = require("../src/ecommerce");

function testAdd() {
  const basket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(basket, item);
  return basket.totalPrice === 100;
}

function testRemove() {
  const basket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  return basket.totalPrice === 0;
}

function testAddRemove() {
  const basket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  return basket.totalPrice === 0;
}

function testTransactionAllowed() {
  const user = { name: "user", balance: 500 };
  return transactionAllowed(user, 400) && !transactionAllowed(user, 600);
}

function testPayBasket() {
  const user = { name: "user", balance: 500 };
  const userAfterTransaction = { name: "user", balance: 200 };
  const basket = new Basket();
  const item = { name: "Carte mère", price: 300 };
  addToBasket(basket, item);
  return payBasket(user, basket) && !payBasket(userAfterTransaction, basket);
}

function testAppEcommerce() {
  let success = testAdd();
  success = success && testRemove();
  success = success && testAddRemove();
  success = success && testTransactionAllowed();
  success = success && testPayBasket();
  if (success) {
    console.log("OK");
  } else {
    console.log("ERREUR");
  }
}

testAppEcommerce();
