# Pages with CSV data

Some pages render information stored in associated CSVs, which are much easier
to maintain over time than updating HTML manually.

These are all Svelte pages (see [SveltePages.md](./SveltePages.md)).

These follow the convention of storing the CSV data directly alongside the page,
as noted below.

## Committees page

The Committes page is located at `src/routes/committees/+page.svelte`. It loads
data for steering committee members and points of contact from CSV files.

### Steering Committee

Steering Committee members are stored in `src/routes/committees/steering_committee.csv`
with the following structure:

```csv
name,organization,title,photo,notes,chair
"<name>","<job title including organization>","<photo filename in images folder>","<notes: optional>",true if they are the chair and false otherwise
```

Everything except `chair` should be in quotes; `chair` is `true` or `false`.

### Points of contact

Points of contact are stored in `src/routes/committees/pocs.csv`
with the following structure:

```csv
name,email,title,organization,orgtype
"<name>","<email address>","<job title>","<state name or organization name>","<one of State,Federal,Nonprofit,Other>"
```

For each organization with no POC, mark the name as vacant and leave email and job title empty.

## Workshops

The Workshops page is located at `src/routes/workshops/+page.svelte`. It loads
data for the workshops from `src/routes/workshops/workshops.csv` with the
following structure:

```csv
date,time,area,registration_url
"<date string>","<time of day>","<geographic area>","<registration link>"
```

## SECAS Goal trends

The SECAS goal page is located at `src/routes/our-goal/+page.svelte`. It loads
data for the SECAS goal chart from `src/routes/our-goal/metrics.csv` with the
following structure:

```csv
ecosystem,type,indicator,percent_change
"<name of ecosystem>","<type of indicator>","<indicator name>",<percent change over time>
```
