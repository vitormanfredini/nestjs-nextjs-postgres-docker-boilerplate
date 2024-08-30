import { EmailPayloadNewUser } from "../email.types";

export default (props: EmailPayloadNewUser) => {

  const { data } = props;

  return `
  <html>
  <body>
    <h1>${data.name}</h1>
    <p>NEW USER</p>
  </body>
  </html>
  `;
};