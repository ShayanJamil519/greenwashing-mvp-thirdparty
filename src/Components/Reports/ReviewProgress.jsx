// import React, { useState } from "react";

// const ReviewProgress = () => {
//   console.log("yessssssssssssssss");
//   return <div>ReviewProgress</div>;
// };

// export default ReviewProgress;

import React, { useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";

// ----------------------------
const ReviewProgress = () => {
  const { setStep, currentCountry } = useStepsContext();
  const [predict, setPredict] = useState(
    "In the Sustainability Report, it is stated that Bank of America achieved carbon neutrality for its operations in 2019. However, in Twitter, there is a tweet from 2021 mentioning the goal of transitioning to a low-carbon economy, suggesting that carbon neutrality may not have been achieved by 2021.  The Sustainability Report mentions that Bank of America joined the Net-Zero Banking Alliance (NZBA) in 2021, but there is no mention of this in Twitter or Carbon offsets sheets. In the Sustainability Report sheet, it is stated that Bank of America achieved its 100% renewable electricity goal in 2019. However, there is no mention of this in the Twitter or Carbon offsets sheets."
  );
  const [hash, setHash] = useState(
    "QmWX2Y31vu94XquQsgjzEdXpDtT4fnJZKETxM2fEseoWiU"
  );
  const [etherscanURL, setEtherscanURL] = useState(
    "https://sepolia.etherscan.io/tx/0x475fca847e2b37be5ee38c94761573f13ce723f7288a8e636a199a03f7fa5e7c"
  );

  return (
    <div>
      <BackButton setStep={() => setStep("specific_report")} />

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
              Sep 8, 2023
            </p>
            <img src="./assets/review__in__progress.png" alt="logo" />
          </div>
          <h1 className="mb-5 text-[#000] text-2xl font-bold">
            {currentCountry}
          </h1>
          <p className="text-[#6C7275] text-base mb-1 font-semibold">
            Jurisdiction :
            <span className="text-[#000] font-semibold ml-2">USA</span>
          </p>

          <p className="text-[#6C7275] text-base font-semibold mb-1">
            Data sources:
            <span className="text-[#000] font-semibold ml-2">
              Sustainability Report, Twitter
            </span>
          </p>

          <p className="text-[#6C7275] text-base font-semibold mb-1">
            Timestamp:
            <span className="text-[#000] font-semibold ml-2">
              Sep-8-2023 12:40:00 AM
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
            Age :<span className="text-[#000] font-semibold ml-2">Recent</span>
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
          <p className="text-[#6C7275] font-semibold mb-3">Claim #1:</p>
          <p className="font-semibold text-[#000]">
            We achieved carbon neutrality and our 100% renewable electricity
            goal in 2019.
          </p>
          <p className="text-[#6C7275] text-sm mt-1  mb-5 font-semibold">
            Data source:
            <span className="text-[#000] font-semibold ml-2">
              Sustainability Report
            </span>
          </p>

          <p className="text-[#6C7275] font-semibold mb-3">Claim #2:</p>

          <p className="font-semibold text-[#000]">
            Transitioning to a low-carbon economy is essential, but it's crucial
            to stay realistic. Achieving carbon neutrality by 2021 might be a
            challenging goal. Let's keep working towards a greener future!
          </p>
          <p className="text-[#6C7275] text-sm mt-1 font-semibold">
            Data source:
            <span className="text-[#000] font-semibold ml-2">Twitter</span>
          </p>
        </div>

        {/* Button */}
        <div className="mt-7">
          <button
            // onClick={handleOpenCase}
            className="bg-[#3FDD78] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] "
          >
            Save{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewProgress;
