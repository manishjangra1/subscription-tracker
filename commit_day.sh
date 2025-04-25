#!/bin/bash
# commit_day.sh <date> <message>
# Example: ./commit_day.sh "2025-04-25 18:30:00" "feat: setup logging"

COMMIT_DATE=$1
MESSAGE=$2

export GIT_AUTHOR_DATE="$COMMIT_DATE"
export GIT_COMMITTER_DATE="$COMMIT_DATE"

git add .
git commit -m "$MESSAGE"
