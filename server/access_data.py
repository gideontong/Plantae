import configparser
import requests
import pandas as pd

# CONFIG
config = configparser.ConfigParser()
config.read('hackathon.cfg')
access_token = config['TREFLE']['ACCESS_TOKEN']

r = requests.get('https://trefle.io/api/v1/genus?token=' + access_token)
data = r.json()
# Dict keys = data, links, meta
print(data.keys())

df = pd.DataFrame(data['data'])
print(df)
