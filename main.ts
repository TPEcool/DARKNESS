namespace SpriteKind {
    export const dashCrystal = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(player_ball.isHittingTile(CollisionDirection.Bottom)) && canDash) {
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
        scene.cameraShake(2, 100)
        for (let index = 0; index < 32; index++) {
            player_ball.x += 4
            pause(1)
        }
        wait_for_gnd_contact()
    }
})
function wait_for_gnd_contact () {
    while (!(player_ball.isHittingTile(CollisionDirection.Bottom) || canDash)) {
        canDash = false
        pause(100)
        continue;
    }
    canDash = true
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player_ball.isHittingTile(CollisionDirection.Bottom)) {
        player_ball.vy = -50
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.dashCrystal, function (sprite, otherSprite) {
    otherSprite.destroy(effects.ashes, 500)
    sprite.sayText("I can now dash again without landing!", 500, true)
    canDash = true
})
controller.combos.attachCombo("AABBBABAABAB", function () {
    for (let index = 0; index <= tiles.getTilesByType(assets.tile`deadly tile`).length; index++) {
        tiles.setTileAt(tiles.getTileLocation(tiles.getTilesByType(assets.tile`deadly tile`)[index].column, tiles.getTilesByType(assets.tile`deadly tile`)[index].row), assets.tile`fine cell`)
    }
})
function ded () {
    player_ball.destroy(effects.fire, 1000)
}
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    game.over(false, effects.melt)
})
let canDash = false
let player_ball: Sprite = null
scene.setBackgroundColor(15)
tiles.setCurrentTilemap(tilemap`level0`)
player_ball = sprites.create(assets.image`character`, SpriteKind.Player)
tiles.placeOnTile(player_ball, tiles.getTileLocation(0, 13))
scene.cameraFollowSprite(player_ball)
player_ball.fx = 15
player_ball.fy = 15
player_ball.ax = 20
player_ball.ay = 75
canDash = true
game.onUpdate(function () {
    if (controller.right.isPressed()) {
        player_ball.vx = 100
    } else if (controller.left.isPressed()) {
        player_ball.vx = -100
    } else {
        player_ball.vx = 0
    }
    if (player_ball.tileKindAt(TileDirection.Left, assets.tile`deadly tile`)) {
        ded()
    } else if (player_ball.tileKindAt(TileDirection.Top, assets.tile`deadly tile`)) {
        ded()
    } else if (player_ball.tileKindAt(TileDirection.Right, assets.tile`deadly tile`)) {
        ded()
    } else if (player_ball.tileKindAt(TileDirection.Bottom, assets.tile`deadly tile`)) {
        ded()
    } else if (player_ball.tileKindAt(TileDirection.Center, assets.tile`door`)) {
        game.over(true, effects.starField)
    } else {
    	
    }
})
forever(function () {
    music.playMelody("E B C5 A B G A F ", 120)
    music.playMelody("C5 A B G A F G E ", 120)
    music.playMelody("A F E F D G E F ", 120)
    music.playMelody("E D G F B A C5 B ", 120)
})
