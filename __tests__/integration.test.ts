import dotenv from 'dotenv';
import axios from 'axios';

import { LeaseQ } from '../lib';
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

// extend default timepout
jest.setTimeout(2000);


let unauthenticatedApi: LeaseQ;
let api: LeaseQ;
const unknown_id = '00000000-0000-0000-0000-000000000000';

beforeAll(async () => {
    unauthenticatedApi = new LeaseQ();
    api = new LeaseQ();
    if (!process.env.LEASEQ_EMAIL || !process.env.LEASEQ_PASSWORD) {
        throw new Error(`REACT_APP_LEASEQ_EMAIL or REACT_APP_LEASEQ_PASSWORD
        are not defined. Make sure they are defined in your .env or .env.local
        files`);
    }
    await api.login({
        email: process.env.LEASEQ_EMAIL,
        password: process.env.LEASEQ_PASSWORD
    });
});

describe('lenders', () => {

    it('can get rates', async () => {
        const response = await api.getRates();
        expect(response).toBeDefined();
        expect(response.credit_tiers).toBeDefined();
        expect(response.credit_tiers.length).toBeGreaterThan(0);
        expect(response.credit_tiers[0].credit_tier).toBeDefined();
        expect(response.credit_tiers[0].terms).toBeDefined();
        expect(response.credit_tiers[0].terms.length).toBeGreaterThan(0);

        // ensure the call requires authantication
        await expect(unauthenticatedApi.getRates())
            .rejects
            .toThrowError('Request failed with status code 401');
    });

});

describe('full applications', () => {

    let app_id: string;
    let submitAppResponse: LeaseQ.SubmitApplicationResponse;

    beforeAll(async () => {
        try {
            submitAppResponse = await api.submitApplication(data.submit_full_application_request);
            app_id = submitAppResponse.app_id;
        } catch (error) {
            // ignore
        }
    });

    it('can submit application', async () => {
        expect(submitAppResponse).toBeDefined();
        expect(submitAppResponse.app_id).toBeDefined();
        expect(submitAppResponse.app_id.length).toBeGreaterThan(0);
        expect(submitAppResponse.status).toBeDefined();
        expect(submitAppResponse.status).toEqual('Lead');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.submitApplication(data.submit_full_application_request))
            .rejects
            .toThrowError('Request failed with status code 401');
    });

    it('can replace application', async () => {
        const response = await api.replaceApplication(app_id, data.replace_application_request);
        expect(response).toBeDefined();
        expect(response.app_id).toBeDefined();
        expect(response.app_id.length).toBeGreaterThan(0);
        expect(response.status).toEqual('Lead');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.replaceApplication(app_id, data.replace_application_request))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.replaceApplication(unknown_id, data.replace_application_request))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can get application', async () => {
        const response = await api.getApplication(app_id);
        expect(response).toBeDefined();
        expect(response.app_id).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.remote_id).toBeDefined();
        expect(response.remote_id).toEqual(data.submit_full_application_request.remote_id);
        expect(response.total_amount).toBeDefined();
        expect(response.updated_date).toBeDefined();

        // ensure the call requres authantication
        await expect(unauthenticatedApi.getApplication(app_id))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.getApplication(unknown_id))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can get application quotes', async () => {
        const quotesResponse = await api.getQuotes(app_id);
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
        await expect(unauthenticatedApi.getQuotes(app_id))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.getQuotes(unknown_id))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can sign application', async () => {
        const quotesResponse = await api.getQuotes(app_id);
        expect(quotesResponse).toBeDefined();
        expect(quotesResponse.quotes).toBeDefined();
        expect(quotesResponse.quotes.length).toBeGreaterThan(0);

        const selectedQuote = quotesResponse.quotes[0];
        expect(selectedQuote.options).toBeDefined();
        expect(selectedQuote.options.length).toBeGreaterThan(0);

        const signRequest: LeaseQ.SignApplicationRequest = {
            selected_quote: selectedQuote.quote_id,
            selected_term: selectedQuote.options[0].term,
            name: 'Joe Borrower',
            consent: 'Agreement to perform hard credit pull',
            title: 'CFO'
        };

        const response = await api.signApplication(app_id, signRequest);
        expect(response).toHaveProperty('signature');
        expect(response).toHaveProperty('date');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.signApplication(app_id, signRequest))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.signApplication(unknown_id, signRequest))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can change application status', async () => {
        const patchRequest: LeaseQ.UpdateApplicationRequest = {
            status: 'Lost',
            lost_reason: 'Lost to cash'
        };

        await api.updateApplication(app_id, patchRequest);

        const response = await api.getApplication(app_id);
        expect(response).toBeDefined();
        expect(response.status).toEqual('Lost');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.updateApplication(app_id, patchRequest))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.updateApplication(unknown_id, patchRequest))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can change application amount', async () => {
        const newAmount = 50000;
        await api.updateApplication(app_id, {
            total_amount: newAmount
        });

        // a change in scope should cause an application to go to "AppIn" status
        const response = await api.getApplication(app_id);
        expect(response).toBeDefined();
        expect(response.status).toEqual('AppIn');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.updateApplication(app_id, {
            total_amount: 10000
        }))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.updateApplication(unknown_id, {
            total_amount: 10000
        }))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can upload application documents', async () => {
        const response = await api.uploadDocument(app_id, data.upload_document_request);
        expect(response).toBeDefined();
        expect(response.document_id).toBeDefined();
        expect(response.document_id.length).toBeGreaterThan(0);

        // ensure the call requres authantication
        await expect(unauthenticatedApi.uploadDocument(app_id, data.upload_document_request))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.uploadDocument(unknown_id, data.upload_document_request))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

});

describe('partial applications', () => {

    let app_id: string;
    let submitAppResponse: LeaseQ.SubmitApplicationResponse;

    beforeAll(async () => {
        try {
            submitAppResponse = await api.submitApplication(data.submit_partial_application_request);
            app_id = submitAppResponse.app_id;
        } catch (error) {
            // ignore
        }
    });

    it('can submit application', async () => {
        expect(submitAppResponse).toBeDefined();
        expect(submitAppResponse.app_id).toBeDefined();
        expect(submitAppResponse.app_id.length).toBeGreaterThan(0);
        expect(submitAppResponse.status).toBeDefined();
        expect(submitAppResponse.status).toEqual('WigLead');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.submitApplication(data.submit_full_application_request))
            .rejects
            .toThrowError('Request failed with status code 401');
    });

    it('can get application', async () => {
        const response = await api.getApplication(app_id);
        expect(response).toBeDefined();
        expect(response.app_id).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.remote_id).toBeDefined();
        expect(response.remote_id).toEqual(data.submit_partial_application_request.remote_id);
        expect(response.total_amount).toBeDefined();
        expect(response.updated_date).toBeDefined();

        // ensure the call requres authantication
        await expect(unauthenticatedApi.getApplication(app_id))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.getApplication(unknown_id))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can change application amount', async () => {
        const newAmount = 50000;
        await api.updateApplication(app_id, {
            total_amount: newAmount
        });

        // a change in scope should cause an application to go to "AppIn" status
        const response = await api.getApplication(app_id);
        expect(response).toBeDefined();
        expect(response.status).toEqual('AppIn');

        // ensure the call requres authantication
        await expect(unauthenticatedApi.updateApplication(app_id, {
            total_amount: 10000
        }))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.updateApplication(unknown_id, {
            total_amount: 10000
        }))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

    it('can upload application documents', async () => {
        const response = await api.uploadDocument(app_id, data.upload_document_request);
        expect(response).toBeDefined();
        expect(response.document_id).toBeDefined();
        expect(response.document_id.length).toBeGreaterThan(0);

        // ensure the call requres authantication
        await expect(unauthenticatedApi.uploadDocument(app_id, data.upload_document_request))
            .rejects
            .toThrowError('Request failed with status code 401');

        // ensure the call fails if not found
        await expect(api.uploadDocument(unknown_id, data.upload_document_request))
            .rejects
            .toThrowError('Request failed with status code 404');
    });

});