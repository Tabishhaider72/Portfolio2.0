import { HireRequestRecord } from '@/types/hire';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramNotification(record: HireRequestRecord) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('[Telegram Skipped]: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in environment.');
        return { success: false, reason: 'Credentials not configured' };
    }

    let messageText = `🚨 <b>NEW HIRE REQUEST</b>\n\n`;
    messageText += `🆔 <b>ID:</b> <code>${record.requestId}</code>\n`;
    messageText += `📌 <b>Type:</b> ${record.type}\n`;
    messageText += `👤 <b>Client:</b> ${record.name}\n`;
    messageText += `📧 <b>Email:</b> ${record.email}\n`;

    if (record.company) {
        messageText += `🏢 <b>Company:</b> ${record.company}\n`;
    }
    if (record.phone) {
        messageText += `📞 <b>Phone:</b> ${record.phone}\n`;
    }

    if (record.type === 'JOB') {
        messageText += `\n💼 <b>Role Title:</b> ${record.roleTitle || 'N/A'}\n`;
        messageText += `📍 <b>Location:</b> ${record.location || 'N/A'}\n`;
        messageText += `⏳ <b>Type:</b> ${record.employmentType || 'N/A'}\n`;
        if (record.jobDescriptionUrl) {
            messageText += `🔗 <b>Job URL:</b> ${record.jobDescriptionUrl}\n`;
        }
    } else if (record.type === 'PROJECT') {
        messageText += `\n🚀 <b>Project Type:</b> ${record.projectType || 'N/A'}\n`;
        messageText += `💰 <b>Budget:</b> ${record.budget || 'N/A'}\n`;
        messageText += `⏰ <b>Timeline:</b> ${record.timeline || 'N/A'}\n`;
        messageText += `📊 <b>Category:</b> ${record.complexityCategory || 'STARTER'} (Score: ${record.complexityScore || 0})\n`;
        messageText += `🏷️ <b>Est. Range:</b> ${record.estimatedRange || 'N/A'}\n`;
        if (record.features && record.features.length > 0) {
            messageText += `🛠️ <b>Features:</b> ${record.features.join(', ')}\n`;
        }
    }

    if (record.description) {
        const truncatedDesc = record.description.length > 200 
            ? record.description.substring(0, 197) + '...' 
            : record.description;
        messageText += `\n📝 <b>Details:</b> ${truncatedDesc}\n`;
    }

    messageText += `\n⏰ <i>Received at ${new Date(record.createdAt).toLocaleTimeString()}</i>`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: messageText,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error('[Telegram API Error]:', errData);
            return { success: false, error: errData };
        }

        return { success: true };
    } catch (err: any) {
        console.error('[Telegram Exception]:', err?.message || err);
        return { success: false, error: err?.message };
    }
}
