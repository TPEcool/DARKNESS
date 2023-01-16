controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(mySprite.isHittingTile(CollisionDirection.Bottom)) && canDash) {
        canDash = false
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Noise,
        randint(15, 30) * 50,
        0,
        1024,
        0,
        500,
        SoundExpressionEffect.Vibrato,
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.InBackground)
        for (let index = 0; index < 16; index++) {
            mySprite.x += 4
            pause(10)
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(mySprite.x, mySprite.y), assets.tile`transparency16`) || false) {
            canDash = true
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -50
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Noise,
        randint(15, 30) * 50,
        0,
        1024,
        0,
        500,
        SoundExpressionEffect.None,
        InterpolationCurve.Logarithmic
        ), SoundExpressionPlayMode.UntilDone)
    }
})
function ded () {
    mySprite.destroy(effects.fire, 1000)
}
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    game.over(false, effects.melt)
})
let canDash = false
let mySprite: Sprite = null
scene.setBackgroundColor(15)
tiles.setCurrentTilemap(tilemap`level0`)
mySprite = sprites.create(assets.image`character`, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 13))
scene.cameraFollowSprite(mySprite)
mySprite.fx = 15
mySprite.fy = 15
mySprite.ax = 20
mySprite.ay = 75
canDash = true
game.onUpdate(function () {
    if (controller.right.isPressed()) {
        mySprite.vx = 100
    } else if (controller.left.isPressed()) {
        mySprite.vx = -100
    } else {
        mySprite.vx = 0
    }
    if (mySprite.tileKindAt(TileDirection.Left, assets.tile`deadly tile`)) {
        ded()
    } else if (mySprite.tileKindAt(TileDirection.Top, assets.tile`deadly tile`)) {
        ded()
    } else if (mySprite.tileKindAt(TileDirection.Right, assets.tile`deadly tile`)) {
        ded()
    } else if (mySprite.tileKindAt(TileDirection.Bottom, assets.tile`deadly tile`)) {
        ded()
    } else {
        if (mySprite.tileKindAt(TileDirection.Center, assets.tile`door`)) {
            game.over(true, effects.starField)
        } else {
        	
        }
    }
})
forever(function () {
    music.playMelody("E B C5 A B G A F ", 120)
    music.playMelody("C5 A B G A F G E ", 120)
    music.playMelody("A F E F D G E F ", 120)
    music.playMelody("E D G F B A C5 B ", 120)
})
