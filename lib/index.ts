import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
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