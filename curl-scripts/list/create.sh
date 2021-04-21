curl "http://localhost:4741/list" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "list": {
      "item": "'"${ITEM}"'",
    }
  }'


echo
