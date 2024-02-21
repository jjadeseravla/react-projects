import { calculateInvestmentResults, formatter } from "./util/investment";

function ResultsTable({ input }) {
    

  // const userInput = {  initialInvestment,
  //   annualInvestment,
  //   expectedReturn,
  //   duration,}

  if (!input) {
    return <p className="center">Input data is undefined</p>; // Return an empty array or handle the case appropriately
  };

  console.log('the input in results', input)
  const resultsData = calculateInvestmentResults(input)
  console.log('resultsData', resultsData);

  if (resultsData.length === 0) {
    return <p className="center">results data is 0</p>
  };
  
  
  return (
    <div id="results">
      {/* {userInput.map(item => <ul>{item}</ul>)} */}

       {/* {Object.keys(resultsData).forEach(function (key, index) {
        return resultsData[key]
      })
      }  */}
      

      <table id="result">
        <tbody>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest per Year</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
          {resultsData.map(yearData => {
               const initialInvestment =
               resultsData[0].valueEndOfYear
               - resultsData[0].interest
               - resultsData[0].annualInvestment;
             
             const totalInterest =
               yearData.valueEndOfYear
               - yearData.annualInvestment
               * yearData.year
               - initialInvestment;
             
             const totalAmountInvested =
               yearData.valueEndOfYear
               - totalInterest;
            
              return (
                <tr key={yearData.year}>
                  <td>{yearData.year}</td>
                  <td>{formatter.format(yearData.valueEndOfYear)}</td>
                  <td>{formatter.format(yearData.interest)}</td>
                  <td>{formatter.format({ totalInterest })}</td>
                  <td>{ formatter.format({totalAmountInvested})}</td>
                </tr>
              )})}
        </tbody>
      </table>
    </div>
  )
}
// <th> for columns or table head
// <tr> for rows, table rows
// <td> for table data

export default ResultsTable;