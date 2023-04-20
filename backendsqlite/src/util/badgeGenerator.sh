#!/bin/bash

# argument $1 is test_unit | test_e2e | lint

# number of errors
NBERR=$(tail $1_report.txt -n 2 | grep -oE "[0-9]+ (errors|failed)" | cut -f1 -d' ')
if [ -z "$NBERR" ]
then
  NBERR=0
fi

# number of warnings
NBWARN=$(tail $1_report.txt -n 2 | grep -oE "[0-9]+ warnings" | cut -f1 -d' ')
if [ -z "$NBWARN" ]
then
  NBWARN=0
fi

# sets bagde color and result string
color="green"
badgeResult="OK"
if (( $NBERR > 0 ))
then 
  color="red"
  badgeResult="$NBERR errors"
  else if (( $NBWARN > 0 ))
  then 
    color="orange"
    badgeResult="$NBWARN warnings"
  fi
fi

# generate badge
anybadge -o -l "$1" -v "$badgeResult" -c "$color" -f "$1.svg"