import { useQuery } from "@tanstack/react-query";
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





export { useGetAllPendingReports, useGetAllUnderReviewReports, useGetAllReviewedReports };
