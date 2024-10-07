export const tabSize = () =>
  document.getElementById("table_size") as HTMLInputElement;
export const crossBtn = () => document.querySelector(".closeBtn");
export const submitBtn = () => document.querySelector(".submitBtn")!;
export const modalTitle = () => document.querySelector(".modalTitle")!;
export const form = () => document.querySelector("form");
export const filterData = () =>
  document.getElementById("search")! as HTMLInputElement;
export const darkBg = () => document.querySelector(".dark_bg");
export const popupForm = () => document.querySelector(".popup");
export const name = () => document.getElementById("name")! as HTMLInputElement;
export const surname = () =>
  document.getElementById("surname") as HTMLInputElement;
export const date = () => document.getElementById("date") as HTMLInputElement;
export const amountClaimed = () =>
  document.getElementById("amountClaimed") as HTMLInputElement;
export const amountPaid = () =>
  document.getElementById("amountPaid") as HTMLInputElement;
export const placeOfService = () =>
  document.getElementById("placeOfService") as HTMLInputElement;
export const addClaim = () => document.querySelector("div .add-product");

export const numberOfClaims = () =>
  document.getElementById("number_of_claims")!;

export const rejectedClaims = () => document.getElementById("rejected_claims")!;

export const payouts = () => document.getElementById("payouts")!;
