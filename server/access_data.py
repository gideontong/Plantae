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
        total_results = []
        # for demo sake only looking at first 5 pages, running into error is range > than actual page results
        for page_num in range(1, 5):
            url = 'https://trefle.io/api/v1/distributions/' \
                        + tdw_zone \
                        + '/plants?token=' \
                        + self.access_token \
                        + '&filter[flower_color]=' \
                        + flower_color \
                        + '&filter[foliage_color]=' \
                        + foliage_color \
                        + '&filter[fruit_color]=' \
                        + fruit_color \
                        + '&page=' \
                        + str(page_num)
            response = requests.get(url)
            data = response.json()
            df = pd.DataFrame(data['data'])
            total_results.append(df)

        df_total = pd.concat(total_results)
        df_total.reset_index(inplace=True)

        return df_total



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
        df_plant['flower_color'] = df_plant['flower'][0]['color']
        df_plant['foliage_color'] = df_plant['foliage'][0]['color']
        df_plant['fruit_or_seed_color'] = df_plant['fruit_or_seed'][0]['color']
        df_plant['toxicity'] = df_plant['specifications'][0]['toxicity']
        # Assumption - height is always in cm
        df_plant['average_height_cm'] = df_plant['specifications'][0]['average_height']['cm']
        del df_plant['flower']
        del df_plant['foliage']
        del df_plant['specifications']
        del df_plant['fruit_or_seed']
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
# data = obj.get_plants('595', 'white', 'green', 'blue')

data = obj.get_plants('595', 'white', 'green', 'red')


all_p = obj.return_all_indiv(data)
result = obj.json_result(all_p)