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




        # page_results = []
        # for pg in range(10):
        #     response = requests.get( 'https://trefle.io/api/v1/distributions/'
        #                             + tdw_zone
        #                              + '/plants?token='
        #                              + self.access_token
        #                              + '&filter[flower_color]='
        #                              + flower_color
        #                              + '&filter[foliage_color]='
        #                              + foliage_color
        #                              + '&filter[fruit_color]='
        #                              + fruit_color
        #                              + '&page='
        #                              + str(pg)
        #     )
        #
        #     response = response.json()
        #     df = pd.DataFrame(response['data'])
        #     page_results.append(df)
        #     df_all = pd.concat(page_results)
        #     df_all.reset_index(inplace=True)
        return df


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
        df_plant = df_plant.dropna(how='all')
        return df_plant

    def json_result(self, pd_df):
        result = pd_df.to_json()
        return result

    def return_all_indiv(self, search_results):
        unique_df = search_results.drop_duplicates(subset = ["id"])
        plant_id = unique_df['id'].tolist()
        all_plants = []
        for p in plant_id:
            plant = obj.get_indiv_plant(str(p))
            clean_plant = obj.transform(plant)
            all_plants.append(clean_plant)
        df = pd.concat(all_plants)
        df.reset_index(inplace=True)
        return df



obj = PlantAPI('TREFLE')
data = obj.get_plants('595', 'white', 'green', 'blue')

all_p= obj.return_all_indiv(data)
# print(all_p)
result = obj.json_result(all_p)
# print(result)
