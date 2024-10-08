import Dashboard from "./components/dashboard/dashboard.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id='dashboard'></div>`;

Dashboard(document.querySelector<HTMLDivElement>("#dashboard")!);
