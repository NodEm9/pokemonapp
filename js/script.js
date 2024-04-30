//Pokemom list array
let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Ivysaur", height: 1, types: ["grass", "poison"] },
  { name: "Venusaur", height: 2, types: ["grass", "poison"]},
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Charmeleon", height: 1.1, types: ["fire"] },
  { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
  { name: "Squirtle", height: 0.5, types: ["water"] },
  { name: "Wartortle", height: 1, types: ["water"] },
  { name: "Blastoise", height: 1.6, types: ["water"] }
];

//Create h1 element with text "Pokémon List" 
document.write("<h1>Pokémon List</h1>");

/*Create unordered list element with for loop 
to display each Pokémon name and height
Add conditional to display message if height is greater than 1.5*/
document.write("<ul>");
for (let i = 0; i < pokemonList.length; i++) {
  document.write("<li>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  
  //Add conditional to display message if height is greater than 1.5
  if (pokemonList[i].height > 1.5) {
    document.write(" - Wow, that's big!");
  }
  document.write("</li>");
}
document.write("</ul>");

console.log(pokemonList);