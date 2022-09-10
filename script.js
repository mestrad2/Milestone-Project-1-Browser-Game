// import kaboom library
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// This is used to initialize the Kaboom content from the library, includes options for the width and height of the container and the background color
kaboom({
    width: 600,
    height: 650,
    background: [130, 130, 130]
});

//set constants for the speed that the playable character and enemies will be able to move
const charSpeed = 120
const enemySpeedOne = 60
const enemySpeedTwo = 45

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

//define the layout of the floor using symbols defined 
const mapLayout = [
    [
        '1tttttttttt2',
        'lxxxx 5 xxxr',
        'lx        xr',
        'lx        xr',
        'lx        xr',
        'lx        xr',
        'lx        xr',
        'lx        xr',
        'lxxxxxxxxxxr',
        '3bbbbbbbbbb4',
    ],
    [
        '1ttttttttttttttt2',
        'lxxxxxx 5 xxxxxxr',
        'lx             xr',
        'lx             xr',
        'lx    xxx      xr',
        'lx   x   x     xr',
        'lx f x   x  e  xr',
        'lx   x   x     xr',
        'lx             xr',
        'lx             xr',
        'lx             xr',
        'lxxxxxxxxxxxxxxxr',
        '3bbbbbbbbbbbbbbb4',
    ],
    [
        '1ttttttttttttt2',
        'lxxxxxx5  xxxxr',
        'lx    x      xr',
        'lx     x     xr',
        'lx e    xx   xr',
        'lx       x   xr',
        'lx  x    x f xr',
        'lx  x    x   xr',
        'lx   xxxxx   xr',
        'lx           xr',
        'lx e         xr',
        'lx           xr',
        'lxxxxxxxxxxxxxr',
        '3bbbbbbbbbbbbb4',
    ],
    [
        '1tttttttttttttttt2',
        'lxxxxxxxxxxxxxxxxr',
        'lx              xr',
        'lx  e           xr',
        'lx     xxxxx    xr',
        'lx    x      f  xr',
        'lx    x         xr',
        'lx    x         xr',
        'lx    xxxxxxxxxxxr',
        'lx              xr',
        'lx        e     xr',
        'lx              xr',
        'lxxxxxxxx  xxxxxxr',
        'lx      x       xr',
        'lx      x   e   xr',
        'lx    f x       xr',
        'lx              xr',
        'l               xr',
        'l7   xxxxxxxxxxxxr',
        '3bbbbbbbbbbbbbbbb4',
    ],
    [
        '1tttttttttttttt2',
        'l x x xxx x x  r',
        'l xxx x x x x  r',
        'l  x  x x x x  r',
        'l  x  xxx xxx  r',
        'l              r',
        'l              r',
        'l x x x x xx x r',
        'l x x x x x xx r',
        'l xxxxx x x  x r',
        '3bbbbbbbbbbbbbb4',
    ],
    [
        '1ttttttttttttttttt2',
        'l   x x xxx x x   r',
        'l   xxx x x x x   r',
        'l    x  x x x x   r',
        'l    x  xxx xxx   r',
        'l                 r',
        'l                 r',
        'l x   xxx xxx xxx r',
        'l x   x x x   x   r',
        'l x   x x  x  xxx r',
        'l x   x x   x x   r',
        'l xxx xxx xxx xxx r',
        '3bbbbbbbbbbbbbbbbb4',
    ]]

//defines the symbols to be used for the map layout, each symbol is assigned a sprite that was loaded above using loadSprite(), also defines width and height of the map
//area() creates a collider area and allows for collision detection
//solid() makes it so that other objects cannot move through the object specified with solid()
const levelSettings = {
    width: 32,
    height: 32,
    'l': () => [sprite('left-wall'), 'wall', area(), solid()],
    'b': () => [sprite('bottom-wall'), 'wall', area(), solid()],
    'r': () => [sprite('right-wall'), 'wall', area(), solid()],
    't': () => [sprite('top-wall'), 'wall', area(), solid()],
    '1': () => [sprite('top-left-wall'), 'wall', area(), solid()],
    '2': () => [sprite('top-right-wall'), 'wall', area(), solid()],
    '3': () => [sprite('bottom-left-wall'), 'wall', area(), solid()],
    '4': () => [sprite('bottom-right-wall'), 'wall', area(), solid()],

    '5': () => [sprite('top-stairs'), 'next-floor', area()],
    '6': () => [sprite('bottom-stairs'), 'next-floor', area()],
    '7': () => [sprite('left-stairs'), 'next-floor', area()],
    '8': () => [sprite('right-stairs'), 'next-floor', area()],

    'x': () => [sprite('block'), 'block', area(), solid()],
    'e': () => [sprite('enemy-1'), 'enemy-1', area(), { dir: 1 }],
    'f': () => [sprite('enemy-2'), 'enemy-2', area(), { dir: -1 }],
}


//Scene() defines a scene used to create an area where the game will be handled. This accepts a parameter level, which indicates with index of the array mapLayout it will start on.
scene("game", ({ level }) => {

    //addlevel() uses the map layouts and level settings above to add the current level onto the kaboom container
    addLevel(mapLayout[level], levelSettings)

    //Creates a constant variable for the player which will add the playable character into the scene.
    //area() allows for the player sprite to use collision detection.
    const player = add([
        sprite('character-down'),
        pos(210, 160),
        area(),
        solid(),
        {
            //this will make it so that the direction of the character is down by default
            dir: vec2(0, -1)
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
        player.dir = vec2(-1, 0)
    })
    onKeyDown('right', () => {
        player.use(sprite('character-right'))
        player.move(charSpeed, 0)
        player.dir = vec2(1, 0)
    })
    onKeyDown('up', () => {
        player.use(sprite('character-up'))

        //.move() will move the character at a set speed using x-axis and y-axis movement. (0,y) will move the character up or down depending on the value
        player.move(0, -charSpeed)

        //.dir() will change the direction the character is "facing" at the current moment using x-axis and y-axis coordinates. (0,y) detemines whether the character is facing up or down
        player.dir = vec2(0, 1)
    })
    onKeyDown('down', () => {
        player.use(sprite('character-down'))
        player.move(0, charSpeed)
        player.dir = vec2(0, -1)
    })

    //onUpdate() runs an event for any object with a specific tag every frame
    onUpdate('enemy-1', (e) => {
        //this will move the enemy from left to right based on their speed, which is defined above
        e.move(e.dir * enemySpeedOne, 0);
    })

    //onCollide() checks to see if two objects collide with one another, and performs a specific action
    onCollide('enemy-1', 'block', (e) => {
        //this will change the direction of the enemy when it collides with a block
        e.dir = -e.dir
    })

    onUpdate('enemy-2', (e) => {
        e.move(0, e.dir * enemySpeedTwo);
    })

    onCollide('enemy-2', 'block', (e) => {
        e.dir = -e.dir
    })


    //player.onCollide() will check to see if the player collides with the stairs on any given map, and when they do they proceed to the next level
    player.onCollide('next-floor', () => {
        go("game", {
            level: (level + 1)
        })
    })

    //player.onCollide() will check to see if the player collides with an enemy on any given map, and when they do they proceed lose screen
    player.onCollide('enemy-1', () => {
        go("game over")
    })

    player.onCollide('enemy-2', () => {
        go("game over")
    })
})

//this scene is only accessed when the player collides with an enemy
scene("game over", () => {
    addLevel(mapLayout[5], levelSettings)
})

//go() is what initializes the game on the screen, starting on floor 0 and passing the value 0 onto the main scene
go("game", { level: 0 })