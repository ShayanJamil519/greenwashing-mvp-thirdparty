import React, { useRef, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
// import { useReactToPrint } from "react-to-print";
import { create } from "ipfs-http-client";
// import axios from "axios";
import { toast } from "react-toastify";
// import { smartContract } from "../../Constants";
// import { ethers } from "ethers";
import {
  useAssignCase,
  useCloseCase,
  useGetChangeStatusToReview,
  useGetSingleReportDetails,
  useUpdateCase,
} from "../../Hooks/reports-hooks";
import { formattedDate } from "../../utils/date";

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
  const [showCaseStatusStep0, setShowCaseStatusStep0] = useState(true);
  const [showCaseStatusStep1, setShowCaseStatusStep1] = useState(false);
  const [showCaseStatusStep2, setShowCaseStatusStep2] = useState(false);
  const [showCaseStatusStep3Update, setShowCaseStatusStep3Update] =
    useState(false);
  const [showCaseStatusStep4Final, setShowCaseStatusStep4Final] =
    useState(false);
  const { setStep, company, description } = useStepsContext();
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

  // useGetChangeStatusToReview;
  const {
    mutate: addMutateChangeStatusToReview,
    isLoading: changeStatusLoading,
  } = useGetChangeStatusToReview(
    JSON.stringify({
      company,
      reviewing: "true",
      pending: "false",
      reviewed: "false",
    })
  );

  const handleChangeStatusCase = async () => {
    addMutateChangeStatusToReview(
      {},
      {
        onSuccess: (response) => {
          if (response?.data?.message) {
            toast.error(response?.data?.message);
          }
          if (response?.data?.results) {
            setShowCaseStatusStep0(false);
            setShowCaseStatusStep1(true);
          }
        },
      }
    );
  };

  // AssignCase
  const [reportAssignCaseData, setReportAssignCaseData] = useState({
    assignedTo: "",
    comment: "",
  });

  const { mutate: addMutate, isLoading } = useAssignCase(
    JSON.stringify({
      ...reportAssignCaseData,
      formattedDate,
      openedBy: "John Doe (case file officer)",
      company,
    })
    // currentCountry
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReportAssignCaseData({
      ...reportAssignCaseData,
      [name]: value,
    });
  };

  const handleAssignCase = async () => {
    if (!reportAssignCaseData.assignedTo) {
      toast.error("Please enter the fields");
      return;
    }

    addMutate(
      {},
      {
        onSuccess: (response) => {
          if (response?.data?.message) {
            toast.error(response?.data?.message);
          }
          if (response?.data?.results) {
            toast.success("Case has been assigned");
            setShowCaseStatusStep1(false);
            setShowCaseStatusStep2(true);
          }
        },
      }
    );
  };

  // updateCase

  const [updateReportComment, setUpdateReportComment] = useState("");

  const { mutate: addMutateUpdateCase, isLoading: updateCaseLoading } =
    useUpdateCase(
      JSON.stringify({
        ...updateReportComment,
        formattedDate,

        company,
      })
      // currentCountry
    );

  const handleUpdateCase = async () => {
    if (!updateReportComment) {
      toast.error("Please enter the field");
      return;
    }

    addMutateUpdateCase(
      {},
      {
        onSuccess: (response) => {
          if (response?.data?.message) {
            toast.error(response?.data?.message);
          }
          if (response?.data?.results) {
            toast.success("Comment has been updated");
            setShowCaseStatusStep1(false);
            setShowCaseStatusStep3Update(false);
            setShowCaseStatusStep4Final(true);
            //  setShowCaseStatusStep2(true);
          }
        },
      }
    );
  };

  // useCloseCase;
  const { mutate: addMutateCloseCase, isLoading: closeCaseLoading } =
    useCloseCase(
      JSON.stringify({
        company,
        reviewed: "true",
        reviewing: "false",
        pending: "false",
      })
      // currentCountry
    );

  const handleCloseCase = async () => {
    addMutateCloseCase(
      {},
      {
        onSuccess: (response) => {
          if (response?.data?.message) {
            toast.error(response?.data?.message);
          }
          if (response?.data?.results) {
            toast.success("Case has been closed");
            setShowCaseStatusStep4Final(false);
            setStep("all_reports");
          }
        },
      }
    );
  };

  // getSingleReportDetail;
  const { data: singleReportData, isLoading: singleReportLoading } =
    useGetSingleReportDetails(company);

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
        className="w-[80%] mx-auto my-10 p-5 rounded-xl"
      >
        {/* Top */}

        <div className="mb-7">
          <div className="flex justify-between items-center">
            <p className="mb-2 text-sm text-[#2c2d2e] font-semibold">
              Sep 8, 2023
            </p>

            {/* <img
              src={
                showCaseStatusStep0
                  ? "./assets/pending__to__review.png"
                  : showCaseStatusStep4Final
                  ? "./assets/Review__Completed.png"
                  : "./assets/review__in__progress.png"
              }
              alt="logo"
            /> */}

            {showCaseStatusStep0 && (
              <img src="./assets/pending__to__review.png" alt="logo" />
            )}

            {showCaseStatusStep4Final && (
              <img src="./assets/Review__Completed.png" alt="logo" />
            )}

            {(showCaseStatusStep1 ||
              showCaseStatusStep2 ||
              showCaseStatusStep3Update) && (
              <img src="./assets/review__in__progress.png" alt="logo" />
            )}
          </div>
          <h1 className="mb-5 text-[#000] text-2xl font-bold">{company}</h1>
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

          {/* case status step 1 */}
          {showCaseStatusStep1 && (
            <div className="mt-7">
              <p className="font-semibold text-xl mb-3">Case Status:</p>
              <p className="text-[#6C7275] text-base mb-1 font-semibold">
                Case opened by:
                <span className="text-[#000] font-semibold ml-2">
                  {" "}
                  John Doe (case file officer)
                </span>
              </p>
              <p className="text-[#6C7275] text-base mb-1 font-semibold">
                Timestamp:
                <span className="text-[#000] font-semibold ml-2">
                  {formattedDate}
                </span>
              </p>

              <div className="p-3 mt-7 mb-5 border-[1px] rounded-lg border-[#b6bdc0] flex flex-col gap-2">
                <label className="text-[#6C7275]">Case assigned to</label>
                <input
                  type="text"
                  required
                  name="assignedTo"
                  placeholder="Assigned to..."
                  value={reportAssignCaseData.assignedTo}
                  onChange={handleInputChange}
                  className="border-none focus:outline-none w-full font-semibold"
                />
              </div>

              <div className="p-3 mt-5 mb-5 border-[1px] rounded-lg bg-gray-100 border-[#b6bdc0] flex flex-col gap-2">
                <label className="text-[#6C7275]">Comment (optional)</label>
                <input
                  type="text"
                  name="comment"
                  placeholder="Type here..."
                  value={reportAssignCaseData.comment}
                  onChange={handleInputChange}
                  className="border-none focus:outline-none w-full bg-gray-100 font-semibold"
                />
              </div>
            </div>
          )}

          {/* case status step 2 */}
          {showCaseStatusStep2 && (
            <div className="mt-7">
              <p className="font-semibold text-xl mb-3">Case Status:</p>
              <p className="text-[#6C7275] text-base mb-1 font-semibold">
                Case opened by:
                <span className="text-[#000] font-semibold ml-2">
                  {" "}
                  John Doe (case file officer)
                </span>
              </p>
              <p className="text-[#6C7275] text-base mb-1 font-semibold">
                Case assigned to:
                <span className="text-[#000] font-semibold ml-2">
                  {" "}
                  {singleReportLoading
                    ? "Loading..."
                    : singleReportData?.results[0]?.assignedTo}
                </span>
              </p>
              <p className="text-[#6C7275] text-base mb-1 font-semibold">
                Timestamp:
                <span className="text-[#000] font-semibold ml-2">
                  {singleReportLoading
                    ? "Loading..."
                    : singleReportData?.results[0]?.timeStamp}
                </span>
              </p>

              {singleReportData?.results[0]?.comment && (
                <div className="p-3 mt-5 mb-5 border-[1px] rounded-lg bg-gray-100 border-[#b6bdc0] flex flex-col gap-2">
                  <label className="text-[#6C7275]">Comment (optional)</label>
                  <p className="font-semibold text-[#000]">
                    {singleReportLoading
                      ? "Loading..."
                      : singleReportData?.results[0]?.comment}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* case status step 3 Update */}
          {showCaseStatusStep3Update && (
            <>
              {/* Old comment */}
              <div className="mt-7">
                <p className="font-semibold text-xl mb-3">Case Status:</p>
                <p className="text-[#6C7275] text-base mb-1 font-semibold">
                  Case opened by:
                  <span className="text-[#000] font-semibold ml-2">
                    {" "}
                    John Doe (case file officer)
                  </span>
                </p>
                <p className="text-[#6C7275] text-base mb-1 font-semibold">
                  Case assigned to:
                  <span className="text-[#000] font-semibold ml-2">
                    {" "}
                    {singleReportLoading
                      ? "Loading..."
                      : singleReportData?.results[0]?.assignedTo}
                  </span>
                </p>
                <p className="text-[#6C7275] text-base mb-1 font-semibold">
                  Timestamp:
                  <span className="text-[#000] font-semibold ml-2">
                    {singleReportLoading
                      ? "Loading..."
                      : singleReportData?.results[0]?.timeStamp}
                  </span>
                </p>

                {singleReportData?.results[0]?.comment && (
                  <div className="p-3 mt-5 mb-5 border-[1px] rounded-lg bg-gray-100 border-[#b6bdc0] flex flex-col gap-2">
                    <label className="text-[#6C7275]">Comment</label>
                    <p className="font-semibold text-[#000]">
                      {singleReportLoading
                        ? "Loading..."
                        : singleReportData?.results[0]?.comment}
                    </p>
                  </div>
                )}
                <hr className="bg-[#E8ECEF]" />
              </div>

              {/* Updated Comment */}

              <div className="mt-7">
                <p className="font-semibold text-xl mb-3">Update #1:</p>
                <p className="text-[#6C7275] text-base mb-1 font-semibold">
                  Updated by:
                  <span className="text-[#000] font-semibold ml-2">
                    {" "}
                    John Doe (case file officer)
                  </span>
                </p>

                <p className="text-[#6C7275] text-base mb-1 font-semibold">
                  Timestamp:
                  <span className="text-[#000] font-semibold ml-2">
                    {formattedDate}
                  </span>
                </p>

                <div className="p-3 mt-5 mb-5 border-[1px] rounded-lg bg-gray-100 border-[#b6bdc0] flex flex-col gap-2">
                  <label className="text-[#6C7275]">Comment </label>
                  <input
                    type="text"
                    required
                    name="updatedComment"
                    placeholder="Type here..."
                    value={updateReportComment}
                    onChange={(e) => setUpdateReportComment(e.target.value)}
                    className="border-none focus:outline-none bg-gray-100 w-full font-semibold"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Button */}

        {showCaseStatusStep0 && (
          <div className="mt-7">
            <button
              onClick={handleChangeStatusCase}
              className="bg-[#3FDD78] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] "
            >
              {isLoading ? "Opening..." : "Open case"}
            </button>
          </div>
        )}

        {showCaseStatusStep1 && (
          <div className="mt-7">
            <button
              // onClick={handleOpenCaseStep1}
              onClick={() => {
                handleAssignCase();
              }}
              className="bg-[#3FDD78] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] "
            >
              {isLoading ? "Assigning..." : "Save"}
            </button>
          </div>
        )}

        {showCaseStatusStep2 && (
          <div className="mt-7 flex justify-start items-center gap-5">
            <button
              onClick={handleCloseCase}
              className="bg-[#3FDD78] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] "
            >
              {closeCaseLoading ? "Closing..." : "Close case"}
            </button>
            <button
              onClick={() => {
                setShowCaseStatusStep3Update(true);
                setShowCaseStatusStep2(false);
                setShowCaseStatusStep1(false);
              }}
              className="bg-[#000] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] "
            >
              Add Update
            </button>
          </div>
        )}

        {showCaseStatusStep3Update && (
          <div className="mt-7 flex justify-start items-center gap-5">
            <button
              onClick={handleUpdateCase}
              className="bg-[#3FDD78] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] "
            >
              {updateCaseLoading ? "Saving..." : " Save"}
            </button>
            <button
              onClick={() => {
                setShowCaseStatusStep3Update(false);
                setShowCaseStatusStep2(true);
                setShowCaseStatusStep1(false);
              }}
              className="bg-[#000] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] "
            >
              Cancel
            </button>
          </div>
        )}

        {showCaseStatusStep4Final && (
          <div className="mt-7">
            <button
              onClick={handleCloseCase}
              className="bg-[#3FDD78] rounded-lg  py-2 px-3 border-none outline-none text-[#fff] "
            >
              {closeCaseLoading ? "Closing..." : "Close case"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificReport;
