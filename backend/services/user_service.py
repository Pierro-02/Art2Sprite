from models.user import UserCreate, User
from models.processing import ImageFile 

fake_db = []  # Replace with real database logic

def create_user(user: UserCreate) -> User:
    new_user = User(id=len(fake_db) + 1, username=user.username, email=user.email)
    fake_db.append(new_user)
    return new_user

def convert_sprite(image: ImageFile) -> ImageFile:
    image = ImageFile(id=1, filename=ImageFile.filename, fileUrl=ImageFile.fileUrl)
    return image
