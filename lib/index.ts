import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const http = axios;

type UUID = string;

const configuration: AxiosRequestConfig = {};

/**
 * Convert an authentication token into an Authorization header
 *
 * @param {string} auth_token an authentication token. If you don't have
 * one, get it from `login()`.
 * @param {string} [auth_scheme] an authentication scheme (e.g. 'LeaseQ').
 * 'LeaseQ' is the only supported scheme so far.  
 * @return {string} an authorization header (e.g. "Authorization LeaseQ
 * $Auth_Token")
 */
const toAuthorization = (auth_token?: string, auth_scheme = 'LeaseQ') =>
    auth_token ? [auth_scheme, auth_token].join(' ') : undefined

/**
 * Convert axios response to regular promises
 *
 * @param {AxiosResponse} response
 * @return {Promise} a promise that resolves to a plain response body
 * without extra axios properties
 */
const toPromise = async (response: AxiosResponse) => Promise.resolve(response.data);

/**
 * 
 * Applications capture information about the Borrower and the Equipment to be financed.
 * 
 */
export module Application {

    export function submit(application: submit.request): Promise<submit.response> {
        return http.post(`/applications`, application, configuration)
            .then(toPromise);
    }

    /**
     * Create a new credit application
     * 
     * POST /v1/applications
     * https://github.com/leaseq/api-docs/blob/master/applications/post.md
     */
    export module submit {
        export type request = Application;
        export type response = {
            app_id: UUID;
            status: Status;
            quotes?: Quote[];
        };
    }

    /**
     * Update part of an application
     * 
     * PATCH /v1/applications/{application_id}
     * https://github.com/leaseq/api-docs/blob/master/applications/put.md
     */
    export function update(app_id: UUID, application: update.request): Promise<update.response> {
        return  http.patch(`/applications/${encodeURIComponent(app_id)}`, application, configuration)
            .then(toPromise);    
    }

    export module update {
        export type request = {
            status?: Status;
            lost_reason?: string;
            total_amount?: number;   
        };
        export type response = {};
    }

    /**
     * Replace an application
     * 
     * PUT /v1/applications/{application_id}
     * https://github.com/leaseq/api-docs/blob/master/applications/put.md
     */
    export function replace(app_id: UUID, application: replace.request): Promise<replace.response> {
        return http.put(`/applications/${encodeURIComponent(app_id)}`, application, configuration)
            .then(toPromise)
    }
    
    export module replace {
        export type request = submit.request;
        export type response = {
            app_id: UUID;
            status: Application.Status;   
        };
    }

    /**
     * Get a credit application
     * 
     * GET /v1/applications/{application_id}
     * https://github.com/leaseq/api-docs/blob/master/applications/get.md
     */
    export function get(app_id: UUID): Promise<get.response> {
        return http.get(`/applications/${encodeURIComponent(app_id)}`, configuration)
            .then(toPromise);
    }

    export module get {
        export type response = {};
    }

    /**
     * Electronically signs an application
     * 
     * POST /v1/applications/{application_id}/sign
     * https://github.com/leaseq/api-docs/blob/master/applications/sign.md
     */
    export function sign(app_id: UUID, signature: sign.request): Promise<sign.response> {
        return http.post(`/applications/${encodeURIComponent(app_id)}/sign`, signature, configuration)
            .then(toPromise);
    }
    
    export module sign {
        export type request = {
            selected_quote: string;
            selected_term: number;
            name: string;
            consent: string;
            title?: string;
        };
        export type response = {
            signature: string;
            date: string;
        };
    }

    // TODO: request params for downpayment slider
    export function quotes(app_id: UUID): Promise<quotes.response> {
        return http.get(`/applications/${encodeURIComponent(app_id)}/quotes`, configuration)
            .then(toPromise);
    }

    /**
     * Get quotes for an application
     * 
     * GET /v1/applications/{application_id}/quotes
     * https://github.com/leaseq/api-docs/blob/master/applications/quotes/get.md
     */
    export module quotes {
        export type response = {
            quotes: Quote[];
        };
    }

    /**
     * Upload a document to an application
     * 
     * POST /v1/applications/{application_id}/documents
     * https://github.com/leaseq/api-docs/blob/master/applications/documents/post.md
     */
    export function upload(app_id: UUID, document: upload.request): Promise<upload.response> {
        return http.post(`/applications/${encodeURIComponent(app_id)}/documents`, document, configuration)
            .then(toPromise);    
    }

    export module upload {
        export type request = {
            name: string;
            data: string;
            type?: Type;
        };
        export type response = {
            document_id: string;
        };
        export type Type = "invoice" | "quote" | "contract";
    }

    export type Type = "business"
        | "consumer"
        | "corporate"
        | "nonprofit"
        | "municipal";

    export type Status = "New"
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

    export type EquipmentVerticals = "audio visual"
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

    export type CompanyStructure = "sole_prop"
        | "llc"
        | "partnership"
        | "c_corp"
        | "s_corp";

    export type VehicleType = 'longhaul'
        | 'shorthaul'
        | 'utility'
        | 'glider'
        | 'livery';

    export type Product = {
        product_code?: string;
        name?: string;
        quantity?: number;
        price?: number;

        type?: EquipmentVerticals;
        description?: string;
        condition?: Product.Condition;

        vehicle_type?: VehicleType;
        vehicle_make?: string;
        vehicle_model?: string;
        vehicle_link?: string;
        vehicle_year?: number;
        vehicle_milage?: number;
    }

    export module Product {
        export type Condition = 'new' | 'used';
    }

    export type Charge = {
        charge: string;
        description?: string;
        price: number;
    }

    export type Company = {
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

    export type Guarantor = {
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

    export type Quote = {
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

}

export type Application = {
    type: Application.Type;
    status?: Application.Status;
    total_amount?: number;
    remote_id?: string;
    
    company?: Application.Company;
    products?: Application.Product[];
    billing?: Application.Charge[];
    quotes?: Application.Quote[];

    /* WARNING: Do not put guarantors here. It will cause type errors that
    don't match the API docs. */
    
    // hvac fields
    owns_install_location?: boolean;

    // truck fields
    downpayment?: number;

} & ({
    is_full_application: true;
    guarantors?: Application.Guarantor[];
} | {
    is_full_application?: false;
    guarantors: Array<Partial<Application.Guarantor> & { email: string }>;
});

/**
 * 
 * The following are APIs related to Lenders.
 * 
 */

export module Lender {

     /**
     * Get estimated financing rates
     * 
     * GET /v1/lenders/rates
     * https://github.com/leaseq/api-docs/blob/master/lenders/rates/get.md
     */
    export function rates(): Promise<rates.response> {
        return http.get(`/lenders/rates`, configuration)
            .then(toPromise);
    }

    export module rates {
        export type response = {
            credit_tiers: {
                credit_tier: CreditTier;
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
        };
    }

    export type CreditTier = 'A' | 'B' | 'C' | 'D';

}

/**
 * Authenticate the user
 * 
 * POST /v1/login
 * https://github.com/leaseq/api-docs/blob/master/login/post.md
 */
export function login(credentials: login.request): Promise<login.response> {
    return http.post<login.response>(`/login`, credentials, configuration)
        .then(toPromise)
        .then(async response => {
            configuration.headers.Authorization = toAuthorization(response.auth_token);
            return Promise.resolve(response);
        });
}

export module login {
    export type request = {};
    export type response = {};
}