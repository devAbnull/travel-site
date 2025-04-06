// Array of paragraph texts
const paragraphs = [
    "Discover breathtaking destinations across the globe.",
    "Plan your perfect getaway with our expert guides.",
    "Get exclusive travel deals and tips delivered to you.",
    "Explore the world one dream at a time.",
    "Travel far, travel wide, travel inspired!"
  ];
  
  // Get the container where we want to add paragraphs
  const container = document.getElementById("paragraphs-container");
  
  // Loop through the array and create paragraph elements
  paragraphs.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    container.appendChild(p);
  });
  