import { ReportState } from "../../../interfaces/claims";

export const getStats = (): Promise<ReportState> =>
  new Promise((resolve, reject) => {
    // Simulating an asynchronous operation (e.g., API call, setTimeout)
    setTimeout(() => {
      const success = true; // You can toggle this to simulate success or failure

      if (success) {
        resolve({ claims: "32", rejectedClaims: "35", payouts: "345" });
      } else {
        reject("Operation failed.");
      }
    }, 2000); // Simulates a 2 second delay
  });
