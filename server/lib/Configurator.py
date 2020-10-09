from json import loads as load

class Configurator:
    def __init__(self):
        config = load(open('config/secrets.json').read())
        self.token = config['token']
        self.copy = ['id', 'common_name', 'scientific_name', 'image_url', 'vegetable', 'edible_part', 'edible', 'images', 'flower', 'foliage', 'fruit_or_seed', 'specifications']
        self.toxicity_map = {
            'none': 0,
            'low': 1,
            'medium': 2,
            'high': 3
        }