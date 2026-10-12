/**
 * RSVP collector for the Payal & Rishit invitation.
 *
 * Paste this into a Google Apps Script project bound to a Google Sheet, then
 * deploy it as a Web App. Setup steps are in apps-script/README.md.
 *
 * Every submission is appended as one row. The sheet and its header row are
 * created automatically on the first RSVP.
 */

// The Google Sheet to write into. Copy the long id out of the sheet's URL:
//   https://docs.google.com/spreadsheets/d/THIS_PART_HERE/edit
// Required if this script is standalone. Leave blank only when the script was
// created from inside a sheet via Extensions -> Apps Script.
var SPREADSHEET_ID = '1_5iOssU8M070HCIzdvy8D1tD3CTyHl8oNC0x3qZg1d8';

var SHEET_NAME = 'RSVPs';

// Who gets an email on every RSVP. Comma-separate for more than one, e.g.
// 'payal@example.com, rishit@example.com'. Leave blank to email whoever owns
// the script instead.
var NOTIFY_EMAIL = 'aryamanyash11@gmail.com, rishitsethi1@gmail.com';

// Set to false if the per-RSVP emails become too much and you would rather
// just read the sheet.
var SEND_EMAIL = true;

var HEADERS = [
  'Submitted At',
  'Full Name',
  'Phone',
  'Attending',
  'Guests',
  'Events',
  'Message',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'empty request' });
    }

    var data = JSON.parse(e.postData.contents);

    // Honeypot: real guests never fill this hidden field, bots do.
    if (data.website) {
      return json_({ ok: true, skipped: true });
    }

    if (!data.fullName || !data.phone) {
      return json_({ ok: false, error: 'name and phone are required' });
    }

    var row = [
      new Date(),
      String(data.fullName).slice(0, 200),
      String(data.phone).slice(0, 40),
      data.attending === 'yes' ? 'Yes' : 'No',
      Number(data.guests) || 1,
      (data.events || []).join(', '),
      String(data.message || '').slice(0, 2000),
    ];

    var sheet = getSheet_();
    sheet.appendRow(row);

    // The guest list is the source of truth. Notifying is best-effort: if mail
    // fails or the daily quota is hit, the RSVP is already safely recorded.
    if (SEND_EMAIL) {
      try {
        notify_(row, sheet);
      } catch (mailErr) {
        console.error('RSVP saved but email failed: ' + mailErr);
      }
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Lets you open the /exec URL in a browser to check the deployment is live.
function doGet() {
  return json_({ ok: true, service: 'rsvp' });
}




/**
 * Emails the new RSVP along with running totals, so each notification doubles
 * as an up-to-date headcount without opening the sheet.
 */
function notify_(row, sheet) {
  var to = NOTIFY_EMAIL || Session.getEffectiveUser().getEmail();
  var attending = row[3] === 'Yes';
  var name = row[1];

  var stats = tally_(sheet);
  var eventLines = Object.keys(stats.perEvent)
    .map(function (key) {
      return '  • ' + key + ': ' + stats.perEvent[key];
    })
    .join('\n');

  var body =
    (attending ? name + ' is coming!' : name + ' cannot make it.') +
    '\n\n' +
    '────────────────────\n' +
    'Name:     ' + name + '\n' +
    'Phone:    ' + row[2] + '\n' +
    'Guests:   ' + (attending ? row[4] : '—') + '\n' +
    'Events:   ' + (row[5] || '—') + '\n' +
    'Message:  ' + (row[6] || '—') + '\n' +
    '────────────────────\n\n' +
    'RUNNING TOTALS\n' +
    'Responses:      ' + stats.responses + '\n' +
    'Attending:      ' + stats.attending + '\n' +
    'Not attending:  ' + stats.declined + '\n' +
    'Total headcount: ' + stats.headcount + '\n\n' +
    (eventLines ? 'Per event:\n' + eventLines + '\n\n' : '') +
    'Full guest list: ' + getDoc_().getUrl();

  MailApp.sendEmail({
    to: to,
    subject:
      (attending ? '✅ RSVP: ' : '❌ RSVP: ') +
      name +
      ' (' + stats.attending + ' attending, ' + stats.headcount + ' guests)',
    body: body,
  });
}

/** Reads the whole sheet and counts responses, headcount, and per-event totals. */
function tally_(sheet) {
  var last = sheet.getLastRow();
  var stats = { responses: 0, attending: 0, declined: 0, headcount: 0, perEvent: {} };
  if (last < 2) return stats;

  var rows = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  rows.forEach(function (r) {
    stats.responses += 1;
    if (r[3] === 'Yes') {
      stats.attending += 1;
      stats.headcount += Number(r[4]) || 1;
      String(r[5] || '')
        .split(',')
        .map(function (s) { return s.trim(); })
        .filter(Boolean)
        .forEach(function (ev) {
          stats.perEvent[ev] = (stats.perEvent[ev] || 0) + (Number(r[4]) || 1);
        });
    } else {
      stats.declined += 1;
    }
  });
  return stats;
}

/** Works whether this script is bound to a sheet or standalone. */
function getDoc_() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);

  var doc = SpreadsheetApp.getActiveSpreadsheet();
  if (!doc) {
    throw new Error(
      'No spreadsheet found. Set SPREADSHEET_ID at the top of this script.'
    );
  }
  return doc;
}

/**
 * Run this once from the Apps Script editor (select it, press Run) to trigger
 * the authorisation prompt and confirm the sheet is reachable. It writes no
 * data -- it just creates the header row if the sheet is empty.
 */
function setup() {
  var sheet = getSheet_();
  Logger.log('Connected to: ' + getDoc_().getName() + ' / ' + sheet.getName());
  Logger.log('Existing responses: ' + tally_(sheet).responses);
}

function getSheet_() {
  var doc = getDoc_();
  var sheet = doc.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = doc.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
