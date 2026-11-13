# Mwavuli product user stories

Status: version 0.1, draft for owner review. Ticket MVL-29. Written on 2026-11-12 from the business model, the
agreements, the brand language and the site.

What the product must let each person do, from the first enquiry to the landlord's exit. It is not a spec: no screens
and no API.

## How to read

- A story starts with who does it. Stories sit under the stage they happen in.
- `launch` is needed for the first landlords. `next` comes once they are live. Parked work is in stage 16.
- After the `·` is the term the story comes from: `BM` and `P` IDs in [the model](model.md), `S` clauses in the
  [schedule](agreements/landlord-agreement-schedule.md), `Annex` in the [agreement](agreements/landlord-agreement.md),
  `form` clauses in the [tenancy form](agreements/tenancy-form.md), `brand` IDs in [brand/](../brand/README.md).
- `proposed` is added here and the owner decides. `open` waits on a term nobody has decided (see the end).
- `owner` and a date mark a decision the owner gave after the model was written.

## Context

- The product is the register, the money ledger and the message channel behind one promise: rent on the 1st for every
  occupied unit, with the first missed month covered (BM1, BM18).
- Landlords and tenants work by SMS, WhatsApp, call and mobile money first. At launch only operations has a portal: web
  in the office, mobile in the field. The landlord and tenant portals (Home, Properties, Payments, More; brand A5) show
  the same data and come next.

Uganda shapes every story:

- Mobile money (MTN, Airtel; providers to confirm) and bank are the rails. Staff never take cash (P1).
- Phone-first and officer-assisted: the main landlord has little formal education (BM3), so an officer sets everything
  up and explains it aloud.
- English and Luganda, each a complete reviewed translation (BM11, brand F8). A signature or a thumbprint, before a
  witness.
- Local papers: NIN, LC1 letter, title by tenure: freehold, leasehold, mailo, customary (BM7).
- Kampala and its surroundings (BM9). UGX at launch; rent currency is open. Written as brand F8 sets: UGX 1,200,000;
  9 Nov 2026; +256 7XX XXX XXX.
- Low-end phones, bright sun, patchy data: light pages, 44 px targets, officer tools that work offline (brand G4,
  S8, T8).
- Law fixes some terms: the Landlord and Tenant Act 2022, the Data Protection and Privacy Act 2019,
  anti-money-laundering rules, the Illiterates Protection Act. Stories that wait on counsel say `open`.

## Who

- **Landlord:** owns rooms, flats, small blocks, shops or offices, alone, with family or as an estate. Reads SMS and
  WhatsApp and may never open an app. Wants the 1st, no lock-in, no surprises.
- **Tenant:** prospective or current. Pays monthly, sometimes months ahead (P13). Assumed: many pay cash today, so P1
  changes a habit. Wants repairs done and the deposit back.
- **Business tenant:** a shop or office tenant, who pays VAT on rent.
- **Officer, Finance, Support, Manager:** the operations persona. The team's WhatsApp groups are Ops, Finance, Support
  and General (brand D18). Manager is the owner and senior staff.
- **Caretaker, contractor:** outside the product; take jobs and report faults by WhatsApp or SMS, no login. A caretaker
  never collects rent.
- **Accountant, counsel:** outside the product; read-only extracts.

## Use cases

- **A tenant misses March.** The due day passes unpaid, so the room has its covered month and the chasing starts:
  reminder, call, visit, written notice → the landlord keeps the UGX 340,000 paid on 1st March and gets a message →
  still unpaid on 1st April: the room's payout pauses → the tenant pays UGX 400,000 on 20th April, which repays March
  → April is still owed, nothing on 1st May → April is paid and the landlord gets UGX 340,000.
  [BM1, BM5, owner 2026-11-13]
- **A roof leaks.** Tenant reports with photos → Support triages it → Officer gets a UGX 600,000 quote plus a UGX 60,000
  fee → above the approval limit and the emergency amount, so the landlord is asked first and replies YES → the
  contractor works and sends photos → the statement lists UGX 660,000. [BM2, P6]
- **A family building with no title.** The landlord brings a sale agreement, an LC1 letter, a NIN and a signed statement
  → Officer checks all four → inspection finds bad wiring, 30 days to fix → the funding test passes → the agreement is
  explained in Luganda and signed with a thumbprint before the landlord's sister → existing tenants are visited and
  moved onto the form → first payout on the next 1st. [BM7, P4, BM17, BM11, P3]
- **A new tenant takes a room.** Viewing → form explained and signed → deposit, the days up to the first due date and
  any rent ahead paid to Mwavuli by mobile money → unit occupied, landlord told → the part month reaches the landlord,
  less 15%, on the first payout after move-in, and cover starts on the first 1st after. [BM6, P2, P13, P14]
- **A payout does not arrive.** Finance is alerted at the end of the 2nd → still unpaid on the 3rd → the landlord gives
  notice and leaves with no fee → final statement and payment within 14 days, tenant files handed over, tenants told,
  "paid up to" notes issued. [BM8, P8, P13]
- **A tenant leaves early with months prepaid.** Notice recorded → move-out photos → deposit settled with an itemized
  note → unused months refunded with no fee → unit vacant, filling starts. [BM6, P13]
- **A tenant's due day moves.** To keep its field work organised, Mwavuli moves a UGX 400,000 rent from the 5th to the
  20th → Support records the new day and the 15 days between, UGX 200,000 → the tenant is told in writing 30 days
  ahead and the form is updated → from April the rent is due on the 20th, and reminders and the covered month follow
  → the landlord is not told and the payout stays on the 1st. [BM20, P14, owner 2026-11-13]

## User stories

### 1. Find us and enquire

- **Landlord:** reads the offer in three lines (the 1st, 15%, 30 days' notice) and a worked statement, in English now
  and Luganda once translated. [launch · BM18]
- **Landlord:** opens WhatsApp or a call from the site with area and number of units prefilled; the chat becomes a
  lead. [next · proposed]
- **Support:** logs every enquiry (call, WhatsApp, walk-in, referral) as a lead with source, area, units and next step,
  and books the building visit; the landlord gets a confirmation and a reminder. [next · proposed]
- **Landlord, tenant:** checks an officer is genuine (name, photo, number) before letting them in or paying anything.
  [next · proposed]

### 2. Take on a building

- **Officer:** records the building (name, plot, street, area) and each unit: type, rent, tenant, tenant since, new or
  already in the building. [launch · Annex 1]
- **Officer:** records every owner with name, NIN and phone, and the written agreement of all co-owners; each owner
  signs. [launch · BM7, Annex 2]
- **Officer:** ticks the proof list (title; or sale agreement or letters of administration, LC1 letter and signed
  statement; NIN of every owner), photographs each paper, records the title search and its result, and notes any
  dispute, debt, mortgage or charge the landlord declares. Acceptance waits on all of it. [launch · BM7, Annex 2]
- **Officer:** walks the building with the landlord and fills the inspection report on a phone, offline: roof, wiring,
  water, stairs and other safety items as OK, needs fixing or unsafe, with numbered photos. [launch · P4]
- **Officer:** gives the landlord notice before any building visit, and the tenants affected notice before a unit
  visit, and logs each entry. [launch · P5, proposed]
- **Officer:** runs the 30-day clock on each unsafe item, reminds the landlord and records the fix with date, initials
  and photo. [launch · P4]
- **Officer:** records the result for the building or per unit: accept, accept once items are fixed by a date, or
  decline with every reason that applies; the landlord sees the reasons. [launch · P9]
- **Manager:** sees the funding test before accepting: payout account less what is committed, against two months of the
  building's net rent. Short means no accept. [launch · BM17]
- **Officer:** prints the agreement, schedule and annexes in English or Luganda, filled from the captured data; until
  then the PDFs are filled by hand. [next · BM11]
- **Officer:** explains the agreement aloud in the landlord's language and records language and explainer. The landlord
  signs or gives a thumbprint before a witness of their choice, whose name is kept, and keeps a copy.
  [launch · BM11, BM3]
- **Landlord:** gives a payout number or account, a statement language and a phone for SMS and WhatsApp, and says if
  paper is wanted. [launch · Annex 4]
- **Officer:** checks the payout account name matches the landlord before the first payout. [launch · proposed]
- **Officer:** records deposits the landlord already holds for existing tenants, with proof, so every deposit has a
  named holder. [launch · BM6, Annex 3]
- **Manager:** signs off; the building goes live and the landlord is told, unit by unit, which 1st its cover starts.
  [launch · P9, P2]
- **Landlord:** adds a building or a unit after signing; it goes through the same ownership, inspection and funding
  checks, the units list is amended, and it joins the same payout and statement. [next · P9, BM17]

### 3. Put tenants on the form

- **Officer:** visits each existing tenant, explains the tenancy form aloud, records language and explainer, takes a
  signature or thumbprint. [launch · P3]
- **Officer:** records each tenancy: unit, tenant's NIN and phone, start date, rent, due day, deposit and who holds it,
  part month paid, months paid ahead, rent paid ahead and rent owed from before sign-up. [launch · form]
- **Officer:** keeps rent owed from before sign-up apart; it is not covered, and Mwavuli collects it for the same 15%.
  [launch · P3]
- **Landlord:** reads on the statement which units are on the form and which are waiting; only occupied units on the
  form are paid on the 1st. [launch · P2, open: rent in the gap]
- **Tenant:** gets the form by WhatsApp, SMS or paper: who the landlord is, that Mwavuli acts for them, who holds the
  deposit, and where to pay (number or account). [launch · form 1, form 2, BM6]

### 4. Fill empty units

- **Landlord:** sees a vacant unit with days empty, viewings held and next step; an empty room earns no rent and costs
  no fee. [next · BM18]
- **Landlord:** agrees the asking rent, and the tenant where the landlord chooses, by replying YES.
  [launch · open: who sets rent and chooses tenants]
- **Officer:** lists vacant units (photos, rent, type, area) as a WhatsApp link, books viewings with reminders to both
  sides, and takes the applicant's NIN, phone and move-in date. [next · brand I6]
- **Tenant:** asks about a unit by WhatsApp or call and gets a viewing time. [next · proposed]
- **Tenant:** pays Mwavuli by mobile money the deposit and the days from move-in to the first due date, with any rent
  ahead; the form is signed and the unit turns occupied. [launch · BM6, P2, P13, P14]
- **Landlord:** is told when a tenant moves in: name, rent, start date, deposit held by Mwavuli, the part month paid,
  and which 1st cover starts. [launch · P2, P14]

### 5. Collect rent

- **Tenant:** pays Mwavuli only, by mobile money or bank, to the number or account on the form; never cash to staff.
  [launch · P1, form 2]
- **Tenant:** pays from any phone, or through a mobile money agent, quoting the unit reference, and the payment still
  reaches the right unit. [launch · proposed]
- **Finance:** works one queue of unmatched, duplicate and reversed payments; each is matched to a unit or refunded.
  [launch · proposed]
- **Support:** traces a payment a tenant says they made, from the mobile money transaction ID and the provider's
  record. [launch · proposed]
- **Tenant:** gets an SMS or WhatsApp receipt at once: amount, unit, months covered, balance, transaction ID.
  [launch · proposed]
- **Tenant:** gets a reminder before the due day and a notice on it; due days differ per tenancy and reminders stop
  when paid. [launch · BM20, proposed]
- **Officer, Support:** move a tenant's due day to keep field work organised, on Mwavuli's own initiative; the landlord
  is not asked or told and the payout stays on the 1st. From the new date, reminders and the covered month follow the
  new day. [launch · BM20, owner 2026-11-13, open: moving a due date while rent is owed]
- **Tenant:** is told in writing, in their language, 30 days before a due day moves, with the new day and the amount
  for the days between; the form is updated. [launch · BM20, P14, owner 2026-11-13]
- **Finance:** counts every part month on a 30-day month, each day one-thirtieth of the rent, rounded to the nearest
  UGX 1,000, for a move-in or a due-day move. [launch · P14]
- **Tenant:** pays in parts; each payment goes to the oldest month first and a month shows paid only when settled in
  full. [launch · BM5, open: part payments]
- **Tenant:** pays months ahead; unused months are held and the tenant is told "paid up to [month]". [launch · P13]
- **Tenant:** sees what is due, what is paid, the next due date and months ahead, in the app or by a WhatsApp reply.
  [next · brand A5]
- **Tenant:** gets a rent receipt or proof-of-tenancy letter on request, for an employer or a bank. [next · proposed]
- **Landlord:** records rent a tenant paid to them and sends it on the same day; the tenant is credited.
  [launch · P5, open: passed on or collected]
- **Landlord:** asks for a rent change; the tenant is told in writing and the form, reminders and statement follow from
  the date it applies. [next · open: who sets rent and chooses tenants]
- **Tenant:** is charged any late fee the form sets, shown apart from rent. [next · P7, open: late fee]

### 6. Pay the landlord on the 1st

- **Finance:** sees each landlord's payout worked out before the 1st: net rent of every occupied unit, a new tenant's
  part month less the 15%, less approved costs, plus VAT passed on. [launch · BM4, S2, P14]
- **Finance:** reviews the batch and its exceptions (paused units, new payout details, holds), then releases it so money
  lands on the 1st. [launch · BM1]
- **Finance:** schedules bank payouts to land on the 1st, weekends and public holidays included. [launch · BM1, BM8]
- **Landlord:** gets one payment to the number or account on file and one statement in the chosen language.
  [launch · BM4, P1]
- **Landlord:** confirms the money arrived with one word, or says it did not; Finance sees the answer. [launch · BM8]
- **Finance:** is alerted at the end of the 2nd to any payout not confirmed as reached, so no landlord reaches the 3rd
  unpaid. [launch · BM8, S9.2]
- **Landlord:** changes the payout number or account only after an officer's call-back, from the next payout, and the
  old number is told; this blocks SIM-swap and impersonation fraud. [launch · proposed]
- **Finance:** corrects a wrong statement or payout, adjusts the next payout and tells the landlord. [launch · proposed]
- **Finance:** can export the payout batch and pay by hand if the system is down on the 1st, then reconcile.
  [launch · proposed]
- **Finance:** sees a 30-day cash forecast: payouts due on the 1st against rent expected by each tenant's due day.
  [next · BM20]

### 7. When a tenant does not pay

- **Landlord:** keeps the net rent paid on the 1st for a month a tenant misses, and is told in one message who missed it
  and that Mwavuli is chasing. A paused unit gets its own message and the reason.
  [launch · BM1, BM18, owner 2026-11-13]
- **Finance:** sees each unit's covered month, the amount advanced and the amount recovered; one covered month per unit
  at a time. A paused unit is paid again when its arrears clear or a new tenant moves in, and can then have a new
  covered month. [launch · BM1, S3]
- **Officer:** works an arrears queue by building and age, from the day a due date is missed; the steps are remind,
  call, visit, written notice, each logged with date, channel and outcome.
  [launch · BM5, form 5, owner 2026-11-13, open: when the notice goes out]
- **Tenant:** gets the reminder, call, visit and written notice in their language; proof of each is kept, including who
  received the notice. [launch · BM5, form 5]
- **Officer:** records a promise to pay and is alerted when it is missed. [next · proposed]
- **Tenant:** pays arrears and every payment goes to the oldest month first: the covered month repays Mwavuli, later
  months go to the landlord less 15%. The landlord reads in plain words where it went. [launch · BM5, S3.5]
- **Officer:** prepares a court step and asks the landlord for YES with the likely costs; the case is in the landlord's
  name. [launch · BM5, S4.2]
- **Landlord:** says YES or NO to court by reply, or on a recorded call confirmed by text; the system keeps it.
  [launch · P6]
- **Finance:** records lawyer, court and bailiff costs at cost, takes them from the deposit Mwavuli holds, and bills the
  landlord for the rest. [launch · S4.4]
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
  NO; work waits for YES. [launch · BM2, P6]
- **Officer:** chases an unanswered YES by call and tells the tenant the job is on hold. [launch · proposed]
- **Landlord:** is told the same day when an urgent safety repair up to the emergency amount has started.
  [launch · P6]
- **Landlord:** pays the balance of a job bigger than one payout before work starts; the job is held until it arrives.
  [launch · BM4]
- **Contractor:** gets the job on WhatsApp or SMS (unit, access, tenant phone, quote), confirms a visit time, and sends
  photos and the invoice when done; Officer checks before paying. [launch · proposed]
- **Tenant:** gets the visit time and the contractor's name and phone before anyone enters, and confirms the fix.
  [next · proposed]
- **Caretaker:** reports faults and opens the door for contractors; never collects rent. [next · proposed]
- **Officer:** records tenant-caused damage with photos; the tenant is billed in full once repairs are done, else it
  comes from the deposit. [launch · BM2, BM6]
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
  own, with a register by tenant, unit, amount and holder. [launch · BM6, P13, BM17]
- **Tenant:** is told their deposit, who holds it, and any deduction with its reason. [launch · form 3]
- **Finance:** pays prepaid rent to the landlord month by month on the 1st, less 15%; later months stay held.
  [launch · P13]
- **Officer:** itemizes each deduction from a deposit (unpaid rent, damage, legal costs) with evidence; Finance approves
  it. [launch · BM6]
- **Tenant:** gets prepaid months that have not started back, with no fee, when leaving early; a month that has
  started is not refunded. [launch · P13, P14]
- **Landlord:** sees deposits and prepaid rent on the statement as held for tenants, not income. [next · proposed]

### 11. Move out

- **Tenant:** gives notice by call or WhatsApp; the system records who, when and the move-out date.
  [launch · form 10, open: tenant notice]
- **Support:** when a tenant gives notice, tells them which move-out dates end on a due date, since a month that has
  started is paid in full. [launch · P14, proposed]
- **Landlord:** is told when a tenant gives notice, with the move-out date, and again when the unit is vacant.
  [launch · proposed]
- **Officer:** photographs the unit at move-in and again at move-out to settle damage. [next · proposed]
- **Finance:** settles the deposit: takes unpaid rent (oldest month first), damage and legal costs, refunds the rest by
  mobile money or bank, and sends an itemized note. [launch · BM6, BM5]
- **Tenant:** disputes a deduction: talk first, then a mediator, then the courts of Uganda, with the evidence attached.
  [next · P12]
- **Landlord:** is reminded to return a deposit the landlord holds for an existing tenant.
  [next · BM6, open: landlord-held deposit]

### 12. Landlord leaves

- **Landlord, Manager:** give 30 days' written notice; the system records it and sets the end date.
  [launch · BM8, open: how notice is given]
- **Landlord:** leaves at once, with no fee, when a payout has not reached by the end of the 3rd; the system recognizes
  the trigger. [launch · BM8]
- **Manager:** ends the agreement at once for rent the landlord collects themselves, interference with tenants or a
  refused urgent safety repair, with evidence and reason recorded. [launch · BM8, P5, open: what ends it at once]
- **Finance:** issues the final statement and payment within 14 days of the end date: rent collected and not paid out,
  plus prepaid rent after the end date in full with no fee, less approved costs and any covered month a tenant still
  owes. [launch · P8]
- **Officer:** hands the landlord the tenant files (forms, ledgers, deposit register, photos) and any deposits held,
  after rent owed is taken. [launch · P8]
- **Tenant:** is told Mwavuli has stopped acting for the landlord, and gets a "rent paid up to [month]" note if
  prepaid; the landlord honors it. [launch · P8, P13, form 11]
- **Officer:** moves the agreement to the new owner or the estate, or ends it, when a building is sold or a landlord
  dies, on the right papers. [next · open: sale and death]

### 13. Statements, messages and support

- **Landlord:** gets one statement a month by SMS or WhatsApp in the chosen language, paper on request; the message
  holds the totals and a link to the detail. [launch · BM4, P1]
- **Landlord:** reads rent from occupied units, the 15% fee, repairs with the 10% fee, VAT passed on, covered months
  repaid and the amount paid, with each unit's tenant, rent and status. [launch · BM18]
- **Landlord:** asks for the statement read aloud, by an officer's call or a voice note in Luganda or English.
  [next · proposed]
- **Landlord:** asks about any line by replying; it becomes a case answered in the same chat. [next · proposed]
- **Landlord, tenant:** reply YES or NO in English or Luganda; anything unclear goes to a person and is never taken as
  consent. [launch · P6]
- **Landlord, tenant:** get messages on WhatsApp first and by SMS when it is not delivered; no app needed.
  [launch · proposed]
- **Support:** sees the caller by phone number: person, building, units, recent payments, open cases, on one screen.
  [next · proposed]
- **Support:** keeps each person's language and uses it on every message; Luganda templates are complete, reviewed by a
  qualified person and reviewed again when terms change. [launch · BM11, brand F8]
- **Landlord:** reads a short building report each quarter: occupancy, collections, repairs and spend, in plain words.
  [next · brand F2]
- **Landlord:** downloads a year of statements for tax filing. [next · P5, P10]

### 14. Control, compliance and trust

- **Manager:** sees the portfolio: buildings, units, occupancy, collection rate, covered months outstanding, arrears by
  age, open repairs, payouts due. [next · proposed]
- **Manager:** sees float headroom, the payout account against commitments, and is alerted when it falls short of what
  the accept test needs. [launch · BM17]
- **Finance:** reconciles the collection, payout and client-money accounts to the ledger every day and chases any gap.
  [launch · BM17, P13]
- **Finance:** needs a second person for any payout, refund or deduction above a set amount. [launch · proposed]
- **Manager:** sees each YES, notice, signature, explanation and recording with who, when and channel; none can be
  edited. [launch · P6, BM11]
- **Manager:** assigns staff to buildings and removes leavers' access the same day; staff see only their buildings and
  every view of personal data is logged. [launch · P11]
- **Manager:** runs any landlord or tenant dispute as a case: the talk, the mediator, the outcome, and the courts only
  after. [next · P12]
- **Officer:** explains the privacy line and records consent at signing. [launch · P11]
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
- **Business tenant:** gets a receipt that splits rent and VAT, by email or paper. [next · P10]
- **Business tenant:** signs a commercial tenancy form under the same agreement. [next · BM9, open: commercial form]
- **Officer:** tracks a commercial lease's term and renewal date and reminds landlord and tenant. [next · proposed]
- **Finance:** quotes and takes rent in UGX only. [launch · BM9, open: rent currency]

### 16. Later

- **Landlord:** asks for an advance of up to 3 to 6 months of net rent at 1.5% a month on the reducing balance, under a
  separate agreement. [BM13 to BM15, open: licence]
- **Landlord:** puts new buildings and extensions under a works agreement. [open: construction scope]
- **Tenant, landlord:** use USSD or a feature phone for a balance, a pay prompt and a fault report. [proposed]
- **Tenant:** browses vacant units online and books a viewing. [proposed]
- **Landlord abroad or upcountry:** gets the same statements, YES requests and payouts remotely, paid to a local
  account. [proposed]
- **Everyone:** other languages, each a complete reviewed translation. [brand F8]

## Rules the product enforces

- No cash from tenants to staff. [P1]
- A due day moves only on 30 days' written notice to the tenant, with the form updated and the days between charged;
  the landlord is not asked. [BM20, P14, owner 2026-11-13]
- Every part month is counted on a 30-day month, each day one-thirtieth of the rent, rounded to the nearest UGX 1,000.
  [P14]
- A month that has started is paid in full; a tenant who leaves part-way through it gets none of it back. [P14]
- No building goes live until the ownership check passes, unsafe items are fixed and the funding test passes.
  [BM7, P4, BM17]
- No unit is paid on the 1st unless it is occupied on the form with rent and deposit written down. [P2]
- One covered month per unit, never two. A unit whose covered month is unpaid on the next 1st is not paid until its
  arrears clear or a new tenant moves in. [BM1, S3.2]
- Mwavuli earns its 15% on a covered month only when that rent is collected. [S3.4]
- The 15% applies to rent only, not to deposits, utilities, repairs, VAT or late fees. [BM4, S1.4]
- No work above the approval limit without YES, except urgent safety up to the emergency amount. [BM2, P6]
- No job takes more than one payout; the balance is paid first. [BM4]
- No legal step without the landlord's YES, and only in the landlord's name. [BM5]
- No lock-out, removal of belongings, or cut of water or power, by staff or landlord. [BM5, P5]
- Deposits and prepaid rent are used for nothing else. [BM6, P13]
- No markup on utilities, no sign-up, letting or yearly fee, and no fee to tenants beyond a late fee in the form.
  [BM2, P7]
- Personal data is used only to manage the building. [P11]
- Only one language version of an agreement is signed. [BM11]
- Copy never says "always paid"; "guaranteed" only beside "we cover the first month". [BM18]

## Open decisions

Terms the stories wait on. The model and the agreements list most of them as not decided; the rest are gaps between the
documents. Stage numbers are in brackets.

- Who may say YES, and who receives the statement and the payout, when a building has co-owners or an estate
  (2, 6, 7, 8).
- Licence and law: paid cover as insurance or suretyship, payment-service and money-laundering duties, the explanation
  statement under the Illiterates Protection Act, stamp duty and registration of the agreements (2, 14).
- The contracting company, the VAT status and the signatory (2, 14).
- The Luganda text of the agreement set, statements and messages, not written or reviewed yet, and whether the tenancy
  form is bilingual (2, 3, 13).
- What ID a tenant without a NIN may give, and whether joint tenants share one tenancy; the form names one tenant (3).
- What is paid for an existing tenant not yet on the form (3).
- Who sets each unit's rent and increases, and who chooses tenants (4, 5).
- Which mobile money providers and banks the product takes payments from and pays out to, and who bears their charges
  on collections and payouts (5, 6).
- Part payments and payment plans (5, 7).
- Whether a due date may move while the tenant owes rent; a later date must not undo a missed due date or restart the
  chasing (5).
- Whether Mwavuli may move a due date on 30 days' notice without the tenant's agreement, and without telling the
  landlord (5).
- The late fee, eviction steps, deposit rules, and keeping the rent of a month that has started under the Landlord and
  Tenant Act 2022 (5, 7, 10, 11).
- What separates rent a tenant paid to the landlord, who passed it on the same day (P5), from the landlord collecting
  rent, a ground to end at once (BM8) (5, 12).
- When the written notice goes out: with the pause on the next 1st, as the BM5 example has it, or at the end of the
  visits (7).
- When rent collected after a covered month reaches the landlord, and who collects rent after the end date (7, 12).
- Whether a deposit the landlord holds can be used against a covered month, proposed in BM6 and not approved (7, 11).
- What counts as an urgent safety repair; the inspection's unsafe list is roof, wiring, water and stairs (8).
- Whether the emergency amount counts the 10% fee, as the approval limit does (8).
- Who pays the contractor first for tenant damage, and whether the 10% is charged to the tenant (8).
- Response-time promises for repairs and support (8, 13).
- Who pays the electricity, water and garbage providers, how a tenant's share is collected, and the share for a unit
  with no meter; the agreement leaves it open while tenancy form 7 commits the tenant to a share (9).
- The tenant's notice period; notice that ends on a due date leaves no part month (11).
- How a notice to leave is given, from when it counts, and whether leaving on 30 days' notice carries a fee; none is
  stated (12).
- What ends the agreement at once: any breach of a landlord duty (P5) or only the three events in BM8 (12).
- Sale of a building, and the death or incapacity of a landlord (12).
- The privacy policy: the site's text is a placeholder pending counsel (14).
- Commercial tenancy form, rent currency, VAT and withholding tax (15).
- Construction scope (16).
