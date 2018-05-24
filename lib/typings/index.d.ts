// Type definitions for LeaseQ's public API
// Project: https://github.com/leaseq/api-docs
// Definitions by: Elijah Schow <https://github.com/elijah-schow>

declare namespace LeaseQ {

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
        (application: SubmitFullApplicationRequest | SubmitPartialApplicationRequest): Promise<SubmitApplicationResponse>;
    }
    
    type SubmitApplicationRequest = Pick<Application, "type" | "total_amount" | "remote_id" | "products" | "equipment" | "billing" | "company" | "owns_install_location">

    type SubmitFullApplicationRequest = SubmitApplicationRequest & {
        is_full_application: true;
        guarantors: {
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
            }[];
    }

    type SubmitPartialApplicationRequest = SubmitApplicationRequest & {
        is_full_application?: false;
        guarantors: {
                first_name?: string,
                last_name?: string,
                ssn?: string;
                email: string,
                phone?: string,
                address?: string;
                city?: string;
                state?: string;
                zip?: string;
                percentage_owned?: string;
            }[];
    }

    interface SubmitApplicationResponse extends Pick<Application, "app_id" | "status" | "quotes"> { }

    /**
     * Get a credit application
     * 
     * GET /v1/applications/{application_id}
     * https://github.com/leaseq/api-docs/blob/master/applications/get.md
     */

    interface GetApplication {
        (app_id: string): Promise<GetApplicationResponse>;
    }

    interface GetApplicationResponse extends Pick<Application, "app_id" | "total_amount" | "remote_id" | "status"> {
        updated_date: string;
        lender: string;
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

    type UpdateApplicationRequest = Partial<Pick<Application, "status" | "total_amount" | "lost_reason">>;

    type UpdateApplicationResponse = UpdateApplicationRequest;

    /**
     * Replace an application
     * 
     * PUT /v1/applications/{application_id}
     * https://github.com/leaseq/api-docs/blob/master/applications/put.md
     */

    interface ReplaceApplication {
        (app_id: string, application: ReplaceApplicationRequest): Promise<ReplaceApplicationResponse>;
    }

    interface ReplaceApplicationRequest extends Pick<Application, "type" | "total_amount" | "remote_id" | "products" | "billing" | "company" | "guarantors"> { }

    interface ReplaceApplicationResponse extends Pick<Application, "app_id" | "status" | "quotes"> { }

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
            credit_tier: 'A' | 'B' | 'C' | 'D';
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
    // Business Objects
    //

    interface Application {
        app_id: string;
        type: "business" | "consumer" | "corporate" | "nonprofit" | "municipal";
        status: "New" | "WigLead" | "Lead" | "AppIn" | "AppSubmitted" | "Decline" | "Approved" | "DocsOut" | "DocsIn" | "PrefundingReleased" | "POIssued" | "Lost" | "Funded";
        total_amount?: number;
        remote_id?: string;

        company?: Company;
        products?: Product[];
        billing?: Charge[];
        equipment?: Equipment[];
        guarantors: Guarantor[];
        quotes?: Quote[];

        lender?: {
            name: string;
        };
        term?: string;
        approved_date?: string;
        funded_date?: string;
        signed_date?: string;
        lost_reason?: string;

        // additional vertical specific fields
        owns_install_location?: boolean;
    }

    // Legacy
    type Equipment = {
        type: 'truck' | 'audio visual' | 'automotive' | 'controls' | 'coffee' | 'computer' | 'construction' | 'copier' | 'dental' | 'dry cleaning' | 'fabrication' | 'fitness' | 'fitness-crossfit' | 'fork lift' | 'gaming' | 'cannabis' | 'hvac' | 'ice' | 'janitorial' | 'led' | 'laundry' | 'machine tool' | 'mailroom' | 'medical' | 'modular building' | 'office' | 'pos' | 'printing' | 'restaurant' | 'solar' | 'farm' | 'vending' | 'veterinary' | 'other'
        condition: 'new' | 'used';
        description?: string;
        amount?: number;
        // truck
        downpayment?: number;
        vehicle_type?: 'longhaul' | 'shorthaul' | 'utility' | 'glider' | 'livery';
        vehicle_make?: string;
        vehicle_model?: string;
        vehicle_year?: number;
        vehicle_milage?: number;
        vehicle_yearsataddress?: number;
        vehicle_drivefor?: string;
        vehicle_industryexp?: boolean;
        vehicle_compyears?: number;
        vehicle_industrydesc?: string;
        vehicle_hascdl?: boolean;
        vehicle_cdlyear?: number;
        vehicle_numtrucks?: number;
        vehicle_numtrailers?: number;
        vehicle_financedbefore?: boolean;
    };

    interface Product {
        product_id: string;
        description?: string;
        discounted_price?: number;
        name?: string;
        price?: number;
        quantity?: number;
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

}
