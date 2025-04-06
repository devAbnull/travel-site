function markdownToHTML(mdText) {
    return mdText
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-2">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-2">$1</h1>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' class='my-2' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' class='text-blue-600 underline'>$1</a>")
        .replace(/\n\n/gim, "<br><br>")
        .replace(/\n/gim, "<br>");
}


const travelItems = [
    {
        title: "Hot Air Balloon in Cappadocia",
        city: "Göreme",
        country: "Turkey",
        description: "Cappadocia’s dreamlike landscape, filled with fairy chimneys and cave dwellings, becomes magical when seen from the sky in a hot air balloon.",
        extendedDescription: "🗓️ **Best Time to Visit**: April to June and September to October offer calm winds and clear skies—ideal for balloon rides.\n\n🛫 **How to Visit**: Fly into Kayseri or Nevşehir airport. Shuttle services to Göreme are widely available. Most hotels can arrange balloon rides.\n\n🎈 **What to Expect**: Early morning rides offer sunrise views over a surreal terrain. Ballooning here is safe, peaceful, and breathtaking.\n\n✨ **Fun Fact**: Cappadocia is one of the few places in the world where hundreds of balloons take off together almost daily, forming a colorful sky mosaic.",
        image: 'https://media.istockphoto.com/id/1484200613/photo/aerial-view-of-a-fleet-of-hot-air-balloons-in-cappadocia-turkey.jpg?s=1024x1024&w=is&k=20&c=plZxZ16cPGc4ucYbqm_Y4R-mnKpjc8szBwu75rUZ4Jo='
    },
    {
        title: "Disneyland in Hong Kong",
        city: "Lantau Island",
        country: "Hong Kong",
        description: "A magical escape into Disney’s world with Asian cultural flair, perfect for families and fans alike.",
        extendedDescription: "🗓️ **Best Time to Visit**: October to December for pleasant weather and festive events. Weekdays are less crowded.\n\n🚆 **How to Visit**: Take the MTR to Sunny Bay, then hop on the dedicated Disneyland line.\n\n🎠 **What to Explore**: Must-visit rides include Mystic Manor and Iron Man Experience. Don’t miss the nighttime fireworks and parades.\n\n✨ **Fun Fact**: It’s the first Disney park to have a unique non-haunted version of the Haunted Mansion — Mystic Manor!",
        image: 'https://media.istockphoto.com/id/613561006/photo/hong-kong-disneyland.jpg?s=1024x1024&w=is&k=20&c=MrTZPlHwsEotl13E1v9CfQO3sEpYar9AhOb6yztkh5Q='
    },
    {
        title: "Grand Canyon in USA",
        city: "Arizona",
        country: "USA",
        description: "A vast geological wonder, the Grand Canyon offers unmatched views and hiking experiences.",
        extendedDescription: "🗓️ **Best Time to Visit**: Spring and fall provide pleasant hiking conditions and fewer crowds.\n\n🚗 **How to Visit**: Fly into Phoenix or Las Vegas, then drive to the South Rim. The park runs shuttle services between popular viewpoints.\n\n🥾 **What to Do**: Try hiking Bright Angel Trail, take a helicopter tour, or raft the Colorado River.\n\n✨ **Fun Fact**: The canyon is so deep that temperature and ecosystems change as you descend — it’s like visiting different worlds.",
        image: 'https://media.istockphoto.com/id/1335109742/photo/low-water-level-on-colorado-river.jpg?s=1024x1024&w=is&k=20&c=U3n04zBA08qI3xN2tDJWb83RMyOS5aPv3GxZp4_fLpQ='
    },
    {
        title: "Northern Lights in Norway",
        city: "Tromsø",
        country: "Norway",
        description: "Witnessing the aurora borealis dancing across Arctic skies is a truly magical experience.",
        extendedDescription: "🗓️ **Best Time to Visit**: September to March, with peak visibility in December and January.\n\n🛬 **How to Visit**: Fly into Tromsø or Alta. From there, local tours take you to prime viewing spots far from light pollution.\n\n🌌 **What to Do**: Combine aurora hunting with husky sledding or a stay in a glass igloo.\n\n✨ **Fun Fact**: The northern lights are caused by solar particles colliding with Earth’s magnetic field — and Tromsø lies right under the aurora oval!",
        image: 'https://media.istockphoto.com/id/1127199612/photo/aurora-borealis-over-snowy-mountains-frozen-sea-coast-reflection-in-water-at-night-lofoten.jpg?s=1024x1024&w=is&k=20&c=f9uGMo3wBNmuI8lcOwgEhkNLFF3Mr5vPMySsQ5_50aM='
    },
    {
        title: "Tomorrowland",
        city: "Boom",
        country: "Belgium",
        description: "One of the biggest electronic dance music festivals on Earth, bursting with energy and fantasy-like stages.",
        extendedDescription: "🗓️ **Best Time to Visit**: Held annually in late July. Tickets sell out in minutes, so plan early.\n\n🚉 **How to Visit**: Fly into Brussels, then take a train to Boom. Shuttle buses run from the station to the festival.\n\n🎧 **What to Expect**: World-class DJs, jaw-dropping stage setups, and a global community of dance lovers.\n\n✨ **Fun Fact**: Tomorrowland stages are often built like castles, temples, and entire fantasy worlds — with over-the-top visual effects.",
        image: 'https://media.gettyimages.com/id/579208298/photo/topshot-belgium-music-tomorrowland-festival.webp?s=1024x1024&w=gi&k=20&c=-NK7FGs4RE8u6e0q8NNn3dEp_gE1-cuD6L26AgC2Jbc='
    },
    {
        title: "Cherry Blossom in Japan",
        city: "Kyoto",
        country: "Japan",
        description: "Japan’s cherry blossom season is an ethereal celebration of nature, beauty, and impermanence.",
        extendedDescription: "🗓️ **Best Time to Visit**: Late March to early April. Peak bloom varies by year and region.\n\n🚅 **How to Visit**: Kyoto is accessible via the Shinkansen bullet train from Tokyo or Osaka.\n\n🌸 **What to Do**: Visit Philosopher’s Path or Maruyama Park. Enjoy ‘hanami’ — cherry blossom viewing picnics under the trees.\n\n✨ **Fun Fact**: Sakura petals fall after only a few days, symbolizing the fleeting beauty of life in Japanese culture.",
        image: 'https://media.istockphoto.com/id/1370295417/photo/cherry-blossoms-in-full-bloom-in-park.jpg?s=1024x1024&w=is&k=20&c=uReiskMdbZiyerM54Heqlo8RnkIXNYtLrc3bYZ2Sib8='
    },
    {
        title: "Blue Grotto in Italy",
        city: "Capri",
        country: "Italy",
        description: "A sea cave that glows an otherworldly blue as sunlight reflects through its underwater opening.",
        extendedDescription: "🗓️ **Best Time to Visit**: May to September when sea conditions are calm enough for cave access.\n\n🛥️ **How to Visit**: Take a ferry to Capri from Naples or Sorrento. Small rowboats ferry tourists into the grotto.\n\n💡 **What to Know**: You enter through a tiny opening by lying flat in the boat! Once inside, the water glows electric blue.\n\n✨ **Fun Fact**: The Blue Grotto was once a Roman Emperor’s private swimming hole — accessible only by candlelight back then.",
        image: 'https://media.gettyimages.com/id/693308233/photo/capri-island-the-grotta-azzurra.jpg?s=1024x1024&w=gi&k=20&c=yjPJ6MM1H_bR24tNLpwUjg_W8bGZ6Iyn-muK4muger0='
    },
    {
        title: "Eiffel Tower in Paris",
        city: "Paris",
        country: "France",
        description: "An iconic symbol of love and engineering brilliance towering above the romantic city of Paris.",
        extendedDescription: "🗓️ **Best Time to Visit**: April to June and September to early November for mild weather and fewer tourists.\n\n🚇 **How to Visit**: Easily reached by Paris Metro (Trocadéro or Bir-Hakeim stations).\n\n🗼 **What to Do**: Book tickets online to skip queues. Dine at the tower’s restaurants or catch sunset from the top.\n\n✨ **Fun Fact**: The Eiffel Tower was once considered an eyesore — now it draws over 7 million visitors annually.",
        image: 'https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=3020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: "Great Wall of China",
        city: "Beijing",
        country: "China",
        description: "An ancient architectural marvel stretching thousands of kilometers across rugged landscapes.",
        extendedDescription: "🗓️ **Best Time to Visit**: April to June and September to November. Avoid major holidays for fewer crowds.\n\n🚆 **How to Visit**: Take a train or tour from Beijing to sections like Mutianyu or Badaling.\n\n🥾 **What to Do**: Hike the less touristy parts for stunning photos and a real sense of history.\n\n✨ **Fun Fact**: The wall is over 13,000 miles long, built across dynasties to protect China from invasions.",
        image: 'https://media.istockphoto.com/id/1051651510/photo/great-wall.jpg?s=1024x1024&w=is&k=20&c=A41I7NIer_R5rywR1w-ZxHIkg0orJlkfHmjE6uQefEs='
    },
    {
        title: "Safari in South Africa",
        city: "Kruger National Park",
        country: "South Africa",
        description: "Get close to lions, elephants, and rhinos on a real African safari adventure.",
        extendedDescription: "🗓️ **Best Time to Visit**: May to September (dry season) when animals gather around water sources.\n\n🛬 **How to Visit**: Fly into Johannesburg or Nelspruit, then drive or fly to Kruger. Guided safaris are widely available.\n\n🐘 **What to Expect**: Sunrise and sunset game drives offer the best chances to spot the Big Five.\n\n✨ **Fun Fact**: Kruger is one of Africa’s largest game reserves and includes over 500 bird species!",
        image: 'https://media.istockphoto.com/id/625382686/photo/african-safari-silhouette-banner.jpg?s=1024x1024&w=is&k=20&c=qaT4vh7OzJzaiM7SnFhQ4bDFg727WjCz1b4ng0vqbN8='
    },
    {
        title: "New Year in Times Square",
        city: "New York City",
        country: "USA",
        description: "A legendary countdown, confetti blizzards, and a globe-spanning celebration to ring in the New Year.",
        extendedDescription: "🗓️ **Best Time to Visit**: Arrive early on December 31 to get a good spot (as early as noon!).\n\n🗽 **How to Visit**: Take the subway to Times Square. Wear warm clothes and bring snacks — no restrooms or reentry.\n\n🎉 **What to Expect**: The famous ball drop, celebrity performances, and a truly electric atmosphere.\n\n✨ **Fun Fact**: The Times Square Ball weighs over 11,000 pounds and is covered in Waterford crystal triangles!",
        image: 'https://media.istockphoto.com/id/1154373387/photo/new-york-city-usa-january-1-atmospheric-new-years-eve-celebration-on-famous-times-square.jpg?s=1024x1024&w=is&k=20&c=chwYBhvUDTJV8AUdlKkMzzRSvjpaiSKIfXGHV1oi3pE='
    },
    {
        title: "Niagara Falls in New York",
        city: "Niagara",
        country: "USA",
        description: "Feel the power of nature at one of the most famous waterfalls in the world.",
        extendedDescription: "🗓️ **Best Time to Visit**: June to August for warm weather and boat rides.\n\n🚗 **How to Visit**: Fly into Buffalo or Toronto and drive to the falls. Stay on the U.S. or Canadian side for different views.\n\n🚤 **What to Do**: Ride the Maid of the Mist or walk the Cave of the Winds boardwalk.\n\n✨ **Fun Fact**: Over 3,000 tons of water flow over the falls every second!",
        image: 'https://media.istockphoto.com/id/1346270784/photo/niagara-falls-horseshoe-falls.jpg?s=1024x1024&w=is&k=20&c=nlf5q4-yYAm0Cj0iOg3BAC5MnRH0Y_eECNcV33zp0Yg='
    },
    {
        title: "Yosemite National Park in California",
        city: "Yosemite Valley",
        country: "USA",
        description: "Home to towering cliffs, ancient sequoias, and pristine wilderness.",
        extendedDescription: "🗓️ **Best Time to Visit**: May to September for most hiking trails and access to high elevation points.\n\n🚙 **How to Visit**: Drive from San Francisco or Los Angeles. Entry permits may be required in peak season.\n\n🏞️ **What to See**: Yosemite Falls, El Capitan, Half Dome, and Glacier Point offer jaw-dropping views.\n\n✨ **Fun Fact**: Yosemite was the first area in the U.S. to be protected for conservation — inspiring the national park system.",
        image: 'https://images.unsplash.com/photo-1562310503-a918c4c61e38?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: "Great Barrier Reef Australia",
        city: "Cairns",
        country: "Australia",
        description: "Dive into the world’s largest coral reef teeming with marine life and rainbow-colored corals.",
        extendedDescription: "🗓️ **Best Time to Visit**: June to October for dry weather and calm seas.\n\n✈️ **How to Visit**: Fly into Cairns and book snorkeling or diving tours.\n\n🐠 **What to Do**: Snorkel with turtles, scuba dive, or fly over the reef in a scenic helicopter.\n\n✨ **Fun Fact**: It's the only living structure visible from space and supports thousands of species!",
        image: 'https://images.unsplash.com/photo-1582623838120-455da222cdc7?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: "Machu Picchu in Peru",
        city: "Cusco",
        country: "Peru",
        description: "A mysterious Incan citadel set high in the Andes, often wrapped in clouds and history.",
        extendedDescription: "🗓️ **Best Time to Visit**: April to October is dry season and best for hiking.\n\n🚆 **How to Visit**: Travel to Cusco, then take a train to Aguas Calientes followed by a bus or hike to the ruins.\n\n🥾 **What to Do**: Hike the Inca Trail, Huayna Picchu, or Sun Gate for dramatic views.\n\n✨ **Fun Fact**: Machu Picchu was never discovered by the Spanish, helping it stay hidden and well-preserved until its rediscovery in 1911.",
        image: 'https://images.unsplash.com/photo-1568805746970-0bbae56ab18b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: "Cruise in New Zealand Fiordland",
        city: "Milford Sound",
        country: "New Zealand",
        description: "Sail through dramatic fjords, waterfalls, and mist-covered peaks in a land carved by glaciers.",
        extendedDescription: "🗓️ **Best Time to Visit**: November to March for warmer days and better cruising conditions.\n\n🛳️ **How to Visit**: Drive from Queenstown or fly to Te Anau. Scenic cruises depart from Milford Sound marina.\n\n🌧️ **What to See**: Towering cliffs, rainforests, dolphins, and even penguins!\n\n✨ **Fun Fact**: Milford Sound gets 200+ days of rain annually — but the waterfalls are most powerful during wet weather!",
        image: 'https://media.istockphoto.com/id/539259645/photo/new-zealand-milford-sound.jpg?s=1024x1024&w=is&k=20&c=bN4fFjV_vIKWzIORv5DgEoTcRNm83q2CDcfeLCxn4b0='
    },
    {
        title: "Cruise Emerald Water in Vietnam",
        city: "Ha Long Bay",
        country: "Vietnam",
        description: "Cruise through thousands of limestone islets rising from emerald-green waters.",
        extendedDescription: "🗓️ **Best Time to Visit**: October to April for dry skies and scenic sunsets.\n\n🚢 **How to Visit**: Travel from Hanoi to Ha Long Bay (~3-4 hours). Book a one- or two-night cruise.\n\n🏞️ **What to Do**: Explore caves, kayak between cliffs, and visit floating villages.\n\n✨ **Fun Fact**: Ha Long means 'descending dragon' — the bay is steeped in legend and spiritual beauty.",
        image: 'https://media.istockphoto.com/id/1201281530/photo/landscape-with-halong-bay.jpg?s=1024x1024&w=is&k=20&c=vYMu4cWEddxdNnGg2RqbqH5jjiyZC06GDqpn_utiv1I='
    },
    {
        title: "Tulip Festival in Netherlands",
        city: "Lisse",
        country: "Netherlands",
        description: "Wander through vast fields of blooming tulips in vibrant rows of color.",
        extendedDescription: "🗓️ **Best Time to Visit**: Mid-April during peak bloom. Check bloom forecasts before visiting.\n\n🚲 **How to Visit**: Rent a bike from Amsterdam or take a train to Lisse for the Keukenhof Gardens.\n\n🌷 **What to Do**: Explore the themed gardens, photo spots, and floral art installations.\n\n✨ **Fun Fact**: At its peak in the 1600s, tulips were more valuable than gold in the Netherlands!",
        image: 'https://media.istockphoto.com/id/2048162237/photo/various-types-of-tulips-in-the-field.jpg?s=1024x1024&w=is&k=20&c=wZhEVCirTTtLnSGRUsmsIMbZBHpIczgNh4qvxBouFck='
    },
    {
        title: "Hormuz Island in Iran",
        city: "Hormuz",
        country: "Iran",
        description: "A colorful island of rainbow soil, red beaches, and moon-like landscapes.",
        extendedDescription: "🗓️ **Best Time to Visit**: November to March for cooler desert temperatures.\n\n⛴️ **How to Visit**: Take a ferry from Bandar Abbas. Motorbikes or tuk-tuks are the best way to explore the island.\n\n🌈 **What to See**: Rainbow Valley, Red Beach, and the surreal Salt Goddess cave.\n\n✨ **Fun Fact**: Hormuz’s red soil is edible and used in local cooking — and even in art!",
        image: 'https://media.gettyimages.com/id/1500699124/photo/the-persian-gulf-hormuz-island-iran.jpg?s=1024x1024&w=gi&k=20&c=d2zN5uGwlIygsUYSCZgEcxWymCGqWj3sL2wKtmF8fmQ='
    }
]




const grid = document.getElementById("travel-grid");
const extendedDescDiv = document.getElementById("extended-description");

const detailView = document.getElementById("detail-view");
const detailTitle = document.getElementById("detail-title");
const detailDescription = document.getElementById("detail-description");
const detailImage = document.getElementById("detail-image");

let activeBox = null;

travelItems.forEach((item, index) => {
    const box = document.createElement("div");
    box.className = `
  relative p-4 cursor-pointer
  hover:bg-blue-50
  group
`;


    const title = document.createElement("h2");
    title.className = "text-lg font-semibold cursor-pointer";
    title.textContent = item.title;

    // Toggle expand/collapse
    title.addEventListener("click", () => {
        box.classList.toggle("expanded");
        extendedDescDiv.innerHTML = `<div class="flex flex-col">
      <h3 class="text-2xl font-bold text-blue-700 mb-2">${item.title}</h3>
      <p class="text-sm text-gray-500 mb-1">${item.city}, ${item.country}</p>
      <p class="text-gray-700 mt-2">${markdownToHTML(item.extendedDescription)}</p>
      <img src="${item.image}" alt="${item.title}" class="w-full h-auto mt-4 rounded-lg shadow-md" />
      </div>
    `;

        if (activeBox) {
            // box.classList.remove("border-blue-300");
            activeBox.classList.remove("selected-emoji");
            activeBox.classList.remove("bg-blue-50");
            const existingEmoji = activeBox.querySelector(".emoji");
            if (existingEmoji) existingEmoji.remove();
        }

        // box.classList.remove("border-red-300");
        const emoji = document.createElement("span");
        emoji.textContent = "✈️";
        emoji.className = `absolute  transform -translate-y-1/2 text-xl pointer-events-none emoji`;
        emoji.style.right = "1rem";
        emoji.style.top = "2rem";

        box.appendChild(emoji);
        box.classList.add("selected-emoji");
        box.classList.add("bg-blue-50");

        // setTimeout(() => {
        //     emoji.remove();
        //   }, 1000);

        activeBox = box;
    });

    box.appendChild(title);
    grid.appendChild(box);
});


const menuToggle = document.getElementById("menuToggle");
const travelGridPanel = document.getElementById("travel-grid-panel");

menuToggle.addEventListener("click", () => {
    travelGridPanel.classList.toggle("-translate-x-full");
});