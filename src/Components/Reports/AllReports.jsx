import React, { useState } from "react";
// import { allReportsData } from "../../data";
import { useStepsContext } from "../../Context/StateContext";
import {
  useGetAllPendingReports,
  useGetAllReviewedReports,
  useGetAllUnderReviewReports,
} from "../../Hooks/reports-hooks";

const AllReports = () => {
  const [activeTab, setActiveTab] = useState(1);
  // const { setStep, rows } = useStepsContext();

  const { data: pendingReportsData } = useGetAllPendingReports();
  const { data: reviewReportsData } = useGetAllUnderReviewReports();
  const { data: reviewedReportsData } = useGetAllReviewedReports();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-[90%] mx-auto my-10">
      {/* Top Container */}
      <div className="flex justify-between items-start mb-6">
        {/* Left */}
        <div>
          <h1 className="text-[#000] font-bold text-3xl mb-1">Reports</h1>
          <p className="text-[#0000007f] text-lg font-semibold mb-7">
            Overview all of the Greenwashing reports here
          </p>
        </div>
      </div>

      {/* Tabs Container */}
      <div className="flex gap-10 w-fit justify-center item-center mb-8">
        <h1
          onClick={() => handleTabClick(1)}
          className={`cursor-pointer ${
            activeTab === 1
              ? "border-b-[2px] border-[#3FDD78] text-[#000] font-semibold"
              : "text-[#5f6264]"
          }  pb-1 `}
        >
          Pending review
        </h1>
        <h1
          onClick={() => handleTabClick(2)}
          className={`cursor-pointer ${
            activeTab === 2
              ? "border-b-[2px] border-[#3FDD78] text-[#000] font-semibold"
              : "text-[#5a5c5e]"
          }  pb-1 `}
        >
          Review in progress
        </h1>

        <h1
          onClick={() => handleTabClick(3)}
          className={`cursor-pointer ${
            activeTab === 3
              ? "border-b-[2px] border-[#3FDD78] text-[#000] font-semibold"
              : "text-[#5a5c5e]"
          }  pb-1 `}
        >
          Review completed
        </h1>
      </div>

      {/* Reports Container */}
      <div className="w-full gap-7 grid grid-cols-3">
        {activeTab === 1 && <Report data={pendingReportsData} />}
        {activeTab === 2 && <Report data={reviewReportsData} />}
        {activeTab === 3 && <Report data={reviewedReportsData} />}
      </div>
    </div>
  );
};

export default AllReports;

const Report = ({ data, activeTab }) => {
  const { setStep, setCurrentCountry } = useStepsContext();

  const handleNavigate = async (report) => {
    setCurrentCountry(report);
    // console.log("report: ", report);

    setStep("specific_report");
  };

  return (
    <>
      {data?.results
        ? data?.results.map((report, index) => (
            <div
              key={index}
              // onClick={() => setStep("specific_report")}
              onClick={() => handleNavigate(report?.companyName)}
              style={{
                boxShadow:
                  " 0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
              }}
              className="min-w-[31%] p-4 cursor-pointer rounded-xl hover:border-[1px] hover:border-black  "
            >
              <p className="mb-2 text-sm text-[#6C7275]">{report?.timeStamp}</p>
              <h1 className="mb-3 text-[#000] text-xl font-semibold">
                {report?.companyName}
              </h1>
              <p className="text-[#6C7275] text-sm mb-1">
                Jurisdiction :
                <span className="text-[#000] font-semibold ml-2 ">Ireland</span>
              </p>
              <p className="text-[#6C7275] text-sm mb-1">
                Data sources :
                <span className="text-[#000] font-semibold ml-2">
                  Sustainability Report, Twitter post
                </span>
              </p>
              <p className="text-[#6C7275] text-sm mb-1">
                Age :
                <span className="text-[#000] font-semibold ml-2">
                  {report?.age}
                </span>
              </p>
              <p className="text-[#6C7275] text-sm mb-1 flex items-center">
                Priority :
                <span className="w-[17px] h-[17px] rounded-full bg-[#fff900] ml-2 inline-block"></span>
                <span className="text-[#000] font-semibold ml-2">
                  {report?.priority}
                </span>
              </p>
            </div>
          ))
        : data?.message && <p>{data?.message}</p>}
    </>
  );
};
