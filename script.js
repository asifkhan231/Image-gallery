const accesskey = 'HQWpX8bAShdDrcnzLxeomlUlKYlAXRuOnUjMU1mWszo'
const input = document.getElementById('searchForm')
const inpButton = document.getElementById('searchButton')
const form = document.querySelector('form')
const showButton = document.querySelector('.show-more')
const searchResults = document.querySelector('.searchResults')
const btnReload = document.getElementById('reload')
let inputData = ''
let page = 1;
async function searchItem() {
   inputData = input.value;
   if(inputData === ''){
      inputData = 'random'
   }
   const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`);
   const data = await response.json();
   
   const results = data.results

   if (page === 1) {
      searchResults.innerHTML = ''
   };

   results.map((res) => {
      let imageContainer = document.createElement('div')
      imageContainer.classList.add('searchResult')
      let image = document.createElement('img')
      image.src = res.urls.small
      image.alt = res.alt_description
      let imageLink = document.createElement('a')
      imageLink.href = res.links.html
      imageLink.target = '_blank'
      imageLink.textContent = res.alt_description

      imageContainer.appendChild(image)
      imageContainer.appendChild(imageLink)
      searchResults.appendChild(imageContainer)


   });
   page++;
   if(page > 1){
     showButton.style.display = 'block'
   }
}

form.addEventListener('submit', (event) => {
   event.preventDefault();
   page = 1;
   searchItem()
})

showButton.addEventListener('click',()=>{
  
   searchItem()
})


function handleClick() {
   window.location.reload();
 }

 btnReload.addEventListener('click',handleClick)