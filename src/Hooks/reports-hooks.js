import { useQuery } from "@tanstack/react-query";
// import ReportService from "../Hooks/reports-hook"
import ReportService from "../Services/reports-services"

const useGetAllPendingReports = () => {
    return useQuery({  queryKey: ['/api/report/getPendingReports'],  queryFn: () => ReportService.getAllPendingReports()
  })
};



const useGetAllUnderReviewReports = () => {
    return useQuery({  queryKey: ['/api/report/getAllUnderReviewReports'],  queryFn: () => ReportService.getAllUnderReviewReports()
  })
};





export { useGetAllPendingReports, useGetAllUnderReviewReports };
