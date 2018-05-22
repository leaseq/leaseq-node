import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import defaults from 'defaults';

export interface LeaseQ {

    application: {

        /**
         * Create a new credit application
         * 
         * POST /v1/applications
         * https://github.com/leaseq/api-docs/blob/master/applications/post.md
         */
        submit: (application: Application) => Promise<{
            /* The id of the new application */
            app_id: string;
            /* The status of the new application - Funded, Lost, PO Issued,
            Prefunding Released, Contract In, Contract Out, Approved, App
            Submitted, Decline, App Widget Lead, New */
            status: Status;
        }>;

        /**
         * Get a credit application
         * 
         * GET /v1/applications/{application_id}
         * https://github.com/leaseq/api-docs/blob/master/applications/get.md
         */
        get: (app_id: string) => Promise<{
            /* (guid) The id of the new application */
            app_id: string;
            /* An optional identifier that can be set to correlate LeaseQ
            applications with entities in other systems. This field is
            searchable in the LeaseQ dashboard */
            remote_id?: string;
            /* The status of the new application - Funded, Lost, PO Issued,
            Prefunding Released, Contract In, Contract Out, Approved, App
            Submitted, Decline, App Widget Lead, New */
            status: Status;
            /* /!\ /!\ /!\ The lender name /!\/!\/!\ this comment is out of date */
            lender: string;
            /* The total amount */
            total_amount: number;
            /* The date/time when the application was last updated. */
            updated_date: string;
        }>;

        /**
         * Update part of an application
         * 
         * PATCH /v1/applications/{application_id}
         * https://github.com/leaseq/api-docs/blob/master/applications/put.md
         */
        update: (
            app_id: string,
            application: {
                /* The status of the new application - Funded, Lost, PO Issued,
                Prefunding Released, Contract In, Contract Out, Approved, App
                Submitted, Decline, App Widget Lead, New */
                status: Status;
                /* The reason if status is Lost */
                lost_reason?: string;
                /* The total amount */
                total_amount: number;

            }
        ) => Promise<{
            status: Status;
            lost_reason?: string;
        } | {
            total_amount: number;
        }>;

        /**
         * Replace an application
         * 
         * PUT /v1/applications/{application_id}
         * https://github.com/leaseq/api-docs/blob/master/applications/put.md
         */
        replace: (app_id: string, application: Application) => Promise<{
            /* The id of the application */
            app_id: string;
            /* The status of the application */
            status: Status;
        }>;

        /**
         * Electronically signs an application
         * 
         * POST /v1/applications/{application_id}/sign
         * https://github.com/leaseq/api-docs/blob/master/applications/sign.md
         */
        sign: (
            app_id: string,
            signature: {
                /* (guid) The id of the selected quote */
                selected_quote: string;
                /* The desired term length from the selected quote */
                selected_term: string;
                /* The name of the signer */
                name: string;
                /* The title of the signer (e.g. Owner, Principal, CFO, ...) */
                title: string;
            } 
        ) => Promise<{
            /* The signature hash */
            signature: string;
            /* The date/time of the signing */
            date: string;
        }>;

        /**
         * Upload document
         * 
         * POST /v1/applications/{application_id}/documents
         * https://github.com/leaseq/api-docs/blob/master/applications/documents/post.md
         */
        upload: (
            app_id: string,
            document: {
                /* The document type: invoice, quote, contract */
                type?: "invoice" | "quote" | "contract";
                /* The document filename */
                name: string;
                /* (base64 encoded) The document data */
                data: string;
            }
        ) => Promise<{
            /* (guid) The id of the uploaded document */
            document_id: string;
        }>;

        /**
         * Get quotes for an application
         * 
         * GET /v1/applications/{application_id}/quotes
         * https://github.com/leaseq/api-docs/blob/master/applications/quotes/get.md
         */
        quotes: (app_id: string) => Promise<{
            /* (guid) The quote id */
            quote_id: string;
            /* The lender name */
            lender_name?: string;
            /* /!\ UNDOCUMENTED /!\ */
            lender?: {
                name: string;
                about: string;
                phone: string;
                logo: string;
            };
            /* The type of financing (e.g. '$1 Buyout') */
            finance_type?: string;
            /* Additional details */
            details?: string;
            options: {
                /* The term length in months */
                term: number;
                /* The monthly payment */
                monthly_payment: number;
            }[];
        }>;
    };

    /**
     * Get estimated financing rates
     * 
     * Gets estimated financing rates from LeaseQ's marketplace of Lenders.
     * Note: These are estimated rates. Actual rates will vary based on
     * actual credit rating of customer and/or business.
     * 
     * GET /v1/lenders/rates
     * https://github.com/leaseq/api-docs/blob/master/lenders/rates/get.md
     */
    rates: () => Promise<{
        credit_tiers: {
            /* The borrower's credit tier (i.e. A,B,C,D) */
            credit_tier: 'A' | 'B' | 'C' | 'D';
            terms: {
                /* The term length in months */
                term_length: number;
                rates: {
                    /* The minimum finance amount */
                    amount_min: number;
                    /* The maximum finance amount */
                    amount_max: number;
                    /* The estimated average lender financing rate */
                    rate: number;
                    /* The estimated average lender financing money factor.
                    This can be used to calculate monthly payment (e.g.
                    monthly payment = money factor × finance amount) */
                    factor: number;
                }[]
            }[];
        }[]
    }>

    /**
     * Authenticate the user
     * 
     * Login API requires email address, password and dealer id of an account to
     * authenticate the user. As a response you will receive a “auth token along
     * with “auth scheme” and “expires” in json. This auth token along with auth
     * scheme will be required for every subsequent API calls. All the calls are
     * authorized based on the privileges of account role. The LeaseQ platform
     * supports two different roles “admin” and “salesperson”. Auth token is
     * valid only for time specified in “expire” and will get renewed for every
     * HTTP call made to API endpoint.
     * 
     * POST /v1/login
     * https://github.com/leaseq/api-docs/blob/master/login/post.md
     */
    login: (
        credentials: {
            /* Your email address */
            email: string,
            /* You password */
            password: string,
            /* Your tenant or dealer id */
            dealer_id?: string
        }
    ) => Promise<{
        /* The authentication token */
        auth_token: string;
        /* The authentication scheme. Only `LeaseQ` is supported. */
        auth_scheme: string;
        /* The expiration date/time of the token */
        expires: string;
    }>

}

export type Status = "New" | "App Widget Lead" | "Decline" | "App Submitted" | "Approved" | "Contract Out" | "Contract In" | "Prefunding Released" | "PO Issued" | "Lost" | "Funded";

type FullApplication = Application & {
    is_full_application: true;
    guarantors: Guarantor[];
}

type PartialApplication = Partial<Application> & {
    is_full_application?: false;
}

export type Application = {

    /* The application type: `"business"`, `"corporate"`, `"nonprofit"`,
    or `"municipal"`. */
    type: "business" | "corporate" | "nonprofit" | "municipal";

    /* A flag which indicates this application should be validated as a complete
    application that requires no additional information from guarantors */
    is_full_application?: boolean;

    /* The total amount */
    total_amount: number;

    /* An optional identifier that can be set to correlate LeaseQ
    applications with entities in other systems. This field is
    searchable in the LeaseQ dashboard */
    remote_id?: string;

    products?: {
        /* The product code */
        product_code: string;
        /* The product name */
        name: string;
        /* The product description */
        description?: string;
        /* The product quantity */
        quantity?: number;
        /* The product price */
        price: number;
    }[];

    billing?: {
        /* The charge / line item */
        charge: string;
        /* The description of the charge */
        description?: string;
        /* The price */
        price: number;
    }[];

    company: {
        /* The name of the company */
        name: string;
        /* The name under which the company does business */
        dba?: string;
        /* The phone number for the company headquarters */
        phone: string;
        /* The company headquarters street address */
        address: string;
        /* The city where the company headquarters is located */
        city: string;
        /* The state/prov where the company headquarters is located */
        state: string;
        /* The zip/postal of the company headquarters */
        zip: string;
        /* The Employer Identification Number */
        ein?: string;
        /* The number of years in business */
        years_in_business: number;
    };

    guarantors: Guarantor[];

    /* Indicates whether the customer owns the property where the
    equipment is being installed */
    owns_install_location: boolean;

};

export type Guarantor = {
    /* The guarantor's first name */
    first_name: string;
    /* The guarantor's last name */
    last_name: string;
    /* The guarantor's email address */
    email?: string;
    /* The guarantor's phone number */
    phone?: string;
    /* The guarantor's street address */
    address?: string;
    /* The guarantor's city */
    city?: string;
    /* The guarantor's state/prov */
    state?: string;
    /* The guarantor's zip/postal */
    zip?: string;
    /* (encrypted) The guarantor's Social Security Number. See
    [Encryption of Sensitive
    Data](https://github.com/leaseq/api-docs/blob/master/encryption.md)
    for information on encrypting sensitive fields like SSN.*/
    ssn: string;
    /* The percentage owned */
    percentage_owned?: string;
};

/**
 * Convert an authentication token into an Authorization header
 *
 * @param auth_token an authentication token. If you don't have
 * one, get it from `login()`.
 * @param [auth_scheme] an authentication scheme (e.g. 'LeaseQ').
 * 'LeaseQ' is the only supported scheme so far.  
 * @return an authorization header (e.g. "Authorization LeaseQ
 * $Auth_Token")
 */
const toAuthorization = (auth_token?: string, auth_scheme = 'LeaseQ') =>
        auth_token ? [auth_scheme, auth_token].join(' ') : undefined

/**
 * Convert axios response to regular promises
 *
 * @param response
 * @return a promise that resolves to a plain response body
 * without extra axios properties
 */
const toPromise = async (response: AxiosResponse) => Promise.resolve(response.data);

export const LeaseQ: LeaseQ = {

    login: async (credentials) =>
        /* Don't send the authentication token */
        axios.post(`/login`, credentials, { baseURL: axios.defaults.baseURL })
            .then(toPromise)
            .then(async response => {
                axios.defaults.headers.Authorization = toAuthorization(response.auth_token);
                return Promise.resolve(response);
            }),

    rates: async () =>
        axios.get(`/lenders/rates`)
            .then(toPromise),
            
    application: {

        submit: async (application) =>
            axios.post(`/applications`, application)
            .then(toPromise),
    
        get: async (app_id) =>
            axios.get(`/applications/${encodeURIComponent(app_id)}`)
                .then(toPromise),
    
        update: async (app_id, application) =>
            axios.patch(`/applications/${encodeURIComponent(app_id)}`, application)
                .then(toPromise),
    
        replace: async (app_id, application) =>
            axios.put(`/applications/${encodeURIComponent(app_id)}`, application)
                .then(toPromise),
    
        sign: async (app_id, signature) =>
            axios.post(`/applications/${encodeURIComponent(app_id)}/sign`, signature)
                .then(toPromise),
        
        quotes: async (app_id) =>
            axios.get(`/applications/${encodeURIComponent(app_id)}/quotes`)
                .then(toPromise),
    
        upload: async (app_id, document) =>
            axios.post(`/applications/${encodeURIComponent(app_id)}/documents`, document)
                .then(toPromise)
    
    },

};

export default LeaseQ;