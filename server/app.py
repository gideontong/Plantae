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
    result = {
    }
    if 'search' not in request.args:
        return dumps(result)
    if request.args['search'] in cache.cache:
        result = cache.get(request.args['search'])
    else:
        plant = api.get_first_plant(q=request.args['search'])['data']
        for id in config.copy:
            result[id] = plant[id]
        result['flower_color'] = plant['flower']['color']
        result['foliage_color'] = plant['foliage']['color']
        result['fruit_or_seed_color'] = plant['fruit_or_seed']['color']
        result['toxicity'] = config.toxicity_map[plant['specifications']['toxicity'] if plant['specifications']['toxicity'] else 'none']
        cache.add(request.args['search'], result)
    return dumps(result)