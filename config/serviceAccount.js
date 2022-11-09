export const serviceAccount = {
  "type": "service_account",
  "project_id": "match-card-dcd2e",
  "private_key_id": process.env.PK_ID,
  "private_key": "-----BEGIN PRIVATE KEY-----\n"+process.env.PK.replace(/\\n/g, '\n')+"\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-k6k6x@match-card-dcd2e.iam.gserviceaccount.com",
  "client_id": process.env.CI,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k6k6x%40match-card-dcd2e.iam.gserviceaccount.com"
}