import { useState, useEffect } from "react";

function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // useEffect(() => {
  //   console.log('setting timeout')
  //   const timer = setTimeout(() => {
  //     onTimeout()
  //   }, timeout);
  //   return () => {a
  //     clearTimeout(timer);
  //   }
  // }, [timeout, onTimeout])

  useEffect(() => {
    console.log('setting timeout')
    if (onTimeout) {
      const timer = setTimeout(() => {
        // Call the callback function if onTimeout is true
        // HOW DOES THIS WORK AS ONTIMEOUT IS TRUE OR FALSE PROP NOT A FUNCTION??!
        onTimeout();
      }, timeout);
      return () => {
        clearTimeout(timer);
      }
    }
  }, [timeout, onTimeout])
  
  useEffect(() => {
    console.log('setting interval')
    const interval = setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
    }, 100);
    return () => {
      clearInterval(interval);
    }
  }, []);


  return <progress
    id="question-time"
    max={timeout}
    value={remainingTime}
    className={mode} />;
}

export default QuestionTimer;