# db-chatgpt-sambla

curl -X POST -H 'Content-Type: application/json' -d '{"message":"Sambla"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"What is Sambla"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"connect to mongo database"}' http://localhost:9999/chat

curl -X GET "localhost:9200/myindex/_mappings?pretty"

curl -X GET "localhost:9200/myindex/_count?pretty" -H 'Content-Type: application/json' -d'
{
  "query": {
    "exists": {
      "field": "content"
    }
  }
}
'

curl -X GET "localhost:9200/myindex/_count?pretty"

curl -X GET "localhost:9200/myindex/_field_caps?fields=url"
