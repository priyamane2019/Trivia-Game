import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");


  function fetchQuestion() {
    fetch('https://opentdb.com/api.php?amount=1')
    .then(respose => respose.json())
    .then((data) => {
      setQuestion(data.results[0])
      setResult('');
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(answer === "") {
        setResult("Please enter answer!");
        return;
    }
    if(answer === question.correct_answer) {
      setResult('Correct!');
      
      
    } else {
      setResult(`Incorrect! The correct answer`);
    }
    setAnswer('');
    fetchQuestion();
  }

  useEffect(() => {
    fetchQuestion();
    
  }, []);

  if(!question) {
    return <div>Loading...</div>
  }
 


  return (
    <div className='maindiv'>
        <h1>Trivia Game</h1>
            <div className='container'>
              <p>Category : {question.category}</p>
              <p>Difficulty level :  {question.difficulty}</p>
              <p>Type : {question.type}</p>
              <h2>Question</h2>
              <p>Q. {question.question}</p>
              <li>{question.correct_answer}</li>
              {
                question.incorrect_answers.map((option) => {
                  return (
                    <li key={option}>{option}</li>
                  )
                })
              }
              <form onSubmit={handleSubmit}>
                <input 
                className='inp'
                  type="text" 
                  value={answer}
                  placeholder="Enter Your Answer"
                  onChange={(e) => setAnswer(e.target.value)} 
                  
                />
                <button type='submit'>Submit</button>
              </form><br />
                  <p className='para'>{result}</p>
              
              
            </div> 
    </div>
  );
}

export default App;
