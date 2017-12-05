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
       name: "ноль|нуль"
    // , path: "/media/ru/numbers/0/"
      , audio: [
  "/media/ru/numbers/0/audio/0"
]
      , words: {
          иней: {
            audio: [
  "/media/ru/numbers/0/words/иней/audio/иней"
]
          , images: [
  "/media/ru/numbers/0/words/иней/images/hoarfrost-1086504_960_720.jpg"
, "/media/ru/numbers/0/words/иней/images/frost-64159_960_720.jpg"
, "/media/ru/numbers/0/words/иней/images/default.jpg"
, "/media/ru/numbers/0/words/иней/images/frost_winter_wintry_ice_winter_magic_cold_hoarfrost_frozen-1198863.jpg"
, "/media/ru/numbers/0/words/иней/images/tree-2010738_960_720.png"
, "/media/ru/numbers/0/words/иней/images/rime-1157267_960_720.jpg"
, "/media/ru/numbers/0/words/иней/images/default.png"
, "/media/ru/numbers/0/words/иней/images/icing-392725_960_720.jpg"
, "/media/ru/numbers/0/words/иней/images/eiskristalle_nature_frozen_winter_snow_wintry_winter_time_sunny-1199433.jpg"
, "/media/ru/numbers/0/words/иней/images/time_of_year_winter_tree_snow_frozen_sport_landscape_nature-1172526.jpg"
, "/media/ru/numbers/0/words/иней/images/winter_landscape_view_meadow_rime_path_bush_snowy-1375731.jpg"
, "/media/ru/numbers/0/words/иней/images/snow_christmas_holiday_frost_christmas_tree_background_shiny_december-838620.jpg"
]
          }
        , default_word: "иней"
        }
      }
    , 1: {
       name: "один|одна|одно|одни"
    // , path: "/media/ru/numbers/1/"
      , audio: [
  "/media/ru/numbers/1/audio/1"
]
      , words: {
          рай: {
            audio: [
  "/media/ru/numbers/1/words/рай/audio/рай"
]
          , images: [
  "/media/ru/numbers/1/words/рай/images/default.jpg"
, "/media/ru/numbers/1/words/рай/images/5852336142_12137f4002_b.jpg"
, "/media/ru/numbers/1/words/рай/images/1024px-Meister_des_Frankfurter_Paradiesgärtleins_001.jpg"
, "/media/ru/numbers/1/words/рай/images/angel-1538938_1280.jpg"
]
          }
        , default_word: "рай"
        }
      }
    , 2: {
       name: "два|две"
    // , path: "/media/ru/numbers/2/"
      , audio: [
  "/media/ru/numbers/2/audio/2"
]
      , words: {
          ад: {
            audio: [
  "/media/ru/numbers/2/words/ад/audio/ад"
]
          , images: [
  "/media/ru/numbers/2/words/ад/images/devil-1898408_1280.jpg"
, "/media/ru/numbers/2/words/ад/images/default.jpg"
, "/media/ru/numbers/2/words/ад/images/14124313715_42b3eab5b6_k.jpg"
]
          }
        , default_word: "ад"
        }
      }
    , 3: {
       name: "три"
    // , path: "/media/ru/numbers/3/"
      , audio: [
  "/media/ru/numbers/3/audio/3"
]
      , words: {
          око: {
            audio: [
  "/media/ru/numbers/3/words/око/audio/око"
]
          , images: [
  "/media/ru/numbers/3/words/око/images/wolf_eye_fur_wild_animal_wildlife_nature_predator-632046.jpg"
, "/media/ru/numbers/3/words/око/images/default.jpg"
, "/media/ru/numbers/3/words/око/images/eye-1010677_1280.jpg"
, "/media/ru/numbers/3/words/око/images/eye-307594_1280.png"
]
          }
        , default_word: "око"
        }
      }
    , 4: {
       name: "четыре"
    // , path: "/media/ru/numbers/4/"
      , audio: [
  "/media/ru/numbers/4/audio/4"
]
      , words: {
          чай: {
            audio: [
  "/media/ru/numbers/4/words/чай/audio/чай"
]
          , images: [
  "/media/ru/numbers/4/words/чай/images/2017-05-23-15-51-22-900x564.jpg"
, "/media/ru/numbers/4/words/чай/images/default.jpg"
, "/media/ru/numbers/4/words/чай/images/chinese-tea-2644251_1280.jpg"
, "/media/ru/numbers/4/words/чай/images/teacup-2792745_1280.jpg"
]
          }
        , default_word: "чай"
        }
      }
    , 5: {
       name: "пять"
    // , path: "/media/ru/numbers/5/"
      , audio: [
  "/media/ru/numbers/5/audio/5"
]
      , words: {
          бой: {
            audio: [
  "/media/ru/numbers/5/words/бой/audio/бой"
]
          , images: [
  "/media/ru/numbers/5/words/бой/images/Walka_powstancza.jpg"
, "/media/ru/numbers/5/words/бой/images/default.jpg"
, "/media/ru/numbers/5/words/бой/images/Cock-fighting.jpg"
, "/media/ru/numbers/5/words/бой/images/-171.jpg"
, "/media/ru/numbers/5/words/бой/images/1200px-Nilgais_fighting,_Lakeshwari,_Gwalior_district,_India.jpg"
, "/media/ru/numbers/5/words/бой/images/karate.png"
, "/media/ru/numbers/5/words/бой/images/1200px-Voennaia_marka_SSSR_Smert_nemeczkim_okkupantam.jpg"
, "/media/ru/numbers/5/words/бой/images/kerala-1639325_960_720.jpg"
, "/media/ru/numbers/5/words/бой/images/Pankration.jpg"
, "/media/ru/numbers/5/words/бой/images/Лубок.jpg"
, "/media/ru/numbers/5/words/бой/images/revenge-1846274_960_720.png"
]
          }
        , обой: {
            audio: [
  "/media/ru/numbers/5/words/обой/audio/обои"
]
          , images: [
  "/media/ru/numbers/5/words/обой/images/room-2147609_1280.jpg"
]
          }
        , default_word: "бой"
        }
      }
    , 6: {
       name: "шесть"
    // , path: "/media/ru/numbers/6/"
      , audio: [
  "/media/ru/numbers/6/audio/6"
]
      , words: {
          шея: {
            audio: [
  "/media/ru/numbers/6/words/шея/audio/шея"
]
          , images: [
  "/media/ru/numbers/6/words/шея/images/photo-24870.jpg"
, "/media/ru/numbers/6/words/шея/images/default.jpg"
, "/media/ru/numbers/6/words/шея/images/neck-1211231_1280.jpg"
, "/media/ru/numbers/6/words/шея/images/emu.jpg"
, "/media/ru/numbers/6/words/шея/images/emu-686364_1280.jpg"
]
          }
        , default_word: "шея"
        }
      }
    , 7: {
       name: "семь"
    // , path: "/media/ru/numbers/7/"
      , audio: [
  "/media/ru/numbers/7/audio/7"
]
      , words: {
          оса: {
            audio: [
  "/media/ru/numbers/7/words/оса/audio/оса"
]
          , images: [
  "/media/ru/numbers/7/words/оса/images/default.jpg"
, "/media/ru/numbers/7/words/оса/images/hornet_wasp_insect_close-1240584.jpg"
, "/media/ru/numbers/7/words/оса/images/1200px-Polistes_May_2013-2.jpg"
, "/media/ru/numbers/7/words/оса/images/hornet-151003_960_720.png"
]
          }
        , default_word: "оса"
        }
      }
    , 8: {
       name: "восемь"
    // , path: "/media/ru/numbers/8/"
      , audio: [
  "/media/ru/numbers/8/audio/8"
]
      , words: {
          ива: {
            audio: [
  "/media/ru/numbers/8/words/ива/audio/ива"
]
          , images: [
  "/media/ru/numbers/8/words/ива/images/1200px-Ива_ломкая_KR_01.jpg"
, "/media/ru/numbers/8/words/ива/images/800px-Bloedel_Reserve_Willow_Tree.jpg"
, "/media/ru/numbers/8/words/ива/images/Cleaned-Illustration_Salix_purpurea.jpg"
, "/media/ru/numbers/8/words/ива/images/tree-984846_1280.jpg"
]
          }
        , фея: {
            audio: [
  "/media/ru/numbers/8/words/фея/audio/фея"
]
          , images: [
  "/media/ru/numbers/8/words/фея/images/default.jpg"
, "/media/ru/numbers/8/words/фея/images/creature-2029421_960_720.png"
, "/media/ru/numbers/8/words/фея/images/42878-FX-6-0-12-6-0-0.jpg"
, "/media/ru/numbers/8/words/фея/images/fee-1788193_1280.jpg"
]
          }
        , default_word: "фея"
        }
      }
    , 9: {
       name: "девять"
    // , path: "/media/ru/numbers/9/"
      , audio: [
  "/media/ru/numbers/9/audio/9"
]
      , words: {
          яма: {
            audio: [
  "/media/ru/numbers/9/words/яма/audio/яма"
]
          , images: [
  "/media/ru/numbers/9/words/яма/images/hole-366755_1280.jpg"
, "/media/ru/numbers/9/words/яма/images/default.jpg"
, "/media/ru/numbers/9/words/яма/images/Heart_hole_in_a_tree.jpg"
, "/media/ru/numbers/9/words/яма/images/hole-in-old-brick-wall.jpg"
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
