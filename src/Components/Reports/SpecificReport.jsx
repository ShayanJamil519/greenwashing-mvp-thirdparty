import React, { useRef, useEffect, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { useReactToPrint } from "react-to-print";
import { create } from "ipfs-http-client";
import axios from "axios";
import { toast } from "react-toastify";
import { smartContract } from "../../Constants";
import { ethers } from "ethers";

// IPFS
const projectId = "2V6620s2FhImATdUuY4dwIAqoI0";
const projectSecret = "2dcb0a633ee912e06834a43a3083248e";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// ----------------------------
const SpecificReport = () => {
  const { setStep, currentCountry, description } = useStepsContext();
  const [predict, setPredict] = useState(
    "A/B Group PLC provide contradictory statements as it claim to be green, carbon-neutral or Net Zero by 2030. The three concepts are either ambiguous (i.e. green) or contradictory, as the scope of Net Zero differs from the one of carbon neutral."
  );
  // Print Report
  const printRef = useRef();
  const [hash, setHash] = useState(
    "74843f65ecfebbe8222e0ca8e971180ba180bd6d18c1a5336acae720d44f6dc"
  );
  const [etherscanURL, setEtherscanURL] = useState(
    "https://sepolia.etherscan.io/address/0x008304060777174473caad642885846d1c969368"
  );
  // const [uploadReport, setUploadReport] = useState("");

  return (
    <div>
      <BackButton setStep={() => setStep("all_reports")} />

      {/* Specific Report */}
      <div
        ref={printRef}
        style={{
          boxShadow:
            "0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
        }}
        className="w-[70%] mx-auto my-10 p-5 rounded-xl"
      >
        {/* Top */}

        <div className="mb-7">
          <p className="mb-2 text-sm text-[#2c2d2e] font-semibold">
            Aug, 24, 2023
          </p>
          <h1 className="mb-5 text-[#000] text-2xl font-bold">
            {currentCountry}
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

        {/* Stats */}
        <div className="my-5">
          <p className="text-[#6C7275] text-base mb-1">
            Age :<span className="text-[#000] font-semibold ml-2">Average</span>
          </p>

          <p className="text-[#6C7275] text-base mb-3 flex items-center">
            Priority :
            <div className="w-[17px] h-[17px] rounded-full bg-[#fff900] ml-2 inline-block"></div>
            <span className="text-[#000] font-semibold ml-2">Medium</span>
          </p>

          <hr className="bg-[#E8ECEF]" />
        </div>

        {/* Claims */}
        <div>
          <p className="text-[#6C7275] font-semibold mb-3">
            Sustainability claims:
          </p>
          <p className="font-semibold text-[#000]">
            In 2019 we made €5 b available for green projects and last year we
            set a target for 70% of our lending to be green by 2030. We also
            became the first Irish bank to pledge to operate as carbon neutral
            by 2030
          </p>
          <p className="text-[#6C7275] text-sm mt-3 font-semibold">
            Data source:
            <span className="text-[#000] font-semibold ml-2">Twitter</span>
          </p>
        </div>

        {/* Button */}
        <div className="mt-7">
          <button className="bg-[#3FDD78] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] ">
            Open case
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecificReport;
