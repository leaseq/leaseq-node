// Type definitions for LeaseQ's public API
// Project: https://github.com/leaseq/api-docs
// Definitions by: Elijah Schow <https://github.com/elijah-schow>



//
// SDK
//
interface SDK {
    login: Login;
    submitApplication: SubmitApplication;
    getApplication: GetApplication;
    updateApplication: UpdateApplication;
    replaceApplication: ReplaceApplication;
    signApplication: SignApplication;
    getRates: GetRates;
    getQuotes: GetQuotes;
    uploadDocument: UploadDocument;
}

interface Config {
    auth_token?: string;
    /**
     * Specify a base URL for api requests. Normally you shouldn't need to
     * set this option unless you want to test against a specific
     * environment.
     */
    baseURL?: string;
}

//
// API
//

/**
 * Authenticate the user
 * 
 * POST /v1/login
 * https://github.com/leaseq/api-docs/blob/master/login/post.md
 */

interface Login {
    (credentials: LoginRequest): Promise<LoginResponse>;
}

interface LoginRequest {
    email: string;
    password: string;
    tenant_id?: string;
}

interface LoginResponse {
    auth_token: string;
    auth_scheme: 'LeaseQ';
    expires: string;
}

/**
 * Create a new credit application
 * 
 * POST /v1/applications
 * https://github.com/leaseq/api-docs/blob/master/applications/post.md
 */

interface SubmitApplication {
    (application: SubmitApplicationRequest): Promise<SubmitApplicationResponse>;
}

type SubmitApplicationRequest = Application;

interface SubmitApplicationResponse {
    app_id: UUID;
    status: ApplicationStatus;
    quotes?: Quote[];
}

/**
 * Get a credit application
 * 
 * GET /v1/applications/{application_id}
 * https://github.com/leaseq/api-docs/blob/master/applications/get.md
 */

interface GetApplication {
    (app_id: string): Promise<GetApplicationResponse>;
}

interface GetApplicationResponse {
    app_id: UUID;
    remote_id?: string;
    status: ApplicationStatus;
    lender?: string;
    total_amount?: number;
    updated_date?: string;
}

/**
 * Update part of an application
 * 
 * PATCH /v1/applications/{application_id}
 * https://github.com/leaseq/api-docs/blob/master/applications/put.md
 */

interface UpdateApplication {
    (app_id: string, application: UpdateApplicationRequest): Promise<UpdateApplicationResponse>;
}

type UpdateApplicationRequest = {
    status?: ApplicationStatus;
    lost_reason?: string;
    total_amount?: number;   
};

type UpdateApplicationResponse = {};

/**
 * Replace an application
 * 
 * PUT /v1/applications/{application_id}
 * https://github.com/leaseq/api-docs/blob/master/applications/put.md
 */

interface ReplaceApplication {
    (app_id: string, application: ReplaceApplicationRequest): Promise<ReplaceApplicationResponse>;
}

type ReplaceApplicationRequest = SubmitApplicationRequest;

type ReplaceApplicationResponse = {
    app_id: UUID;
    status: ApplicationStatus;   
};

/**
 * Electronically signs an application
 * 
 * POST /v1/applications/{application_id}/sign
 * https://github.com/leaseq/api-docs/blob/master/applications/sign.md
 */

interface SignApplication {
    (app_id: string, signature: SignApplicationRequest): Promise<SignApplicationResponse>;
}

interface SignApplicationRequest {
    selected_quote: string;
    selected_term: number;
    name: string;
    consent: string;
    title?: string;
}

interface SignApplicationResponse {
    signature: string;
    date: string;
}

/**
 * Get quotes for an application
 * 
 * GET /v1/applications/{application_id}/quotes
 * https://github.com/leaseq/api-docs/blob/master/applications/quotes/get.md
 */
interface GetQuotes {
    (app_id: string): Promise<GetQuotesResponse>;
}

interface GetQuotesResponse {
    quotes: Quote[];
}

/**
 * Upload document
 * 
 * POST /v1/applications/{application_id}/documents
 * https://github.com/leaseq/api-docs/blob/master/applications/documents/post.md
 */

interface UploadDocument {
    (app_id: string, document: UploadDocumentRequest): Promise<UploadDocumentResponse>;
}

interface UploadDocumentRequest {
    name: string;
    data: string;
    type?: "invoice" | "quote" | "contract";
}

interface UploadDocumentResponse {
    document_id: string;
}

/**
 * Get estimated financing rates
 * 
 * GET /v1/lenders/rates
 * https://github.com/leaseq/api-docs/blob/master/lenders/rates/get.md
 */

interface GetRates {
    (): Promise<GetRatesResponse>;
}

interface GetRatesResponse {
    credit_tiers: {
        credit_tier: 'A'
            | 'B'
            | 'C'
            | 'D';
        terms: {
            term_length: number;
            rates: {
                amount_min: number;
                amount_max: number;
                rate: number;
                factor: number;
            }[]
        }[];
    }[]
}

//
// Miscellaneous
//
interface Product {
    product_code?: string;
    name?: string;
    quantity?: number;
    price?: number;

    type?: EquipmentVerticals;
    description?: string;
    condition?: 'new' | 'used';

    vehicle_type?: VehicleType;
    vehicle_make?: string;
    vehicle_model?: string;
    vehicle_link?: string;
    vehicle_year?: number;
    vehicle_milage?: number;
}

interface Charge {
    charge: string;
    description?: string;
    price: number;
}

interface Company {
    name: string;
    dba?: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    ein: string;
    years_in_business: number;
    structure: CompanyStructure;
}

interface Guarantor {
    first_name: string,
    last_name: string,
    ssn: string;
    email?: string,
    phone?: string,
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    percentage_owned?: string;
    
    // truck fields
    years_at_current_address?: number;
    haul_source?: string;
    has_industry_experience?: boolean;
    years_of_experience?: number;
    experience_description?: string;
    has_cdl?: boolean;
    years_with_cdl?: number;
    has_other_vehicles?: boolean;
    number_of_vehicle?: number;
    number_of_trailers?: number;
    has_finanaced_before?: boolean;
}

interface Quote {
    quote_id: string;
    lender_name?: string;
    lender: {
        name: string;
        about: string;
        phone: string;
        logo: string;
    };
    finance_type?: string;
    details?: string;
    options: Option[];
}

interface Option {
    term: number;
    monthly_payment: number;
}

type Address = {
    address: string; // aka "street"
    city: string;
    state: string;
    country: string;
    zip: string; // aka "postalCode"
}

type UUID = string;

type ApplicationType = "business"
    | "consumer"
    | "corporate"
    | "nonprofit"
    | "municipal";

type ApplicationStatus = "New"
    | "WigLead"
    | "Lead"
    | "AppIn"
    | "AppSubmitted"
    | "Decline"
    | "Approved"
    | "DocsOut"
    | "DocsIn"
    | "PrefundingReleased"
    | "POIssued"
    | "Lost"
    | "Funded";

type EquipmentVerticals = "audio visual"
    | "automotive"
    | "controls"
    | "coffee"
    | "computer"
    | "construction"
    | "copier"
    | "dental"
    | "dry cleaning"
    | "fabrication"
    | "fitness"
    | "fitness-crossfit"
    | "fork lift"
    | "gaming"
    | "cannabis"
    | "hvac"
    | "ice"
    | "janitorial"
    | "led"
    | "laundry"
    | "machine tool"
    | "mailroom"
    | "medical"
    | "modular building"
    | "office"
    | "pos"
    | "printing"
    | "restaurant"
    | "solar"
    | "farm"
    | "truck"
    | "vending"
    | "veterinary"
    | "other";

type CompanyStructure = "sole_prop"
    | "llc"
    | "partnership"
    | "c_corp"
    | "s_corp";

type VehicleType = 'longhaul'
    | 'shorthaul'
    | 'utility'
    | 'glider'
    | 'livery';

type Application = {
    type: ApplicationType;
    status?: ApplicationStatus;
    total_amount?: number;
    remote_id?: string;
    
    company?: Company;
    products?: Product[];
    billing?: Charge[];
    quotes?: Quote[];

    /* WARNING: Do not put guarantors here. It will cause type errors that
    don't match the API docs. */
    
    // hvac fields
    owns_install_location?: boolean;

    // truck fields
    downpayment?: number;

} & ({
    is_full_application: true;
    guarantors?: Guarantor[];
} | {
    is_full_application?: false;
    guarantors: Array<Partial<Guarantor> & { email: string }>;
});