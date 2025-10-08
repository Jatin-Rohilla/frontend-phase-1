/**
 * Crypto Utilities for Field Encryption
 * Uses TripleDES encryption with CBC mode and PKCS7 padding
 * Requires CryptoJS library
 */

import CryptoJS from 'crypto-js';

export const CryptoUtils = {
  // Encryption keys
  MAIN_KEY: '528037149616294083725183',
  BACKOFFICE_KEY: '528037149616294083722310',

  /**
   * Converts WordArray to Base64 string
   * @param wordArray - CryptoJS WordArray
   * @returns Base64 encoded string
   */
  toBase64: function(wordArray: CryptoJS.lib.WordArray): string {
    return CryptoJS.enc.Base64.stringify(wordArray);
  },

  /**
   * Encrypts data using TripleDES
   * @param key - Encryption key (24 bytes for 3DES)
   * @param data - Plain text data to encrypt
   * @returns Encrypted data in format "base64(IV):ciphertext"
   */
  encrypt: function(key: string, data: string): string {
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
   * @param key - Decryption key
   * @param encryptedData - Encrypted data in format "base64(IV):ciphertext"
   * @returns Decrypted plain text or empty string on error
   */
  decrypt: function(key: string, encryptedData: string): string {
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
   * @param data - Data to encrypt
   * @returns Encrypted data
   */
  encryptMain: function(data: string): string {
    return this.encrypt(this.MAIN_KEY, data);
  },

  /**
   * Encrypts data using the backoffice key
   * @param data - Data to encrypt
   * @returns Encrypted data
   */
  encryptBackoffice: function(data: string): string {
    return this.encrypt(this.BACKOFFICE_KEY, data);
  },

  /**
   * Decrypts data using the main key
   * @param encryptedData - Encrypted data
   * @returns Decrypted data
   */
  decryptMain: function(encryptedData: string): string {
    return this.decrypt(this.MAIN_KEY, encryptedData);
  }
};
