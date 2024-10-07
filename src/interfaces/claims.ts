export interface TableState {
  arrayLength: number;
  tableSize: number;
  startIndex: number;
  endIndex: number;
  currentIndex: number;
  maxIndex: number;
}

export interface Claim {
  name: string;
  surname: string;
  date: string;
  placeOfService: string;
  amountClaimed: number;
  amountPaid: number;
  accountType: string;
}

export interface ReportState {
  claims: string;
  rejectedClaims: string;
  payouts: string;
}
