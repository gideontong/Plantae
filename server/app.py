# Web Endpoint Setup
from flask import Flask
app = Flask(__name__)

# Local Library Imports
from lib.Configurator import Configurator as Config
from lib.PlantAPI import PlantAPI as API
from lib.SearchCache import SearchCache as Cache

def main():
    config = Config()
    cache = Cache(1000)
    api = API(config.token)

main()

@app.route('/')
def index():
    return '{"about":"Plantae API"}'

@app.route('/search')
def search():
    '''
    Returns a JSON object with the number of results and a key to repeat the same search or get results.
    '''
    return '{"results":0,"key":"0"}'

@app.route('/results')
def search_results():
    '''
    Returns a JSON object with the results given a search key.
    '''
    return '{"results":[]}'

@app.route('/plant')
def get_plant():
    '''
    Returns a JSON object of the first plant in the search results or a specific plant given a key.
    '''
    return '{"plant":{}}'