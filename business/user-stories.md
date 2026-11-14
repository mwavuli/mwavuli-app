# Mwavuli product user stories

Status: version 0.1, draft for owner review. Ticket MVL-29. Written on 2026-11-12 and revised on 2026-11-13 from the
business model, the agreements, the brand language and the site.

What the product must let each person do, from the first enquiry to the landlord's exit. It is not a spec: no screens
and no API.

## How to read

- A story starts with who does it. Stories sit under the stage they happen in.
- `launch` is needed for the first landlords. `next` comes once they are live. `later` is parked work, in stage 16.
- After the `·` is the term the story comes from: `BM` and `P` IDs in [the model](model.md), `S` clauses in the
  [schedule](agreements/landlord-agreement-schedule.md), `Annex` in the [agreement](agreements/landlord-agreement.md),
  `form` clauses in the [tenancy form](agreements/tenancy-form.md), `brand` IDs in [brand/](../brand/README.md).
- `BM13` to `BM15` are in the [rent advance addendum](addendum-rent-advance.md).
- `proposed` is added here and the owner decides. `open` waits on a term nobody has decided (see the end).

## Context

- The product is the register, the money ledger and the message channel behind one promise: rent on the 1st for every
  occupied unit, with the first missed month covered (BM1, BM18).
- Two limits recur: the approval limit, UGX 200,000 on a quote, above which the landlord says YES, and the emergency
  amount, UGX 500,000, up to which an urgent safety repair goes ahead first (BM2, P6).
- The last six figures in the model's Numbers table (the 10% fee, the two limits, the 14 days for the final payment, the
  30 days to fix, no minimum size) are starting figures to test with the first landlords, so the product keeps them as
  settings (proposed).
- A rent month runs from one due date of a tenancy to the next; a part month counts 30 days to the month (P14, S1.13).
- Landlords and tenants work by SMS, WhatsApp, call and mobile money first. At launch only operations has a portal
  (proposed): web in the office, mobile in the field. The landlord and tenant portals (Home, Properties, Payments,
  More; brand A5) show the same data and come next.

Uganda shapes every story:

- Mobile money (MTN, Airtel; providers to confirm) and bank are the rails. Staff never take cash (P1).
- Phone-first and officer-assisted: the main landlord has little formal education (BM3), so an officer sets everything
  up and explains it aloud.
- English and Luganda, each complete and reviewed (BM11, brand F8). A signature or a thumbprint, before a witness.
- Local papers: NIN, LC1 letter, title by tenure: freehold, leasehold, mailo, customary (BM7).
- Kampala and its surroundings (BM9). UGX at launch; rent currency is open. Written as brand F8 sets: UGX 1,200,000;
  9 Nov 2026; +256 7XX XXX XXX.
- Low-end phones, bright sun, patchy data: light pages and 44 px targets (brand G4, brand S8, brand T8). Officer
  tools that work offline are proposed.
- Law fixes some terms: the Landlord and Tenant Act 2022, the Data Protection and Privacy Act 2019,
  anti-money-laundering rules, the Illiterates Protection Act. Stories that wait on counsel say `open`.

## Who

- **Landlord:** owns rooms, flats, small blocks, shops or offices, alone, with family or as an estate. Reads SMS and
  WhatsApp and may never open an app. Wants the 1st, no lock-in, no surprises.
- **Tenant:** prospective or current. Pays monthly, sometimes months ahead (P13). Assumed: many pay cash today, so P1
  changes a habit. Wants repairs done and the deposit back.
- **Business tenant:** a shop or office tenant, who may pay VAT on rent, depending on the landlord's VAT status.
- **Officer, Finance, Support, Manager:** the operations persona. The team's WhatsApp groups are Ops, Finance, Support
  and General (brand D18). Manager is the owner and senior staff (assumed).
- **Caretaker, contractor:** outside the product; take jobs and report faults by WhatsApp or SMS, no login. A caretaker
  never collects rent (proposed).
- **Accountant, counsel:** outside the product; read-only extracts.

## Use cases

- **A tenant misses March.** The due date passes unpaid, so the room has its covered month and the chasing starts:
  reminder, call, visit, then a written notice (when it goes out is open) → the landlord keeps the UGX 340,000 paid
  on 1st March → still unpaid on 1st April: the room's payout pauses → the tenant pays UGX 400,000 on 20th April,
  which repays March → April is still owed, nothing on 1st May → April is paid and the landlord gets UGX 340,000.
  [BM1, BM5, BM20]
- **A roof leaks.** Tenant reports with photos → Support triages it → Officer gets a UGX 600,000 quote plus a UGX 60,000
  fee → above the approval limit and the emergency amount, so the landlord is asked first and replies YES → the
  contractor works and sends photos → the statement lists UGX 660,000. [BM2, P6]
- **A family building with no title.** The landlord brings a sale agreement, an LC1 letter, a NIN and a signed statement
  → Officer checks all four → inspection finds bad wiring, 30 days to fix → the accept test passes → the agreement is
  explained in Luganda and signed with a thumbprint before the landlord's sister → existing tenants are visited and
  moved onto the form → first payout on the next 1st. [BM7, P4, BM17, BM11, P3]
- **A new tenant takes a room.** Viewing → form explained and signed → deposit, the days up to the first due date and
  any rent ahead paid to Mwavuli by mobile money → unit occupied, landlord told → the part month reaches the landlord,
  less 15%, on the first payout after move-in, and cover starts on the first 1st after the unit is occupied.
  [BM6, P2, P13, P14]
- **A payout does not arrive.** Finance is alerted at the end of the 2nd → still unpaid at the end of the 3rd → the
  landlord tells Mwavuli in writing and the agreement ends that day, with no fee → final statement and payment within
  14 days, tenant files handed over, tenants told, "paid up to" notes issued. [BM8, P8, P13]
- **A tenant leaves with months prepaid.** The tenant gives 30 days' notice → the tenancy ends the day before a due date
  → move-out photos → deposit settled with an itemized note → the rent held for rent months that start after the
  tenancy ends goes back, with no fee, within 14 days of the move-out visit → unit vacant, filling starts.
  [BM6, P13, P15]
- **A tenant's due date moves.** To keep its field work organized, Mwavuli moves a UGX 400,000 rent from the 5th to the
  20th → Support records the new day and the 15 days between, UGX 200,000 → the tenant is told 30 days ahead and the
  form is updated → from April the rent is due on the 20th, and reminders and the covered month follow → the landlord
  is not told and the payout stays on the 1st. [BM20, P14, S3.6, form 12]

## User stories

### 1. Find us and enquire

- **Landlord:** reads the offer in three lines (the 1st, 15%, 30 days' notice) and a worked statement, in English now
  and Luganda once translated. [launch · BM18, open: Luganda text]
- **Landlord:** opens WhatsApp or a call from the site with area and number of units prefilled; the chat becomes a
  lead. [next · proposed]
- **Support:** logs every enquiry (call, WhatsApp, walk-in, referral) as a lead with source, area, units and next step,
  and books the building visit; the landlord gets a confirmation and a reminder. [next · proposed]
- **Landlord, tenant:** check an officer is genuine (name, photo, number) before letting them in or paying anything.
  [next · proposed]

### 2. Take on a building

- **Officer:** records the building (name, plot, street, area) and each unit: type, rent, tenant, tenant since, new or
  already in the building. [launch · Annex 1]
- **Officer:** records every owner with name, NIN and phone, and the written agreement of all co-owners; each owner
  signs. [launch · BM7, Annex 2]
- **Officer:** ticks the proof list (title; or sale agreement or letters of administration, LC1 letter and signed
  statement; NIN of every owner), photographs each paper, records the title search and its result, and notes any
  dispute, debt, mortgage or charge the landlord declares. A building in dispute is not taken (S7.2). Acceptance waits
  on all of it. [launch · BM7, Annex 2, S7.2, open: mortgage or charge]
- **Officer:** walks the building with the landlord and fills the inspection report on a phone: roof, wiring, water,
  stairs and other safety items as OK, needs fixing or unsafe, with numbered photos. [launch · P4]
- **Officer:** captures the building, the tenants and the inspection on a phone without data and syncs when it is back.
  [launch · proposed]
- **Officer:** gives the landlord notice before any building visit, and the tenants affected notice before a unit
  visit, and logs each entry. [launch · P5, proposed]
- **Officer:** runs the 30-day clock on each unsafe item, reminds the landlord and records the fix with date, initials
  and photo. [launch · P4]
- **Officer:** records the result for the building or per unit: accept, accept once items are fixed by a date, or
  decline with every reason that applies; the landlord sees the reasons. [launch · P9]
- **Manager:** runs the accept test before accepting: payout account less what is committed, against two months of the
  building's net rent. Short means no accept. [launch · BM17]
- **Officer:** prints the agreement, schedule and annexes in English or Luganda, filled from the captured data; until
  then the PDFs are filled by hand. [next · BM11]
- **Officer:** explains the agreement aloud in the landlord's language and records language and explainer. The landlord
  signs or gives a thumbprint before a witness of their choice, whose name is kept, and keeps a copy.
  [launch · BM11, BM3, open: Luganda text, open: license]
- **Landlord:** gives a payout number or account, a statement language and a phone for SMS and WhatsApp, and says if
  paper is wanted. [launch · Annex 4]
- **Officer:** checks the payout account name matches the landlord before the first payout. [launch · proposed]
- **Officer:** records deposits the landlord already holds for existing tenants, with proof, so every deposit has a
  named holder. [launch · BM6, Annex 3]
- **Manager:** signs off and the building goes live. The landlord is told, as each unit is occupied on the form, which
  1st its cover starts. [launch · P9, P2, open: contracting company]
- **Landlord:** adds a building or a unit after signing; it goes through the same ownership check, inspection and
  accept test, the units list is amended, and it joins the same payout and statement. [next · P9, BM17]

### 3. Put tenants on the form

- **Officer:** visits each existing tenant, explains the tenancy form aloud, records language and explainer, takes a
  signature or thumbprint. [launch · P3, open: Luganda text]
- **Officer:** records each tenancy: unit, tenant's NIN and phone, start date, rent, due date, first due date, deposit
  and who holds it, part month paid, months paid ahead, rent paid ahead, rent owed from before sign-up, the late fee and
  the notice the landlord gives, if the form states them. [launch · form table, form 10, open: tenant without a NIN,
  open: late fee, open: notice the landlord gives a tenant, open: due dates 29 to 31]
- **Officer:** keeps rent owed from before sign-up apart; it is not covered, and Mwavuli collects it for the same 15%.
  [launch · P3, open: order of repayment]
- **Landlord:** reads on the statement which units are on the form and which are waiting; only occupied units on the
  form are paid on the 1st. [launch · P2, open: rent in the gap]
- **Tenant:** gets the form by WhatsApp, SMS or paper: who the landlord is, that Mwavuli acts for the landlord, who
  holds the deposit, and where to pay (number or account). [launch · form 1, form 2, BM6]

### 4. Fill empty units

- **Landlord:** sees a vacant unit with days empty, viewings held and next step; an empty room earns no rent and costs
  no fee. [next · BM18]
- **Officer:** finds tenants for vacant units by hand at launch, from referrals, calls and a WhatsApp listing, and
  brings the applicant to the landlord. [launch · BM18, proposed]
- **Landlord:** agrees the asking rent, and the tenant where the landlord chooses, by replying YES.
  [launch · open: who sets rent and chooses tenants]
- **Officer:** lists vacant units (photos, rent, type, area) as a WhatsApp link, books viewings with reminders to both
  sides, and takes the applicant's NIN, phone and move-in date. [next · BM18, proposed]
- **Tenant:** asks about a unit by WhatsApp or call and gets a viewing time. [next · proposed]
- **Tenant:** pays Mwavuli by mobile money the deposit and the days from move-in to the first due date, with any rent
  ahead; the form is signed and the unit turns occupied. [launch · BM6, P2, P13, P14]
- **Landlord:** is told when a tenant moves in: name, rent, start date, deposit held by Mwavuli, the part month paid,
  and which 1st cover starts. [launch · P2, P14, open: cover for a new tenant in a paused unit]

### 5. Collect rent

- **Tenant:** pays Mwavuli only, by mobile money or bank, to the number or account on the form; never cash to staff.
  [launch · P1, form 2, open: payment providers and charges, open: license]
- **Tenant:** pays from any phone, or through a mobile money agent, quoting the unit reference, and the payment still
  reaches the right unit. [launch · proposed]
- **Finance:** works one queue of unmatched, duplicate and reversed payments; each is matched to a unit or refunded.
  [launch · proposed]
- **Support:** traces a payment a tenant says they made, from the mobile money transaction ID and the provider's
  record. [launch · proposed]
- **Tenant:** gets an SMS or WhatsApp payment confirmation at once: amount, unit, rent months paid, balance, transaction
  ID. [launch · proposed]
- **Tenant:** gets a reminder before the due date and a notice on it; due dates differ per tenancy and reminders stop
  when paid. [launch · BM20, proposed]
- **Officer, Support:** move a tenant's due date to keep field work organized, on Mwavuli's own initiative; the landlord
  is not asked or told and the payout stays on the 1st. From the new date, reminders and the covered month follow the
  new day. [launch · BM20, S3.6, open: moving a due date while rent is owed, open: moving a due date without agreement]
- **Tenant:** is told 30 days before a due date moves, with the new day and the amount for the days counted forward from
  the old date to the new one; the form is updated. [launch · BM20, P14, form 12, open: pro rata for a due-date move]
- **Tenant:** gets that notice in their language, in writing, with a record of when and how it was given.
  [launch · proposed, open: how notice is given, open: Luganda text]
- **Finance:** counts the days of a part month on a 30-day month, each day one-thirtieth of the rent, for a move-in or a
  due-date move (forward from the old due date to the new one), and rounds the amount to the nearest UGX 1,000, a half
  rounding up. [launch · P14, form 13, open: pro rata for a due-date move]
- **Tenant:** pays in parts; each payment goes to the oldest month first and a month shows paid only when settled in
  full. [launch · BM5, open: part payments]
- **Tenant:** pays months ahead; what has not been paid out is held, and when the landlord leaves the tenant gets a
  "rent paid up to [date]" note. [launch · P13]
- **Tenant:** sees what is due, what is paid, the next due date and months ahead, in the app or by a WhatsApp reply.
  [next · brand A5]
- **Tenant:** gets a rent receipt or proof-of-tenancy letter on request, for an employer or a bank.
  [next · proposed, open: tax receipts on rent]
- **Landlord:** records rent a tenant paid to them and sends it on the same day; the tenant is credited.
  [launch · P5, open: passed on or collected]
- **Landlord:** asks for a rent change; the tenant is told in writing and the form, reminders and statement follow from
  the date it applies. [next · open: who sets rent and chooses tenants]
- **Tenant:** is charged any late fee the form sets, shown apart from rent; Mwavuli keeps it, so it is not in the
  landlord's payout or statement. [next · P7, S2.5, open: late fee]

### 6. Pay the landlord on the 1st

- **Finance:** sees each landlord's payout worked out before the 1st: net rent of every occupied unit for the rent month
  that starts that month, a new tenant's part month less the 15%, less approved costs, plus VAT passed on.
  [launch · BM4, S2, P14, P16, open: rent owed for a missing notice]
- **Finance:** pays each payout for the rent month that starts that month, so the landlord is paid before a tenant's due
  date, and skips a rent month that starts after a tenancy has ended. [launch · P16, S2.8]
- **Finance:** reviews the batch and its exceptions (paused units, new payout details, holds), then releases it so money
  lands on the 1st. [launch · BM1, open: payment providers and charges]
- **Finance:** schedules bank payouts to land on the 1st, and releases them the banking day before when the 1st is not
  one. [launch · BM1, BM8, proposed]
- **Landlord:** gets one payment to the number or account on file and one statement in the chosen language.
  [launch · BM4, P1, open: co-owners, open: Luganda text]
- **Landlord:** confirms the money arrived with one word, or says it did not; Finance sees the answer. The provider's
  record decides whether it reached. [launch · BM8, proposed]
- **Finance:** is alerted at the end of the 2nd to any payout the provider's record does not show as received, so no
  landlord reaches the end of the 3rd unpaid. [launch · BM8, S9.2]
- **Landlord:** changes the payout number or account only after an officer's call-back, from the next payout, and the
  old number is told; this reduces SIM-swap and impersonation fraud. [launch · proposed]
- **Finance:** corrects a wrong statement or payout, adjusts the next payout and tells the landlord. [launch · proposed]
- **Finance:** can export the payout batch and pay by hand if the system is down on the 1st, then reconcile.
  [launch · proposed]
- **Finance:** sees a 30-day cash forecast: payouts due on the 1st against rent expected by each tenant's due date.
  [next · BM20]

### 7. When a tenant does not pay

- **Landlord:** keeps the net rent paid on the 1st for a month a tenant misses. [launch · BM1, BM18, open: license]
- **Landlord:** is told in one message who missed the rent and that Mwavuli is chasing, and a paused unit gets its own
  message with the reason. [launch · proposed]
- **Finance:** sees each unit's covered month, the amount advanced and the amount recovered; one covered month per unit
  at a time. A paused unit is paid again when its arrears clear or a new tenant moves in, but gets a new covered month
  only once the old arrears are cleared. [launch · BM1, S3.2, open: cover for a new tenant in a paused unit]
- **Officer:** works an arrears queue by building and age, from the day a due date is missed; the steps are remind,
  call, visit, written notice, each logged with date, channel and outcome.
  [launch · BM5, form 5, S4.1, open: when the notice goes out]
- **Tenant:** gets the reminder, call, visit and written notice in their language; proof of each is kept, including who
  received the notice. [launch · BM5, form 5, open: Luganda text]
- **Officer:** records a promise to pay and is alerted when it is missed. [next · proposed]
- **Tenant:** pays arrears and every payment goes to the oldest month first: the covered month repays Mwavuli, later
  months go to the landlord less 15%. The landlord reads in plain words where it went.
  [launch · BM5, S3.5, open: order of repayment, open: rent collected after a covered month]
- **Officer:** prepares a court step and asks the landlord for YES with the likely costs; the case is in the landlord's
  name. [launch · BM5, S4.2, open: who brings a case for a covered month, open: tenancy law]
- **Landlord:** says YES or NO to court by reply, or on a recorded call confirmed by text; the system keeps it.
  [launch · P6, open: co-owners]
- **Finance:** records lawyer, court and bailiff costs at cost, takes them from the deposit Mwavuli holds, and takes the
  rest off the landlord's next payout, as the landlord approved with the YES. [launch · S4.4, S2.2, proposed]
- **Tenant:** asks for a payment plan; Officer records the offer and the landlord says YES before it applies.
  [next · open: part payments]
- **Support:** logs a tenant's report of a lock-out, cut water or power, or cash demanded by a landlord or caretaker,
  and sends it to Manager. [launch · P5, BM8]

### 8. Repairs and building work

- **Tenant:** reports a fault by phone or WhatsApp, with photos or a voice note, in Luganda or English, and gets a job
  number and the next step. [launch · form 6]
- **Support:** tags the job urgent safety or routine and routes it. [launch · P6, open: what is urgent]
- **Officer:** gets quotes from trusted contractors; each shows the contractor's price, the 10% fee and the total.
  [launch · BM2]
- **Landlord:** gets a job at or below the approval limit done without being asked; it shows on the next statement with
  what, when, price, fee and photos. [launch · BM2, BM4]
- **Landlord:** gets a plain message for a quote above the approval limit (what, why, total with fee) and replies YES or
  NO; work waits for YES. [launch · BM2, P6, open: co-owners]
- **Officer:** chases an unanswered YES by call and tells the tenant the job is on hold. [launch · proposed]
- **Landlord:** is told the same day when an urgent safety repair up to the emergency amount has started.
  [launch · P6, open: emergency amount and the 10%, open: urgent repair above one payout]
- **Landlord:** pays the balance of a job bigger than one payout before work starts; the job is held until it arrives.
  [launch · BM4, open: urgent repair above one payout]
- **Contractor:** gets the job on WhatsApp or SMS (unit, access, tenant phone, quote), confirms a visit time, and sends
  photos and the invoice when done; Officer checks before paying. [launch · proposed]
- **Tenant:** gets the visit time and the contractor's name and phone before anyone enters, and confirms the fix.
  [next · proposed]
- **Caretaker:** reports faults and opens the door for contractors; never collects rent. [next · proposed]
- **Officer:** records tenant-caused damage with photos; the tenant is billed in full once repairs are done, else it
  comes from the deposit. [launch · BM2, BM6, open: who pays the contractor first]
- **Manager:** keeps a contractor directory: trade, credentials (electrical, plumbing, building), areas, rates, job
  history, and a blocked list. [next · BM2]
- **Manager:** sets response and fix-time targets and sees the jobs that miss them.
  [next · brand F2, open: response times]

### 9. Utilities and garbage

- **Officer:** records each unit's meter numbers, or the agreed share or fixed amount for a unit with no meter.
  [launch · form 7]
- **Finance:** records each electricity, water and garbage bill at cost, with no markup, and allocates it to units by
  reading or agreed share, with the working shown. [launch · BM2, open: who pays the providers]
- **Tenant:** sees their share, the reading used and the bill, and can query it. [next · form 7]
- **Landlord:** reads utility and garbage money at cost on the statement, apart from rent and outside the 15%.
  [launch · BM4, open: who pays the providers]
- **Officer:** schedules garbage collection for the building and records that it happened. [next · BM18]

### 10. Deposits and prepaid rent

- **Finance:** holds each new tenant's deposit and every prepaid month in client-money accounts apart from Mwavuli's
  own, with a register by tenant, unit, amount and holder. [launch · BM6, P13, BM17, open: license]
- **Tenant:** is told their deposit and who holds it. [launch · form 3]
- **Tenant:** gets any deduction from the deposit with its reason. [launch · proposed]
- **Finance:** pays prepaid rent to the landlord on the 1st, less 15%, for the rent month that starts that month (P16);
  what has not been paid out stays held. [launch · P13, P16, S5.3]
- **Officer:** itemizes each deduction from a deposit (unpaid rent, damage, legal costs) with evidence; Finance approves
  it. [launch · BM6, proposed, open: tenancy law]
- **Tenant:** gets back the rent held for rent months that start after the tenancy ends, with no fee, within 14 days of
  the move-out visit. If Mwavuli holds the deposit, what the tenant still owes is taken from there first, and then from
  this rent. A rent month that has started is paid in full.
  [launch · P13, P14, P15, S5.3, form 4, open: tenancy law]
- **Landlord:** sees deposits and prepaid rent on the statement as held for tenants, not income. [next · proposed]

### 11. Move out

- **Tenant:** gives 30 days' notice; the system records who, when and the day the tenancy ends: the day before a due
  date, at least 30 days after the notice, so the last rent month is whole.
  [launch · P15, S3.7, form 10, open: tenancy law]
- **Tenant:** gives that notice by phone, SMS or WhatsApp and gets a message confirming it and the day the tenancy
  ends. [launch · P15, proposed, open: how notice is given]
- **Support:** tells the tenant the day the tenancy ends when the notice comes in, and that a rent month that has
  started is paid in full. [launch · P14, P15]
- **Finance:** bills a tenant who leaves without notice the rent until the tenancy would have ended, counted from the
  day Mwavuli learns the tenant has gone, and takes it from the deposit first if Mwavuli holds it.
  [launch · P15, S3.7, proposed, open: rent owed for a missing notice,
  open: owed rent when the landlord holds the deposit, open: tenancy law]
- **Officer:** makes the move-out visit when a tenancy ends or the tenant has gone, and logs the visit date and the day
  Mwavuli learned the tenant had gone; the visit starts the 14 days for the refund.
  [launch · P15, S1.14, S5.3, form 4, open: visit after a tenant leaves]
- **Landlord:** is told when a tenant gives notice, with the day the tenancy ends, and again when the unit is vacant.
  [launch · proposed]
- **Officer:** photographs the unit at move-in and again at move-out to settle damage. [next · proposed]
- **Finance:** settles the deposit: takes unpaid rent (oldest month first), rent owed for a missing notice, damage and
  legal costs, refunds the rest by mobile money or bank, and sends an itemized note. [launch · BM6, BM5, P15]
- **Tenant:** disputes a deduction: talk first, then a mediator, then the courts of Uganda, with the evidence attached.
  [next · P12]
- **Landlord:** is reminded to return a deposit the landlord holds for an existing tenant.
  [next · BM6, open: landlord-held deposit]
- **Landlord:** asks Mwavuli to end a tenancy; Officer gives the tenant the notice the form states and records it.
  [next · form 10, open: notice the landlord gives a tenant]

### 12. Landlord leaves

- **Landlord, Manager:** give 30 days' written notice; the system records it and sets the end date.
  [launch · BM8, open: how notice is given]
- **Landlord:** leaves at once, with no fee, when a payout has not reached by the end of the 3rd; the system recognizes
  the trigger from the provider's record. [launch · BM8, proposed]
- **Manager:** ends the agreement at once for rent the landlord collects themselves, interference with tenants or a
  refused urgent safety repair, with evidence and reason recorded. [launch · BM8, P5, open: what ends it at once]
- **Finance:** issues the final statement and payment within 14 days of the end date: rent collected and not paid out,
  plus prepaid rent for rent months that start after the end date, in full with no fee, except rent that goes back to a
  tenant who has left (P15), less approved costs and any covered month a tenant still owes.
  [launch · P8, S9.4, open: refund after the agreement ends]
- **Officer:** hands the landlord the tenant files (forms, ledgers, deposit register, photos) and any deposits held,
  after rent owed is taken. [launch · P8]
- **Tenant:** is told Mwavuli has stopped acting for the landlord, and gets a "rent paid up to [date]" note if
  prepaid; the landlord honors it. [launch · P8, P13, form 11, open: who collects rent after the end date]
- **Officer:** moves the agreement to the new owner or the estate, or ends it, when a building is sold or a landlord
  dies, on the right papers. [next · open: sale and death]

### 13. Statements, messages and support

- **Landlord:** gets one statement a month by SMS or WhatsApp in the chosen language, paper on request; the message
  holds the totals and the detail follows on request. [launch · BM4, P1, open: Luganda text]
- **Landlord:** opens a link in the statement message to see each line's detail on a web page, with no app or login.
  [next · proposed]
- **Landlord:** reads rent from occupied units, the 15% fee, repairs with the 10% fee, VAT passed on, covered months
  repaid and the amount paid, with each unit's tenant, rent and status. [launch · BM18]
- **Landlord:** asks for the statement read aloud, by an officer's call or a voice note in Luganda or English.
  [next · proposed]
- **Landlord:** asks about any line by replying; it becomes a case answered in the same chat. [next · proposed]
- **Landlord:** replies YES or NO in English or Luganda; anything unclear goes to a person and is never taken as
  consent. [launch · P6]
- **Landlord, tenant:** get messages on WhatsApp first and by SMS when it is not delivered; no app needed.
  [launch · proposed]
- **Support:** sees the caller by phone number: person, building, units, recent payments, open cases, on one screen.
  [next · proposed]
- **Support:** keeps each person's language and uses it on every message; Luganda templates are complete, reviewed by a
  qualified person and reviewed again when terms change. [launch · BM11, brand F8, open: Luganda text]
- **Landlord:** reads a short building report each quarter: occupancy, collections, repairs and spend, in plain words.
  [next · brand F2]
- **Landlord:** downloads a year of statements for tax filing. [next · P5, P10]

### 14. Control, compliance and trust

- **Manager:** sees the portfolio: buildings, units, occupancy, collection rate, covered months outstanding, arrears by
  age, open repairs, payouts due. [next · proposed]
- **Manager:** sees float headroom, the payout account against commitments (a payout runs up to a month ahead of the
  tenant's rent, P16), and is alerted when it falls short of what the accept test needs. [launch · BM17, P16]
- **Finance:** reconciles the collection, payout and client-money accounts to the ledger every day and chases any gap.
  [launch · BM17, P13]
- **Finance:** needs a second person for any payout, refund or deduction above a set amount. [launch · proposed]
- **Manager:** sees each YES, notice, signature, explanation and recording with who, when and channel; none can be
  edited. [launch · P6, BM11]
- **Manager:** assigns staff to buildings and removes leavers' access the same day; staff see only their buildings and
  every view of personal data is logged. [launch · P11]
- **Manager:** handles any dispute or data request by hand until the case flow exists: the talk first, then a mediator.
  [launch · P12, P11, proposed]
- **Manager:** runs any landlord or tenant dispute as a case: the talk, the mediator, the outcome, and the courts only
  after. [next · P12]
- **Officer:** explains the privacy line and records consent at signing. [launch · P11, open: privacy policy]
- **Support:** handles a landlord's or tenant's request to see or correct their data. [next · P11]
- **Finance:** keeps NIN and ID photos and customer records for as long as anti-money-laundering rules require, and
  flags suspicious activity. [launch · P1, open: AML duties]
- **Accountant:** gets a monthly pack: fees earned, VAT collected and passed on, client-money balances, covered-month
  claims. [next · BM4, P10]
- **Counsel:** sees which version of each document each landlord and tenant signed. [launch · BM11]

### 15. Shops and offices

- **Landlord:** gets the same terms on a shop or office as on a room: 15%, first missed month covered, the 1st.
  [launch · BM10]
- **Manager:** sees a large unit's covered-month exposure before accepting it; one shop can cost as much as the fees of
  about 40 rooms. [launch · BM10]
- **Landlord:** reads VAT a tenant pays on rent as passed on in the same payment and shown on the statement; filing is
  theirs. [launch · P10]
- **Business tenant:** gets a receipt that splits rent and VAT, by email or paper.
  [next · P10, proposed, open: tax receipts on rent]
- **Business tenant:** signs the standard tenancy form for a shop or office until a commercial form exists.
  [launch · BM9, form table, proposed, open: commercial form]
- **Business tenant:** signs a commercial tenancy form under the same agreement. [next · BM9, open: commercial form]
- **Officer:** tracks a commercial lease's term and renewal date and reminds landlord and tenant. [next · proposed]
- **Finance:** quotes and takes rent in UGX only. [launch · BM9, open: rent currency]

### 16. Later

- **Landlord:** asks for an advance of up to 3 to 6 months of net rent at 1.5% a month on the reducing balance, under a
  separate agreement. [later · BM13 to BM15, open: license]
- **Landlord:** puts new buildings and extensions under a works agreement. [later · open: construction scope]
- **Tenant, landlord:** use USSD or a feature phone for a balance, a pay prompt and a fault report.
  [later · proposed]
- **Tenant:** browses vacant units online and books a viewing. [later · proposed]
- **Landlord:** who lives abroad or upcountry gets the same statements, YES requests and payouts remotely, paid to a
  local account. [later · proposed]
- **Landlord, tenant:** get messages in other languages, each complete and reviewed. [later · brand F8]

## Rules the product enforces

- No cash from tenants to staff. [P1]
- A due date moves only on 30 days' notice to the tenant, with the form updated and the days charged, counted forward
  from the old due date to the new one; the landlord is not asked. [BM20, P14, S3.6, form 12, open: moving a due date
  without agreement]
- Every part month is counted on a 30-day month, and the amount for the days is rounded to the nearest UGX 1,000, a
  half rounding up. [P14, S2.7, form 13]
- A rent month runs from one due date to the next. A rent month that has started is paid in full; a tenant who leaves
  part-way through it gets none of it back. [P14, S1.13]
- Each payout on the 1st pays the rent month that starts that month, so a payout comes before the tenant's due date. A
  rent month that starts after a tenancy has ended is not paid, and the rent held for it goes back to the tenant.
  [P16, S2.8, P15]
- A tenant leaves on 30 days' notice, and the tenancy ends on the day before a due date; leaving without notice costs
  the rent until it would have ended, taken from the deposit first if Mwavuli holds it. [P15, S3.7, form 10]
- No building goes live until the ownership check passes, unsafe items are fixed and the accept test passes.
  [BM7, P4, BM17]
- No unit is paid on the 1st unless it is occupied on the form with rent and deposit written down. [P2]
- One covered month per unit, never two. A unit whose covered month is unpaid on the next 1st is not paid until its
  arrears clear or a new tenant moves in. [BM1, S3.2, open: cover for a new tenant in a paused unit]
- Mwavuli earns its 15% on a covered month only when that rent is collected. [S3.4]
- The 15% applies to rent only, not to deposits, utilities, repairs, VAT or late fees. [BM4, S1.4]
- No work above the approval limit without YES, except urgent safety up to the emergency amount.
  [BM2, P6, open: emergency amount and the 10%]
- No job takes more than one payout; the balance is paid first. [BM4, S2.3, open: urgent repair above one payout]
- No legal step without the landlord's YES, and only in the landlord's name. [BM5, S4.2, open: who brings a case for
  a covered month]
- Staff never lock a tenant out or remove belongings (S4.3). The landlord does not lock a tenant out or cut water or
  power (S8.3). [BM5, P5]
- The landlord tells tenants to pay only Mwavuli and makes no side deals with tenants on rent or on who lives in a
  unit. [P5, S8.1, S8.2]
- Deposits and prepaid rent are held apart from Mwavuli's own money and used only as the model allows. [BM6, P13, P15]
- No markup on utilities, no sign-up, letting or yearly fee, and no fee to tenants beyond a late fee in the form,
  which Mwavuli keeps. [BM2, P7, S2.5, open: who pays the contractor first]
- Personal data is used only to manage the building. [P11]
- Only one language version of an agreement is signed. [BM11]
- Copy never says "always paid"; "guaranteed" only beside "we cover the first month". [BM18]

## Open decisions

Terms the stories wait on. The model and the agreements list most of them as not decided; the rest are gaps between the
documents. Stage numbers are in brackets.

- Who may say YES, and who receives the statement and the payout, when a building has co-owners or an estate
  (6, 7, 8).
- License and law: paid cover as insurance or suretyship, payment-service and money-laundering duties, a money-lender
  license for the rent advance (addendum), the explanation statement under the Illiterates Protection Act, stamp duty
  and registration of the agreements (2, 5, 7, 10, 14, 16).
- The contracting company, the VAT status and the signatory (2).
- Whether a mortgage or other charge on a building limits letting, and whether the lender must consent (2).
- The Luganda text of the agreement set, statements and messages: it is not in the repository, so its review status is
  unknown, and the clauses changed on 2026-11-13 need review. Without it no Luganda-speaking landlord can sign. Also
  whether the tenancy form is bilingual and explained aloud (1, 2, 3, 5, 6, 7, 13).
- What ID a tenant without a NIN may give, and whether joint tenants share one tenancy; the form names one tenant (3).
- What is paid for an existing tenant not yet on the form (3).
- How a payment is split between rent owed from before sign-up and a covered month (3, 7).
- The notice the landlord gives a tenant to end a tenancy; the form leaves it blank (3, 11).
- Who sets each unit's rent and increases, and who chooses tenants (4, 5).
- Which mobile money providers and banks the product takes payments from and pays out to, and who bears their charges
  on collections and payouts (5, 6).
- Part payments and payment plans (5, 7).
- Whether a due date may move while the tenant owes rent, while a notice is running and while rent is paid ahead, how
  often it may move, from when the new date applies, and what the updated form must carry; a later date must not undo a
  missed due date or restart the chasing (5).
- Whether Mwavuli may move a due date on 30 days' notice without the tenant's agreement, and without telling the
  landlord (5).
- Who receives the pro rata amount for a due-date move, whether the 15% applies as it does to a move-in part month,
  and when it falls due (5).
- Tenancy law under the Landlord and Tenant Act 2022: the late fee, eviction steps, deposit rules, keeping the rent of a
  month that has started, a 30-day notice that ends on a due date, rent owed when no notice is given, and the limits it
  reportedly sets on rent paid ahead and on deposits (3, 5, 7, 10, 11).
- What separates rent a tenant paid to the landlord, who passed it on the same day (P5), from the landlord collecting
  rent, a ground to end at once (BM8) (5).
- When the written notice goes out: with the pause on the next 1st, or at the end of the visits (7).
- Cover for a new tenant in a paused unit: whether a unit re-let to a new tenant gets a covered month while the old one
  is unpaid. S3.2 allows a new covered month only once the old arrears clear; P2 starts cover on the first 1st after a
  unit is occupied (4, 7).
- Who brings a case for a covered month: the landlord in its name and with YES (BM5, S4.2), or Mwavuli, since the claim
  for that month passes to it (BM1) (7).
- When rent collected after a covered month reaches the landlord (7).
- Who collects rent after the end date, and where a tenant pays it (12).
- Whether a deposit the landlord holds is kept apart from a covered month: BM6 proposes it, and the owner has not
  approved it (11).
- The visit after a tenant leaves: how soon Mwavuli makes it, and the latest day for the refund of rent paid ahead if no
  visit happens (11).
- How rent owed for a missing notice is recorded and paid to the landlord when the unit is empty, and whether the 15%
  applies to it; how a skipped payout is recorded; and how the move-in part month is held until the first payout
  (6, 11).
- When the landlord holds the deposit (an existing tenant): who recovers the rent a tenant owes at an exit, from rent
  paid ahead, or the landlord from the deposit it holds (11).
- Whether the landlord refunds a tenant who leaves after the agreement ends, since the final payment gives the landlord
  the prepaid rent for rent months after the end date, except rent that goes back to a tenant (12).
- Due dates 29 to 31 in months without them, and a tenant who moves in on the due date (3).
- What counts as an urgent safety repair; the inspection's unsafe list is roof, wiring, water and stairs (8).
- An urgent safety repair that costs more than one payout: whether it goes ahead before the balance arrives, and who
  pays the contractor the balance (8).
- Whether the emergency amount counts the 10% fee, as the approval limit does (8).
- Who pays the contractor first for tenant damage, and whether the 10% is charged to the tenant (8).
- Response-time promises for repairs and support (8).
- Who pays the electricity, water and garbage providers, how a tenant's share is collected, and the share for a unit
  with no meter; the agreement leaves it open while tenancy form 7 commits the tenant to a share (9).
- How a notice is given and recorded, and from when it counts: a landlord leaving, a tenant leaving, a due date
  moving. P15 proposes that a tenant gives notice by phone, SMS or WhatsApp, confirmed by message, and that the 30 days
  of a tenant who leaves without notice count from the day Mwavuli learns the tenant has gone. Whether a landlord
  leaving on 30 days' notice carries a fee is not stated (5, 11, 12).
- What ends the agreement at once: any breach of a landlord duty (P5) or only the three events in BM8 (12).
- Sale of a building, and the death or incapacity of a landlord (12).
- The privacy policy: the site's text is a placeholder pending counsel, and P11's counsel note lists the registration,
  consent notice and retention duties under the Data Protection and Privacy Act 2019 (14).
- Commercial tenancy form, rent currency, VAT and withholding tax (15).
- Tax receipts on rent: press reports say the tax authority's e-invoicing system (EFRIS) has covered rent above about
  UGX 2.82 million a year since August 2026. To confirm with the accountant: whether it reaches the rent Mwavuli
  collects, who issues the e-receipt, the landlord or Mwavuli, and from when. If it does, the receipt is a launch need
  (5, 15).
- Construction scope (16).
