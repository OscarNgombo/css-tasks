document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const operationDisplay = document.getElementById("operation-display");
  const keypad = document.querySelector(".calculator__keypad");

  const operatorSymbols = {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷",
  };

  let state = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    waitingForOperand: false,
  };

  function updateDisplay() {
    let value = state.currentValue;
    if (value.includes(".")) {
      const parts = value.split(".");
      parts[0] = parseFloat(parts[0]).toLocaleString("en-US");
      display.textContent = parts.join(".");
    } else {
      const num = parseFloat(value);
      display.textContent = isNaN(num) ? "Error" : num.toLocaleString("en-US");
    }

    if (state.operator && state.previousValue !== null) {
      const prevFormatted = parseFloat(state.previousValue).toLocaleString(
        "en-US"
      );
      const symbol = operatorSymbols[state.operator];
      operationDisplay.textContent = `${prevFormatted} ${symbol}`;
    } else {
      operationDisplay.textContent = "";
    }
  }

  function inputDigit(digit) {
    if (state.waitingForOperand) {
      state.currentValue = digit;
      state.waitingForOperand = false;
    } else {
      state.currentValue =
        state.currentValue === "0" ? digit : state.currentValue + digit;
    }
  }

  function inputDecimal() {
    if (state.waitingForOperand) {
      state.currentValue = "0.";
      state.waitingForOperand = false;
      return;
    }
    if (!state.currentValue.includes(".")) {
      state.currentValue += ".";
    }
  }

  function handleOperator(nextOperator) {
    const value = parseFloat(state.currentValue);

    if (state.operator && state.waitingForOperand) {
      state.operator = nextOperator;
      return;
    }

    if (state.previousValue == null) {
      state.previousValue = value;
    } else if (state.operator) {
      const result = calculate();
      state.currentValue = String(result);
      state.previousValue = result;
    }

    state.waitingForOperand = true;
    state.operator = nextOperator;
  }

  function calculate() {
    const prev = state.previousValue;
    const current = parseFloat(state.currentValue);

    if (prev == null || !state.operator) return current;

    switch (state.operator) {
      case "add":
        return prev + current;
      case "subtract":
        return prev - current;
      case "multiply":
        return prev * current;
      case "divide":
        return current === 0 ? "Error" : prev / current;
      default:
        return current;
    }
  }

  function resetCalculator() {
    state.currentValue = "0";
    state.operator = null;
    state.previousValue = null;
    state.waitingForOperand = false;
  }

  function deleteLast() {
    if (state.currentValue === "Error" || state.waitingForOperand) return;
    if (state.currentValue.length > 1) {
      state.currentValue = state.currentValue.slice(0, -1);
    } else {
      state.currentValue = "0";
    }
  }

  keypad.addEventListener("click", (event) => {
    const { target } = event;
    if (!target.matches("button")) return;

    const { key, action } = target.dataset;

    if (state.currentValue === "Error" && action !== "reset") return;

    if (key) {
      inputDigit(key);
    } else if (action === "decimal") {
      inputDecimal();
    } else if (["add", "subtract", "multiply", "divide"].includes(action)) {
      if (state.operator && !state.waitingForOperand) {
        const result = calculate();
        state.currentValue = String(result);
        state.previousValue = result;
      }
      handleOperator(action);
    } else if (action === "calculate") {
      const result = calculate();
      state.currentValue = String(result);
      state.operator = null;
      state.previousValue = null;
      state.waitingForOperand = true;
    } else if (action === "delete") {
      deleteLast();
    } else if (action === "reset") {
      resetCalculator();
    }

    updateDisplay();
  });

  // Theme Switcher Logic
  const themeToggle = document.getElementById("theme-toggle");
  function setTheme(theme) {
    document.body.dataset.theme = theme;
    themeToggle.value = theme;
    localStorage.setItem("calculatorTheme", theme);
  }
  themeToggle.addEventListener("input", (e) => {
    setTheme(e.target.value);
  });
  const savedTheme = localStorage.getItem("calculatorTheme") || "1";
  setTheme(savedTheme);

  updateDisplay();
});
