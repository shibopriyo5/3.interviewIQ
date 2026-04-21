import React from 'react'
import {useNavigate} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import {motion} from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
function Step3Report({report}) {
    
    if (!report) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading Report...</p>
    </div>
         );
      }
      const navigate=useNavigate()

      const {
  finalScore = 0,
  confidence = 0,
  communication = 0,
  correctness = 0,
  questionWiseScore = [],
} = report;

const questionScoreData = questionWiseScore.map((score, index) => ({
  name: `Q${index + 1}`,
  score: score.score || 0
}));

const skills = [
  { label: "Confidence", value: confidence },
  { label: "Communication", value: communication },
  { label: "Correctness", value: correctness },
];

let performanceText = "";
let shortTagline = "";

if (finalScore >= 8) {
  performanceText = "Ready for job opportunities.";
  shortTagline = "Excellent clarity and structured responses.";
} else if (finalScore >= 5) {
  performanceText = "Needs minor improvement before interviews.";
  shortTagline = "Good foundation, refine articulation.";
} else {
  performanceText = "Significant improvement required.";
  shortTagline = "Work on clarity and confidence.";
}

const score = finalScore;
const percentage = (score / 10) * 100;


  const downloadPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  let currentY = 20;

  // ===== HEADER =====
  doc.setFillColor(16, 185, 129); // emerald
  doc.rect(0, 0, pageWidth, 25, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("AI Interview Report", margin, 16);

  currentY = 35;

  // ===== FINAL SCORE CARD =====
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(margin, currentY, contentWidth, 25, 5, 5, "F");

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Final Score", margin + 10, currentY + 10);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(16, 185, 129);
  doc.text(`${finalScore}/10`, margin + 10, currentY + 20);

  currentY += 35;

  // ===== SKILLS SECTION =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Performance Breakdown", margin, currentY);

  currentY += 8;

  const skillData = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  skillData.forEach((skill) => {
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 10, 3, 3, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(skill.label, margin + 5, currentY + 7);

    doc.setFont("helvetica", "bold");
    doc.text(`${skill.value}/10`, pageWidth - margin - 20, currentY + 7);

    currentY += 14;
  });

  currentY += 5;

  // ===== PROFESSIONAL ADVICE =====
  let advice = "";

  if (finalScore >= 8) {
    advice =
      "Excellent performance. Maintain your confidence and structured answering style. Keep refining your clarity with strong real-world examples.";
  } else if (finalScore >= 5) {
    advice =
      "Good foundation. Focus on improving clarity, structure, and confidence. Practice concise answers with better examples.";
  } else {
    advice =
      "Significant improvement required. Work on clarity, confidence, and structured thinking. Practice speaking answers regularly.";
  }

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(200);
  doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Professional Advice", margin + 8, currentY + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const splitAdvice = doc.splitTextToSize(advice, contentWidth - 16);
  doc.text(splitAdvice, margin + 8, currentY + 18);

  currentY += 45;

  // ===== QUESTION TABLE =====
  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [["#", "Question", "Score", "Feedback"]],
    body: questionWiseScore.map((q, i) => [
      i + 1,
      q.question || "N/A",
      `${q.score}/10`,
      q.feedback || "No feedback",
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 4,
      valign: "top",
    },
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 55 },
      2: { cellWidth: 20, halign: "center" },
      3: { cellWidth: "auto" },
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },
  });

  // ===== FOOTER =====
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(
    "Generated by AI Interview Platform",
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  doc.save("AI_Interview_Report.pdf");
};

    return (
        <div className='min-h-screen bg-linear-to-br from-gray-50 to-green-50 px sm:px-6 lg:px-10 py-8'>
  <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
    <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>
      <button
        onClick={() => navigate("/history")}
        className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'
      >
        <FaArrowLeft className='text-gray-600' />
      </button>
      
 
      <div>
        <h1 className='text-3xl font-bold flex-nowrap text-gray-800'>
          Interview History
        </h1>
        <p className='text-gray-500 mt-2'>
          Track your past interviews and performance reports.
        </p>
      </div>
    </div>

            <button  onClick={downloadPDF} className='bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap'>
  Download PDF
</button>
  </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

  <div className='space-y-6'>
      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center"
>

<h3 className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
  Overall Performance
</h3>

<div className='relative w-20 h-36 sm:w-25 sm:h-25 mx-auto'>
  <CircularProgressbar
    value={percentage}
    text={`${score}/10`}
    styles={buildStyles({
      textSize: "18px",
      pathColor: "#10b981",
      textColor: "#ef4444",
      trailColor: "#e5e7eb",
    })}
  />
</div>

<p className="text-gray-400 mt-3 text-xs sm:text-sm">
  Out of 10
</p>

<div className="mt-4">
  <p className="font-semibold text-gray-800 text-sm sm:text-base">
    {performanceText}
  </p>
  <p className="text-gray-500 text-xs sm:text-sm mt-1">
    {shortTagline}
  </p>
</div>


</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8'
>
  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
    Skill Evaluation
  </h3>

  <div className='space-y-5'>
    {skills.map((s, i) => (
  <div key={i}>
    <div className='flex justify-between mb-2 text-sm sm:text-base'>
      <span>{s.label}</span>
      <span className='font-semibold text-green-600'>{s.value}</span>
    </div>

      <div className='bg-gray-200 h-2 sm:h-3 rounded-full'>
          <div className='bg-green-500 h-full rounded-full'
  style={{ width: `${s.value * 10}%` }}
></div>
        </div>
  </div>
))}

  </div>
</motion.div>

  </div>

<div className='lg:col-span-2 space-y-6'>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'
  >
    <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
  Performance Trend
</h3>

<div className='h-64 sm:h-72'>
  <ResponsiveContainer width="100%" height="100%">
  <AreaChart data={questionScoreData}>
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="name"/>
    <YAxis domain={[0, 10]}/>
    <Tooltip/>
    <Area type="monotone"
      dataKey="score"
      stroke="#22c55e"
      fill="#bbf7d0"
      strokeWidth={3}/>

  </AreaChart>

</ResponsiveContainer>
</div>

  </motion.div>

    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8"
>
  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
    Question Breakdown
  </h3>
  <div className="space-y-6">
{questionWiseScore.map((q, i) => (
  <div key={i} className='bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200'>
    
    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>
      <div>
        <p className="text-xs text-gray-400">
          Question {i + 1}
        </p>

        <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
          {q.question || "Question not available"}
        </p>
      </div>
        <div className='bg-green-100 text-green-600 px-3 py-1 
rounded-full font-bold text-xs sm:text-sm w-fit'>
  {q.score ?? 0}/10
</div>
    </div>
      <div className='bg-green-50 border border-green-200 p-4 
rounded-lg'>
  <p className='text-xs text-green-600 font-semibold mb-1'>
    AI Feedback
  </p>
  <p className='text-sm text-gray-700 leading-relaxed'>
    {q.feedback && q.feedback.trim() !== "" 
    ? q.feedback 
    : "No feedback available for this question."}
  </p>
</div>
  </div>
))}
  </div>
</motion.div>

  


</div>
</div>
</div>
    )
}

export default Step3Report











