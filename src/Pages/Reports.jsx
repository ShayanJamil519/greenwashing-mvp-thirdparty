import React from "react";
import { useStepsContext } from "../Context/StateContext";
import AllReports from "../Components/Reports/AllReports";
import SpecificReport from "../Components/Reports/SpecificReport";
import ReviewProgress from "../Components/Reports/ReviewProgress";

const Reports = () => {
  const { step } = useStepsContext();

  return (
    <div>
      {step === "all_reports" && <AllReports />}
      {step === "specific_report" && <SpecificReport />}
      {step === "review_progress " && <ReviewProgress />}
    </div>
  );
};

export default Reports;
