# fresh-front

## Saved enquiries

The form sends each enquiry to the existing server with a stable submission ID and timestamp. Failed requests keep the answers and reuse that ID when retried unchanged. Success is shown only after the server confirms saving. New or edited enquiries receive a new ID. Fresh and Clean's WebM8 Leads register contains contact details and the complete submitted answers; optional analytics still receive only form event categories.

## WebM8 website analytics

The homepage loads the shared consent-controlled WebM8 installer with public site ID `2e74f359-2e31-4ecb-9e87-281ceebdc7c8`, registered to Fresh and Clean. Visitors choose whether to allow activity measurement through the initial consent prompt. The default Privacy choices footer button is hidden by `js/footer.js` while a separate control is being added. Browser privacy signals are respected. Services/about/quote sections and quote links use stable labels. The existing form handler records API-confirmed enquiry outcomes without sending form contents to analytics. The enquiry API and delivery behavior are unchanged.
