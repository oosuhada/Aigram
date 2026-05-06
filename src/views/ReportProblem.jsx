'use client';

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const ReportProblem = () => {
  const [text, setText] = useState("");
  return (
    <div className="max-w-md mx-auto p-10 flex flex-col items-center text-center">
      <AlertCircle className="w-12 h-12 mb-4 dark:text-white" strokeWidth={1} />
      <h2 className="text-xl font-bold dark:text-white mb-2">Report a problem</h2>
      <p className="text-sm text-gray-500 mb-6">Explain what's happening. Your feedback helps us improve Instagram.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-40 p-4 border dark:border-gray-800 dark:bg-gray-900 rounded-xl outline-none text-sm dark:text-white resize-none"
        placeholder="Briefly explain what happened..."
      />
      <button className="w-full bg-blue-500 text-white py-2 rounded-xl font-bold mt-4 hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
        Send Report
      </button>
    </div>
  );
};
export default ReportProblem;
