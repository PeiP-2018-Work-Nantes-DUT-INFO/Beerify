<template>
  <v-container fluid>
    <!-- HEAD -->
    <v-layout row wrap>
      <Heading :title="this.appTitle()" />
    </v-layout>

    <!-- BODY -->
    <v-layout row class="mt-5">
      <!-- COLONNE GAUCHE -->
      <v-flex md1 lg2 xl3 class="hidden-sm-and-down"></v-flex>

      <!-- COLONNE CENTRALE -->
      <v-flex xs12 md10 lg8 xl6>
        <v-img
          :src="beer.image_front_url"
          max-width="200"
          class="mx-auto"
        ></v-img>

        <!-- CARACTERISTIQUES -->
        <Caracteristics
          class="mt-4"
          :brands="beer.brands"
          :packagings="beer.packaging"
          :quantity="beer.quantity"
        />

        <!-- INGREDIENTS -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.INGREDIENTS') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>local_dining</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>{{ beer.ingredients_text }}</div>
          </v-card-text>
        </v-card>

        <!-- CATEGORIES -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.CATEGORIES') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>local_offer</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>{{ beer.categories }}</div>
          </v-card-text>
        </v-card>

        <!-- NUTRIMENTS -->
        <Nutriments
          :nutriments="beer.nutriments"
          :image="beer.image_nutrition_url"
        />

        <!-- LABELS -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.LABELS') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>label</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>{{ beer.categories }}</div>
          </v-card-text>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content
                >{{ $t('beers.NOVA') }} :</v-list-tile-content
              >

              <v-list-tile-content class="align-end">
                {{ beer.nova_group }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>

        <!-- INFOS -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.INFORMATIONS') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>info</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon small>fa-industry</v-icon>
              </v-list-tile-action>
              <v-list-tile-content
                >{{ $t('beers.MANUFACTURING_PLACES') }} :</v-list-tile-content
              >
              <v-list-tile-content class="align-end">
                {{ beer.manufacturing_places }}
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon small>fa-external-link</v-icon>
              </v-list-tile-action>
              <v-list-tile-content
                >{{ $t('beers.WEBSITE') }} :</v-list-tile-content
              >
              <v-list-tile-content class="align-end">
                <a target="_blank" :href="beer.link">{{ beer.link }}</a>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon small>storefront</v-icon>
              </v-list-tile-action>
              <v-list-tile-content
                >{{ $t('beers.STORES') }} :</v-list-tile-content
              >
              <v-list-tile-content class="align-end">
                {{ beer.stores }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>

        <!-- IMAGES -->
        <v-card class="mt-4">
          <v-card-title>
            <h4>{{ $t('beers.IMAGES') }}</h4>
            <v-spacer></v-spacer>
            <v-icon>perm_media</v-icon>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout wrap>
              <DialogImg
                v-for="image in beer.selected_images"
                :key="Object.keys(image)"
                :img="image"
                class="ml-2"
              />
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- COLONNE DROITE -->
      <v-flex md1 lg2 xl3 class="hidden-sm-and-down"></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Caracteristics from '@/components/Caracteristics.vue'
import DialogImg from '@/components/DialogImg.vue'
import Nutriments from '@/components/Nutriments.vue'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle
    }
  },
  components: {
    Caracteristics,
    DialogImg,
    Nutriments
  },
  data() {
    return {
      name: '',
      beer: {
        unique_scans_n: 8,
        languages: {},
        ingredients_analysis_tags: [],
        quantity: '6x25cl',
        creator: 'aleene',
        traces_hierarchy: [],
        last_modified_by: 'vincentdesgms',
        nova_groups_tags: [],
        entry_dates_tags: [],
        nova_group: 4,
        last_edit_dates_tags: [],
        ingredients_that_may_be_from_palm_oil_tags: [],
        nutrition_grades_tags: [],
        ingredients_tags: [],
        countries_lc: 'fr',
        image_front_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.400.jpg',
        image_ingredients_thumb_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/ingredients_fr.14.100.jpg',
        lang: 'fr',
        nutrition_score_debug:
          'no nutriscore for category en:alcoholic-beverages',
        additives_old_tags: [],
        ingredients_text_with_allergens:
          'eau, <span class="allergen">malt d\'orge</span>, sirop de glucose, sucre, caramel aromatique, extrait de houblon.',
        ingredients_n_tags: [],
        emb_codes_20141016: '',
        traces_lc: 'fr',
        emb_codes_orig: '',
        allergens_tags: [],
        ingredients_from_or_that_may_be_from_palm_oil_n: 0,
        last_modified_t: 1581351791,
        rev: 17,
        editors: [],
        ingredients_text_with_allergens_fr:
          'eau, <span class="allergen">malt d\'orge</span>, sirop de glucose, sucre, caramel aromatique, extrait de houblon.',
        popularity_tags: [],
        labels_tags: [],
        traces_tags: [],
        product_quantity: 1500,
        new_additives_n: 0,
        product_name: 'Ambrée',
        countries_hierarchy: [],
        brands: 'Grimbergen,Kronenbourg',
        pnns_groups_2: 'Alcoholic beverages',
        languages_codes: {},
        nutrient_levels_tags: [],
        link: '',
        labels_hierarchy: [],
        nova_group_debug:
          ' -- categories/en:alcoholic-beverages : 3 -- ingredients/en:glucose-syrup : 4',
        languages_tags: [],
        completed_t: 1440750136,
        image_nutrition_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/nutrition_fr.16.400.jpg',
        ingredients_text:
          "eau, malt d'orge, sirop de glucose, sucre, caramel aromatique, extrait de houblon.",
        nutriments: {
          alcohol_unit: '% vol',
          sugars_serving: 0.2,
          proteins_serving: 0.125,
          sodium: 0.004,
          sodium_modifier: '<',
          salt_100g: 0.01,
          sodium_serving: 0.001,
          'saturated-fat_100g': 0,
          sodium_value: 0.004,
          'energy-kcal': 238,
          'saturated-fat_serving': 0,
          alcohol_value: 6.5,
          carbohydrates_100g: 4.4,
          'saturated-fat_value': 0,
          'energy-kcal_unit': 'kcal',
          carbohydrates_value: 4.4,
          proteins: 0.5,
          salt: 0.01,
          sodium_100g: 0.004,
          'energy-kcal_serving': 59.5,
          fat_value: 0.1,
          sugars_unit: 'g',
          carbohydrates: 4.4,
          energy_100g: 238,
          fat_serving: 0.025,
          proteins_unit: 'g',
          alcohol: 6.5,
          sugars_value: 0.8,
          salt_serving: 0.0025,
          fat_100g: 0.1,
          'saturated-fat': 0,
          alcohol_100g: 6.5,
          'saturated-fat_unit': 'g',
          energy: 238,
          fat: 0.1,
          energy_serving: 59.5,
          salt_unit: 'g',
          'fruits-vegetables-nuts-estimate-from-ingredients_100g': 0,
          'nova-group_100g': 4,
          alcohol_serving: 6.5,
          salt_value: 0.01,
          energy_value: 57,
          salt_modifier: '<',
          proteins_value: 0.5,
          proteins_100g: 0.5,
          sugars: 0.8,
          'energy-kcal_value': 57,
          sodium_unit: 'g',
          sugars_100g: 0.8,
          energy_unit: 'kcal',
          carbohydrates_unit: 'g',
          'nova-group': 4,
          fat_unit: 'g',
          'energy-kcal_100g': 238,
          carbohydrates_serving: 1.1,
          'nova-group_serving': 4
        },
        vitamins_prev_tags: [],
        manufacturing_places_tags: [],
        languages_hierarchy: ['en:french'],
        data_quality_errors_tags: [],
        _keywords: [
          'boisson',
          'vert',
          'ambree',
          'point',
          'abbaye',
          'biere',
          'pefc',
          'alcoolisee',
          'kronenbourg',
          'grimbergen',
          'cluster-side'
        ],
        states_hierarchy: [
          'en:to-be-checked',
          'en:complete',
          'en:nutrition-facts-completed',
          'en:ingredients-completed',
          'en:expiration-date-completed',
          'en:packaging-code-to-be-completed',
          'en:characteristics-completed',
          'en:categories-completed',
          'en:brands-completed',
          'en:packaging-completed',
          'en:quantity-completed',
          'en:product-name-completed',
          'en:photos-validated',
          'en:photos-uploaded'
        ],
        ingredients_n: 6,
        image_ingredients_small_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/ingredients_fr.14.200.jpg',
        additives_n: 1,
        unknown_nutrients_tags: [],
        countries_tags: ['en:france'],
        additives_tags: ['en:e150a'],
        product_name_fr: 'Ambrée',
        codes_tags: [
          'code-13',
          '3080216003xxx',
          '308021600xxxx',
          '30802160xxxxx',
          '3080216xxxxxx',
          '308021xxxxxxx',
          '30802xxxxxxxx',
          '3080xxxxxxxxx',
          '308xxxxxxxxxx',
          '30xxxxxxxxxxx',
          '3xxxxxxxxxxxx'
        ],
        packaging: 'Étui:carton,Bouteille:verre brun,Capsule:metal',
        categories_tags: [
          'en:beverages',
          'en:alcoholic-beverages',
          'en:beers',
          'en:abbey-beer',
          'en:amber-beers'
        ],
        misc_tags: ['en:nutriscore-not-computed'],
        allergens_hierarchy: ['en:gluten'],
        checkers_tags: [],
        purchase_places: 'France,Veynes',
        image_front_small_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.200.jpg',
        serving_size: '25ml',
        origins: '',
        complete: 1,
        compared_to_category: 'en:amber-beers',
        data_quality_tags: [
          'en:ingredients-percent-analysis-ok',
          'en:nutrition-value-under-0-1-g-salt',
          'en:alcoholic-beverages-category-without-alcohol-value'
        ],
        data_quality_bugs_tags: [],
        additives_original_tags: ['en:e150a'],
        countries: 'France',
        ingredients_from_palm_oil_n: 0,
        stores: 'Dia,Magasins U',
        amino_acids_tags: [],
        ingredients_original_tags: [
          'en:water',
          'en:malted-barley',
          'en:glucose-syrup',
          'en:sugar',
          'en:e150a',
          'en:hop-extract'
        ],
        unknown_ingredients_n: 0,
        vitamins_tags: [],
        ingredients_debug: ["_malt d'orge_"],
        url:
          'https://world.openfoodfacts.org/product/3080216003306/ambree-grimbergen',
        generic_name: '',
        categories:
          "Boissons,Boissons alcoolisées,Bières,Bières d'abbayes,Bières ambrées",
        emb_codes: '',
        image_thumb_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.100.jpg',
        data_quality_info_tags: ['en:ingredients-percent-analysis-ok'],
        _id: '3080216003306',
        last_image_t: 1581351582,
        expiration_date: '07/2015',
        nucleotides_tags: [],
        allergens: 'en:gluten',
        brands_tags: ['grimbergen', 'kronenbourg'],
        additives_prev_original_tags: [],
        image_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.400.jpg',
        generic_name_fr: '',
        minerals_prev_tags: [],
        packaging_tags: [
          'etui-carton',
          'bouteille-verre-brun',
          'capsule-metal'
        ],
        created_t: 1440748890,
        labels: 'Point Vert,PEFC,fr:cluster-side',
        interface_version_created: '20120622',
        ingredients_from_palm_oil_tags: [],
        allergens_from_ingredients: "malt d'orge",
        ingredients: [
          {
            vegan: 'yes',
            text: 'eau',
            percent_min: 16.6666666666667,
            vegetarian: 'yes',
            rank: 1,
            id: 'en:water',
            percent_max: 100
          },
          {
            percent_max: 50,
            rank: 2,
            id: 'en:malted-barley',
            vegetarian: 'yes',
            percent_min: 0,
            text: "malt d'orge",
            vegan: 'yes'
          },
          {
            id: 'en:glucose-syrup',
            rank: 3,
            percent_max: 33.3333333333333,
            vegan: 'yes',
            text: 'sirop de glucose',
            vegetarian: 'yes',
            percent_min: 0
          },
          {
            id: 'en:sugar',
            rank: 4,
            percent_max: 25,
            vegan: 'yes',
            text: 'sucre',
            vegetarian: 'yes',
            percent_min: 0
          },
          {
            rank: 5,
            id: 'en:e150a',
            percent_max: 20,
            text: 'caramel aromatique',
            vegan: 'yes',
            percent_min: 0,
            vegetarian: 'yes'
          },
          {
            vegetarian: 'yes',
            percent_min: 0,
            text: 'extrait de houblon',
            vegan: 'yes',
            percent_max: 16.6666666666667,
            id: 'en:hop-extract',
            rank: 6
          }
        ],
        ingredients_that_may_be_from_palm_oil_n: 0,
        categories_lc: 'fr',
        cities_tags: [],
        last_editor: 'vincentdesgms',
        editors_tags: [
          'openfoodfacts-contributors',
          'tacite',
          'magasins-u',
          'vincentdesgms',
          'aleene'
        ],
        photographers_tags: ['aleene', 'vincentdesgms'],
        emb_codes_tags: [],
        update_key: 'ingredients20200315',
        allergens_from_user: '(fr) en:gluten',
        completeness: 0.9,
        max_imgid: '5',
        selected_images: {
          nutrition: {
            small: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/nutrition_fr.16.200.jpg'
            },
            thumb: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/nutrition_fr.16.100.jpg'
            },
            display: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/nutrition_fr.16.400.jpg'
            }
          },
          front: {
            thumb: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.100.jpg'
            },
            display: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.400.jpg'
            },
            small: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.200.jpg'
            }
          },
          ingredients: {
            small: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/ingredients_fr.14.200.jpg'
            },
            thumb: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/ingredients_fr.14.100.jpg'
            },
            display: {
              fr:
                'https://static.openfoodfacts.org/images/products/308/021/600/3306/ingredients_fr.14.400.jpg'
            }
          }
        },
        minerals_tags: [],
        nucleotides_prev_tags: [],
        other_nutritional_substances_tags: [],
        scans_n: 17,
        sortkey: 301581351791,
        image_small_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.200.jpg',
        interface_version_modified: '20150316.jqm2',
        additives_debug_tags: [],
        image_ingredients_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/ingredients_fr.14.400.jpg',
        image_front_thumb_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/front_fr.6.100.jpg',
        ingredients_text_fr:
          "eau, malt d'orge, sirop de glucose, sucre, caramel aromatique, extrait de houblon.",
        data_quality_warnings_tags: [
          'en:nutrition-value-under-0-1-g-salt',
          'en:alcoholic-beverages-category-without-alcohol-value'
        ],
        labels_lc: 'fr',
        categories_hierarchy: [
          'en:beverages',
          'en:alcoholic-beverages',
          'en:beers',
          'en:abbey-beer',
          'en:amber-beers'
        ],
        last_image_dates_tags: ['2020-02-10', '2020-02', '2020'],
        image_nutrition_thumb_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/nutrition_fr.16.100.jpg',
        traces: '',
        serving_quantity: 25,
        additives_old_n: 1,
        image_nutrition_small_url:
          'https://static.openfoodfacts.org/images/products/308/021/600/3306/nutrition_fr.16.200.jpg',
        purchase_places_tags: ['france', 'veynes'],
        no_nutrition_data: null,
        nutrient_levels: {},
        correctors_tags: [
          'aleene',
          'tacite',
          'magasins-u',
          'openfoodfacts-contributors',
          'vincentdesgms'
        ],
        code: '3080216003306',
        id: '3080216003306',
        pnns_groups_2_tags: ['alcoholic-beverages', 'known'],
        traces_from_user: '(fr) ',
        nova_groups: '4',
        manufacturing_places: '',
        nutrition_data_per: '100g',
        stores_tags: ['dia', 'magasins-u'],
        nutrition_data_prepared_per: '100g',
        lc: 'fr',
        ingredients_ids_debug: ['malt-d-orge'],
        ingredients_hierarchy: [
          'en:water',
          'en:malted-barley',
          'en:cereal',
          'en:malt',
          'en:glucose-syrup',
          'en:glucose',
          'en:sugar',
          'en:e150a',
          'en:hop-extract',
          'en:plant',
          'en:hops'
        ],
        states_tags: [
          'en:to-be-checked',
          'en:complete',
          'en:nutrition-facts-completed',
          'en:ingredients-completed',
          'en:expiration-date-completed',
          'en:packaging-code-to-be-completed',
          'en:characteristics-completed',
          'en:categories-completed',
          'en:brands-completed',
          'en:packaging-completed',
          'en:quantity-completed',
          'en:product-name-completed',
          'en:photos-validated',
          'en:photos-uploaded'
        ],
        images: {
          '1': {
            sizes: {
              '100': {
                h: 75,
                w: 100
              },
              '400': {
                h: 300,
                w: 400
              },
              full: {
                w: 3264,
                h: 2448
              }
            },
            uploaded_t: '1440749930',
            uploader: 'aleene'
          },
          '2': {
            uploader: 'aleene',
            uploaded_t: '1440749961',
            sizes: {
              '100': {
                h: 75,
                w: 100
              },
              '400': {
                h: 300,
                w: 400
              },
              full: {
                h: 2448,
                w: 3264
              }
            }
          },
          '3': {
            uploader: 'aleene',
            uploaded_t: '1440749967',
            sizes: {
              '100': {
                w: 100,
                h: 75
              },
              '400': {
                w: 400,
                h: 300
              },
              full: {
                w: 3264,
                h: 2448
              }
            }
          },
          '4': {
            sizes: {
              '100': {
                w: 100,
                h: 31
              },
              '400': {
                w: 400,
                h: 123
              },
              full: {
                h: 588,
                w: 1909
              }
            },
            uploader: 'vincentdesgms',
            uploaded_t: 1581351480
          },
          '5': {
            sizes: {
              '100': {
                w: 35,
                h: 100
              },
              '400': {
                w: 138,
                h: 400
              },
              full: {
                w: 738,
                h: 2134
              }
            },
            uploader: 'vincentdesgms',
            uploaded_t: 1581351582
          },
          nutrition: {
            sizes: {
              '100': {
                w: 100,
                h: 44
              },
              '200': {
                h: 87,
                w: 200
              },
              '400': {
                w: 400,
                h: 174
              },
              full: {
                h: 277,
                w: 636
              }
            },
            normalize: 'true',
            white_magic: 'false',
            imgid: '1',
            geometry: '636x277-715-708',
            rev: '8'
          },
          front_fr: {
            geometry: '2415x2261-372-112',
            rev: '6',
            sizes: {
              '100': {
                w: 100,
                h: 94
              },
              '200': {
                h: 187,
                w: 200
              },
              '400': {
                h: 374,
                w: 400
              },
              full: {
                h: 2261,
                w: 2415
              }
            },
            white_magic: 'false',
            normalize: 'false',
            imgid: '2'
          },
          ingredients_fr: {
            rev: '14',
            y2: null,
            x2: null,
            imgid: '4',
            sizes: {
              '100': {
                h: 31,
                w: 100
              },
              '200': {
                w: 200,
                h: 62
              },
              '400': {
                h: 123,
                w: 400
              },
              full: {
                h: 588,
                w: 1909
              }
            },
            geometry: '0x0-0-0',
            y1: null,
            angle: null,
            x1: null,
            normalize: null,
            white_magic: null
          },
          nutrition_fr: {
            rev: '16',
            y2: null,
            x2: null,
            imgid: '5',
            sizes: {
              '100': {
                h: 100,
                w: 35
              },
              '200': {
                h: 200,
                w: 69
              },
              '400': {
                h: 400,
                w: 138
              },
              full: {
                h: 2134,
                w: 738
              }
            },
            geometry: '0x0-0-0',
            y1: null,
            x1: null,
            angle: null,
            white_magic: null,
            normalize: null
          },
          front: {
            imgid: '2',
            normalize: 'false',
            sizes: {
              '100': {
                w: 100,
                h: 94
              },
              '200': {
                h: 187,
                w: 200
              },
              '400': {
                h: 374,
                w: 400
              },
              full: {
                w: 2415,
                h: 2261
              }
            },
            white_magic: 'false',
            rev: '6',
            geometry: '2415x2261-372-112'
          },
          ingredients: {
            white_magic: 'false',
            sizes: {
              '100': {
                w: 100,
                h: 33
              },
              '200': {
                h: 66,
                w: 200
              },
              '400': {
                w: 400,
                h: 133
              },
              full: {
                h: 236,
                w: 710
              }
            },
            normalize: 'true',
            imgid: '3',
            geometry: '710x236-70-447',
            rev: '7'
          }
        },
        amino_acids_prev_tags: [],
        states:
          'en:to-be-checked, en:complete, en:nutrition-facts-completed, en:ingredients-completed, en:expiration-date-completed, en:packaging-code-to-be-completed, en:characteristics-completed, en:categories-completed, en:brands-completed, en:packaging-completed, en:quantity-completed, en:product-name-completed, en:photos-validated, en:photos-uploaded',
        ingredients_text_debug: "_malt d'orge_",
        nutrition_score_beverage: 1,
        informers_tags: ['aleene', 'magasins-u', 'vincentdesgms'],
        origins_tags: [],
        traces_from_ingredients: ''
      }
    }
  },
  methods: {
    appTitle() {
      this.name = this.beer.product_name
        ? this.beer.product_name
        : this.beer.product_name_en
      return this.htmlDecode(
        this.name.charAt(0).toUpperCase() + this.name.slice(1)
      )
    },
    htmlDecode(input) {
      const e = document.createElement('textarea')
      e.innerHTML = input
      // handle case of empty input
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
  }
}
</script>
