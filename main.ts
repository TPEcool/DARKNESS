controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -50
    }
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
	
})
let mySprite: Sprite = null
scene.setBackgroundColor(15)
tiles.setCurrentTilemap(tilemap`level0`)
mySprite = sprites.create(assets.image`character`, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 13))
scene.cameraFollowSprite(mySprite)
mySprite.setFlag(SpriteFlag.ShowPhysics, true)
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
})
