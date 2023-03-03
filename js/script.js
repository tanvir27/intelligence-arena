let allData = [];
// fetch the api 
const loadData = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => displayAiData((data.data.tools)))
};

// display all data using this function
const displayAiData = (aiDatas) => {
  // toggleSpinner(true);
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
           <button id="" class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" onclick=""> <i class="fa-solid fa-arrow-right "></i></button>
           </div>
        </div>
      </div>
            `;
        //  append child the aiData container div
        aiDataContainer.appendChild(aiDataDiv);
      });
      // loader stopp 
      // toggleSpinner(false);
}

document.getElementById('see_more_btn').addEventListener('click', function(){
  // start spinner when click see more button
    toggleSpinner(true);
    console.log(allData);
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
         <button id="" class="border-0 rounded-circle text-danger text-bg-danger bg-opacity-25" onclick=""> <i class="fa-solid fa-arrow-right "></i></button>
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

loadData();