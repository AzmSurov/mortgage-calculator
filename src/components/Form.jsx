import React, { useState } from 'react'
import FormInputGroup from './FormInputGroup'
import { FaDollarSign } from "react-icons/fa";

function Form (){

    const[homeValue, setHomeValue] = useState("");
    const[downPayment, setDownPayment] = useState("");
    const [loanedAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanDuration, setLoanDuration] = useState("");
    const [monthlyPayments, setMonthlyPayments] = useState(0);
    function calculateLoanAmount (){

        setLoanAmount(homeValue - downPayment);
        return loanedAmount
    }

    function calculateMonthlyPayments () {
        function percentageToDecimal (percent) {
            return percent / 12 / 100
        }

        function yearsToMonths(year) {
            return year * 12
        }

        setMonthlyPayments(percentageToDecimal(interestRate * loanedAmount) / 
        ( 1 - Math.pow( 1 + percentageToDecimal(interestRate), -yearsToMonths(loanDuration))));


        console.log(monthlyPayments);
        
        return monthlyPayments;
    }


  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <FormInputGroup text={"Home Value"} icon={<FaDollarSign />} placeholder="Enter the value of the home!" onKeyUp={calculateLoanAmount} value={homeValue} onInput={(e) => (setHomeValue(e.target.value))}/>
        <FormInputGroup text={"Down Payment"} icon={<FaDollarSign />} placeholder="Enter your down payment!"onKeyUp={calculateLoanAmount}value={downPayment}onInput={(e) => (setDownPayment(e.target.value))}/>
        <FormInputGroup text={"Loan Amount"} icon={<FaDollarSign />} placeholder="Funds needed" readOnly={true} value={loanedAmount}/>
        <FormInputGroup text={"Interest Rate %"} placeholder="Enter the Interest Rate" value={interestRate} onInput={(e) => (setInterestRate(e.target.value))}/>
        <FormInputGroup text={"Loan Duration (years)"} placeholder="Loan Duration" value={loanDuration} onInput={(e) => (setLoanDuration(e.target.value))}/>
        <h4 className="alert alert-info fw-bold">
            Monthly Payments: <FaDollarSign />
            {parseFloat(monthlyPayments.toFixed(2))}
            <br />
            Bi Weekly Payments: <FaDollarSign />
            {parseFloat((monthlyPayments.toFixed(2))/2)}
        </h4>
        <button type='submit' className='btn btn-primary btn-lg w-100 center' onClick={calculateMonthlyPayments}>Calculate</button>
    </form>
  )
}

export default Form