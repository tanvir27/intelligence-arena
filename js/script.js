const loadData = () => {
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => displayAiData((data.data.tools)))
};

loadData();

const displayAiData = (aiDatas) => {
    const aiDataContainer = document.getElementById("aiData_container"); // get the container by id

    aiDatas.forEach((aiData) => {
        const aiDataDiv = document.createElement("div");
        aiDataDiv.classList.add("col");
        // set innerHtml otherwise we cant show the aiData in dsiplay
        aiDataDiv.innerHTML = `
        <div class="card h-100">
        <img src="${aiData.image}" class="card-img-top img-fluid p-3" alt="...">
        <div class="card-body">
          <h5 class="card-title fs-3 fw-bold">Features</h5>
          <p class="card-text">
           <p>${aiData.features[0]}</p>
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
}

 