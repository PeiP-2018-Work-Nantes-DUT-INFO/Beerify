import axios from 'axios'

export default {
  search(params) {
    return axios.get('/cgi/search.pl?action=process&json=1', {
      params
    })
  },

  getBeersCategories() {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, _) => {
      resolve({
        status: 200,
        data: {
          'en:abbey-beer': {
            parents: ['en:beers'],
            name: {
              de: 'Abteibier',
              en: 'Abbey beer',
              fr: `Bières d'abbayes`,
              nl: 'Abdijbieren',
              fi: 'Luostariolut',
              hu: 'Apátsági sör'
            }
          },
          'en:amber-beers': {
            wikidata: {
              en: 'Q2271859'
            },
            name: {
              zh: '爱尔淡啤酒',
              de: 'Amber ales',
              es: 'Cerveza ambar',
              nl: 'Amber bier',
              fr: 'Bières ambrées',
              en: 'Amber beers'
            },
            parents: ['en:beers']
          },
          'en:american-beers': {
            parents: ['en:beers'],
            name: {
              fr: 'Bières américaines',
              nl: 'Bier uit de Verenigde Staten van Amerika',
              en: 'American beers',
              it: 'Birre americane'
            }
          },
          'en:beers-from-czech-republic': {
            parents: ['en:beers'],
            name: {
              hu: 'Cseh sörök',
              nl: 'Tsjechische bieren',
              fr: 'Bières de République tchèque',
              en: 'Beers from Czech republic',
              de: 'Tschechische Biere'
            },
            children: [
              'cz:brněnské-pivo-starobrněnské-pivo',
              'cz:budějovické-pivo',
              'cz:budějovický-měsťanský-var',
              'cz:březnický-ležák',
              'cz:znojemské-pivo',
              'cz:černá-hora',
              'cz:českobudějovické-pivo',
              'cz:české-pivo'
            ]
          },
          'en:beers-from-germany': {
            children: [
              'de:hofer-biere',
              'de:kulmbacher-biere',
              'de:mainfranken-biere',
              'de:münchener-biere',
              'de:münchner-biere',
              'de:reuther-biere',
              'de:wernesgrüner-biere',
              'en:bavarian-beers',
              'en:beers-from-bremen',
              'en:beers-from-dortmund',
              'en:kolsch'
            ],
            country: {
              en: 'Germany'
            },
            name: {
              es: 'Cervezas de alemania',
              en: 'Beers from Germany',
              nl: 'Duitse bieren',
              ro: 'Beri germane',
              de: 'Deutsche Biere',
              fi: 'Saksalaiset oluet',
              hu: 'Német sörök',
              fr: 'Bières allemandes'
            },
            parents: ['en:beers']
          },
          'en:beers-from-ireland': {
            parents: ['en:beers'],
            name: {
              ro: 'Beri irlandeze',
              de: 'Irische Biere',
              en: 'Beers from Ireland',
              fr: 'Bières irlandaises',
              nl: 'Ierse bieren',
              hu: 'Ír sörök'
            }
          },
          'en:beers-from-united-kingdom': {
            name: {
              en: 'Beers from United Kingdom',
              nl: 'Britse bieren',
              de: 'Biere aus dem Vereinigten Königreich'
            },
            parents: ['en:beers'],
            children: [
              'en:kentish-ale',
              'en:newcastle-brown-ale',
              'en:rutland-bitter'
            ]
          },
          'en:beers-with-fruits': {
            name: {
              fi: 'Hedelmäoluet',
              hu: 'Gyümölcsös sörök',
              fr: 'Bieres aromatisées aux fruits',
              nl: 'Vruchtenbieren',
              en: 'Beers with fruits',
              de: 'Fruchtbiere',
              ro: 'Beri cu fructe'
            },
            parents: ['en:beers'],
            children: [
              'en:beers-with-chestnut',
              'en:beers-with-pear',
              'en:cherry-beers'
            ]
          },
          'en:beers-without-gluten': {
            parents: ['en:beers'],
            name: {
              de: 'Glutenfreies Bier',
              it: 'Birre senza glutine',
              en: 'Beers without gluten',
              fr: 'Bières sans gluten',
              hu: 'Gluténmentes sör'
            }
          },
          'en:belgian-beers': {
            name: {
              en: 'Belgian beers',
              nl: 'Belgische bieren',
              es: 'Cervezas belgas',
              hu: 'Belga sörök',
              fi: 'Belgialaiset oluet',
              fr: 'Bières belges',
              ro: 'Beri belgiene',
              de: 'Belgische Biere'
            },
            parents: ['en:beers']
          },
          'en:black-beers': {
            parents: ['en:beers'],
            name: {
              fr: 'Bières noires',
              nl: 'Donkere bieren',
              en: 'Black beers',
              de: 'Schwarzbier',
              es: 'Cervezas negras'
            }
          },
          'en:craft-beers': {
            wikidata: {
              en: 'Q2905030'
            },
            parents: ['en:artisanal-spirits', 'en:beers'],
            name: {
              de: 'Craft Biere',
              ro: 'Beri artizanale',
              ja: 'クラフトビール',
              fi: 'Artesaani-oluet',
              hu: 'Kraft sörök',
              fr: 'Bières artisanales',
              it: 'Birre artigianali',
              nl: 'Ambachtelijke bieren',
              en: 'Craft beers'
            }
          },
          'en:double-beer': {
            name: {
              it: 'Birra doppia',
              de: 'Doppelte Biere',
              nl: 'Dubbelgegist bier',
              fr: 'Bière double',
              hu: 'Dubbel sör',
              en: 'Double beer'
            },
            parents: ['en:beers']
          },
          'en:flavored-beers': {
            parents: ['en:beers'],
            name: {
              nl: 'Gearomatiseerde bieren',
              en: 'Flavored beers',
              it: 'Birre aromatizzate',
              fr: 'Bières aromatisées',
              hu: 'Ízesített sörök',
              fi: 'Maustetu oluet',
              de: 'Aromatisierte Biere',
              ro: 'Beri aromatizate'
            }
          },
          'en:french-beers': {
            children: ['en:brittany-beers', 'en:corsican-beers'],
            parents: ['en:beers'],
            name: {
              fr: 'Bières françaises',
              fi: 'Ranskalaiset oluet',
              hu: 'Francia sörök',
              ro: 'Beri franțuzești',
              de: 'Französische Biere',
              en: 'French beers',
              nl: 'Franse bieren',
              es: 'Cervezas francesas',
              it: 'Birre francesi'
            }
          },
          'en:italian-beers': {
            name: {
              hu: 'Olasz sörök',
              nl: 'Italiaanse bieren',
              fr: 'Bières italiennes',
              en: 'Italian beers',
              it: 'Birre italiane',
              ro: 'Beri italiene',
              de: 'Italienische Biere'
            },
            parents: ['en:beers']
          },
          'en:lagers': {
            parents: ['en:beers'],
            name: {
              de: 'Lager',
              ro: 'Beri blonde',
              fr: 'Bières blondes',
              hu: 'Lágerek',
              fi: 'Lagerit',
              es: 'Cerveza rubia',
              en: 'Lagers',
              nl: 'Lagers'
            },
            wikidata: {
              en: 'Q2792509'
            }
          },
          'en:organic-beers': {
            name: {
              nl: 'Biologische bieren',
              en: 'Organic beers',
              it: 'Birre biologiche',
              es: 'Cervezas organicas',
              fi: 'Luomuoluet',
              hu: 'Bio sörök',
              fr: 'Bières bio',
              de: 'Bio-Biere',
              ro: 'Beri bio'
            },
            parents: ['en:beers']
          },
          'en:quadruple-beer': {
            parents: ['en:beers'],
            name: {
              en: 'Quadruple beer',
              hu: 'Quadrupel sör',
              nl: 'Quadrupel bieren',
              fr: 'Bière quadruple',
              de: 'Vierfache Biere'
            }
          },
          'en:red-beers': {
            parents: ['en:beers'],
            name: {
              fr: 'Bières rousses',
              hu: 'Vörös sörök',
              en: 'Red beers',
              zh: '红啤酒',
              it: 'Birre rosse',
              de: 'Rotbier'
            },
            wikidata: {
              en: 'Q2905058'
            }
          },
          'en:stout': {
            wikidata: {
              en: 'Q2905033'
            },
            parents: ['en:beers'],
            name: {
              de: 'Stouts',
              zh: '烈性黑啤酒',
              en: 'Stout',
              fr: 'Bières brunes',
              nl: 'Stout',
              fi: 'Stout'
            }
          },
          'en:strong-beers': {
            parents: ['en:beers'],
            name: {
              en: 'Strong beers',
              fi: 'Vahvat oluet',
              hu: 'Erős sörök',
              fr: 'Bières fortes',
              nl: 'Sterke bieren',
              de: 'Starkbier',
              es: 'Cervezas fuertes'
            }
          },
          'en:triple-beer': {
            name: {
              en: 'Triple beer',
              hu: 'Tripel sör',
              fi: 'Triple-olut',
              nl: 'Tripel bieren',
              fr: 'Bière triple',
              de: 'Dreifache Biere',
              it: 'Birra tripla'
            },
            parents: ['en:beers']
          },
          'en:wheat-beers': {
            parents: ['en:beers'],
            name: {
              es: 'Cerveza blanca',
              no: 'Hveteöl',
              it: 'Birra bianca',
              zh: '白啤酒',
              en: 'Wheat beers',
              dk: 'Hvedeöl',
              nl: 'Witbieren',
              ro: 'Beri nefiltrate',
              de: 'Weißbier',
              sv: 'Veteöl',
              fi: 'Valko-olut',
              hu: 'Búzasör',
              fr: 'Bières blanches'
            },
            wikidata: {
              en: 'Q15079724'
            }
          }
        }
      })
    })
  }
}
