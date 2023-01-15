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
        InterpolationCurve.Linear
        ), SoundExpressionPlayMode.UntilDone)
    }
})
function ded () {
    mySprite.destroy(effects.fire, 2000)
}
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    game.over(false, effects.dissolve)
})
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
