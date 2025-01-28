import React, { useState } from "react";
import "./App.css";

function App() {
  const [currSem, setCurrSem] = useState(1);
  const [sgpa, setSgpa] = useState({});
  const [credits, setCredits] = useState({});
  
  const handleSgpaChange = (sem, value) => {
    setSgpa((prev) => ({
      ...prev,
      [sem]: value,
    }));
  };

  const handleCreditsChange = (sem, value) => {
    setCredits((prev) => ({
      ...prev,
      [sem]: value,
    }));
  };
  const handleSubmit = () => {
    const totalCredits = Object.values(credits).reduce(
      (acc, curr) => acc + Number(curr),
      0
    );
  
    const totalPoints = Object.keys(sgpa).reduce(
      (acc, sem) => acc + Number(sgpa[sem]) * Number(credits[sem]),
      0
    );

    const cgpa = totalPoints / totalCredits;
  
    alert("Wait is over... Your CGPA is" + cgpa.toFixed(2) + "🥳"); 
  };
  

  return (
    <div className="App">
      <div className="container">
        <h1>CGPA Calculator</h1>

        <label>Select Your Semester:</label>
        <select
          name="sem"
          value={currSem}
          onChange={(e) => setCurrSem(Number(e.target.value))}
        >
          {[...Array(8).keys()].map((sem) => (
            <option key={sem + 1} value={sem + 1}>
              Semester {sem + 1}
            </option>
          ))}
        </select>

        {Array.from({ length: currSem }, (_, i) => i + 1).map((sem) => (
          <div key={sem} className="card">
            <h2>Semester {sem}</h2>
            <label>SGPA:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={sgpa[sem] || ""}
              onChange={(e) => handleSgpaChange(sem, e.target.value)}
            />
            <label>Total Credits:</label>
            <input
              type="number"
              step="1"
              min="1"
              value={credits[sem] || ""}
              onChange={(e) => handleCreditsChange(sem, e.target.value)}
            />
          </div>
        ))}
        <button onClick={()=>handleSubmit()}>Find My CGPA 😭</button>
        
      </div>
    </div>
  );
}

export default App;
