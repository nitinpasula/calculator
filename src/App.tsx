import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [result, setResult] = useState({
    currentValue: "",
    prevValue: "",
    operation: "",
    displayValue: "",
  });

  const renderButton = (id: string, value: string, f: (a: string) => void) => {
    return (
      <button id={id} onClick={() => f(value)}>
        {value}
      </button>
    );
  };
  const stripZeros = (s: string): string => {
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== "0") {
        return s.substring(i);
      }
    }
    return "0";
  };
  const removeDuplicateDecimal = (s: string): string => {
    let idx = s.indexOf(".");
    if (idx > -1) {
      let beforeDecimal = s.substring(0, idx);
      let afterDecimal = s.substring(idx + 1);
      let afterDecimalRemoval = afterDecimal.split(".").join("");
      return beforeDecimal + "." + afterDecimalRemoval;
    }
    return s;
  };
  const handleNumberClicked = (n: string) => {
    setResult((r) => {
      let newResult = Object.assign({}, r, {
        displayValue: removeDuplicateDecimal(stripZeros(r.displayValue + n)),
        currentValue: removeDuplicateDecimal(stripZeros(r.currentValue + n)),
      });
      console.log("number clicked");
      console.log(newResult);
      return newResult;
    });
  };
  const handleOperationClicked = (o: string) => {
    setResult((r) => {
      let newResult = r;
      if (r.operation) {
        if (r.currentValue && r.prevValue) {
          newResult = Object.assign({}, r, {
            operation: o,
            prevValue: calculate(
              r.currentValue,
              r.prevValue,
              r.operation
            ).toString(),
            currentValue: "",
            displayValue: r.displayValue + o,
          });
          console.log(newResult);
        } else {
          newResult = Object.assign({}, r, {
            operation: o === "-" ? r.operation : o,
            currentValue: o === "-" ? "-" : "",
            displayValue: r.displayValue + o,
          });
          console.log(newResult);
        }
      } else {
        newResult = Object.assign({}, r, {
          operation: o,
          prevValue: r.currentValue,
          currentValue: "",
          displayValue: r.displayValue + o,
        });
        console.log(newResult);
      }
      return newResult;
    });
  };
  const handleClear = () => {
    setResult({
      currentValue: "",
      prevValue: "",
      operation: "",
      displayValue: "0",
    });
    console.log(result);
  };

  const displayResult = () => {
    setResult((r) =>
      Object.assign({}, r, {
        displayValue: calculate(
          r.currentValue,
          r.prevValue,
          r.operation
        ).toString(),
      })
    );
  };
  const calculate = (s1: string, s2: string, o: string): number => {
    if (s1.length === 0) {
      s1 = "0";
    }
    if (s2.length === 0) {
      s2 = "0";
    }
    let ns1: number = parseFloat(s1);
    let ns2: number = parseFloat(s2);
    if (isNaN(ns1)) {
      return ns2;
    }
    switch (o) {
      case "+":
        return ns1 + ns2;
      case "-":
        return ns2 - ns1;
      case "*":
        return ns1 * ns2;
      case "/":
        return ns2 / ns1;
      default:
        return 0;
    }
  };
  return (
    <>
      <div className="calculator">
        <input
          className="result"
          id="display"
          value={result.displayValue}
        ></input>
        {renderButton("clear", "clear", handleClear)}
        {renderButton("zero", "0", handleNumberClicked)}
        {renderButton("one", "1", handleNumberClicked)}
        {renderButton("two", "2", handleNumberClicked)}
        {renderButton("three", "3", handleNumberClicked)}
        {renderButton("four", "4", handleNumberClicked)}
        {renderButton("five", "5", handleNumberClicked)}
        {renderButton("six", "6", handleNumberClicked)}
        {renderButton("seven", "7", handleNumberClicked)}
        {renderButton("eight", "8", handleNumberClicked)}
        {renderButton("nine", "9", handleNumberClicked)}
        {renderButton("decimal", ".", handleNumberClicked)}
        {renderButton("add", "+", handleOperationClicked)}
        {renderButton("multiply", "*", handleOperationClicked)}
        {renderButton("divide", "/", handleOperationClicked)}
        {renderButton("subtract", "-", handleOperationClicked)}
        {renderButton("equals", "=", displayResult)}
      </div>
    </>
  );
};

export default App;
