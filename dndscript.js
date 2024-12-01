const dndRacesUrl = "https://www.dnd5eapi.co/api/races"; 
const dndSpellsUrl ="https://www.dnd5eapi.co/api/spells";

const output = document.getElementById('output');
const spellsOutput = document.getElementById('spellsOutput');


  function fetchData(dndRacesUrl){
    output.innerHTML = '';  // Clear previous content
    fetch(dndRacesUrl)
    .then(response => response.json())
    .then(species => species.results.forEach(speciesItem => {
        
        // const dndSpeciesDiv = document.createElement('div');
        // dndSpeciesDiv.classList.add('dnd-item'); //classList geeft een CSS class
        
        // const pageLink = document.createElement('a');
        // pageLink.setAttribute('href', `details.html?type=races&id=${speciesItem.index}`);

        // const nameParagraph = document.createElement('p');
        // nameParagraph.textContent = speciesItem.name;

        // // Append the paragraph to the div

        // dndSpeciesDiv.append(nameParagraph);
        // pageLink.appendChild(dndSpeciesDiv);
        // output.appendChild(pageLink);
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

  function fetchSpells(dndSpellsUrl){
    output.innerHTML = '';  // Clear previous content
    fetch(dndSpellsUrl)
    .then(response => response.json())
    .then(spells => spells.results
      .sort((a, b) => a.level - b.level)
      .forEach(spellItem => {

         spellsOutput.innerHTML += `
        <div class="spell-item">
          <p>${spellItem.name}</p> 
          <p>Level: ${spellItem.level}</p>
        </div>
        `
    }))
    .catch((error) => console.error('Something went wrong', error));
  }

  fetchSpells(dndSpellsUrl); 