export interface Patient {
  resourceType: "Patient";
  id: string;
  name?: Array<{
    given?: string[];
    family?: string;
    use?: string;
  }>;
  gender?: string;
  birthDate?: string;
  address?: Array<{
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
    use?: string;
  }>;
}

export interface FHIRError {
  status: number;
  message: string;
}
