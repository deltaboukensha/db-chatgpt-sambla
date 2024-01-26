# db-chatgpt-sambla

curl -X POST -H 'Content-Type: application/json' -d '{"message":"how do i connect to mongo database?"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"how do i connect to mysql?"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"What is crm-frontend?"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"What is Sambla"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"connect to mongo database"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"How can i run tests using the useful shortcut commands?"}' http://localhost:9999/chat

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

https://www.elastic.co/videos/vector-similarity-search

https://platform.openai.com/docs/api-reference/embeddings/create
