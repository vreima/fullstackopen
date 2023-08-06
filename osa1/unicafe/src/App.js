import { useState } from 'react'

const Button = ({ handleClick, name }) => <button onClick={handleClick}>{name}</button>;

const StatisticsLine = ({ name, value }) => <tr><td>{name}</td><td>{value}</td></tr>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return <table><tbody>
    <StatisticsLine name="good" value={good} />
    <StatisticsLine name="neutral" value={neutral} />
    <StatisticsLine name="bad" value={bad} />
    <StatisticsLine name="all" value={all} />
    <StatisticsLine name="average" value={(good - bad) / (all)} />
    <StatisticsLine name="positive" value={`${good / all * 100}%`} />
    </tbody></table>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateGood = () => {
    console.log("Value of good changed from", good, good + 1);
    setGood(good + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={updateGood} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App