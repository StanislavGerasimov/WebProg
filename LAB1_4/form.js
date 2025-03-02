// form.js

// Function to save form data to localStorage in JSON and XML formats
function saveDataToFile() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const middleName = document.getElementById("middleName").value;
  const previousSchool = document.getElementById("previousSchool").value;
  const faculty = document.getElementById("faculty").value;

  // Create a data object
  const formData = {
    firstName,
    lastName,
    middleName,
    previousSchool,
    faculty,
  };

  // Save data to localStorage as JSON
  let savedData = JSON.parse(localStorage.getItem("formData")) || [];
  savedData.push(formData);
  localStorage.setItem("formData", JSON.stringify(savedData));

  // Save data to localStorage as XML
  const xmlData = createXMLData(formData);
  let savedXMLData =
    localStorage.getItem("formXMLData") || "<records></records>";
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(savedXMLData, "application/xml");
  const records = xmlDoc.getElementsByTagName("records")[0];
  records.appendChild(xmlData);
  localStorage.setItem(
    "formXMLData",
    new XMLSerializer().serializeToString(xmlDoc)
  );

  alert("Дані збережено!");
  displayData();
}

// Function to create XML data from form data
function createXMLData(formData) {
  const record = document.createElement("record");

  for (const key in formData) {
    const element = document.createElement(key);
    element.textContent = formData[key];
    record.appendChild(element);
  }

  return record;
}

// Function to read data from localStorage (JSON)
function readDataFromJSON() {
  const savedData = JSON.parse(localStorage.getItem("formData")) || [];
  displayData(savedData);
}

// Function to read data from localStorage (XML)
function readDataFromXML() {
  const savedXMLData =
    localStorage.getItem("formXMLData") || "<records></records>";
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(savedXMLData, "application/xml");
  const records = xmlDoc.getElementsByTagName("record");
  const data = [];

  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const recordData = {};
    for (let j = 0; j < record.children.length; j++) {
      const field = record.children[j];
      recordData[field.nodeName] = field.textContent;
    }
    data.push(recordData);
  }

  displayData(data);
}

// Function to display form data in the list
function displayData(data = []) {
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = "<h2>Збережені записи:</h2>"; // Clear existing content

  if (data.length === 0) {
    dataList.innerHTML += "<p>Немає збережених записів.</p>";
    return;
  }

  data.forEach((entry, index) => {
    const dataItem = document.createElement("div");
    dataItem.className = "data-item";

    // Create the data details display
    dataItem.innerHTML = `
      <p><strong>Ім'я:</strong> ${entry.firstName}</p>
      <p><strong>Прізвище:</strong> ${entry.lastName}</p>
      <p><strong>По батькові:</strong> ${entry.middleName}</p>
      <p><strong>Попереднє місце навчання:</strong> ${entry.previousSchool}</p>
      <p><strong>Факультет:</strong> ${entry.faculty}</p>
    `;

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Видалити";
    deleteButton.onclick = () => deleteRecord(index); // Delete the record on click

    dataItem.appendChild(deleteButton);
    dataList.appendChild(dataItem);
  });
}

// Function to delete a specific record from localStorage (by index)
function deleteRecord(index) {
  let savedData = JSON.parse(localStorage.getItem("formData")) || [];
  savedData.splice(index, 1); // Remove the record at the given index
  localStorage.setItem("formData", JSON.stringify(savedData));

  const savedXMLData =
    localStorage.getItem("formXMLData") || "<records></records>";
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(savedXMLData, "application/xml");
  const records = xmlDoc.getElementsByTagName("record");
  records[index].parentNode.removeChild(records[index]);

  localStorage.setItem(
    "formXMLData",
    new XMLSerializer().serializeToString(xmlDoc)
  );

  displayData(savedData); // Refresh the list
}

// Event listener to handle form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting
  saveDataToFile();
});

// Button to load data from JSON
document
  .getElementById("loadJSONData")
  .addEventListener("click", readDataFromJSON);

// Button to load data from XML
document
  .getElementById("loadXMLData")
  .addEventListener("click", readDataFromXML);

// Initial load
displayData(); // Load the existing data when the page is loaded
