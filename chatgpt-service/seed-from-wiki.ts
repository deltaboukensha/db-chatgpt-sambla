import fs from "fs";
import axios from "axios";

(async () => {
  const list = await fs.promises.readdir("/home/delta/dev/dev-docker.wiki/")
  
  for(const file of list.filter(f => f.endsWith(".md"))){
    const data = await fs.promises.readFile("/home/delta/dev/dev-docker.wiki/" + file, { encoding: "utf-8" })
    const apiBaseUrl = 'http://localhost:9200';
    const response = await axios.post(`${apiBaseUrl}/myindex/_doc`, 
    {
      url: "dev-docker.wiki/" + file,
      content: data,
    }, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log(response.status)
  }
})();