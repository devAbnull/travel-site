const travelItems = [
    {
      title: "Hot Air Balloon in Cappadocia",
      city: "Göreme",
      country: "Turkey",
      description: "Floating over the otherworldly landscape of Cappadocia at sunrise is a surreal experience unlike any other. The region is famed for its 'fairy chimneys'—tall, thin spires of rock that rise from the earth, creating an alien-looking terrain. As the sun rises, dozens of colorful hot air balloons fill the sky, creating a magical spectacle of movement and light. It’s peaceful, breathtaking, and feels almost like drifting through a dream. Cappadocia also offers charming cave hotels, rich Turkish culture, and delicious food to complete the adventure.",
      image: "path_to_images/cappadocia.jpg"
    },
    {
      title: "Disneyland in Hong Kong",
      city: "Lantau Island",
      country: "Hong Kong",
      description: "Hong Kong Disneyland is a whimsical retreat for both kids and adults who grew up watching Disney classics. The park blends iconic Disney magic with local cultural flair, creating a uniquely charming experience. Whether you're riding Space Mountain, watching the parade with beloved characters, or soaking in the nightly fireworks over Sleeping Beauty Castle, the park offers a full day of wonder. Nestled in the lush greenery of Lantau Island, it's also a scenic escape from the city's bustling core, perfect for some joyful, shared memories.",
      image: "path_to_images/disney_hongkong.jpg"
    },
    {
      title: "Grand Canyon in USA",
      city: "Arizona",
      country: "USA",
      description: "The Grand Canyon, carved over millions of years by the mighty Colorado River, is a natural masterpiece of staggering proportions. Its layered red rocks tell the story of Earth’s geological past, and its vastness is humbling. Hiking the trails, especially the Bright Angel or South Kaibab, gives you a deeper appreciation of its scale and beauty. For the ultimate experience, catch the sunrise or sunset from the South Rim and watch the colors shift across the canyon walls. Helicopter rides and white-water rafting add thrilling perspectives to this iconic destination.",
      image: "path_to_images/grand_canyon.jpg"
    },
    {
      title: "Northern Lights in Norway",
      city: "Tromsø",
      country: "Norway",
      description: "Tromsø, located above the Arctic Circle, is one of the best places on Earth to witness the aurora borealis. These dancing lights in the sky—shimmering greens, purples, and blues—are nature’s own light show, caused by particles from the sun colliding with the Earth's atmosphere. In the stillness of a dark, snowy landscape, the spectacle feels almost spiritual. Beyond the lights, Tromsø offers cozy wooden cabins, husky sledding, Sami culture, and stunning fjords—making it a winter wonderland worth exploring.",
      image: "path_to_images/northern_lights.jpg"
    },
    {
      title: "Tomorrowland",
      city: "Boom",
      country: "Belgium",
      description: "Tomorrowland isn’t just a music festival—it’s a global pilgrimage for electronic dance music lovers. Held in the small town of Boom, Belgium, this festival transforms into a fantasy world filled with massive, storybook-like stages, vibrant decor, and a unifying atmosphere of joy and love. DJs from around the world headline the event, and attendees represent virtually every nation. The immersive experience, paired with world-class sound and visuals, makes it feel like you’ve stepped into a parallel dimension of music and togetherness.",
      image: "path_to_images/tomorrowland.jpg"
    },
    {
      title: "Cherry Blossom in Japan",
      city: "Kyoto",
      country: "Japan",
      description: "Each spring, Japan transforms into a pink and white wonderland as cherry blossoms bloom across the country. Kyoto, with its historic temples, wooden teahouses, and tranquil gardens, is one of the best places to witness this breathtaking natural event. Locals and travelers alike enjoy hanami—picnicking beneath the cherry trees—as a celebration of life’s fleeting beauty. The soft petals dancing in the breeze against a backdrop of ancient architecture make for unforgettable moments.",
      image: "path_to_images/cherry_blossom.jpg"
    },
    {
      title: "Blue Grotto",
      city: "Capri",
      country: "Italy",
      description: "The Blue Grotto in Capri is a stunning sea cave known for its ethereal blue glow. As sunlight filters through the underwater entrance, it illuminates the water in the cave, creating an electric-blue effect that feels like pure magic. Accessible only by a small rowboat, the experience of ducking into the cave and floating on glowing waters is dreamlike. The island of Capri itself is a Mediterranean gem with chic cafes, lush landscapes, and ancient Roman ruins.",
      image: "path_to_images/blue_grotto.jpg"
    },
    {
      title: "Eiffel Tower",
      city: "Paris",
      country: "France",
      description: "The Eiffel Tower is not just a global icon of romance but a symbol of Parisian elegance and architectural brilliance. Standing tall over the Champ de Mars, it offers breathtaking panoramic views of the City of Light. Visiting at night when the tower sparkles every hour is a must-do experience. Whether you’re enjoying a picnic beneath it or sipping wine at its summit, the Eiffel Tower casts a charm that’s hard to resist.",
      image: "path_to_images/eiffel_tower.jpg"
    },
    {
      title: "Great Wall of China",
      city: "Beijing",
      country: "China",
      description: "The Great Wall of China stretches across thousands of kilometers and stands as a testament to the country's rich history and engineering prowess. Walking along its stone paths, you can feel the weight of centuries beneath your feet. The section near Mutianyu is both scenic and less crowded, making it perfect for a more tranquil trek. The surrounding mountains and endless wall segments snaking into the distance are awe-inspiring and humbling.",
      image: "path_to_images/great_wall.jpg"
    },
    {
      title: "Safari",
      city: "Kruger National Park",
      country: "South Africa",
      description: "A safari in Kruger National Park offers the chance to witness the 'Big Five'—lions, elephants, rhinos, leopards, and buffaloes—in their natural habitat. The raw beauty of the savannah, the golden sunsets, and the thrill of spotting wild animals up close makes this a once-in-a-lifetime experience. Guided game drives and luxurious lodges add comfort and expertise to your wild adventure.",
      image: "path_to_images/safari.jpg"
    },
    {
      title: "New Year in Times Square",
      city: "New York",
      country: "USA",
      description: "Welcoming the New Year in Times Square is an electrifying experience that draws people from all over the globe. As the famous ball drops and confetti rains down, the energy of the crowd is unmatched. Live performances, dazzling lights, and the pulse of New York City make it a celebration of hope, joy, and fresh beginnings. Just be sure to arrive early for a good spot!",
      image: "path_to_images/times_square_nye.jpg"
    },
    {
      title: "Niagara Falls",
      city: "New York",
      country: "USA",
      description: "Niagara Falls is one of the most powerful and stunning natural wonders in North America. Whether viewed from the American side or across the border in Canada, the thundering roar and misty spray of the falls create an unforgettable sensory experience. Take a boat ride on the Maid of the Mist to get up close—or enjoy the nightly light show for a different kind of magic.",
      image: "path_to_images/niagara_falls.jpg"
    },
    {
      title: "Yosemite National Park",
      city: "California",
      country: "USA",
      description: "Yosemite’s towering granite cliffs, waterfalls, and ancient sequoias offer a paradise for nature lovers and hikers. Iconic spots like El Capitan and Half Dome are breathtaking whether you’re climbing, photographing, or simply admiring. The park's diversity—from lush meadows to snow-capped peaks—makes it a top destination for adventure, reflection, and natural beauty.",
      image: "path_to_images/yosemite.jpg"
    },
    {
      title: "Great Barrier Reef",
      city: "Queensland",
      country: "Australia",
      description: "The Great Barrier Reef is the world’s largest coral reef system and a UNESCO World Heritage site teeming with marine life. Snorkeling or diving here reveals vibrant corals, sea turtles, and a rainbow of tropical fish. The reef’s fragility adds urgency to its beauty, reminding us to cherish and protect such wonders. Many tours also include glass-bottom boats and island stops for a full reef experience.",
      image: "path_to_images/great_barrier_reef.jpg"
    },
    {
      title: "Machu Picchu",
      city: "Cusco Region",
      country: "Peru",
      description: "Perched high in the Andes, Machu Picchu is a mystical Incan city that continues to captivate travelers. The journey to reach it—whether by train or trekking the Inca Trail—is as epic as the destination itself. The stone structures, terraced hills, and mist-covered mountains create a sacred and serene atmosphere, making it one of the world’s most iconic archaeological sites.",
      image: "path_to_images/machu_picchu.jpg"
    },
    {
      title: "Cruise in Fiordland",
      city: "Milford Sound",
      country: "New Zealand",
      description: "A cruise through Fiordland’s Milford Sound is a journey into dramatic fjords, towering cliffs, and cascading waterfalls. Often called the 'eighth wonder of the world,' the sound is rich with wildlife like dolphins and seals, and shrouded in mist that adds an eerie, magical feel. It’s a place where the grandeur of nature speaks for itself.",
      image: "path_to_images/fiordland_cruise.jpg"
    },
    {
      title: "Emerald Water Cruise",
      city: "Ha Long Bay",
      country: "Vietnam",
      description: "Ha Long Bay’s emerald waters and limestone karsts form a seascape so surreal, it’s often featured in films and postcards. Cruising here among the cliffs and caves is both tranquil and visually mesmerizing. Some boats offer overnight stays, allowing you to wake up to the soft glow of sunrise over the water—a serene and unforgettable moment.",
      image: "path_to_images/halong_bay.jpg"
    },
    {
      title: "Tulip Festival",
      city: "Lisse",
      country: "Netherlands",
      description: "Each spring, the Keukenhof Gardens in Lisse burst into a kaleidoscope of color during the Tulip Festival. Millions of tulips bloom in stunning patterns, showcasing the Netherlands’ rich horticultural heritage. Strolling through the gardens or biking past the endless flower fields nearby is a visual treat and a breath of fresh, floral air.",
      image: "path_to_images/tulip_festival.jpg"
    },
    {
      title: "Hormuz Island",
      city: "Hormuz",
      country: "Iran",
      description: "Hormuz Island, known for its colorful landscapes and red beaches, is like a painter’s palette come to life. The island’s otherworldly terrain is rich in minerals that color the soil with vibrant reds, yellows, and purples. A visit here feels like stepping onto Mars. With a blend of Persian heritage and natural art, Hormuz offers a truly off-the-beaten-path experience.",
      image: "path_to_images/hormuz_island.jpg"
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
  