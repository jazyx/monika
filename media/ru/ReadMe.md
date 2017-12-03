# Media hierarchy for xx

This directory contains two folders:

* numbers
* consonants

### Consonants

The consonants folder contains a sub-folder for each consonant defined
in the $map variable. Each sub-folder should contain at least one
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
