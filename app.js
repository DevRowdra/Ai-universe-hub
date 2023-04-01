// ------ toggleSpinner ----- 
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none');
  }
}

// ----------- load 6 data --------- 
const loadData = async () => {
  toggleSpinner(true)
   const url=  "https://openapi.programming-hero.com/api/ai/tools"
   const res= await fetch(url)
   const data= await  res.json()
   if(data){
    toggleSpinner(false)
   }

     getData(data.data.tools.slice(0, 6));
};

// ----------- load All data --------- 

const getData = (datas) => {
 
  
  const mainDiv = document.getElementById("main-card");
  const showAll = document.getElementById("see-more");
  if (datas.length < 7) {
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // datas.sort((a, b) => new Date(b.published_in) - new Date(a.published_in) )
  document.getElementById("main-card").innerHTML = "";
  datas.forEach((data) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("col");
    newDiv.innerHTML = `
    <div class="card h-100">
    <img src="${data.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h3 class="card-title">Features</h3>
      <ol>
      
      <li>${data.features[0]}</li>
      <li>${data.features[1]}</li>
      <li>${data.features[2] ? data.features[2] : "not available"}</li>
  </ol>
    </div>
    <div class="p-4">
    <h4 class="">${data.name}</h4>
    
    <div class="d-flex align-items-center justify-content-between mx-2">
    <div class="d-flex align-items-center">
    <i class="fa-solid fa-calendar-days "></i>
    <p class="m-2">${data.published_in}</p>
    </div>

    <div>
    <i class="fa-solid fa-arrow-right btn btn-danger rounded-pill " onclick="showDetails('${
      data?.id
    }')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
    </div>

    </div>


    </div>
  </div>
    `;
    mainDiv.appendChild(newDiv);
    toggleSpinner(false)
  });
};
// -------------Modal data Details----------------------
const showDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  

  const res= await fetch(url);
   const data= await res.json();
     showModal(data.data);
    console.log(id);
    
};
const showModal = (data) => {
  

  const mainDiv = document.getElementById("modal-body");
  

  mainDiv.innerHTML = `
<div class="d-flex gap-3 flex-column  flex-lg-row">

<div class="card" >
<div><h4 class="fs-5">${data.description}</h4></div>
<div class="card-body fw-semibold">
<div class="d-flex gap-5 align-items-center justify-content-around  ">
<div class="text-center"><p class="text-success ">${
    data.pricing ? data.pricing[0].plan : "no data"
  }</p>
<p class="text-success">${
    data.pricing ? data.pricing[0].price : "free of cost"
  }</p>
</div>
<div class="text-center"><p class="text-warning ">${
    data.pricing ? data.pricing[1].plan : "free of cost"
  }</p>
<p class="text-warning ">${
    data.pricing ? data.pricing[1].price : "free of cost"
  }</p>
</div>
<div class="text-center"><p class="text-danger">${
    data.pricing ? data.pricing[2].plan : "free of cost"
  }</p>
<p class="text-danger">${
    data.pricing ? data.pricing[2].price : "free of cost"
  }</p>
</div>
   
</div>
<div class="d-flex justify-content-between">
<div  >
    <h4 class="fw-bolder">Feature</h4>
    <ul>
    
        <li>${data.features[1].feature_name}</li>
        <li>${data.features[2].feature_name}</li>
        <li>${data.features[3].feature_name}</li>
       
        
    </ul>
</div>
<div >
    <h4 class="fw-bolder">Integrations</h4>
    <ul>
   ${ Array.isArray(data.integrations)  ?   data.integrations.map(a=> (`<li>${a}</li>`)).join("")   : 'No Data Found'}
   
  
    </ul>
</div>

</div>
  
</div>
</div>
<div class="card" style="">
${data.accuracy.score ? `<span class="badge text-bg-danger"id="score">${data.accuracy.score*100+'%accuracy'} </span>` : '' }


<div class="img-div">

<img src="${data.image_link[0]}" class="card-img-top img-fluid " alt="...">
</div>
<div class="card-body text-center">
  <h5 class="card-title">${data.input_output_examples ? data.input_output_examples[0].input : 'no data found'}</h5>
  <p class="card-text">${
    data.input_output_examples
      ? data.input_output_examples[0].output.slice(0, 60)
      : "No! Not Yet! Take a break!!!"
  } </p>
  
  
</div>
</div>
</div>

`;
};

const seeAllDataTogether = () => {
  toggleSpinner(true)
  fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then((res) => res.json())
  .then((data) => {
    toggleSpinner(false)
    getData(data.data.tools)
  });
};
const sortByDate = () =>{
  toggleSpinner(true)
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    toggleSpinner(false)
    let aiData = data?.data?.tools;
    aiData.sort((a, b) => new Date(b.published_in) - new Date(a.published_in) )
    getData(aiData)
  });
}
loadData();

