from string import ascii_lowercase as lowercase
from random import choices

def gen_string(db = None, length = 6):
    string = ''.join(choices(lowercase, k = length))
    if db and string in db:
        return gen_string(db, length)
    else:
        return string

def process_result(plant: dict, to_copy: list, toxicity_map: dict):
    result = {}
    for id in to_copy:
        if id in plant:
            result[id] = plant[id]
    if 'flower' in plant:
        result['flower_color'] = plant['flower']['color']
    if 'foliage' in plant:
        result['foliage_color'] = plant['foliage']['color']
    if 'fruit_or_seed' in plant:
        result['fruit_or_seed_color'] = plant['fruit_or_seed']['color']
    if 'specifications' in plant:
        result['toxicity'] = toxicity_map[plant['specifications']['toxicity'] if plant['specifications']['toxicity'] else 'none']
    return result