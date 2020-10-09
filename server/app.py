# Web Endpoint Setup
from flask import Flask, request
app = Flask(__name__)

# System Library Imports
from json import dumps

# Local Library Imports
from lib.Configurator import Configurator as Config
from lib.PlantAPI import PlantAPI as API
from lib.SearchCache import SearchCache as Cache
from lib.util import gen_string

config = Config()
cache = Cache(1000)
api = API(config.token)

@app.route('/')
def index():
    return '{"about":"Plantae API"}'

@app.route('/search')
def search():
    '''
    Returns a JSON object with the number of results and a key to repeat the same search or get results.
    '''
    results = {
        "results": 0,
        "key": ""
    }
    if 'key' in request.args:
        results['key'] = request.args['key']
    else:
        results['key'] = gen_string(cache.cache)
    return dumps(results)

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