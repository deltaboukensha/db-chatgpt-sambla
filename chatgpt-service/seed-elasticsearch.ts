
const seed = async () => {
  const apiBaseUrl = 'http://elasticsearch-service:9200';
  const response = await fetch(`${apiBaseUrl}/myindex/_doc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      url: 'http://localtest',
      content: 'What is the meaning of life? I think it should be something snacks and cookies',
    }),
  });
  
}

seed();

