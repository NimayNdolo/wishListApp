API="https://evening-fortress-68266.herokuapp.com"
URL_PATH="/examples"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
      "list": {
        "item": "'"${ITEM}"'"
      }
    }'

  echo
