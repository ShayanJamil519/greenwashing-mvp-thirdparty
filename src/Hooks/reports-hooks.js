import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import ReportService from "../Hooks/reports-hook"
import ReportService from "../Services/reports-services"

const useGetAllPendingReports = () => {
    return useQuery({  queryKey: ['getPendingReports'],  queryFn: () => ReportService.getAllPendingReports()
  })
};



const useGetAllUnderReviewReports = () => {
    return useQuery({  queryKey: ['getAllUnderReviewReports'],  queryFn: () => ReportService.getAllUnderReviewReports()
  })
};


const useGetAllReviewedReports = () => {
    return useQuery({  queryKey: ['getAllReviewedReports'],  queryFn: () => ReportService.getAllReviewedReports()
  })
};




const useGetSingleReportDetails = (company) => {
  return useQuery({
    queryKey: ["getSingleReportDetail"], 
    queryFn: () => ReportService.getSingleReportDetail(company),
  });
};



const useAssignCase = (reportData) => {
  // console.log(reportData)
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return ReportService.assignCase(reportData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("resetPassword");
      },
    }
  );
};






export { useGetAllPendingReports, useGetAllUnderReviewReports, useGetAllReviewedReports, useAssignCase, useGetSingleReportDetails };
