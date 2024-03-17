function caluclateCurrency(value){
  let storeValu = (Math.round(value)/100).toFixed(2);
  return storeValu;
}
// function formatCurency(value){
  
//   if(storeValu==='20.98'){
//     console.log('pass');
//   }else{
//     console.log('failed');
//   }
//   if(storeValu === '0.00'){
//     console.log('pass')
//   }else{
//     console.log('faild');
//   }
//   if(storeValu === '20.01'){
//     console.log('passed');
//   }
//   else{
//     console.log('failed');
//   }
// }
// formatCurency(2000.5);

describe('check currency work',()=>{
  it('work with zero',()=>{
    expect(caluclateCurrency(0)).toEqual('0.00');
  });

  it('work with nearest cents',()=>{
    expect(caluclateCurrency(2001)).toEqual('20.01');
  });
  describe('check round figer',()=>{
    it('work with round',()=>{
      expect(caluclateCurrency(201)).toEqual('2.01')
    })
  });
  it('work with float',()=>{
    expect(caluclateCurrency(203)).toEqual('2.03');
  });
});