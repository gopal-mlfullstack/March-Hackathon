## This is where we learn request & response model
from typing import Literal

from pydantic import BaseModel, Field


class PasswordRequest(BaseModel):
    password: str = Field(..., min_length=1)


class PasswordStrengthResponse(BaseModel):
    password: str
    strength: Literal["Weak", "Medium", "Strong"]
    score: int


class PasswordGenerateResponse(BaseModel):
    password: str
    length: int
    includes_numbers: bool
    includes_symbols: bool
