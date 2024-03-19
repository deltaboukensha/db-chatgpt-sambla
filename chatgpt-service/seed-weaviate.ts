import weaviate, { WeaviateClient, ObjectsBatcher, ApiKey } from 'weaviate-ts-client';
import dotenv from 'dotenv'

dotenv.config();

const client: WeaviateClient = weaviate.client({
  scheme: 'http',
  host: 'weaviate:8080',  // Replace with your endpoint
  // apiKey: new ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace w/ your Weaviate instance API key
  headers: { 'X-OpenAI-Api-Key': process.env.CHATGPT_API_KEY as string },  // Replace with your inference API key
});

const classObj = {
  'class': 'Question',
  'vectorizer': 'text2vec-openai',  // If set to "none" you must always provide vectors yourself. Could be any other "text2vec-*" also.
  'moduleConfig': {
    'text2vec-openai': {},
    'generative-openai': {}  // Ensure the `generative-openai` module is used for generative queries
  },
};

async function addSchema() {
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}

const data = [
  {
    Category: "SCIENCE",
    Question:
      "This organ removes excess glucose from the blood & stores it as glycogen",
    Answer: "Liver",
  },
  {
    Category: "ANIMALS",
    Question: "It's the only living mammal in the order Proboseidea",
    Answer: "Elephant",
  },
  {
    Category: "ANIMALS",
    Question:
      "The gavial looks very much like a crocodile except for this bodily feature",
    Answer: "the nose or snout",
  },
  {
    Category: "ANIMALS",
    Question:
      "Weighing around a ton, the eland is the largest species of this animal in Africa",
    Answer: "Antelope",
  },
  {
    Category: "ANIMALS",
    Question:
      "Heaviest of all poisonous snakes is this North American rattlesnake",
    Answer: "the diamondback rattler",
  },
  {
    Category: "SCIENCE",
    Question:
      "2000 news: the Gunnison sage grouse isn't just another northern sage grouse, but a new one of this classification",
    Answer: "species",
  },
  {
    Category: "SCIENCE",
    Question:
      "A metal that is ductile can be pulled into this while cold & under pressure",
    Answer: "wire",
  },
  {
    Category: "SCIENCE",
    Question:
      "In 1953 Watson & Crick built a model of the molecular structure of this, the gene-carrying substance",
    Answer: "DNA",
  },
  {
    Category: "SCIENCE",
    Question:
      "Changes in the tropospheric layer of this are what gives us weather",
    Answer: "the atmosphere",
  },
  {
    Category: "SCIENCE",
    Question:
      "In 70-degree air, a plane traveling at about 1,130 feet per second breaks it",
    Answer: "Sound barrier",
  },
];

async function importQuestions() {
  // Prepare a batcher
  let batcher: ObjectsBatcher = client.batch.objectsBatcher();
  let counter = 0;
  const batchSize = 100;

  for (const question of data) {
    // Construct an object with a class and properties 'answer' and 'question'
    const obj = {
      class: 'Question',
      properties: {
        answer: question.Answer,
        question: question.Question,
        category: question.Category,
      },
    };

    // add the object to the batch queue
    batcher = batcher.withObject(obj);

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (counter++ == batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
}

async function nearTextQuery() {
  const res = await client.graphql
    .get()
    .withClassName('Question')
    .withFields('question answer category _additional {certainty distance}')
    .withNearText({concepts: ['genetics']})
    .withLimit(2)
    .do();

  console.log(JSON.stringify(res, null, 2));
  return res;
}



(async () => {
  // await addSchema();
  // await importQuestions();
  await nearTextQuery();
})();

