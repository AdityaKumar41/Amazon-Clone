import { checkMatching,cart,loadFromStorage } from "../../data/cart.js";
describe('test suite: add to cart',()=>{
  it('add an existing product to the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {productsId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deleveryOptionsId: '1'
      }
      ]);
    });
    loadFromStorage();

    checkMatching('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productsId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
  it('add a new product to the cart',()=>{
    spyOn(localStorage,'setItem');

    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();
    checkMatching('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productsId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});