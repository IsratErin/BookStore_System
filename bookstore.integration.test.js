import {
  searchBooks,
  addToCart,
  updateInventory,
  calculateTotal,
  completePurchase,
  processPayment,
} from "./bookstore";

describe("Bookstore Integration Tests", () => {
  describe("Successful Purchase Flow", () => {
    test("should complete entire purchase process successfully", () => {
      // TODO: Test happy path
      // Search → Add to cart → Calculate → Payment → Update inventory

      const searchResult = searchBooks("The Great Gatsby");
      console.log("Search Result");
      console.log(searchResult);
      const cart = addToCart(searchResult[0].id, 1);
      console.log(cart);
      const totalPayment = calculateTotal(cart);
      const paymentResult = processPayment(totalPayment, "credit card");
      updateInventory(cart);

      const results = paymentResult.success;
      expect(results).toBe(true);
    });

    test("should handle multiple books in cart", () => {
      // TODO: Test purchasing 2 different books
      const cartwithBook1 = addToCart(1, 1);
      const cartwithBook5 = addToCart(5, 2);
      const cart = [...cartwithBook1, ...cartwithBook5];
      //console.log(cart);
      const totalPayment = calculateTotal(cart);
      const paymentResult = processPayment(totalPayment, "credit card");
      updateInventory(cart);
      const results = paymentResult.success;
      expect(results).toBe(true);
    });
    test("should handle multiple books found from search in cart", () => {
      // TODO: Test purchasing 2 different books
      const books = searchBooks(12);
      const cart = [...addToCart(books[0].id, 2), ...addToCart(books[1].id, 5)];
      //console.log(cart);
      const totalPayment = calculateTotal(cart);
      const paymentResult = processPayment(totalPayment, "credit card");
      updateInventory(cart);
      const results = paymentResult.success;
      expect(results).toBe(true);
    });
  });

  describe("Error Handling", () => {
    test("should fail when book is out of stock", () => {
      // TODO: Test inventory validation
      const results = completePurchase(
        "The Catcher in the Rye",
        4,
        500,
        "credit card"
      );
      expect(results).toBe(false);
    });

    test("should pass when book is not out of stock", () => {
      // TODO: Test inventory validation
      const results = completePurchase("1984", 1, 5, "credit card");
      expect(results).toBe(true);
    });

    test("should handle payment failure gracefully", () => {
      // TODO: Test when payment processing fails
    });

    test("should not update inventory if payment fails", () => {
      // TODO: Important business logic test!
    });
  });
});
