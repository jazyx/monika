;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  monika.media = ({
    errorSound: "media/interface/error/not" // ogg, mp3

  , consonants: {
      0: "н"
    , 1: "р"
    , 2: "дт"
    , 3: "кгх"
    , 4: "чж"
    , 5: "пб"
    , 6: "шщл"
    , 7: "сз"
    , 8: "вф"
    , 9: "м"
    }

  , numbers: {
      0: {
        path: "media/ru/numbers/0/"
      , name: "ноль|нуль"
      , audio: [
  "0"
]
      , words: {
          иней: {
            audio: [
  "иней"
]
          , images: [
  "hoarfrost-1086504_960_720.jpg"
, "frost-64159_960_720.jpg"
, "default.jpg"
, "frost_winter_wintry_ice_winter_magic_cold_hoarfrost_frozen-1198863.jpg"
, "tree-2010738_960_720.png"
, "rime-1157267_960_720.jpg"
, "default.png"
, "icing-392725_960_720.jpg"
, "eiskristalle_nature_frozen_winter_snow_wintry_winter_time_sunny-1199433.jpg"
, "time_of_year_winter_tree_snow_frozen_sport_landscape_nature-1172526.jpg"
, "winter_landscape_view_meadow_rime_path_bush_snowy-1375731.jpg"
, "snow_christmas_holiday_frost_christmas_tree_background_shiny_december-838620.jpg"
]
          }
        , default_word: "иней"
        }
      }
    , 1: {
        path: "media/ru/numbers/1/"
      , name: "один|одна|одно|одни"
      , audio: [
  "1"
]
      , words: {
          рай: {
            audio: [
  "рай"
]
          , images: [
  "default.jpg"
, "5852336142_12137f4002_b.jpg"
, "1024px-Meister_des_Frankfurter_Paradiesgärtleins_001.jpg"
, "angel-1538938_1280.jpg"
]
          }
        , default_word: "рай"
        }
      }
    , 2: {
        path: "media/ru/numbers/2/"
      , name: "два|две"
      , audio: [
  "2"
]
      , words: {
          ад: {
            audio: [
  "ад"
]
          , images: [
  "devil-1898408_1280.jpg"
, "default.jpg"
, "14124313715_42b3eab5b6_k.jpg"
]
          }
        , default_word: "ад"
        }
      }
    , 3: {
        path: "media/ru/numbers/3/"
      , name: "три"
      , audio: [
  "3"
]
      , words: {
          око: {
            audio: [
  "око"
]
          , images: [
  "wolf_eye_fur_wild_animal_wildlife_nature_predator-632046.jpg"
, "default.jpg"
, "eye-1010677_1280.jpg"
, "eye-307594_1280.png"
]
          }
        , default_word: "око"
        }
      }
    , 4: {
        path: "media/ru/numbers/4/"
      , name: "четыре"
      , audio: [
  "4"
]
      , words: {
          чай: {
            audio: [
  "чай"
]
          , images: [
  "2017-05-23-15-51-22-900x564.jpg"
, "default.jpg"
, "chinese-tea-2644251_1280.jpg"
, "teacup-2792745_1280.jpg"
]
          }
        , default_word: "чай"
        }
      }
    , 5: {
        path: "media/ru/numbers/5/"
      , name: "пять"
      , audio: [
  "5"
]
      , words: {
          бой: {
            audio: [
  "бой"
]
          , images: [
  "Walka_powstancza.jpg"
, "default.jpg"
, "Cock-fighting.jpg"
, "-171.jpg"
, "1200px-Nilgais_fighting,_Lakeshwari,_Gwalior_district,_India.jpg"
, "karate.png"
, "1200px-Voennaia_marka_SSSR_Smert_nemeczkim_okkupantam.jpg"
, "kerala-1639325_960_720.jpg"
, "Pankration.jpg"
, "Лубок.jpg"
, "revenge-1846274_960_720.png"
]
          }
        , обой: {
            audio: [
  "обои"
]
          , images: [
  "room-2147609_1280.jpg"
]
          }
        , default_word: "бой"
        }
      }
    , 6: {
        path: "media/ru/numbers/6/"
      , name: "шесть"
      , audio: [
  "6"
]
      , words: {
          шея: {
            audio: [
  "шея"
]
          , images: [
  "photo-24870.jpg"
, "default.jpg"
, "neck-1211231_1280.jpg"
, "emu.jpg"
, "emu-686364_1280.jpg"
]
          }
        , default_word: "шея"
        }
      }
    , 7: {
        path: "media/ru/numbers/7/"
      , name: "семь"
      , audio: [
  "7"
]
      , words: {
          оса: {
            audio: [
  "оса"
]
          , images: [
  "default.jpg"
, "hornet_wasp_insect_close-1240584.jpg"
, "1200px-Polistes_May_2013-2.jpg"
, "hornet-151003_960_720.png"
]
          }
        , default_word: "оса"
        }
      }
    , 8: {
        path: "media/ru/numbers/8/"
      , name: "восемь"
      , audio: [
  "8"
]
      , words: {
          ива: {
            audio: [
  "ива"
]
          , images: [
  "1200px-Ива_ломкая_KR_01.jpg"
, "800px-Bloedel_Reserve_Willow_Tree.jpg"
, "Cleaned-Illustration_Salix_purpurea.jpg"
, "tree-984846_1280.jpg"
]
          }
        , фея: {
            audio: [
  "фея"
]
          , images: [
  "default.jpg"
, "creature-2029421_960_720.png"
, "42878-FX-6-0-12-6-0-0.jpg"
, "fee-1788193_1280.jpg"
]
          }
        , default_word: "фея"
        }
      }
    , 9: {
        path: "media/ru/numbers/9/"
      , name: "девять"
      , audio: [
  "9"
]
      , words: {
          яма: {
            audio: [
  "яма"
]
          , images: [
  "hole-366755_1280.jpg"
, "default.jpg"
, "Heart_hole_in_a_tree.jpg"
, "hole-in-old-brick-wall.jpg"
]
          }
        , default_word: "яма"
        }
      }
    }

  , initialize: function initialize() {
      if (monika.manager) {
        console.log("Initializing monika.media")
        monika.manager.loadMedia(this)
      }

      return this
    }
      
  }).initialize()

})(window.monika)
