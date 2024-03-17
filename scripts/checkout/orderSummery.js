import {
  cart,
  removeProductCart,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deleveryOptions, deliverOption } from "../../data/deliveryOption.js";
import { renderPaymentSummery } from "./paymentSummery.js";
export function renderOrderCart() {
  let cartproductHTML = "";
  let totalCart = checkoutItems();
  
  cart.forEach((cartItems) => {
    const productId = cartItems.productsId;
    const matchingProduct = getProduct(productId);

    let orgquantity;
    if (cartItems.productsId === matchingProduct.id) {
      orgquantity = cartItems;
    }
    let cartDileveryId = cartItems.deleveryOptionsId;

    let storeFormatedOption = deliverOption(cartDileveryId);
    const today = dayjs();
    const deleveryDate = today.add(storeFormatedOption.deliveryDays, "days");
    const storeFormated = deleveryDate.format("dddd, MMMM, D");

    cartproductHTML += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
            <div class="delivery-date">
              Delivery date: ${storeFormated}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-org-quantity-${
                      matchingProduct.id
                    }">${orgquantity.quantity}</span>
                  </span>
                  <span class="js-data-update-id${matchingProduct.id}">
                    <span class="update-quantity-link link-primary js-update-button js-data-update${
                      matchingProduct.id
                    }" data-update-id = "${matchingProduct.id}">
                      Update
                    </span>
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-prodcut-id="${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deleveryOptionsCh(matchingProduct, cartItems)}
              </div>
            </div>
          </div>`;
  });
  document.querySelector(
    ".js-return-home-link"
  ).innerHTML = `${totalCart} items`;
  
  document.querySelector(".js-order-summary").innerHTML = cartproductHTML;
  // updateCart(totalCart);
  document.querySelectorAll(".js-delete-button").forEach((cartItems) => {
    cartItems.addEventListener("click", () => {
      const productData = cartItems.dataset.prodcutId;
      removeProductCart(productData);
      const containers = document.querySelector(
        `.js-cart-item-container-${productData}`
      );
      containers.remove();
      renderOrderCart();
      renderPaymentSummery();
    });
  });

  document.addEventListener("click", function (event) {
    const updateButton = event.target.closest(".js-update-button");
    if (updateButton) {
      const storeSelected = updateButton.dataset.updateId;
      const updateToSave = document.querySelector(
        `.js-data-update-id${storeSelected}`
      );
      const initialContent = updateToSave.innerHTML;

      updateToSave.innerHTML = `<input type="number" style="width:50px; margin-right:6px;" class="focus-${storeSelected}"><span class="save-update-btn${storeSelected} link-primary">Save</span>`;

      let autogen = document.querySelector(`.focus-${storeSelected}`);
      autogen.focus();
      autogen.value = checkquantity(storeSelected);
      document
        .querySelector(`.save-update-btn${storeSelected}`)
        .addEventListener("click", function saveButtonClickHandler(event) {
          event.preventDefault();

          let getValue = document.querySelector(
            `.focus-${storeSelected}`
          ).value;
          let newUpdateValue = Number(getValue);
          updatePr(storeSelected, newUpdateValue);
          renderOrderCart();
          renderPaymentSummery();
          updateToSave.innerHTML = initialContent;
        });
    }
  });
  function checkquantity(checked) {
    let storeQuantity;
    cart.forEach((allelemnt) => {
      if (checked === allelemnt.productsId) {
        storeQuantity = allelemnt.quantity;
      }
    });
    return storeQuantity;
  }

  function updatePr(updateId, updatedQuantity) {
    let storei;
    cart.forEach((checked) => {
      if (updateId === checked.productsId) {
        checked.quantity = updatedQuantity;
        storei = checked.quantity;
      }
    });
    products.forEach((element) => {
      if (updateId === element.id) {
        document.querySelector(`.js-org-quantity-${updateId}`).innerHTML =
          storei;
        checkoutItems();
        document.querySelector(
          ".js-return-home-link"
        ).innerHTML = `${totalCart} items`;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  //ESM = EcmaScript Module
  function deleveryOptionsCh(matchingId, cartItem) {
    let HTMLD = "";
    deleveryOptions.forEach((productsi) => {
      const today = dayjs();
      const deleveryDate = today.add(productsi.deliveryDays, "days");
      const storeFormated = deleveryDate.format("dddd, MMMM, D");
      const priceString =
        productsi.priceCents === 0
          ? "FREE"
          : `${(productsi.priceCents / 100).toFixed(2)}`;
      const isChecked = productsi.id === cartItem.deleveryOptionsId;
      HTMLD += `
    <div class="delivery-option delivery-option-js" data-product-id = "${
      matchingId.id
    }" data-delivery-id = "${productsi.id}">
    <input type="radio" ${isChecked ? "checked" : ""}
      class="delivery-option-input"
      name="delivery-option-${matchingId.id}">
    <div>
      <div class="delivery-option-date">
        ${storeFormated}
      </div>
      <div class="delivery-option-price">
        $${priceString} Shipping
      </div>
    </div>
  </div>
    `;
    });
    return HTMLD;
  }

  document.querySelectorAll(".delivery-option-js").forEach((optionvalue) => {
    optionvalue.addEventListener("click", () => {
      const { productId, deliveryId } = optionvalue.dataset;
      updateDeliveryOption(productId, deliveryId);
      renderOrderCart();
      renderPaymentSummery();
    });
  });
}
export function checkoutItems() {
  let price = 0;
  cart.forEach((cartItemss) => {
    price += cartItemss.quantity;
  });
  return price;
}
renderOrderCart();
