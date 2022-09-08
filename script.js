// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// This is used to initialize the Kaboom content from the library
kaboom();

const charSpeed = 120

// Loads sprite to be used in the game
loadSprite('character-left', "assets/character-left.png")
loadSprite('character-right', "assets/character-right.png")
loadSprite('character-up', "assets/character-up.png")
loadSprite('character-down', "assets/character-down.png")


loadSprite('top-wall', "assets/top-wall.png")
loadSprite('bottom-wall', "assets/bottom-wall.png")
loadSprite('left-wall', "assets/left-wall.png")
loadSprite('right-wall', "assets/right-wall.png")

loadSprite('top-right-wall', "assets/top-right-wall.png")
loadSprite('top-left-wall', "assets/top-left-wall.png")
loadSprite('bottom-right-wall', "assets/bottom-right-wall.png")
loadSprite('bottom-left-wall', "assets/bottom-left-wall.png")

loadSprite('top-stairs', "assets/top-stairs.png")
loadSprite('bottom-stairs', "assets/bottom-stairs.png")
loadSprite('left-stairs', "assets/left-stairs.png")
loadSprite('right-stairs', "assets/right-stairs.png")

loadSprite('block', "assets/block.png")

loadSprite('enemy-1', "assets/enemy-1.png")
loadSprite('enemy-2', "assets/enemy-2.png")



//Scene() defines a scene used to create an area where the game will be handled
scene("game", ({level}) => {

    //define the layout of the floor using symbols defined 
    const mapLayout = [
    [
        '1tttttttttt2',
        'l     5    r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        'l          r',
        '3bbbbbbbbbb4',
    ],
    [
        '1ttttttttttt2',
        'l     5     r',
        'l           r',
        'l   xxxxx   r',
        'l   x   x   r',
        'l e x   x e r',
        'l   x   x   r',
        'l           r',
        'l           r',
        '3bbbbbbbbbbb4',
    ],
    [
        '1tttttttttt2',
        'l    x5    r',
        'l    x     r',
        'l e   xx   r',
        'l      x f r',
        'l  x   x   r',
        'l   xxxxx  r',
        'l e        r',
        'l          r',
        '3bbbbbbbbbb4',
    ],
    [
        '1tttttttttt2',
        'l          r',
        'l      f   r',
        'l  x     xxr',
        'l7 x    x  r',
        'lxxx  x x xr',
        'l     x x  r',
        'l e   x  f r',
        'l      x   r',
        '3bbbbbbbbbb4',
    ],
    [
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
    ],
    [
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
    ],
    [
        '1tttttttttttt2',
        'lx x xxx x x r',
        'l x  x x x x r',
        'l x  xxx xxx r',
        'l            r',
        'l            r',
        'lx x x x xx xr',
        'lx x x x x xxr',
        'lxxxxx x x  xr',
        '3bbbbbbbbbbbb4',
    ]]

    //defines the symbols to be used for the map layout, each symbol is assigned a sprite that was loaded above using loadSprite(), also defines width and height of the map
    //area() creates a collider area and allows for collision detection
    //solid() makes it so that other objects cannot move through the object specified with solid()
    const levelSettings = {
        width: 32,
        height: 32,
        'l': () => [sprite('left-wall'), area(), solid()],
        'b': () => [sprite('bottom-wall'), area(), solid()],
        'r': () => [sprite('right-wall'),  area(), solid()],
        't': () => [sprite('top-wall'), area(), solid()],
        '1': () => [sprite('top-left-wall'), area(), solid()],
        '2': () => [sprite('top-right-wall'), area(), solid()],
        '3': () => [sprite('bottom-left-wall'), area(), solid()],
        '4': () => [sprite('bottom-right-wall'), area(), solid()],

        '5': () => [sprite('top-stairs'), 'next-floor', area()],
        '6': () => [sprite('bottom-stairs'), 'next-floor', area()],
        '7': () => [sprite('left-stairs'), 'next-floor', area()],
        '8': () => [sprite('right-stairs'), 'next-floor', area()],

        'x': () => [sprite('block'), area(), solid()],
        'e': () => [sprite('enemy-1'), 'enemy', area()],
        'f': () => [sprite('enemy-2'), 'enemy', area()],
    }

    addLevel(mapLayout[level], levelSettings)

    //test code to add sprite on the page
    const player = add([
        sprite('character-down'),
        pos(175,125),
        area(),
        solid(),
        {
            //this will make it so that the direction of the character is down by default
            dir: vec2(0,-1)
        }
    ])

    //onKeyDown() allows for events to be used when a specified key is pressed

    //When left arrow key is pressed, player will move their character to the left
    onKeyDown('left', () => {
        //.use() will change the sprite of the playable character to whichever direction the character is moving
        player.use(sprite('character-left'))
        
        //.move() will move the character at a set speed using x-axis and y-axis movement. (x,0) will move the character left or right depending on the value
        player.move(-charSpeed, 0)

        //.dir() will change the direction the character is "facing" at the current moment using x-axis and y-axis coordinates. (x,0) detemines whether the character is facing left or right
        player.dir = vec2(-1,0)
    })
    onKeyDown('right', () => {
        player.use(sprite('character-right'))
        player.move(charSpeed, 0)
        player.dir = vec2(1,0)
    })
    onKeyDown('up', () => {
        player.use(sprite('character-up'))

        //.move() will move the character at a set speed using x-axis and y-axis movement. (0,y) will move the character up or down depending on the value
        player.move(0, -charSpeed)

        //.dir() will change the direction the character is "facing" at the current moment using x-axis and y-axis coordinates. (0,y) detemines whether the character is facing up or down
        player.dir = vec2(0,1)
    })
    onKeyDown('down', () => {
        player.use(sprite('character-down'))
        player.move(0, charSpeed)
        player.dir = vec2(0,-1)
    })

    player.onCollide('next-floor', () => {
        go("game", {
            level: (level + 1)
        })
    })

    player.onCollide('enemy', () => {

    })
})

go("game", {level: 0})