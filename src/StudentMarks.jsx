import React, { useRef } from 'react';

function StudentMarks() {

 const teluguRef = useRef(null);
 const hindiRef = useRef (null);
 const englishRef = useRef (null);
  const mathsRef = useRef(null);
  const scienceRef = useRef(null);
  const socialRef = useRef(null);
  
  const totalRef = useRef(null);
  const averageRef = useRef(null);

  const handleTotal = () => {
    const telugu = parseFloat(teluguRef.current.value);
    const hindi = parseFloat (hindiRef.current.value);
    const english = parseFloat (englishRef.current.value);
    const maths = parseFloat(mathsRef.current.value) ;
    const science = parseFloat(scienceRef.current.value) ;
    const social = parseFloat(socialRef.current.value) ;

    const total = telugu + hindi + english + maths + science + social;
    totalRef.current.value = total;
  };

  const handleAverage = () => {
    const telugu = parseFloat (teluguRef.current.value);
    const hindi = parseFloat (hindiRef.current.value);
    const english = parseFloat (englishRef.current.value);
    const maths = parseFloat(mathsRef.current.value) ;
    const science = parseFloat(scienceRef.current.value) ;
    const social = parseFloat(socialRef.current.value) ;

    const average = ( telugu + hindi + english + maths + science + social) / 6;
    averageRef.current.value = average.toFixed(3);
  };

  return (
    <>
 <h2>Marks of a Student</h2>
      <label>Telugu Marks:</label>
      <input type="number" ref={teluguRef} placeholder="Enter Telugu marks" />
      <br />

      
      <label>Hindi Marks:</label>
      <input type="number" ref={hindiRef} placeholder="Enter Hindi marks" />
      <br />

     
      <label>English Marks:</label>
      <input type="number" ref={englishRef} placeholder="Enter English marks" />
      <br />

      
      <label>Maths Marks:</label>
      <input type="number" ref={mathsRef} placeholder="Enter maths marks" />
      <br />

      <label>Science Marks:</label>
      <input type="number" ref={scienceRef} placeholder="Enter science marks" />
      <br />

      <label>Social Marks:</label>
      <input type="number" ref={socialRef} placeholder="Enter social marks" />
      <br />

      <label>Total Marks:</label>
      <input type="number" ref={totalRef} placeholder="Total marks" readOnly />
      <button onClick={handleTotal}>Calculate Total</button>
      <br />

      <label>Average Marks:</label>
      <input type="number" ref={averageRef} placeholder="Average marks" readOnly />
      <button onClick={handleAverage}>Calculate Average</button>
    </>
  );
}

export default StudentMarks;
