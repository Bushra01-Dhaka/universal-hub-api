const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const search = data.data.tools;

    displaySearch(search);
}

// SORT BY DATE functionality
const sortByDate = async() =>
{
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const search = data.data.tools;

    const sort =  search.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.published_in) - new Date(a.published_in);
      });

      displaySearch(sort);
   
}


const displaySearch = (searchs) => {
    
    // aicard container select
    const aiCardContainer = document.getElementById('ai-card-container');
    aiCardContainer.textContent = '';

    //display 6elements
    searchs.forEach(search => {
        console.log(search);


        // create 1 div
        const aiCard = document.createElement('div');
        aiCard.classList = `card  bg-slate-200 shadow-xl mb-8`;
        aiCard.innerHTML = `
        <figure class="p-4"><img class="rounded" src="${search.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title text-3xl font-semibold">Features</h2>
           
        
        <ol class="text-lg">
            <li>1. ${search.features[0]} </li>
            <li>2. ${search.features[1]} </li>
            <li>3. ${search.features[2]} </li>
        </ol>
        <hr class="my-2">

            <div class="flex flex-row justify-between">
                <div>
                <h3 class="text-2xl font-semibold">${search.name}</h3>
                <h4 class=" py-2"><i class="fa-solid fa-calendar-days text-[#33BBC5]"></i> ${search.published_in}</h4>
                </div>
                <button onclick="handleShowDetails('${search.id}')" class="btn"><i class="fa-solid fa-circle-arrow-right text-2xl text-[#33BBC5] "></i></button>
            </div>
        </div>
        `;

        aiCardContainer.appendChild(aiCard);

    });
}

const handleShowDetails = async (id) => {
    console.log('clicked show details', id);
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();

    const card_data = data.data;
    showcardDetails(card_data);
    console.log(card_data);

}

const showcardDetails = (data) => {


    const showDetailsContainerField = document.getElementById('show-details-container');
    showDetailsContainerField.innerHTML = `
    <div class="card w-[60%] border-solid border-rose-300 border-[2px] ">
       <p class="p-2 font-bold">${data.description}</p>
       <div class="flex flex-row justify-between items-center text-sm p-4 font-semibold">
            <p class="text-blue-600">$10/<br>month<br>Basic</p>
            <p class="text-lime-600">$50/<br>month<br>Pro</p>
            <p class="text-rose-600">Contact<br>us<br>Enterprise</p>
       </div>
        <div class="flex flex-row justify-between text-sm p-4 font-semibold gap-8">
            <div class="text-slate-500">
               <h3 class="text-lg text-black font-bold py-2">Features</h3>
               <p class="pb-2 text-[14px]"><i class=" fa-solid fa-circle text-[6px]  text-justify "></i> ${data?.features[1]?.feature_name}</p>
               <p class="pb-2 text-[14px]"><i class="fa-solid fa-circle text-[6px]  text-justify "></i> ${data?.features[2]?.feature_name}</p>
               <p class="pb-2 text-[14px]"><i class="fa-solid fa-circle text-[6px]  text-justify "></i> ${data?.features[3]?.feature_name}</p>
            </div>
            <div class="text-slate-500">
               <h3 class="text-black text-lg font-bold py-2">Integrations</h3>
               <p class="pb-2 text-[14px]"><i class="fa-solid fa-circle text-[6px]  text-justify "></i> ${data?.integrations[0]  || 'Not available'}</p>
               <p class="pb-2 text-[14px]"><i class="fa-solid fa-circle text-[6px] "></i> ${data?.integrations[1]  || 'Not available'}</p>
               <p class="text-[14px]"><i class="fa-solid fa-circle text-[6px]"></i> ${data?.integrations[2]  || 'Not available'}</p>
            </div>
       </div>
       
    </div>


    <div class="card w-[100%]">
        <img class="rounded h-[150px] md:h-[200px] lg:h-[200px]" src="${data.image_link[0]}">
         <div class=" p-2">
           <h3 class="mt-6 text-lg text-black  font-bold text-center">${data?.input_output_examples[1]?.input}</h3>
            <p class="mt-4 text-slate-500 text-sm text-center">${data?.input_output_examples[1]?.output}</p>
         </div>
    </div>
    `;

    show_details_model.showModal();
}








loadData();