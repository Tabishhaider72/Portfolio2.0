const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function verifyTurnstileToken(token?: string, remoteIp?: string): Promise<boolean> {
    // If Turnstile secret key is not configured, pass validation during development
    if (!TURNSTILE_SECRET_KEY) {
        return true;
    }

    if (!token) {
        return false;
    }

    try {
        const formData = new URLSearchParams();
        formData.append('secret', TURNSTILE_SECRET_KEY);
        formData.append('response', token);
        if (remoteIp) {
            formData.append('remoteip', remoteIp);
        }

        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            body: formData,
        });

        const outcome = await res.json();
        return outcome.success === true;
    } catch (error) {
        console.error('[Turnstile Verification Error]:', error);
        return false;
    }
}
