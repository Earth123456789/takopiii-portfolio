export interface Certificate {
  image: string;
  title: string;
  issuer: string;
  featured?: boolean;
}

export interface CertificateModalState {
  isOpen: boolean;
  selectedCertificate: Certificate | null;
}
