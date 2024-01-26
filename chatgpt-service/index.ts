import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const search = async (content: string) => {
  const apiBaseUrl = 'http://elasticsearch-service:9200';
  const response = await fetch(`${apiBaseUrl}/myindex/_search`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {
        match: {
          content,
        },
      },
    }),
  });
  
  const searchData: any = await response.json();
  console.log(JSON.stringify({ searchData }))

  return searchData?.hits?.hits;
}

const apiKey = process.env.API_KEY;
const apiUrl = `https://api.openai.com/v1/chat/completions`;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log(JSON.stringify({ message }))

  if(!message){
    res.status(400).json({
      error: 'missing argument'
    })
    return;
  }

  const hits = await search(message);
  const topHit = hits?.[0];

  const searchResult = topHit 
    ? `
the search result source url:
${topHit._source.url}

the search result content:
${topHit._source.content}
`
    : `No search results found`;

  console.log(JSON.stringify({ searchResult }))

  const content = `
Answer the following message:
${message}

Using an answer based on the following search results:
${searchResult}
`;

  console.log("CONTENT");
  console.log(content)

  const data = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
    temperature: 0.7,
  });
  
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: data,
  });
  
  const responseData = await response.json();
  res.json(responseData);
});

const app = express();
const port = 9999;

app.use(express.json())
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`http://localhost:9999`)
});
