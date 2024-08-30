import { EmailPayloadDefault } from "../email.types";

export default (props: EmailPayloadDefault) => {

  const { data } = props;

  return `
  <html>
  <body>
    <h1>${data.name}</h1>
    <p>DEFAULT</p>
  </body>
  </html>
  `;
};