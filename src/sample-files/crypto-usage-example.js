/**
 * Usage Examples for Crypto Utilities
 * 
 * Prerequisites:
 * - Include CryptoJS library in your HTML or install via npm
 * - Browser: <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
 * - Node.js: npm install crypto-js
 */

// If using Node.js, uncomment these lines:
// const CryptoJS = require('crypto-js');
// const { CryptoUtils, encryptRequestFields } = require('./crypto-utils');

// ============================================
// EXAMPLE 1: Basic Encryption/Decryption
// ============================================
console.log('=== Example 1: Basic Encryption/Decryption ===');

const plainText = 'mySecretPassword123';
console.log('Original:', plainText);

// Encrypt using main key
const encrypted = CryptoUtils.encryptMain(plainText);
console.log('Encrypted:', encrypted);

// Decrypt
const decrypted = CryptoUtils.decryptMain(encrypted);
console.log('Decrypted:', decrypted);
console.log('Match:', plainText === decrypted);

// ============================================
// EXAMPLE 2: Backoffice Encryption
// ============================================
console.log('\n=== Example 2: Backoffice Encryption ===');

const sensitiveData = 'admin@example.com';
const encryptedBackoffice = CryptoUtils.encryptBackoffice(sensitiveData);
console.log('Encrypted with backoffice key:', encryptedBackoffice);

// ============================================
// EXAMPLE 3: Request Interceptor Usage
// ============================================
console.log('\n=== Example 3: Request Interceptor ===');

// Simulated HTTP request object
const mockRequest = {
  url: 'https://api.example.com/trade?userID=user123&clientID=client456&accountID=acc789',
  headers: {
    'Content-Type': 'application/json',
    'api': true  // This flag triggers encryption
  },
  data: {
    userID: 'user123',
    password: 'myPassword',
    transPass: 'transPin123',
    pin: '1234'
  }
};

console.log('Original Request:', JSON.stringify(mockRequest, null, 2));

// Apply encryption
const encryptedRequest = encryptRequestFields(mockRequest);

console.log('\nEncrypted Request:', JSON.stringify(encryptedRequest, null, 2));

// ============================================
// EXAMPLE 4: Axios Interceptor Integration
// ============================================
console.log('\n=== Example 4: Axios Interceptor Integration ===');

// Example of how to integrate with Axios
const axiosInterceptorExample = `
// Add request interceptor to Axios
axios.interceptors.request.use(
  function (config) {
    // If the request has the 'api' header flag, encrypt sensitive fields
    if (config.headers && config.headers.api) {
      return encryptRequestFields(config);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Example usage in your API calls:
axios.post('/api/login', {
  userID: 'john.doe',
  password: 'secret123',
  clientID: 'client001'
}, {
  headers: {
    'api': true  // Set this flag to trigger encryption
  }
});
`;

console.log(axiosInterceptorExample);

// ============================================
// EXAMPLE 5: Manual Field Encryption
// ============================================
console.log('\n=== Example 5: Manual Field Encryption ===');

// If you want to manually encrypt specific fields
const loginData = {
  username: 'john.doe',
  password: 'mySecretPassword',  // Should be encrypted
  rememberMe: true
};

console.log('Before encryption:', loginData);

// Encrypt the password field
loginData.password = CryptoUtils.encryptMain(loginData.password);

console.log('After encryption:', loginData);

// ============================================
// EXAMPLE 6: Testing Encryption Consistency
// ============================================
console.log('\n=== Example 6: Testing Encryption ===');

const testData = 'The quick brown fox jumps over the lazy dog';
const encrypted1 = CryptoUtils.encryptMain(testData);
const encrypted2 = CryptoUtils.encryptMain(testData);

console.log('Same input, different outputs (due to random IV):');
console.log('Encrypted 1:', encrypted1);
console.log('Encrypted 2:', encrypted2);
console.log('Are they equal?', encrypted1 === encrypted2, '(Should be false)');

const decrypted1 = CryptoUtils.decryptMain(encrypted1);
const decrypted2 = CryptoUtils.decryptMain(encrypted2);
console.log('Decrypted 1:', decrypted1);
console.log('Decrypted 2:', decrypted2);
console.log('Both decrypt correctly?', decrypted1 === testData && decrypted2 === testData);

// ============================================
// EXAMPLE 7: Fetch API Integration
// ============================================
console.log('\n=== Example 7: Fetch API Integration ===');

const fetchExample = `
// Create a wrapper function for fetch with encryption
async function secureFetch(url, options = {}) {
  // Create request object similar to Axios format
  const request = {
    url: url,
    headers: options.headers || {},
    data: options.body ? JSON.parse(options.body) : null
  };

  // Apply encryption if api flag is set
  if (request.headers.api) {
    const encryptedRequest = encryptRequestFields(request);
    
    // Update fetch options
    options.body = JSON.stringify(encryptedRequest.data);
    delete encryptedRequest.headers.api;
    options.headers = encryptedRequest.headers;
    url = encryptedRequest.url;
  }

  return fetch(url, options);
}

// Usage:
const response = await secureFetch('https://api.example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api': true
  },
  body: JSON.stringify({
    userID: 'john.doe',
    password: 'secret123'
  })
});
`;

console.log(fetchExample);

