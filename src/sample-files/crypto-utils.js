/**
 * Crypto Utilities for Field Encryption
 * Uses TripleDES encryption with CBC mode and PKCS7 padding
 * Requires CryptoJS library
 */

const CryptoUtils = {
  // Encryption keys
  MAIN_KEY: '528037149616294083725183',
  BACKOFFICE_KEY: '528037149616294083722310',

  /**
   * Converts WordArray to Base64 string
   * @param {WordArray} wordArray - CryptoJS WordArray
   * @returns {string} Base64 encoded string
   */
  toBase64: function(wordArray) {
    return CryptoJS.enc.Base64.stringify(wordArray);
  },

  /**
   * Encrypts data using TripleDES
   * @param {string} key - Encryption key (24 bytes for 3DES)
   * @param {string} data - Plain text data to encrypt
   * @returns {string} Encrypted data in format "base64(IV):ciphertext"
   */
  encrypt: function(key, data) {
    // Parse the key
    const keyWordArray = CryptoJS.enc.Utf8.parse(key);
    
    // Generate random 8-byte IV
    const iv = CryptoJS.lib.WordArray.random(8);
    
    // Encrypt using TripleDES
    const encrypted = CryptoJS.TripleDES.encrypt(data, keyWordArray, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
    
    // Return format: base64(IV):ciphertext
    return this.toBase64(iv) + ':' + encrypted.toString();
  },

  /**
   * Decrypts data using TripleDES
   * @param {string} key - Decryption key
   * @param {string} encryptedData - Encrypted data in format "base64(IV):ciphertext"
   * @returns {string} Decrypted plain text or empty string on error
   */
  decrypt: function(key, encryptedData) {
    try {
      const keyWordArray = CryptoJS.enc.Utf8.parse(key);
      
      // Split IV and ciphertext
      const parts = encryptedData.split(':');
      const ivBase64 = parts[0];
      const ciphertext = parts[1];
      
      // Parse IV from Base64
      const iv = CryptoJS.enc.Base64.parse(ivBase64);
      
      // Decrypt using TripleDES
      const decrypted = CryptoJS.TripleDES.decrypt(ciphertext, keyWordArray, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });
      
      // Convert to UTF-8 string
      return CryptoJS.enc.Utf8.stringify(decrypted).toString();
    } catch (error) {
      console.error('Decryption error:', error);
      return '';
    }
  },

  /**
   * Encrypts data using the main key
   * @param {string} data - Data to encrypt
   * @returns {string} Encrypted dataencrypt:KKSL1
  encryptBackoffice: function(data) {
    return this.encrypt(this.BACKOFFICE_KEY, data);
  },

  /**
   * Decrypts data using the main key
   * @param {string} encryptedData - Encrypted data
   * @returns {string} Decrypted data
   */
  decryptMain: function(encryptedData) {
    return this.decrypt(this.MAIN_KEY, encryptedData);
  }
};

/**
 * Request Interceptor - Encrypts sensitive fields in HTTP requests
 * @param {Object} request - HTTP request object
 * @returns {Object} Modified request with encrypted fields
 */
function encryptRequestFields(request) {
  // Only process if api header is present
  if (!request.headers || !request.headers.api) {
    return request;
  }

  // Parse URL
  const url = new URL(request.url);
  
  // List of sensitive query parameters to encrypt
  const sensitiveQueryParams = [
    'userID',
    'clientID',
    'clientId',
    'userId',
    'accountID',
    'transPass'
  ];

  // Encrypt query parameters
  sensitiveQueryParams.forEach(param => {
    const value = url.searchParams.get(param);
    if (value) {
      const encrypted = CryptoUtils.encryptMain(value);
      url.searchParams.set(param, encrypted);
    }
  });

  // List of sensitive body fields to encrypt
  const sensitiveBodyFields = [
    'clientId',
    'userId',
    'uccID',
    'LoginID',
    'accountID',
    'appPassword',
    'publicKey',
    'transPass',
    'password',
    'oldLoginPassword',
    'nwLoginPassword',
    'confirmNewLoginPassword',
    'oldTransPassword',
    'nwTransPassword',
    'confirmNewTransPassword',
    'pin',
    'oldPin',
    'newPin'
  ];

  // Encrypt body fields if data exists
  if (request.data) {
    sensitiveBodyFields.forEach(field => {
      if (request.data[field]) {
        request.data[field] = CryptoUtils.encryptMain(request.data[field]);
      }
    });
  }

  // Update request URL with encrypted parameters
  request.url = url.toString();

  // Remove the api header flag
  delete request.headers.api;

  return request;
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CryptoUtils,
    encryptRequestFields
  };
}

