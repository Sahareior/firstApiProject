function loadAi(isClicked) {
  
    toggleSpinner(true)
    
    
      url = "https://openapi.programming-hero.com/api/ai/tools";
      fetch(url)
     
        .then((res) => res.json())
        .then((data) => sortingData(data.data.tools,isClicked));
        
      
    }
  
    // function to sort data.........................................
  
    const mainContainer = document.getElementById("container");
  
  const sortingData =(datas, isClicked) =>{
    
    if(isClicked === 2){
      
      let data = datas.sort((date1, date2) => new Date (date1.published_in) - new Date (date2.published_in));
      
      
      mainContainer.innerHTML = ''
      return showData(data,isClicked)
      
    
      
    }
    else{
      showData(datas, isClicked)
   
    }
   
   
    
    
  }
  
  const showData = (tools,isClicked) => {
    console.log(isClicked)
    
   
    const  showAll = document.getElementById('footer')
    
       
    
      // setting up conditions to see 6 data per api calls

      if(isClicked === 4 ){
        mainContainer.innerHTML = ''
        tools = tools
        showAll.classList.add('d-none')
        
      }
      else if(isClicked ===2){
        tools = tools
        showAll.classList.add('d-none')
      }
     
      else{
        
       
        showAll.classList.remove('d-none')
      tools = tools.slice(0,6)
      }
      
  
    
    
  
  //   mapping the array..........................................
  
    tools.map((tool) => {
  
  
      const { name, description, image, published_in } = tool;
  
      const myDiv = document.createElement("div");
  
      myDiv.classList.add("col");
  
      myDiv.innerHTML = `
          <div class="card h-100">
      <img src=${image} class="card-img-top" alt="...">
      <div class="card-body d-flex justify-content-between flex-column">
        <h5 class="card-title">Features</h5>
        <p class="card-text">${description ? description : "no data found"}</p>
        <div class="card-footer">
        <h2>${name}</h2>
        <div class='d-flex justify-content-between'>
        <i class="bi bi-calendar">${published_in}</i> 
        <button onclick="loadAiDetails('${tool.id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#dataDetailModal">Show Details</button>
               </div>   
      </div>
      </div>
    </div>
          `;
  
      mainContainer.appendChild(myDiv);
      toggleSpinner(false)
  
  
    });
  };
  
  

 
  
  


  const sort =2;
  const lmore = 4;
  function onClick (sort , lmore){
    const verify = sort? sort : lmore 
      loadAi(verify)
  }
  
  document.getElementById('sort').addEventListener('click', function(){
       onClick(2)
       })
    
       document.getElementById('loadMore').addEventListener('click', function(){
        onClick(4)
       })
   
  
      // toggle....................................................
  
      const toggleSpinner = isLoading => {
        const loaderSection = document.getElementById('loader');
        if(isLoading){
            loaderSection.classList.remove('d-none')
        }
        else{
            loaderSection.classList.add('d-none');
        }
    }
    
  
   
    loadAi();
  
  
  
  // Ai details.................................................
  
  const loadAiDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayAiDetails(data.data);
  }
  const displayAiDetails =data =>{
    console.log(data);
    const dataDetails = document.getElementById('data-details');
  
    // putting data into the modal..............................................
    
    dataDetails.innerHTML = `
    <div class="row ">
    <div class="col-sm-6 " >
      <div class="card" style="height: 29rem;">
        <div class="card-body d-flex justify-content-between flex-column">
          <h5 class="card-title">${data.description}</h5>
          <!-- small cards -->
          <div class="row pt-4">
            <div class="col-sm-4">
                <div class="card" style="width: 7.8rem; height: 8rem;">
                    
                    <div class="card-body d-flex justify-content-between flex-column">
                      
                      <p class="card-text text-success fw-bold">${data.pricing[0].price}</p>
                      <p class="card-text text-success fw-bold"> ${data.pricing[0].plan} </p>
                      
                    </div>
                  </div>
            </div>
            <div class="col-sm-4">
                <div class="card" style="width: 7.8rem; height: 8rem;">
                    
                    <div class="card-body d-flex justify-content-between flex-column">
                      
                    <p class="card-text text-warning fw-bold">${data.pricing[1].price}</p>
                    <p class="card-text text-warning fw-bold"> ${data.pricing[1].plan} </p>
                    </div>
                  </div>
            </div>
            <div class="col-sm-4">
                <div class="card" style="width: 7.6rem; height: 8rem;">
                    
                    <div class="card-body d-flex justify-content-between flex-column">
                    <p class="card-text text-danger fw-bold">${data.pricing[2].price}</p>
                    <p class="card-text text-danger fw-bold"> ${data.pricing[2].plan} </p>
                    </div>
                  </div>
            </div>
            <!--  -->
          </div>
        <div class="d-flex justify-content-between mt-1" style="gap: 40px;">
         <h2>Feature</h2>
         <h2>intregetions</h2>
         </div>
         <!-- 2 -->
         <div class="d-flex justify-content-around">
  
            <div class="card" style="width: 11rem; height: 13rem;">
                
                <div class="card-body d-flex justify-content-between flex-column">
                  <ul>
                  <li>${data.features[1].feature_name}</li>
                  <li>${data.features[2].feature_name}</li>
                  <li>${data.features[3].feature_name}</li>
                  </ul>
                 
                </div>
              </div>
              <div class="card" style="width: 11rem; height: 13rem;">
              
                <div class="card-body">
                <ul>
                  <li>${data.integrations[0]}</li>
                  <li>${data.integrations[1]}</li>
                  <li>${data.integrations[2]}</li>
                </ul>
                 
                </div>
              </div>
  
         </div>
         
         </div>
  
        </div>
        </div>
      
  
    
    <div class="col-sm-6 ">
      <div class="card">
      <p class ="bg-danger w-50 rounded-3 text-white text-center" style = 'margin-left:11rem; margin-top:1rem;' >${data.accuracy.score?data.accuracy.score:"invalid data"} Accuracy</p>
        <img src=${data.image_link[0]} class="card-img-top" alt="...">
        <div class="card-body d-flex justify-content-between flex-column">
          <h1>${data.input_output_examples[0].input} </h1>
          <p>${data.input_output_examples[0].output} </p>
          
        </div>
      </div>
    </div>
  </div> 
    `
  }
  loadAiDetails()
  