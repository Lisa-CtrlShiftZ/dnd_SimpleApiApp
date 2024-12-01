document.addEventListener("DOMContentLoaded", async () => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type"); // e.g., 'species' or 'spells'
    const id = params.get("id"); // e.g., 'dragonborn' or 'fireball'
    
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/${type}/${id}`);
      if (!response.ok) throw new Error("Data not found");
  
      const data = await response.json();
      
      function checkDamageUtility(data){
        let damageType; 
        
        if (data.damage && data.damage.damage_type) {
           damageType = data.damage.damage_type.name;
        } else {
           damageType = "Utility";
        }
        return damageType
      }

      let damageType = checkDamageUtility(data);
      
      iconDiv.innerHTML = `
        <div class="iconDiv"> 
           <img src="icons/damage/${damageType}.svg">
        </div>
        `
  
      // Populate the HTML with data
      document.getElementById("spellName").textContent = data.name;
      document.getElementById("desc").textContent = data.desc || "No description available.";
      document.getElementById("higherLevel").textContent = data.higher_level|| "No description available.";
      
      document.getElementById("components").textContent = findComponents(data) || "No description available.";

     //Display words instead of V, S and M 
      function findComponents(data){ 

        const allComponents = []; 

        if(data.components.includes('V')){
            allComponents.push("Verbal")
        }  
        if(data.components.includes('S')){
            allComponents.push('Somatic')
        }
        if(data.components.includes('M')){
            allComponents.push('Material')
        }

        return allComponents.join(', '); 
      }

    } catch (error) {
      console.error(error);
    }
  });