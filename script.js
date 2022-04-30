// This is the main class for the calculator app

// it consists of several methods. Clear() delete() appendNumber() chooseOperation() compute() getDisplayNumber updateNumber()
class Calculator {
  // A constructor method is a method of a class for creating an object for that class

  // previousOperandTextElement and currentOperandTextElement are given a this. to refer to the object it gives you the current digit output and the previous digit output
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // adding number but as a string so it can take multiple numbers at a time so it comes out as 11 instead of 2 for the output box

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;

    //  current operator number is assigned to be a string in order to not be added as a number so when you add 1 to your input box twice it gives you 11 instead of 2
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // Which operation sign you can choose

  chooseOperation(operation) {
    // when the operator input box is empty then you can select an operation but if it is not empty then it will compute() and give you the result
    if (this.currentOperand === "") {
    } //return;

    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // gives you the functionality of the integers
  compute() {
    let computation;

    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    // if either the current or previous methods are NaN(not a number) it will return a switch method for the operators
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;

      case "-":
        computation = prev - current;

        break;

      case "^":
        computation = prev ** current;
        break;

      case "*":
        if (prev == 0 && current == 0) {
          calculator.updateDisplay("Cannot divide by zero.");
          break;
        }
        computation = prev * current;
        break;

        break;

      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // displays your numbers by presenting them as a str with .toString()
  getDisplayNumber(number) {
    // used for the comma system in the calculator

    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);

    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  //  Updates the display of your output box by changing the inner text and giving it the .getDisplayNumber() method
  updateDisplay(text = null) {
    if (text) {
      this.currentOperandTextElement.innerText = "";
      this.previousOperandTextElement.innerText = text;
      return;
    }

    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    // if this.operation =

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else if ((this.previousOperandTextElement.innerText = "")) {
    }
  }
}

// if ( prev == 0 && current == 0 ) {

//   this.previousOperandTextElement.innerText = "cannot divide by zero"
//   this.currentOperandTextElement.innerText = ""
// }

//DOM for selecting all the elements and changing the innerHTML

// this DOM querySelectorAll selects the data-number elements in index.html with buttons for the digits

const numberButtons = document.querySelectorAll("[data-number]");

// this DOM querySelectorAll selects the data-operation numbers for the buttons that target operator numbers
const operationButtons = document.querySelectorAll("[data-operation]");

const equalsButton = document.querySelector("[data-equals]");

const deleteButton = document.querySelector("[data-delete]");

const allClearButton = document.querySelector("[data-all-clear]");

// DOM selects the previous entered values
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);

// DOM selects the current entered value
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// selects everything from js and html to be connected to each another

// numbers for the calculator

// In this section for the inner html text to be changed inside the buttons a common theme is a method followed by .updateDisplay() to then change it

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// operator signs like * / - + = are given functionality with the .chooseOperation() method

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// functionality for equal button to give you output it takes the .compute() method with a computation variable to give out a result
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

// Functionality for the All clear button it removes all your input at once on click of the button it first .clear() then .updateDisplay() to update the output result
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

// It gives functionality for deleting a single digit at a time like a backspace button by deleting one string at a time with the .slice() in the .delete() method where it goes from 0, -1

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
