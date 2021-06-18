curl "http://localhost:4741/comment/:id" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "comment": {
      "content": "'"${CONTENT}"'",
      "id": "'"${ID}"'"
    }
  }'


echo
