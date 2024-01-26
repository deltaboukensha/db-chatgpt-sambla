import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

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
  console.log(req.body)

  const { message } = req.body;
  console.log(JSON.stringify({ message }))

  if(!message){
    res.status(400).json({
      error: 'missing argument'
    })
    return;
  }

  const content = `${message}`;

  console.log(JSON.stringify({ content }))

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
