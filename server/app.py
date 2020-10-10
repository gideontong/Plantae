# Web Endpoint Setup
from flask import Flask, request
app = Flask(__name__)

# System Library Imports
from json import dumps

# Local Library Imports
from lib.Configurator import Configurator as Config
from lib.PlantAPI import PlantAPI as API
from lib.SearchCache import SearchCache as Cache
from lib.util import gen_string, process_result

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
    if results['key'] not in cache.cache:
        next_args = request.args.to_dict(flat=False)
        if 'key' in next_args:
            del next_args['key']
        for item in next_args:
            next_args[item] = next_args[item][0]
        cache.add(results['key'], api.search(**next_args))
    results['results'] = cache.size_of(results['key'])
    return dumps(results)

@app.route('/results')
def search_results():
    '''
    Returns a JSON object with the results given a search key.
    '''
    results = []
    size = cache.size_of(request.args['key'])
    if 'key' in request.args and size > 0:
        search_data = cache.get(request.args['key'])
        for i, item in enumerate(search_data['data']):
            id = str(item['id'])
            if id in cache.cache:
                results.append(cache.get(id))
            else:
                next_data = api.get_plant(i, search_data)['data']
                results.append(process_result(next_data, config.copy, config.toxicity_map))
                cache.add(str(next_data['id']), next_data)
            if i >= 5:
                break
    for i in range(len(results) - 1, -1, -1):
        if results[i] == {}:
            del results[i]
    return dumps({'results': results})

@app.route('/plant')
def get_plant():
    '''
    Returns a JSON object of the first plant in the search results or a specific plant given a key.
    '''
    if 'search' not in request.args:
        return '{}'
    if request.args['search'] in cache.cache:
        result = cache.get(request.args['search'])
    else:
        plant = api.get_first_plant(q=request.args['search'])['data']
        result = process_result(plant, config.copy, config.toxicity_map)
        cache.add(request.args['search'], result)
    return dumps(result)