import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { deliverOption } from "../../data/deliveryOption.js";
import { checkoutItems } from "./orderSummery.js";
export function renderPaymentSummery() {
  let fineRs = 0;
  let fineSh = 0;
  let TotalBeforeTax;
  let TaxCents;
  let totalCart = checkoutItems();
  cart.forEach((cartItems) => {
    const product = getProduct(cartItems.productsId);
    fineRs += product.priceCents * cartItems.quantity;
    const newDeliver = deliverOption(cartItems.deleveryOptionsId);
    fineSh += newDeliver.priceCents;
  });
  TotalBeforeTax = ((fineRs + fineSh) / 100).toFixed(2);
  TaxCents = (TotalBeforeTax * 0.1).toFixed(2);
  const totalRs = ((fineRs / 100).toFixed(2));
  const totalSh = ((fineSh / 100).toFixed(2));
  let numericTotalBeforeTax = parseFloat(TotalBeforeTax);
  let numericTaxCents = parseFloat(TaxCents);
  const TotalFinal = ((numericTotalBeforeTax+numericTaxCents).toFixed(2));
  const ViewHTML = `<div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${totalCart}):</div>
        <div class="payment-summary-money">$${totalRs}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${totalSh}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${TotalBeforeTax}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${TaxCents}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${TotalFinal}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>`;
      
document.querySelector('.js-payment-summary').innerHTML = ViewHTML;
}