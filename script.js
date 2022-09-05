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

loadSprite('enemy-1', "assets/enemy-1.png")
loadSprite('enemy-2', "assets/enemy-2.png")
loadSprite('boss-1', "assets/boss-1.png")
loadSprite('boss-2', "assets/boss-2.png")
loadSprite('final-boss', "assets/final-boss.png")


//Scene() defines a scene used to create an area where the game will be handled
scene("game", ({level}) => {
    
    //define the layout of the floor using symbols defined 
    const mapLayout = [
    [
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
    ],
    [
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
    ],
    [
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
    ],
    [
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
    ],
    [
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
    ],
    [
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
    ],
    [
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
    ]]

    //defines the symbols to be used for the map layout, each symbol is assigned a sprite that was loaded above using loadSprite(), also defines width and height of the map
    //area() creates a collider area and allows for collision detection
    //solid() makes it so that other objects cannot move through the object specified with solid()
    const levelSettings = {
        width: 32,
        height: 32,
        'l': () => [sprite('left-wall'), area(), solid()],
        'b': () => [sprite('bottom-wall'), area(), solid()],
        'r': () => [sprite('right-wall'), area(), solid()],
        't': () => [sprite('top-wall'), area(), solid()],
        '1': () => [sprite('top-left-wall'), area(), solid()],
        '2': () => [sprite('top-right-wall'), area(), solid()],
        '3': () => [sprite('bottom-left-wall'), area(), solid()],
        '4': () => [sprite('bottom-right-wall'), area(), solid()],

        '5': () => [sprite('top-closed-door'), area(), solid()],
        '6': () => [sprite('top-opened-door'), area()],
        '7': () => [sprite('bottom-closed-door'), area(), solid()],
        '8': () => [sprite('bottom-opened-door'), area()],
        '9': () => [sprite('left-closed-door'), area(), solid()],
        '0': () => [sprite('left-opened-door'), area()],
        '!': () => [sprite('right-closed-door'), area(), solid()],
        '@': () => [sprite('right-opened-door'), area()],

        'x': () => [sprite('block'), area(), solid()],
        'e': () => [sprite('enemy-1'), area()],
        'f': () => [sprite('enemy-2'), area()],
        'g': () => [sprite('boss-1'), area()],
        'h': () => [sprite('boss-2'), area()],
        'i': () => [sprite('final-boss'), area()],
    }

    addLevel(mapLayout[level], levelSettings)

    //test code to add sprite on the page
    const player = add([
        sprite('character-down'),
        pos(175,125),
        area(),
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
})

go("game", {level: 0})