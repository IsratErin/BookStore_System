import { books } from "./data.js";
const searchBooks = (query) => {
  // Returns array of book objects matching search
  // Books should have: id, title, author, price, stock

  if (!query) return [];
  if (typeof query === "number") {
    query = query.toString();
  }
  const lowerCaseQuery = query.toLowerCase();

  const results = books.filter(
    (book) =>
      book.id == query ||
      book.price == query ||
      book.stock == query ||
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery)
  );

  return results;
};

const addToCart = (bookId, quantity) => {
  // Adds book to shopping cart
  // Returns updated cart object
  if (!bookId || !quantity) {
    return null;
  }
  let cart = [];
  let cartItem = { item: null, quantity: 0 };
  const bookToAdd = books.find((book) => book.id === bookId);
  if (bookToAdd) {
    cartItem.item = bookToAdd;
    cartItem.quantity = quantity;
    cart.push(cartItem);
  }
  console.log(cart);
  return cart;
};

const calculateTotal = (cart) => {
  // Calculates total price of all items in cart
  // Apply 10% tax
  if (!cart) {
    return 0;
  }
  const totalPrice = cart.reduce((total, cartItem) => {
    //console.log(cartItem);
    return total + cartItem.item.price * cartItem.quantity;
  }, 0);
  const totalPriceWithTax = totalPrice * 1.1;
  return totalPriceWithTax;
};

const processPayment = (cartTotal, paymentMethod) => {
  // Processes payment (simulate with random success/failure)
  // Returns { success: boolean, transactionId: string }
  if (!cartTotal || paymentMethod == undefined) {
    return { success: false, transactionId: null };
  }
  const transactionId = "id";
  return { success: true, transactionId: transactionId };
};

const updateInventory = (cart) => {
  // Reduces stock for all books in cart
  // Throws error if any book is out of stock
  if (!cart) {
    return false;
  }
  if (cart.length == 0) {
    return false;
  }

  cart.forEach((cartItem) => {
    const book = books.find((book) => cartItem.item.id == book.id);
    if (book.stock < cartItem.item.quantity) {
      throw new Error("Book is already out of stock");
    }
    book.stock = book.stock - cartItem.item.quantity;
  });
  console.log("Inventory updated");

  return true;
};

// MAIN INTEGRATION FUNCTION

const completePurchase = (searchQuery, bookId, quantity, paymentMethod) => {
  // TODO: Integrate all functions above
  // 1. Search for books
  const booksFounded = searchBooks(searchQuery);
  console.log("Books Founded: ");
  console.log(booksFounded);
  // 2. Add to cart
  const cart = addToCart(bookId, quantity);
  console.log("Current Cart: ");
  console.log(cart);
  // 3. Calculate total
  const totalPayment = calculateTotal(cart);
  console.log("total to pay: " + totalPayment);
  // 4. Process payment
  const paymentResult = processPayment(totalPayment, paymentMethod);
  console.log("Payment status: ");
  console.log(paymentResult);
  // 5. Update inventory
  updateInventory(cart);
  // 6. Return order confirmation
  console.log("Order completed!");
};

completePurchase("Jane Austen", 5, 1, "credit card");

export {
  searchBooks,
  addToCart,
  calculateTotal,
  processPayment,
  updateInventory,
  completePurchase,
};
