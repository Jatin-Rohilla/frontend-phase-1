/**
 * API Service for Login Flow
 * Handles all API calls with encryption
 */

import { CryptoUtils } from './crypto-utils';

const API_BASE_URL = 'http://uat.kksecurities.in:3005';


interface ValidateUserIdResponse {
  success: boolean;
  message?: string;
  securityImage?: string;
}

interface ValidatePasswordResponse {
  success: boolean;
  message?: string;
  sessionToken?: string;
}

interface ValidatePinResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: Record<string, unknown>;
}

/**
 * Step 1: Validate User ID
 * @param userId - User ID to validate
 * @returns Response with security image if successful
 */
export async function validateUserId(userId: string): Promise<ValidateUserIdResponse> {
  try {
    // Encrypt the userId
    const encryptedUserId = CryptoUtils.encryptMain(userId);
    
    const response = await fetch(`${API_BASE_URL}/api/validateUserId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        LoginID: encryptedUserId,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        securityImage: data.securityImage,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to validate user ID',
      };
    }
  } catch (error) {
    console.error('Error validating user ID:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

/**
 * Step 2: Validate Password and Security Image
 * @param userId - User ID
 * @param password - User password
 * @param securityImageConfirmed - Whether user confirmed security image
 * @returns Response with session token if successful
 */
export async function validatePassword(
  userId: string,
  password: string,
  securityImageConfirmed: boolean
): Promise<ValidatePasswordResponse> {
  try {
    // Encrypt sensitive fields
    const encryptedUserId = CryptoUtils.encryptMain(userId);
    const encryptedPassword = CryptoUtils.encryptMain(password);
    
    const response = await fetch(`${API_BASE_URL}/api/validatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        LoginID: encryptedUserId,
        password: encryptedPassword,
        securityImageConfirmed: securityImageConfirmed,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        sessionToken: data.sessionToken,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Invalid password',
      };
    }
  } catch (error) {
    console.error('Error validating password:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

/**
 * Step 3: Validate PIN
 * @param userId - User ID
 * @param pin - User PIN
 * @param sessionToken - Session token from password validation
 * @returns Response with auth token if successful
 */
export async function validatePin(
  userId: string,
  pin: string,
  sessionToken?: string
): Promise<ValidatePinResponse> {
  try {
    // Encrypt sensitive fields
    const encryptedUserId = CryptoUtils.encryptMain(userId);
    const encryptedPin = CryptoUtils.encryptMain(pin);
    
    const response = await fetch(`${API_BASE_URL}/api/validatePin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(sessionToken && { 'Authorization': `Bearer ${sessionToken}` }),
      },
      body: JSON.stringify({
        LoginID: encryptedUserId,
        pin: encryptedPin,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        token: data.token,
        user: data.user,
        message: data.message,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Invalid PIN',
      };
    }
  } catch (error) {
    console.error('Error validating PIN:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}
