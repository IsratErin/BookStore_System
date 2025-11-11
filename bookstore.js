import { books } from "./data";
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
  const totalPriceWithTax = totalPrice * 0.1;
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
};

// MAIN INTEGRATION FUNCTION

const completePurchase = (searchQuery, bookId, quantity, paymentMethod) => {
  // TODO: Integrate all functions above
  // 1. Search for books
  // 2. Add to cart
  // 3. Calculate total
  // 4. Process payment
  // 5. Update inventory
  // 6. Return order confirmation
};

export {
  searchBooks,
  addToCart,
  calculateTotal,
  processPayment,
  updateInventory,
  completePurchase,
};
