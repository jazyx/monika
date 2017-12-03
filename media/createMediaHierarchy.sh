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
    mkdir $1
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
0 - 99, plus ten more with the names "00" - "09". In addition to what
is described below, the folders named "0" will contain a file named
"counter.png", showing between 0 and 9 circles.

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
    touch $number/counter.png
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
  
  create_dir $2

  create_dir $2/audio
  touch $2/audio/$delete_me.mp3
  touch $2/audio/$delete_me.ogg

  create_dir $2/images
  touch $2/images/$delete_me.png
  if ! [ -f $2/images/$delete_me.cdt ]
  then
    cat << EOF > $2/images/$delete_me.cdt
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