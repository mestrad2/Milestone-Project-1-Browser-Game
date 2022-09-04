// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// This is used to initialize the Kaboom content from the library
kaboom();

// Loads sprite to be used in the game
loadSprite('character-left', "assets/character-left.png")
loadSprite('character-right', "assets/character-right.png")
loadSprite('character-up', "assets/character-up.png")
loadSprite('character-down', "assets/character-down.png")

loadSprite('attack-left', "assets/attack-left.png")
loadSprite('attack-right', "assets/attack-right.png")
loadSprite('attack-up', "assets/attack-up.png")
loadSprite('attack-down', "assets/attack-down.png")

loadSprite('top-wall', "assets/top-wall.png")
loadSprite('bottom-wall', "assets/bottom-wall.png")
loadSprite('left-wall', "assets/left-wall.png")
loadSprite('right-wall', "assets/right-wall.png")

loadSprite('top-right-wall', "assets/top-right-wall.png")
loadSprite('top-left-wall', "assets/top-left-wall.png")
loadSprite('bottom-right-wall', "assets/bottom-right-wall.png")
loadSprite('bottom-left-wall', "assets/bottom-left-wall.png")

loadSprite('top-closed-door', "assets/top-closed-door.png")
loadSprite('bottom-closed-door', "assets/bottom-closed-door.png")

loadSprite('block', "assets/block.png")



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


//Scene() defines a scene used to create an area where the game will be handled
scene("game", () => {
    //define the layout of the floor using symbols defined 
    const mapLayout1 = [
        '1tttttttttt2',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        '3bbbbbbbbbb4',
    ]

    const mapLayout2 = [
        '1ttttttttttt2',
        'l         x r',
        'l     x   x r',
        'lxx   x   x r',
        'l x   x   x r',
        'l x   x   x r',
        'l x   x   x r',
        'l x   x   x r',
        'l     x     r',
        '3bbbbbbbbbbb4',
    ]

    const mapLayout3 = [
        '1tttttttttt2',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        '3bbbbbbbbbb4',
    ]

    const mapLayout4 = [
        '1tttttttttt2',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        '3bbbbbbbbbb4',
    ]

    const mapLayout5 = [
        '1tttttttttt2',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        '3bbbbbbbbbb4',
    ]

    const mapLayout6 = [
        '1tttttttttt2',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        '3bbbbbbbbbb4',
    ]

    const mapLayout7 = [
        '1tttttttttt2',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        '3bbbbbbbbbb4',
    ]

    //defines the symbols to be used for the map layout, each symbol is assigned a sprite that was loaded above using loadSprite(), also defines width and height of the map
    const levelSettings = {
        width: 32,
        height: 32,
        'l': () => [sprite('left-wall')],
        'b': () => [sprite('bottom-wall')],
        'r': () => [sprite('right-wall')],
        't': () => [sprite('top-wall')],
        '1': () => [sprite('top-left-wall')],
        '2': () => [sprite('top-right-wall')],
        '3': () => [sprite('bottom-left-wall')],
        '4': () => [sprite('bottom-right-wall')],
        'x': () => [sprite('block')]
    }

    //addLevel(mapLayout1, levelSettings)
    addLevel(mapLayout2, levelSettings)
})

go("game")