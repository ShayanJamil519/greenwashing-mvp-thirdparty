import React from "react";
import { useStepsContext } from "../Context/StateContext";
import AllReports from "../Components/Reports/AllReports";
import SpecificReport from "../Components/Reports/SpecificReport";

const Reports = () => {
  const { step } = useStepsContext();

  return (
    <div>
      {/* <AllReports /> */}
      {step === "all_reports" && <AllReports />}
      {step === "specific_report" && <SpecificReport />}
      {/* <SpecificReport /> */}
    </div>
  );
};

export default Reports;
