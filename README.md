# LeaseQ Node SDK

**WARNING: this package is not stable yet. Expect breaking changes.**

Submit credit applications to LeaseQ. This library supports both the browser and
nodeJS.

## Installation

Using **yarn**:
```sh
yarn add leaseq-node
```

Using **npm**:
```sh
npm install leaseq-node
```

## Usage

Async/Await:

```typescript
import LeaseQ from 'leaseq-node';

const api = LeaseQ();

await api.login({
    email: '<your email>',
    password: '<your password>'
});

const { app_id } = await api.application.submit({
    /* application data */
});

await api.application.upload(app_id, {
    /* file data */
});
```

Promises:

```typescript
import LeaseQ from 'leaseq-node';

const api = Leaseq();

api.login({
    email: '<your email>',
    password: '<your password>'
})
    .then(() => LeaseQ.application.submit({
        /* application data */
    }))
    .then(({ app_id }) => LeaseQ.application.upload(app_id, {
        /* file data */
    }));
```

## Contribution

To install:
```
yarn install
```

To test:
```
yarn test
```

To build:
```
yarn build
```