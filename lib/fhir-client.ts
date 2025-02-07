import FHIR from "fhirclient";
import Client from "fhirclient/lib/Client";

export const initializeFHIR = () => {
  return FHIR.oauth2.authorize({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    scope: "launch patient/*.read",
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    iss: process.env.NEXT_PUBLIC_FHIR_BASE_URL,
    completeInTarget: true,
  });
};

export const getFHIRClient = async (): Promise<Client> => {
  return await FHIR.oauth2.ready();
};

export const getPatient = async (client: Client) => {
  return await client.request(`Patient/${process.env.NEXT_PUBLIC_PATIENT_ID}`);
};
