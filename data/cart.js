export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'))||[{
    productsId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deleveryOptionsId: '1'
  },{
    productsId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2,
    deleveryOptionsId: '2'
  }
  ];
}

function saveLocalStoreage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function checkMatching(productsName,userQaunity) {
  let matching;
  cart.forEach((product) => {
    if (productsName === product.productsId) {
      matching = product;
    }
  });
  if (matching) { 
    matching.quantity += userQaunity;
  } else {
    cart.push({
      productsId: productsName,
      quantity: userQaunity,
      deleveryOptionsId: '1'
    });
  }
  saveLocalStoreage();
} 

export function removeProductCart(productid){
  const newcart = [];
  cart.forEach((items)=>{
    if(productid !== items.productsId){
      newcart.push(items);
    }
  });
  cart = newcart;
  saveLocalStoreage();
}
export function updateDeliveryOption(productId,deliveryOptionId){
  let matching;
  cart.forEach((product) => {
    if (productId === product.productsId) {
      matching = product;
    }
  });
  matching.deleveryOptionsId = deliveryOptionId;

  saveLocalStoreage();
}

