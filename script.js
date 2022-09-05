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
loadSprite('top-opened-door', "assets/top-opened-door.png")
loadSprite('bottom-closed-door', "assets/bottom-closed-door.png")
loadSprite('bottom-opened-door', "assets/bottom-opened-door.png")
loadSprite('right-closed-door', "assets/right-closed-door.png")
loadSprite('right-opened-door', "assets/right-opened-door.png")
loadSprite('left-closed-door', "assets/left-closed-door.png")
loadSprite('left-opened-door', "assets/left-opened-door.png")

loadSprite('block', "assets/block.png")
loadSprite('switch', "assets/switch.png")
loadSprite('switch-pressed', "assets/switch-pressed.png")

loadSprite('enemy-1', "assets/enemy-1.png")
loadSprite('enemy-2', "assets/enemy-2.png")
loadSprite('boss-1', "assets/boss-1.png")
loadSprite('boss-2', "assets/boss-2.png")
loadSprite('final-boss', "assets/final-boss.png")

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
        '1ttttt5tttt2',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        '0          @',
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
        '9 x   x   x r',
        'l x e x f x @',
        'l x   x   x r',
        'l x   x   x r',
        'l     x     r',
        '3bbbbbbbbbbb4',
    ]

    const mapLayout3 = [
        '1tttttttttt2',
        'l xx    xx r',
        'l x      x r',
        'lx        xr',
        'l    g     @',
        'l          r',
        'lx        xr',
        'l x      x r',
        'l xx    xx r',
        '3bbbbbbbbbb4',
    ]

    const mapLayout4 = [
        '1tttttttttt2',
        'l          r',
        'l      f   r',
        'l x      xxr',
        '0 x   x x  !',
        'lx  e x x xr',
        'l     x x  r',
        'l e   x  f r',
        'l      x   r',
        '3bbbbbbbbbb4',
    ]

    const mapLayout5 = [
        '1tttttttttt2',
        'l xx    xx r',
        'l x      x r',
        'lx        xr',
        '0    h     r',
        'l          r',
        'lx        xr',
        'l x      x r',
        'l xx    xx r',
        '3bbbbbbbbbb4',
    ]

    const mapLayout6 = [
        '1tttt8ttttt2',
        'lxxxx  xxxxr',
        'l          r',
        'lxxxxxxxxx r',
        'l          r',
        'l xxxxxxxxxr',
        'l          r',
        'lxxxx  xxxxr',
        'l          r',
        '3bbbb8bbbbb4',
    ]

    const mapLayout7 = [
        '1tttttttttt2',
        'l xx    xx r',
        'l x      x r',
        'lx   i    xr',
        'l          r',
        'l          r',
        'lx        xr',
        'l x      x r',
        'l xx    xx r',
        '3bbbb8bbbbb4',
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

        '5': () => [sprite('top-closed-door')],
        '6': () => [sprite('top-opened-door')],
        '7': () => [sprite('bottom-closed-door')],
        '8': () => [sprite('bottom-opened-door')],
        '9': () => [sprite('left-closed-door')],
        '0': () => [sprite('left-opened-door')],
        '!': () => [sprite('right-closed-door')],
        '@': () => [sprite('right-opened-door')],

        'x': () => [sprite('block')],
        'e': () => [sprite('enemy-1')],
        'f': () => [sprite('enemy-2')],
        'g': () => [sprite('boss-1')],
        'h': () => [sprite('boss-2')],
        'i': () => [sprite('final-boss')],
    }

    //addLevel(mapLayout1, levelSettings)
    //addLevel(mapLayout2, levelSettings)
    addLevel(mapLayout1, levelSettings)
})

go("game")