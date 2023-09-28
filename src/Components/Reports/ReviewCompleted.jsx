import React, { useRef, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { useGetSingleReportDetails } from "../../Hooks/reports-hooks";

// ----------------------------
const ReviewCompleted = () => {
  const { setStep, company } = useStepsContext();
  const [predict, setPredict] = useState(
    "A/B Group PLC provide contradictory statements as it claim to be green, carbon-neutral or Net Zero by 2030. The three concepts are either ambiguous (i.e. green) or contradictory, as the scope of Net Zero differs from the one of carbon neutral."
  );
  // Print Report
  const [hash, setHash] = useState(
    "74843f65ecfebbe8222e0ca8e971180ba180bd6d18c1a5336acae720d44f6dc"
  );
  const [etherscanURL, setEtherscanURL] = useState(
    "https://sepolia.etherscan.io/address/0x008304060777174473caad642885846d1c969368"
  );

  // getSingleReportDetail;
  const { data: singleReportData, isLoading: singleReportLoading } =
    useGetSingleReportDetails(company);

  return (
    <div>
      <BackButton setStep={() => setStep("all_reports")} />

      {/* Specific Report */}
      <div
        style={{
          boxShadow:
            "0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
        }}
        className="w-[80%] mx-auto my-10 p-5 rounded-xl"
      >
        {/* Top */}

        <div className="mb-7">
          <div className="flex justify-between items-center">
            <p className="mb-2 text-sm text-[#2c2d2e] font-semibold">
              {singleReportLoading
                ? "loading..."
                : singleReportData?.results[0]?.timeStamp &&
                  singleReportData?.results[0]?.timeStamp}
            </p>

            <img src="./assets/Review__Completed.png" alt="logo" />
          </div>
          <h1 className="mb-5 text-[#000] text-2xl font-bold">
            {singleReportLoading
              ? "loading..."
              : singleReportData?.results[0]?.companyName &&
                singleReportData?.results[0]?.companyName}
          </h1>
          <p className="text-[#6C7275] text-base mb-1 font-semibold">
            Jurisdiction :
            <span className="text-[#000] font-semibold ml-2">Ireland</span>
          </p>

          <p className="text-[#6C7275] text-base font-semibold mb-1">
            Data sources: :
            <span className="text-[#000] font-semibold ml-2">
              2022 Sustainability Report, Twitter post 2021
            </span>
          </p>
          {/* Links */}
          <div className="">
            {hash && (
              <>
                <p className="mb-1 text-[#6C7275] text-base">
                  <span className="font-bold"> Hash: </span>
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3FDD78] font-semibold"
                  >
                    {" "}
                    {hash}
                  </a>
                </p>
                <p className="text-[#6C7275] text-base">
                  <span className="font-bold"> Etherscan URL: </span>
                  <a
                    href={etherscanURL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#3FDD78] font-semibold"
                  >
                    {" "}
                    {etherscanURL}{" "}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-[#F3F5F7] p-3 rounded-md mb-7">
          <p className="text-[#6C7275] mb-3 font-semibold">
            Summary of findings::
          </p>
          <p className="font-semibold">{predict}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCompleted;
