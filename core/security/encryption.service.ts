import { Observable } from '@nativescript/core';
import * as crypto from 'crypto';

export class EncryptionService extends Observable {
    private static instance: EncryptionService;
    private readonly algorithm = 'aes-256-gcm';
    private readonly keyLength = 32;
    private readonly ivLength = 16;

    private constructor() {
        super();
    }

    static getInstance(): EncryptionService {
        if (!EncryptionService.instance) {
            EncryptionService.instance = new EncryptionService();
        }
        return EncryptionService.instance;
    }

    async encrypt(data: string, key: string): Promise<string> {
        try {
            const iv = crypto.randomBytes(this.ivLength);
            const salt = crypto.randomBytes(this.keyLength);
            const derivedKey = await this.deriveKey(key, salt);
            
            const cipher = crypto.createCipheriv(this.algorithm, derivedKey, iv);
            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            
            const authTag = cipher.getAuthTag();
            
            // Combine IV, salt, auth tag, and encrypted data
            return Buffer.concat([
                iv,
                salt,
                authTag,
                Buffer.from(encrypted, 'hex')
            ]).toString('base64');
        } catch (error) {
            console.error('Encryption failed:', error);
            throw error;
        }
    }

    async decrypt(encryptedData: string, key: string): Promise<string> {
        try {
            const buffer = Buffer.from(encryptedData, 'base64');
            
            const iv = buffer.slice(0, this.ivLength);
            const salt = buffer.slice(this.ivLength, this.ivLength + this.keyLength);
            const authTag = buffer.slice(this.ivLength + this.keyLength, this.ivLength + this.keyLength + 16);
            const encrypted = buffer.slice(this.ivLength + this.keyLength + 16);
            
            const derivedKey = await this.deriveKey(key, salt);
            
            const decipher = crypto.createDecipheriv(this.algorithm, derivedKey, iv);
            decipher.setAuthTag(authTag);
            
            let decrypted = decipher.update(encrypted.toString('hex'), 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            
            return decrypted;
        } catch (error) {
            console.error('Decryption failed:', error);
            throw error;
        }
    }

    private async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, 100000, this.keyLength, 'sha512', (err, key) => {
                if (err) reject(err);
                else resolve(key);
            });
        });
    }
}