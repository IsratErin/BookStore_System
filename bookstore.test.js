import { searchBooks } from "./bookstore.js";
import { books } from "./data.js";

test("returns array of matching books by the search query", () => {
  const searchResult = [books[0]]; // Book with id 1 and title "1984"
  const searchResultByPrice = [books[1], books[3]]; // Books with same price: 12.1
  expect(searchBooks()).toEqual([]);
  expect(searchBooks(1)).toEqual(searchResult);
  expect(searchBooks("1984")).toEqual(searchResult);
  expect(searchBooks("Harper Lee")).toEqual([books[1]]);
  expect(searchBooks(12.1)).toEqual(searchResultByPrice);
});
