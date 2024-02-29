import React from "react";
import Card from "./components/Card";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900">
      <div className="mb-4 text-center text-white">
        <p>
          This is just a demo. Running this model for real needs a lot of
          computing power, which is a bit out of my league right now.
        </p>

        <p>
          Here are some example outputs:{" "}
          <a href="https://www.tiktok.com/mljjk4" className="text-blue-400">
            https://www.tiktok.com/@jjkml4
          </a>
        </p>
      </div>
      <Card />
    </div>
  );
}

export default App;
