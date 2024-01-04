#!/bin/bash

BASE=http://learnwebgl.brown37.net/lib
models=('models/RobotBase.obj' 'models/Forearm.obj' 'models/Upperarm.obj')
shaders=('shaders/shader05.vert' 'shaders/shader05.frag')
jsfiles=('learn_webgl_02.js' 'learn_webgl_console_messages.js' 'learn_webgl_point4.js' 'learn_webgl_vector3.js' 'learn_webgl_matrix.js' 'learn_webgl_obj_to_arrays.js' 'learn_webgl_model_render_05.js')

getModels() {
    for model in ${models[@]}; do
        wget -nc --directory-prefix=models $BASE/$model
    done
}

getShaders() {
    for shader in ${shaders[@]}; do
        wget -nc --directory-prefix=shaders $BASE/$shader
    done
}

getJsFiles() {
    for js in ${jsfiles[@]}; do
        wget -nc --directory-prefix=transform_code $BASE/$js
    done
}

help(){
    printf "Download files from website learnwebgl.brown37.net \n"
    printf "Command: ./downloader.sh <option> \n"
    printf "Options: \n"
    printf "%-9s  %s \n" "--models" "Download models"
    printf "%-9s  %s \n" "--shaders" "Download shaders"
    printf "%-9s  %s \n" "--jsFiles" "Download JsFiles"
}

while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do
    case $1 in
    --models)
        getModels
        exit
        ;;
    --shaders)
        getShaders
        exit
        ;;
    --jsFiles)
        getJsFiles
        exit
        ;;
    esac
    shift
done
if [[ "$1" == '--' ]]; then shift; fi

help