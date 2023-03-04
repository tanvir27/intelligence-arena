// store all the data here
let allData = [];

// fetch the api
const loadData = () => {
  // start loader before show the data
  toggleSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then((res) => res.json())
    .then((data) => displayAiData(data.data.tools));
};

// display all data using this function
const displayAiData = (aiDatas) => {
  // start loader before show the data
  // toggleSpinner(true);
  const aiDataContainer = document.getElementById("aiData_container"); // get the container by id
  // aiDataContainer.textContent ='';
  allData = aiDatas;
  // console.log(allData);
  aiDatas = aiDatas.slice(0, 6);
  // console.log(allData);
  aiDatas.forEach((aiData) => {
    const aiDataDiv = document.createElement("div");
    aiDataDiv.classList.add("col");
    // set innerHtml to show the aiData in dsiplay
    aiDataDiv.innerHTML = `
        <div class="card h-100">
        <img src="${
          aiData.image
        }" class="card-img-top rounded img-fluid p-3" alt="...">
        <div class="card-body">
          <h5 class="card-title fs-3 fw-bold">Features</h5>
          <p class="card-text">
          <ol class="list-group list-group-numbered ">
          ${featuresItemShow(aiData.features)}
              </ol>
          </p>
        </div>
        <hr class="mx-3">
        <div class="px-3 pb-3 d-flex justify-content-between">
            <div>
                <h5 class="card-title fs-4 fw-bold">${aiData.name}</h5>
               
                ${formateDate(aiData.published_in)}
            </div>
           <div class="pt-3 ">
           <button id="" data-bs-toggle="modal" data-bs-target="#exampleModal"  class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" onclick="loadModalDetails('${
             aiData.id
           }')"> <i class="fa-solid fa-arrow-right "></i></button>
           </div>
        </div>
      </div>
            `;
    //  append child the aiData container div
    aiDataContainer.appendChild(aiDataDiv);
  });
  // loader stop after show the data
  toggleSpinner(false);
};

// see more button function starts here
document.getElementById("see_more_btn").addEventListener("click", function () {
  // start spinner when click see more button
  toggleSpinner(true);
  // console.log(allData);
  const aiDataContainer = document.getElementById("aiData_container");
  aiDataContainer.innerHTML = "";
  allData.forEach((aiData) => {
    const aiDataDiv = document.createElement("div");
    aiDataDiv.classList.add("col");
    // set innerHtml to show the aiData in dsiplay
    aiDataDiv.innerHTML = `
      <div class="card h-100">
      <img src="${
        aiData.image
      }" class="card-img-top rounded img-fluid p-3" alt="...">
      <div class="card-body">
        <h5 class="card-title fs-3 fw-bold">Features</h5>
        <p class="card-text">
        <ol class="list-group list-group-numbered ">
        ${featuresItemShow(aiData.features)}
            </ol>
        </p>
      </div>
      <hr class="mx-3">
      <div class="px-3 pb-3 d-flex justify-content-between">
          <div>
              <h5 class="card-title fs-4 fw-bold">${aiData.name}</h5>
            
              ${formateDate(aiData.published_in)}
          </div>
         <div class="pt-3 ">

         <button id="" data-bs-toggle="modal" data-bs-target="#exampleModal" class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" onclick="loadModalDetails('${
           aiData.id
         }')"> <i class="fa-solid fa-arrow-right "></i></button>
         </div>
      </div>
    </div>
          `;

    //  append child the container div
    aiDataContainer.appendChild(aiDataDiv);
  });
  // for not showing see more button after click thhis button
  document.getElementById("see_more_btn").classList.add("d-none");
  // stop loader when append all card
  toggleSpinner(false);
});

// list item get by dynamically orderd list in normal card section
const featuresItemShow = (feature) => {
  let featureItem = "";
  for (let i = 0; i < feature.length; i++) {
    featureItem += `<li class="list-group-item border-0">${feature[i]}</li>`;
  }
  return featureItem;
};

// loader or spinner function for loading before show the data
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// sorting data card by date
document.getElementById("sorting_btn").addEventListener("click", function () {
  toggleSpinner(true);
  allData.sort(function (a, b) {
    var dateA = new Date(a.published_in);
    var dateB = new Date(b.published_in);
    return dateA - dateB;
  });

  const aiDataContainer = document.getElementById("aiData_container");
  aiDataContainer.innerHTML = "";

  allData.forEach((aiData) => {
    const aiDataDiv = document.createElement("div");
    aiDataDiv.classList.add("col");
    // set innerHtml to show the aiData in dsiplay
    aiDataDiv.innerHTML = `
    <div class="card h-100">
    <img src="${
      aiData.image
    }" class="card-img-top rounded img-fluid p-3" alt="...">
    <div class="card-body">
      <h5 class="card-title fs-3 fw-bold">Features</h5>
      <p class="card-text">
      <ol class="list-group list-group-numbered ">
      ${featuresItemShow(aiData.features)}
          </ol>
      </p>
    </div>
    <hr class="mx-3">
    <div class="px-3 pb-3 d-flex justify-content-between">
        <div>
            <h5 class="card-title fs-4 fw-bold">${aiData.name}</h5>
             ${formateDate(aiData.published_in)}
       
        </div>
       <div class="pt-3 ">

       <button id="" data-bs-toggle="modal" data-bs-target="#exampleModal" class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" onclick="loadModalDetails('${
         aiData.id
       }')"> <i class="fa-solid fa-arrow-right "></i></button>

       </div>
    </div>
  </div>
        `;

    //  append child the container div
    aiDataContainer.appendChild(aiDataDiv);
  });
  toggleSpinner(false);
  document.getElementById("see_more_btn").classList.add("d-none");
});

// modal section fetch using async
const loadModalDetails = async (id) => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayModalDetails(data.data);
};

//declare globally variable
let dataItem = 0;
// display modal details
const displayModalDetails = (data) => {
  // console.log(data);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <div class="container-fluid">
  <div class="row g-4 m-auto">
    <div class="col-sm-12 col-md-6 ">
      <div class="p-3  border bg-light rounded-4">
        <p class="fs-3 fw-bold"> ${data.description} </p>

        <div class="row g-2 text-center">
          <div class="col-sm-12 col-md-4  ">
            <div class="p-3 text-success fw-bold border bg-light rounded-4">
            ${pricingShow(data.pricing, (dataItem = 0))}
            </div>
          </div>

          <div class="col-sm-12 col-md-4 ">
            <div class="p-3 text-warning fw-bold border bg-light rounded-4">
            ${pricingShow(data.pricing, (dataItem = 1))}
            </div>
          </div>

          <div class="col-sm-12 col-md-4 ">
            <div class="p-3 text-success fw-bold border bg-light rounded-4">
            ${pricingShow(data.pricing, (dataItem = 2))}
            </div>
          </div>

        </div>
        <div class="row g-2 m-auto text-start">
          <div class="col-sm-12 col-md-6 ">
            <div class="p-3  bg-light rounded-4">
              <p class="fw-bold fs-3">Features</p>
              <ul>
              ${modalFeaturesShow(data.features)}
              </ul>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 ">
            <div class="p-3  bg-light rounded-4">
              <p class="fw-bold fs-3">Integrations</p>
             
             <ul> ${integrationsItemShow(data.integrations)} </ul> 
            </div>

          </div>

        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 mb-3 ">
      <div class="p-3 bg-light rounded-4 ">
        <div class="card" >

          <div class="" >
            <img src="${
              data.image_link[0]
            }" class="image-size card-img-top img-fluid rounded-5 p-3" alt="..." >
           <div class="">
            ${modalAccuracyShow(data.accuracy.score)}
           </div>

          </div>
          <div class="card-body text-center">
          ${inputOutputShow(data.input_output_examples)}
          </div>
        </div>
      </div>
    </div>

  </div>

</div>
  `;
  // stop loader
  toggleSpinner(false);
};

//  date formatting functions
const formateDate = (formate_date) => {
  let featureDate = "";
  if (formate_date == null) {
    featureDate += `<p> <i class="fa-solid fa-calendar-days"></i>Not Found Anything</p>`;
  } else {
    // parse the date in string
    const date = new Date(formate_date);
    // format the date
    const formatedDate = date.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // day: "numeric",
    });
    featureDate += `<p> <i class="fa-solid fa-calendar-days"></i> ${formatedDate}</p>`;
  }
  return featureDate;
};

// modal pricing show
const pricingShow = (pricingData, items) => {
  let featurePricing = "";
  if (pricingData == null) {
    featurePricing = `<p class="text-center m-3 ">Data not Available</p>`;
  } else {

    if(pricingData[items].price == 0){
      featurePricing = ` <p class="text-center m-3 ">Free Cost <br>
      ${pricingData[items].plan}</p>`;
    }
    else{
      featurePricing = ` <p class="text-center m-3 ">${pricingData[items].price} <br> ${pricingData[items].plan}</p>`;
    }
  }
  return featurePricing;
};

// modal input ouput show
const inputOutputShow = (modalInputOutput) => {
  let featureInputOutput = "";
  if (modalInputOutput == null) {
    featureInputOutput = ` <h5 class="card-title fw-bold">Sorry!! No Question Available</h5>
      <p class="card-text">No! Not Yet! Take a break!!!</p>`;
  } else {
    featureInputOutput = ` <h5 class="card-title fw-bold">${modalInputOutput[0].input}</h5>
      <p class="card-text">${modalInputOutput[0].output}</p>`;
  }
  return featureInputOutput;
};

//  modalFeatures function for features show in modal
const modalFeaturesShow = (modalfeature) => {
  let featureItem = "";
  Object.keys(modalfeature).forEach((data) => {
    featureItem += `<li class="text-muted">${modalfeature[data].feature_name}</li>`;
  });

  return featureItem;
};

// modal integrations show
const integrationsItemShow = (integrations) => {
  let integrationsItem = "";
  if (integrations !== null) {
    for (let i = 0; i < integrations.length; i++) {
      integrationsItem += `<li>${integrations[i]}</li>`;
    }
  } else {
    integrationsItem += `<li>Data not Found</li>`;
  }

  return integrationsItem;
};

// modal accuracy function for fixing null values
const modalAccuracyShow = (accuracy) => {
  let modalAccuracy = "";
  if (accuracy === null) {
    modalAccuracy = "";
  } else {
    modalAccuracy = `<button class="position_accuracy_btn bg-danger border-0 rounded-3 text-white" style="position: relative; bottom: 210px; left: 350px;"> <span> ${
      accuracy * 100
    }% </span> accuracy</button>`;
  }
  return modalAccuracy;
};
// call the function
loadData();
