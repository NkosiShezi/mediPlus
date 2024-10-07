export const addStyle = (filePath: string) => {
  console.log("filePath", filePath);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = filePath;

  // Append the link element to the head
  document.head.appendChild(link);
};
