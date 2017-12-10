;(function levelOptions(monika){

  if (!monika) {
    monika = window.monika = {}
  }

  levelOptions = monika.levelOptions = {

//// Digits and their names
    1: {
      className: "Intro"
    }
  //// Even digits and their key consonants
  , 2: {
      className: "EvenConsonants"
    }
    // Odd digits and their key consonants
  , 3: {
      className: "OddConsonants"
    }
    // All digits and their key consonants
  , 4: {
      className: "KeyConsonants"
    }
    // All digits and all their consonants
  , 5: {
      className: "MultiConsonants"
    }
    // All digits and all their consonants
  , 6: {
      className: "SoloConsonants"
    }
  //// Words for digits
  , 7: {
      className: "Words"
    , name: "0-9"
    , range: { start: 0, end: 9 }
    }


//   //// Consonant cue
//   , 8: {
//       layout: "consonant_cue"
//     , numbers: 9
//     , order: "random"
//     , media: "simple"
//     }
//   //// Image cue
//   , 9: {
//       layout: "image_cue"
//     , numbers: 9
//     , order: "random"
//     , media: "simple"
//     }
//   //// Image cue
//   , 9: {
//       layout: "image_cue"
//     , numbers: 9
//     , order: "random"
//     , media: "simple"
//     }
//     // Image cue with varied images
//   , 10: {
//       layout: "image_cue"
//     , numbers: 9
//     , order: "random"
//     , media: ["images"]
//     }
//   //// Number cue with varied images
//   , 11: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: 9
//     , order: "random"
//     , media: ["images"]
//     , options: { colour: "pause" }
//     }
//     // Number cue with varied images (colour all consonants in words)
//   , 12: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }

//     //...

//   //// 
//   , 13: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }
//   //// 
//   , 14: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }

//     //...

//   //// 
//   , 19: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }

//     //...

//   //// 
//   , 24: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }

//     //...

//   //// 
//   , 29: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }

//     //...

//   //// 
//   , 34: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }

//     //...

//   //// 
//   , 39: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }
//   //// 
//   , 40: {
//       layout: "number_cue" // may be same as consonant cue
//     , numbers: { start: 10, end: 19 }
//     , order: "exact"
//     , media: "simple"
//     }
// //////
  }
})(window.monika)