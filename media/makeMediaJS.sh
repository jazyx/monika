
#!/usr/bin/env bash

######################################################################
#
##
#
# !!! CAUTION !!!
# THIS SCRIPT WILL BREAK IF THERE ARE SPACES IN ANY AUDIO OR IMAGE
# FILE NAME (INCLUDING IN THE PATH LEADING TO THE ROOT FOLDER) !!!
#
######################################################################

source="$(dirname $(readlink -f $0))"
media_file=$source/media.js

echo $source

interface_folder=interface
lang_code=ru
number_folder=numbers
consonant_folder=consonants
audio_folder=audio
image_folder=images
ignore="delete_me*"

directory=$lang_code/$number_folder
root_folder=media

######################################################################

checkIfUninhabited () {
  local _dir=$1
  local _temp="$(find $_dir -type f ! -regex '.*\(name.txt\|delete_me.*\)')"

  if [ -z "$_temp" ]
  then
   return 1
  fi
}

getMatchingFiles() {
  ### BREAKS FILE NAMES ON SPACES, SO INCLUDE NO SPACES, ANYWHERE ###
  local -a file_array=()
  local directory=$1
  shift 1
  local -a _types_=("$@")
  local filter

  if (( ${#_types_[@]} != 0 )); then
    filter="-name *.${_types_[0]}"
    unset _types_[0]
  fi
  for t in "${_types_[@]}"; do
    filter="$filter -o -name *.$t"
  done

  file_array=( $( find "$directory" -type f \( $filter \) ) )

  echo "${file_array[@]}"
}


trimToBasename() {
  local _strip_extension=$1
  shift 
  local _filenames=("$@")
  local -a _trimmed=()
  local _filename

  for _filename in "${_filenames[@]}"
  do
    _filename=${_filename##*/}

    if [ $_strip_extension = 1 ]; then
      _filename=${_filename%%.*}
    fi

    _trimmed+=($_filename)
  done

  echo "${_trimmed[@]}"
}

indexOf () {
  local match="$1"
  local end=$#
  shift

  for ((ii=1 ; ii < end; ii++ ))
  do
    if [[ "${!ii}" == "$match" ]]; then
      let ii--
      echo $ii
      return
    fi
  done

  echo -1
}

removeUnwanted() {
  local _regex=$1
  shift
  local _filenames=("$@")
  local -i ii=${#_filenames[@]}
  local _filename

  for (( ; ii-- ; ))
  do
    _filename=${_filenames[$ii]}

    if [[ "$_filename" =~ $_regex ]]; then
      unset _filenames[$ii]
    fi
  done

  echo "${_filenames[@]}"
}

removeDuplicates() {
  local _filenames=("$@")
  local -i ii=${#_filenames[@]}
  local _filename

  for (( ; ii-- ; ))
  do
    _filename=${_filenames[$ii]}

    _index=$(indexOf "$_filename" "${_filenames[@]}")

    if [[ $_index != $ii ]]; then 
      unset _filenames[$ii]
    fi
  done

  echo "${_filenames[@]}"
}

createJSArray () {
  local _input=("$@")
  # local output=$(IFS='/' eval 'echo "${_input[*]}"')
  output="$(echo $_input | sed -e 's_ _\"\n, \"_g')"

  if [ -z "$output" ]; then
    output="[]"
  else
    output="["$'\n  '\"$output\"$'\n]'
  fi

  echo "$output"
}

get_audio_array() {
  local _dir=$1
  local -a _file_types=( ogg mp3 )
  local -a _files=$(getMatchingFiles $_dir ${_file_types[@]})
  local _unwanted="^(delete_me|deleteme)$"
  local _js_array

  _files=$(trimToBasename 1 $_files)
  _files=$(removeUnwanted $_unwanted $_files)
  _files=$(removeDuplicates $_files)
  
  _js_array=$(createJSArray "${_files[@]}")

  echo "$_js_array"
}

get_images_array() {
  local _dir=$1
  local -a _file_types=( jpg png )
  local -a _files=$(getMatchingFiles $_dir ${_file_types[@]})
  local _unwanted="^(delete_me.*)$"
  local _js_array

  _files=$(trimToBasename 0 $_files)
  _files=$(removeUnwanted $_unwanted $_files)
  
  _js_array=$(createJSArray "${_files[@]}")

  echo "$_js_array"
}

add_audio_array() {
  local _dir=$1audio
  local _audio_array=$(get_audio_array $_dir)

  echo "      , audio: $_audio_array" >> $media_file
}


addWords() {
  local _dir=$1words
  local _index=0
  local _word_dir _word _default _file_array 

  echo "      , words: {" >> $media_file

  for _word_dir in "$_dir"/*
  do
    checkIfUninhabited "$_word_dir"
    if [[ $? = 0 ]]; then
      _word=$(basename "$_word_dir")

      # Set $default to the first word, or to the last word whose
      # folder has a file called `default` at the root.
      [ -z $(find "$_dir/$_word" -maxdepth 1 -type f -name 'default') ] && exists=0 || exists=1
      [ -z $_default ] && empty=1 || empty=0

      if [ $exists = 1 -o $empty = 1 ]; then
        _default=$_word
      fi

      if [[ $_index == 0 ]]; then
        echo "          $_word: {" >> $media_file
        _index=1
      else
        echo "        , $_word: {" >> $media_file
      fi

      _file_array=$(get_audio_array $_word_dir/audio)
      echo "            audio: $_file_array"  >> $media_file
      _file_array=$(get_images_array $_word_dir/images)
      echo "          , images: $_file_array"  >> $media_file

      echo "          }" >> $media_file 
    fi
  done

  echo "        , default_word: \"$_default\"" >> $media_file 

  # local _dir=$1audio
  # local -a _file_types=( ogg mp3 )
  # local -a _files=$(getMatchingFiles $_dir ${_file_types[@]})
  # local _unwanted="^(delete_me|deleteme)$"
  # local _js_array

  # _files=$(trimToBasename 1 $_files)
  # _files=$(removeUnwanted $_unwanted $_files)
  # _files=$(removeDuplicates $_files)
  
  # _js_array=$(createJSArray "${_files[@]}")

  # echo "      , audio: $_js_array" >> $media_file
    echo "        }" >> $media_file
}
    
#     getDirectoriesArray words_array "$dir/words/"
#     

#     cat << EOF >> $media_file
#         path: "$root_folder/$directory/$dir"
#       , name: "$name"
#       , words: $words_array
# EOF
######################################################################

cat << EOF > $media_file
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
EOF


cd $directory

index=0
for dir in */
do
  checkIfUninhabited $source/$directory/$dir

  if [ $? = 0 ]
  then

    if [ $index == 0 ]
    then
      echo -n "      $dir" | sed 's/.$//' >> $media_file
      index=1
    else
      echo -n "    , $dir" | sed 's/.$//' >> $media_file
    fi

    echo ": {" >> $media_file

    name=$(<$source/$directory/$dir/name.txt)
    cat << EOF >> $media_file
        path: "$root_folder/$directory/$dir"
      , name: "$name"
EOF

    add_audio_array $source/$directory/$dir
    addWords $source/$directory/$dir

    echo "      }" >> $media_file
  fi
done

  #    path:   <path to media folder>
  #  , name:  "ноль"
  # // , audio:  [<name of recording of number>, ...]
  # // , word:  "иней"
  # // , words: { 
  # //     "иней": {
  # //       images: [<path to image>, ..., <default>, ...]
  # //     , audio: [<path to audio>, ..., <default>, ...]
  # //     }
  # //   }
  # // }

cat << EOF >> $media_file
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
EOF