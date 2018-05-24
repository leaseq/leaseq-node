import axios, { AxiosResponse, AxiosInstance } from 'axios';

type Status = "New" | "App Widget Lead" | "Decline" | "App Submitted" | "Approved" | "Contract Out" | "Contract In" | "Prefunding Released" | "PO Issued" | "Lost" | "Funded";

type Application = FullApplication | PartialApplication;

type FullApplication = BaseApplication & {
    is_full_application: true;
    guarantors: Guarantor[];
}

type PartialApplication = Partial<BaseApplication> & {
    is_full_application?: false;
}

type BaseApplication = {

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

type Guarantor = {
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
 * 
 * Create an instance of the SDK
 * 
 */
export const LeaseQ = () => {

    let config = {
        /* TODO: set the baseURL in config and bake into compile */
        baseURL: `https://dashboard-dev.leaseq.com/api`,
        headers: {},
    };

    /**
     * Convert axios response to regular promises
     *
     * @param response
     * @return a promise that resolves to a plain response body
     * without extra axios properties
     */
    const toPromise = async (response: AxiosResponse) => Promise.resolve(response.data);

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
    const login = async (credentials: {
        /* Your email address */
        email: string,
        /* You password */
        password: string,
        /* Your tenant or dealer id */
        dealer_id?: string
    }): Promise<{
        /* The authentication token */
        auth_token: string;
        /* The authentication scheme. Only `LeaseQ` is supported. */
        auth_scheme: string;
        /* The expiration date/time of the token */
        expires: string;
    }> =>
        /* Don't send the authentication token */
        axios.post(`/login`, credentials, config)
            .then(toPromise)
            .then(async response => {
                config.headers = Object.assign(config.headers, {
                    Authorization: `${response.auth_scheme} ${response.auth_token}`
                });
                return Promise.resolve(response);
            });

    /**
     * Get estimated financing rates
     * 
     * Gets estimated financing rates from LeaseQ's marketplace of Lenders.
     * Note: These are estimated rates. Actual rates will vary based on
     * actual credit rating of customer and/or business.
     * 
     * GET /v1/lenders/rates
     * https://github.com/leaseq/api-docs/blob/master/lenders/rates/get.md
     * 
     */
    const rates =
        async (): Promise<{
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
        }> =>
            axios.get(`/lenders/rates`, config)
                .then(toPromise);

    /**
     * Create a new credit application
     * 
     * POST /v1/applications
     * https://github.com/leaseq/api-docs/blob/master/applications/post.md
     */

    const submit = async (application: Application): Promise<{
        /* The id of the new application */
        app_id: string;
        /* The status of the new application - Funded, Lost, PO Issued,
        Prefunding Released, Contract In, Contract Out, Approved, App
        Submitted, Decline, App Widget Lead, New */
        status: Status;
    }> =>
        axios.post(`/applications`, application, config)
            .then(toPromise);

    /**
     * Get a credit application
     * 
     * GET /v1/applications/{application_id}
     * https://github.com/leaseq/api-docs/blob/master/applications/get.md
     */
    const get = async (app_id: string): Promise<{
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
        /* The lender name /!\ FIXME: this comment is out of date */
        lender: string;
        /* The total amount */
        total_amount: number;
        /* The date/time when the application was last updated. */
        updated_date: string;
    }> =>
        axios.get(`/applications/${encodeURIComponent(app_id)}`, config)
            .then(toPromise);

    /**
     * Update part of an application
     * 
     * PATCH /v1/applications/{application_id}
     * https://github.com/leaseq/api-docs/blob/master/applications/put.md
     */
    const update = async (
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
    ): Promise<{
        status: Status;
        lost_reason?: string;
    } | {
        total_amount: number;
    }> =>
        axios.patch(`/applications/${encodeURIComponent(app_id)}`, application, config)
            .then(toPromise);

    /**
     * Replace an application
     * 
     * PUT /v1/applications/{application_id}
     * https://github.com/leaseq/api-docs/blob/master/applications/put.md
     */
    const replace = async (app_id: string, application: Application): Promise<{
        /* The id of the application */
        app_id: string;
        /* The status of the application */
        status: Status;
    }> =>
        axios.put(`/applications/${encodeURIComponent(app_id)}`, application, config)
            .then(toPromise);

    /**
    * Electronically signs an application
    * 
    * POST /v1/applications/{application_id}/sign
    * https://github.com/leaseq/api-docs/blob/master/applications/sign.md
    */
    const sign = async (
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
    ): Promise<{
        /* The signature hash */
        signature: string;
        /* The date/time of the signing */
        date: string;
    }> =>
        axios.post(`/applications/${encodeURIComponent(app_id)}/sign`, signature, config)
            .then(toPromise);

    /**
     * Get quotes for an application
     * 
     * GET /v1/applications/{application_id}/quotes
     * https://github.com/leaseq/api-docs/blob/master/applications/quotes/get.md
     */
    const quotes = async (app_id: string): Promise<{
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
    }> =>
        axios.get(`/applications/${encodeURIComponent(app_id)}/quotes`, config)
            .then(toPromise);

    /**
     * Upload document
     * 
     * POST /v1/applications/{application_id}/documents
     * https://github.com/leaseq/api-docs/blob/master/applications/documents/post.md
     */
    const upload = async (
        app_id: string,
        document: {
            /* The document type: invoice, quote, contract */
            type?: "invoice" | "quote" | "contract";
            /* The document filename */
            name: string;
            /* (base64 encoded) The document data */
            data: string;
        }
    ): Promise<{
        /* (guid) The id of the uploaded document */
        document_id: string;
    }> =>
        axios.post(`/applications/${encodeURIComponent(app_id)}/documents`, document, config)
            .then(toPromise);

    /* TODO: I wish I could export all these functions directly, but nested objects
            and type definitions don't seem to mix well. */

    return {
        login,
        rates,
        application: {
            submit,
            get,
            update,
            replace,
            sign,
            quotes,
            upload,
        }
    };

};

export default LeaseQ;