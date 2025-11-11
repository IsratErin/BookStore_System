import {
  searchBooks,
  addToCart,
  calculateTotal,
  processPayment,
  updateInventory,
} from "./bookstore.js";
import { books } from "./data.js";

test("returns array of matching books by the search query", () => {
  const searchResult = [books[0]]; // Book with id 1 and title "1984"
  const searchResultByPrice = [books[1], books[3]]; // Books with same price: 12.1
  expect(searchBooks()).toEqual([]);
  expect(searchBooks(1)).toEqual(searchResult);
  expect(searchBooks("1984")).toEqual(searchResult);
  expect(searchBooks("Harper Lee")).toEqual([books[1]]);
  expect(searchBooks(12)).toEqual(searchResultByPrice);
});

test("returns updated cart object after adding book", () => {
  const selectedBook = books[2]; // Book with id 3
  expect(addToCart()).toBeNull();
  expect(addToCart(3, 2)).toEqual([{ item: selectedBook, quantity: 2 }]);
  expect(addToCart(2, 1)).toEqual([{ item: books[1], quantity: 1 }]);
});

test("total price with tax for all items in the cart matches", () => {
  const cart = [
    { item: books[1], quantity: 2 },
    { item: books[2], quantity: 2 },
  ];

  expect(calculateTotal()).toEqual(0);
  expect(calculateTotal(cart)).toEqual(44 * 1.1);
});

test("payment processed successfully with total cart price", () => {
  expect(processPayment(0, "")).toEqual({
    success: false,
    transactionId: null,
  });
  expect(processPayment(100, "")).toEqual({
    success: true,
    transactionId: "id",
  });
});

test("invetory uppdates according to cart items quantity", () => {
  const cart = [{ item: books[1], quantity: 2 }];
  expect(updateInventory(cart)).toEqual(true);
  expect(updateInventory([])).toEqual(false);
});
