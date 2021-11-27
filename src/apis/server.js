import axios from "axios";

// export const baseUrl = "https://hamza-flaws.herokuapp.com";
export const baseUrl = "https://saif-fyp.herokuapp.com";
export default axios.create({
  baseURL: baseUrl,
});
 