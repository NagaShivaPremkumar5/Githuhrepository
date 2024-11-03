import React, { useRef } from 'react'

function Apps() { //create references for the input fields.

    const num1Ref = useRef (null);
    const num2Ref = useRef (null);
    const resultRef = useRef (null);
     
    // Function to perform the addition.

    const handleAddition = ()=> {

        // set the values from the input fields.
         const num1 = parseFloat (num1Ref.current.value);
         const num2 = parseFloat (num2Ref.current.value);

         // calculate the sum and display it in the result input.

         const sum = num1 + num2 ;

         // set the data in result field .

         resultRef.current.value = sum ;
    } ;
  return (
    <>
    <h2> Addition of two numbers...</h2>

    <input ref={num1Ref} type='number' placeholder='enter first number'/>

    <input ref={num2Ref} type='number' placeholder='enter second number'/>

    <button onClick={handleAddition}> Add</button>

    <input ref={resultRef} type='text' placeholder='Result' readOnly />
    </>
  );
}

export default Apps;
