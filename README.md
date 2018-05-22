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

**WARNING:** this is going to change soon.

```typescript
import LeaseQ from 'leaseq-node';

const connect = async () => {

    const api = new LeaseQ();

    await api.login({
        email: '<email>',
        password: '<password>',
    });

    api.submitApplication({
        /* application data ... */
    });

};
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