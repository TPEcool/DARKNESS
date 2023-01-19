namespace SpriteKind {
    export const dashCrystal = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(player_ball.isHittingTile(CollisionDirection.Bottom)) && canDash) {
        dashy = player_ball.y
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
            player_ball.y = dashy
            player_ball.x += 4
            pause(1)
        }
        wait_for_gnd_contact()
    }
})
sprites.onDestroyed(SpriteKind.Player, function (sprite2) {
    game.over(false, effects.melt)
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
        music.playSoundEffect(music.createSoundEffect(
        WaveShape.Square,
        1000 + randint(-720, 720),
        0,
        1024,
        0,
        500,
        SoundExpressionEffect.None,
        InterpolationCurve.Logarithmic
        ), SoundExpressionPlayMode.UntilDone)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.dashCrystal, function (sprite, otherSprite) {
    otherSprite.destroy(effects.ashes, 500)
    sprite.sayText("I can now dash again without landing!", 2000, true)
    canDash = true
})
function ded () {
    player_ball.destroy(effects.fire, 1000)
}
let music_picker = 0
let dashy = 0
let canDash = false
let player_ball: Sprite = null
controller.combos.setTimeout(1000)
controller.combos.setTriggerType(TriggerType.Continuous)
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
let dashCryst = sprites.create(assets.image`dashCrystStatic`, SpriteKind.dashCrystal)
game.onUpdate(function () {
    if (controller.right.isPressed()) {
        player_ball.vx = 100
        music.footstep.play()
    } else if (controller.left.isPressed()) {
        player_ball.vx = -100
        music.footstep.play()
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
    music_picker = randint(0, 3)
    music.setTempo(randint(1, 52) * 10)
    if (music_picker == 0) {
        music.playMelody("C D C F C G E D ", 120)
    } else if (music_picker == 1) {
        music.playMelody("G E G F B F G C5 ", 120)
    } else if (music_picker == 2) {
        music.playMelody("E A G F B A G F ", 120)
    } else {
        music.playMelody("A F C5 C A D B E ", 120)
    }
})
