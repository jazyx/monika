    #!/usr/bin/env bash

    # Sets first passed parameter to 1 if the directory in the second
    # parameter contains only placeholder files, or to 0 if the directory
    # contains something worth keeping
    checkForDeletion () {
      local _dir=$1
      local _temp=$(find "$_dir" -type f ! -regex '.*\(name.txt\|delete_me.*\)')

      if [ -z "$_temp" ]
      then
       return 1
      fi
    }

#I use it like this:

    parent=/home/blackslate/repos/russkiy.fun/Моника/web/media/ru/numbers/
    for dir in $parent*/
    do
      checkForDeletion $dir
      if [ $? = 1 ]
      then
        echo "DELETE? $dir" # rm -rf $dir
      fi
    done