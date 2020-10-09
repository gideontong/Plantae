from string import ascii_lowercase as lowercase
from random import choices

def gen_string(db = None, length = 6):
    string = ''.join(choices(lowercase, k = length))
    if db and string in db:
        return gen_string(db, length)
    else:
        return string