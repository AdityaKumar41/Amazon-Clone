// import { cart } from "./cart";
export const deleveryOptions = [
  {
      id: '1',
      deliveryDays: 7,
      priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function deliverOption(deliveryOption){
  let storeFormatedOption;
  deleveryOptions.forEach((option)=>{
    if(option.id === deliveryOption){
      storeFormatedOption = option;
    }
  });
  return storeFormatedOption;
}