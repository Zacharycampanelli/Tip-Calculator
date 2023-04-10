let bill_amount;
let bill_tip;
let bill_number_of_people;

const btns = document.querySelectorAll('.btn');

const billAmountEl = document.querySelector('#amount');
const numOfPeopleEl = document.querySelector('#number');
const tipAmountEl = document.querySelector('#tip_amount');
const tipGroup = document.querySelector('.card_tip_btn_group');
const totalAmountEl = document.querySelector('#total_amount');
const customEl = document.querySelector('#custom');
const resetEl = document.querySelector('#reset_btn');
const billErrorEl = document.querySelector('#bill_error');

const checkIfZero = (num, el) => {
  if (num === 0) {
    el.classList.add('error');
    addErrorMsg(el);
    return true;
  } else {
    el.classList.remove('error');
    return false;
  }
};

const evaluateTipTotal = () => {
  if (bill_amount === undefined && bill_tip === undefined && bill_number_of_people === undefined) {
    resetEl.disabled = true;
    resetEl.classList.add('disabled');
    console.log('disabled');
  } else {
    resetEl.classList.remove('disabled');
    resetEl.disabled = false;
    console.log('enabled');
  }

  if (bill_amount > 0 && bill_tip > 0 && bill_number_of_people > 0) {
    let totalTipAmt = (bill_amount * bill_tip) / bill_number_of_people;
    console.log(totalTipAmt);
    tipAmountEl.textContent = totalTipAmt.toFixed(2);
    console.log(totalTipAmt);
  }

  evaluateTotalPerPerson();
};

const evaluateTotalPerPerson = () => {
  if (bill_amount > 0 && bill_tip > 0 && bill_number_of_people > 0) {
    let totalPerPerson = (bill_amount * (1 + bill_tip)) / bill_number_of_people;
    totalAmountEl.textContent = totalPerPerson.toFixed(2);
    console.log(totalPerPerson);
  }
};

const getBillAmount = (e) => {
  bill_amount = billAmountEl.value;
  bill_amount = parseFloat(bill_amount);
  let check = checkIfZero(bill_amount, billAmountEl);
  if (!check) {
    evaluateTipTotal();
  }
};

const getNumberOfPeople = (e) => {
  bill_number_of_people = numOfPeopleEl.value;
  bill_number_of_people = parseFloat(bill_number_of_people);
  let check = checkIfZero(bill_number_of_people, numOfPeopleEl);
  if (!check) {
    evaluateTipTotal();
  }
};

const selectTipBox = (item) => {
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      let current = document.getElementById('active');
      if (current === null) {
        this.id = 'active';
      } else {
        current.removeAttribute('id');
        this.id = 'active';
      }
    });
  }
};

const getTipAmount = (e) => {
  const selected = e.target;
  if (!selected.hasAttribute('custom')) {
    bill_tip = selected.value;
    bill_tip = parseFloat(bill_tip);
    selectTipBox(selected);
  }
  evaluateTipTotal();

};

const getCustomTip = (e) => {
  bill_tip = e.target.value / 100;
  console.log(bill_tip);
  if (bill_tip) evaluateTipTotal();
};

const resetValues = (e) => {
  billAmountEl.value = '';
  numOfPeopleEl.value = '';
  customEl.value = '';
  bill_amount = undefined;
  bill_tip = undefined;
  bill_number_of_people = undefined;

  let current = document.getElementById('active');
  current.removeAttribute('id')
};

billAmountEl.addEventListener('change', getBillAmount);
numOfPeopleEl.addEventListener('change', getNumberOfPeople);
tipGroup.addEventListener('click', getTipAmount);
customEl.addEventListener('input', getCustomTip);
resetEl.addEventListener('click', resetValues);
