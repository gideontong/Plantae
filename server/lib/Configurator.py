from configparser import ConfigParser as parser

class Configurator:
    def __init__(self):
        config = parser().read('config/hackathon.cfg')
        self.token = config['TREFLE']['ACCESS_TOKEN']