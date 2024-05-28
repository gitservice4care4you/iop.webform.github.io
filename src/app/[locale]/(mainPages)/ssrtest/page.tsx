"use client";
import React, { useState, useEffect } from "react";

function MyComponent({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData); // Set initial data from server
  const [stepperStep, setStepperStep] = useState(0); // CSR state for stepper

  useEffect(() => {
    // This useEffect hook will execute on the client side after the initial render
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      ); // Fetch data on client side
      const newData = await response.json();
      setData(newData);
    }
    fetchData();
  }, []); // Empty dependency array ensures it runs only once after initial render

  return (
    <div>
      <h1>Stepper Step: {stepperStep}</h1>
      <button onClick={() => setStepperStep((prevStep) => prevStep + 1)}>
        Next Step
      </button>
      <hr />
      <h2>Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

// Fetch data on the server side and pass it as props to the component
MyComponent.getInitialProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const initialData = await res.json();
  return { initialData };
};

export default MyComponent;
