from pydantic import BaseModel
from typing import List, Optional

class ImageFile(BaseModel):
    id: int
    filename: str = ""
    fileUrl: str = None

class SpriteRequest(BaseModel):
    baseSketch: ImageFile

class SpriteResponse(BaseModel):
    id: int
    sprite: ImageFile

class SpriteSheetRequest(BaseModel):
    baseSprite: ImageFile

class SpriteSheetResponse(BaseModel):
    id: int
    spriteSheet: ImageFile

class AnimationRequest(BaseModel):
    animationType: str