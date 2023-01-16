def on_b_pressed():
    global canDash
    if not (mySprite.is_hitting_tile(CollisionDirection.BOTTOM)) and canDash:
        canDash = False
        music.play_sound_effect(music.create_sound_effect(WaveShape.NOISE,
                randint(15, 30) * 50,
                0,
                1024,
                0,
                500,
                SoundExpressionEffect.VIBRATO,
                InterpolationCurve.LINEAR),
            SoundExpressionPlayMode.IN_BACKGROUND)
        scene.camera_shake(4, 200)
        for index in range(16):
            mySprite.x += 4
            pause(10)
        wait_for_gnd_contact()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vy = -50
        music.play_sound_effect(music.create_sound_effect(WaveShape.SINE,
                5000,
                0,
                255,
                0,
                500,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            SoundExpressionPlayMode.UNTIL_DONE)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def ded():
    mySprite.destroy(effects.fire, 1000)

def on_on_destroyed(sprite):
    game.over(False, effects.melt)
sprites.on_destroyed(SpriteKind.player, on_on_destroyed)

def wait_for_gnd_contact():
    global canDash
    while not (mySprite.is_hitting_tile(CollisionDirection.BOTTOM)):
        canDash = False
        pause(100)
        continue
    canDash = True
canDash = False
mySprite: Sprite = None
scene.set_background_color(15)
tiles.set_current_tilemap(tilemap("""
    level0
"""))
mySprite = sprites.create(assets.image("""
    character
"""), SpriteKind.player)
tiles.place_on_tile(mySprite, tiles.get_tile_location(0, 13))
scene.camera_follow_sprite(mySprite)
mySprite.fx = 15
mySprite.fy = 15
mySprite.ax = 20
mySprite.ay = 75
canDash = True

def on_on_update():
    if controller.right.is_pressed():
        mySprite.vx = 100
    elif controller.left.is_pressed():
        mySprite.vx = -100
    else:
        mySprite.vx = 0
    if mySprite.tile_kind_at(TileDirection.LEFT, assets.tile("""
        deadly tile
    """)):
        ded()
    elif mySprite.tile_kind_at(TileDirection.TOP, assets.tile("""
        deadly tile
    """)):
        ded()
    elif mySprite.tile_kind_at(TileDirection.RIGHT, assets.tile("""
        deadly tile
    """)):
        ded()
    elif mySprite.tile_kind_at(TileDirection.BOTTOM, assets.tile("""
        deadly tile
    """)):
        ded()
    else:
        if mySprite.tile_kind_at(TileDirection.CENTER, assets.tile("""
            door
        """)):
            game.over(True, effects.star_field)
        else:
            pass
game.on_update(on_on_update)

def on_forever():
    music.play_melody("E B C5 A B G A F ", 120)
    music.play_melody("C5 A B G A F G E ", 120)
    music.play_melody("A F E F D G E F ", 120)
    music.play_melody("E D G F B A C5 B ", 120)
forever(on_forever)
