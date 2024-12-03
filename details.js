document.addEventListener("DOMContentLoaded", async () => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type"); // e.g., 'species' or 'spells'
    const id = params.get("id"); // e.g., 'dragonborn' or 'fireball'
    const bannerImage = document.getElementById('banner-image');
  
    // Fetch the appropriate data from the API
    if (!type || !id) {
      document.getElementById("item-title").textContent = "Invalid Request";
      return;
    }
  
    try {
      const response = await fetch(`https://www.dnd5eapi.co/api/${type}/${id}`);
      if (!response.ok) throw new Error("Data not found");
  
      const data = await response.json();

      bannerImage.innerHTML = `
        <div class="banner-image"> 
           <img src="public/images/${data.name}.jpg">
        </div>
        `
  
      // Populate the HTML with data
      document.getElementById("item-title").textContent = data.name;
      document.getElementById("alignment-description").textContent = data.alignment || "No description available.";
      document.getElementById("age-description").textContent = data.age || "No description available.";
      document.getElementById("size-description").textContent = data.size_description || "No description available.";
      document.getElementById("language-description").textContent = data.language_desc || "No description available.";

      document.getElementById("size").textContent = data.size || "No description available.";
      document.getElementById("ability-score").textContent = data.ability_bonuses || "No description available.";
      document.getElementById("speed").textContent = data.speed || "No description available.";

    } catch (error) {
      console.error(error);
      document.getElementById("item-title").textContent = "Error";
      document.getElementById("item-description").textContent = "Could not load data.";
    }
  });