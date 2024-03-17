import { renderOrderCart } from "../../../scripts/checkout/orderSummery.js";
import { renderPaymentSummery } from "../../../scripts/checkout/paymentSummery.js";
import { loadFromStorage } from "../../../data/cart.js";
describe('test suite: renderOrderSummary',()=>{
  it('displays the cart',()=>{
    document.querySelector(".inside-the-js-summary").innerHTML = `
    <div class="js-order-summary"></div>
    <div class=""
    `;
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productsId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deleveryOptionsId: '1'
      },{
        productsId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deleveryOptionsId: '2'
      }
      ]);
    });
    loadFromStorage();
    renderOrderCart();
    renderPaymentSummery();
  });
});