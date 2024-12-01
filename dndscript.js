const dndRacesUrl = "https://www.dnd5eapi.co/api/races"; 
const dndSpellsUrl ="https://www.dnd5eapi.co/api/spells";

const output = document.getElementById('output');
const spellsOutput = document.getElementById('spellsOutput');


  function fetchData(dndRacesUrl){
    output.innerHTML = '';  // Clear previous content
    fetch(dndRacesUrl)
    .then(response => response.json())
    .then(species => species.results.forEach(speciesItem => {
        output.innerHTML += `
        <div class="dnd-item">
            <div class="image-mask">
            <a href="details.html?type=races&id=${speciesItem.index}"><img src="images/${speciesItem.name}.jpg"></a> 
            </div>
          <p>${speciesItem.name}</p> 
        </div>
        `

    }))
    .catch((error) => console.error('Something went wrong', error));
  }

  fetchData(dndRacesUrl); 

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
            const damageType = spellDetails.damage.damage_type.name;

            spellsOutput.innerHTML += `
            <div class="spell-item">
                <img src="icons/damage/${damageType}.svg" alt="${damageType}">
                <b><p>${spellItem.name}</p></b> 
                <p>Damage type: ${damageType}</p>
                <p>Level: ${spellItem.level}</p>
            </div>
            `;
        });

      })
    )
    .catch((error) => console.error('Something went wrong', error));
}

fetchSpells(dndSpellsUrl);
 