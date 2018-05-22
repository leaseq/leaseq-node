import LeaseQ from '.';

/* This isn't a real SSN */
export const ssn = 'hd17v6cWi2ltvwcLi6IDj4rhpkV+fafQOWg8yY756FwB46+POrecRj1dUg+xUcxW7lHtp0WKppB810+Ut++9uWNr6YJvzzemThrKykVw71qfq5ParS2p1YRCwGgfqJNb92V5KasrysMp+gM2kq6QdiSUWN9WhUP/6dkOnR+1CTCe68sS7zLI0JG394X196YN/ERasM5QhNSihQoOlsjw166wZMegviEb2EEm2zKp8A7jchL0ahJFsVO4aXmREIbCuE4jXY6OazWv7aF1BB5jvE7Hdw9SgXPMb/9+HTDOnLkIPqxEuxjZPR6bv6hImFBdeLa7J4xsPMJtghhla3GdndT7Okgn1/Qoq5Wjg1RzvFVp2rsYIMx9YVP74N69ga8f8e1PNd6T4V6coQRAP4U9IGb23BDAINxVbL5mae/LGDSsA6tdaT2pwGmJ90gyioutUSCNPR202zAKYY9280BKphp+GhERsSRKP+yBWCgc5EEJOKSqO/BcNbO3ckmfaNPOSHBnenjfaPogY0KM7jwVZIY5w+6itcOUrMpFLycxZLlqUWo6MOvn/CTsKWkm75uXv0dk/BPDgV1pj4ErMe1ifZyAN0SGF3n/9gSvqqI9IRRhELs5AMM/2AT+O8EDmRxvgO1XIwOu/gzeJ9pyQ1pkF06dlCpmlvTD6s6QZVNTa6s=';

/**
 * Authenticate the user
 * 
 * POST /v1/login
 * https://github.com/leaseq/api-docs/blob/master/login/post.md
 */
export const post_login_request = {
    email: 'user@example.com',
    password: 'StrongPassword',
    tenant_id: '<tennant or dealer id>',
};

export const post_login_response = {
    auth_token: '<token>',
    auth_scheme: 'LeaseQ',
    expires: 'Mon, 01 Jan 2000 00:00:00 GMT',
};

/**
 * Create a new credit application
 * 
 * POST /v1/applications
 * https://github.com/leaseq/api-docs/blob/master/applications/post.md
 */
export const submit_full_application_request = {
    type: 'business',
    is_full_application: true,
    total_amount: 20000,
    remote_id: 'eb9832f3-8d3f-fe24-eff0-d180d3fd513a',

    products: [{
        product_id: 'SBIR_Pr_Code',
        name: 'Pepper',
        description: 'Pepper',
        quantity: 3,
        price: 4000
    }, {
        product_id: 'SBIR_Pr_Code',
        name: 'Service Plan',
        description: 'Service Plan',
        quantity: 1,
        price: 3000
    }],
    equipment: [{
        type: 'audio visual',
        amount: 50000,
        description: 'RED Weapon - Helium 8K S35',
        condition: 'new',
    }],
    billing: [{
        charge: 'Tax',
        description: '20 percent tax',
        price: 250
    }, {
        charge: 'Delivery charge',
        description: 'Delivery charge',
        price: 100
    }],

    company: {
        name: 'ABC Corp',
        dba: 'ABC Corp [ optional ]',
        phone: '7815554433',
        address: '17 North Ave',
        city: 'Boston',
        state: 'MA',
        zip: '01802',
        ein: '00-0000000',
        years_in_business: 5
    },

    guarantors: [{
        first_name: 'Paul',
        last_name: 'Testcase',
        email: 'abc@xyz.com',
        phone: '7815554433',
        address: '16 Summer St',
        city: 'Boston',
        state: 'MA',
        zip: '01801',
        ssn,
        percentage_owned: '100'
    }]
};

export const submit_partial_application_request = {
    type: 'business',
    guarantors: [
        {
            email: 'test.automation@leaseq.com'
        }
    ]
};

export const submit_application_response = {
    app_id: '00000000-0000-0000-0000-000000000000',
    status: 'Lead',
};

/**
 * Get a credit application
 * 
 * GET /v1/applications/{application_id}
 * https://github.com/leaseq/api-docs/blob/master/applications/get.md
 */
export const get_application_response = {
    app_id: 'GUID',
    status: 'AppIn',
    lender: 'Univest Capital, Inc.',
    updated_date: '2018-03-17T07:27:22.214Z',
    total_amount: 50000.0,
    remote_id: 'eb9832f3-8d3f-fe24-eff0-d180d3fd513a',
};

/**
 * Update the status of an application
 * 
 * PATCH /v1/applications/{application_id}
 * https://github.com/leaseq/api-docs/blob/master/applications/patch.md
 */
export const update_application_request = {
    total_amount: 40000,
};

export const update_application_response = update_application_request;

export const update_application_request_2 = {
    status: 'Lost',
    lost_reason: 'Lost To Cash',
};

export const update_application_response_2 = update_application_request_2;

/**
 * Replace an application
 * 
 * PUT /v1/applications/{application_id}
 * https://github.com/leaseq/api-docs/blob/master/applications/put.md
 */
export const replace_application_request = {
    type: 'business',
    total_amount: 40000,
    remote_id: 'eb9832f3-8d3f-fe24-eff0-d180d3fd513a',

    products: [{
        product_id: 'SBIR_Pr_Code',
        name: 'Pepper',
        description: 'Pepper',
        quantity: 3,
        price: 4000
    }, {
        product_id: 'SBIR_Pr_Code',
        name: 'Service Plan',
        description: 'Service Plan',
        quantity: 1,
        price: 3000
    }],

    billing: [{
        charge: 'Tax',
        description: '20 percent tax',
        price: 250
    }, {
        charge: 'Delivery charge',
        description: 'Delivery charge',
        price: 100
    }],

    company: {
        name: 'ABC Corp',
        dba: 'ABC Corp [ optional ]',
        phone: '7815554433',
        address: '17 North Ave',
        city: 'Boston',
        state: 'MA',
        zip: '01802',
        ein: '00-0000000',
        years_in_business: 5
    },

    guarantors: [{
        first_name: 'Paul',
        last_name: 'Testcase',
        email: 'abc@xyz.com',
        phone: '7815554433',
        address: '16 Summer St',
        city: 'Boston',
        state: 'MA',
        zip: '01801',
        ssn,
        percentage_owned: '100'
    }]
};

export const replace_application_response = {
    app_id: '00000000-0000-0000-0000-000000000000',
    status: 'Lead',
};

/**
 * Electronically signs an application
 * 
 * POST /v1/applications/{application_id}/sign
 * https://github.com/leaseq/api-docs/blob/master/applications/sign.md
 */
export const sign_application_request = {
    selected_quote: '00000000-0000-0000-0000-000000000000',
    selected_term: 48,
    name: 'John Smith',
    consent: 'Agreement to perform hard credit pull',
};

export const sign_application_response = {
    signature: 'o08oAGRZzup8RX7QX4eZRjmSmntgxqE3ROyiQaNCkqk=',
    date: '2018-01-09T17:07:52.216-06:00'
};

/**
 * Get quotes
 * 
 * GET /v1/applications/{application_id}/quotes
 * https://github.com/leaseq/api-docs/blob/master/applications/quotes/get.md
 */
export const get_quotes_response = {
    quotes: [{
        quote_id: '00000000-0000-0000-0000-000000000000',
        lender_name: 'ACME Capital',
        lender: {
            name: 'TimePayment',
            about: 'TimePayment Corporation, a wholly owned operating subsidiary of MicroFinancial (NASDAQ:MFI), is a micro-ticket equipment leasing company that focuses on delivering leasing solutions to equipment dealers, lease brokers, and customers.',
            phone: '877-868-3800',
            logo: 'timepaymentlogo.png'
        },
        finance_type: '$1 Buyout',
        details: 'First and last payment are due upfront. Documentation fee $200. Rates do not include sales, rental or use taxes. Fair market value purchase available at end of lease.',
        options: [{
            term: 60,
            monthly_payment: 537.00,
        }, {
            term: 48,
            monthly_payment: 646.00,
        }, {
            term: 36,
            monthly_payment: 829.00,
        }, {
            term: 24,
            monthly_payment: 1185.00
        }]
    }]
};

/**
 * Upload document
 * 
 * POST /v1/applications/{application_id}/documents
 * https://github.com/leaseq/api-docs/blob/master/applications/documents/post.md
 */
export const upload_document_request = {
    type: 'invoice',
    name: 'Sample Inovice.pdf',
    // tslint:disable-next-line
    data: `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
esHf5K+OVRhn5jd47MSNJzBa1835Tbz12Arj9AuQ0oL5ZFkh1oTzNhiRxVup+aPe
Gv0WsQYz59uQzqcVeOwS5Vo4FGUm2L3eyhPw7Cy/HuBzkk6Dt8acLWOggWLNWwPB
xFutQ3PMXsJgi1D4oLfu6GwSBiHHfNwTWYzeOmBo3HorLDc5DZPpC27EeU+cyXEb
Cp55xMlqHv4AlUt45FAoR3kRHnmghPyd1+HK9EgOacNNJ753TN6J77V41W9BSErh
DzTZc5ypErDC6YmTMCFde0kHr7Bq3NtCE8mb63vGcaCaZznN7uQGkicLCSCiQ9wP
ojuOCYsKdiF/QPSZJuwiS9g5iPJCNJapKEkjiLqB5+rhSeIqiDzFKog8wTqIsDlE
EEF1C6XgpyhyeHwBSqi5/wiGUCf7iO/2ijj3jiAOGBANjPAoJnRTXH6BAG99CdAA
cpAqGPQR63E6ClEDL8MVhHxGdXsFRSQju7sUvlSEL80Jfim3sOyQKgBjHugCDxYR
7NE6lMhe47/F5Vf3gDQLxDg0hUdfQAs7by9JhqCh4NyHDPVJ6hkIttev3+vcRXTu
Fkc6yCZscO5YrtgM4SlWndsTTJzbZpk4zbf0EzAGue85ZTPCnodSw2IDX+yanLU9
R/3/Aa/IB2QKZW5kc3RyZWFtCmVuZG9iago1IDAgb2JqCjQwNTgKZW5kb2JqCjIg
MCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAzIDAgUiAvUmVzb3VyY2VzIDYg
MCBSIC9Db250ZW50cyA0IDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQo+Pgpl
bmRvYmoKNiAwIG9iago8PCAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAv
SW1hZ2VDIC9JbWFnZUkgXSAvQ29sb3JTcGFjZSA8PCAvQ3MxIDcgMCBSCj4+IC9F
eHRHU3RhdGUgPDwgL0dzMSAxOCAwIFIgL0dzMiAxOSAwIFIgPj4gL0ZvbnQgPDwg
L1RUMiA5IDAgUiAvVFQ0IDExIDAgUgovVFQ2IDE1IDAgUiAvVFQ4IDE3IDAgUiA+
PiAvWE9iamVjdCA8PCAvSW0xIDEyIDAgUiA+PiA+PgplbmRvYmoKMTIgMCBvYmoK
PDwgL0xlbmd0aCAxMyAwIFIgL1R5cGUgL1hPYmplY3QgL1N1YnR5cGUgL0ltYWdl
IC9XaWR0aCA5MCAvSGVpZ2h0IDQ1IC9JbnRlcnBvbGF0ZQp0cnVlIC9Db2xvclNw
YWNlIDIwIDAgUiAvSW50ZW50IC9QZXJjZXB0dWFsIC9CaXRzUGVyQ29tcG9uZW50
IDggL0ZpbHRlciAvRmxhdGVEZWNvZGUKPj4Kc3RyZWFtCngB7VeLcewgDFQLtEAL
bkEtpAVauBZogRbSAi3QAi3QAtkV9guX2ON8zm/mvTnNJJaFvJJXC55L6TLrF1lK
FwH3J/LM7JONv89GLqiZa+8txszyBYFKL8MYoDHBrjE2c0qMI5TivDnmCQbXepHa
i/MqAU+p9h4FjsD8iijR8IKod2zltjptceqWUYwZM3LFQwGI6gmIJt+RY6+OtWAD
OUvqzaNywb05kT2tZZk3IwOyArDZsrvdI1uZd+Sbgx+l9WgO3mN5QeRlYYrZHXKW
BV1ktmtAc8+FpWijLS5Zpjl/4sYd7z703JWge8jgWVcKPyMXJbzFD5FtYQ85ZDcG
t9dzjYoxfwG5C97byJ7ZCBir2eiZFEMWg2tzlBSTzdXueB4S6wFqCpg0Hiht4QNA
KxCDmYQM4VfIslAuw0GJhAT+bbaH3BS0MqV6EdMs+6TEaNQ23ORETL10jMUbFlZl
Mu8emRFayeu48uaM+Py/2ZZFpG27sm6Ope0jzwg/9f9HZB51jWQXnncVPpUB4+3x
EJBwxganbluHeoFEMi9UCa92DLDMnn0deYiOVV4pybFh9iDX2E+QDfUByDEGvrV6
+9Cw5ySv6Fm3T8lB3+c9qy6G7FRBgvHM81S8qo3yAPgbE9x4jomFruHZ83R4AM+b
6hbot5oC+cXrPPIerOeMgxNH36/1fDSf8/iZNs4RjjKeyDMzTzb+fTYu+9n9BrN3
AHAKZW5kc3RyZWFtCmVuZG9iagoxMyAwIG9iago1NDQKZW5kb2JqCjE4IDAgb2Jq
Cjw8IC9UeXBlIC9FeHRHU3RhdGUgL0FBUEw6QUEgZmFsc2UgPj4KZW5kb2JqCjE5
IDAgb2JqCjw8IC9UeXBlIC9FeHRHU3RhdGUgL0FBUEw6QUEgdHJ1ZSA+PgplbmRv
YmoKMjEgMCBvYmoKPDwgL0xlbmd0aCAyMiAwIFIgL04gMyAvQWx0ZXJuYXRlIC9E
ZXZpY2VSR0IgL0ZpbHRlciAvRmxhdGVEZWNvZGUgPj4Kc3RyZWFtCngBnZZ3VFPZ
FofPvTe90BIiICX0GnoJINI7SBUEUYlJgFAChoQmdkQFRhQRKVZkVMABR4ciY0UU
C4OCYtcJ8hBQxsFRREXl3YxrCe+tNfPemv3HWd/Z57fX2Wfvfde6AFD8ggTCdFgB
gDShWBTu68FcEhPLxPcCGBABDlgBwOFmZgRH+EQC1Py9PZmZqEjGs/buLoBku9ss
v1Amc9b/f5EiN0MkBgAKRdU2PH4mF+UClFOzxRky/wTK9JUpMoYxMhahCaKsIuPE
r2z2p+Yru8mYlybkoRpZzhm8NJ6Mu1DemiXho4wEoVyYJeBno3wHZb1USZoA5fco
09P4nEwAMBSZX8znJqFsiTJFFBnuifICAAiUxDm8cg6L+TlongB4pmfkigSJSWKm
EdeYaeXoyGb68bNT+WIxK5TDTeGIeEzP9LQMjjAXgK9vlkUBJVltmWiR7a0c7e1Z
1uZo+b/Z3x5+U/09yHr7VfEm7M+eQYyeWd9s7KwvvRYA9iRamx2zvpVVALRtBkDl
4axP7yAA8gUAtN6c8x6GbF6SxOIMJwuL7OxscwGfay4r6Df7n4Jvyr+GOfeZy+77
VjumFz+BI0kVM2VF5aanpktEzMwMDpfPZP33EP/jwDlpzcnDLJyfwBfxhehVUeiU
CYSJaLuFPIFYkC5kCoR/1eF/GDYnBxl+nWsUaHVfAH2FOVC4SQfIbz0AQyMDJG4/
egJ961sQMQrIvrxorZGvc48yev7n+h8LXIpu4UxBIlPm9gyPZHIloiwZo9+EbMEC
EpAHdKAKNIEuMAIsYA0cgDNwA94gAISASBADlgMuSAJpQASyQT7YAApBMdgBdoNq
cADUgXrQBE6CNnAGXARXwA1wCwyAR0AKhsFLMAHegWkIgvAQFaJBqpAWpA+ZQtYQ
G1oIeUNBUDgUA8VDiZAQkkD50CaoGCqDqqFDUD30I3Qaughdg/qgB9AgNAb9AX2E
EZgC02EN2AC2gNmwOxwIR8LL4ER4FZwHF8Db4Uq4Fj4Ot8IX4RvwACyFX8KTCEDI
CAPRRlgIG/FEQpBYJAERIWuRIqQCqUWakA6kG7mNSJFx5AMGh6FhmBgWxhnjh1mM
4WJWYdZiSjDVmGOYVkwX5jZmEDOB+YKlYtWxplgnrD92CTYRm40txFZgj2BbsJex
A9hh7DscDsfAGeIccH64GFwybjWuBLcP14y7gOvDDeEm8Xi8Kt4U74IPwXPwYnwh
vgp/HH8e348fxr8nkAlaBGuCDyGWICRsJFQQGgjnCP2EEcI0UYGoT3QihhB5xFxi
KbGO2EG8SRwmTpMUSYYkF1IkKZm0gVRJaiJdJj0mvSGTyTpkR3IYWUBeT64knyBf
JQ+SP1CUKCYUT0ocRULZTjlKuUB5QHlDpVINqG7UWKqYup1aT71EfUp9L0eTM5fz
l+PJrZOrkWuV65d7JU+U15d3l18unydfIX9K/qb8uAJRwUDBU4GjsFahRuG0wj2F
SUWaopViiGKaYolig+I1xVElvJKBkrcST6lA6bDSJaUhGkLTpXnSuLRNtDraZdow
HUc3pPvTk+nF9B/ovfQJZSVlW+Uo5RzlGuWzylIGwjBg+DNSGaWMk4y7jI/zNOa5
z+PP2zavaV7/vCmV+SpuKnyVIpVmlQGVj6pMVW/VFNWdqm2qT9QwaiZqYWrZavvV
LquNz6fPd57PnV80/+T8h+qwuol6uPpq9cPqPeqTGpoavhoZGlUalzTGNRmabprJ
muWa5zTHtGhaC7UEWuVa57VeMJWZ7sxUZiWzizmhra7tpy3RPqTdqz2tY6izWGej
TrPOE12SLls3Qbdct1N3Qk9LL1gvX69R76E+UZ+tn6S/R79bf8rA0CDaYItBm8Go
oYqhv2GeYaPhYyOqkavRKqNaozvGOGO2cYrxPuNbJrCJnUmSSY3JTVPY1N5UYLrP
tM8Ma+ZoJjSrNbvHorDcWVmsRtagOcM8yHyjeZv5Kws9i1iLnRbdFl8s7SxTLess
H1kpWQVYbbTqsPrD2sSaa11jfceGauNjs86m3ea1rakt33a/7X07ml2w3Ra7TrvP
9g72Ivsm+zEHPYd4h70O99h0dii7hH3VEevo4bjO8YzjByd7J7HTSaffnVnOKc4N
zqMLDBfwF9QtGHLRceG4HHKRLmQujF94cKHUVduV41rr+sxN143ndsRtxN3YPdn9
uPsrD0sPkUeLx5Snk+cazwteiJevV5FXr7eS92Lvau+nPjo+iT6NPhO+dr6rfS/4
Yf0C/Xb63fPX8Of61/tPBDgErAnoCqQERgRWBz4LMgkSBXUEw8EBwbuCHy/SXyRc
1BYCQvxDdoU8CTUMXRX6cxguLDSsJux5uFV4fnh3BC1iRURDxLtIj8jSyEeLjRZL
FndGyUfFRdVHTUV7RZdFS5dYLFmz5EaMWowgpj0WHxsVeyR2cqn30t1Lh+Ps4grj
7i4zXJaz7NpyteWpy8+ukF/BWXEqHhsfHd8Q/4kTwqnlTK70X7l35QTXk7uH+5Ln
xivnjfFd+GX8kQSXhLKE0USXxF2JY0muSRVJ4wJPQbXgdbJf8oHkqZSQlKMpM6nR
qc1phLT4tNNCJWGKsCtdMz0nvS/DNKMwQ7rKadXuVROiQNGRTChzWWa7mI7+TPVI
jCSbJYNZC7Nqst5nR2WfylHMEeb05JrkbssdyfPJ+341ZjV3dWe+dv6G/ME17msO
rYXWrlzbuU53XcG64fW+649tIG1I2fDLRsuNZRvfbore1FGgUbC+YGiz7+bGQrlC
UeG9Lc5bDmzFbBVs7d1ms61q25ciXtH1YsviiuJPJdyS699ZfVf53cz2hO29pfal
+3fgdgh33N3puvNYmWJZXtnQruBdreXM8qLyt7tX7L5WYVtxYA9pj2SPtDKosr1K
r2pH1afqpOqBGo+a5r3qe7ftndrH29e/321/0wGNA8UHPh4UHLx/yPdQa61BbcVh
3OGsw8/rouq6v2d/X39E7Ujxkc9HhUelx8KPddU71Nc3qDeUNsKNksax43HHb/3g
9UN7E6vpUDOjufgEOCE58eLH+B/vngw82XmKfarpJ/2f9rbQWopaodbc1om2pDZp
e0x73+mA050dzh0tP5v/fPSM9pmas8pnS8+RzhWcmzmfd37yQsaF8YuJF4c6V3Q+
urTk0p2usK7ey4GXr17xuXKp2737/FWXq2euOV07fZ19ve2G/Y3WHruell/sfmnp
te9tvelws/2W462OvgV95/pd+y/e9rp95Y7/nRsDiwb67i6+e/9e3D3pfd790Qep
D14/zHo4/Wj9Y+zjoicKTyqeqj+t/dX412apvfTsoNdgz7OIZ4+GuEMv/5X5r0/D
Bc+pzytGtEbqR61Hz4z5jN16sfTF8MuMl9Pjhb8p/rb3ldGrn353+71nYsnE8GvR
65k/St6ovjn61vZt52To5NN3ae+mp4req74/9oH9oftj9MeR6exP+E+Vn40/d3wJ
/PJ4Jm1m5t/3hPP7CmVuZHN0cmVhbQplbmRvYmoKMjIgMCBvYmoKMjYxMgplbmRv
YmoKNyAwIG9iagpbIC9JQ0NCYXNlZCAyMSAwIFIgXQplbmRvYmoKMjMgMCBvYmoK
PDwgL0xlbmd0aCAyNCAwIFIgL04gMSAvQWx0ZXJuYXRlIC9EZXZpY2VHcmF5IC9G
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
4cjgMPiMJYxqRiPjOuOpqqKqpSpbdY5qsWqV6hHVK6oDaopqVmoBaly1xWrVas1q
t9SG1DXVndSj1HPUV6rvV7+g3qdB07DSCNLga5Rp7NY4o/FQk9A01wzQ5Gl+prlH
85xmrxZVy1qLo5WpVan1jdZlrUFtDe1p2onahdrV2se1u3UIHSsdjk62zmqdwzpd
Om91jXTZugLdFboNutd1X+lN0vPXE+hV6B3U69R7q8/UD9LP0l+rf0z/vgFpYGsQ
Y7DAYIfBOYOBSVqTvCbxJlVMOjzpJ0Pc0NYw1nCh4W7DDsMhI2OjECOJ0RajM0YD
xjrG/saZxhuMTxj3m2ia+JqITDaYnDR5zNRmspnZzM3Ms8xBU0PTUFOZ6S7Ty6bD
ZtZmCWalZgfN7psrmbubp5tvMG8zH7QwsZhhUWJxwOInS0VLd0uh5SbLdstXVtZW
SVbLrY5Z9VnrWXOsi60PWN+zodv42cy3qbG5OZk62X1y1uTtk6/a4rYutkLbatsr
dridq53IbrvdNXuKvYe92L7G/paDigPbocDhgEOPo45jhGOp4zHHp1MspqRMWTul
fcp7lgsrG37d7jppOIU5lTq1OP3hbOvMc652vjmVPjV46pKpTVOfTbObJpi2Y9pt
F02XGS7LXdpc/nR1c5W6Nrj2u1m4pbltc7vlruUe7b7S/bwHxWO6xxKPVo83nq6e
+Z6HPX/3cvDK8trv1edt7S3w3uP90MfMh+uzy6fbl+mb5vuVb7efqR/Xr8bvZ39z
f75/rf8j9mR2Jrue/XQ6a7p0+tHprwI8AxYFnAokAkMCKwIvB2kEJQRtDXoQbBac
EXwgeDDEJWRhyKlQSmh46NrQWxwjDo9TxxkMcwtbFHY2XCU8Lnxr+M8RthHSiJYZ
+IywGetn3Iu0jBRHHosCUZyo9VH3o62j50d/H0ONiY6pjvk11im2JLY9TjNubtz+
uJfx0+NXx99NsEmQJbQlqiamJtYlvkoKTFqX1D1zysxFMy8lGySLkptSaCmJKbUp
Q7OCZm2c1Zvqklqe2jXbenbh7AtzDOZkzzk+V3Uud+6RNEpaUtr+tHfcKG4Nd2ge
Z962eYO8AN4m3hO+P38Dv1/gI1gneJTuk74uvS/DJ2N9Rr/QT1glHBAFiLaKnmWG
Zu7MfJUVlbU360N2UvbBHIWctJxmsYY4S3w21zi3MPeaxE5SLume7zl/4/xBabi0
Ng/Lm53XlK8F/8HskNnIPpf1FPgWVBe8XpC44EiheqG4sKPItmhF0aPi4OKvF5IL
eQvbSkxLlpX0LGIv2rUYWzxvcdsS8yVlS3qXhizdt0xpWdayH0tZpetKX3yW9FlL
mVHZ0rKHn4d8fqCcUS4tv7Xca/nOL8gvRF9cXjF1xZYV7yv4FRcrWZVVle9W8lZe
/NLpy81ffliVvuryatfVO9ZQ14jXdK31W7tvnfq64nUP189Y37iBuaFiw4uNczde
qJpWtXOT0ibZpu7NEZubtlhsWbPl3Vbh1s7q6dUHtxluW7Ht1Xb+9us7/Hc07DTa
Wbnz7Veir27vCtnVWGNVU7Wburtg9697Eve0f+3+dV2tQW1l7Z97xXu798XuO1vn
Vle333D/6gP4AdmB/vrU+qvfBH7T1ODQsOugzsHKQ+CQ7NDjb9O+7TocfrjtiPuR
hu8sv9t2VPNoRSPWWNQ4eEx4rLspuelac1hzW4tXy9HvHb/f22raWn1c+/jqE0on
yk58OFl8cuiU5NTA6YzTD9vmtt09M/PMzbMxZy+fCz93/ofgH860s9tPnvc533rB
80LzRfeLxy65XmrscOk4+qPLj0cvu15uvOJ2pemqx9WWa97XTlz3u376RuCNH25y
bl7qjOy81pXQdftW6q3u2/zbfXey7zz7qeCn4btL4SW+4r7a/aoHhg9q/jX5Xwe7
XbuP9wT2dPwc9/Pdh7yHT37J++Vdb9mv9F+rHpk8qutz7mvtD+6/+njW494nkifD
A+W/qf+27anN0+9+9/+9Y3DmYO8z6bMPf6x8rv9874tpL9qGoocevMx5Ofyq4rX+
631v3N+0v016+2h4wTvau81/Tv6z5X34+3sfcj58+DctXfAcCmVuZHN0cmVhbQpl
bmRvYmoKMjQgMCBvYmoKMzM2NwplbmRvYmoKMjAgMCBvYmoKWyAvSUNDQmFzZWQg
MjMgMCBSIF0KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9NZWRpYUJv
eCBbMCAwIDYxMiA3OTJdIC9Db3VudCAxIC9LaWRzIFsgMiAwIFIgXSA+PgplbmRv
YmoKMjUgMCBvYmoKPDwgL1R5cGUgL0NhdGFsb2cgL1BhZ2VzIDMgMCBSID4+CmVu
ZG9iago5IDAgb2JqCjw8IC9UeXBlIC9Gb250IC9TdWJ0eXBlIC9UcnVlVHlwZSAv
QmFzZUZvbnQgL1hDU1VLUStDYW1icmlhIC9Gb250RGVzY3JpcHRvcgoyNiAwIFIg
L1RvVW5pY29kZSAyNyAwIFIgL0ZpcnN0Q2hhciAzMyAvTGFzdENoYXIgNjMgL1dp
ZHRocyBbIDU2MyA1MzEgODMyCjU1NiA0ODggNTU4IDUwNCAyMjAgNDk2IDMzOCA0
MTQgNDg4IDYyMyA1NTUgNDMwIDIwNSAyNzggNTkzIDUzOCAzMjQgNTY4IDU1Mgoz
MDMgNDgzIDY4MSA0NDEgMjcxIDU1MiA1MjQgNTQ3IDI4NiBdID4+CmVuZG9iagoy
NyAwIG9iago8PCAvTGVuZ3RoIDI4IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+
PgpzdHJlYW0KeAFdkstu2zAQRff6Ci7TRSBa9CMBBAFFggBepA3q9gMkcWQIiCVB
lhf++5zLuCnQxVkccYacSzF/2j/vh35x+ds8tgdbXNcPcbbzeJlbc40d+yFbFS72
7XKz9K091VOW03y4nhc77YdudGWZOZf/ouW8zFd39z2OjX3Tt59ztLkfju7uz9Mh
fTlcpundTjYszmdV5aJ1bPdaTz/qk7k8td7vI+v9cr2n61/F7+tkjonoWH2O1I7R
zlPd2lwPR8tK76vy5aXKbIj/LYVbR9PdSotVVQrv16HKyqJAwfttJw0ooFG6RsH7
nZduUGB1Jd2igJp0hwLFj9IHFLz3SR9R8H6Tzq1RoHit4gYFtJC2KLDzRhpRYOZ0
rqHAaurtUKBXOwfuQnjPDihZBcUaI5BVMIZ6A1kFWkvJKjgoFZM1pLwbxQ9kFWz1
ICWrQLdSsgrGSKtkDSnvWpcTyCooTkOSNaS82zQkWUPKu1PeQFZBcSMlq0B1OYGs
goDcBr/877/V39cr/XpV7WWeeVDpKae3pjfUD/b12qdx0gaJD1BK0hgKZW5kc3Ry
ZWFtCmVuZG9iagoyOCAwIG9iago0MTYKZW5kb2JqCjI2IDAgb2JqCjw8IC9UeXBl
IC9Gb250RGVzY3JpcHRvciAvRm9udE5hbWUgL1hDU1VLUStDYW1icmlhIC9GbGFn
cyA0IC9Gb250QkJveCBbLTE0NzUgLTI0NjQgMjg2NyAzMTE3XQovSXRhbGljQW5n
bGUgMCAvQXNjZW50IDk1MCAvRGVzY2VudCAtMjIyIC9DYXBIZWlnaHQgNjY3IC9T
dGVtViAwIC9YSGVpZ2h0CjQ2NyAvQXZnV2lkdGggNjE1IC9NYXhXaWR0aCAyOTE5
IC9Gb250RmlsZTIgMjkgMCBSID4+CmVuZG9iagoyOSAwIG9iago8PCAvTGVuZ3Ro
IDMwIDAgUiAvTGVuZ3RoMSA0NTc2IC9GaWx0ZXIgL0ZsYXRlRGVjb2RlID4+CnN0
cmVhbQp4AW1XCXBT17k+594ryZtky1quZNlC+7WtfbNso82SJe8L3gAbjBcwNtjY
YBtsQhIDSYBmaB8lmQSmTUvBTNtpp23SdJlpKU3T1E2atknfSztt2mneQEIgaaDT
Thowl/efK+MAL3dsSecu5/++///+5c7smd2GstACohEanhicQsKB/wRfPdvH50cy
a2oGofzm0W2DWzNrtAzfFaNwIrPGAfi2jE7MzK2sN8D3wvjk8Mp1ygPrxMTg3Mr+
6G1YG3YNTmzL3C+/SNb4zjRCeADl7MCwrM5cWv18cI3iq5eEHxhjJEbkydWDLAzo
InKiZ+AShQqQGz2BUPY5eSnwxcLN4ndHCv/zzt+25If/jXRZwqM/fvfZCPnxxnH8
2r8CHzSqb2g+gmU27JA5YF/Jab4KIbb3X4Hb59Q37jcLNxlEtegC/gVCzDISMwto
H/UsmhftQbPMk2ie/g+aYi6gBNOC+ukrqJ0ZRB76CBpjptAY/R4apcZRG7MDxakq
1Mn4UIxyoJj46/B7H/zH4L5p1EC3oU56CvVTLyIrsxPWf0Msk4WU+BzSUA3AGTy5
gioPuNfD2ojWAGs1UiIW5SAVKoHrElSENEgGzKRIi/RIDlrIRgw8UYDyUTESoTyk
QDpUiHLh6czRjtrRk+jn6BquwnP4Av6IUlOD1CL1R9pCb6Sfpa8yKmaaeVakEY2L
Touuiq3icfEp8V8kHsk+yQnJediEQRfg4wlRFypFDuRBoB4cDESpUJQOBmxmk4yS
mINR7PfpKZUSFjK6BLMqcxDLjXLyT4XE6nILa9Pl10QNHos2eyB8LJkejhbnW8IO
g00lKfwvvHxbTA8uV+L31GpreZDTuv1V5qYOpcWnP6R3lfjTZbZoJO00OrjSYvGu
M2f4S8zpWyPMxze/Bago4I+Y90XbgLMJHBeMUoDLjY0SGVYp1awKzuAQ9mM9xaqw
kaaLfV5NQb6Vd5mKCiIxvruyk8NnnsNdGmvAufwC/toFb47GbjG1eQ8ONTavCVdm
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
tCjl7/8yvbTw1tu7XuWPHt6f7F9bVDNVP3+w4N/XFy9NfvL++Uu78c3f/rVm14m2
ky/1vUn2buA7mFzwQSmqBD1BcXsw04E3UQYxBgWZhhtI5ykQJIGnslm7hx+1ODVZ
TB7LOa9FpPnR+pa60sXvbf3ZY41zPk2ks3Z+/+XKde1G/R9q4lYNxCFHVZaupnvr
I6VFhdnB7LNMrMpW8PE/Ft/ZrcVbBkZrDL9+GR81tzaUk0wFjdJO4M4JGgXbdwui
IMgHgwTiC/VPpKrduzUVbktdQqv2+/mJewSlppMt5eJ3K7zl7WkP/7W+lAGm5ntD
EMghVvvB4zlglRSLzMh83wwFZcJPugCZ4O+buKg7A+pwc6h9i61928hkrGLoSHvX
c01Duh2bLakKQ2nXjr5dsY1f3514aDP1TjhV3FTjCgfsjsah2rbxWr1W+camznxz
2OmPB522+qFkx3xcqgA01jvXqZeYF0j0FVE65FcZVUZSkzPdmIQFGobVFzUrcz+P
k/xPCxyVjtK0yVn3aO3BR56iP5dVGtvS9/E2Pjk4XVNsXFORip46S8HAilED9GAr
/RPSf2BqE7YETpkxQ1iv9GKwAdMRaQhcAy4ptCSqbekeq1imMHO4RKwsr7gcEed3
PtPct7daao3SP+Hp2f3Rcn1Toxfvq6qG6TzHe7u7pXal+/Z21X/hEN7fFbMWAAYW
IvwrwBACQFCG7ynCikwRJnXZje95S6JCCui+pFSTiYClsg6pikwWXGdrq/rdJW8r
x+/qlClOnJYrrKX888ZgyPn7/3EEHGp8tE2lpmoWdX4dq5fAG0a8judfT6TzQZIB
lU376pLayurMDAjCUhXCFLaEK4qhPuf5WBe4HiMl38jkAFKYzURkKlhVQQgahNA5
4MVKzerwpywoCZUVGn24J5TamGcx6d3+lJ2/ojPaOPyM21YolT2/JFe4q/Ferry8
pOPA6VbpK2UGtnJmI3WjoVoP0sxVGYt01Ryfi/9emiyxO+DVJMtYR9oW0vAf4CS6
AlUBWYX0lHBEjxwOyjxjmyr8LqXkSro2PTOdinha4A2xEbL9Ijx4EmZoGt7REabN
tIK8AJ+sGfT+eknUvdxEv3jr5JUrCA4Mb+eY/IC3VhlCG5Kd3U3r7MnBiaE9Y4P/
BxWLwUYKZW5kc3RyZWFtCmVuZG9iagozMCAwIG9iagozNDU2CmVuZG9iagoxMSAw
IG9iago8PCAvVHlwZSAvRm9udCAvU3VidHlwZSAvVHJ1ZVR5cGUgL0Jhc2VGb250
IC9ZUFBSUForQ2FtYnJpYS1Cb2xkIC9Gb250RGVzY3JpcHRvcgozMSAwIFIgL1Rv
VW5pY29kZSAzMiAwIFIgL0ZpcnN0Q2hhciAzMyAvTGFzdENoYXIgNDAgL1dpZHRo
cyBbIDYxNCA1OTcgNTY5CjYwNCA1MzEgNTUxIDUzNSA1MjUgXSA+PgplbmRvYmoK
MzIgMCBvYmoKPDwgL0xlbmd0aCAzMyAwIFIgL0ZpbHRlciAvRmxhdGVEZWNvZGUg
Pj4Kc3RyZWFtCngBXZHNboMwEITvfoo9pocIQwPJASFVqSJx6I9K+wBgL8hSMZYx
B96+Y5KmUg9z+HY9q9l1cq6fa2sCJe9+Ug0H6o3Vnudp8Yqp48FYkWakjQo32mpq
bJ1IYG7WOfBY236ishREyQcsc/Ar7Z701PFDrL15zd7YgXZf52arNItz3zyyDSRF
VZHmHuNeWvfajkzJZt3XGn0T1j1cfy8+V8eERHCk10hq0jy7VrFv7cCilLIqL5dK
sNX/WqeroetvL7O0KqOkzGUlyiwDQlIWp4iPQAjYRzwAISBHzIEQMI9YACEpD0XE
IxBCN414AkJSHjEZwX4jxIzxlvfd1eI91t4Ovl0kbmos3//ETS4O2PQDeqCF9gpl
bmRzdHJlYW0KZW5kb2JqCjMzIDAgb2JqCjI3NgplbmRvYmoKMzEgMCBvYmoKPDwg
L1R5cGUgL0ZvbnREZXNjcmlwdG9yIC9Gb250TmFtZSAvWVBQUlBaK0NhbWJyaWEt
Qm9sZCAvRmxhZ3MgNCAvRm9udEJCb3gKWy0xMTEwIC0yOTkgMTM3MiAxMDQ3XSAv
SXRhbGljQW5nbGUgMCAvQXNjZW50IDk1MCAvRGVzY2VudCAtMjIyIC9DYXBIZWln
aHQKNjY3IC9TdGVtViAwIC9YSGVpZ2h0IDQ4NCAvQXZnV2lkdGggNjAwIC9NYXhX
aWR0aCAxMzgwIC9Gb250RmlsZTIgMzQgMCBSID4+CmVuZG9iagozNCAwIG9iago8
PCAvTGVuZ3RoIDM1IDAgUiAvTGVuZ3RoMSAxNzUyIC9GaWx0ZXIgL0ZsYXRlRGVj
b2RlID4+CnN0cmVhbQp4AVVVfWxTVRS/973X160f69r1tStrSz9f13Z7Heu6Mthe
x9vYug/CVnAIA7oC+4rbYARxm9PNqciMCjpRBGICaoKRqH8AaiIkGvz4xwQUon8Y
JUowuJgQI6Bse/O89zqJt3k993fvfff8zjm/0+7b+2g3ykGTiERo52BmD5IHHgdT
3Dsw2pPFHyNE/d3XndmlYDQPtrIPFrL7FWB9fYP7RrL4YQkP7N65tP82YPNgZiR7
P/oRsGsoM9itnKc/BFuszJXvfDA4u3D6xEF6aS4t6bLr1Vm7mB1Z+MBIL+WigxDf
NKIRgfJRBEFE5Le6jRAvlh3QN3ueT79+J22ovoO0OfK7n9w8WiNNrryIL99bvnBC
M5fTBWdz4QZlwL3qY2IVQloN7M9o5v6jmj2AclX16CLVj7qoW/AkUTWVQJ3Ul2gV
dRU1US/BvALYSCEqgemA3zLAbuBKIBVSA6ZgjwQsjTZ0CH2DbXg9fgv/RfiIcdi9
CDU5oNoIeStBZQgqgGMVPBHnyVgF6/XkEWpvjMfRcifBmAHkkQ5sZbwxbHQbpYeI
05aQz8oWGdbwrjKfLbererquYSdvN/iqS1wsozYdxvMLNJmZX4l/s1j8oVjAFolW
eVtSZl+5c8rJOaINQZavaSh1lwSK7fTQyZPiDerYXA917/4ZYIVRF/ALqB5CYYT8
ZidpZdwx4Gas4IhAzG30ckQYG6PlPI5HFUBgOt8a9C7c9IcZWsWEWfKraTdXu+6z
yUjUrR0e1nnKucm5WNzDGFWCkFsYrC0jt0Vqi20aQfw8XRcQSUc9L7Ym1toR5FDy
/iZ4d6KQ7J/4v/9yC2QFez2BmEQhVsHBXE1gjTVc+oAAsXZhfv/10xm+Y9f+qqqh
jgb2vhB3W3IEQWMNJsrI7Yr3c58+e6mbGq4a7+97vIIA39WLt6l88jZUJgq+A5If
Dnz4/IqfPCyVhoTSYMaoZIbMw4zZIlMh3jGkjm/qmFiD3ZgNCRxXV6m/sHXsse2R
0ZeTtN7sKBZfKDx+pL6aS5U9rWpLJvY0zbxrSW/rDro2rz8fLHHoag9PiGNC0svo
NQL+gRro49esSHHAq3PxNvkP8LIhF/CSaLEgGUkj2GqBj9sJ88o4KSWDVpM/93w9
dWt29KeZzukdLrbAjBcO4Imp1rHGC1SybV1n7vmBLYtzp2ZHQy2xRPuG/efeq0ri
ljdeOzEj6XoV5P851VG0GoDiYinWGE/IKgCNyvFTcmUoaY0MxPxRI77ceahlaCRO
6hi2SCyKePX65SuK2Q1xktaaPHbR4vQU5FGkxsyGMPMEubW9rv3oqDhTso5zmNWC
oA01p7Fq1+4aZ6SdE8dX1riXWUywri6wBdbWkrqO9rjbnCPkLXwh8WwCnkcgJ9DN
QZylRi1Rg44B0Sp0JWpqK0/IHSWXjToiFnE+Pa232n12NrVS54+IjjK/XlUQKMOm
Jw06fntvVWqgziEHImjDTWmsbexcFbDpIhsi4kS6OawVBH0omcbHmxvDRZr6nMNk
POGPbJnqEF9RwlGqRkWBoQG0jFSykiQWsoCxLBpC6XhMrJ65NtL8zEeP/Hl37Bfx
bLor1hg2pbfVp9j83l8/OHBpsmbx7vuzewnD1e8qew5t/v5axxnIAPwOUS7yulQx
XOCU+6RSEmoEq2VVyjnACUxyFDQuQ4NQl+O41DSshEHNxKu/u6MrHKKNp3Wm4X6P
0RcQJ8Kb+CuzFpenyKrFNxImc29PYUHQi58obU0SPvFspMYDfaQu1THMslNPBdnC
Qg8FXd3Q+AdudQX9TC6G1ISNfvvMhDNosXsJKGxiE4KBkQkeadCoAKHNbW2pti3h
uszgjr39mVJh94D0J/Uv0YljsQplbmRzdHJlYW0KZW5kb2JqCjM1IDAgb2JqCjEz
OTcKZW5kb2JqCjE1IDAgb2JqCjw8IC9UeXBlIC9Gb250IC9TdWJ0eXBlIC9UcnVl
VHlwZSAvQmFzZUZvbnQgL09PUk5XWitDYWxpYnJpIC9Gb250RGVzY3JpcHRvcgoz
NiAwIFIgL1RvVW5pY29kZSAzNyAwIFIgL0ZpcnN0Q2hhciAzMyAvTGFzdENoYXIg
NTUgL1dpZHRocyBbIDI1MiA2NDYgNTY3CjY2MiA1MzMgNDg4IDIyNiAyNTIgNjE1
IDU3OSA0ODcgNTQ0IDQyMCA0NTkgNjIzIDUxNyA1NDMgNjQyIDY3MyA0ODcgNTE5
IDYzMQo2ODIgXSA+PgplbmRvYmoKMzcgMCBvYmoKPDwgL0xlbmd0aCAzOCAwIFIg
L0ZpbHRlciAvRmxhdGVEZWNvZGUgPj4Kc3RyZWFtCngBXZLNTsMwEAbveQof4YDi
xi1QKYqEQJV64EcUHiC1N1Uk6kRueujbM+sWkDjMYfJ5nV3b5eP6aR37yZRvafAb
mUzXx5DkMByTF7OVXR+LWWVC76eL5W9+345FSfHmdJhkv47dYOq6MKZ8p+QwpZO5
egjDVq7122sKkvq4M1efj5v8ZXMcxy/ZS5yMLZrGBOnY7rkdX9q9mDKX3qwDeT+d
bqj6W/FxGsXQERWzc0t+CHIYWy+pjTspamuberVqConhX1S5c8W2uyytZk2tWDtf
NkVdVSigoupQsHZxqzpHgbRTXaCAOtVbFNCF6h0K1lZW9R4FNO+8RIHFc01bFNCZ
6hYF/ptTjwJppWlAAfWqggKLcxsdCqT3pI6zUEi1DcesCqpbOWZVUO3ZMauCahuO
WRVUD8cxq4LmnZnVnee905RZFQbkrDj6nzPWW9DX8nu7/pgSF5ufVL5zvcs+yu+r
G4dRN8h8A4bUtnsKZW5kc3RyZWFtCmVuZG9iagozOCAwIG9iagozNjQKZW5kb2Jq
CjM2IDAgb2JqCjw8IC9UeXBlIC9Gb250RGVzY3JpcHRvciAvRm9udE5hbWUgL09P
Uk5XWitDYWxpYnJpIC9GbGFncyA0IC9Gb250QkJveCBbLTUwMyAtMzEzIDEyNDAg
MTAyNl0KL0l0YWxpY0FuZ2xlIDAgL0FzY2VudCA5NTIgL0Rlc2NlbnQgLTI2OSAv
Q2FwSGVpZ2h0IDYzMiAvU3RlbVYgMCAvWEhlaWdodAo0NjQgL0F2Z1dpZHRoIDUy
MSAvTWF4V2lkdGggMTMyOCAvRm9udEZpbGUyIDM5IDAgUiA+PgplbmRvYmoKMzkg
MCBvYmoKPDwgL0xlbmd0aCA0MCAwIFIgL0xlbmd0aDEgMjE5MjggL0ZpbHRlciAv
RmxhdGVEZWNvZGUgPj4Kc3RyZWFtCngB1Xt5WJNX2v55s5OFJJBAIEACgQCGRQEF
lEqURXFhjwKKgqCi4r6vpbXb0NrVsXtrp3u1bQguqG21HTvtLN3tdKadduxMp9OZ
qd2XGVvgd5/3yUHsfP1+f3zXd13zBe7c91lzznOes7wnsGHdxsXMwHqYko3tWNm+
hsmv4utAlR2bNrgp7C1nTP3UkjVLV1I4C2TyLe3euoTCE3WMOXu6Frd3Uph9D57Q
hQgKSwXg1K6VG7ZQuJhX0Na9uiOcXnwG4byV7VvCn8/+gLB7VfvKxZQ/cA0Pr1m3
OJwuNaG6f5RQIhsOv8LBCyRBOlQTWaykYzqmYBaWy65mLGqCYjxTMQk/jGny8++L
uHtwobnkaxaHbuB14h87fsP5zX29S747P9gT8bFuAoIRqIFeKKe9Z/BtxvT7vzt/
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
/kuY9az1M6vSftLyikVhNktm87BZ4Tej8eZIV6SCvw1HKv2R4worzSaXScHfhk3K
GL8JMdyU6cbaxkqzwWVQBEoNNQaF31BaVuk3ZI+t/Ld+9vN+0if7NixY74Pc4JN/
EWqWNvIgXkjB7/oNCPMfEMKMp/z4i7Ih38L1eMnVUPU/XuT/QIr0f6CN/+FN7GOY
Ik1ThhVX4LvM3cDlwGVAD3ApsAvYCewAtgPbgK3AFmAzsAnYCGwA1gNrgTXAamAV
sBLoBlYAy4FlQBewFFgCLAY6gQ5gEdAOtAELgQVAKzAfmAe0AM1AEzAXmAMEgEag
AagH6oBaoAaoBmYDs4CZwAygCpgOTAMqgQqgHCgDpgJTAD9QCkwGLgFKgEnARKAY
KAIKgQnAeKAAyAfygHHAWCAXyAGygSzAB4wBMoEMIB3wAmlAKuABUoBkwA24gCQg
EUgAnEA8EAc4gFggBrADNiAaiAKsgAUwA5GACTACBkAPRAA6QAtoADWgmjKMdyWg
ACSAsU4JcdIQMAh8D3wHnAf+BfwT+Bb4Bvga+Ar4EvgC+Bz4DPgU+AQ4B3wM/AP4
O/A34CPgr8CHwF+AD4A/A38C3gfOAn8E3gPeBf4AvAO8Dfwe+B3wFvBb4E3gDPAG
8DrwGvAq8ArwMvAS8Bvg18CvgF8CLwIvAL8AngdOAz8HngOeBU4BJ4FngKeBp4AT
wHHgGDAAHAWOAIeBQ0A/EAL6gCDwJPAE8DhwEDgAPAY8CjwCPAw8BDwIPADcD/wM
uA/YD9wL3APcDdwF3AncAdwO3AbcCuwDfgrsBW4BbgZuAm4EbgCuB/YA1wHXAr3A
T4BrgKuBq4ArWeeUHukKqN3A5cBlQA9wKbAL2AnsALYD24CtwBZgM7AJ2AhsANYD
64C1wBpgNbAKWAl0AyuA5cAyoAtYCiwBFgOdQAewCGgH2oCFwAKgFZgPzANagGag
CZgLzAECQCPQANQDtUANUA3MAmYCM4AqYDowDagEKoByoIx1/ocv0//pzWv+T2/g
f3j7GD+WjRzMeGMdCxfgD5609zA2dMvoP4BitWw5W8968HMV28NuYSfZO2wR2w11
O9vPHmKPsiB7lv2SvXVRqf9hYGireiUzKo8yDYtmbPj88Lmhh4ABdeSomFsQila5
L8QMW4Y/+UHcJ0O3DFuGBjRRTC+XNSleR21fSoPD57HlaphpeAIPK66GNsuf9Ln2
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
liCb7pkY1HipTrWXf1Buc2+UJ4/PXGQN6tOu5hSBtrGGJopxIogPw47Ce6Q1ouUd
HiR1tLlhdfhIA+YybRZ67oeIWYw1X+VdLEPvDCcy3i1lmsGkD0bkoEL8cm3IQYX4
1TbDKLzzcujqcAZ8tiVoQIu8o0wZLgDrIKmKtwW/V6PxPOuzvJq6AVbv2YK1nzda
/igtkoOmtKp27G5U3oAYT5EojLp0aTyK13GaYrW850bYHUvCwPDDnq18iROv7CwP
3/24/zHnMUxU1tz7w4jgPF92lu6HsSY5urdXZ/qvC5C9dKYR5rWgIx18WwNzh5P9
zV3BN1jPjD5FNXKAJZl7Z3iwqSnSOHDQUWL6JLs7m3kuNLlWXss8P5YJVYxk4tu0
XHmvZRI/lfAQ0uUQAvjtDS69ONg1EqxEciUOg2k5gPzrxcDwdX+5M9gNz0SynIWP
iLvXbfFM9PA3dFWJ2QC0YZxGpgXcH17HJ01Ph7tpEZwd5qls663sxYe4O9pRjPtg
+JOCq3wXVYl5IWEewiDcCsGeWndbs7sNR1Oprik52YnZCHYvaQ/6Pe18K6jF5+O3
FlsSqL2Xuzhrxoc6g1psTEvaF3uSseEgrlm2qzw++HSaNszZ2+vpDcoLQSUyo3ov
pl0VJ/yu8XnaF/MjND7P3b5YLluJ5srW4e1zVngwlxejtdzu6Bf++4st4m8dvR7U
1trmgyWsvVG97uJeLMGt2D1U3o45bdiq+I7kloe63YkQ7FrFQ82oiDJGpPGMNAV4
a1b6+lq1aRdi+FwMrvZRZp1cK1pW3xSsFYXk+cRzrfUFFbFFSERLg1I9VjbYn69T
MJ46rQrm9cP1nLy0O6jA9krDI5ev4kWxNNCAUTHEyJuIPMWwSYrdRuxD852w6Y/G
M1UkY7iuZ6r7mEfVwg6qylm76mN2UPkRO6g2snmq79lBhQrhVoTHALNYhyoFvAjc
hPjH2TTlh8ysTmGPqXpZiiqdjUU4CV9u3KreiGmO6vHDX0bcKxWBk1ks/u/QgNss
I9Y9DVJj8A98CmbFv//p8f+MOmbC/VMUnjrteKrTIje9TrKTUrdiouJ1ZY3yr6qD
6g71EY1Fc0Jbrn1VtzuiXF+oP2AoNzxnLDYeNp41nUIhNW7w1itfx22XEvUUs9ms
mt0avNLX9BT2unp87ETp8GF7ebkuW/uMVIYmuHGXrcPX3GV+s0phOhofX+o5Ol6z
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
wZ0lgztLBvrr1zN3wtiEngRlQl7YhGDZhGDZW8Cyt8jpKIZ5mH8oKllvyuaOENuQ
pirkLmPiLnPmJW4qPJXQenPmwv5dDGsdQqFYXgoP7yjnV5lMvGioG2WxaVvOxL/E
7cYfRtRhV0qnJ8Hwzhx+JFHLjySjHAu91hs1tuYNV0wet69DONi1b9wwPTpz8piq
VdMzbLqhgz/0tXWxLqsmubSlJClrzkPf7r/jX9zhvri7bu8Va7JLylLM0R7F2VVP
XVvdsOd417qT18H7ng57n8oA75vAytnTspWTLDnWQh1MU8itXCh7VCG3eiE3cyHs
dTSTPy1mllq5baFkRl6ZMShg2U3B8ipuhZuGEnIsOIseWeOX/P7YS+Bdh5PrYsNP
4NwhW8+NGHrU0x83dCjHz4se7kbBZF7ySHe4KF/8Rp748OQiz9d0ZY7y33w0JjZJ
GX4CjI2OiZEKvOleb/g5UGXQ2FKT4pNtBtVme/bkxknrhffiUTB63JT4meur0z1T
5xe7C7IzbBsidUOD5bVxpfk3PVLeMdWFDU+HxQ0L+7iCuaWewd+PePUT6S610lQ0
Z3XZlKU1E22RvpLqcUN/Tk1UXjlrWaxWMzQreVIt9plpw+eUHfDzKimD2/8Ym4Lr
DzMuN6Zw88KcMsPMMsPdwbJZpwwosvy+PH+0TZqV57fi1iMvNc/odPCyTn5sclpQ
ysm3HCcfOudx/Bk0nt77nfI54FR/XJhtxEfM/ChlzDkhpbNCHGi9foPVXSgV+g1G
aRbG8pRfz1WhtdAaU4LT/+EpTnVmQwxmQHiFhbOfs/LLFJ+v1XLOggV31NlKfrQQ
By2+2BTmDEjpoW4rjrzeo91yrZm82qPdcr1qXvHIgozSvnDVF5ZmlZhIdA+WowmH
f/jQqlF2lG2+r3XK6rmTYg04DOsi82vXzihqLUvNq1+2qqs+f9Kymxp9c2eXRGtU
CqXGoDXklrdOnFBbEJ/XsHzV8oZ8acW863Eh4E5xpLlwIaZNyfAkFdbmF1ZPGpc/
uXFtTd2lc7LNca5og9URHYVn2QRPYuLYqWkTqkvy8i9pWMvPaWas8m9hnqWwHj7K
Rx1+DJDDinPYqUNQTF7SMVzyUo+5JDMSwBcv+fzAZsUVDNKsmqgBKaM/Mbyq5+Hg
9rl8ffK8z3Lax2eOJpHnONQtZ+HreJ6w3qijarJ4WJCPSW/Jz157xbluaK94NlNe
IT+ZnY5OsOq+u2fEyxfprAnR0XSzh34+hv19K056PnaY1uy2bMnNVw83X03c3C3d
/DTv5h6JK3iL3zr6NA8vZjHhpRssL90yoxxYNoWcjtIxx/En9Ti78jM//0ctfwQO
/XpvvaUej+jCJ+Ujfnj9Hjnnjxvb6jzMM/KH+QtOxg9RI7v+yAnJGr71GHVm2lrR
M7BxRXBXuXxoT4nWZTVsrJq5sc4nWy05OkJ6b9OxnqmTtx7ZrPQIS33/RctVuG1v
unyuMlbEcc9IwfNSFyyWyq4ii6XyxTcjVYrn7I2XMnAhZZKy4qQshxQH28iLgyz4
Zu8QMVz4o3hUnCPO4U1z1TvUUXSijyoutUZJNDN9cAzW2iq1trbigtN5dCQb3AP5
YII0fkuZo+KnyAkT6NSYL19Y4iZTqziqioxLT4xJdliNWuVQs06KykhJSI6KUEnr
JWmZUoel1JVqUuqS+K2kpFLjNkgVku8t8TD/3UlVKY/n95a872MxK75B33NZNfU9
M1fKzJG8DskbK6XHSBlMyqz3GKyJ9dYLl7WluJtF6/Fy+g2jk/l2gIVC7sPIrask
jVy6jurQSH8k5QcmdVRmijvVblANnR16V220pyYle81qk9Q+9KRRa8Fc98boNfhy
2qbWR6ckutKtKuNQcHJMvFmt1BkiFMrBQZxtlWpzfIyiQVEa4zTjjhb3FwnSBzoT
4tHXwed5b5Pkk56NjWFreW/xJSc9BckPZ5gdMsPRwbKjg+WFXn5IM8LRY+Un5lN+
DPJsY1q9UxNVr+EHOowbf5IdeSw6OpI2MqjShUPbBTNgJ4zNnzChMJpfR8ujW0UP
R3bd0M0GtTk9OSktxqDuj8uLV8SOizukNESnxKdmWtQG6duhEceW3lW8HYsrapXW
pB+6bvyGScVrC6VN+kgtrqfjY9DvW4e/xT8cnMX3Opm83318sTt1BIuAJkI5i5W+
hLY/i9WqP8KPoKM0/iXuhPxrDtxqwAFjpFW5k0tyOFZOy82pAHAtCON9onapZ7BG
/CUs/+vfbtmD9FXrC5K2xLVozasGJOXh6tmZmebiAUlzuHx258fmSnHXjINdLD9b
+A0j+at5gaPdcolyXgTnuvLZ5s6Pu1FMXHLhuBHLT3TReH4qzFGKDUgcLSYrx49E
hePy8ybgScwmzylFOk0tCUtKLPLye0Ic/JThFQYVIoPUneRfWpVRnGYZ03pzV9Nl
AZ+3cXdrSu3ceVk2twMOiUcwlw1HlHFJ2WW5Lr0+yqBRqI3ueNtYf6B4TOuy9WWl
a9tmjU+U0s2ubFdVR4nTnlM5bnxVbswGT/mSsszqaX5nwdK25rS8ssyoofelQGFH
69ysCU2zKjyT187N91Z2XDJp0fx5eZnNLXMznBWzazNT9XhQVmjNprii7qULMlLH
JhkVOkdcXJJZr4v0lOSkTMyMjcmcXLNIqXAWXVLpy6zw+1MTx2c6nNklgxkFc0o9
1sTM2Oz2Re057tJSv/JK/q2dhFtd+vZPg3ttVlNTXz23xVfW3r1s0bpl/w8J63MY
CmVuZHN0cmVhbQplbmRvYmoKNDAgMCBvYmoKMTE0OTgKZW5kb2JqCjE3IDAgb2Jq
Cjw8IC9UeXBlIC9Gb250IC9TdWJ0eXBlIC9UcnVlVHlwZSAvQmFzZUZvbnQgL01H
T1dMWStDYWxpYnJpLUJvbGQgL0ZvbnREZXNjcmlwdG9yCjQxIDAgUiAvVG9Vbmlj
b2RlIDQyIDAgUiAvRmlyc3RDaGFyIDMzIC9MYXN0Q2hhciA0MiAvV2lkdGhzIFsg
NDk1IDY3NiA2MDYKNDIzIDIyNiA2MzAgNjUzIDQ4OCA1NjEgNTIwIF0gPj4KZW5k
b2JqCjQyIDAgb2JqCjw8IC9MZW5ndGggNDMgMCBSIC9GaWx0ZXIgL0ZsYXRlRGVj
b2RlID4+CnN0cmVhbQp4AV2RzWrDMBCE73qKPaaHYNlN2gaMIaQEfOgPdfsAtrQ2
gloWsnzw23ekpCn0MIdvZ2dZrbJT/VxbEyh795NqOFBvrPY8T4tXTB0Pxoq8IG1U
uFKqqbF1IkO4WefAY237icpSEGUfiMzBr7Q56qnju1h785q9sQNtvk5NqjSLc988
sg0kRVWR5h7jXlr32o5MWYpuaw3fhHWL1F/H5+qYsBES+WUlNWmeXavYt3ZgUUpZ
ledzJdjqf1YuL4muv7YWeVVGSbnfVaIsCiAk5a6PeA+EgHnEHRACqoh7ICRlISM+
ACG4adQjEMLkfXSfgBDchAcgBCyi2wIhNB/S3r8LxifEU99OoxbvcZX0H+lg8RDG
8u3L3OTiw5N+AMNkjIYKZW5kc3RyZWFtCmVuZG9iago0MyAwIG9iagoyODgKZW5k
b2JqCjQxIDAgb2JqCjw8IC9UeXBlIC9Gb250RGVzY3JpcHRvciAvRm9udE5hbWUg
L01HT1dMWStDYWxpYnJpLUJvbGQgL0ZsYWdzIDQgL0ZvbnRCQm94ClstNTE5IC0z
NDkgMTI2MiAxMDM5XSAvSXRhbGljQW5nbGUgMCAvQXNjZW50IDk1MiAvRGVzY2Vu
dCAtMjY5IC9DYXBIZWlnaHQKNjMyIC9TdGVtViAwIC9YSGVpZ2h0IDQ2OSAvQXZn
V2lkdGggNTM2IC9NYXhXaWR0aCAxMzI4IC9Gb250RmlsZTIgNDQgMCBSID4+CmVu
ZG9iago0NCAwIG9iago8PCAvTGVuZ3RoIDQ1IDAgUiAvTGVuZ3RoMSAxMjg0NCAv
RmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeAHlm3l8U1X2wM99L0nbLE3S
faFNymvSlrTpSqGANHSjWLbSRlPWlgIWFVsLFUEY6gpWEEYQVxZxtyKvT9SgKIi4
zCDqOLhv4OgISgdU3MAmv3PfSdlmnM/8Zn6f3++PX8jJ955zzz3v3nPuu1k+ZUF7
x2wwQCeIkNc8r6kN1EemBpHdfNUCO+kJIwB0K+a0XTKP9NS9ABHRl1y+aA7pmdWo
72yZ3TSLdPgVWdyCBtJZETK9Zd6Cq0nPeB+ZfXlrc6g/Mw/1hHlNV4euDx+jbr+i
ad5s8i/g88lsa58d6mc+gLhDOCn1EQw9QuoZMGwaNGUQzywQDgJYIBcaAYw/s1LQ
AMN/uKzCwjVrzLtmmEf8AInh6tjnvlnyOm+8s76r+dSHfYP1SeET0TcCI9ADx4Vt
7PsQQL/51Icnb9InqZFCnSoMSoT4zagUsRx7houj8PUWMQ/uQRFAI+bCLJQFKAdQ
NGKOOAiGgk3MDtElDlKG2tJ3ofoAynYUMbgbjVJG1Q61McBeNapZHAFDxeHgFYch
S5BDkUOQxcjByCJkIVJCDkSmIe3gBZfowRldxl/FC6gPteFoSxfzoR5FUFtFIe0E
UgMxYgZUoHyBIuKsM9CHLAuQN6CsQzmAcgIlHKc+ECMW4RUZjrWjtx3H2zG+Hddu
xxF20Am/KKkpNr/ws5LqQvykpGYjfiT8QDhBfd+T9h3hW8JxwjHC38izl3CUjN8Q
viYcIRwmfEX4K+FLwhdKagRO4i+kfU44pKREofGgkpKI+ExJyUV8SviE8DHhI3L5
kLQPCO8T3iO8S3iHcIDwZ8LbhD8R3iK8SXiDJrGf8DphH+GPdNk/kOdrhFcJrxBe
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
P3cpdCrHqqvA6+jN+r5taTmm1EJnRkGqid2BBu0VqVnJRpzoHXqLXqfDl1PHDIlZ
uDsnBo9oE7UOiIaMM7szRtiDuzMVX/WQGNqdWLWpOKE6SZ2wpE5Ye9HpO/nM7vwX
B/TvTv72U0RLUDcnvv3ExqTiG81IQZs4ceORu+44tL4GeffaQ3eMCxy1j+tsbLpu
Ypp9bGcTp7D+vkDPtAlbTnZvOCVPH7/lp6fnPLxw1JjF90+59NGrS6uXPIj5NwZP
il/jfh0IdaH9Cjq/sO7JBKsuqn9TRvnZlO2elFqjetDj6VTAcvf27efn0T9z6l9F
mrX/TdKa1r8ivqvwuny77OTVcBammgI79bSd9OIavoE0W1KyEo2nevvLook2Jmal
pA5KNBgSB/G9szJ4RLMV944LvDT3nWAX1mB14oS1HqPeOcky6fR5MRXPi/6KlPYX
xGP4bZ/+2fMZW0NFiLWGsn/GotlateK16xbvuWm00VaQ4cRN5RzdfMHImRUOI19W
fqqRfb5w53UVFyzZsUSM7l9Kn2bclRc6nGMuqxAN/Ta+Igu+VyfgigbB2P67IV64
XTEZ7fw9ZFAyvqOs8+g9RsekZF3UJJ1aj6gSXE9SX8knvZZ3+Z3xzHmdfCFnKsDw
PbGYf1KJj46Liy8sLh4Szd8g8Z0zTLiT7gubMbAx2hA/coh7iN0ctiY2K1aIzoy+
VWtOLXKVlMYbo9g3gZL+WbNXhRcdWbFajSEqMrDHPWdo8Rw3G2GJNmq0sYPS+Yc6
hqc7fQLU4Z0E40ZPuHhsg6u86fK5M9vn5pS1Xs7/Y8d/AT8Y8lYKZW5kc3RyZWFt
CmVuZG9iago0NSAwIG9iago2NzI4CmVuZG9iago0NiAwIG9iagooTWljcm9zb2Z0
IFdvcmQgLSBEb2N1bWVudDEpCmVuZG9iago0NyAwIG9iagooTWFjIE9TIFggMTAu
MTMuMyBRdWFydHogUERGQ29udGV4dCkKZW5kb2JqCjQ4IDAgb2JqCihXb3JkKQpl
bmRvYmoKNDkgMCBvYmoKKEQ6MjAxODA0MDkxNDM4NDFaMDAnMDAnKQplbmRvYmoK
NTAgMCBvYmoKKCkKZW5kb2JqCjUxIDAgb2JqClsgXQplbmRvYmoKMSAwIG9iago8
PCAvVGl0bGUgNDYgMCBSIC9Qcm9kdWNlciA0NyAwIFIgL0NyZWF0b3IgNDggMCBS
IC9DcmVhdGlvbkRhdGUgNDkgMCBSIC9Nb2REYXRlCjQ5IDAgUiAvS2V5d29yZHMg
NTAgMCBSIC9BQVBMOktleXdvcmRzIDUxIDAgUiA+PgplbmRvYmoKeHJlZgowIDUy
CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAzOTE1OSAwMDAwMCBuIAowMDAwMDA0
MTc0IDAwMDAwIG4gCjAwMDAwMTE2ODAgMDAwMDAgbiAKMDAwMDAwMDAyMiAwMDAw
MCBuIAowMDAwMDA0MTU0IDAwMDAwIG4gCjAwMDAwMDQyNzggMDAwMDAgbiAKMDAw
MDAwODExNSAwMDAwMCBuIAowMDAwMDAwMDAwIDAwMDAwIG4gCjAwMDAwMTE4MTMg
MDAwMDAgbiAKMDAwMDAwMDAwMCAwMDAwMCBuIAowMDAwMDE2NDEyIDAwMDAwIG4g
CjAwMDAwMDQ1MDMgMDAwMDAgbiAKMDAwMDAwNTI1MiAwMDAwMCBuIAowMDAwMDAw
MDAwIDAwMDAwIG4gCjAwMDAwMTg3MzAgMDAwMDAgbiAKMDAwMDAwMDAwMCAwMDAw
MCBuIAowMDAwMDMxMjg4IDAwMDAwIG4gCjAwMDAwMDUyNzIgMDAwMDAgbiAKMDAw
MDAwNTMyNiAwMDAwMCBuIAowMDAwMDExNjQzIDAwMDAwIG4gCjAwMDAwMDUzNzkg
MDAwMDAgbiAKMDAwMDAwODA5NCAwMDAwMCBuIAowMDAwMDA4MTUxIDAwMDAwIG4g
CjAwMDAwMTE2MjIgMDAwMDAgbiAKMDAwMDAxMTc2MyAwMDAwMCBuIAowMDAwMDEy
NjA3IDAwMDAwIG4gCjAwMDAwMTIwOTUgMDAwMDAgbiAKMDAwMDAxMjU4NyAwMDAw
MCBuIAowMDAwMDEyODQ1IDAwMDAwIG4gCjAwMDAwMTYzOTEgMDAwMDAgbiAKMDAw
MDAxNjk4MCAwMDAwMCBuIAowMDAwMDE2NjA4IDAwMDAwIG4gCjAwMDAwMTY5NjAg
MDAwMDAgbiAKMDAwMDAxNzIyMiAwMDAwMCBuIAowMDAwMDE4NzA5IDAwMDAwIG4g
CjAwMDAwMTk0NDEgMDAwMDAgbiAKMDAwMDAxODk4MSAwMDAwMCBuIAowMDAwMDE5
NDIxIDAwMDAwIG4gCjAwMDAwMTk2NzcgMDAwMDAgbiAKMDAwMDAzMTI2NiAwMDAw
MCBuIAowMDAwMDMxODc2IDAwMDAwIG4gCjAwMDAwMzE0OTIgMDAwMDAgbiAKMDAw
MDAzMTg1NiAwMDAwMCBuIAowMDAwMDMyMTE3IDAwMDAwIG4gCjAwMDAwMzg5MzYg
MDAwMDAgbiAKMDAwMDAzODk1NyAwMDAwMCBuIAowMDAwMDM5MDAyIDAwMDAwIG4g
CjAwMDAwMzkwNTUgMDAwMDAgbiAKMDAwMDAzOTA3OCAwMDAwMCBuIAowMDAwMDM5
MTIwIDAwMDAwIG4gCjAwMDAwMzkxMzkgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6
ZSA1MiAvUm9vdCAyNSAwIFIgL0luZm8gMSAwIFIgL0lEIFsgPGUxYWQ2NThjMjk0
OTc4NmYwYTZkYjNmYTQ2ZmViNzNmPgo8ZTFhZDY1OGMyOTQ5Nzg2ZjBhNmRiM2Zh
NDZmZWI3M2Y+IF0gPj4Kc3RhcnR4cmVmCjM5MzAzCiUlRU9GCg==`
};

export const upload_document_response: LeaseQ.UploadDocumentResponse = {
    document_id: '00000000-0000-0000-0000-000000000000'
};

/**
 * Gets estimated financing rates
 * 
 * GET /v1/lenders/rates
 * https://github.com/leaseq/api-docs/blob/master/lenders/rates/get.md
 */
export const get_rates_response = {
    credit_tiers: [
        {
            credit_tier: 'A',
            terms: [
                {
                    term_length: 60,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.11718,
                            factor: 0.00488
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.11718,
                            factor: 0.00488
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.0855,
                            factor: 0.00356
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.0855,
                            factor: 0.00356
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.0855,
                            factor: 0.00356
                        }
                    ]
                },
                {
                    term_length: 48,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.1193,
                            factor: 0.00497
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.1193,
                            factor: 0.00497
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.0859,
                            factor: 0.00358
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.0859,
                            factor: 0.00358
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.0859,
                            factor: 0.00358
                        }
                    ]
                },
                {
                    term_length: 36,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.1489,
                            factor: 0.0062
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.1489,
                            factor: 0.0062
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.0903,
                            factor: 0.00376
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.0903,
                            factor: 0.00376
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.0903,
                            factor: 0.00376
                        }
                    ]
                },
                {
                    term_length: 24,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.1635,
                            factor: 0.00681
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.1635,
                            factor: 0.00681
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.096,
                            factor: 0.004
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.096,
                            factor: 0.004
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.096,
                            factor: 0.004
                        }
                    ]
                },
                {
                    term_length: 12,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.1818,
                            factor: 0.00757
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.1818,
                            factor: 0.00757
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.1318,
                            factor: 0.00549
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.1318,
                            factor: 0.00549
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.1318,
                            factor: 0.00549
                        }
                    ]
                }
            ]
        },
        {
            credit_tier: 'B',
            terms: [
                {
                    term_length: 60,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.21437,
                            factor: 0.00893
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.21437,
                            factor: 0.00893
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.0866,
                            factor: 0.00361
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.0866,
                            factor: 0.00361
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.0866,
                            factor: 0.00361
                        }
                    ]
                },
                {
                    term_length: 48,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.2125,
                            factor: 0.00885
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.2125,
                            factor: 0.00885
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.0923,
                            factor: 0.00385
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.0923,
                            factor: 0.00385
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.0923,
                            factor: 0.00385
                        }
                    ]
                },
                {
                    term_length: 36,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.25916,
                            factor: 0.0108
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.25916,
                            factor: 0.0108
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.0964,
                            factor: 0.00402
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.0964,
                            factor: 0.00402
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.0964,
                            factor: 0.00402
                        }
                    ]
                },
                {
                    term_length: 24,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.26935,
                            factor: 0.01122
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.26935,
                            factor: 0.01122
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.0974,
                            factor: 0.00406
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.0974,
                            factor: 0.00406
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.0974,
                            factor: 0.00406
                        }
                    ]
                },
                {
                    term_length: 12,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.28991,
                            factor: 0.01208
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.28991,
                            factor: 0.01208
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.142,
                            factor: 0.00592
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.142,
                            factor: 0.00592
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.142,
                            factor: 0.00592
                        }
                    ]
                }
            ]
        },
        {
            credit_tier: 'C',
            terms: [
                {
                    term_length: 60,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.35488,
                            factor: 0.01479
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.35488,
                            factor: 0.01479
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.0903,
                            factor: 0.00376
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.0903,
                            factor: 0.00376
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.0903,
                            factor: 0.00376
                        }
                    ]
                },
                {
                    term_length: 48,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.3355,
                            factor: 0.01398
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.3355,
                            factor: 0.01398
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.10029,
                            factor: 0.00418
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.10029,
                            factor: 0.00418
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.10029,
                            factor: 0.00418
                        }
                    ]
                },
                {
                    term_length: 36,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.38685,
                            factor: 0.01612
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.38685,
                            factor: 0.01612
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.1079,
                            factor: 0.0045
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.1079,
                            factor: 0.0045
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.1079,
                            factor: 0.0045
                        }
                    ]
                },
                {
                    term_length: 24,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.401,
                            factor: 0.01671
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.401,
                            factor: 0.01671
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.1109,
                            factor: 0.00462
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.1109,
                            factor: 0.00462
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.1109,
                            factor: 0.00462
                        }
                    ]
                },
                {
                    term_length: 12,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.43421,
                            factor: 0.01809
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.43421,
                            factor: 0.01809
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.1617,
                            factor: 0.00674
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.1617,
                            factor: 0.00674
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.1617,
                            factor: 0.00674
                        }
                    ]
                }
            ]
        },
        {
            credit_tier: 'D',
            terms: [
                {
                    term_length: 60,
                    rates: [
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.1055,
                            factor: 0.0044
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.1055,
                            factor: 0.0044
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.1055,
                            factor: 0.0044
                        }
                    ]
                },
                {
                    term_length: 48,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.41674,
                            factor: 0.01736
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.41674,
                            factor: 0.01736
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.1102,
                            factor: 0.00459
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.1102,
                            factor: 0.00459
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.1102,
                            factor: 0.00459
                        }
                    ]
                },
                {
                    term_length: 36,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.46788,
                            factor: 0.0195
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.46788,
                            factor: 0.0195
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.1459,
                            factor: 0.00608
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.1459,
                            factor: 0.00608
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.1459,
                            factor: 0.00608
                        }
                    ]
                },
                {
                    term_length: 24,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.48898,
                            factor: 0.02037
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.48898,
                            factor: 0.02037
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.2327,
                            factor: 0.0097
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.2327,
                            factor: 0.0097
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.2327,
                            factor: 0.0097
                        }
                    ]
                },
                {
                    term_length: 12,
                    rates: [
                        {
                            amount_min: 1,
                            amount_max: 4999,
                            rate: 0.49999,
                            factor: 0.02083
                        },
                        {
                            amount_min: 5000,
                            amount_max: 9999,
                            rate: 0.49999,
                            factor: 0.02083
                        },
                        {
                            amount_min: 10000,
                            amount_max: 19999,
                            rate: 0.30012,
                            factor: 0.01251
                        },
                        {
                            amount_min: 20000,
                            amount_max: 29999,
                            rate: 0.30012,
                            factor: 0.01251
                        },
                        {
                            amount_min: 40000,
                            amount_max: 49999,
                            rate: 0.30012,
                            factor: 0.01251
                        }
                    ]
                }
            ]
        }
    ]
};