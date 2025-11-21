import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProgramAnalytics from "./components/ProgramAnalytics";


function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Replace YOUR_API_GATEWAY_URL with the actual API Gateway URL
    fetch("YOUR_API_GATEWAY_URL")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <Router>
      <div>
       

        <Routes>
          {/* Your original home page */}
          <Route path="/" element={
            <div>
              <h1>Welcome to [ChallengeName].bh</h1>
              <p>Message from the Backend system: {message}</p>
               {/* Simple link to your component */}
              <p><a href="/team-a/analytics">Go to Program Analytics</a></p>
            </div>
          } />

          {/* Program Analytics page */}
          <Route path="/team-a/analytics" element={<ProgramAnalytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;