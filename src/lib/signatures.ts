export interface SignatureRequest { documentId: string; signers: { name: string; email: string; role: 'signer' | 'approver' }[]; expiresAt: string; }
export interface Signature { id: string; signerEmail: string; signedAt: string; ipAddress: string; userAgent: string; }
export function createSignatureRequest(req: SignatureRequest) { return { id: 'sig-' + Date.now(), status: 'pending', ...req }; }
export function verifySignature(sig: Signature): boolean { if (!sig.signedAt || !sig.ipAddress) return false; const signedDate = new Date(sig.signedAt); const now = new Date(); return signedDate <= now; }
