const getPhoneData = async (searchText = "13", showAll) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await response.json();
  //   Individual Phone Data
  const phones = data.data;
  phoneCard(phones, showAll);
};

const phoneCard = (phones, showAll) => {
  //   console.log(phones);
  console.log(phones.length);

  const searchError = document.getElementById("search-error");
  if (phones.length === 0) {
    searchError.classList.remove("hidden");
  } else {
    searchError.classList.add("hidden");
  }

  // Show all a je click kora hoice setar information asce kina check korte
  //   console.log("This is show all from search " + showAll);
  //

  // Conditionally show the show all button
  const showAllButton = document.getElementById("show-all");
  if (phones.length > 12 && !showAll) {
    showAllButton.classList.remove("hidden");
  } else showAllButton.classList.add("hidden");

  if (!showAll) {
    phones = phones.slice(0, 12);
  }

  const phoneCardContainer = document.getElementById("phone-card-container");
  //   Clear before search result
  phoneCardContainer.textContent = "";
  phones.forEach((phone) => {
    const phoneCardDiv = document.createElement("div");
    // This is not correct method to add classlist
    // phoneCardDiv.classList = "card bg-base-100 border shadow-sm hover:shadow";
    phoneCardDiv.classList.add(
      "card",
      "bg-base-100",
      "border",
      "Shadow-sm",
      "hover:shadow"
    );
    phoneCardDiv.innerHTML = `
      <figure class="mt-5" ><img src=" ${phone.image} " alt="Shoes" /></figure>
      <div class="card-body space-y-1">
          <h2 class="text-2xl font-bold text-center">
              ${phone.phone_name}
          </h2>
          <p class="text-center">There are many variations of passages of available, but the majority
              have suffered
          </p>
          <p class="text-xl font-semibold text-center">$999</p>
          <div class="text-center">
              <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-outline btn-success">Show Details</button>
          </div>
      </div>
      `;
    phoneCardContainer.appendChild(phoneCardDiv);
  });
  handleSpinner(false);
};

// search handle

const handleSearch = (showAll) => {
  handleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   Send the input filed text to that function who call the API
  getPhoneData(searchText, showAll);
};

// Handle Spinner

const spinnerContainer = document.getElementById("spner-container");
const handleSpinner = (isSpinner) => {
  if (isSpinner) {
    spinnerContainer.classList.remove("hidden");
  } else {
    spinnerContainer.classList.add("hidden");
  }
};

// Handle Show All Button
const showAllButton = document.getElementById("show-all");
const handleShowAll = () => {
  handleSearch(true);
};

// Handle Show Details Button

const handleShowDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const phoneData = data.data;
  console.log(phoneData);

  const showModal = document.getElementById("show_modeal");
  showModal.classList.add("modal");
  showModal.innerHTML = `
    <form method="dialog" class="modal-box ">
    <div class= "flex justify-center py-5 bg-sky-100 rounded-md">
    <img src=" ${phoneData.image} "></img>
    </div>
    <div class="mt-2 space-y-2">
        <h3 class="font-bold text-lg"> ${phoneData.name} </h3>
        <p class="text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p> <span class= "text-base font-semibold">Storage:  </span>${
          phoneData.mainFeatures.storage
        }</p>
        <p> <span class= "text-base font-semibold">Display Size: </span>${
          phoneData.mainFeatures.displaySize
        } </p>
        <p> <span class= "text-base font-semibold">Chipset: </span>${
          phoneData.mainFeatures.chipSet
        } </p>
        <p> <span class= "text-base font-semibold">Memory: </span>${
          phoneData.mainFeatures.memory
        } </p>
        <p> <span class= "text-base font-semibold">Slug: </span>${
          phoneData.slug
        } </p>
        <p> <span class= "text-base font-semibold">Release data: </span>${
          phoneData.releaseDate ? phoneData.releaseDate : "Date Not Found"
        } </p>
        <p> <span class= "text-base font-semibold">Brand: </span> ${
          phoneData.brand
        }</p>
        <p> <span class= "text-base font-semibold">GPS: 
         </span> ${
           phoneData.others?.GPS ? phoneData.others?.GPS : "GPS Not Found"
         }</p>
    </div>
    <div class="modal-action">
        <button class="btn btn-error">Close</button>
    </div>
    </form>
    `;

  //   Daisy UI JS
  show_modeal.showModal();
};

getPhoneData();
