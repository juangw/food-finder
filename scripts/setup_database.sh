set -e

aws dynamodb --endpoint-url http://localhost:8000 delete-table --table-name users || true
aws dynamodb --endpoint-url http://localhost:8000 delete-table --table-name recipes || true

aws dynamodb --endpoint-url http://localhost:8000 create-table \
--table-name users \
--attribute-definitions \
  AttributeName=username,AttributeType=S \
  AttributeName=password,AttributeType=S \
--key-schema \
  AttributeName=username,KeyType=HASH \
  AttributeName=password,KeyType=RANGE \
--provisioned-throughput \
ReadCapacityUnits=5,WriteCapacityUnits=5

aws dynamodb --endpoint-url http://localhost:8000 create-table \
--table-name recipes \
--attribute-definitions \
  AttributeName=recipeId,AttributeType=S \
--key-schema \
  AttributeName=recipeId,KeyType=HASH \
--provisioned-throughput \
ReadCapacityUnits=5,WriteCapacityUnits=5

aws dynamodb put-item --endpoint-url http://localhost:8000 --table-name users \
  --item '{"username": {"S": "juangw"}, "password": {"S": "local"}}'