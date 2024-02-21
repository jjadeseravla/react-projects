
import ResultsTable from './ResultsTable';

function UserInput({
  onChangeInput, userInput}) {

  // const [initInvest, setInitInvest] = useState(0);

  // function handleInitInvest(e) {
  //   setInitInvest(e.target.value);
  // }

  return (
    <>
      <section id="user-input">
        <div className='input-group'>
          <p>

        <label>
      INITIAL INVESTMENT
        </label>
            <input type="number"
              placeholder="intial investment"
              required
              onChange={(e) => onChangeInput('initialInvestment', e.target.value)}
              value={userInput.initialInvestment}
              >
        </input>
          </p>
          <p>

        <label>
        ANNUAL INVESTMENT
        </label>
            <input type="number"
              placeholder="annual investment"
              required
              onChange={(e) => onChangeInput('annualInvestment', e.target.value)}
              value={userInput.annualInvestment}
              >
        </input>
          </p>
        </div>
        <div className='input-group'>
          <p>

        <label>

        EXPECTED RETURN
        </label>
            <input type="number"
              placeholder="expected return"
              required
              onChange={(e) => onChangeInput('expectedReturn', e.target.value)}
              value={userInput.expectedReturn}>
        </input>
          </p>
          <p>

        <label>

        DURATION
        </label>
            <input type="number"
              placeholder="duration"
              required
              onChange={(e) => onChangeInput('duration', e.target.value)}
              value={userInput.duration}>
        </input>
          </p>
        </div>
      </section>
      <div>
        <ResultsTable/>
      </div>
    </>
  )
}

export default UserInput;