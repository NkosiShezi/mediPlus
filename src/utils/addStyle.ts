export const addStyle = (filePath: string) => {
  console.log("filePath", filePath);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = filePath;

  document.head.appendChild(link);
};
