// FR-6: iPad-safe HTML email — inline CSS, single column, max-width 600px, system fonts, no JS, no external resources.
import { settings } from '../lib/config.js';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function shell(title, body) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f6f8;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;"><tr><td align="center" style="padding:16px 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;font-family:${FONT};color:#1a1a1a;">
<tr><td style="background:#0B2545;color:#ffffff;padding:16px 20px;border-radius:8px 8px 0 0;font-size:18px;font-weight:bold;">${esc(title)}</td></tr>
${body}
</table></td></tr></table></body></html>`;
}

const row = (html) => `<tr><td style="padding:12px 20px;font-size:15px;line-height:1.5;">${html}</td></tr>`;
const button = (href, label) => `<a href="${esc(href)}" style="display:inline-block;background:#0B2545;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold;font-size:15px;">${esc(label)}</a>`;

/** FR-6.2 time model: 1 min/approval + 3 min/resume review + 1 min/message review + 4 min/application. */
export function timeToClear({ pendingApprovals = 0, assetsToReview = 0 }, m = settings().time_model_minutes) {
  return pendingApprovals * m.approval + assetsToReview * (m.resume_review + m.message_review + m.application);
}

export function digestEmail(s) {
  const mins = timeToClear(s);
  const stat = (n, label, color = '#0B2545') => `<td width="33%" align="center" style="padding:8px;"><div style="font-size:28px;font-weight:bold;color:${color};">${n}</div><div style="font-size:13px;color:#555;">${esc(label)}</div></td>`;
  const notConfigured = (s.failures || []).filter((f) => /not configured/i.test(f.error));
  const realFailures = (s.failures || []).filter((f) => !/not configured/i.test(f.error));
  const failures = realFailures.length ? row(`<div style="background:#fdecea;border-left:4px solid #c0392b;padding:10px 12px;"><b>${realFailures.length} source(s) failed this run</b><br>${realFailures.slice(0, 8).map((f) => `${esc(f.source)}: ${esc(f.error)}`).join('<br>')}</div>`) : '';
  const fatal = s.fatal ? row(`<div style="background:#fdecea;border-left:4px solid #c0392b;padding:10px 12px;"><b>The run failed:</b> ${esc(s.fatal)}<br>Open the GitHub Actions log: ${s.runUrl ? `<a href="${esc(s.runUrl)}">${esc(s.runUrl)}</a>` : 'Actions tab'}</div>`) : '';
  const top = (s.top || []).slice(0, 5).map((l) => `<tr><td style="padding:6px 0;border-bottom:1px solid #eee;font-size:14px;"><b>${esc(l.title)}</b> · ${esc(l.employer)}<br><span style="color:#555;">${esc(l.work_model)} · ${esc(l.hiring_location).slice(0, 60)} · score ${Number(l.total_score).toFixed(2)}</span></td></tr>`).join('');
  return {
    subject: `${s.fatal ? '⚠️ FAILED — ' : ''}Job Search Factory: ${s.newListings} new, ${s.aboveThreshold} above threshold · ~${mins} min to clear`,
    html: shell('Job Search Factory — run summary', [
      fatal,
      row(`<table role="presentation" width="100%"><tr>${stat(s.newListings, 'new listings')}${stat(s.aboveThreshold, 'above threshold', '#1e7e34')}${stat(s.pendingActions, 'awaiting you', '#b35c00')}</tr></table>`),
      row(`<b>Estimated time to clear: ~${mins} minutes</b><br><span style="color:#555;font-size:13px;">${s.pendingApprovals} approval decisions × 1 min + ${s.assetsToReview} asset sets × 8 min (3 resume review + 1 message review + 4 application)</span>`),
      top ? row(`<b>Top new listings</b><table role="presentation" width="100%">${top}</table>`) : '',
      failures,
      notConfigured.length ? row(`<span style="color:#888;font-size:12px;">Not set up yet (optional): ${notConfigured.map((f) => esc(f.source)).join(', ')}</span>`) : '',
      s.backlog > s.pendingApprovals ? row(`<span style="color:#555;font-size:13px;">Older backlog: ${s.backlog} undecided rows above threshold in the tracker. Optional; not counted in today's time.</span>`) : '',
      row(s.sheetUrl ? button(s.sheetUrl, 'Open tracker') : 'Tracker link unavailable'),
      row(`<span style="color:#888;font-size:12px;">Run ${esc(s.runAt)} · ${s.totalFetched ?? 0} listings fetched from ${s.sourcesOk ?? 0} sources · ${s.matched ?? 0} matched target titles</span>`),
    ].join('')),
  };
}

export function confirmationEmail({ company, title, count, folder, pages }) {
  return {
    subject: `Assets ready: ${company} — ${title}`,
    html: shell('Application assets ready', [
      row(`<b>${esc(company)}</b><br>${esc(title)}`),
      row(`${count} assets generated (resume, cover letter, LinkedIn message, company info sheet, case study deck), plus resume PDF, Selection Log and ATS answer pack.${pages > 1 ? '<br><b style="color:#c0392b;">Resume is over one page — review before sending.</b>' : ''}`),
      row(button(folder, 'Open Drive folder')),
    ].join('')),
  };
}
