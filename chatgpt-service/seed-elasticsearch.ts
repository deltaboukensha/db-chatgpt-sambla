import axios from 'axios';

const seed = async () => {
  // const apiBaseUrl = 'http://elasticsearch-service:9200';
  // const response = await fetch(`${apiBaseUrl}/myindex/_doc`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     url: 'test seed 1',
  //     content: 'What is life? Cookies and cakes',
  //   }),
  // });

  // console.log(response.status)
  

  const apiBaseUrl = 'http://elasticsearch-service:9200';
  const response = await axios.post(`${apiBaseUrl}/myindex/_doc`, {
    url: 'dev-docker.wiki/Team-structure.md',
    content: 'The organisational team structure  of Sambla Group is reflected in the [GitHub Teams here](https://github.com/orgs/Advisa/teams). By default, new members only have access to public repositories.\n\nDevelopers typically belong to two teams; the overhauling [Dev team]',
  }, {
    headers: {
      "Content-Type": "application/json"
    },
  });

  console.log(response.status)
  
}

seed();

