import { cart, checkMatching } from "../data/cart.js";
import { products } from "../data/products.js";
let GenHtml = "";
products.forEach((products) => {
  GenHtml += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${products.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${products.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${products.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${products.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(products.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-get-select-${products.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-card${products.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-products-id="${
        products.id
      }">
        Add to Cart
      </button>
      </div>`;
});
document.querySelector(".js-products-grid").innerHTML = GenHtml;
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productsName = button.dataset.productsId;
    const userGet = document.querySelector(
      `.js-get-select-${productsName}`
    ).value;
    document.querySelector(`.js-added-card${productsName}`).style.opacity = "1";
    const userQaunity = Number(userGet);
    checkMatching(productsName,userQaunity);

    // cart updateting
    let cartQuantity = 0;
    cart.forEach((items) => {
      cartQuantity += items.quantity;
    });
    document.querySelector(".js-card-quantity").innerHTML = `${cartQuantity}`;

    setTimeout(() => {
      document.querySelector(`.js-added-card${productsName}`).style.opacity =
        "0";
    }, 1500);
  });
});
let orgquantity = 0;
cart.forEach((orgQuantity)=>{
  orgquantity +=  orgQuantity.quantity;
  console.log(orgquantity)
  document.querySelector(".js-card-quantity").innerHTML = orgquantity;
})