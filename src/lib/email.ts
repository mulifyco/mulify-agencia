import { Resend } from 'resend'

// Instantiated lazily so the build doesn't fail when RESEND_API_KEY is absent
let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
  return _resend
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@mulify.co'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

interface LeadData {
  name: string
  email: string
  phone?: string | null
  company?: string | null
  service?: string | null
  message: string
  budget?: string | null
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('tr-TR', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function escape(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function buildEmailHtml(lead: LeadData, date: string): string {
  const rows = [
    ['Ad Soyad', `<strong style="color:#e5e5ea">${escape(lead.name)}</strong>`],
    ['E-posta', `<a href="mailto:${lead.email}" style="color:#F5A623;text-decoration:none;">${escape(lead.email)}</a>`],
    ['Telefon', escape(lead.phone ?? '—')],
    ['Şirket', escape(lead.company ?? '—')],
    ['Hizmet', escape(lead.service ?? '—')],
    ['Bütçe', escape(lead.budget ?? '—')],
    ['Tarih', formatDate(date)],
  ]

  const rowsHtml = rows.map(([label, value], i) => `
    <tr>
      <td style="padding:11px 16px;background:${i % 2 === 0 ? '#13131d' : '#16161f'};color:#666;font-size:11px;text-transform:uppercase;letter-spacing:0.07em;width:130px;border-bottom:1px solid #1f1f2e;vertical-align:top;font-family:-apple-system,sans-serif;">${label}</td>
      <td style="padding:11px 16px;background:${i % 2 === 0 ? '#13131d' : '#16161f'};color:#ccc;font-size:13px;border-bottom:1px solid #1f1f2e;font-family:-apple-system,sans-serif;">${value}</td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="tr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:40px 16px;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:36px;">
      <div style="display:inline-flex;align-items:center;gap:10px;">
        <div style="width:32px;height:32px;background:#F5A623;border-radius:8px;transform:rotate(45deg);flex-shrink:0;"></div>
        <span style="font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px;">Mulify</span>
      </div>
      <p style="color:#555;font-size:12px;margin:6px 0 0;letter-spacing:0.1em;text-transform:uppercase;">İletişim Formu Bildirimi</p>
    </div>

    <!-- Alert -->
    <div style="background:linear-gradient(135deg,rgba(245,166,35,0.12),rgba(245,166,35,0.04));border:1px solid rgba(245,166,35,0.25);border-radius:12px;padding:16px 20px;margin-bottom:20px;">
      <p style="color:#F5A623;font-size:14px;font-weight:700;margin:0 0 4px;">🔔 Yeni Mesaj Geldi!</p>
      <p style="color:#888;font-size:13px;margin:0;"><strong style="color:#ddd;">${escape(lead.name)}</strong>${lead.company ? ` (${escape(lead.company)})` : ''} iletişim formunu doldurdu.</p>
    </div>

    <!-- Info Table -->
    <div style="border-radius:12px;overflow:hidden;border:1px solid #1f1f2e;margin-bottom:20px;">
      <div style="background:#F5A623;padding:10px 16px;">
        <p style="color:#0A0A0F;font-weight:800;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;margin:0;">Kişi Bilgileri</p>
      </div>
      <table style="width:100%;border-collapse:collapse;"><tbody>${rowsHtml}</tbody></table>
    </div>

    <!-- Message -->
    <div style="border-radius:12px;overflow:hidden;border:1px solid #1f1f2e;margin-bottom:28px;">
      <div style="background:#1a1a24;padding:10px 16px;border-bottom:1px solid #1f1f2e;">
        <p style="color:#555;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Mesaj İçeriği</p>
      </div>
      <div style="padding:16px 18px;background:#13131d;color:#bbb;font-size:13px;line-height:1.75;white-space:pre-wrap;">${escape(lead.message)}</div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:36px;">
      <a href="mailto:${lead.email}?subject=Re%3A%20İletişim%20Formu%20-%20${encodeURIComponent(lead.name)}&body=Merhaba%20${encodeURIComponent(lead.name)}%2C%0A%0A"
         style="display:inline-block;background:#F5A623;color:#0A0A0F;text-decoration:none;font-weight:800;font-size:13px;padding:12px 28px;border-radius:10px;letter-spacing:0.02em;">
        ✉&nbsp; Hemen Yanıtla
      </a>
      <div style="margin-top:12px;">
        <a href="${APP_URL}/admin/mesajlar" style="color:#F5A623;text-decoration:none;font-size:12px;">Admin panelinde görüntüle →</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #1a1a24;padding-top:20px;text-align:center;">
      <p style="color:#333;font-size:11px;margin:0;">Bu e-posta Mulify iletişim formu tarafından otomatik gönderilmiştir.</p>
      <p style="color:#2a2a38;font-size:11px;margin:4px 0 0;">© ${new Date().getFullYear()} Mulify Digital Agency · Istanbul, Turkey</p>
    </div>

  </div>
</body>
</html>`
}

export async function sendContactNotification(
  lead: LeadData,
  createdAt: string
): Promise<{ id?: string; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not configured — skipping')
    return { error: 'RESEND_API_KEY not set' }
  }

  console.log('[email] Calling Resend — to:', ADMIN_EMAIL, '  key prefix:', process.env.RESEND_API_KEY.slice(0, 10))

  const { data, error } = await getResend().emails.send({
    // Use Resend's own verified domain until mulify.co is verified in Resend dashboard
    from: 'Mulify <onboarding@resend.dev>',
    to: [ADMIN_EMAIL],
    replyTo: lead.email,
    subject: `🔔 Yeni Mesaj: ${lead.name}${lead.company ? ` · ${lead.company}` : ''}`,
    html: buildEmailHtml(lead, createdAt),
  })

  if (error) {
    console.error('[email] Resend API error:', JSON.stringify(error))
    return { error: JSON.stringify(error) }
  }

  console.log('[email] Sent OK — id:', data?.id)
  return { id: data?.id }
}
