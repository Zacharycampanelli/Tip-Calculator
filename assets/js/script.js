let bill_amount;
let bill_tip;
let bill_number_of_people;

const billAmount = document.querySelector('#amount')
const tipGroup = document.querySelector('.card_tip_btn_group');
const btns = document.querySelectorAll('.btn');

const numOfPeopleEl = document.querySelector('#number');

const tipAmountEl = document.querySelector('#tip_amount')
const totalAmountEl = document.querySelector('#total_amount')


const evaluateTipTotal = () => {
  if(bill_amount && bill_tip && bill_number_of_people) {
  let totalTipAmt = (bill_amount * bill_tip) / bill_number_of_people;
  console.log(totalTipAmt);
  let totalPerPerson = (bill_amount  * (1 + bill_tip) ) / bill_number_of_people;
  tipAmountEl.textContent = totalTipAmt
  console.log(totalTipAmt);
  totalAmountEl.textContent = totalPerPerson;
  console.log(totalPerPerson);
  }


}


billAmount.addEventListener("change", ()=> {
  bill_amount = billAmount.value;
  bill_amount = parseFloat(bill_amount)
  console.log(bill_amount);
  evaluateTipTotal();
})
numOfPeopleEl.addEventListener("change", ()=> {
  bill_number_of_people = numOfPeopleEl.value;
  bill_number_of_people = parseFloat(bill_number_of_people)
  console.log(bill_number_of_people);
  evaluateTipTotal();

})
// tipGroup.addEventListener('click', ((e) => {
//   // btns.filter(())
  
//   const selected = e.target;
//   if(selected.hasAttribute('custom')) {
//     bill_tip = selected.value / 100;
//     console.log(bill_tip);
//   } else {
//     bill_tip = selected.value;
//     bill_tip = parseFloat(bill_tip)
//     // bill_tip = bill_tip.spl
//     console.log(bill_tip);
//   }
  
//   // selected.setAttribute('selected', true);
  
//   console.log(bill_tip);
// }))
tipGroup.addEventListener('click', ((e) => {
  // btns.filter(())
  
  const selected = e.target;
  if(selected.hasAttribute('custom')) {
    bill_tip = selected.value / 100;
    console.log(bill_tip);
  } else {
    bill_tip = selected.value;
    bill_tip = parseFloat(bill_tip)
    // bill_tip = bill_tip.spl
    console.log(bill_tip);
    
  }
  evaluateTipTotal();
  
  // selected.setAttribute('selected', true);
  
  console.log(bill_tip);
}))
