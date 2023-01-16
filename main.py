@namespace
class SpriteKind:
    dashCrystal = SpriteKind.create()

def on_b_pressed():
    global canDash
    if not (player_ball.is_hitting_tile(CollisionDirection.BOTTOM)) and canDash:
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
        scene.camera_shake(2, 100)
        for index in range(32):
            player_ball.x += 4
            pause(1)
        wait_for_gnd_contact()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def wait_for_gnd_contact():
    global canDash
    while not (player_ball.is_hitting_tile(CollisionDirection.BOTTOM) or canDash):
        canDash = False
        pause(100)
        continue
    canDash = True

def on_a_pressed():
    if player_ball.is_hitting_tile(CollisionDirection.BOTTOM):
        player_ball.vy = -50
        music.play_sound_effect(music.create_sound_effect(WaveShape.SQUARE,
                1000 + randint(-720, 720),
                0,
                1024,
                0,
                500,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LOGARITHMIC),
            SoundExpressionPlayMode.UNTIL_DONE)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    global canDash
    otherSprite.destroy(effects.ashes, 500)
    sprite.say_text("I can now dash again without landing!", 500, True)
    canDash = True
sprites.on_overlap(SpriteKind.player, SpriteKind.dashCrystal, on_on_overlap)

def on_combos_attach_combo():
    index2 = 0
    while index2 <= len(tiles.get_tiles_by_type(assets.tile("""
        deadly tile
    """))) + 1:
        index2 = 1
        tiles.set_tile_at(tiles.get_tile_location(tiles.get_tiles_by_type(assets.tile("""
                    deadly tile
                """))[index2].column,
                tiles.get_tiles_by_type(assets.tile("""
                    deadly tile
                """))[index2].row),
            assets.tile("""
                fine cell
            """))
        index2 += 1
controller.combos.attach_combo("BABA", on_combos_attach_combo)

def ded():
    player_ball.destroy(effects.fire, 1000)

def on_on_destroyed(sprite2):
    game.over(False, effects.melt)
sprites.on_destroyed(SpriteKind.player, on_on_destroyed)

canDash = False
player_ball: Sprite = None
controller.combos.set_timeout(1000)
controller.combos.set_trigger_type(TriggerType.CONTINUOUS)
scene.set_background_color(15)
tiles.set_current_tilemap(tilemap("""
    level0
"""))
player_ball = sprites.create(assets.image("""
    character
"""), SpriteKind.player)
tiles.place_on_tile(player_ball, tiles.get_tile_location(0, 13))
scene.camera_follow_sprite(player_ball)
player_ball.fx = 15
player_ball.fy = 15
player_ball.ax = 20
player_ball.ay = 75
canDash = True

def on_on_update():
    if controller.right.is_pressed():
        player_ball.vx = 100
    elif controller.left.is_pressed():
        player_ball.vx = -100
    else:
        player_ball.vx = 0
    if player_ball.tile_kind_at(TileDirection.LEFT, assets.tile("""
        deadly tile
    """)):
        ded()
    elif player_ball.tile_kind_at(TileDirection.TOP, assets.tile("""
        deadly tile
    """)):
        ded()
    elif player_ball.tile_kind_at(TileDirection.RIGHT, assets.tile("""
        deadly tile
    """)):
        ded()
    elif player_ball.tile_kind_at(TileDirection.BOTTOM, assets.tile("""
        deadly tile
    """)):
        ded()
    elif player_ball.tile_kind_at(TileDirection.CENTER, assets.tile("""
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
