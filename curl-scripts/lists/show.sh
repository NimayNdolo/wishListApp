API="https://evening-fortress-68266.herokuapp.com"
URL_PATH="/lists"

curl "${API}${URL_PATH}/${ID}" \
--include \
--request GET \
--header "Authorization: Bearer ${TOKEN}"

echo
