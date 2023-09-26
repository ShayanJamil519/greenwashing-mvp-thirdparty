import axios from "axios";
import apiUrl from "../utils/baseURL"

class ReportService {
  /**
   * getAllPendingReports
   * @returns
   */
  async getAllPendingReports() {
    const {data} = await axios.get(`${apiUrl}/api/report/getPendingReports`);
    // console.log(data.results)
    return data
  }


   /**
   * getAllUnderReviewReports
   * @returns
   */
  async getAllUnderReviewReports() {
    const {data} = await axios.get(`${apiUrl}/api/report/getAllUnderReviewReports`);
    return data
  }


  
   /**
   * getAllReviewedReports
   * @returns
   */
  async getAllReviewedReports() {
    const {data} = await axios.get(`${apiUrl}/api/report/getAllReviewedReports`);
    return data
  }


  

  
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new ReportService();