curl "http://localhost:4741/list/:id" \
--include \
--request DELETE \
--header "Authorization: Bearer ${TOKEN}"

echo
