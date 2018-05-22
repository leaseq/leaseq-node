import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LeaseQ } from '../lib';
import * as data from './data';

let api: LeaseQ;
let mock: MockAdapter;

beforeAll(async () => {
    api = new LeaseQ();
    mock = new MockAdapter(axios);
    // Don't log in because we're using a mock
});

afterEach(() => {
    mock.reset();
});

/**
 * Ensure that the expected parameters actually got sent in the network request.
 * 
 * @param {any} request - the expected request object
 * @param {any} response - the response to send back
 * @param {number} [status=200] - the status code to send back
 * @return {function} an axios interceptor
 */
const expectRequestToMatch = (request: any, response: any, status: number = 200) =>
    (config: AxiosRequestConfig) => {
        const parsed_data = JSON.parse(config.data);

        // `toEqual` cares about the order of items, so remember to sort them
        const shape_of_parsed_data = Object.keys(parsed_data).sort();
        const shape_of_request = Object.keys(request).sort();

        expect(shape_of_parsed_data).toEqual(shape_of_request);
        return [status, response];
    };

describe('configuration', () => {

    it('can set a default authorization token', async () => {
        const auth_token = '5t3UjK97yQ1cRb6Tcz2yRWcWsGuLScuLHVSGwITvtI0ebLZG9Egf53dMh0n0KrORGNwsKIqPDf_gPz2MglG6Hw==';
        const lq: LeaseQ = new LeaseQ({ auth_token });

        mock.onPost('/applications')
            .reply(config => {
                const authorization_header = LeaseQ.toAuthorization(auth_token);
                expect(config.headers).toHaveProperty('Authorization', authorization_header);
                return [201, data.submit_full_application_request];
            });

        await lq.submitApplication(data.submit_full_application_request);
    });

});

describe('lenders', () => {
    it('can get rates', async () => {
        const response = data.get_rates_response;
        mock.onGet('/lenders/rates')
            .reply(200, response);
        expect(await api.getRates())
            .toEqual(response);
    });

});

describe('login', () => {
    it('can log in', async () => {
        const app_id = '00000000-0000-0000-0000-000000000000';
        const request = data.post_login_request;
        const response = data.post_login_response;

        mock.onPost('/login')
            .reply(expectRequestToMatch(request, response));

        expect(await api.login(request)).toEqual(response);

        mock.onAny(/.*/)
            .reply(config => {
                const authorization_header = LeaseQ.toAuthorization(response.auth_token);
                expect(config).toHaveProperty('headers.Authorization', authorization_header);
                return [200];
            });

        // it doesn't matter which method we call 
        await api.getApplication(app_id);
    });

});

describe('applications', () => {

    it('can submit application', async () => {
        const request = data.submit_full_application_request;
        const response = data.submit_application_response;
        mock.onPost('/applications')
            .reply(expectRequestToMatch(request, response, 201));
        expect(await api.submitApplication(request))
            .toEqual(response);
    });

    it('can get application', async () => {
        const app_id = '00000000-0000-0000-0000-000000000000';
        const response = data.get_application_response;
        mock.onGet(`/applications/${app_id}`)
            .reply(200, response);
        expect(await api.getApplication(app_id))
            .toEqual(response);
    });

    it('can update application', async () => {
        const app_id = '00000000-0000-0000-0000-000000000000';
        const request = data.update_application_request;
        const response = undefined;
        mock.onPatch(`/applications/${app_id}`)
            .reply(expectRequestToMatch(request, response));
        expect(await api.updateApplication(app_id, request))
            .toEqual(response);
    });

    it('can replace application', async () => {
        const app_id = '00000000-0000-0000-0000-000000000000';
        const request = data.replace_application_request;
        const response = data.replace_application_response;
        mock.onPut(`/applications/${app_id}`)
            .reply(expectRequestToMatch(request, response));
        expect(await api.replaceApplication(app_id, request))
            .toEqual(response);
    });

    it('can sign application', async () => {
        const app_id = '00000000-0000-0000-0000-000000000000';
        const request = data.sign_application_request;
        const response = data.sign_application_response;
        mock.onPost(`/applications/${app_id}/sign`)
            .reply(expectRequestToMatch(request, response));
        expect(await api.signApplication(app_id, request))
            .toEqual(response);
    });

    it('can get quotes', async () => {
        const app_id = '00000000-0000-0000-0000-000000000000';
        const response = data.get_quotes_response;
        mock.onGet(`/applications/${app_id}/quotes`)
            .reply(200, response);
        expect(await api.getQuotes(app_id))
            .toEqual(response);
    });

    it('can upload document', async () => {
        const app_id = '00000000-0000-0000-0000-000000000000';
        const request = data.upload_document_request;
        const response = data.upload_document_response;
        mock.onPost(`/applications/${app_id}/documents`)
            .reply(expectRequestToMatch(request, response));
        expect(await api.uploadDocument(app_id, request))
            .toEqual(response);
    });

});