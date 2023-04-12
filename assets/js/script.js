const billAmountEl = document.querySelector('#amount');
const numOfPeopleEl = document.querySelector('#number');
const tipGroupEl = document.querySelector('.card_tip_btn_group');
const btns = document.querySelectorAll('.btn');
const customEl = document.querySelector('#custom');
const tipAmountEl = document.querySelector('#tip_amount');
const totalAmountEl = document.querySelector('#total_amount');
const resetEl = document.querySelector('#reset_btn');
const billErrorEl = document.querySelector('#bill_error');
const peopleErrorEl = document.querySelector('#people_error');

let bill_amount;
let bill_tip;
let bill_number_of_people;

const addErrorMsg = (err) => {
  if (err.id === 'amount') {
    billErrorEl.classList.remove('hidden');
  }
  if (err.id === 'number') {
    peopleErrorEl.classList.remove('hidden');
  }
};

const disableButton = () => {
  if (bill_amount || bill_number_of_people || bill_tip) {
    resetEl.classList.remove('disabled');
    resetEl.disabled = false;
  } else {
    resetEl.disabled = true;
    resetEl.classList.add('disabled');
  }
};

const checkIfZero = (num, el, errMsgEl) => {
  if (num === 0) {
    el.classList.add('error');
    errMsgEl.classList.remove('hidden');
    return true;
  } else {
    el.classList.remove('error');
    errMsgEl.classList.add('hidden');
    return false;
  }
};

const evaluateTipTotal = () => {
  if (bill_amount > 0 && bill_tip > 0 && bill_number_of_people > 0) {
    let totalTipAmt = (bill_amount * bill_tip) / bill_number_of_people;
    tipAmountEl.textContent = '$' + totalTipAmt.toFixed(2);
  }
  evaluateTotalPerPerson();
};

const evaluateTotalPerPerson = () => {
  if (bill_amount > 0 && bill_tip > 0 && bill_number_of_people > 0) {
    let totalPerPerson = (bill_amount * (1 + bill_tip)) / bill_number_of_people;
    totalAmountEl.textContent = totalPerPerson.toFixed(2);
  }
};

const getBillAmount = (e) => {
  bill_amount = billAmountEl.value;
  bill_amount = parseFloat(bill_amount);
  disableButton();
  let check = checkIfZero(bill_amount, billAmountEl, billErrorEl);
  if (!check && bill_amount) {
    evaluateTipTotal();
  }
};

const getNumberOfPeople = (e) => {
  bill_number_of_people = numOfPeopleEl.value;
  bill_number_of_people = parseFloat(bill_number_of_people);
  disableButton();
  let check = checkIfZero(bill_number_of_people, numOfPeopleEl, peopleErrorEl);
  if (!check) {
    evaluateTipTotal();
  }
};

const getTipAmount = (e) => {
  const selected = e.target;
  if (!selected.hasAttribute('custom')) {
    bill_tip = selected.value;
    bill_tip = parseFloat(bill_tip);
    disableButton();
    selectTipBox(selected);
  }
  evaluateTipTotal();
};

const getCustomTip = (e) => {
  bill_tip = e.target.value / 100;
  disableButton();
  if (bill_tip) evaluateTipTotal();
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

const resetValues = (e) => {
  billAmountEl.value = '';
  numOfPeopleEl.value = '';
  customEl.value = '';
  bill_amount = null;
  bill_tip = null;
  bill_number_of_people = null;
  resetEl.disabled = true;
  totalAmountEl.textContent = '$0.00';
  tipAmountEl.textContent = '$0.00';

  let current = document.getElementById('active');
  if (current) {
    current.removeAttribute('id');
  }
};

billAmountEl.addEventListener('input', getBillAmount);
numOfPeopleEl.addEventListener('input', getNumberOfPeople);
tipGroupEl.addEventListener('click', getTipAmount);
customEl.addEventListener('input', getCustomTip);
resetEl.addEventListener('click', resetValues);
