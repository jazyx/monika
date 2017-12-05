#!/usr/bin/env bash

# Syntax: ./createMediaHierarchy.sh langCode
# 
# Where: langCode        can be a 2-character string like
#                        en, th, ru
# 
# Example: ./createMediaHierarchy.sh ru бвгджзклмнпрстфхцчшщ
# 
# Action: Creates a directory with the following structure:
# 
# 

echo $0 $1

## << HARDCODED
read -d '' map << EOF
0н
1рц
2дт
3кгх
4чж
5пб
6шщл
7сз
8вф
9м
EOF

audio="mp3 ogg"
delete_me=delete_me

is_a_number='^[0-9]+$'
## HARD-CODED

langCode=$1

if [ -z $langCode ]
then
  langCode=xx
fi


# echo $0 $langCode "$map"


# COSMETICS used to colour output in terminal
red='\033[1;31m'
green='\033[1;32m'
yellow='\033[1;33m'
blue='\033[1;34m'
purple='\033[1;35m'
cyan='\033[1;36m'
white='\033[1;37m'

warn='\033[0;91m'
tell='\033[0;94m'
note='\033[0;93m'
grey='\033[0;97m'

default=$green
plain='\033[0m'


declare -A digit_map

getNumberName() {
  local  __output=$1
  local  output=""

  input=$2

  case $input in
    00)
       output="ноль ноль"
       ;;
    01)
       output="ноль один"
       ;;
    02)
       output="ноль два"
       ;;
    03)
       output="ноль три"
       ;;
    04)
       output="ноль четыре"
       ;;
    05)
       output="ноль пять"
       ;;
    06)
       output="ноль шесть"
       ;;
    07)
       output="ноль семь"
       ;;
    08)
       output="ноль восемь"
       ;;
    09)
       output="ноль девять"
       ;;
    0)
       output="ноль|нуль"
       ;;
    1)
       output="один|одна|одно|одни"
       ;;
    2)
       output="два|две"
       ;;
    3)
       output="три"
       ;;
    4)
       output="четыре"
       ;;
    5)
       output="пять"
       ;;
    6)
       output="шесть"
       ;;
    7)
       output="семь"
       ;;
    8)
       output="восемь"
       ;;
    9)
       output="девять"
       ;;
    10)
       output="десять"
       ;;
    11)
       output="одиннадцать"
       ;;
    12)
       output="двенадцать"
       ;;
    13)
       output="тринадцать"
       ;;
    14)
       output="четырнадцать"
       ;;
    15)
       output="пятнадцать"
       ;;
    16)
       output="шестнадцать"
       ;;
    17)
       output="семнадцать"
       ;;
    18)
       output="восемнадцать"
       ;;
    19)
       output="девятнадцать"
       ;;
    20)
       output="двадцать"
       ;;
    21)
       output="двадцать один|двадцать одна|двадцать одно"
       ;;
    22)
       output="двадцать два|двадцать две"
       ;;
    23)
       output="двадцать три"
       ;;
    24)
       output="двадцать четыре"
       ;;
    25)
       output="двадцать пять"
       ;;
    26)
       output="двадцать шесть"
       ;;
    27)
       output="двадцать семь"
       ;;
    28)
       output="двадцать восемь"
       ;;
    29)
       output="двадцать девять"
       ;;
    30)
       output="тридцать"
       ;;
    31)
       output="тридцать один|тридцать одна|тридцать одно"
       ;;
    32)
       output="тридцать два|тридцать две"
       ;;
    33)
       output="тридцать три"
       ;;
    34)
       output="тридцать четыре"
       ;;
    35)
       output="тридцать пять"
       ;;
    36)
       output="тридцать шесть"
       ;;
    37)
       output="тридцать семь"
       ;;
    38)
       output="тридцать восемь"
       ;;
    39)
       output="тридцать девять"
       ;;
    40)
       output="сорок"
       ;;
    41)
       output="сорок один|сорок одна|сорок одно"
       ;;
    42)
       output="сорок два|сорок две"
       ;;
    43)
       output="сорок три"
       ;;
    44)
       output="сорок четыре"
       ;;
    45)
       output="сорок пять"
       ;;
    46)
       output="сорок шесть"
       ;;
    47)
       output="сорок семь"
       ;;
    48)
       output="сорок восемь"
       ;;
    49)
       output="сорок девять"
       ;;
    50)
       output="пятьдесят"
       ;;
    51)
       output="пятьдесят один|пятьдесят одна|пятьдесят одно"
       ;;
    52)
       output="пятьдесят два|пятьдесят две"
       ;;
    53)
       output="пятьдесят три"
       ;;
    54)
       output="пятьдесят четыре"
       ;;
    55)
       output="пятьдесят пять"
       ;;
    56)
       output="пятьдесят шесть"
       ;;
    57)
       output="пятьдесят семь"
       ;;
    58)
       output="пятьдесят восемь"
       ;;
    59)
       output="пятьдесят девять"
       ;;
    60)
       output="шестьдесят"
       ;;
    61)
       output="шестьдесят один|шестьдесят одна|шестьдесят одно"
       ;;
    62)
       output="шестьдесят два|шестьдесят две"
       ;;
    63)
       output="шестьдесят три"
       ;;
    64)
       output="шестьдесят четыре"
       ;;
    65)
       output="шестьдесят пять"
       ;;
    66)
       output="шестьдесят шесть"
       ;;
    67)
       output="шестьдесят семь"
       ;;
    68)
       output="шестьдесят восемь"
       ;;
    69)
       output="шестьдесят девять"
       ;;
    70)
       output="семьдесят"
       ;;
    71)
       output="семьдесят один|семьдесят одна|семьдесят одно"
       ;;
    72)
       output="семьдесят два|семьдесят две"
       ;;
    73)
       output="семьдесят три"
       ;;
    74)
       output="семьдесят четыре"
       ;;
    75)
       output="семьдесят пять"
       ;;
    76)
       output="семьдесят шесть"
       ;;
    77)
       output="семьдесят семь"
       ;;
    78)
       output="семьдесят восемь"
       ;;
    79)
       output="семьдесят девять"
       ;;
    80)
       output="восемьдесят"
       ;;
    81)
       output="восемьдесят один|восемьдесят одна|восемьдесят одно"
       ;;
    82)
       output="восемьдесят два|восемьдесят две"
       ;;
    83)
       output="восемьдесят три"
       ;;
    84)
       output="восемьдесят четыре"
       ;;
    85)
       output="восемьдесят пять"
       ;;
    86)
       output="восемьдесят шесть"
       ;;
    87)
       output="восемьдесят семь"
       ;;
    88)
       output="восемьдесят восемь"
       ;;
    89)
       output="восемьдесят девять"
       ;;
    90)
       output="девяносто"
       ;;
    91)
       output="девяносто один|девяносто одна|девяносто одно"
       ;;
    92)
       output="девяносто два|девяносто две"
       ;;
    93)
       output="девяносто три"
       ;;
    94)
       output="девяносто четыре"
       ;;
    95)
       output="девяносто пять"
       ;;
    96)
       output="девяносто шесть"
       ;;
    97)
       output="девяносто семь"
       ;;
    98)
       output="девяносто восемь"
       ;;
    99)
       output="девяносто девять"
  esac


  eval $__output="'$output'"
}



do_or_die() {
  # $1       = result of previous call
  # $2       = source of error, if there was one
  # $3       = next function to call
  # $4 .. $n = arguments for next function to call
  
  # echo "Arguments for do_or_die:"
  # for argument in "${@:1}"
  # do
  #   echo $argument
  # done
  # echo "********"
  
  result=$1
  cause=$2
  next=${@:3}

  if [ $result != 0 ]
  then
    echo -e "${yellow}Warning ${note}in $0:${plain}"
    echo -e "${note}Error detected in $cause: $result."
    echo -e "${note}Creation of media hierarchy for $langCode cancelled.${plain}"
   return 1

  else
    $next
    return=$?
    #echo "$1 returned $return"
    return $return
  fi
}



create_dir() {
  # $1       = directory path
  # $2       = next action
  # $3 .. $n = arguments for next action

  if ! [ -d $1 ]
  then
    echo -e "${tell}Creating directory $1${plain}"
    mkdir -p $1
  fi

  do_or_die $? "create_dir $1" ${@:2}
}



createReadMe() {
  cd $langCode
  cat << EOF > ReadMe.md
# Media hierarchy for $langCode

This directory contains two folders:

* numbers
* consonants

### Consonants

The consonants folder contains a sub-folder for each consonant defined
in the \$map variable. Each sub-folder should contain at least one
MP3 file and at least one OGG file. These should be recordings of the
pronunciation of the consonant.

If there are more recordings (and the more variety the better), then
one pair should be called "default". The names of the others is
important.

### Numbers

The numbers folder will contain one folder for each of the numbers
0 - 99, plus ten more with the names "00" - "09".  Each folder will
contain a file called "name.txt" which contains the name of the
relevant number.

Each of the number folders will contain the following sub-folders:

* audio
* &lt;word&gt;
* ...

The audio folder should contain both MP3 and OGG recordings of the
name of the number. There can be multiple recordings. As with the
audio folder for consonants, the most representative one should be
called "default".

There will be a folder named with consonants that represent the
number. This should be renamed to a word which uses the consonant(s)
to represent the number. Multiple such word folders can be created.

Each &lt;word&gt; folder should contain:

* An audio folder, with the some contents as mentioned above
* An images folder

The images folder should contain images with SVG, PNG or JPG
extensions. These images should be in the public domain or be 
distributed with a Creative Commons or similar licence, for use and
modification in commercial projects. Each should be accompanied by a
text file with the extension ".cdt" with the following content format:
<pre>
title      &lt;name of image&gt;  
source     &lt;URL of (page for) original image&gt;  
author     &lt;name of creator&gt;  
authorURL  &lt;link to author profile page  
licence    &lt;type of licence&gt;  
licenceURL &lt;link to wording of licence&gt;  
</pre>

If there are multiple images, the most representative image should be
named "default".

----

**NOTE**: The folders have been auto-populated with files called
delete_me, to indicate what is expected in each folder. When you have
filled them with the files that should be there, you can run... 
<pre>find . -name "delete_me.*" -type f -delete</pre>
... or...
<pre>./delete_auto.sh</pre>
... to remove them all.
EOF

do_or_die $? createReadMe create_consonants_folder
}



create_consonants_folder() {
  create_dir consonants
  do_or_die $? create_consonants_folder create_consonant_folders
}



create_consonant_folders() {
  cd consonants
  for (( ii=0; ii<${#map}; ii++ )); do
    consonant="${map:$ii:1}"

    if [[ $consonant != $'\n' ]]
    then  

      case $consonant in
        [!0-9])
        create_dir $consonant
        if [ $? == 0 ]
        then
          touch $consonant/$delete_me.mp3
          touch $consonant/$delete_me.ogg
        fi
      esac
    fi
  done
  cd ..

  do_or_die $? create_consonant_folders create_numbers_folder
}



create_numbers_folder() {
  create_dir numbers
  do_or_die $? create_numbers_folder create_number_subfolders
}



create_number_subfolders() {
  cd numbers
  IFS=$'\n' read -rd '' -a number_array <<< "$map"

  for number_line in "${number_array[@]}"
  do
    number="${number_line:0:1}"
    digit_map[$number]="${number_line:1}"

    # echo $number "${digit_map[$number]}"

    create_dir $number add_consonant_folders $number "${number_line:1}"
    # rm $number/counter.png

    getNumberName name $number
    echo $name > $number/name.txt
  done

  do_or_die $? create_number_subfolders create_double_digit_folders
}



create_double_digit_folders() {
  for tens in `seq 0 9`;
  do
    tenkey=${digit_map[$tens]}

    for units in `seq 0 9`;
    do
      number=$tens$units
      key=_$tenkey
      key+=_${digit_map[$units]}
      key+=_

      create_dir $number add_consonant_folders $number $key

      getNumberName name $number
      echo $name > $number/name.txt
    done
  done

  echo "Media hiearchy has the expected structure"
  cd ..
  pwd
  # tree
}



add_consonant_folders() {
  cd $1

  create_dir audio
  touch audio/$delete_me.mp3
  touch audio/$delete_me.ogg
  
  create_dir words/$2

  create_dir words/$2/audio
  touch words/$2/audio/$delete_me.mp3
  touch words/$2/audio/$delete_me.ogg

  create_dir words/$2/images
  touch words/$2/images/$delete_me.png
  if ! [ -f words/$2/images/$delete_me.cdt ]
  then
    cat << EOF > words/$2/images/$delete_me.cdt
title      title  
source     URL_of_page_for_original_image 
author     author  
authorURL  URL_of_author_profile_page  
licence    type_of_licence  
licenceURL URL_for_licence 
EOF
  fi

  cd ..
}

create_dir $langCode createReadMe # and all the rest will follow