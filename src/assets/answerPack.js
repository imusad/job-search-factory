// JSF-408: deterministic answer pack from config/profile.json — one field per line for copy-paste. No submission automation.
import { readJson } from '../lib/config.js';

export function answerPackBlocks(listing, profile = readJson('config/profile.json')) {
  return [
    { heading: 'How to use', lines: [`Copy each value into the ${listing.ats_platform || 'ATS'} form for "${listing.title}" at ${listing.employer}. Submission stays with you.`] },
    { heading: 'Personal details', lines: [`First name: ${profile.name.split(' ')[0]}`, `Last name: ${profile.name.split(' ').slice(1).join(' ')}`, `Email: ${profile.email}`, `Phone: ${profile.phone}`, `LinkedIn: https://${profile.linkedin}`, `Current location: ${profile.location}`] },
    { heading: 'Work history (most recent first)', lines: profile.work_history.flatMap((w) => [`Job title: ${w.title}`, `Company: ${w.company}`, `Location: ${w.location}`, `From: ${w.start}`, `To: ${w.end}`, '—']) },
    { heading: 'Education', lines: profile.education.flatMap((e) => [`Degree: ${e.degree}`, `School: ${e.school}`, `Years: ${e.years}`, '—']) },
    { heading: 'Skills', lines: [profile.skills.join(', ')] },
    { heading: 'Eligibility and preferences', lines: [`Work authorisation: ${profile.visa_status}`, `Requires sponsorship: ${/india/i.test(listing.hiring_location || '') ? 'No (role in India)' : 'See visa status'}`, `Notice period: ${profile.notice_period}`, `Salary expectation: ${profile.salary_expectation}`, `Relocation: ${profile.relocation}`, `Willing to travel: ${profile.willing_to_travel}`, `Voluntary disclosures: ${profile.gender_ethnicity_disability}`] },
    { heading: 'Links', lines: [`Job posting: ${listing.application_url}`] },
  ];
}
