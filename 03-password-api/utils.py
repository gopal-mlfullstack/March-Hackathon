# Clean architechture
import random
import string


def generate_password(Length: int, include_numbers: bool, include_symbols: bool):
    characters = string.ascii_letters

    if include_numbers:
        characters += string.digits
    if include_symbols:
        characters += string.punctuation

    return "".join(random.choice(characters) for _ in range(Length))


def check_password_strength(password: str):
    score = 0

    if len(password) >= 8:
        score += 1
    if any(char.isdigit() for char in password):
        score += 1
    if any(char.isupper() for char in password):
        score += 1
    if any(char in string.punctuation for char in password):
        score += 1

    if score <= 1:
        return "Weak", score
    if score == 2 or score == 3:
        return "Medium", score
    else:
        return "Strong", score
