import configparser
import requests
import pandas as pd

# Useful for debugging only
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
        df = pd.DataFrame(response['data'])
        return df

    def get_indiv_plant(self, species_id):
        response = requests.get('https://trefle.io/api/v1/species/'+ species_id + '?token=' + self.access_token)
        response = response.json()

        df = pd.DataFrame.from_dict(response, orient='index')
        df.reset_index(level=0, inplace=True)
        return df

    def transform(self, plant_obj):
        df_plant = plant_obj[['id', 'common_name',
                          'scientific_name', 'image_url',
                          'vegetable', 'edible_part',
                          'edible', 'images',
                          'flower', 'foliage',
                          'fruit_or_seed', 'specifications'
                          ]].copy()
        indiv_plant = df_plant.iloc[0]
        indiv_plant['flower_color'] = indiv_plant['flower']['color']
        indiv_plant['foliage_color'] = indiv_plant['foliage']['color']
        indiv_plant['fruit_or_seed_color'] = indiv_plant['fruit_or_seed']['color']
        indiv_plant['toxicity'] = indiv_plant['specifications']['toxicity']
        del indiv_plant['flower']
        del indiv_plant['foliage']
        del indiv_plant['specifications']
        del indiv_plant['fruit_or_seed']

        return indiv_plant

    def json_result(self, pd_df):
        result = pd_df.to_json()
        return result

obj = PlantAPI('TREFLE')
data = obj.get_plants('595', 'white', 'green', 'blue')


# Contains basic info on plants filtered by API call
df = data[['id', 'common_name']].copy()
# print(df)

# Individual plant information
plant = obj.get_indiv_plant('158178')
clean_plant = obj.transform(plant)
result = obj.json_result(clean_plant)
print(result)

