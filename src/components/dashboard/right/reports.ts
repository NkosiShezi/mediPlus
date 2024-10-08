import { ReportState } from "../../../interfaces/claims";

export const getStats = (): Promise<ReportState> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        const [claims, rejectedClaims, payouts] = [...Array(3)].map(
          () => Math.floor(Math.random() * 100) + 1
        );

        resolve({ claims, rejectedClaims, payouts });
      } else {
        reject("Failed.");
      }
    }, 3000);
  });
