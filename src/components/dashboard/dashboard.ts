/* Import html content */
import sideBar from "./sidebar/sideBar.html?raw";
import claimsHtml from "./claims/claims.html?raw";
import right from "./right/right.html?raw";
import formHtml from "./form/form.html?raw";

import { Claim } from "../../interfaces/claims";
import {
  displayClaims,
  showPaginationButtons,
  activePaginationBtn,
  getReport,
} from "./claims/claims";
import { claims, initialState } from "../../data/claims";

import "./style.css";
import {
  addClaim,
  amountClaimed,
  amountPaid,
  crossBtn,
  darkBg,
  date,
  filterData,
  form,
  modalTitle,
  name,
  placeOfService,
  popupForm,
  submitBtn,
  surname,
  tabSize,
} from "../../utils/selectors";

const Dashboard = (element: HTMLDivElement) => {
  localStorage.setItem("claimsData", JSON.stringify(claims));

  element.innerHTML = `<div class="container">${sideBar}${claimsHtml}${right}${formHtml}</div>`;

  addClaim()?.addEventListener("click", () => {
    darkBg()?.classList.add("active");
    popupForm()?.classList.add("active");
  });

  crossBtn()?.addEventListener("click", () => {
    darkBg()?.classList.remove("active");
    popupForm()?.classList.remove("active");
  });

  let originalData = localStorage.getItem("claimsData")
    ? JSON.parse(localStorage.getItem("claimsData") as string)
    : [];
  let getData = [...originalData];

  let tableState = initialState;

  form()?.addEventListener("submit", (e) => {
    e.preventDefault();

    const claim = {
      id: Date.now(),
      name: name().value,
      surname: surname().value,
      date: date().value,
      placeOfService: placeOfService().value,
      amountPaid: amountPaid().value,
      amountClaimed: amountClaimed().value,
    };

    originalData.unshift(claim);

    getData = [...originalData];
    localStorage.setItem("claimsData", JSON.stringify(originalData));

    submitBtn().innerHTML = "Submit";
    modalTitle().innerHTML = "Fill the Form";

    darkBg()?.classList.remove("active");
    popupForm()?.classList.remove("active");
    form()?.reset();

    tableState = activePaginationBtn(tableState);
    showPaginationButtons(tableState);
    displayClaims(tableState);

    var nextBtn = document.querySelector(".next");
    var prevBtn = document.querySelector(".prev");
    if (Math.floor(tableState.maxIndex) > tableState.currentIndex) {
      nextBtn?.classList.add("act");
    } else {
      nextBtn?.classList.add("act");
    }

    if (tableState.currentIndex > 1) {
      prevBtn?.classList.add("act");
    }
  });

  tabSize()?.addEventListener("change", () => {
    var selectedValue = parseInt((tabSize() as HTMLInputElement)?.value);

    tableState = {
      ...tableState,
      tableSize: selectedValue,
      currentIndex: 1,
      startIndex: 1,
    };
    showPaginationButtons(tableState);
  });

  filterData().addEventListener("input", () => {
    const searchTerm = filterData().value.toLowerCase().trim();

    if (searchTerm !== "") {
      const filteredData = originalData.filter((item: Claim) => {
        const name = (item.name + " " + item.surname).toLowerCase();
        const placeOfService = item.placeOfService.toLowerCase();

        return name.includes(searchTerm) || placeOfService.includes(searchTerm);
      });

      getData = filteredData;
      localStorage.setItem("claimsData", JSON.stringify(getData));
    } else {
      getData = JSON.parse(localStorage.getItem("claimsData") as string) || [];
    }

    showPaginationButtons({ ...tableState, currentIndex: 1, startIndex: 1 });
  });

  showPaginationButtons({ ...tableState });

  getReport();
};

export default Dashboard;
