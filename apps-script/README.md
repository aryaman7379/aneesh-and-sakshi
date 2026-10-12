# RSVP backend — Google Sheet + email alerts

Every RSVP does two things:

1. **Appends a row to your Google Sheet** — this is the guest list. Sortable,
   filterable, exportable, and yours.
2. **Emails you** with that guest's details plus running totals: how many have
   replied, total headcount, and a per-event breakdown.

Free, no submission limit, no third-party service holding your guest list.

Takes about five minutes. You need to do this yourself — it requires signing
in to your own Google account.

## 1. Make the sheet

1. Go to <https://sheets.new> and name it something like `PR Wedding RSVPs`.

## 2. Add the script

1. In that sheet: **Extensions → Apps Script**.
2. Delete whatever is in `Code.gs`.
3. Paste the entire contents of [`Code.gs`](./Code.gs) from this folder.
4. At the top, set `SPREADSHEET_ID` to the id from your sheet's URL — the long
   string between `/d/` and `/edit`:

   ```
   https://docs.google.com/spreadsheets/d/1AbC...XyZ/edit
                                          ^^^^^^^^^^ this part
   ```

   ```js
   var SPREADSHEET_ID = '1AbC...XyZ';
   ```

   You can skip this **only** if you opened the editor from inside the sheet via
   Extensions → Apps Script. If you created the script standalone at
   script.new, it is required — otherwise every RSVP fails with
   *"You do not have permission to call SpreadsheetApp.getActiveSpreadsheet"*.
5. Also set who gets the alert emails:

   ```js
   var NOTIFY_EMAIL = 'payal@example.com, rishit@example.com,';
   ```

   Leave it as `''` to email whoever owns the script. Set `SEND_EMAIL = false`
   later if the per-RSVP emails get noisy and you'd rather just read the sheet.
6. Save (the disk icon).
7. Select **`setup`** in the function dropdown and press **Run**. Approve the
   authorisation prompts. This grants the Sheets and Gmail permissions and
   confirms the script can reach your sheet — it writes no guest data.

## 3. Deploy it

1. **Deploy → New deployment**.
2. Click the gear next to "Select type" and pick **Web app**.
3. Set:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`  ← must be `Anyone`, not "Anyone with Google account"
4. **Deploy**. Google will ask you to authorise it — approve the prompts.
   The "Google hasn't verified this app" warning is expected for your own
   script: choose **Advanced → Go to (project name)**.
5. Copy the **Web app URL**. It ends in `/exec`.

## 4. Plug it into the site

Open `src/content.js` and paste the URL:

```js
export const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfy.../exec';
```

## 5. Check it

Open the `/exec` URL in a browser tab. You should see:

```json
{"ok":true,"service":"rsvp"}
```

Then submit a test RSVP on the site and confirm a row appears in the sheet.
Delete the test row afterwards.

## Email limits

A consumer Gmail account can send **100 emails per day** via Apps Script
(Workspace accounts get 1,500). Comfortable for a wedding, but if you expect a
flood right before the RSVP deadline and hit the cap, the emails stop — the
sheet keeps recording every RSVP regardless. Nothing is ever lost; saving the
row happens before the email is attempted.

## If you redeploy

Editing the script does **not** update the live web app. Use
**Deploy → Manage deployments → (pencil icon) → Version: New version → Deploy**.
The URL stays the same.

## Why the request looks odd

The site sends the RSVP with `Content-Type: text/plain`, not
`application/json`. That is deliberate: it keeps the request a CORS "simple
request" so the browser skips the preflight `OPTIONS` call, which Apps Script
web apps do not answer. The script still parses the body as JSON.
