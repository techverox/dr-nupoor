import crypto from "crypto";

/**
 * DigiVigee Platform — Native RFC 6238 TOTP Multi-Factor Authentication (2FA)
 *
 * Implements full TOTP secret generation, 6-digit verification code generation,
 * drift-tolerant verification, and hashed recovery backup codes using Node.js crypto.
 * 100% self-contained with 0 external dependencies.
 */

// Base32 Character Set (RFC 4648)
const BASE32_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

/**
 * Encodes a buffer to a Base32 string.
 */
export function base32Encode(buffer: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = "";

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;

    while (bits >= 5) {
      output += BASE32_CHARS[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_CHARS[(value << (5 - bits)) & 31];
  }

  return output;
}

/**
 * Decodes a Base32 string back to a Buffer.
 */
export function base32Decode(base32: string): Buffer {
  const clean = base32.toUpperCase().replace(/=+$/, "").replace(/[\s-]/g, "");
  let bits = 0;
  let value = 0;
  const bytes: number[] = [];

  for (let i = 0; i < clean.length; i++) {
    const idx = BASE32_CHARS.indexOf(clean[i]);
    if (idx === -1) continue; // Skip invalid chars

    value = (value << 5) | idx;
    bits += 5;

    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }

  return Buffer.from(bytes);
}

/**
 * Generates a cryptographically secure 20-byte (160-bit) Base32 2FA secret key.
 */
export function generateTwoFactorSecret(): string {
  const randomBytes = crypto.randomBytes(20);
  return base32Encode(randomBytes);
}

/**
 * Calculates a 6-digit TOTP code for a given secret key and unix timestamp.
 */
export function calculateTotpCode(secretBase32: string, timeMs: number = Date.now()): string {
  const key = base32Decode(secretBase32);
  const timeStep = 30; // 30-second window
  const counter = Math.floor(timeMs / 1000 / timeStep);

  // Convert counter to 8-byte big-endian buffer
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(counter), 0);

  // HMAC-SHA1
  const hmac = crypto.createHmac("sha1", key);
  hmac.update(counterBuffer);
  const digest = hmac.digest();

  // Dynamic truncation
  const offset = digest[digest.length - 1] & 0x0f;
  const binaryCode =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const otp = binaryCode % 1000000;
  return otp.toString().padStart(6, "0");
}

/**
 * Verifies a user-supplied 6-digit code against their Base32 secret key.
 * Tolerates ±1 time-step drift (90-second total verification window).
 */
export function verifyTwoFactorCode(
  secretBase32: string,
  userCode: string,
  timeMs: number = Date.now()
): boolean {
  if (!secretBase32 || !userCode || userCode.trim().length !== 6) {
    return false;
  }

  const cleanCode = userCode.trim();
  const timeStepMs = 30 * 1000;

  // Check current window, previous window (-30s), and next window (+30s)
  const windows = [0, -1, 1];
  for (const step of windows) {
    const expected = calculateTotpCode(secretBase32, timeMs + step * timeStepMs);
    if (crypto.timingSafeEqual(Buffer.from(cleanCode), Buffer.from(expected))) {
      return true;
    }
  }

  return false;
}

/**
 * Generates an `otpauth://totp/...` URI for Authenticator apps.
 */
export function getTwoFactorOtpAuthUrl(
  email: string,
  secretBase32: string,
  issuer: string = "DigiVigee"
): string {
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedAccount = encodeURIComponent(email);
  return `otpauth://totp/${encodedIssuer}:${encodedAccount}?secret=${secretBase32}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Generates 8 cryptographically secure single-use recovery backup codes.
 * Returns both raw codes (to show once to the admin) and SHA-256 hashes (to store in DB).
 */
export function generateBackupRecoveryCodes(count: number = 8): {
  rawCodes: string[];
  hashedCodes: string[];
} {
  const rawCodes: string[] = [];
  const hashedCodes: string[] = [];

  for (let i = 0; i < count; i++) {
    // 8-character alphanumeric code
    const raw = crypto.randomBytes(4).toString("hex").toUpperCase();
    const formatted = `${raw.slice(0, 4)}-${raw.slice(4, 8)}`;
    const hash = crypto.createHash("sha256").update(formatted).digest("hex");

    rawCodes.push(formatted);
    hashedCodes.push(hash);
  }

  return { rawCodes, hashedCodes };
}

/**
 * Validates a recovery backup code against stored SHA-256 hashes.
 */
export function verifyBackupRecoveryCode(
  providedCode: string,
  hashedCodes: string[]
): { valid: boolean; matchedHash?: string } {
  const clean = providedCode.trim().toUpperCase();
  const providedHash = crypto.createHash("sha256").update(clean).digest("hex");

  const matched = hashedCodes.find((h) => h.toLowerCase() === providedHash.toLowerCase());
  if (matched) {
    return { valid: true, matchedHash: matched };
  }

  return { valid: false };
}
