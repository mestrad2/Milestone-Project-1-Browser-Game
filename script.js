// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// This is used to initialize the Kaboom content from the library
kaboom();

// Loads sprite to be used in the game
loadSprite('character-left', "assets/character-left.png")

//test code to add sprite on the page
const player = add([
    sprite('character-left'),
    pos(100,100),
])
// Text code to ensure the library has been implemented.
add([
    text("hello"),
    pos(300, 300),
]);