# Grill Me Session: Mwavuli business model (SNT-25)

- Mode: singular
- Timestamp: 2026-11-10T21:41:03Z (written then; the session began earlier the same day)
- Slug: mwavuli-business-model
- Sources: the owner's pasted business model; `brand/` docs on branch SNT-24-brand-design-language (README,
  00-inventory, 01-foundation, 06-iconography, 08-applications); this conversation
- Output: [business/model.md](../../business/model.md) (BM1 to BM13) and ticket SNT-25
- Note: every card states a 3-minute timeout, but no timer was available in this session, so nothing was applied by
  timeout. Every resolution below is the owner's own reply. Links to the model doc are re-pointed to this file's
  location; the wording is otherwise as sent.

## Opening context

**Owner**

> additional context on the business model
>
> here is the business model
>
> * 15% on monthly rent collections
> * construction & build repairs
> * electricity & water bills handling
> * electrical & plumbing services
> * tenant management and sourcing(find tenants for vacant rentals)
> * Guarateed 1st of month rental income for all occupied rentals, we handle the rental collection subsequently
> * Garbage disposal and management
>
> work with me to refine it, its going to be used to draft legal documents to guide/share the nature of arrangement
> between the landlord and the company and also pitch value proposition to the would be future landlords

**Assistant**

> Board check done: no ticket covers the business model, only the brand ticket SNT-24. I'm filing one for this work
> and checking the git remote, then I'll ask the first question.

**Assistant**

> SNT-25 is filed and In Progress. Branch `SNT-25-business-model-refinement` is cut from `origin/main` in
> `.claude/worktrees/SNT-25-business-model-refinement`. I added that path to `.git/info/exclude`, so your SNT-24
> checkout is still clean.
>
> Your seven bullets are one fee, one guarantee and five services. A legal draft needs five things they don't define
> yet:
>
> - what the 15% is charged on and what it covers
> - what "guaranteed" costs you when a tenant doesn't pay
> - who pays for repairs, utilities and garbage
> - who holds the money
> - how a landlord leaves
>
> I'll take them one at a time, guarantee first, because it's the pitch headline and your biggest legal exposure.

## Questions And Options

### Guarantee - Question `q1`

Guarantee · Question `q1` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
When a tenant in an occupied unit hasn't paid by the 1st, who carries the loss, and for how long?

**Current Assumption**
Mwavuli pays the landlord on the 1st from its own funds and collects from the tenant afterwards, as you wrote. Nothing yet says how long Mwavuli keeps paying for a tenant who doesn't pay.

**Recommended: `r` or `1`**
A cap: Mwavuli carries up to 3 months of unpaid rent per unit, then treats the unit as vacant and the guarantee for it stops. A cap turns an open-ended liability into a number you can fund and a lawyer can write. "Guaranteed" stays true for every month inside it. The 3 is my starting figure; you set it.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Capped guarantee: up to 3 months of unpaid rent per unit (name another number to change it) | Strong pitch. Worst case per bad tenant is 3 × the net rent paid out. Needs a funded reserve |
| `2` | No cap: Mwavuli pays until the tenant is out | Strongest pitch. Loss is open-ended while an eviction runs, so it needs a reserve rule to be safe |
| `3` | Advance with recourse: Mwavuli pays on the 1st; arrears still unrecovered after 60 days are deducted from later remittances | Safest for Mwavuli. Landlords will read it as "not guaranteed", so the headline changes |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `#1, up to 1 month of unpaid rent per unit`

Resolution: selected `1` with a change: the cap is 1 month, not the recommended 3. Recorded as BM1.

### Services - Question `q2`

> **Assistant, before the card**
>
> Recorded **BM1** (Owner): guarantee cap is 1 month of unpaid rent per unit. I read it as per unit and per default.
> If the month is still unpaid on the next 1st, Mwavuli stops paying for that unit until the arrears clear or it is
> re-let, and the cap then resets. Correct me if that's wrong.
>
> The pitch wording follows from this. The promise reads "rent on the 1st for every occupied unit; we cover the first
> month of any miss", not "always paid".
>
> Queue: works and pricing · fee and the 1st payout · default process · money and deposits · onboarding · approval
> limits · exit · who signs · pitch example.

Services · Question `q2` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
Who does the repair, electrical, plumbing and construction work, and how does Mwavuli get paid for it?

**Current Assumption**
Your list sells these as services. It doesn't say whether Mwavuli's own crews do the work or Mwavuli manages contractors, or whether the 15% already pays for it. I'm also assuming utilities and garbage are passed through at cost in every case.

**Recommended: `r` or `1`**
Mwavuli arranges vetted contractors as the landlord's agent. The landlord pays the contractor's quoted price plus a disclosed coordination fee on each job, and approves jobs above a spending limit. Workmanship liability and trade licensing sit mainly with the contractor (counsel to confirm). The pitch line becomes "one call, a quote, your approval". The fee percentage and the limit are the next questions on this thread.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Agent: vetted contractors; landlord pays their price plus a disclosed coordination fee | Lowest liability, no payroll, scales. Margin is limited to the fee |
| `2` | Contractor: Mwavuli's own crews quote and bill per job from a rate card; construction subcontracted | Highest margin and control. Mwavuli carries workmanship liability, licensing and a warranty |
| `3` | All-in: the 15% covers call-outs and minor repairs; only major works are quoted | Simplest pitch ("no extra bills"). A repair-heavy building can cost more than its 15% brings in |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `#1, please note that the target market is Uganda and primary customers are uneducated landlords with minimal understanding of legalities and very little appetite to legalese`

Resolution: selected `1` (recommended). Recorded as BM2. The audience note was recorded as BM3.

### Payout - Question `q3`

> **Assistant, before the card**
>
> Recorded **BM2** (Owner): works go through vetted contractors with Mwavuli as the landlord's agent. The landlord
> pays the contractor's price plus a disclosed coordination fee, and approves jobs above a limit. Utilities and
> garbage pass through at cost. The fee % and the limit wait for a numbers round at the end, so we settle structure
> first.
>
> Recorded **BM3** (Owner): the customer is a Ugandan landlord with little formal education and little patience for
> legal language. I'll apply it like this:
> - Every term is written first as a plain statement that passes a read-aloud test, with a UGX example. Legal wording
>   goes in a separate counsel note.
> - Landlord-facing documents stay short, with the full legal terms in a schedule behind them, and the offer carries
>   only a few round numbers.
> - Two items join the queue: the languages of the documents with how an agreement is explained and signed (the
>   Illiterates Protection Act may require a signed explanation for landlords who can't read the document's language;
>   counsel to confirm), and what proof of ownership we accept.
> - Brand F8 defaults to English first, which probably needs a Luganda default for landlord documents. I'll log that
>   on SNT-25 for after SNT-24 lands.
>
> Queue: default process · money and deposits · onboarding and proof of ownership · landlord duties and approvals ·
> exit · languages and signing · other fees · who we serve · numbers round · pitch example.

Payout · Question `q3` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
On the 1st, how does Mwavuli pay the landlord, and what is the 15% charged on?

**Current Assumption**
The 15% comes off the rent before it reaches the landlord, so there is no separate bill. It applies only to rent from occupied units. Costs the landlord approved (a repair, the utility bill, garbage) come off the same payment.

**Recommended: `r` or `1`**
One payment, one statement. On the 1st, Mwavuli sends the rent of every occupied unit minus 15%, and the statement lists any approved costs taken off. The plain rule is "We take 15% of the rent. No rent, no fee." The 15% is charged on rent only, never on deposits, utility or garbage money, or costs passed through. This is the easiest offer for this audience to understand and check, because the landlord never receives a bill.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | One net payment: rent minus 15%, approved costs taken off the same payment, one statement | Simplest to explain and check; the landlord pays no bills. A big job needs a rule so it can't swallow a whole payout (numbers round) |
| `2` | Two flows: rent minus 15% on the 1st; repairs, utilities and garbage billed separately as they arise | Payout stays steady, but the landlord gets invoices to pay and chase, which suits this audience badly |
| `3` | Gross rent on the 1st, then one monthly bill for the 15% and costs | The landlord sees the full rent arrive, but Mwavuli must collect its own fee from landlords, and a missed bill becomes a dispute |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `r`

Resolution: selected `r` (option `1`, recommended). Recorded as BM4.

### Arrears - Question `q4`

> **Assistant, before the card**
>
> Recorded **BM4** (Owner, recommendation accepted): one net payment on the 1st, rent minus 15%, approved costs taken
> off the same payment, one statement. The 15% is on rent only: "No rent, no fee." In a covered month Mwavuli pays out
> 85% of the rent and earns its 15% only if the tenant pays later.
>
> BM1 to BM4 are now in [business/model.md](../../business/model.md), each as a plain statement with a UGX example and
> a counsel note. Committed `d2686c8` and pushed to `SNT-25-business-model-refinement`, a private repo with no PR
> open. Tell me if the plain statements sound wrong to you, since that's the wording landlords will hear.
>
> Queue: money, deposits and funding the 1st · onboarding and proof of ownership · landlord duties and approvals ·
> exit, including when Mwavuli pays late · languages and signing · other fees · who we serve · numbers round · pitch
> example.

Arrears · Question `q4` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
When a tenant still hasn't paid after the covered month, what does Mwavuli do, and who pays for the legal steps?

**Current Assumption**
Mwavuli stays the landlord's agent for that unit, so legal steps are taken in the landlord's name. The covered month becomes Mwavuli's to collect, and money from a tenant who owes goes to the oldest month first.

**Recommended: `r` or `1`**
Mwavuli runs the whole process: reminders and visits, then a formal written notice, then, with the landlord's YES, a lawyer, the court and a bailiff. Mwavuli's own time is inside the 15%. Lawyer, court and bailiff costs are at cost, taken from the tenant's deposit first and otherwise paid by the landlord. The plain rule: "We chase. If it goes to court, you say YES first. We never lock a tenant out." That keeps the tenant-management promise real without putting uncapped legal bills on Mwavuli.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Full process as the landlord's agent: Mwavuli's time inside the 15%; lawyer, court and bailiff at cost (deposit first, then the landlord); legal steps need the landlord's YES | Real help when the landlord needs it most. Mwavuli carries only its own time |
| `2` | Soft steps only: reminders, visits and a written demand, then the file goes back to the landlord | Cheapest and lowest risk for Mwavuli. The landlord is on their own exactly when it matters, and "tenant management" sounds hollow |
| `3` | Everything at Mwavuli's cost, including lawyer, court and bailiff | Strongest pitch ("we handle bad tenants free"). Legal costs are uncapped per case, and one long case can wipe out the 15% from several units |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Interlude**

**Owner:** `in simple concise terms explain #1 + mechanics`

**Assistant**

> **#1 in one line:** if a tenant still hasn't paid after the covered month, Mwavuli does all the chasing and legal
> work for the landlord. Our time is free (inside the 15%), outside costs are paid at cost, and we never lock a tenant
> out.
>
> **How it runs** (room at UGX 400,000; our 15% is UGX 60,000, so the landlord gets UGX 340,000)
>
> 1. **1 Mar, tenant hasn't paid.** We still pay the landlord UGX 340,000 from our own funds. March is the covered
>    month, and the tenant's March rent is now ours to collect.
> 2. **March.** We remind, call and visit. If the tenant pays, we collect UGX 400,000: UGX 340,000 repays us and
>    UGX 60,000 is our fee. The landlord never notices.
> 3. **1 Apr, still unpaid.** The first-month cover is used up, so we send nothing for that room. We give the tenant a
>    formal written notice, and the statement tells the landlord in plain words.
> 4. **Still unpaid.** We ask the landlord: "Take it to court? Reply YES." On YES, a lawyer, the court and a bailiff
>    act. Their costs come out of the tenant's deposit first, if there is one, and the landlord pays the rest at cost.
> 5. **It ends one of two ways.** The tenant pays up, or the court has them removed and we find a new tenant. We pay
>    on the 1st again once the arrears are cleared or the new tenant moves in.
>
> **Two rules inside the mechanics**
> - A month we pay that the tenant didn't becomes ours to collect.
> - Money from a tenant who owes goes to the oldest month first, so March repays us before April reaches the landlord.
>
> **Who carries what**
> - **Mwavuli:** March's UGX 340,000 (its fee for that month is earned only if the tenant pays) and its own time. That
>   is the most it can lose on one room.
> - **Landlord:** that room's rent from April until the tenant pays or leaves, plus legal costs the deposit doesn't
>   cover.
>
> For comparison, #2 stops after the written notice and hands the file back. #3 is #1 with Mwavuli also paying the
> outside costs.
>
> `q4` is still open: reply `1`, `2`, `3` or `r`.

**Reply** `#1`

Resolution: selected `1` (recommended). Recorded as BM5.

### Deposits - Question `q5`

> **Assistant, before the card**
>
> Recorded **BM5** (Owner): after the covered month, Mwavuli runs the whole arrears process as the landlord's agent.
> That means reminders and visits, a written notice, then a lawyer, court and bailiff on the landlord's YES. Its own
> time is inside the 15%, and outside costs are at cost (tenant's deposit first, then the landlord). The covered month
> becomes Mwavuli's to collect, and money from a tenant who owes goes to the oldest month first. BM5 goes into the doc
> with the next batch.
>
> Queue: deposits · funding the 1st · onboarding and proof of ownership · exit · languages and signing · who we serve.
> After those, one batch of proposed defaults (duties, approvals, other fees) and the numbers round.

Deposits · Question `q5` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
Who holds a tenant's deposit?

**Current Assumption**
Mwavuli pays the landlord first and collects later, so a deposit is its only cushion for the covered month and the first source for legal costs (q4). Many landlords already hold deposits from existing tenants, and some have spent them.

**Recommended: `r` or `1`**
Split by tenant. A new tenant's deposit is paid to Mwavuli and kept in a separate account. It is used only for what the tenancy allows (unpaid rent, damage, legal costs) and otherwise returned to the tenant. For existing tenants, the landlord keeps the deposit they already hold, the amount is written down at sign-up, and the landlord stays responsible for returning it. A landlord can join without handing over money, and new tenants and Mwavuli are protected from day one. The plain rule: "New deposits come to us and stay safe. Old deposits stay with you, and we write the amount down."

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Split: new tenants' deposits to Mwavuli (separate account); existing tenants' deposits stay with the landlord, amount recorded | Easy to join. Existing units have no deposit cushion for the covered month or legal costs |
| `2` | Mwavuli holds all deposits; landlords hand over what they hold at sign-up | Strongest protection for Mwavuli and tenants. Landlords who have spent their deposits may refuse to join |
| `3` | The landlord holds all deposits | Simplest for landlords. Mwavuli has no cushion, and the landlord could use a deposit against rent Mwavuli already paid |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `#1`

Resolution: selected `1` (recommended). Recorded as BM6.

### Ownership - Question `q6`

> **Assistant, before the card**
>
> Recorded **BM6** (Owner): deposits split by tenant. A new tenant's deposit goes to Mwavuli and sits in a separate
> account. It is used only for what the tenancy allows (unpaid rent, damage, legal costs), and the rest goes back to
> the tenant. For existing tenants, the landlord keeps the deposit, the amount is written down at sign-up, and the
> landlord stays responsible for returning it. The consequence is that units with existing tenants have no deposit
> cushion, so their legal costs fall straight on the landlord. BM5 and BM6 go into the doc with the next answer.
>
> I moved "funding the 1st" to the numbers round, because it needs your figures rather than a choice. For scale, 100
> rooms at UGX 400,000 means UGX 34,000,000 paid out on the 1st. Whatever tenants haven't paid by then is Mwavuli's
> own money.
>
> Queue: exit, including when Mwavuli pays late · languages and signing · who we serve. After those, one batch of
> proposed defaults (duties, approvals, other fees, money basics) and the numbers round.

Ownership · Question `q6` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
What proof of ownership must a landlord show before Mwavuli takes on the building?

**Current Assumption**
Mwavuli pays the landlord and collects rent in the landlord's name, so it must know the person signing can lawfully let the building. Some landlords here hold a certificate of title. Others hold a sale agreement, inherited property without letters of administration, or only a local council letter.

**Recommended: `r` or `1`**
Tiered proof. A certificate of title in the landlord's name counts. If there is none, a sale agreement or letters of administration (or probate) plus a local council (LC1) letter and the landlord's signed statement that they own the building and may let it. National ID is required in every case. Mwavuli runs a title search where a title exists. It declines a building with a known dispute, or with co-owners who haven't all agreed in writing. This keeps the market wide while the check stays real. The plain rule: "Show us your title, or the papers on our list. We check them before we start."

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Tiered: title, or sale agreement / letters of administration + LC1 letter + signed statement; national ID always; title search where a title exists | Wide market with a real check. Slower sign-up and some residual risk on untitled buildings |
| `2` | Title only: a certificate of title (or registered lease) in the landlord's name | Safest. Landlords without a title are excluded at launch |
| `3` | Light: national ID and an LC1 letter | Fastest sign-up. Mwavuli may end up managing disputed property and paying the wrong person |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `#1`

Resolution: selected `1` (recommended). Recorded as BM7.

### Exit - Question `q7`

> **Assistant, before the card**
>
> Recorded **BM7** (Owner): tiered proof of ownership. A certificate of title is enough. Without one, the landlord
> brings a sale agreement or letters of administration, an LC1 letter and a signed statement of ownership. National ID
> is always required, Mwavuli searches the title where one exists, and it declines disputed buildings or ones whose
> co-owners haven't all agreed in writing.
>
> BM5 to BM7 are now in [business/model.md](../../business/model.md), committed as `09f8899` and pushed.
>
> Queue: languages and signing · who we serve. After those, one batch of proposed defaults and the numbers round.

Exit · Question `q7` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
How long is a landlord tied in, and how can either side end the agreement?

**Current Assumption**
A landlord who has never met Mwavuli will fear being stuck with it, while Mwavuli's guarantee and sign-up work are an upfront cost. I'm also assuming the landlord may end the agreement at once, with no fee, if Mwavuli has not paid by the 3rd. The exact day goes to the numbers round.

**Recommended: `r` or `1`**
No lock-in. Either side ends the agreement with 30 days' written notice. The landlord may leave at once if the 1st is missed past the grace day. Mwavuli may leave at once if the landlord takes rent directly, interferes with tenants or refuses an urgent safety repair. The plain rule: "Leave any time with 30 days' notice. If we haven't paid you by the 3rd, leave straight away." For a landlord who has never met you, that is the strongest trust signal, and it makes missing the 1st costly for Mwavuli. A tail on tenants Mwavuli placed (the 15% continues for a few months after the landlord leaves) is proposed in the defaults batch to protect the finder's work.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | No lock-in: 30 days' notice either way; landlord leaves at once if Mwavuli hasn't paid by the 3rd; Mwavuli leaves at once for direct rent collection, interference or refusing an urgent safety repair | Strongest trust signal. Mwavuli's sign-up work is protected only by the tail and the covered-month claim |
| `2` | First 6 months fixed, then 30 days' notice; the landlord can still leave at once if Mwavuli misses the 3rd | Protects Mwavuli's sign-up cost. A cautious landlord sees a lock-in and may not sign |
| `3` | 12 months fixed, then 90 days' notice | Strongest cover for Mwavuli's investment. Heavy for this audience, and an early-exit fee is hard to explain aloud |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `#1`

Resolution: selected `1` (recommended). Recorded as BM8.

### Scope - Question `q8`

> **Assistant, before the card**
>
> Recorded **BM8** (Owner): no lock-in. Either side ends the agreement with 30 days' written notice. The landlord may
> leave at once, with no fee, if Mwavuli hasn't paid by the 3rd. Mwavuli may leave at once if the landlord takes rent
> directly, interferes with tenants or refuses an urgent safety repair. Mwavuli's sign-up work is protected only by
> the covered-month claim and the tail on placed tenants (in the defaults batch). BM8 goes into the doc with the next
> answer.
>
> I moved who we serve ahead of languages, because the right language depends on the place. Queue: languages and
> signing · one batch of proposed defaults · the numbers round · the pitch example.

Scope · Question `q8` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
What does Mwavuli take on at launch: which kind of property, and where?

**Current Assumption**
Your customers are small and mid-size landlords, and the guarantee and the float grow with every unit. The brand speaks to people and businesses (F1, F3), so commercial is already part of the story. Launching on all of it widens both the pitch and the risk.

**Recommended: `r` or `1`**
Residential rentals (rooms, bedsitters, flats, small blocks) in one area, with commercial later. Name your area if it isn't Kampala and its surroundings. A commercial tenant's rent is larger, and fewer tenants carry more of it, so one default costs more. Staff visits, trusted contractors, lawyers and garbage collection are cheaper to run in one area. The pitch stays about one kind of landlord. The brand's "both audiences" rule (F1) then needs a launch note after SNT-24 lands.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Residential in one area; commercial later | Tightest pitch and exposure. Brand F1 needs a launch note |
| `2` | Residential and commercial in one area | Matches the brand story. A commercial default costs several rooms' rent, and commercial leases need different terms |
| `3` | Residential across Uganda | Widest reach. Staff, contractors and legal help are needed in every area, and the float spreads thin |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `2`

Resolution: selected `2` (not the recommended `1`). Recorded as BM9. The area was not named, so Kampala and its
surroundings are assumed.

### Commercial - Question `q9`

> **Assistant, before the card**
>
> Recorded **BM9** (Owner): launch covers residential and commercial units in one area. You didn't name the area, so
> I'm assuming Kampala and its surroundings; correct me, or we fix it in the numbers round. It matches the brand's
> "people and businesses" purpose, so no brand change is needed. BM8 and BM9 go into the doc with the next answer.
>
> Commercial brings one new risk to settle before languages. Queue: languages and signing · one batch of proposed
> defaults · the numbers round · the pitch example.

Commercial · Question `q9` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
Do commercial units get the same terms as residential ones?

**Current Assumption**
The 15%, the first-month cover and the payout on the 1st work the same for a shop as for a room, but the sums differ. A UGX 3,000,000 shop that doesn't pay costs Mwavuli UGX 2,550,000 in the covered month. A UGX 400,000 room costs UGX 340,000. That one shop equals the monthly fees from about 40 rooms.

**Recommended: `r` or `1`**
Same terms, with one limit. A unit whose monthly rent is above a set amount is managed and collected for the 15%, but the first-month cover does not apply to it. Below the limit nothing changes. The plain rule: "Rent on the 1st for every unit up to UGX [limit] a month. Above that, we manage it and collect the rent, but the cover doesn't apply." The limit is a number for the numbers round. It keeps one big tenant from using up the float, and it is easy to say aloud.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Same terms, with a rent limit: units above it are managed for the 15% but without the first-month cover | One extra number. Caps the cost of one big default. Landlords of large units get a weaker promise |
| `2` | Same terms for every unit, no limit | Simplest pitch, one set of terms. One large commercial default can cost as much as the fees from dozens of rooms |
| `3` | Commercial on its own terms (fee and cover decided separately) | Fits commercial risk and lease length. A second offer, a second pitch and a second agreement to explain |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `2`

Resolution: selected `2` (not the recommended `1`). Recorded as BM10. The owner accepted the concentration risk of a
large unit with no rent limit.

### Documents - Question `q10`

> **Assistant, before the card**
>
> Recorded **BM10** (Owner): a shop or office gets the same terms as a room, with no rent limit. The risk is one large
> default: UGX 2,550,000 for a UGX 3,000,000 shop, as much as the fees from about 40 rooms. I cover it two ways. The
> right to decline a unit Mwavuli can't fund at sign-up goes in the defaults batch, and the float is sized for the
> largest unit in the numbers round.
>
> BM8 to BM10 are in [business/model.md](../../business/model.md), committed as `a95688e` and pushed.
>
> Queue: one batch of proposed defaults · the numbers round · the pitch example.

Documents · Question `q10` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
In which languages do the landlord documents come, and how is an agreement explained and signed?

**Current Assumption**
Brand F8 says English first, with other languages only as complete, reviewed translations. Courts and lawyers work in English. I'm assuming your landlords (Kampala and its surroundings, assumed) mostly read Luganda or English, and some read neither well.

**Recommended: `r` or `1`**
Two languages, explained aloud, witnessed. The agreement comes in English and Luganda (a complete, reviewed translation), and both versions are signed. A Mwavuli officer reads and explains the key terms aloud in the language the landlord chooses. The landlord signs, or gives a thumbprint, in front of a witness of their choosing. A short signed note records who explained it and that the landlord understood; the Illiterates Protection Act may require this (counsel to confirm). The landlord leaves with a copy. The plain rule: "We read it to you in your language, you sign in front of a witness, and you keep a copy." This is the best protection if a landlord later says they didn't understand.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | English and Luganda, both signed; explained aloud; witness; signed explanation note; copy to the landlord | Strongest protection for both sides. Needs a reviewed Luganda text, re-reviewed whenever terms change, and a staff visit per signing |
| `2` | English only, explained aloud, signed in front of a Mwavuli witness | Fastest and cheapest. The landlord signs what they can't read, and the explanation leaves no record. May not meet the Illiterates Protection Act (counsel to confirm) |
| `3` | Any language the landlord asks for, each a reviewed translation | Most welcoming. Every language needs paid review and upkeep, and sign-up slows as languages are added |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `1`

Resolution: selected `1` (recommended). Recorded as BM11.

### Defaults - Question `q11`

> **Assistant, before the card**
>
> Recorded **BM11** (Owner): documents in English and Luganda, both signed. A Mwavuli officer explains the key terms
> aloud in the landlord's language. The landlord signs or gives a thumbprint in front of a witness of their choosing.
> A short signed note records who explained it, and the landlord keeps a copy. Counsel still decides which version
> governs if the two differ. BM11 goes into the doc with the next answer.
>
> Next is one batch. These twelve defaults follow from what you've decided, and none carries a figure.

Defaults · Question `q11` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
Approve these twelve proposed defaults?

**Current Assumption**
They are standard mechanics that follow from BM1 to BM11. P3, P7, P8 and P10 touch money, so read those first. `[#]` marks a number that waits for the numbers round.

- **P1 Paying and statements.** Tenants pay only Mwavuli, by mobile money or bank, never cash to staff. The landlord gets one statement a month by SMS or WhatsApp in the chosen language, with paper on request.
- **P2 "Occupied".** A tenant living in the unit under our tenancy form, with the rent and deposit written down. The first-month cover starts on the first 1st after that.
- **P3 Existing tenants.** Each moves onto our form after a visit. Rent owed before sign-up is not covered; we collect it for the same 15%.
- **P4 Inspection.** We walk the building with the landlord first and take photos. Unsafe items are fixed first or within an agreed time. We may decline a building that stays unsafe.
- **P5 Landlord duties.** Tell tenants to pay only us, and pass on any rent paid to you the same day. No side deals on rent or tenants. No lock-outs, and no cutting water or power. Let us in with notice. Your taxes and rates stay yours. Tell us the truth about ownership, debts and disputes.
- **P6 Saying YES.** A reply by SMS or WhatsApp, or a recorded call confirmed by text. Urgent safety repairs up to a set amount `[#]` go ahead first, and we tell you the same day.
- **P7 Fees.** Only the 15% on rent and the coordination fee on repair quotes. No sign-up, letting or yearly fee, and none charged to tenants. Late fees written in the tenancy form go to Mwavuli.
- **P8 On exit.** A final statement and payment within a set time `[#]`, less any covered month not yet repaid. Tenant files go to the landlord. A deposit we hold goes to the landlord after any rent the tenant still owes is taken from it, and tenants are told. For tenants we placed, the 15% continues for a set time `[#]` if the landlord keeps them, but not if the landlord left because we paid late.
- **P9 Right to decline.** We may decline a building or unit we cannot fund, or that fails the ownership check or the inspection. Once we accept it, the promise applies.
- **P10 VAT on commercial rent.** VAT a tenant pays on rent is not part of the rent for the 15%. We pass it to the landlord in the same payment and show it on the statement. Filing it is the landlord's job.
- **P11 Privacy.** Landlord and tenant details are used only to manage the building and are not sold or shared otherwise.
- **P12 Disagreements.** We talk first, then a mediator we both accept, and only then the courts of Uganda.

**Recommended: `r` or `1`**
Approve all twelve. Each follows from what you've decided, none carries a figure, and you can change any by number.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Approve P1 to P12 as written | Fastest. All twelve go into the doc as Owner-approved, and `[#]` figures go to the numbers round |
| `2` | Approve with changes: reply `2` and name them, for example "2: P1 allow cash, P8 no tail" | Only the named defaults change; the rest are approved |
| `3` | Go one at a time | Twelve cards, each with options. Slow, but nothing is approved unread |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `#1.` and, in the same message, a new value proposition and a request:

> add the following value proposition, work with me to refine it using this same grill-me session, please record the
> whole grill-me session transcript in the repo
>
> * mwavuli can extend the landlord (opt-in), up to 3 - 6 months worth of future net rent collections at 1.5% per
>   month on reducing balance, the rent advance is not covered by the 1 month rent guarantee cap and has to be repaid
>   regardless. the rent payments are the guarantee and must be repaid in full once the mwavuli is no longer the
>   landlord's agent

Resolution: selected `1` (recommended): P1 to P12 approved as written. Recorded as BM12. The rent advance was
recorded as BM13, as the owner stated it, and is being refined from `q12`.

### Rent advance - Question `q12`

> **Assistant, before the card**
>
> Recorded **BM12** (Owner): all twelve defaults, P1 to P12, approved as written. `[#]` figures wait for the numbers
> round. BM11 and BM12 are in the doc.
>
> Recorded **BM13** (Owner, as stated): the rent advance. It is opt-in, up to 3 to 6 months of future net rent, 1.5% a
> month on the reducing balance. It is not covered by the 1-month cap and is repaid whatever the tenants do. The rent
> payments are the security, and the whole balance is due once Mwavuli stops being the landlord's agent. It is in the
> doc as you wrote it, with the open items listed.
>
> The transcript of this whole session is in
> [.scratch/grill-me/1794346863-mwavuli-business-model.md](.scratch/grill-me/1794346863-mwavuli-business-model.md),
> and I'll append each question as we go.
>
> Two things to know before refining. The advance is lending in substance, so it likely needs a money-lender license
> (counsel to confirm). A seventh service also changes the six on the business card (brand D15), which I've logged
> for the brand follow-up.

Rent advance · Question `q12` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
When does the rent advance go live, and who lends the money?

**Current Assumption**
As you described it, the advance is lending in substance: money paid up front, 1.5% a month charged, and repayment due whatever the tenants do. Lending money at interest as a business likely needs a money-lender license in Uganda (the Tier 4 Microfinance Institutions and Money Lenders Act, 2016, regulated by the Uganda Microfinance Regulatory Authority; counsel to confirm). The advance also sits beside BM8: there is no lock-in, yet the balance is due when Mwavuli stops being the agent.

**Recommended: `r` or `1`**
Gate it. Write the advance into the model and the agreements now as a separate, opt-in product, and offer it only after counsel confirms the license and the structure. Mwavuli lends its own funds under its own license once it has one. The launch pitch leaves it out until then. Your terms stay as you wrote them, no unlicensed loan is put in front of landlords, and the management agreement launches without waiting.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Gated: written in now; offered once counsel confirms the license and structure; left out of the launch pitch until then; Mwavuli lends its own funds | Safest path, and the main offer launches now. The pitch can't mention the advance until it is live |
| `2` | With the launch: in the pitch and agreements from day one, license obtained first | Strongest pitch from day one. Launch waits for the license, or the pitch promises something Mwavuli can't yet do |
| `3` | Through a licensed partner: a licensed lender or SACCO provides the money; Mwavuli arranges and collects through the rent flow and earns a fee | Mwavuli needs no lending license or loan capital. It needs a partner, the interest goes to the partner, and the 1.5% may change |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** `2`

Resolution: selected `2` (not the recommended `1`). Recorded as BM14: the advance launches with the main offer, with
the license obtained first. Mwavuli lends its own funds (assumed).

### Advance repayment - Question `q13`

> **Assistant, before the card**
>
> Recorded **BM14** (Owner): the rent advance launches with the main offer, in the pitch and the agreements from day
> one, and Mwavuli lends its own funds. The license comes first, so I'll write a hard rule into the model: nothing
> about the advance is advertised, offered or signed until counsel confirms the license position. That ties the launch
> date to the license. If you'd rather launch the main offer first and add the advance when licensed, tell me and I'll
> switch to option 1.
>
> Queue for the advance: repayment (now) · who can opt in and the limit · what happens on exit · what the landlord is
> told and signs · how much money Mwavuli sets aside for advances. Then the numbers round and the pitch example.

Advance repayment · Question `q13` · Timeout: `3 min` (not enforced here; I wait for your reply)

**Question**
How is the advance repaid?

**Current Assumption**
The rent payments are the security, so repayment comes out of the landlord's monthly payout, and 1.5% a month is charged on what is still owed (about 19.6% a year). I read "not covered by the 1-month cap" this way: while an advance is outstanding, Mwavuli does not cover a missed month on the rent that repays it. A tenant's miss slows repayment, the debt stays, and the 1.5% keeps running. Example: 10 rooms at UGX 400,000 give a net payout of UGX 3,400,000 a month, and a 3-month advance is UGX 10,200,000.

**Recommended: `r` or `1`**
Keep the payouts. Mwavuli keeps each monthly payout until the balance is repaid. The plain rule: "You get 3 months of your rent now. We keep your next payments until it's paid back, plus 1.5% a month on what you still owe." It matches how you described it, it is the cheapest for the landlord, and it is the easiest to explain and the safest for Mwavuli. The landlord has no payout from the building until it is repaid.

| Reply | Choice | Consequence |
|---|---|---|
| `1` | Keep the payouts until repaid | Example: 4 payouts kept (the 4th mostly returned), interest UGX 316,836, total repaid UGX 10,516,836. Simplest and cheapest. No payout for about 3 months |
| `2` | A fixed monthly amount over 6, 9 or 12 months, taken from each payout | 6 months: UGX 1,790,357 a month, interest UGX 542,143. 12 months: UGX 935,136 a month, interest UGX 1,021,631. The landlord keeps the rest of each payout, but must pick and understand a term |
| `3` | Keep half of each payout until repaid | The landlord keeps UGX 1,700,000 a month. 7 payouts, interest UGX 571,329. Slower repayment ties up Mwavuli's money longer |

**Other actions:** `w` apply · `i` ignore · `s` stop

**Reply** (pending)

## Final Decisions (so far)

- BM1 Guarantee cap: 1 month of unpaid rent per unit. Per unit and per default; it resets when the arrears are
  cleared. (The owner chose 1 month; the recommendation was 3.)
- BM2 Works: Mwavuli arranges vetted contractors as the landlord's agent. The landlord pays the contractor's price
  plus a disclosed coordination fee and approves jobs above a limit. Utilities and garbage pass through at cost.
- BM3 Audience: Ugandan landlords with little formal education and little patience for legal language. Plain
  statements with UGX examples, a read-aloud test, few round numbers, short landlord documents with the legal terms in
  a schedule, counsel notes kept separate.
- BM4 Payout and fee: one net payment on the 1st, rent minus 15%, approved costs taken off the same payment, one
  statement. The 15% is charged on rent only. "No rent, no fee."
- BM5 Arrears: after the covered month Mwavuli runs the whole process as the landlord's agent. Its own time is inside
  the 15%; lawyer, court and bailiff are at cost (deposit first, then the landlord) with the landlord's YES. The
  covered month becomes Mwavuli's to collect, and money from a tenant who owes goes to the oldest month first.
- BM6 Deposits: split by tenant. New tenants' deposits go to Mwavuli in a separate account; existing tenants'
  deposits stay with the landlord, with the amount written down.
- BM7 Proof of ownership: tiered. Title, or sale agreement or letters of administration plus an LC1 letter and a
  signed statement; national ID always; title search where a title exists.
- BM8 Leaving: no lock-in; 30 days' written notice either way. The landlord may leave at once, with no fee, if
  Mwavuli has not paid by the 3rd. Mwavuli may leave at once for direct rent collection, interference or refusing an
  urgent safety repair.
- BM9 Scope: residential and commercial units in one area (Kampala and its surroundings assumed).
- BM10 One set of terms for every unit, with no rent limit.
- BM11 Languages and signing: English and Luganda, both signed; explained aloud; a witness of the landlord's choosing;
  a signed explanation note; the landlord keeps a copy.
- BM12 Defaults P1 to P12 approved as written.
- BM13 Rent advance: stated by the owner (opt-in; up to 3 to 6 months of future net rent; 1.5% a month on the reducing
  balance; not covered by the 1-month cap; the rent payments are the security; due in full when Mwavuli stops being
  the agent). Under refinement from `q13`.
- BM14 Rent advance go-live: with the main offer, in the pitch and the agreements from day one, license obtained first;
  Mwavuli lends its own funds (assumed). The launch date depends on the license.

## Remaining Risks Or Assumptions

- The launch area is assumed to be Kampala and its surroundings; the owner did not name one.
- No timer ran: no answer was applied by timeout.
- BM10 has no rent limit, so one large commercial default is a large loss for Mwavuli. The right to decline a unit it
  cannot fund (P9) and the size of the float (numbers round) are the controls.
- Figures still to set: the works coordination fee, the approval limit, the emergency repair amount, the rule for a
  job larger than one payout, the final payment time and the tail on placed tenants (P8), and the float Mwavuli can
  fund to pay on the 1st. The 3rd as the latest payout day was assumed and accepted with BM8.
- The rent advance is lending in substance and likely needs a money-lender license (counsel to confirm). Nothing is
  offered or advertised until that is settled (`q12`). BM14 puts the advance in the launch pitch, so the launch date
  depends on the license; if it is late, the owner chooses between waiting and launching without the advance.
- Counsel and accountant items are listed in the notes of [business/model.md](../../business/model.md).
- Brand follow-ups after SNT-24 lands: F1 (the proof line "Rent paid to you on the 1st, every month" drops the
  occupied-units condition and the 1-month cover), F3, F8 (a Luganda default for landlord documents) and D15 and I7
  (a seventh service, the rent advance).

## Work log

- SNT-25 filed as a Task and moved to In Progress; branch `SNT-25-business-model-refinement` cut from `origin/main`
  in its own worktree.
- `d2686c8` docs(SNT-25): business model draft with the guarantee, payout, works and audience terms (BM1 to BM4)
- `09f8899` docs(SNT-25): arrears, deposits and proof-of-ownership terms (BM5 to BM7)
- `a95688e` docs(SNT-25): leaving and scope terms (BM8 to BM10)
- This commit: languages, defaults and rent advance terms, with this transcript (BM11 to BM13)
