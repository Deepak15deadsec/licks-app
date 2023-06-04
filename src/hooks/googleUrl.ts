//@ts-ignore
import { GOOGLE_CLIENT_ID, GOOGLE_OAUTH_REDIRECT_URL } from '@env'
export const getUrl = (phone: string) => {
  console.log("phone",GOOGLE_CLIENT_ID)
  console.log("red",GOOGLE_OAUTH_REDIRECT_URL)
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const options = {
      redirect_uri: GOOGLE_OAUTH_REDIRECT_URL || '',
      client_id: GOOGLE_CLIENT_ID || '',
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      state: JSON.stringify({ "referrer": "", "phone": phone, "type":"addEmail"}),
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/gmail.settings.basic',
        'https://www.googleapis.com/auth/gmail.labels',
      ].join(" "),
    };
    let qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`
  }