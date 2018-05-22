import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const defaults = {
    base_url: `https://dashboard-dev.leaseq.com/api`,
    email: ``,
    password: ``,
};

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

    lender: {

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
    };

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


export class LegacyLeaseQ implements LeaseQ.SDK {

    private readonly axios_config: AxiosRequestConfig;

    /**
     * @param {LeaseQ.Config} config 
     *  - `auth_token` *string* - the default authentication token. Useful if
     *    you have a static API key.
     *  - `environment` *string* - select a baseURL for API requests.
     *    "Development" is selected by default. Possible values: "development",
     *    "testing", or "production".
     */
    constructor(config?: LeaseQ.Config) {

        this.axios_config = {
            headers: {}
        };

        /* I would love to just set axios (custom instance
           defaults)[https://github.com/axios/axios#custom-instance-defaults],
           but that feature doesn't seem to work properly. For now we have to
           work around this by keeping track of our own config.
           
           WARNING: axios will fail if `Authorization` is `undefined`. The key
           either needs to have a value, or not exist at all. */
        if (config && config.auth_token) {
            this.axios_config.headers.Authorization = LeaseQ.toAuthorization(config.auth_token);
        }

        if (config && config.baseURL) {
            this.axios_config.baseURL = config.baseURL;
        } else if (defaults.base_url) {
            this.axios_config.baseURL = defaults.base_url;
        } else {
            throw new Error(`LeaseQ API Error: base URL is undefined. Either
            pass it into the constructor (new LeaseQ({ baseURL: '...' })), or
            set an environment variable named REACT_APP_LEASEQ_BASE_URL.`);
        }

    }

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
    static readonly toAuthorization = (auth_token?: string, auth_scheme = 'LeaseQ') =>
        auth_token ? [auth_scheme, auth_token].join(' ') : undefined

    /**
     * Convert axios response to regular promises
     *
     * @param {AxiosResponse} response
     * @return {Promise} a promise that resolves to a plain response body
     * without extra axios properties
     */
    private static readonly toPromise = async (response: AxiosResponse) => Promise.resolve(response.data);

    /**
     * Authenticate the user.
     *
     * @param {LeaseQ.LoginRequest} credentials
     *  - `email` *string* – Your email address
     *  - `password` *string* – Your password
     *  - `tenant_id` *string* – Your tenant or dealer ID
     *
     * @return {Promise<LeaseQ.LoginResponse>}
     *  - `auth_token` *string* – The authentication token
     *  - `auth_scheme` *string* – The authentication scheme
     *  - `expires` *string* – The expiration date/time of the token
     * 
     * @see https://github.com/leaseq/api-docs/blob/master/login/post.md
     */
    login: LeaseQ.Login = async (credentials) =>
        axios.post<LeaseQ.LoginResponse>(`/login`, credentials, this.axios_config)
            .then(LeaseQ.toPromise)
            .then(async response => {
                this.axios_config.headers.Authorization = LeaseQ.toAuthorization(response.auth_token);
                return Promise.resolve(response);
            })

    /**
     * Create a new credit application
     *
     * @param {LeaseQ.ApplyRequest} application
     *  - `type` *string* – The application type: "business", "consumer",
     *    "corporate", "nonprofit", or "municipal".
     *  - `total_amount` *number* – The total amount 
     *  - `remote_id` *string* – An optional identifier that can be set to correlate
     *    LeaseQ applications with entities in other systems. This field is
     *    searchable in the LeaseQ dashboard
     *  - `products` *LeaseQ.Product[]* – An array of products. See the definition of *LeaseQ.Product*.
     *  - `equipment` *LeaseQ.Equipment* – Equipment information. See the definition of *LeaseQ.Equipment*.
     *  - `billing` *LeaseQ.Charge[]* – An array of line items. See the definition of *LeaseQ.Charge*.
     *  - `company` *LeaseQ.Company* – Company information. See the definition of *LeaseQ.Company*.
     *  - `guarantors` *LeaseQ.Guarantor[]* – An array of guarantors. See the definition of *LeaseQ.Guarantor*.
     *
     * @return {Promise<LeaseQ.ApplyResponse>}
     *  - `app_id` *string* – The ID of the new application
     *  - `status` *string* – The status of the new application: "Funded",
     *    "Lost", "PO Issued", "Prefunding Released", "Contract In",
     *    "Contract Out", "Approved", "App Submitted", "Decline", "App
     *    Widget" "Lead", or "New".
     *
     * @see https://github.com/leaseq/api-docs/blob/master/login/post.md
     */
    submitApplication: LeaseQ.SubmitApplication = async (application) => {
        return axios.post(`/applications`, application, this.axios_config)
            .then(LeaseQ.toPromise);
    }

    /**
     * Get a credit application
     * 
     * @param {string} app_id
     * @return {Promise<LeaseQ.GetApplicationResponse>}
     * 
     * @see https://github.com/leaseq/api-docs/blob/master/applications/get.md
     */
    getApplication: LeaseQ.GetApplication = async (app_id) =>
        axios.get(`/applications/${encodeURIComponent(app_id)}`, this.axios_config)
            .then(LeaseQ.toPromise)

    /**
     * Update an application
     * 
     * @param {string} app_id 
     * @param {LeaseQ.UpdateApplicationRequest} application 
     * - `total_amount` *number* – The total amount 
     * - `status` *string* – The status of the new application: "Funded",
     *    "Lost", "PO Issued", "Prefunding Released", "Contract In",
     *    "Contract Out", "Approved", "App Submitted", "Decline", "App
     *    Widget" "Lead", or "New".
     * - `lost_reason` *string* - The reason if `status` is "Lost"
     * 
     * @return {Promise<LeaseQ.UpdateApplicationResponse>}
     * 
     * @see https://github.com/leaseq/api-docs/blob/master/applications/patch.md 
     */
    updateApplication: LeaseQ.UpdateApplication = async (app_id, application) =>
        axios.patch(`/applications/${encodeURIComponent(app_id)}`, application, this.axios_config)
            .then(LeaseQ.toPromise)

    /**
     * Replace an application
     * 
     * @param {string} app_id 
     * @param {LeaseQ.ReplaceApplicationRequest} application
     * @return {Promise<LeaseQ.ReplaceApplicationResponse}
     * 
     * @see https://github.com/leaseq/api-docs/blob/master/applications/put.md
     */
    replaceApplication: LeaseQ.ReplaceApplication = async (app_id, application) =>
        axios.put(`/applications/${encodeURIComponent(app_id)}`, application, this.axios_config)
            .then(LeaseQ.toPromise)

    /**
     * Electronically signs an application
     * 
     * @param {string} app_id
     * @param {LeaseQ.SignApplicationRequest} signature
     * @return {Promise<LeaseQ.SignApplicationResponse>}
     * 
     * @see https://github.com/leaseq/api-docs/blob/master/applications/sign.md
     */
    signApplication: LeaseQ.SignApplication = async (app_id, signature) =>
        axios.post(`/applications/${encodeURIComponent(app_id)}/sign`, signature, this.axios_config)
            .then(LeaseQ.toPromise)

    /**
     * Get estimated financing rates
     * 
     * @return {Promise<Leaseq.GetRatesResponse>}
     * 
     * @see https://github.com/leaseq/api-docs/blob/master/lenders/rates/get.md
     */
    getRates: LeaseQ.GetRates = async () =>
        axios.get(`/lenders/rates`, this.axios_config)
            .then(LeaseQ.toPromise)

    /**
     * Get quotes for an application
     * 
     * @param {string} app_id
     * @return {Promise<LeaseQ.GetQuotesResponse>}
     * 
     * @see https://github.com/leaseq/api-docs/blob/master/applications/quotes/get.md
     */
    getQuotes: LeaseQ.GetQuotes = async (app_id) =>
        axios.get(`/applications/${encodeURIComponent(app_id)}/quotes`, this.axios_config)
            .then(LeaseQ.toPromise)

    /**
     * Upload a document
     * 
     * @param {string} app_id
     * @param {LeaseQ.UploadDocumentRequest} document
     * @return {Promise<LeaseQ.UploadDocumentResponse>}
     * 
     * @see https://github.com/leaseq/api-docs/blob/master/applications/documents/post.md
     */
    uploadDocument: LeaseQ.UploadDocument = async (app_id, document) =>
        axios.post(`/applications/${encodeURIComponent(app_id)}/documents`, document, this.axios_config)
            .then(LeaseQ.toPromise)

}

export default LeaseQ;