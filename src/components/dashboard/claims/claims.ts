import { Claim, TableState } from "../../../interfaces/claims";

const deleteInfo = (index: number, tableState: TableState): TableState => {
  let { currentIndex, startIndex, endIndex, maxIndex } = tableState;
  const originalData = JSON.parse(
    localStorage.getItem("userProfile") as string
  );

  if (confirm("Aer you sure want to delete?")) {
    originalData.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(originalData));

    const getData = [...originalData];

    tableState = preLoadCalculations(tableState);

    if (getData.length === 0) {
      currentIndex = 1;
      startIndex = 1;
      endIndex = 0;
    } else if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    showInfo(tableState);
    tableState = highlightIndexBtn(tableState);
    displayIndexBtn(tableState);

    var nextBtn = document.querySelector(".next");
    var prevBtn = document.querySelector(".prev");

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

export function preLoadCalculations(tableState: TableState): TableState {
  let { arrayLength, maxIndex, tableSize } = tableState;
  const getData = JSON.parse(localStorage.getItem("userProfile") as string);
  const array = getData;

  arrayLength = array.length;
  maxIndex = arrayLength / tableSize;

  if (arrayLength % tableSize > 0) {
    maxIndex++;
  }

  return { ...tableState, arrayLength, maxIndex };
}

export function displayIndexBtn(tableState: TableState) {
  tableState = preLoadCalculations(tableState);
  const { maxIndex } = tableState;

  const pagination = document.querySelector(".pagination");

  pagination ? (pagination.innerHTML = "") : "";

  pagination
    ? (pagination.innerHTML = '<button class="prev">Previous</button>')
    : "";

  for (let i = 1; i <= maxIndex; i++) {
    pagination
      ? (pagination.innerHTML += '<button index="' + i + '">' + i + "</button>")
      : "";
  }

  pagination
    ? (pagination.innerHTML +=
        '<button id="next_btn" class="next">Next</button>')
    : "";

  tableState = highlightIndexBtn(tableState);
}

export function highlightIndexBtn(tableState: TableState): TableState {
  const entries = document.querySelector(".showEntries");

  let { startIndex, currentIndex, tableSize, endIndex, arrayLength, maxIndex } =
    tableState;
  startIndex = (currentIndex - 1) * tableSize + 1;
  endIndex = startIndex + tableSize - 1;

  if (endIndex > arrayLength) {
    endIndex = endIndex;
  }

  if (maxIndex >= 2) {
    var nextBtn = document.querySelector(".next");
    nextBtn?.classList.add("act");
  }

  entries
    ? (entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`)
    : "";

  var paginationBtns = document.querySelectorAll(".pagination button");
  paginationBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("index") === currentIndex.toString()) {
      btn.classList.add("active");
    }
  });

  showInfo({ ...tableState, startIndex, endIndex });

  return { ...tableState, startIndex, endIndex };
}

export function showInfo(tableState: TableState) {
  const table = document.querySelector("#table-body")!;

  const { startIndex, endIndex } = tableState;
  document.querySelectorAll(".claimDetails").forEach((info) => info.remove());

  const getData = JSON.parse(localStorage.getItem("userProfile") as string);

  var tab_start = startIndex - 1;
  var tab_end = endIndex;

  if (getData.length > 0) {
    let tableRows = "";

    for (var i = tab_start; i < tab_end; i++) {
      var staff = getData[i] as Claim;

      if (staff) {
        tableRows += `<tr class="test">
        <td>${staff.name}</td>
        <td>${staff.surname}</td>
        <td class="warning">${staff.date}</td>
        <td class="primary">${staff.placeOfService}</td>
        <td class="primary">R${staff.amountClaimed}</td>
        <td class="primary">R${staff.amountPaid}</td>

        <td><button id="${i}" class="deleteBtn">Delete</button></td>

        
      </tr>`;
      }
    }
    table.innerHTML = tableRows;
  } else {
    let tableRows = `<tr class="claimDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`;
    table.innerHTML = tableRows;
  }

  const deletBtn = document.querySelectorAll(".deleteBtn");

  for (let i = 0; i < deletBtn.length; i++) {
    const btn = deletBtn[i];
    btn.addEventListener("click", function () {
      tableState = deleteInfo(Number(btn.id), tableState);
    });
  }

  const nextButton = document.querySelector(".next")!;
  nextButton?.addEventListener("click", function () {
    tableState = next(tableState);
  });

  const prevButton = document.querySelector(".prev")!;
  prevButton?.addEventListener("click", function () {
    tableState = prev(tableState);
  });
}

function next(tableState: TableState): TableState {
  let { currentIndex, maxIndex } = tableState;
  var prevBtn = document.querySelector(".prev");
  var nextBtn = document.querySelector(".next");

  if (currentIndex <= maxIndex - 1) {
    currentIndex++;
    prevBtn?.classList.add("act");

    tableState = highlightIndexBtn({ ...tableState, currentIndex });
  }

  if (tableState.currentIndex > tableState.maxIndex - 1) {
    nextBtn?.classList.remove("act");
  }
  return { ...tableState, currentIndex };
}

function prev(tableState: TableState): TableState {
  let { currentIndex } = tableState;
  var prevBtn = document.querySelector(".prev");

  if (currentIndex > 1) {
    currentIndex--;
    prevBtn?.classList.add("act");

    tableState = highlightIndexBtn({ ...tableState, currentIndex });
  }

  if (currentIndex < 2) {
    prevBtn?.classList.remove("act");
  }

  return { ...tableState, currentIndex };
}

export function paginationBtn(i: number, tableState: TableState): TableState {
  let { currentIndex, maxIndex } = tableState;
  currentIndex = i;

  var prevBtn = document.querySelector(".prev");
  var nextBtn = document.querySelector(".next");

  tableState = highlightIndexBtn({ ...tableState, currentIndex });

  if (tableState.currentIndex > tableState.maxIndex - 1) {
    nextBtn?.classList.remove("act");
  } else {
    nextBtn?.classList.add("act");
  }

  if (tableState.currentIndex > 1) {
    prevBtn?.classList.add("act");
  }

  if (tableState.currentIndex < 2) {
    prevBtn?.classList.remove("act");
  }

  return { ...tableState, currentIndex };
}
