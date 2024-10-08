import { Claim, TableState } from "../../../interfaces/claims";
import {
  numberOfClaims,
  payouts,
  rejectedClaims,
} from "../../../utils/selectors";
import { getStats } from "../right/reports";

export const getReport = async () => {
  const loading = "<span class='material-symbols-sharp'> downloading </span>";

  const reports = [numberOfClaims(), rejectedClaims(), payouts()];
  reports.map((report) => (report.innerHTML = loading));

  try {
    const stats = await getStats();

    numberOfClaims().innerHTML = `${stats.claims}`;
    rejectedClaims().innerHTML = `${stats.rejectedClaims}`;
    payouts().innerHTML = `${stats.payouts}`;
  } catch (error) {
    reports.map((report) => (report.innerHTML = error as string));
  }
};

const deleteClaim = (index: number, tableState: TableState): TableState => {
  let { currentIndex, startIndex, endIndex, maxIndex } = tableState;
  const originalData = JSON.parse(localStorage.getItem("claimsData") as string);

  if (confirm("Confirm to delete claim?")) {
    originalData.splice(index, 1);
    localStorage.setItem("claimsData", JSON.stringify(originalData));

    const getData = [...originalData];

    tableState = tableData(tableState);

    if (getData.length === 0) {
      currentIndex = 1;
      startIndex = 1;
      endIndex = 0;
    } else if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    displayClaims(tableState);
    tableState = activePaginationBtn(tableState);
    showPaginationButtons(tableState);

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (Math.floor(tableState.maxIndex) > tableState.currentIndex) {
      nextBtn?.classList.add("act");
    } else {
      nextBtn?.classList.remove("act");
    }

    if (tableState.currentIndex > 1) {
      prevBtn?.classList.add("act");
    }
  }

  return { ...tableState, currentIndex, startIndex, endIndex };
};

export const tableData = (tableState: TableState): TableState => {
  let { arrayLength, maxIndex, tableSize } = tableState;
  const claims = JSON.parse(localStorage.getItem("claimsData") as string);

  arrayLength = claims.length;
  maxIndex = arrayLength / tableSize;

  if (arrayLength % tableSize > 0) {
    maxIndex++;
  }

  return { ...tableState, arrayLength, maxIndex };
};

export const showPaginationButtons = (tableState: TableState) => {
  tableState = tableData(tableState);
  const { maxIndex } = tableState;

  const pagination = document.querySelector(".pagination");

  const nextButton =
    '<button id="next_btn" class="next"> <span class="material-symbols-sharp"> arrow_forward_ios </span></button>';
  const previousButton =
    '<button class="prev"><span class="material-symbols-sharp"> arrow_back_ios</span></button>';

  if (pagination) {
    pagination.innerHTML = previousButton;
    for (let i = 1; i <= maxIndex; i++) {
      pagination
        ? (pagination.innerHTML +=
            '<button index="' + i + '">' + i + "</button>")
        : "";
    }

    pagination.innerHTML += nextButton;
  }

  tableState = activePaginationBtn(tableState);
};

export const activePaginationBtn = (tableState: TableState): TableState => {
  const entries = document.querySelector(".showEntries");

  let { startIndex, currentIndex, tableSize, endIndex, arrayLength, maxIndex } =
    tableState;
  startIndex = (currentIndex - 1) * tableSize + 1;
  endIndex = startIndex + tableSize - 1;

  if (endIndex > arrayLength) {
    endIndex = endIndex;
  }

  if (maxIndex >= 2) {
    const nextBtn = document.querySelector(".next");
    nextBtn?.classList.add("act");
  }

  if (entries) {
    entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`;
  }

  const paginationBtns = document.querySelectorAll(".pagination button");

  [...paginationBtns].map((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("index") === currentIndex.toString()) {
      btn.classList.add("active");
    }
  });

  displayClaims({ ...tableState, startIndex, endIndex });

  return { ...tableState, startIndex, endIndex };
};

export const displayClaims = (tableState: TableState) => {
  const table = document.querySelector("#table-body")!;

  const { startIndex, endIndex } = tableState;

  const claimD = document.querySelectorAll(".claimDetails");

  [...claimD].map((claimData) => {
    claimData.remove();
  });

  const getData = JSON.parse(localStorage.getItem("claimsData") as string);

  const claimStartIndex = startIndex - 1;
  const claimEndIndex = endIndex;

  if (getData.length > 0) {
    let tableRows = "";

    for (let i = claimStartIndex; i < claimEndIndex; i++) {
      const claim = getData[i] as Claim;

      if (claim) {
        tableRows += `<tr class="test">
        <td>${claim.name}</td>
        <td>${claim.surname}</td>
        <td>${claim.date}</td>
        <td>${claim.placeOfService}</td>
        <td class="primary">R${claim.amountClaimed}</td>
        <td class="primary">R${claim.amountPaid}</td>
        <td><button id="${i}" class="deleteClaimBtn">Delete</button></td>
      </tr>`;
      }
    }
    table.innerHTML = tableRows;
  } else {
    let tableRows = `<tr class="claimDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`;
    table.innerHTML = tableRows;
  }

  const deletBtn = document.querySelectorAll(".deleteClaimBtn");
  [...deletBtn].map((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      tableState = deleteClaim(Number(deleteBtn.id), tableState);
    });
  });

  const nextButton = document.querySelector(".next")!;
  nextButton?.addEventListener("click", () => {
    tableState = next(tableState);
  });

  const prevButton = document.querySelector(".prev")!;
  prevButton?.addEventListener("click", () => {
    tableState = prev(tableState);
  });
};

const next = (tableState: TableState): TableState => {
  let { currentIndex, maxIndex } = tableState;
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (currentIndex <= maxIndex - 1) {
    currentIndex++;
    prevBtn?.classList.add("act");

    tableState = activePaginationBtn({ ...tableState, currentIndex });
  }

  if (tableState.currentIndex > tableState.maxIndex - 1) {
    nextBtn?.classList.remove("act");
  }
  return { ...tableState, currentIndex };
};

const prev = (tableState: TableState): TableState => {
  let { currentIndex } = tableState;
  const prevBtn = document.querySelector(".prev");

  if (currentIndex > 1) {
    currentIndex--;
    prevBtn?.classList.add("act");

    tableState = activePaginationBtn({ ...tableState, currentIndex });
  }

  if (currentIndex < 2) {
    prevBtn?.classList.remove("act");
  }

  return { ...tableState, currentIndex };
};
