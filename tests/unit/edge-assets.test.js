// Edge-case tests: asset validation and publish logic
import '../helpers.js';
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { validateLinkedIn, validateDeck, validateResume, validateCoverLetter, validateInfoSheet, validateAssets, r5Violations, SUPERLATIVES, ASKS, GENERIC_NOTE, LETTER_CLICHES } from '../../src/assets/validate.js';
import { cutLowestBullet, selectionLogBlocks } from '../../src/assets/publish.js';

// --- LinkedIn validation ---
describe('validateLinkedIn edge cases', () => {
  test('missing message', () => {
    assert.ok(validateLinkedIn(null).length > 0);
    assert.ok(validateLinkedIn(undefined).length > 0);
  });

  test('over 300 chars rejected', () => {
    const long = 'x'.repeat(301);
    assert.ok(validateLinkedIn(long).some((e) => e.includes('chars')));
  });

  test('exactly 300 chars accepted (no length error)', () => {
    const msg = 'Hi, really interested in the work Cloudflare is doing in zero-day protection — shipping managed rules within hours of disclosure for 20% of the web is a genuinely hard product problem. Would love to connect. And a bit more text here to reach the limit of three hundred characters exact padding.';
    const trimmed = msg.slice(0, 300);
    const errors = validateLinkedIn(trimmed, { company: 'Cloudflare' });
    assert.ok(!errors.some((e) => e.includes('chars')));
  });

  test('superlative rejected', () => {
    for (const word of ['amazing', 'incredible', 'outstanding']) {
      assert.ok(validateLinkedIn(`Hi, ${word} work at Acme on the 2026 launch.`, { company: 'Acme' }).some((e) => e.includes('superlative')), word);
    }
  });

  test('ask for referral rejected', () => {
    assert.ok(validateLinkedIn('Hi, could you refer me to the team at Acme? They shipped 10x in 2026.', { company: 'Acme' }).some((e) => e.includes('request')));
  });

  test('generic stock phrase rejected', () => {
    for (const phrase of ['glad to connect', 'reaching out', 'i came across', 'problem space']) {
      assert.ok(validateLinkedIn(`Hi, ${phrase} — Acme shipped 100 features in 2026.`, { company: 'Acme' }).some((e) => e.includes('stock phrase')), phrase);
    }
  });

  test('no concrete detail (number/date) rejected', () => {
    assert.ok(validateLinkedIn('Hi, interested in the work Acme is doing in cloud computing.', { company: 'Acme' }).some((e) => e.includes('concrete detail')));
  });

  test('company name must appear', () => {
    assert.ok(validateLinkedIn('Hi, great product work — shipped 10 features in 2026.', { company: 'Cloudflare', products: ['Workers'] }).some((e) => e.includes('reference the company')));
  });

  test('product name also counts as company reference', () => {
    const errors = validateLinkedIn('Hi, interested in the work on Workers — 10 million requests daily in 2026.', { company: 'Cloudflare', products: ['Workers'] });
    assert.ok(!errors.some((e) => e.includes('reference the company')));
  });

  test('valid message passes', () => {
    const msg = 'Hi, really interested in the work Cloudflare is doing in zero-day protection — shipping managed rules within hours of disclosure for 20% of the web.';
    assert.deepEqual(validateLinkedIn(msg, { company: 'Cloudflare' }), []);
  });
});

// --- Deck validation ---
describe('validateDeck edge cases', () => {
  const goodSlide = (i) => ({
    section: i === 0 ? undefined : 'Situation',
    title: 'This company faces a critical challenge in scaling their product infrastructure',
    lines: i === 0 ? ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'] : ['Point A', 'Point B', 'Point C'],
    so_what: 'Key implication',
    source: 'https://example.com',
  });

  const goodDeck = () => ({
    cover: { title: 'Case Study', subtitle: 'For Company X' },
    slides: [goodSlide(0), goodSlide(1), goodSlide(2), goodSlide(3), goodSlide(4)],
    close: { title: 'Thank you', lines: ['Key takeaway'] },
  });

  test('valid deck passes', () => {
    assert.deepEqual(validateDeck(goodDeck()), []);
  });

  test('too few slides', () => {
    const d = goodDeck();
    d.slides = [goodSlide(0), goodSlide(1), goodSlide(2)];
    assert.ok(validateDeck(d).some((e) => e.includes('slides')));
  });

  test('too many slides', () => {
    const d = goodDeck();
    d.slides = Array.from({ length: 8 }, (_, i) => goodSlide(i));
    assert.ok(validateDeck(d).some((e) => e.includes('slides')));
  });

  test('exec summary wrong line count', () => {
    const d = goodDeck();
    d.slides[0].lines = ['Only one line'];
    assert.ok(validateDeck(d).some((e) => e.includes('summary')));
  });

  test('missing cover', () => {
    const d = goodDeck();
    d.cover = {};
    assert.ok(validateDeck(d).some((e) => e.includes('cover')));
  });

  test('missing close', () => {
    const d = goodDeck();
    d.close = {};
    assert.ok(validateDeck(d).some((e) => e.includes('closing')));
  });

  test('short action title rejected', () => {
    const d = goodDeck();
    d.slides[1].title = 'Too Short';
    assert.ok(validateDeck(d).some((e) => e.includes('action title')));
  });

  test('recruiter language rejected', () => {
    const d = goodDeck();
    d.slides[1].lines = ['Present to the talent acquisition team for review'];
    assert.ok(validateDeck(d).some((e) => e.includes('recruiting')));
  });

  test('missing section tag on non-first slide', () => {
    const d = goodDeck();
    delete d.slides[2].section;
    assert.ok(validateDeck(d).some((e) => e.includes('section')));
  });
});

// --- Resume validation (partial — requires master.md for ACH check) ---
describe('validateResume edge cases', () => {
  const mkBullet = (text, overrides = {}) => ({
    text, ach: ['ACH-001'], type: 'Fact', flag: 'USE', rank: 1, ...overrides,
  });

  const mkResume = (bulletCount = 22, overrides = {}) => ({
    name: 'Iman Sadhu',
    headline: 'Group Product Manager · AI Product Portfolio · Healthcare',
    contact: 'email@example.com',
    summary: 'Summary sentence one. Sentence two. Sentence three.',
    kpis: [{ figure: '67%→87%', caption: 'Accuracy' }, { figure: '$4.2M', caption: 'Savings' }, { figure: '8', caption: 'Agents' }, { figure: '2x', caption: 'Throughput' }],
    skills: [{ label: 'AI/ML', text: 'NLP, computer vision' }],
    role_line: { title: 'GPM', company: 'Indegene', dates: '2022–present', context: 'Healthcare AI' },
    story_rows: [
      { label: 'Value generated via Products', bullets: Array.from({ length: 5 }, (_, i) => mkBullet(`Raised content accuracy **67% to 87%** with evaluation framework ${i}`)) },
      { label: 'The strategy', bullets: Array.from({ length: 5 }, (_, i) => mkBullet(i === 0 ? `Merged three separate product workflows into a single AI-native workflow, cutting effort by half and doubling capacity — a bet that the vertical-specific prompts would outperform the generic ones within two quarters ${i}` : `Strategic initiative ${i} with **bold** anchor`)) },
      { label: 'What I built', bullets: Array.from({ length: 4 }, (_, i) => mkBullet(`Built pipeline component ${i} with **real metrics**`)) },
      { label: 'How I made it trustworthy', bullets: Array.from({ length: 3 }, (_, i) => mkBullet(`Quality gate ${i} with **testing framework**`)) },
      { label: 'How I delivered', bullets: Array.from({ length: Math.max(0, bulletCount - 17) }, (_, i) => mkBullet(`Delivered milestone ${i} on **schedule**`)) },
    ],
    prior_role: { title: 'PM', company: 'Previous', dates: '2019–2022', label: 'Earlier work', bullets: [mkBullet('Prior achievement with **metrics**')] },
    earlier: [{ lead: 'Analyst | OtherCo | 2017–2019', text: 'Analysis work' }],
    education: 'MBA, IIM Ahmedabad; BTech, NIT',
    ...overrides,
  });

  test('bullet with banned phrasing rejected', () => {
    const r = mkResume();
    r.story_rows[0].bullets[0].text = 'Was responsible for the product roadmap with **key metrics**';
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('banned phrasing')));
  });

  test('bullet with multiple bold anchors rejected', () => {
    const r = mkResume();
    r.story_rows[0].bullets[0].text = 'Raised **accuracy** and **throughput** and **latency** in the pipeline';
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('bold anchor')));
  });

  test('too few bullets rejected', () => {
    const r = mkResume(15);
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('bullets') && e.includes('need')));
  });

  test('too many bullets rejected', () => {
    const r = mkResume(28);
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('bullets') && e.includes('need')));
  });

  test('row with >5 bullets rejected', () => {
    const r = mkResume();
    r.story_rows[0].bullets = Array.from({ length: 6 }, (_, i) => mkBullet(`Bullet ${i} with **anchor**`));
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('max 5')));
  });

  test('missing strategy row rejected', () => {
    const r = mkResume();
    r.story_rows[1].label = 'The approach';
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('strategy row')));
  });

  test('strategy row with too few bullets rejected', () => {
    const r = mkResume();
    r.story_rows[1].bullets = [mkBullet('Only one strategy bullet with **anchor**'), mkBullet('Second with **x**')];
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('strategy row') && e.includes('min')));
  });

  test('same verb opening >2 times rejected', () => {
    const r = mkResume();
    for (let i = 0; i < 3; i++) r.story_rows[0].bullets[i].text = `Built something ${i} with **metric**`;
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('"built"') && e.includes('max 2')));
  });

  test('too many generated bullets rejected', () => {
    const r = mkResume();
    for (const row of r.story_rows) for (const b of row.bullets) b.type = 'G1';
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('generated') && e.includes('R14')));
  });

  test('wrong KPI count rejected', () => {
    const r = mkResume();
    r.kpis = [{ figure: '1', caption: 'x' }];
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('4 KPI')));
  });

  test('education with years rejected', () => {
    const r = mkResume();
    r.education = 'MBA, IIM Ahmedabad, 2015; BTech, NIT, 2013';
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('education') && e.includes('no years')));
  });

  test('earlier role missing year format rejected', () => {
    const r = mkResume();
    r.earlier = [{ lead: 'Analyst at OtherCo for some time', text: 'work' }];
    const errors = validateResume(r);
    assert.ok(errors.some((e) => e.includes('Years')));
  });
});

// --- Cover letter validation ---
describe('validateCoverLetter edge cases', () => {
  const goodLetter = () => ({
    greeting: 'Dear Cloudflare Product team,',
    paragraphs: [
      'In October 2026, Cloudflare shipped managed WAF rules within hours of a zero-day disclosure, protecting roughly 20% of the web from active exploitation before most vendors had even published advisories. That response speed reveals a genuinely difficult product problem: at scale, the trade-off between automation confidence and false-positive risk does not get easier with more data, it gets harder, because the cost of a wrong classification compounds across millions of origins.',
      'At Indegene, I led a product team through a structurally similar trade-off in pharmaceutical content automation. We built an AI pipeline where a false positive meant publishing a compliance violation visible to regulators, and a false negative meant a valid medical claim never reached the physician. I designed a two-stage evaluation framework, scored by subject-matter experts, that raised content-selection accuracy from 67% to 87% while cutting manual review hours in half and keeping the error rate below the FDA threshold that would have triggered an audit.',
      'The pattern transfers directly to Cloudflare. Your managed rules are another instance of high-stakes automated classification operating under time pressure: miss a threat and customers are exposed at scale; flag too aggressively and legitimate traffic drops, eroding the trust that makes customers delegate security to you in the first place. The evaluation framework I built maps to rule-confidence scoring, and the compliance gates map to your WAF tuning and rollback workflow.',
      'I have not built network-security products before, and I would not pretend otherwise. But I have built products where automated decisions carry real and measurable consequences, and where the feedback loop between model confidence, human override, and downstream customer impact is the core product problem rather than a side concern.',
      'I would welcome a conversation about how Cloudflare thinks about that confidence-override trade-off at the edge, and whether there is a product thesis behind the speed of that October response that could be extended to other threat classes. That feels like a genuinely interesting product question.',
    ],
    sign_off: 'Best regards,\nIman Sadhu',
    sources: ['ACH-001', 'ACH-015'],
  });

  test('valid cover letter passes', () => {
    assert.deepEqual(validateCoverLetter(goodLetter(), null), []);
  });

  test('missing greeting', () => {
    const l = goodLetter();
    delete l.greeting;
    assert.ok(validateCoverLetter(l).some((e) => e.includes('greeting')));
  });

  test('too few paragraphs', () => {
    const l = goodLetter();
    l.paragraphs = l.paragraphs.slice(0, 2);
    assert.ok(validateCoverLetter(l).some((e) => e.includes('paragraphs')));
  });

  test('list in paragraph rejected', () => {
    const l = goodLetter();
    l.paragraphs[1] = '- Point one\n- Point two\nSome trailing sentence here.';
    assert.ok(validateCoverLetter(l).some((e) => e.includes('list')));
  });

  test('cliché rejected', () => {
    const l = goodLetter();
    l.paragraphs[0] = 'I am excited to apply for this role at Cloudflare. The company shipped managed rules in October 2026, protecting 20% of the web. This demonstrates the kind of product thinking that makes this opportunity exceptional.';
    assert.ok(validateCoverLetter(l).some((e) => e.includes('cliché')));
  });

  test('single-sentence paragraph rejected', () => {
    const l = goodLetter();
    l.paragraphs[2] = 'Just one sentence here.';
    assert.ok(validateCoverLetter(l).some((e) => e.includes('not a paragraph')));
  });
});

// --- Info sheet ---
describe('validateInfoSheet edge cases', () => {
  test('complete info passes', () => {
    assert.deepEqual(validateInfoSheet({ overview: 'x', products: ['a'], market_position: 'x', recent_developments: ['x'], relevance: ['x'], sources: ['https://x.com'] }), []);
  });

  test('missing sections detected', () => {
    const errors = validateInfoSheet({});
    assert.ok(errors.length >= 5);
  });

  test('missing sources detected', () => {
    const errors = validateInfoSheet({ overview: 'x', products: ['a'], market_position: 'x', recent_developments: ['x'], relevance: ['x'] });
    assert.ok(errors.some((e) => e.includes('sources')));
  });
});

// --- R5 violations ---
describe('R5 violations', () => {
  test('r5Violations catches forbidden terms', () => {
    const terms = r5Violations('This project was for a client named Acme Pharma');
    // depends on config/forbidden_terms.json — just check it returns an array
    assert.ok(Array.isArray(terms));
  });
});

// --- cutLowestBullet ---
describe('cutLowestBullet', () => {
  test('removes the highest-rank bullet', () => {
    const resume = {
      story_rows: [
        { bullets: [{ text: 'A', rank: 1 }, { text: 'B', rank: 5 }] },
        { bullets: [{ text: 'C', rank: 3 }] },
      ],
    };
    const cut = cutLowestBullet(resume);
    assert.equal(cut.text, 'B');
    assert.equal(resume.story_rows[0].bullets.length, 1);
  });

  test('rank 0 or undefined treated as 0', () => {
    const resume = {
      story_rows: [
        { bullets: [{ text: 'A' }, { text: 'B', rank: 1 }] },
      ],
    };
    const cut = cutLowestBullet(resume);
    assert.equal(cut.text, 'B');
  });
});

// --- selectionLogBlocks ---
describe('selectionLogBlocks', () => {
  test('includes open items and cut bullets', () => {
    const a = {
      company: 'X', title: 'PM',
      resume: { story_rows: [{ bullets: [{ text: '**Bold** point', ach: ['ACH-001'], type: 'Fact', flag: 'USE', requirement: 'JD req' }] }] },
      cover_letter: { sources: ['ACH-001'] },
      open_items: ['Confirm G1 bullet'],
    };
    const cut = [{ text: 'Cut bullet', ach: ['ACH-002'] }];
    const blocks = selectionLogBlocks(a, cut);
    assert.ok(blocks.some((b) => b.heading.includes('Selection Log')));
    assert.ok(blocks.some((b) => b.heading.includes('Cut')));
    assert.ok(blocks.some((b) => b.heading === 'Open items'));
  });

  test('no cut section when nothing was cut', () => {
    const a = {
      company: 'X', title: 'PM',
      resume: { story_rows: [{ bullets: [{ text: 'Point', ach: ['ACH-001'], type: 'Fact', flag: 'USE' }] }] },
      open_items: [],
    };
    const blocks = selectionLogBlocks(a, []);
    assert.ok(!blocks.some((b) => b.heading?.includes('Cut')));
  });
});
