export const DOCUMENT_TYPES = {
  CONTRACTS_AND_AGREEMENTS: "contratos e aditivos",
  INVOICES: "notas fiscais",
  RECEIPTS: "recibos",
  PAYMENTS_PROOFS: "recibos de pagamento",
  COMERCIAL_PROPOSAL: "proposta comercial",
  MEETING_MINUTES_AND_REPORTS: "relatorios e atas",
  CONTROL_SPREADSHEETS: "planilha controle financeiro",
  TAX_DECLARATIONS: "declaracoes fiscais",
  ACCOUNTING_BALANCES: "balancetes e demonstrativos",
  PRINTED_TAX_BOOKS: "livros fiscais",
  TAX_PAYMENT_GUIDES: "guia recolhimento",
  POWERS_OF_ATTORNEY: "procuracoes",
  LEGAL_PETITIONS_AND_DOCUMENTS: "peticoes e pecas processuais",
  LEGAL_PROCESS_COPIES: "copias processos juridicos",
  CERTIFICATES: "certidoes",
  EMPLOYEE_REGISTRATION_FORMS: "fichas e dados funcionarios",
  TERMINATION_DOCUMENTS: "termos de recisao homologacoes",
  TIMESHEETS: "controle de jornada",
  MEDICAL_CERTIFICATES: "atestado medico e afastamento",
  EMPLOYMENT_CONTRACTS: "contratos trabalho",
  COMPANY_STATUTES_OR_SOCIAL_CONTRACTS: "estatuto ou contrato social",
  BRAND_AND_PATENT_REGISTRATIONS: "marcas e patentes",
  LICENSES_AND_CERTIFICATES: "licencas e certificados",
  PERSONAL_DOCUMENTS: "documentos pessoais",
  ADDRESS_PROOFS: "comprovantes de endereco",
  EXPERT_REPORTS_AND_EVIDENCE: "laudos e pericias ou evidencias documentais",
  COURT_DECISIONS_AND_RULINGS: "sentencas judiciais",
  OTHER: "outros",
} as const;

export type DocumentType = typeof DOCUMENT_TYPES[keyof typeof DOCUMENT_TYPES];
export const DOCUMENT_TYPES_ARRAY: readonly DocumentType[] = Object.values(DOCUMENT_TYPES);

