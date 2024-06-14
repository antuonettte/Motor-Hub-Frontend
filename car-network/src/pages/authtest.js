import { Auth } from 'aws-amplify';

const callApi = async () => {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();

  console.log("jwt token", token)

//   const response = await fetch('https://your-api-endpoint', {
//     method: 'GET',
//     headers: {
//       Authorization: token
//     }
//   });

//   const data = await response.json();
//   console.log(data);
};

callApi();
