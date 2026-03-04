from fastapi import Depends, FastAPI, Query

from schemas import PasswordGenerateResponse, PasswordRequest, PasswordStrengthResponse
from utils import check_password_strength, generate_password

app = FastAPI(title="Password Generator API")


# Depandency Example
def validate_length(length: int = Query(..., ge=4, le=64)):
    return length


# Just for testing
@app.get("/")
def home():
    return {"message": "This is my First FASTAPI!"}


@app.get("/generate", response_model=PasswordGenerateResponse)
def generate(
    length: int = Depends(validate_length),
    include_numbers: bool = Query(default=True),
    include_symbols: bool = Query(default=True),
):
    password = generate_password(length, include_numbers, include_symbols)

    return PasswordGenerateResponse(
        password=password,
        length=length,
        includes_numbers=include_numbers,
        includes_symbols=include_symbols,
    )


@app.post("/check-strength", response_model=PasswordStrengthResponse)
def check_strength(request: PasswordRequest):
    strength, score = check_password_strength(request.password)

    return PasswordStrengthResponse(
        password=request.password, strength=strength, score=score
    )
