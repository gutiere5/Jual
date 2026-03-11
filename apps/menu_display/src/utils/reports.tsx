import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// type ReportData = {
//   description: string;
//   timestamp: string;
//   app: string;
//   errorMessage?: string;
// };

const Reports = () => {
  const navigate = useNavigate();
  // const [reportData, setReportData] = useState<ReportData | null>(null);

  function handleSubmit() {
    void navigate('/');
  }

  return (
    <>
      <h3>Description</h3>
      <input type="text" name="description" />

      <button>Report Error/Feedback</button>
      <button onClick={handleSubmit}>Skip</button>
    </>
  );
};

export default Reports;
