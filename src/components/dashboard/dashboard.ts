/* Import html content */
import sideBar from "./sidebar/sideBar.html?raw";
import claimsHtml from "./claims/claims.html?raw";
import right from "./right/right.html?raw";
import formHtml from "./form/form.html?raw";

import { Claim, TableState } from "../../interfaces/claims";
import { showInfo, displayIndexBtn, highlightIndexBtn } from "./claims/claims";
import { claims } from "../../data/claims";

import "./style.css";

const Dashboard = (element: HTMLDivElement) => {
  localStorage.setItem("userProfile", JSON.stringify(claims));

  element.innerHTML = `<div class="container">${sideBar} ${claimsHtml} ${right} ${formHtml} </div>`;

  const crossBtn = document.querySelector(".closeBtn");
  const submitBtn = document.querySelector(".submitBtn");
  const modalTitle = document.querySelector(".modalTitle");

  const form = document.querySelector("form");

  const tabSize = document.getElementById("table_size");

  const filterData = document.getElementById("search")! as HTMLInputElement;

  const darkBg = document.querySelector(".dark_bg");
  const popupForm = document.querySelector(".popup");

  const name = document.getElementById("name")!;
  const surname = document.getElementById("surname");
  const date = document.getElementById("date");
  const amountClaimed = document.getElementById("amountClaimed");
  const amountPaid = document.getElementById("amountPaid");
  const placeOfService = document.getElementById("placeOfService");

  const addClaim = document.querySelector("div .add-product");

  addClaim?.addEventListener("click", function () {
    darkBg?.classList.add("active");
    popupForm?.classList.add("active");
  });

  crossBtn?.addEventListener("click", function () {
    darkBg?.classList.remove("active");
    popupForm?.classList.remove("active");
  });

  let originalData = localStorage.getItem("userProfile")
    ? JSON.parse(localStorage.getItem("userProfile") as string)
    : [];
  let getData = [...originalData];

  let tableState: TableState = {
    arrayLength: 0,
    tableSize: 10,
    startIndex: 1,
    endIndex: 0,
    currentIndex: 1,
    maxIndex: 0,
  };

  showInfo(tableState);

  showInfo(tableState);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const claim = {
      id: Date.now(),
      name: (name as HTMLInputElement).value,
      surname: (surname as HTMLInputElement).value,
      date: (date as HTMLInputElement).value,
      placeOfService: (placeOfService as HTMLInputElement).value,
      amountPaid: (amountPaid as HTMLInputElement)?.value,
      amountClaimed: (amountClaimed as HTMLInputElement).value,
    };

    originalData.unshift(claim);

    getData = [...originalData];
    localStorage.setItem("userProfile", JSON.stringify(originalData));

    submitBtn ? (submitBtn.innerHTML = "Submit") : "";
    modalTitle ? (modalTitle.innerHTML = "Fill the Form") : "";

    darkBg?.classList.remove("active");
    popupForm?.classList.remove("active");
    form.reset();

    tableState = highlightIndexBtn(tableState);
    displayIndexBtn(tableState);
    showInfo(tableState);

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

  tabSize?.addEventListener("change", () => {
    var selectedValue = parseInt((tabSize as HTMLInputElement)?.value);

    tableState = {
      ...tableState,
      tableSize: selectedValue,
      currentIndex: 1,
      startIndex: 1,
    };
    displayIndexBtn(tableState);
  });

  filterData.addEventListener("input", () => {
    const searchTerm = filterData.value.toLowerCase().trim();

    if (searchTerm !== "") {
      const filteredData = originalData.filter((item: Claim) => {
        const name = (item.name + " " + item.surname).toLowerCase();
        const placeOfService = item.placeOfService.toLowerCase();

        return name.includes(searchTerm) || placeOfService.includes(searchTerm);
      });

      getData = filteredData;
      localStorage.setItem("userProfile", JSON.stringify(getData));
    } else {
      getData = JSON.parse(localStorage.getItem("userProfile") as string) || [];
    }

    displayIndexBtn({ ...tableState, currentIndex: 1, startIndex: 1 });
  });

  displayIndexBtn({ ...tableState });
};

export default Dashboard;
