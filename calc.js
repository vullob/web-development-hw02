// three modes:
//  1) before operator has been entered
//  2) after operator has been entered
//  3) after an operator and second val has been entered
window.calc = (function() {
  "use strict";
  const mode1 = 0, mode2 = 1, mode3 = 2, add = "+", subtract = "-", multiply = "x", divide = "/";
  let displayVal = "", val1 = 0, val2 = 0, operation,  mode = mode1;
  // switch between modes on either an operation or =
  //
  // event handler - needs to access the existing input
  const handleNumber = (input) => {
    switch(mode) {
      case mode1:
        displayVal += input;
        val1 = parseFloat(displayVal);
        break;
      case mode2:
        val2 = parseFloat(input);
        displayVal = input;
        mode = mode3;
        break;
      case mode3:
        displayVal += input
        val2 = parseFloat(displayVal);
        break;
      default:
        return;
    }
    debugger;
    updateDisplayVal();
  }

  const updateDisplayVal = () => {
    const elem = document.getElementById('displayVal');
    elem.innerText = displayVal;
  }

  // perform operation and set to val1
  // clear val2
  // set displayval to string of calculated value
  // set to mode3
  //
  const calculate = () => {
    if(mode === mode1) return;
    switch(operation){
      case add:
        val1 = val1 + val2;
        break;
      case subtract:
        val1 = val1 - val2;
        break;
      case multiply:
        val1 = val1 * val2;
        break;
      case divide: 
        val1 = val1/val2;
        break;
    }
    debugger;
    val2 = 0;
    displayVal = val1.toString();
  }

  // dependes on mode:
  // *****TODO****** perhaps add mode for when an operation has been input but a val2 has not (would update operations)
  //
  //
  // if in first mode, just set operation , reset display val, and switch to second mode
  //
  // if in second mode:
  //  a second value has not been input:
  //     - set operation to oper
  // if in third mode:
  //  a second value has been input:
  //     - calculate value and store in val1
  //     - set output to val1 & flash displayval
  //     - set new operation to oper
  //     - update mode to mode2
  const handleOperation = (oper) => {
    switch(mode){
      case mode1:
        operation = oper;
        mode = mode2;
        break;
      case mode2:
        operation = oper;
        break;
      case mode3:
        calculate();
        operation = oper;
        mode = mode2;
        break;
      default:
        return;
    }
    debugger;
    updateDisplayVal();
  }

  // clear the mode and input vals
  const clearButton = () => {
    displayVal = "";
    val1 = 0;
    val2 = 0;
    mode = mode1;
    updateDisplayVal();
  }



  const init = () => {
    const numbers = document.getElementsByClassName('number');
    for (let i = 0; i < numbers.length; i++){
      let number = numbers[i];
      number.addEventListener('click', (e) => {handleNumber(e.target.value)});
    }
    const operations = document.getElementsByClassName('oper');
    for(let i = 0; i < operations.length; i++){
      let oper = operations[i];
      oper.addEventListener('click', (e) => {handleOperation(e.target.value)});
    }
    const clear = document.getElementById('clear');
    clear.addEventListener('click', clearButton);
  }

  // wait until dom loads to bind event listeners
  window.addEventListener('load', init, false);

  return {
    handleNumber: handleNumber,
    handleOperation: handleOperation,
    calculate: calculate
  }

})()
