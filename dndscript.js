const dndRacesUrl = "https://www.dnd5eapi.co/api/races"; 
const output = document.getElementById('output');


  function fetchData(dndRacesUrl){
    output.innerHTML = '';  // Clear previous content
    fetch(dndRacesUrl)
    .then(response => response.json())
    .then(species => species.results.forEach(speciesItem => {
        
        const dndSpeciesDiv = document.createElement('div');
        dndSpeciesDiv.classList.add('dnd-item'); //classList geeft een CSS class
        
        const pageLink = document.createElement('a');
        pageLink.setAttribute('href', `details.html?type=races&id=${speciesItem.index}`);

        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = speciesItem.name;

        // Append the paragraph to the div

        dndSpeciesDiv.append(nameParagraph);
        pageLink.appendChild(dndSpeciesDiv);
        output.appendChild(pageLink);
    }))
    .catch((error) => console.error('Something went wrong', error));
  }

  fetchData(dndRacesUrl); 