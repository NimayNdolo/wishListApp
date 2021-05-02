#!/bin/sh

API="https://evening-fortress-68266.herokuapp.com"
URL_PATH="/examples"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
