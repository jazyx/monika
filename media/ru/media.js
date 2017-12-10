;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  monika.media = ({
    errorSound: "media/interface/error/not" // ogg, mp3

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
, "/monika/media/ru/numbers/0/words/иней/images/default.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/rime.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/fence.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/tree.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/icing.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/frost.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/clearing.jpg"
, "/monika/media/ru/numbers/0/words/иней/images/snowflake.jpg"
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
  "/monika/media/ru/numbers/8/words/ива/images/pond.jpg"
, "/monika/media/ru/numbers/8/words/ива/images/shade.jpg"
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
  "/monika/media/ru/numbers/9/words/яма/images/wall.jpg"
, "/monika/media/ru/numbers/9/words/яма/images/default.jpg"
, "/monika/media/ru/numbers/9/words/яма/images/road.jpg"
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
