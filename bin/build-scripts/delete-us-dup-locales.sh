#!/usr/bin/env bash

set -e

locales=addon/webextension/_locales
us_locale=addon/webextension/_locales/en_US/messages.json
us_locale_content="$(cat $us_locale)"

for other_locale in $locales/*/messages.json ; do
  if [[ "$other_locale" = "$us_locale" ]] ; then
    continue
  fi
  other_locale_content="$(cat $other_locale)"
  if [[ "$other_locale_content" = "$us_locale_content" ]] ; then
    echo "Deleting duplicate locale $other_locale"
    rm $other_locale
  fi
done
