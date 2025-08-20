// src/lib/categoriesData.js

const slugify = (s) => s.toLowerCase().replace(/\s+/g, "-");

const makeProducts = (baseName, image, price) => {
  const baseSlug = slugify(baseName); // e.g. "Basic Tee" -> "basic-tee"
  return Array.from({ length: 8 }, (_, i) => ({
    id: `${baseSlug}-${i + 1}`, // safe slug ID
    name: `${baseName} ${i + 1}`,
    image,
    price,
  }));
};

export const categoriesData = {
  basic: makeProducts("Basic Tee", "/assets/tshirt1.png", "₹499"),
  anime: makeProducts("Anime Tee", "/assets/anime.png", "₹699"),
  aesthetic: makeProducts("Aesthetic Tee", "/assets/aesthetic.png", "₹599"),
  minimal: makeProducts("Minimal Tee", "/assets/minimal.png", "₹549"),
  quotes: makeProducts("Quote Tee", "/assets/quotes.png", "₹649"),
  wanderlust: makeProducts("Wanderlust Tee", "/assets/tshirt2.png", "₹699"),
  cartoon: makeProducts("Cartoon Tee", "/assets/cartoon.png", "₹599"),
  marvel: makeProducts("Marvel Tee", "/assets/cartoon.png", "₹799"),
};
