#!/bin/bash

set -ue

function dcs() {
    docker-compose -p lbdemo -f ./docker-compose-prebuilt.yml $@
}


WORK_DIR=$(echo $(cd -P -- "$(dirname -- "$0")" && pwd -P))

(test -d $WORK_DIR/env || virtualenv $WORK_DIR/env )
set +u
. $WORK_DIR/env/bin/activate
set -u
pip install -r $WORK_DIR/../docker/requirements.txt

(
    docker --version && docker ps >/dev/null && docker-compose --version
) || (
    echo "Depended executable not found. Check the message above" && exit 1
) &&


echo '
|=================================================================|
|open in browser "http://localhost:80" after server will be ready |
|                                                                 |
|       if you can not log in you probably need to run            |
|       "./docker-local-create-user.sh"                           |
|=================================================================|
'

cd $WORK_DIR/../docker
dcs kill
#dcs rm -fv
dcs pull
dcs up --timeout 600
