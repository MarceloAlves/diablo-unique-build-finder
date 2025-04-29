set -a && source .env && set +a

curl "$PLANNER_URL" -o ./src/assets/data.json
curl "$UNIQUES_URL" -o ./src/assets/uniques.json
