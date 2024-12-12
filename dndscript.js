const dndRacesUrl = "https://www.dnd5eapi.co/api/races"; 
const dndSpellsUrl ="https://www.dnd5eapi.co/api/spells";

const output = document.getElementById('output');
const spellsOutput = document.getElementById('spellsOutput');
const sortType = document.getElementById('sortType');
const sortLevel = document.getElementById('sortLevel');


  function fetchData(dndRacesUrl){
    output.innerHTML = '';  // Clear previous content
    fetch(dndRacesUrl)
    .then(response => response.json())
    .then(species => species.results.forEach(speciesItem => {
        output.innerHTML += `
        <div class="dnd-item">
            <div class="image-mask">
            <a href="details.html?type=races&id=${speciesItem.index}"><img src="public/images/${speciesItem.name}.jpg"></a> 
            </div>
          <p>${speciesItem.name}</p> 
        </div>
        `

    }))
    .catch((error) => console.error('Something went wrong', error));
  }

  fetchData(dndRacesUrl);  

  let allSpells = [];

  function fetchSpells(dndSpellsUrl) {
    fetch(dndSpellsUrl)
    .then(response => response.json())
    .then(spells => spells.results
      .sort((a, b) => a.level - b.level)
      .forEach(spellItem => {

        const baseUrl = 'https://www.dnd5eapi.co';

        fetch(`${baseUrl}${spellItem.url}`)
        .then(response => response.json())
        .then(spellDetails => {
          let damageType = "Utility"; // Default value for spells without damage

          if (spellDetails.damage && spellDetails.damage.damage_type) {
              damageType = spellDetails.damage.damage_type.index;
          }

            spellsOutput.innerHTML += `
            <div class="spell-item">
                <a href="spellDetails.html?type=spells&id=${spellDetails.index}"><img src="public/icons/damage/${damageType}.svg" alt="${damageType}"></a>
                <b><p>${spellItem.name}</p></b> 
                <p>Type: ${damageType}</p>
                <p>Level: ${spellItem.level}</p>
            </div>
            `;
        });

      })
    )
    .catch((error) => console.error('Something went wrong', error));
}

fetchSpells(dndSpellsUrl);
 
document.getElementById('sortType').addEventListener('change', filterSpells);

function filterSpells(){
    console.log('Someone just changed the Type value!')

    const filterValue = document.getElementById('sortType').value;
    const spellItems = document.querySelectorAll('.spell-item');
    console.log(`They searched for ${filterValue}`); 

    spellItems.forEach(item => {
          //Pakt de 3e <p>, dit werkt, maar moet anders kunnen?
        const spellType = item.querySelector('p:nth-child(3)').textContent.split(': ')[1];
        if (filterValue === 'all' || spellType === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
}

function searchByString(){

const spellItems = document.querySelectorAll('.spell-item');
let searchValue = document.getElementById('textInput').value.toLowerCase();

spellItems.forEach(item => {

    const spellNameElement = item.querySelector('b > p');
    const spellName = spellNameElement ? spellNameElement.textContent.toLowerCase() : "";

    if(spellName.toLowerCase().includes(searchValue)){
        item.style.display = 'block';
    } else {
        item.style.display = 'none';
 }
    
})
}

 
