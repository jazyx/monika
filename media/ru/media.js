;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  monika.media = ({
    errorSound: "media/interface/error/not" // ogg, mp3

  , pass: {
      rewards: {
        header:    "Congratulations!"
      , record:    "You're setting new records!"
      , target:    "You've beaten the target time!"
      , bestYet:   "You've beaten your personal best!"
      , goodStart: "You're off to a good start!"
      , complete:  'You completed level <span class="level">1</span>!'
      , gameOver:  "You've reached the end of the game."
      }
    , buttons: {
        progress:  "See your progress"
      , repeat:    "Repeat this level"
      , nextLevel: "Continue"
      }
    }

  , number_names_LUT: {
    0: "нoль"
    ,  1: "один"
    ,  2: "два"
    ,  3: "три"
    ,  4: "четыре"
    ,  5: "пять"
    ,  6: "шесть"
    ,  7: "семь"
    ,  8: "восемь"
    ,  9: "девять"
    , 10: "десять"
    , 11: "одиннадцать"
    , 12: "двенадцать"
    , 13: "тринадцать"
    , 14: "четырнадцать"
    , 15: "пятнадцать"
    , 16: "шестнадцать"
    , 17: "семнадцать"
    , 18: "восемнадцать"
    , 19: "девятнадцать"
    , 20: "двадцать"
    , 21: "двадцать один"
    , 22: "двадцать два"
    , 23: "двадцать три"
    , 24: "двадцать четыре"
    , 25: "двадцать пять"
    , 26: "двадцать шесть"
    , 27: "двадцать семь"
    , 28: "двадцать восемь"
    , 29: "двадцать девять"
    , 30: "тридцать"
    , 31: "тридцать один"
    , 32: "тридцать два"
    , 33: "тридцать три"
    , 34: "тридцать четыре"
    , 35: "тридцать пять"
    , 36: "тридцать шесть"
    , 37: "тридцать семь"
    , 38: "тридцать восемь"
    , 39: "тридцать девять"
    , 40: "сорок"
    , 41: "сорок один"
    , 42: "сорок два"
    , 43: "сорок три"
    , 44: "сорок четыре"
    , 45: "сорок пять"
    , 46: "сорок шесть"
    , 47: "сорок семь"
    , 48: "сорок восемь"
    , 49: "сорок девять"
    , 50: "пятьдесят"
    , 51: "пятьдесят один"
    , 52: "пятьдесят два"
    , 53: "пятьдесят три"
    , 54: "пятьдесят четыре"
    , 55: "пятьдесят пять"
    , 56: "пятьдесят шесть"
    , 57: "пятьдесят семь"
    , 58: "пятьдесят восемь"
    , 59: "пятьдесят девять"
    , 60: "шестьдесят"
    , 61: "шестьдесят один"
    , 62: "шестьдесят два"
    , 63: "шестьдесят три"
    , 64: "шестьдесят четыре"
    , 65: "шестьдесят пять"
    , 66: "шестьдесят шесть"
    , 67: "шестьдесят семь"
    , 68: "шестьдесят восемь"
    , 69: "шестьдесят девять"
    , 70: "семьдесят"
    , 71: "семьдесят один"
    , 72: "семьдесят два"
    , 73: "семьдесят три"
    , 74: "семьдесят четыре"
    , 75: "семьдесят пять"
    , 76: "семьдесят шесть"
    , 77: "семьдесят семь"
    , 78: "семьдесят восемь"
    , 79: "семьдесят девять"
    , 80: "восемьдесят"
    , 81: "восемьдесят один"
    , 82: "восемьдесят два"
    , 83: "восемьдесят три"
    , 84: "восемьдесят четыре"
    , 85: "восемьдесят пять"
    , 86: "восемьдесят шесть"
    , 87: "восемьдесят семь"
    , 88: "восемьдесят восемь"
    , 89: "восемьдесят девять"
    , 90: "девяносто"
    , 91: "девяносто один"
    , 92: "девяносто два"
    , 93: "девяносто три"
    , 94: "девяносто четыре"
    , 95: "девяносто пять"
    , 96: "девяносто шесть"
    , 97: "девяносто семь"
    , 98: "девяносто восемь"
    , 99: "девяносто девять"
    , 100: "сто"
    }

  , consonants: {
      map: {
        0: "н"
        , 1: "рц"
        , 2: "дт"
        , 3: "кгх"
        , 4: "чж"
        , 5: "пб"
        , 6: "шщл"
        , 7: "сз"
        , 8: "вф"
        , 9: "м"
      }
    , audio: {
      б: [
          "/monika/media/ru/consonants/б/б"
        ]
      , в: [
          "/monika/media/ru/consonants/в/в"
        ]
      , г: [
          "/monika/media/ru/consonants/г/г"
        ]
      , д: [
          "/monika/media/ru/consonants/д/д"
        ]
      , ж: [
          "/monika/media/ru/consonants/ж/ж"
        ]
      , з: [
          "/monika/media/ru/consonants/з/з"
        ]
      , к: [
          "/monika/media/ru/consonants/к/к"
        ]
      , л: [
          "/monika/media/ru/consonants/л/л"
        ]
      , м: [
          "/monika/media/ru/consonants/м/м"
        ]
      , н: [
          "/monika/media/ru/consonants/н/н"
        ]
      , п: [
          "/monika/media/ru/consonants/п/п"
        ]
      , р: [
          "/monika/media/ru/consonants/р/р"
        ]
      , с: [
          "/monika/media/ru/consonants/с/с"
        ]
      , т: [
          "/monika/media/ru/consonants/т/т"
        ]
      , ф: [
          "/monika/media/ru/consonants/ф/ф"
        ]
      , х: [
          "/monika/media/ru/consonants/х/х"
        ]
      , ц: [
          "/monika/media/ru/consonants/ц/ц"
        ]
      , ч: [
          "/monika/media/ru/consonants/ч/ч"
        ]
      , ш: [
          "/monika/media/ru/consonants/ш/ш"
        ]
      , щ: [
          "/monika/media/ru/consonants/щ/щ"
        ]
      }
    }
  , numbers: {
      0: {
        name: "ноль|нуль"
   // , path: "/monika/media/ru/numbers/0/"
      , audio: [
  "/monika/media/ru/numbers/0/audio/0"
]
      , words: {
          иней: {
            audio: [
  "/monika/media/ru/numbers/0/words/иней/audio/иней"
]
          , images: [
  "/monika/media/ru/numbers/0/words/иней/images/hoarfrost.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/rime.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/leaf.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/default.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/fence.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/tree.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/icing.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/frost.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/clearing.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/crystals.jpg"
]
          }
        , default_word: "иней"
        }
      }
    , 1: {
        name: "один|одна|одно|одни"
   // , path: "/monika/media/ru/numbers/1/"
      , audio: [
  "/monika/media/ru/numbers/1/audio/1"
]
      , words: {
          рай: {
            audio: [
  "/monika/media/ru/numbers/1/words/рай/audio/рай"
]
          , images: [
  "/monika/media/ru/numbers/1/words/рай/images/clouds.jpg"
, "/monika/media/ru/numbers/1/words/рай/images/default.jpg"
, "/monika/media/ru/numbers/1/words/рай/images/eden.jpg"
, "/monika/media/ru/numbers/1/words/рай/images/garden.jpg"
]
          }
        , default_word: "рай"
        }
      }
    , 10: {
        name: "десять"
   // , path: "/monika/media/ru/numbers/10/"
      , audio: []
      , words: {
          руина: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/10/words/руина/images/church.jpg"
, "/monika/media/ru/numbers/10/words/руина/images/arch.jpg"
, "/monika/media/ru/numbers/10/words/руина/images/chalet.jpg"
, "/monika/media/ru/numbers/10/words/руина/images/castle.jpg"
]
          }
        , default_word: "руина"
        }
      }
    , 11: {
        name: "одиннадцать"
   // , path: "/monika/media/ru/numbers/11/"
      , audio: []
      , words: {
          рация: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/11/words/рация/images/action.jpg"
, "/monika/media/ru/numbers/11/words/рация/images/default.jpg"
, "/monika/media/ru/numbers/11/words/рация/images/tilt.jpg"
, "/monika/media/ru/numbers/11/words/рация/images/nerf.jpg"
]
          }
        , default_word: "рация"
        }
      }
    , 12: {
        name: "двенадцать"
   // , path: "/monika/media/ru/numbers/12/"
      , audio: []
      , words: {
          рот: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/12/words/рот/images/default.jpg"
, "/monika/media/ru/numbers/12/words/рот/images/baby.jpg"
, "/monika/media/ru/numbers/12/words/рот/images/lipstick.jpg"
, "/monika/media/ru/numbers/12/words/рот/images/man.jpg"
, "/monika/media/ru/numbers/12/words/рот/images/open.jpg"
]
          }
        , default_word: "рот"
        }
      }
    , 13: {
        name: "тринадцать"
   // , path: "/monika/media/ru/numbers/13/"
      , audio: []
      , words: {
          рука: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/13/words/рука/images/arm.jpg"
, "/monika/media/ru/numbers/13/words/рука/images/default.jpg"
, "/monika/media/ru/numbers/13/words/рука/images/drawing.jpg"
, "/monika/media/ru/numbers/13/words/рука/images/fingers.jpg"
, "/monika/media/ru/numbers/13/words/рука/images/wooden.jpg"
, "/monika/media/ru/numbers/13/words/рука/images/reach.jpg"
]
          }
        , default_word: "рука"
        }
      }
    , 14: {
        name: "четырнадцать"
   // , path: "/monika/media/ru/numbers/14/"
      , audio: []
      , words: {
          ручей: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/14/words/ручей/images/default.jpg"
, "/monika/media/ru/numbers/14/words/ручей/images/stream.jpg"
, "/monika/media/ru/numbers/14/words/ручей/images/torrent.jpg"
, "/monika/media/ru/numbers/14/words/ручей/images/brook.jpg"
]
          }
        , default_word: "ручей"
        }
      }
    , 15: {
        name: "пятнадцать"
   // , path: "/monika/media/ru/numbers/15/"
      , audio: []
      , words: {
          рыба: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/15/words/рыба/images/mort.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/default.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/spiny.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/bufoceratias.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/discus.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/moray.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/tail.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/blowfish.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/yellow.jpg"
, "/monika/media/ru/numbers/15/words/рыба/images/boha.jpg"
]
          }
        , default_word: "рыба"
        }
      }
    , 16: {
        name: "шестнадцать"
   // , path: "/monika/media/ru/numbers/16/"
      , audio: []
      , words: {
          руль: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/16/words/руль/images/default.jpg"
, "/monika/media/ru/numbers/16/words/руль/images/helm.jpg"
, "/monika/media/ru/numbers/16/words/руль/images/rudder.jpg"
, "/monika/media/ru/numbers/16/words/руль/images/zoomer.jpg"
, "/monika/media/ru/numbers/16/words/руль/images/handlebars.jpg"
]
          }
        , default_word: "руль"
        }
      }
    , 17: {
        name: "семнадцать"
   // , path: "/monika/media/ru/numbers/17/"
      , audio: []
      , words: {
          роза: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/17/words/роза/images/flat.jpg"
, "/monika/media/ru/numbers/17/words/роза/images/default.jpg"
, "/monika/media/ru/numbers/17/words/роза/images/stem.jpg"
, "/monika/media/ru/numbers/17/words/роза/images/closeup.jpg"
]
          }
        , default_word: "роза"
        }
      }
    , 18: {
        name: "восемнадцать"
   // , path: "/monika/media/ru/numbers/18/"
      , audio: []
      , words: {
          арфа: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/18/words/арфа/images/player.jpg"
, "/monika/media/ru/numbers/18/words/арфа/images/double.jpg"
, "/monika/media/ru/numbers/18/words/арфа/images/greek.jpg"
, "/monika/media/ru/numbers/18/words/арфа/images/celtic.jpg"
]
          }
        , default_word: "арфа"
        }
      }
    , 19: {
        name: "девятнадцать"
   // , path: "/monika/media/ru/numbers/19/"
      , audio: []
      , words: {
          Pим: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/19/words/Pим/images/default.jpg"
, "/monika/media/ru/numbers/19/words/Pим/images/pietro.jpg"
, "/monika/media/ru/numbers/19/words/Pим/images/colloseum.jpg"
, "/monika/media/ru/numbers/19/words/Pим/images/basilica.jpg"
, "/monika/media/ru/numbers/19/words/Pим/images/map.jpg"
]
          }
        , default_word: "Pим"
        }
      }
    , 2: {
        name: "два|две"
   // , path: "/monika/media/ru/numbers/2/"
      , audio: [
  "/monika/media/ru/numbers/2/audio/2"
]
      , words: {
          ад: {
            audio: [
  "/monika/media/ru/numbers/2/words/ад/audio/ад"
]
          , images: [
  "/monika/media/ru/numbers/2/words/ад/images/default.jpg"
, "/monika/media/ru/numbers/2/words/ад/images/donald.jpg"
, "/monika/media/ru/numbers/2/words/ад/images/hortus.jpg"
, "/monika/media/ru/numbers/2/words/ад/images/lava.jpg"
]
          }
        , default_word: "ад"
        }
      }
    , 21: {
        name: "двадцать один|двадцать одна|двадцать одно"
   // , path: "/monika/media/ru/numbers/21/"
      , audio: []
      , words: {
          дыра: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/21/words/дыра/images/wall.jpg"
, "/monika/media/ru/numbers/21/words/дыра/images/default.jpg"
]
          }
        , default_word: "дыра"
        }
      }
    , 3: {
        name: "три"
   // , path: "/monika/media/ru/numbers/3/"
      , audio: [
  "/monika/media/ru/numbers/3/audio/3"
]
      , words: {
          око: {
            audio: [
  "/monika/media/ru/numbers/3/words/око/audio/око"
]
          , images: [
  "/monika/media/ru/numbers/3/words/око/images/symbol.png"
, "/monika/media/ru/numbers/3/words/око/images/default.jpg"
, "/monika/media/ru/numbers/3/words/око/images/blue.jpg"
, "/monika/media/ru/numbers/3/words/око/images/fish.jpg"
, "/monika/media/ru/numbers/3/words/око/images/wolf.jpg"
]
          }
        , ухо: {
            audio: []
          , images: [
  "/monika/media/ru/numbers/3/words/ухо/images/cat.jpg"
, "/monika/media/ru/numbers/3/words/ухо/images/default.jpg"
, "/monika/media/ru/numbers/3/words/ухо/images/drawing.jpg"
, "/monika/media/ru/numbers/3/words/ухо/images/elephant.jpg"
, "/monika/media/ru/numbers/3/words/ухо/images/schema.jpg"
, "/monika/media/ru/numbers/3/words/ухо/images/doe.jpg"
]
          }
        , default_word: "око"
        }
      }
    , 4: {
        name: "четыре"
   // , path: "/monika/media/ru/numbers/4/"
      , audio: [
  "/monika/media/ru/numbers/4/audio/4"
]
      , words: {
          чай: {
            audio: [
  "/monika/media/ru/numbers/4/words/чай/audio/чай"
]
          , images: [
  "/monika/media/ru/numbers/4/words/чай/images/lipton.jpg"
, "/monika/media/ru/numbers/4/words/чай/images/default.jpg"
, "/monika/media/ru/numbers/4/words/чай/images/chinese.jpg"
, "/monika/media/ru/numbers/4/words/чай/images/tea.jpg"
, "/monika/media/ru/numbers/4/words/чай/images/lemon.jpg"
]
          }
        , default_word: "чай"
        }
      }
    , 5: {
        name: "пять"
   // , path: "/monika/media/ru/numbers/5/"
      , audio: [
  "/monika/media/ru/numbers/5/audio/5"
]
      , words: {
          бой: {
            audio: [
  "/monika/media/ru/numbers/5/words/бой/audio/бой"
]
          , images: [
  "/monika/media/ru/numbers/5/words/бой/images/default.jpg"
, "/monika/media/ru/numbers/5/words/бой/images/rubble.jpg"
, "/monika/media/ru/numbers/5/words/бой/images/revenge.jpg"
, "/monika/media/ru/numbers/5/words/бой/images/kerala.jpg"
, "/monika/media/ru/numbers/5/words/бой/images/stamp.jpg"
, "/monika/media/ru/numbers/5/words/бой/images/karate.png"
, "/monika/media/ru/numbers/5/words/бой/images/cockfight.jpg"
, "/monika/media/ru/numbers/5/words/бой/images/Лубок.jpg"
, "/monika/media/ru/numbers/5/words/бой/images/nilgais.jpg"
]
          }
        , default_word: "бой"
        }
      }
    , 6: {
        name: "шесть"
   // , path: "/monika/media/ru/numbers/6/"
      , audio: [
  "/monika/media/ru/numbers/6/audio/6"
]
      , words: {
          шея: {
            audio: [
  "/monika/media/ru/numbers/6/words/шея/audio/шея"
]
          , images: [
  "/monika/media/ru/numbers/6/words/шея/images/default.jpg"
, "/monika/media/ru/numbers/6/words/шея/images/guy.jpg"
, "/monika/media/ru/numbers/6/words/шея/images/emu.jpg"
, "/monika/media/ru/numbers/6/words/шея/images/bald.jpg"
, "/monika/media/ru/numbers/6/words/шея/images/diplodocus.jpg"
]
          }
        , default_word: "шея"
        }
      }
    , 7: {
        name: "семь"
   // , path: "/monika/media/ru/numbers/7/"
      , audio: [
  "/monika/media/ru/numbers/7/audio/7"
]
      , words: {
          оса: {
            audio: [
  "/monika/media/ru/numbers/7/words/оса/audio/оса"
]
          , images: [
  "/monika/media/ru/numbers/7/words/оса/images/default.jpg"
, "/monika/media/ru/numbers/7/words/оса/images/close-up.jpg"
, "/monika/media/ru/numbers/7/words/оса/images/hornet.png"
, "/monika/media/ru/numbers/7/words/оса/images/wasp.jpg"
]
          }
        , default_word: "оса"
        }
      }
    , 8: {
        name: "восемь"
   // , path: "/monika/media/ru/numbers/8/"
      , audio: [
  "/monika/media/ru/numbers/8/audio/8"
]
      , words: {
          ива: {
            audio: [
  "/monika/media/ru/numbers/8/words/ива/audio/ива"
]
          , images: [
  "/monika/media/ru/numbers/8/words/ива/images/shade.jpg"
, "/monika/media/ru/numbers/8/words/ива/images/default.jpg"
, "/monika/media/ru/numbers/8/words/ива/images/catkins.jpg"
, "/monika/media/ru/numbers/8/words/ива/images/sketch.jpg"
]
          }
        , фея: {
            audio: [
  "/monika/media/ru/numbers/8/words/фея/audio/фея"
]
          , images: [
  "/monika/media/ru/numbers/8/words/фея/images/default.jpg"
, "/monika/media/ru/numbers/8/words/фея/images/drawing.jpg"
, "/monika/media/ru/numbers/8/words/фея/images/silhouette.png"
, "/monika/media/ru/numbers/8/words/фея/images/fairy.jpg"
]
          }
        , default_word: "фея"
        }
      }
    , 9: {
        name: "девять"
   // , path: "/monika/media/ru/numbers/9/"
      , audio: [
  "/monika/media/ru/numbers/9/audio/9"
]
      , words: {
          яма: {
            audio: [
  "/monika/media/ru/numbers/9/words/яма/audio/яма"
]
          , images: [
  "/monika/media/ru/numbers/9/words/яма/images/mine.jpg"
, "/monika/media/ru/numbers/9/words/яма/images/default.jpg"
, "/monika/media/ru/numbers/9/words/яма/images/road.jpg"
, "/monika/media/ru/numbers/9/words/яма/images/site.jpg"
, "/monika/media/ru/numbers/9/words/яма/images/tree.jpg"
]
          }
        , default_word: "яма"
        }
      }
    }

  , initialize: function initialize() {
      if (monika.processor) {
        console.log("Initializing monika.media")
        monika.processor.run(this)
      }

      return this
    }
      
  }).initialize()

})(window.monika)
