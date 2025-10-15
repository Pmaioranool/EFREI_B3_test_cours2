const {
  Basket,
  addToBasket,
  removeFromBasket,
  transactionAllowed,
  payBasket,
} = require("../src/ecommerce");

//testAdd
test("ajout d’un produit met à jour le prix total", () => {
  const basket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(basket, item);
  expect(basket.totalPrice).toBe(100);
});

//testRemove
test("suppression d’un produit remet le total à zéro", () => {
  const basket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  expect(basket.totalPrice).toBe(0);
});

//testAddRemove
test("ajout et suppression d’un produit", () => {
  const basket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  expect(basket.totalPrice).toBe(0);
});

//testTransactionAllowed
test("transaction autorisé ou refusé selon le solde", () => {
  const user = { name: "user", balance: 500 };
  expect(transactionAllowed(user, 400)).toBe(true);
  expect(transactionAllowed(user, 600)).toBe(false);
});

//testPayBasket
test("panier payé avec un solde suffisant", () => {
  const user = { name: "user", balance: 500 };
  const userAfterTransaction = { name: "user", balance: 200 };
  const basket = new Basket();
  const item = { name: "Carte mère", price: 300 };
  addToBasket(basket, item);
  expect(payBasket(user, basket)).toBe(true);
  expect(payBasket(userAfterTransaction, basket)).toBe(false);
});
