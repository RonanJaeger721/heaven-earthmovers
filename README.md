# Haven Earthmovers

Haven Earthmovers operator-training website, designed and developed by Jaeger Media. Responsive editorial design, interactive featured-machine display, 13-course machine explorer, course-specific WhatsApp enquiries, location directions and FAQs.

The refined homepage uses sentence-case DM Sans headings capped at 48px on desktop and 36px on mobile, readable body text and an equipment-led composition. The featured excavator, mobile crane and forklift controls update the image, fee and linked course. Section headings use a restrained 30–46px range instead of oversized slogans.

## Local preview

Run `npm start`, then open http://localhost:4173. The preview server has no dependencies. Google Fonts has system-font fallbacks.

## Build and deploy

Run `npm run check` and `npm run build`. The static website is emitted into `dist/`. Vercel is configured in `vercel.json`; no runtime server or environment variables are needed.

## Content provenance

Course names, prices, benefits, contacts and addresses come from the supplied Haven flyer, available on the site. The flyer uses `$` without specifying currency. “Series roller” preserves the original wording. Current fees, currency, intake dates, enrolment requirements, training locations and certificate recognition should be confirmed with Haven.

The brand mark is cropped from the flyer. Machine visuals are AI-generated illustrations, explicitly labelled, and do not represent Haven’s actual fleet or facilities. No testimonials, job guarantees or unverifiable statistics have been added.

The enquiry form prepares a message to +263784125509. Visitors review and send it in WhatsApp; the website does not store enquiries. The second telephone contact is +263719784708.

## Verification

The local preview was reviewed at 375, 390, 430, 768, 1024, 1366 and 1440px, with no horizontal page overflow. All 13 course selections, fee updates, filters, mobile navigation and course selection in the enquiry form were checked. No browser console errors were observed. No WhatsApp messages were sent during testing. Reduced-motion CSS and motion-aware JavaScript are included.
