# qrs [![NPM version](https://badge.fury.io/js/qrs.svg)](http://badge.fury.io/js/qrs)

> Node.js library to communicate with Qlik Sense Repository Service (QRS) API.

## Installation

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i qrs --save
```

***

<!-- toc -->

* [Usage](#usage)
* [Configuration Options](#configuration-options)
* [Prepare Qlik Sense server](#prepare-qlik-sense-server)
* [Examples](#examples)
* [Running tests](#running-tests)
* [Contributing](#contributing)
* [Author](#author)
* [License](#license)

_(Table of contents generated by [verb])_

<!-- tocstop -->

***

## Usage

```js
var QRS = require('qrs');
var config = {
    "host": 'qsSingle',
    "isSSL": false, 
    "xrfkey": 'ABCDEFG123456789',
    "authentication": "header",
    "headerKey": 'hdr-usr',
    "headerValue": 'qsSingle\\swr'      
};
var qrs = new QRS( config );

// Now run your command like
qrs.get('about', function( data ) {
    
    // do something with the result
    
});
```

## Configuration Options

The configuration passed to the constructor of _qrs_ drives how authentication is handled.

### Typical configurations

**Example using Windows authentication**

(TBD)

**Example using header authentication**

```javascript
var config = {
    server: 'server.mydomain.com',
    isSSL: true,
    authentication: 'header',
    virtualProxy: 'hdr',
    headerKey: 'hdr-usr',
    headerValue: 'mydomain\justme'
}; 
```

**Example using certificates**

```js
var config = {
    server: 'server.mydomain.com',
    isSSL: true,
    authentication: 'certificates',
    cert: 'C:\\CertStore\\client.pem',
    key: 'C:\\CertStore\\client_key.pem',
    ca: 'C:\\CertStore\\root.pem',
    port: 4242,
    headerKey: 'X-Qlik-User',
    headerValue: 'UserDirectory:Internal;UserId:sa_repository'
};
```

### All options

* **`server`** - Qualified / fully qualified name or IP-address of the server where the Qlik Sense Repository server is running on, defaults to "`127.0.0.1`"
* **`isSSL`** - Whether to use SSL or not, defaults to `false`.
* **`authentication`** - Authentication method, can be "`windows`", "`certificates`" or "`header`", defaults to "`windows`".
* **`headerKey`** -
* **`headerValue`** -
* **`virtualProxy`** - Name of the virtual proxy.
* **`port`** - Port to be used.

## Prepare Qlik Sense server

There are several options to ensure that communication between this node.js module and Qlik Sense server is working properly:

* 
Authenticating with a server certificate

See http://help.qlik.com/sense/2.1/en-us/developer/Subsystems/RepositoryServiceAPI/Content/RepositoryServiceAPI/RepositoryServiceAPI-Connect-API-Authenticate-Reqs-Certificate.htm
* 
Authenticating with HTTP headers

See http://help.qlik.com/sense/2.1/en-us/developer/Subsystems/RepositoryServiceAPI/Content/RepositoryServiceAPI/RepositoryServiceAPI-Connect-API-Authenticate-Reqs-Http-Headers.htm

<!--## API-->
<!--{%= apidocs("./lib/qrs.js") %}-->

## Examples

### Using the generic `query`

(TBD)

### Using `get`

(TBD)

### Using `delete`

(TBD)

### Using `put`

(TBD)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/stefanwalther/qrs/issues/new).

## Author

**Stefan Walther**

+ [qliksite.io](http://qliksite.io)
* [twitter/waltherstefan](http://twitter.com/waltherstefan)
* [github.com/stefanwalther](http://github.com/stefanwalther)

## License

Copyright © 2015 Stefan Walther
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on October 11, 2015._