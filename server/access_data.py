import configparser
import requests
import pandas as pd
pd.set_option("display.max_rows", None, "display.max_columns", None)



class PlantAPI:
    def __init__(self, API):
        config = configparser.ConfigParser()
        config.read('hackathon.cfg')
        self.access_token = config[API]['ACCESS_TOKEN']

### Need to loop through multiple pages
    def get_plants(self, tdw_zone, flower_color, foliage_color, fruit_color):
        '''
        :param tdw_zone:
        :param flower_color:
        :param foliage_color:
        :param fruit_color:
        :return df:
                Method that get JSON from Trefle API on plants in specific region with specific foliage,
                flower and fruit color. Results used to identify which plant ids to use for plant specific info
        '''

        response = requests.get( 'https://trefle.io/api/v1/distributions/'
                                + tdw_zone
                                 + '/plants?token='
                                 + self.access_token
                                 + '&filter[flower_color]='
                                 + flower_color
                                 + '&filter[foliage_color]='
                                 + foliage_color
                                 + '&filter[fruit_color]='
                                 + fruit_color
)
        response = response.json()
        # Dict keys = data, links, meta
        # print(response.keys())
        df = pd.DataFrame(response['data'])
        return df

    def get_indiv_plant(self):
        response = requests.get('https://trefle.io/api/v1/species/158178?token=sHaKkHlGA4rIqiyIpDsm7J2LzWVWo3ZRNRTCb9vWI6Q')
        response = response.json()
        # Dict keys = data, links, meta
        print(response.keys())
        df = response['data']
        return df

obj = PlantAPI('TREFLE')
data = obj.get_plants('595', 'white', 'green', 'blue')
# print(list(data.columns.values))

# Contains basic info on plants filtered by API call
df = data[['id', 'common_name', 'image_url']].copy()
# print(df)

# Individual plant information
plant = obj.get_indiv_plant()
# print(plant)

