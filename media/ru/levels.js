;(function levelOptions(monika){

  if (!monika) {
    monika = window.monika = {}
  }


    // X: {
    //   className:   "levelName"
    // , cue_range:   { start: 0, end: 9 } // [1, 3, ... 99]
    // , repeat:      2
    // , consecutive: false // true
    // , decoy_range: { start: 0, end: 9 } // [1, 3, ... 99]
    // , sortBy:      "" // "odd&even" // "even&odd"
    // , header:      "<p>Header.</p>"


  levelOptions = monika.levelOptions = {

    // Digits and their names
    _abc: {
      className: "Alphabet"
    , header: ""
    , text: "<h2>Learn the alphabet</h2>"
    }
    // Even digits and their key consonants
  , _123: {
      className: "Numbers"
    , header: ""
    , text: "<h3>Learn the numbers from 0 - 9</h3>"
    }
    // Even digits and their key consonants
  , 1: {
      className: "Intro"
    , name: "George"
    , header: "Learn the numbers from 0 - 9, and train your memory."
    , text: "<p>Click on the three buttons that correspond to the number "
      + "that you hear.</p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // Even digits and their key consonants
  , 2: {
      className: "EvenConsonants"
    , header: "The Major System: numbers and consonants"
    , text: "<p>The Major System helps you train your memory."
      + "You associate numbers and letters, then build words "
      + "from the letters. With the words, you invent memorable images."
    , firstTime: 300000
    , targetTime:150000
    }
    // Odd digits and their key consonants
  , 3: {
      className: "OddConsonants"
    , header: "Consonants for 1, 3 and 9"
    , text: "<p>For 1, you can use «<span>Р</span>» for «Раз». For "
      + "3, you can use «<span>К</span>» from «тройКа», and for 9, "
      + "you can use «<span>М</span>» for «Много». "
      + "(You'll see why «т» is not used for «три» in a moment.)"
    , firstTime: 300000
    , targetTime:150000
    }
    // All digits and their key consonants
  , 4: {
      className: "KeyConsonants"
    , header: "Additional consonants"
    , text: "<p>To make it easier to find words, some numbers have "
      + "additional consonants associated with them. You'll get a "
      + "chance to practise these other consonants in the next level.</p>"
      + "<p>Press and hold a consonant to hear it.</p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // All digits and all their consonants
  , 5: {
      className: "MultiConsonants"
    , header: "Find all the consonants associated with the given number"
    , text: "<p><span>Д</span>/<span>Т</span>, <span>Г</span>/"
      + "<span>К</span>, <span>Б</span>/<span>П</span>, "
      + "<span>З</span>/<span>С</span>, and "
      + "<span>В</span>/<span>Ф</span> are used together because "
      + "they are the same sound, voiced and unvoiced.</p>"
      + "<p><span>Ж</span>/<span>Ч</span>, and <span>Ш</span>/"
      + "<span>Щ</span> are used together because of their similarities.</p>"
      + "<p><span>Ц</span>, <span>Х</span> and <span>Л</span> are used "
      + "to balance letter frequencies.</p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // All digits and all their consonants
  , 6: {
      className: "SoloConsonants"
    , header: "Find one of the consonants associated with the given number"
    , text: "<p></p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // Words for digits
  , 7: {
      className: "Words"
    , name: "0-9"
    , cue_range: { start: 0, end: 9 }
    , header: "Associating words to numbers"
    , text: "<p>You can add vowels to each consonant to make words. "
      + "Here are some words that help create strong images. Press "
      + "and hold to see more images for the same word.</p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // Consonant cue
  , 8: {
      className: "ConsonantCue"
    , cue_range: { start: 0, end: 9 }
    , header: "Practice with consonants"
    , text: "<p>You have had practice associating numbers with "
      + "consonants. Now let's practice recall: which consonants "
      + "evoke which numbers?</p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // Image cue
  , 9: {
      className: "ImageCue"
    , cue_range: { start: 0, end: 9 }
    , header: "Practice with words"
    , text: "<p>Find the number that matches the image and name.</p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // Image cue with varied images
  , 10: {
      className: "AllImages"
    , cue_range: { start: 0, end: 9 }
    , header: "Creating rich mental images"
    , text: "<p>It's good to let the cue word for a number evoke "
      + "a wide variety of mental images. Match the images to the "
      + "numbers.</p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // Number cue with varied images
  , 11: {
      className: "NumberPad" 
    , cue_range: { start: 10, end: 19 }
    , header: "Enter the number that you associate with the word "
      + "you hear"
    , text: "<p</p>"
    , firstTime: 300000
    , targetTime:150000
    }
    // Number cue with varied images (colour all consonants in words)
  , 12: {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , firstTime: 300000
    , targetTime:150000
    }//     //...

//   //// 
//   , 13: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     , firstTime: 150000
//     , targetTime: 75000
//   }
//   //// 
//   , 14: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     , firstTime: 150000
//     , targetTime: 75000
//   }


//     //...

//   //// 
//   , 19: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     , firstTime: 150000
//     , targetTime: 75000
//   }


//     //...

//   //// 
//   , 24: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     , firstTime: 150000
//     , targetTime: 75000
//   }


//     //...

//   //// 
//   , 29: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     , firstTime: 150000
//     , targetTime: 75000
//   }


//     //...

//   //// 
//   , 34: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     , firstTime: 150000
//     , targetTime: 75000
//   }


//     //...

//   //// 
//   , 39: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     , firstTime: 150000
//     , targetTime: 75000
//   }

//   //// 
//   , 40: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     , firstTime: 150000
//     , targetTime: 75000
//   }

// //////
  }
})(window.monika)