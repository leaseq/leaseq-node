import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

export declare namespace LeaseQ {

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
        selected_quote?: string;
        selected_term?: number;
        name?: string;
        consent?: string;
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

        dob_month?: string;
        dob_day?: string;
        dob_year?: string;
        cell_phone?: string;
        work_phone?: string;
        drivers_license_no?: string;
        drivers_license_state?: string;
        homeowner?: boolean;
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

        clicklease_details?: {
            business_startdate_month?: string;
            business_startdate_day?: string;
            business_startdate_year?: string;
            state_of_incorp?: string;
            industry_code?: number;
        }

        /* WARNING: Do not put guarantors here. It will cause type errors that
        don't match the API docs. */

        // hvac fields
        owns_install_location?: boolean;


    } & ({
        is_full_application: true;
        guarantors?: Guarantor[];
    } | {
        is_full_application?: false;
        guarantors: Array<Partial<Guarantor> & { email: string }>;
    });
}

export class LeaseQ implements LeaseQ.SDK {

    private readonly axios_config: AxiosRequestConfig;

    /**
     * @param {LeaseQ.Config} config 
     */
    constructor(config?: LeaseQ.Config) {

        const default_base_url = `https://dashboard-dev.leaseq.com/api`;

        this.axios_config = {
            headers: {}
        };

        /* I would love to just set axios (custom instance
           defaults)[https://github.com/axios/axios#custom-instance-defaults],
           but that feature doesn't seem to work properly. For now we have to
           work around this by keeping track of our own config.
           
           WARNING: axios will fail if `Authorization` is `undefined`. The key
           either needs to have a value, or not exist at all. */
        if (config) {
            if(config.auth_token){
                this.axios_config.headers.Authorization = LeaseQ.toAuthorization(config.auth_token);
            }
            
            this.axios_config.baseURL = config.baseURL || default_base_url;
        } else {
            this.axios_config.baseURL = default_base_url;
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