def on_a_pressed():
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vy = -50
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def killPlayer():
    mySprite.destroy(effects.disintegrate, 500)
    game.over(False, effects.melt)
mySprite: Sprite = None
scene.set_background_color(15)
tiles.set_current_tilemap(tilemap("""level0"""))
mySprite = sprites.create(assets.image("""
    character
"""), SpriteKind.player)
tiles.place_on_tile(mySprite, tiles.get_tile_location(0, 13))
scene.camera_follow_sprite(mySprite)
mySprite.set_flag(SpriteFlag.SHOW_PHYSICS, True)
mySprite.fx = 15
mySprite.fy = 15
mySprite.ax = 20
mySprite.ay = 75

def on_on_update():
    if controller.right.is_pressed():
        mySprite.vx = 100
    elif controller.left.is_pressed():
        mySprite.vx = -100
    else:
        mySprite.vx = 0
    if mySprite.tile_kind_at(TileDirection.BOTTOM, assets.tile("""
        deadly tile
    """)):
        killPlayer()
    elif mySprite.tile_kind_at(TileDirection.LEFT, assets.tile("""
        deadly tile
    """)):
        killPlayer()
    elif mySprite.tile_kind_at(TileDirection.TOP, assets.tile("""
        deadly tile
    """)):
        killPlayer()
    elif mySprite.tile_kind_at(TileDirection.RIGHT, assets.tile("""
        deadly tile
    """)):
        killPlayer()
    else:
        killPlayer()
game.on_update(on_on_update)
