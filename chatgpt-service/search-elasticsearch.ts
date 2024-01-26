const search = async () => {
  const apiBaseUrl = 'http://elasticsearch-service:9200';
  const response = await fetch(`${apiBaseUrl}/myindex/_search`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {
        match: {
          content: 'what is life?',
        },
      },
    }),
  });
  
  const data = await response.json();
  console.log(JSON.stringify(data))

}

search();