import dotenv from 'dotenv'
import axios from 'axios';

import LeaseQ from '../lib';
import * as data from './data';


/* Load environment variables */
dotenv.config();
const env = process.env;

if(env.PROXY_HOST && env.PROXY_PORT) {
    axios.defaults.proxy = {
        host: env.PROXY_HOST,
        port: parseInt(env.PROXY_PORT, 10),
    };
}

const unknown_id = '00000000-0000-0000-0000-000000000000';
let unauthenticatedApi;
let api;

beforeAll(async () => {
    if(!env.LEASEQ_EMAIL || !env.LEASEQ_PASSWORD) {  
        throw Error("LEASEQ_EMAIL or LEASEQ_PASSWORD are not set. To run integration tests, create a file called \".env\" with valid credentials");
    }

    unauthenticatedApi = LeaseQ();
    api = LeaseQ();
    await api.login({
        email: env.LEASEQ_EMAIL,
        password: env.LEASEQ_PASSWORD,
    });
});

describe('lenders', () => {

    it('can get rates', async () => {
        const response = await api.rates();
        expect(response).toBeDefined();
        expect(response.credit_tiers).toBeDefined();
        expect(response.credit_tiers.length).toBeGreaterThan(0);
        expect(response.credit_tiers[0].credit_tier).toBeDefined();
        expect(response.credit_tiers[0].terms).toBeDefined();
        expect(response.credit_tiers[0].terms.length).toBeGreaterThan(0);

        // ensure the call requires authantication
        await expect(unauthenticatedApi.rates())
            .rejects
            .toThrowError('Request failed with status code 401');
    });

});

describe('applications', () => {

    let app_id: string;
    let submitAppResponse;

    beforeAll(async () => {
        submitAppResponse = await api.application.submit(data.submit_full_application_request);
        expect(submitAppResponse).toBeDefined();
        expect(submitAppResponse.app_id).toBeDefined();
        expect(submitAppResponse.app_id.length).toBeGreaterThan(0);
        app_id = submitAppResponse.app_id;

    });

    it('can submit full applications', async () => {
        expect(submitAppResponse).toBeDefined();
        expect(submitAppResponse.app_id).toBeDefined();
        expect(submitAppResponse.app_id.length).toBeGreaterThan(0);
        expect(submitAppResponse.status).toBeDefined();
        expect(submitAppResponse.status).toEqual('Lead');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.submit(data.submit_full_application_request))
            .rejects
            .toThrowError('Request failed with status code 401');
    });

    it('can submit partial applications', async () => {
        let response;
        response = await api.application.submit(data.submit_partial_application_request);
        expect(response).toBeDefined();
        expect(response.app_id).toBeDefined();
        expect(response.app_id.length).toBeGreaterThan(0);

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.submit(data.submit_partial_application_request))
            .rejects
            .toThrowError('Request failed with status code 401');
    });

    it('can replace application', async () => {
        const response = await api.application.replace(app_id, data.replace_application_request);
        expect(response).toBeDefined();
        expect(response.app_id).toBeDefined();
        expect(response.app_id.length).toBeGreaterThan(0);
        expect(response.status).toEqual('Lead');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.replace(app_id, data.replace_application_request))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.application.replace(unknown_id, data.replace_application_request))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can get application', async () => {
        const response = await api.application.get(app_id);
        expect(response).toBeDefined();
        expect(response.app_id).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.remote_id).toBeDefined();
        expect(response.remote_id).toEqual(data.submit_full_application_request.remote_id);
        expect(response.total_amount).toBeDefined();
        expect(response.updated_date).toBeDefined();

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.get(app_id))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.application.get(unknown_id))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can get application quotes', async () => {
        const quotesResponse = await api.application.quotes(app_id);
        expect(quotesResponse).toBeDefined();
        expect(quotesResponse.quotes).toBeDefined();
        expect(quotesResponse.quotes.length).toBeGreaterThan(0);

        const selectedQuote = quotesResponse.quotes[0];
        expect(selectedQuote.quote_id).toBeDefined();
        expect(selectedQuote.quote_id.length).toBeGreaterThan(0);
        expect(selectedQuote.options).toBeDefined();
        expect(selectedQuote.options.length).toBeGreaterThan(0);

        const selectedOption = selectedQuote.options[0];
        expect(selectedOption.monthly_payment).toBeGreaterThan(0);
        expect(selectedOption.term).toBeGreaterThan(0);

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.quotes(app_id))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.application.quotes(unknown_id))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can sign application', async () => {
        const quotesResponse = await api.application.quotes(app_id);
        expect(quotesResponse).toBeDefined();
        expect(quotesResponse.quotes).toBeDefined();
        expect(quotesResponse.quotes.length).toBeGreaterThan(0);

        const selectedQuote = quotesResponse.quotes[0];
        expect(selectedQuote.options).toBeDefined();
        expect(selectedQuote.options.length).toBeGreaterThan(0);

        const signRequest = {
            selected_quote: selectedQuote.quote_id,
            selected_term: selectedQuote.options[0].term,
            name: 'Joe Borrower',
            consent: 'Agreement to perform hard credit pull',
            title: 'CFO'
        };

        const response = await api.application.sign(app_id, signRequest);
        expect(response).toHaveProperty('signature');
        expect(response).toHaveProperty('date');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.sign(app_id, signRequest))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.application.sign(unknown_id, signRequest))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can change application status', async () => {
        const patchRequest = {
            status: 'Lost',
            lost_reason: 'Lost to cash'
        };

        await api.application.update(app_id, patchRequest);

        const response = await api.application.get(app_id);
        expect(response).toBeDefined();
        expect(response.status).toEqual('Lost');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.update(app_id, patchRequest))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.application.update(unknown_id, patchRequest))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can change application amount', async () => {
        const newAmount = 50000;
        await api.application.update(app_id, {
            total_amount: newAmount
        });

        // a change in scope should cause an application to go to "AppIn" status
        const response = await api.application.get(app_id);
        expect(response).toBeDefined();
        expect(response.status).toEqual('AppIn');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.update(app_id, {
            total_amount: 10000
        }))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.application.update(unknown_id, {
            total_amount: 10000
        }))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can upload application documents', async () => {
        const response = await api.application.upload(app_id, data.upload_document_request);
        expect(response).toBeDefined();
        expect(response.document_id).toBeDefined();
        expect(response.document_id.length).toBeGreaterThan(0);

        // ensure the call requres authantication
        await expect(unauthenticatedApi.application.upload(app_id, data.upload_document_request))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.application.upload(unknown_id, data.upload_document_request))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

});