document.addEventListener("DOMContentLoaded", () => {
const searchInput = document.getElementById("searchInput")
const characterNameInput = document.getElementById("characterName")
const addCharacterButton = document.getElementById("addCharacterButton")
const charactersTableBody = document.getElementById("characterTableBody")
let characters = [];

async function fetchCharacters() {
try {
  const response = await fetch("https://swapi.tech/api/people/")
  const data = await response.json();
  characters = data.results
    loadCharacters(characters)
} catch (error) {
    console.error("Error fetching characters:", error)
}
}

function loadCharacters(charactersToLoad) {
 charactersTableBody.innerHTML = ""
charactersToLoad.forEach(character => {
    const row = document.createElement("tr")
    row.innerHTML = `<td>${character.name}</td>`
    charactersTableBody.appendChild(row)
});
}


function filterCharacters(query) {
const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(query.toLowerCase())
);
loadCharacters(filteredCharacters)
}

 
searchInput.addEventListener("input", () => {
const query = searchInput.value
 filterCharacters(query)
});


addCharacterButton.addEventListener("click", () => {
const newCharacter = characterNameInput.value.trim()

if (newCharacter && !characters.some(c => c.name.toLowerCase() === newCharacter.toLowerCase())) {
const newCharacterObj = { name: newCharacter, isCustom: true };
characters.push(newCharacterObj)
loadCharacters(characters)
const rows = charactersTableBody.querySelectorAll("tr")
    rows[rows.length - 1].classList.add("custom-character")
characterNameInput.value = ""
} 
})
fetchCharacters()
})
