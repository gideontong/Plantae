from json import loads as load

class Configurator:
    def __init__(self):
        config = load(open('config/secrets.json').read())
        self.token = config['token']