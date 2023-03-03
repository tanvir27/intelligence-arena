let allData = [];
// fetch the api 
const loadData = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => displayAiData((data.data.tools)))
};

// display all data using this function
const displayAiData = (aiDatas) => {
  // start loader before show the data
  toggleSpinner(true);
    const aiDataContainer = document.getElementById("aiData_container"); // get the container by id
    // aiDataContainer.textContent ='';
    allData = aiDatas;
    // console.log(allData);
    aiDatas = aiDatas.slice(0,6);
    // console.log(allData);
    aiDatas.forEach((aiData) => {
        const aiDataDiv = document.createElement("div");
        aiDataDiv.classList.add("col");
        // set innerHtml to show the aiData in dsiplay
        aiDataDiv.innerHTML = `
        <div class="card h-100">
        <img src="${aiData.image}" class="card-img-top rounded img-fluid p-3" alt="...">
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
                <span><i class="fa-regular fa-calendar-days"></i> </span>
            <span>${aiData.published_in}</span>
            </div>
           <div class="pt-3 ">
           <button id="" data-bs-toggle="modal" data-bs-target="#exampleModal"  class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" onclick="loadModalDetails('${aiData.id}')"> <i class="fa-solid fa-arrow-right "></i></button>
           </div>
        </div>
      </div>
            `;
        //  append child the aiData container div
        aiDataContainer.appendChild(aiDataDiv);
      });
      // loader stop after show the data
      toggleSpinner(false);
}

document.getElementById('see_more_btn').addEventListener('click', function(){
  // start spinner when click see more button
    toggleSpinner(true);
    // console.log(allData);
    const aiDataContainer = document.getElementById("aiData_container");
    aiDataContainer.innerHTML ='';
    allData.forEach((aiData) => {
      const aiDataDiv = document.createElement("div");
      aiDataDiv.classList.add("col");
      // set innerHtml to show the aiData in dsiplay
      aiDataDiv.innerHTML = `
      <div class="card h-100">
      <img src="${aiData.image}" class="card-img-top rounded img-fluid p-3" alt="...">
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
              <span><i class="fa-regular fa-calendar-days"></i> </span>
          <span>${aiData.published_in}</span>
          </div>
         <div class="pt-3 ">

         <button id="" data-bs-toggle="modal" data-bs-target="#exampleModal" class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" onclick="loadModalDetails('${aiData.id}')"> <i class="fa-solid fa-arrow-right "></i></button>
         </div>
      </div>
    </div>
          `;
  
      //  append child the container div
      aiDataContainer.appendChild(aiDataDiv);
    });
    // for not showing see more button after click thhis button
    document.getElementById('see_more_btn').classList.add('d-none');
    // stop loader when append all card
    toggleSpinner(false);
    
})


// const allInnerData = (aiData,aiDataContainer) =>{

// }


// list item get by dynamically orderd list
const featuresItemShow = feature =>{
  let featureItem ='';
  for(let i=0;i<feature.length;i++){
    featureItem += `<li class="list-group-item border-0">${feature[i]}</li>`
  }
  return featureItem;
}

 // loader part 
 const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
      loaderSection.classList.remove("d-none");
    } else {
      loaderSection.classList.add("d-none");
    }
  };

  // sorting data card by date
  document.getElementById("sorting_btn").addEventListener('click',function(){
   
    allData.sort(function(a, b) {
        var dateA = new Date(a.published_in);
        var dateB = new Date(b.published_in);
        return dateA - dateB;
      }); 
    //  start loder
    toggleSpinner(true)
   const aiDataContainer = document.getElementById('aiData_container')
   aiDataContainer.innerHTML=''
   
   allData.forEach((aiData) => {
    const aiDataDiv = document.createElement("div");
    aiDataDiv.classList.add("col");
    // set innerHtml to show the aiData in dsiplay
    aiDataDiv.innerHTML = `
    <div class="card h-100">
    <img src="${aiData.image}" class="card-img-top rounded img-fluid p-3" alt="...">
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
            <span><i class="fa-regular fa-calendar-days"></i> </span>
        <span>${aiData.published_in}</span>
        </div>
       <div class="pt-3 ">

       <button id="" data-bs-toggle="modal" data-bs-target="#exampleModal" class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" onclick="loadModalDetails('${aiData.id}')"> <i class="fa-solid fa-arrow-right "></i></button>

       </div>
    </div>
  </div>
        `;

    //  append child the container div
    aiDataContainer.appendChild(aiDataDiv);
  });
  toggleSpinner(false)
   document.getElementById('see_more_btn').classList.add('d-none')
})

loadData();

// modal section 
const loadModalDetails = id => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
  .then(res => res.json())
  .then(data => displayModalDetails((data.data)))
};

const displayModalDetails =(data) =>{
  // console.log(data);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
  <div class="container-fluid">
  <div class="row g-4 m-auto">
    <div class="col-sm-12 col-md-6 ">
      <div class="p-3  border bg-light rounded-4">
        <p class="fs-3 fw-bold"> ${data.description} </p>

        <div class="row g-2 text-center">
          <div class="col-sm-12 col-md-4  ">
            <div class="p-3 border bg-light rounded-4">
            <p class="text-success fw-bold">  ${data.pricing[0].price} <br> ${data.pricing[0].plan}</p>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 ">
            <div class="p-3 border bg-light rounded-4">
             <p class="text-warning fw-bold">${data.pricing[1].price} <br> ${data.pricing[1].plan}</p>
            </div>
          </div>

          <div class="col-sm-12 col-md-4 ">
            <div class="p-3 border bg-light rounded-4">
             <p class="text-success fw-bold"> ${data.pricing[2].price} <br> ${data.pricing[2].plan}</p>
            </div>
          </div>

        </div>
        <div class="row g-2 m-auto text-start">
          <div class="col-sm-12 col-md-6 ">
            <div class="p-3  bg-light rounded-4">
              <p class="fw-bold fs-3">Features</p>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 ">
            <div class="p-3  bg-light rounded-4">
              <p class="fw-bold fs-3">Integrations</p>
            </div>

          </div>

        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 mb-3 ">
      <div class="p-3 bg-light rounded-4 ">
        <div class="card" >

          <div class="" >
            <img src="${data.image_link[0]}" class="card-img-top img-fluid rounded-5 p-3" alt="..." >
           <div class="">
            <button class="position_accuracy_btn bg-danger border-0 rounded-3 text-white" style="position: relative; bottom: 320px; left: 350px;"> <span> ${data.accuracy.score} </span> accuracy</button>
           </div>

          </div>
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">${data.input_output_examples[0].input}</h5>
            <p class="card-text">${data.input_output_examples[0].output}</p>
          </div>

        </div>
      </div>
    </div>

  </div>

</div>
  `
}