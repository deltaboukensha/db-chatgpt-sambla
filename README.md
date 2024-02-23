# db-chatgpt-sambla

curl -X POST -H 'Content-Type: application/json' -d '{"message":"how do i connect to mongo database?"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"how do i connect to mysql?"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"What is crm-frontend?"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"What is Sambla"}' http://localhost:9999/chat

curl -X POST -H 'Content-Type: application/json' -d '{"message":"connect to mongo database"}' http://localhost:9999/chat

curl -X POST -H "Accept:application/json, text/plain, */*" -H "Content-Type:undefined" --data '{"headers":{"Content-Type":"application/json"},"body":"{\"message\":\"How can I connect to staging database?\"}"}' "http://localhost:9999/chat"

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




# SLACK BOT

socket-mode must be enabled for local development
https://app.slack.com/app-settings/T02JKUBSR/A06FVDG1H6Y/socket-mode

event-subscriptions must be configured
https://api.slack.com/apps/A06FVDG1H6Y/event-subscriptions?

app-level tokens must be setup
https://api.slack.com/apps/A06FVDG1H6Y/general
