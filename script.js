const travelItems = [
    {
      title: "Hot air balloon in Cappadocia",
      city: "Göreme",
      country: "Turkey",
      description: "Experience the magical sunrise while floating above the fairy chimneys of Cappadocia. The surreal landscape, dotted with ancient caves and rock formations, makes it feel like you're in another world.",
      image: "https://source.unsplash.com/800x500/?cappadocia,balloon"
    },
    {
      title: "Disneyland in Hong Kong",
      city: "Lantau Island",
      country: "Hong Kong",
      description: "Step into a world of enchantment with thrilling rides, parades, and your favorite Disney characters. The fireworks show is an unforgettable highlight for all ages.",
      image: "https://source.unsplash.com/800x500/?disneyland,hongkong"
    },
    {
      title: "Grand Canyon in US",
      city: "Arizona",
      country: "USA",
      description: "Marvel at the immense beauty and scale of this natural wonder carved by the Colorado River. The sunset views from the South Rim are simply unforgettable.",
      image: "https://source.unsplash.com/800x500/?grand-canyon"
    },
    {
      title: "Northern lights in Norway",
      city: "Tromsø",
      country: "Norway",
      description: "Watch the night sky explode into colors as the aurora borealis dances above. Tromsø is one of the best places to catch this cosmic spectacle in a cozy Arctic town.",
      image: "https://source.unsplash.com/800x500/?northern-lights,norway"
    },
    {
      title: "Tomorrowland",
      city: "Boom",
      country: "Belgium",
      description: "Join the world’s largest EDM festival in a fairy-tale themed atmosphere with epic stage setups. It's a once-in-a-lifetime celebration of music, energy, and togetherness.",
      image: "https://source.unsplash.com/800x500/?tomorrowland,festival"
    },
    {
      title: "Cherry blossom in Japan",
      city: "Kyoto",
      country: "Japan",
      description: "Witness delicate sakura petals fill the streets in a sea of pink. Strolling along the Philosopher’s Path during blossom season feels like walking through a painting.",
      image: "https://source.unsplash.com/800x500/?cherry-blossom,japan"
    },
    {
      title: "Blue Grotto Italy",
      city: "Capri",
      country: "Italy",
      description: "Sail into this glowing sea cave where sunlight hits the water and creates an ethereal blue glow. It’s a hidden gem that feels almost otherworldly.",
      image: "https://source.unsplash.com/800x500/?blue-grotto,italy"
    },
    {
      title: "Eiffel Tower in Paris",
      city: "Paris",
      country: "France",
      description: "Enjoy a romantic moment atop Paris’s most iconic structure. The tower lights up every night in a dazzling sparkle that’s pure magic.",
      image: "https://source.unsplash.com/800x500/?eiffel-tower,paris"
    },
    {
      title: "Great Wall of China",
      city: "Beijing",
      country: "China",
      description: "Walk along the ancient stones of the Great Wall, stretching across dramatic landscapes. Each step echoes centuries of history and craftsmanship.",
      image: "https://source.unsplash.com/800x500/?great-wall,china"
    },
    {
      title: "Safari in South Africa",
      city: "Kruger National Park",
      country: "South Africa",
      description: "Embark on an unforgettable wildlife adventure to spot lions, elephants, and rhinos. Safari lodges offer both luxury and closeness to nature.",
      image: "https://source.unsplash.com/800x500/?safari,south-africa"
    },
    {
      title: "New Year in Times Square",
      city: "New York City",
      country: "USA",
      description: "Celebrate with millions under a shower of confetti as the iconic ball drops. It's a high-energy, bucket-list way to ring in the new year.",
      image: "https://source.unsplash.com/800x500/?newyear,times-square"
    },
    {
      title: "Niagara Falls in New York",
      city: "Niagara",
      country: "USA",
      description: "Stand in awe as millions of gallons of water crash over the cliff edge. The Maid of the Mist boat ride brings you face to face with this mighty marvel.",
      image: "https://source.unsplash.com/800x500/?niagara-falls"
    },
    {
      title: "Yosemite National Park in California",
      city: "Yosemite Valley",
      country: "USA",
      description: "Explore waterfalls, giant sequoias, and granite cliffs like El Capitan. A nature lover’s paradise with endless trails and photo ops.",
      image: "https://source.unsplash.com/800x500/?yosemite"
    },
    {
      title: "Great Barrier Reef Australia",
      city: "Cairns",
      country: "Australia",
      description: "Dive into an underwater world of vibrant corals and marine life. Snorkeling here is like swimming in a living, breathing painting.",
      image: "https://source.unsplash.com/800x500/?great-barrier-reef,australia"
    },
    {
      title: "Machu Picchu in Peru",
      city: "Cusco",
      country: "Peru",
      description: "Trek along the Inca Trail to discover this mystical mountain citadel. A site shrouded in clouds and mystery, Machu Picchu is simply breathtaking.",
      image: "https://source.unsplash.com/800x500/?machu-picchu"
    },
    {
      title: "Cruise in New Zealand Fiordland",
      city: "Milford Sound",
      country: "New Zealand",
      description: "Sail through towering fjords where waterfalls tumble down emerald cliffs. It’s a peaceful and majestic way to experience nature’s grandeur.",
      image: "https://source.unsplash.com/800x500/?milford-sound,new-zealand"
    },
    {
      title: "Cruise emerald green water Vietnam",
      city: "Ha Long Bay",
      country: "Vietnam",
      description: "Explore mystical limestone islands on calm green waters. Overnight boat stays offer serenity and views that change with every turn.",
      image: "https://source.unsplash.com/800x500/?halong-bay,vietnam"
    },
    {
      title: "Tulip Festival in Netherlands",
      city: "Lisse",
      country: "Netherlands",
      description: "Walk through rainbow fields of tulips in bloom. Keukenhof Gardens showcases Dutch floral beauty at its finest each spring.",
      image: "https://source.unsplash.com/800x500/?tulip,netherlands"
    },
    {
      title: "Hormuz Island in Iran",
      city: "Hormuz",
      country: "Iran",
      description: "Explore this volcanic island painted in red, yellow, and orange hues. Its salt formations, colorful soil, and beaches feel almost extraterrestrial.",
      image: "https://source.unsplash.com/800x500/?hormuz,iran"
    }
  ];
  
  
  const grid = document.getElementById("travel-grid");
  const detailView = document.getElementById("detail-view");
  const detailTitle = document.getElementById("detail-title");
  const detailDescription = document.getElementById("detail-description");
  const detailImage = document.getElementById("detail-image");
  
travelItems.forEach(item => {
    const box = document.createElement("div");
    box.className = "p-4 border-l-4 border-blue-300 bg-white rounded-md shadow-sm hover:shadow-md transition group";

  
    const title = document.createElement("h2");
    title.className = "text-lg font-semibold cursor-pointer";
    title.textContent = item.title;

    const subtitle = document.createElement("h3");
    subtitle.className = "text-md hidden group-[.expanded]:block";
    subtitle.textContent = item.city + ", " + item.country;

  
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;
    image.className = "rounded mt-3 hidden group-[.expanded]:block";
  
    const desc = document.createElement("p");
    desc.className = "text-gray-600 mt-2 hidden group-[.expanded]:block";
    desc.textContent = item.description;
  
    // Toggle expand/collapse
    title.addEventListener("click", () => {
      box.classList.toggle("expanded");
    });
  
    box.appendChild(title);
    box.appendChild(subtitle);
    box.appendChild(desc);
    grid.appendChild(box);
  });
  