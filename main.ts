namespace SpriteKind {
    export const Pushable = SpriteKind.create()
    export const ConveyorBelt = SpriteKind.create()
    export const SetPeice = SpriteKind.create()
    export const Hole = SpriteKind.create()
    export const StaticObject = SpriteKind.create()
}
function Detection (sprite: Sprite, othersprite: Sprite) {
    tempOverlap = sprite.overlapsWith(othersprite) && (othersprite.z + 5 > sprite.z && othersprite.z - 5 < sprite.z)
    if (sprite.kind() == SpriteKind.Pushable && othersprite.kind() == SpriteKind.Pushable && sprite.overlapsWith(othersprite)) {
        sprite.x += 0.25
        sprite.y += 0.125
        othersprite.x += -0.25
        othersprite.y += -0.125
    }
    return tempOverlap
}
sprites.onOverlap(SpriteKind.Pushable, SpriteKind.Pushable, function (sprite, otherSprite) {
    Detection(sprite, otherSprite)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PressA) {
        PressA = false
        music.stopAllSounds()
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 560, 568, 255, 137, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(100)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 560, 568, 133, 52, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(100)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 560, 568, 66, 10, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(100)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 560, 568, 30, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(100)
        color.startFade(color.originalPalette, color.Black, 500)
        pause(1000)
        color.startFade(color.Black, color.originalPalette, 500)
        Start()
    }
})
function Start () {
    scene.setBackgroundImage(assets.image`blank`)
    mySprite = sprites.create(assets.image`PlayerFaceDown`, SpriteKind.Player)
    tiles.setCurrentTilemap(tilemap`level`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 12))
    scene.cameraFollowSprite(mySprite)
    playerControl = false
    for (let Printers of tiles.getTilesByType(assets.tile`myTile4`)) {
        Printer = sprites.create(assets.image`Printer`, SpriteKind.Pushable)
        tiles.setTileAt(Printers, assets.tile`myTile`)
        tiles.placeOnTile(Printer, Printers)
        sprites.setDataBoolean(Printer, "Pushable", true)
    }
    for (let Holes of tiles.getTilesByType(assets.tile`myTile7`)) {
        Drop = sprites.create(assets.image`TheHole`, SpriteKind.Hole)
        tiles.setTileAt(Holes, assets.tile`myTile`)
        tiles.placeOnTile(Drop, Holes)
        Drop.x += 8
        Drop.y += 8
    }
    for (let Belts of tiles.getTilesByType(assets.tile`myTile5`)) {
        Conveyor = sprites.create(assets.image`ConveyorBelt`, SpriteKind.ConveyorBelt)
        tiles.setTileAt(Belts, assets.tile`myTile`)
        tiles.placeOnTile(Conveyor, Belts)
        Conveyor.x += -18
        animation.runImageAnimation(
        Conveyor,
        assets.animation`ConveyorAnim`,
        100,
        true
        )
        sprites.setDataString(Conveyor, "Direction", "Left")
    }
    for (let Belts2 of tiles.getTilesByType(assets.tile`myTile2`)) {
        Conveyor = sprites.create(assets.image`ConveyorBelt`, SpriteKind.ConveyorBelt)
        tiles.setTileAt(Belts2, assets.tile`myTile`)
        tiles.placeOnTile(Conveyor, Belts2)
        Conveyor.x += 28
        animation.runImageAnimation(
        Conveyor,
        CreateFlipped(assets.animation`ConveyorAnim`, true),
        100,
        true
        )
        sprites.setDataString(Conveyor, "Direction", "Down")
    }
    for (let NoPassZones of tiles.getTilesByType(assets.tile`myTile0`)) {
        Waller = sprites.create(assets.image`Fence`, SpriteKind.StaticObject)
        tiles.setTileAt(NoPassZones, assets.tile`myTile`)
        tiles.placeOnTile(Waller, NoPassZones)
        Waller.x += 14
    }
    animation.runImageAnimation(
    mySprite,
    assets.animation`BoxySleep`,
    100,
    true
    )
    for (let index = 0; index < 3; index++) {
        music.play(music.createSoundEffect(WaveShape.Sine, 1327, 706, 137, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        music.play(music.createSoundEffect(WaveShape.Sine, 945, 1321, 137, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
    music.stopAllSounds()
    music.play(music.createSong(assets.song`The Boss`), music.PlaybackMode.LoopingInBackground)
    music.play(music.createSoundEffect(WaveShape.Sine, 1327, 1136, 137, 100, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    animation.runImageAnimation(
    mySprite,
    assets.animation`myAnim`,
    100,
    false
    )
    story.printDialog("Hey!", 100, 120, 50, 180, 12, 13, story.TextSpeed.Normal)
    animation.stopAnimation(animation.AnimationTypes.All, mySprite)
    mySprite.setImage(assets.image`PlayerLookUp`)
    story.printDialog("Boxy!", 100, 120, 50, 180, 12, 13, story.TextSpeed.Normal)
    story.printDialog("Quit standing around and push the boxes on the conveyor belt!", 100, 120, 50, 180, 12, 13, story.TextSpeed.Normal)
    mySprite.setImage(assets.image`PlayerUnamused`)
    story.printDialog("I didn't hire you to just sit there mindlessly!", 100, 120, 50, 180, 12, 13, story.TextSpeed.Normal)
    mySprite.setImage(assets.image`PlayerLookUp`)
    story.printDialog("Get on with the job!", 100, 120, 50, 180, 12, 13, story.TextSpeed.Normal)
    mySprite.setImage(assets.image`PlayerFaceDown`)
    titleScreen = false
    playerControl = true
    music.stopAllSounds()
    music.play(music.createSong(assets.song`Theme`), music.PlaybackMode.LoopingInBackground)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ConveyorBelt, function (sprite, otherSprite) {
    canMove = true
    for (let Wallies of sprites.allOfKind(SpriteKind.StaticObject)) {
        if (Detection(sprite, Wallies)) {
            canMove = false
        }
    }
    if (canMove == true) {
        if (sprites.readDataString(otherSprite, "Direction") == "Left") {
            sprite.x += -0.25
            sprite.y += 0.125
        } else if (sprites.readDataString(otherSprite, "Direction") == "Down") {
            sprite.x += 0.25
            sprite.y += 0.125
        }
    }
})
function CreateFlipped (anim: Image[], horizontal: boolean) {
    tempFlippedAnim = []
    for (let frameindex = 0; frameindex <= anim.length - 1; frameindex++) {
        tempImage = anim[frameindex]
        if (horizontal) {
            tempImage.flipX()
        } else {
            tempImage.flipY()
        }
        tempFlippedAnim.push(tempImage)
    }
    return tempFlippedAnim
}
sprites.onOverlap(SpriteKind.Pushable, SpriteKind.Hole, function (sprite, otherSprite) {
    if (sprites.readDataBoolean(sprite, "Pushable") == true) {
        sprites.setDataBoolean(sprite, "Pushable", false)
        spriteutils.moveTo(sprite, spriteutils.point(otherSprite.x, otherSprite.y - 16), 500)
        pause(750)
        animation.runImageAnimation(
        sprite,
        assets.animation`FallIntoHole`,
        50,
        false
        )
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 619, 619, 255, 255, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(50)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 619, 619, 188, 188, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(50)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 619, 619, 111, 111, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(50)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 619, 619, 58, 58, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(50)
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 619, 619, 16, 16, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        pause(50)
        sprites.destroy(sprite)
    }
})
sprites.onOverlap(SpriteKind.Pushable, SpriteKind.ConveyorBelt, function (sprite, otherSprite) {
    if (sprites.readDataBoolean(sprite, "Pushable") == true) {
        if (sprites.readDataString(otherSprite, "Direction") == "Left" && !(Detection(mySprite, otherSprite))) {
            sprite.x += -0.25
            sprite.y += 0.125
        } else if (sprites.readDataString(otherSprite, "Direction") == "Down" && !(Detection(mySprite, otherSprite))) {
            sprite.x += 0.25
            sprite.y += 0.125
        }
    }
})
let SpeedY = 0
let SpeedX = 0
let tempImage: Image = null
let tempFlippedAnim: Image[] = []
let canMove = false
let Waller: Sprite = null
let Conveyor: Sprite = null
let Drop: Sprite = null
let Printer: Sprite = null
let playerControl = false
let mySprite: Sprite = null
let tempOverlap = false
let titleScreen = false
let PressA = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 180
    export const ARCADE_SCREEN_HEIGHT = 140
}
color.setPalette(
color.originalPalette
)
PressA = false
titleScreen = true
music.play(music.createSong(assets.song`Title`), music.PlaybackMode.InBackground)
let introScreenSprite = sprites.create(assets.image`introScreen`, SpriteKind.SetPeice)
color.startFade(color.Black, color.originalPalette, 500)
pause(2000)
color.startFade(color.originalPalette, color.Black, 500)
pause(500)
sprites.destroy(introScreenSprite)
scene.setBackgroundImage(assets.image`TitleScreen`)
pause(500)
color.startFade(color.Black, color.originalPalette, 500)
pause(500)
PressA = true
game.onUpdate(function () {
    if (titleScreen == false) {
        mySprite.x += SpeedX
        mySprite.y += SpeedY
        for (let Depths of sprites.allOfKind(SpriteKind.Pushable)) {
            Depths.z = Depths.y
            if (Detection(mySprite, Depths)) {
                if (sprites.readDataBoolean(Depths, "Pushable") == true) {
                    if (mySprite.x > Depths.x && mySprite.y > Depths.y && controller.up.isPressed()) {
                        Depths.x += -1
                        Depths.y += -0.5
                    } else if (mySprite.x < Depths.x && mySprite.y < Depths.y && controller.down.isPressed()) {
                        Depths.x += 1
                        Depths.y += 0.5
                    } else if (mySprite.x < Depths.x && mySprite.y > Depths.y && controller.right.isPressed()) {
                        Depths.x += 1
                        Depths.y += -0.5
                    } else if (mySprite.x > Depths.x && mySprite.y < Depths.y && controller.left.isPressed()) {
                        Depths.x += -1
                        Depths.y += 0.5
                    }
                }
            }
        }
        if (playerControl == true) {
            if (controller.right.isPressed()) {
                SpeedX = 1
                SpeedY = -0.5
                mySprite.setImage(assets.image`PlayerFaceAway`)
            } else if (controller.left.isPressed()) {
                SpeedX = -1
                SpeedY = 0.5
                mySprite.setImage(assets.image`PlayerFaceLeft`)
            } else if (controller.down.isPressed()) {
                SpeedX = 1
                SpeedY = 0.5
                mySprite.setImage(assets.image`PlayerFaceDown`)
            } else if (controller.up.isPressed()) {
                SpeedX = -1
                SpeedY = -0.5
                mySprite.setImage(assets.image`PlayerFaceAway`)
            } else {
                SpeedX = 0
                SpeedY = 0
            }
        }
        mySprite.z = mySprite.y
        for (let Walls of sprites.allOfKind(SpriteKind.StaticObject)) {
            Walls.z = Walls.y
            if (Detection(mySprite, Walls)) {
                if ((controller.right.isPressed() || controller.up.isPressed()) && Walls.y < mySprite.y) {
                    SpeedX = 0
                    SpeedY = 0
                } else if ((controller.left.isPressed() || controller.menu.isPressed()) && Walls.y > mySprite.y) {
                    SpeedX = 0
                    SpeedY = 0
                } else {
                	
                }
            }
        }
    }
})
