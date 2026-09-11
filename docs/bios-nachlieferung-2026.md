# Bios-Nachlieferung Deutsche Talente D1 2026

> Übergabe-Report zu §5.7 des Briefings vom 10.09.2026. Stand: 2026-09-11 (nachts).
>
> **Was drinsteht:** Klassifikation aller 58 Spieler nach Bio-Status, ein fertiger Bio-Entwurf für den einen Spieler, für den es echtes Rohmaterial gab (Hero Kanu), und eine strukturierte Aufstellung der 35 Spieler ohne fertige Bio — mit klarer Notiz, wo Recherche oder Rückfrage bei den Spielern nötig ist.
>
> **Was nicht drinsteht:** Halluzinierte Karrierepfade für Spieler, für die es kein Material gibt. Wenn eine Bio unten fehlt, ist das eine ehrliche Lücke, keine To-Do für einen späteren Feintuning-Pass.

---

## Ausgangslage — kurz

- Aus dem 2026er Draft (Sanity-Draft `drafts.3c646d11-8708-437c-8c1d-13c5e53984f7`) sind aktuell **11 von 29 FBS-playerCards** mit einem `bio`-Feld befüllt. Kein FCS-Bio im Draft, weil die FCS-Sektion noch als Platzhalter-Blockquote drinsteht (§5.2 offen).
- Aus den 145 podcastTranscript-Dokumenten in Sanity (nicht 3, wie im Briefing §6 stand — die Sanity-Ecke ist gewachsen) matcht genau **einer** der 35 Spieler ohne fertige Bio auf einen im Podcast erzählten Karrierepfad: **Hero Kanu, S03E23.** Alle anderen Podcastgäste unter den 58 haben entweder schon eine Bio in `bios.json` oder eine vorbereitete Bio im DD-Strategiedokument (Bucket B).
- Damit ist das echte 5.7-Delta kleiner als das Briefing suggeriert: **1 Bio auf Basis Transkript neu geschrieben** (Kanu), **34 Spieler bleiben ohne belastbares Material** und brauchen Recherche oder Rückfrage.

**Klassifikation der 58 Spieler:**

| Bucket | Bedeutung | Anzahl |
|---|---|---|
| A | Bio bereits im 2026er Sanity-Draft | 11 |
| B | FCS-Bio bereits geschrieben, liegt in DDs Strategiedoc (§5.3) | 11 (siehe Anmerkung unten) |
| C | Ohne Bio, aber Podcast-Transkript in Sanity vorhanden | 1 (Hero Kanu) |
| D | Ohne Bio, kein Podcast-Auftritt | 35 |

> **Anmerkung Bucket B:** Das Briefing (§5.3) nannte 12 Namen mit vorbereiteten FCS-Bios. Mein Cross-Reference gegen die 58-Spieler-Liste findet nur 11 davon — Gideon Herbert taucht in `d1_final.json` als „Chidalu Gideon Izuchukwu Herbert" auf und fiel deshalb rechnerisch in Bucket D (die 12. Person aus dem Strategiedoc). Materiell also 12 vorbereitete Bios wie im Briefing, die Bucket-D-Zahl unten enthält Herbert trotzdem als offenen Punkt — bitte im Studio die Zuordnung des Strategiedoc-Textes zum korrekten Roster-Namen doppelt prüfen.

---

## Neue Bio — bereit für den Draft

### Hero Kanu (DL, University of Texas Longhorns)

**Quelle:** Transkript S03E23 (`transcript-s03e23`), Sanity — Interview aus Dezember 2024 kurz vor dem Citrus Bowl 2025.

**Bio (kann direkt ins `bio`-Feld der playerCard mit `_key: 03525540323b`):**

> Vom Torhüter beim TSV Geltendorf zum Longhorn. Kanu ist über seinen Nachbarn Philipp Okonkwo (heute Munich Ravens) zum Football gekommen — Königsbrunn Ants, dann Fürstenfeldbruck Razorbacks, bayerische Meisterschaft, Team Captain der Bayern-Auswahl mit gerade 15. Über Brennan Collier und PPI Recruits ging es 2020 an die Santa Margarita Catholic in Kalifornien; nach zwei Quartern im ersten Highschool-Spiel meldete sich Washington, ein Spiel später Alabama, Ohio State und Texas. 27 Offers, committet zu Ohio State (Positionscoach Larry Johnson), 2024 im National-Championship-Game in Atlanta, jetzt Longhorn im letzten College-Jahr vor dem Draft 2027. In Folge S03E23 erzählt er den ganzen Weg.

**Warum das drinsteht** (zur Absicherung, falls du beim Redigieren einen Faktencheck willst):
- Torhüter beim TSV Geltendorf, 8 Jahre Fußball → im Transkript direkt bestätigt.
- Kontakt zu Philipp Okonkwo (heute Munich Ravens), Football-Beginn → direkt bestätigt.
- Königsbrunn Ants → Fürstenfeldbruck Razorbacks → direkt bestätigt.
- Bayerische Meisterschaft, Team Captain der bayerischen Auswahl mit 15 → direkt bestätigt.
- Brennan Collier & PPI Recruits als Vermittler → direkt bestätigt.
- Santa Margarita Catholic (Orange County, Trinity League) ab 2020 → direkt bestätigt (nach langer Diskussion mit Mutter gegen NFL Academy London).
- 27+ Offers, erstes Angebot Penn State am 19.3.2020, dann Washington nach 2 Quartern gegen Mayfield → direkt bestätigt.
- Ohio State commitment mit Positionscoach Larry Johnson → direkt bestätigt.
- Ohio State im National-Championship-Game 2024 in Atlanta → direkt bestätigt.
- Transfer zu Texas → direkt bestätigt („wir spielen gegen Michigan im Citrus Bowl", „letztes Jahr Ohio State", jetziges Programm Texas).
- Draft-Eligibility 2027 → aus `d1_final.json` (`drafte: 2027`, `status26: Senior`).

Wenn du beim Freigeben etwas anders formulieren willst — der Ton ist bewusst dicht wie bei den 11 bestehenden Bios (2–4 Sätze, ohne Superlative), Länge ~470 Zeichen wie Anton oder Zunk.

**Sanity-Patch (falls du magst, dass ich ihn morgens direkt setze — nicht ohne dein OK):**

```groq
patch drafts.3c646d11-8708-437c-8c1d-13c5e53984f7
  set body[_key=="03525540323b"].bio = "…Text oben…"
```

---

## Bucket A — Bios bereits im 2026er Draft (nichts zu tun)

Vollständigkeitshalber, damit die Übersicht komplett ist:

1. Cedric Anton (Sacramento State, TE)
2. Manuel Beigel (Michigan, DL)
3. Duncan Brune (Ohio, RB)
4. Tim Hamann (Virginia, K)
5. Justin Hasenhuetl (Cal, OL)
6. Alexander Honig (Northwestern, TE)
7. Terry Nwabuisi-Ezeala (Marshall, DL)
8. Noel Portnjagin (James Madison, OL)
9. Daniil Starykh (Boise State, OL)
10. Wilson Zierer (Auburn, OL)
11. Linus Zunk (Washington State, DL)

---

## Bucket B — Bios geschrieben, aber noch nicht eingesetzt (5.3)

Diese Texte liegen laut Briefing bei DD im Strategiedokument `d1-2026-strategie-und-entwurf.md` (Teil 3). Ich habe sie in dieser Session nicht gesehen. Sobald FCS-playerCards mit 5.2 in den Draft gepatcht sind, wandern die Bios in das jeweilige `bio`-Feld.

- Josef Aganbi (Texas Southern, DE) — Podcast: S04E01
- Felix Doege (Appalachian State, OL) — Podcast: S01E03, S03E07
- Maximilian Dollhopf (Santa Barbara City College → ?, OL) — Podcast: S02E25
- Malte Feil (Mercyhurst, WR) — Podcast: S02E05
- Gideon Herbert (East Tennessee State, DL) — Podcast: S01E01 *(im Roster als „Chidalu Gideon Izuchukwu Herbert" geführt — Namens-Mismatch zwischen d1_final.json und Strategiedoc bitte im Studio prüfen)*
- Mattis Karrasch (Northern Arizona, DE/OT) — Podcast: S02E04
- Maximilian Lantzsch (New Mexico Lobos / heute?) — Podcast: fünf Auftritte, die die ganze College-Karriere abbilden — S01E23 (ECU, TE/DE), S01E45 (New Mexico Lobos, mit Mutter Anja), S02E18 (Update, DE), S03E08 (Overtime), S04E09 (Football-Moms mit Anja & Daniela Herpich). *In der Bio bitte alle Folgen ausbuchstabiert & verlinkt (wie bei Portnjagin oder Schmoranzer). Nur im Fließtext des Blogposts drumherum bitte nicht die ganze Kette aufzählen — dort reicht der allgemeine Hinweis auf mehrfache Auftritte.*
- Konstantin Paschos (Choate → ?, DE) — Podcast: S02E16
- Franz Pohlmann (UC Davis, TE) — Podcast: S03E22
- Ilias Rida (Southeastern Louisiana, OL) — Podcast: S01E36
- Christian Schliemann (Campbell, OL) — Podcast: S01E52, S03E02
- Moritz Schmoranzer (Appalachian State, OL) — Podcast: S01E11, S01E15, S01E64, S03E06

---

## Bucket D — Kein Podcast-Material, Recherche/Rückfrage nötig

Für diese 35 Spieler gibt es kein Transkript in Sanity und keinen Podcast-Auftritt in `d1_final.json.pod`. Ich habe die Basisdaten aus der Airtable-Ableitung (`d1_final.json`) daneben gestellt, damit du direkt entscheiden kannst, ob Recherche über College-Rosters/Twitter/Instagram lohnt oder ob du die Spieler direkt für eine Podcast-Buchung anschreibst.

### FBS — 17 Spieler

| Name | College | Pos. | Ort | Status 26 | Team 25 | Recherche-Notiz |
|---|---|---|---|---|---|---|
| Bruno Dall | UCF | DL | Hamburg | Redshirt Junior | Zips (Akron) | Transferstory Akron → UCF; Hamburger Ursprung — Sea Devils? |
| Daniel Evert | Temple | TE | — | Junior | Owls (Temple) | 3. Jahr im Programm; kein Airtable-Ort. Rückfrage direkt sinnvoll. |
| Hannes Hammer | UConn | OL | Köln | Redshirt Sophomore | Hokies (Virginia Tech) | Transfer Virginia Tech → UConn; Kölner. |
| Jayden-Jamal Hanne | Georgia | DL | — | Sophomore | Bulldogs | 2. Jahr in Athens, SEC-Kader — beste Kandidat für baldigen Podcast-Auftritt. |
| David Höffken | Nebraska | DL | Kiel | Sophomore | Cornhuskers | Kieler, 2. Jahr — Story „aus der Küste in die Big Ten" naheliegend. |
| Markus Meincke | Toledo | P | Hamburg | Junior | Bears (Baylor? Sam Houston Bearkats?) | Team25 „Bears" mehrdeutig — bitte in Airtable auflösen. Punter aus Hamburg. |
| Justin Okoronkwo | South Carolina | LB | — | Junior | Gamecocks (bereits SC) | 3. Jahr in SC. Namensähnlichkeit zu Philipp Okonkwo (aus Kanu-Bio) — potenziell interessante Story. |
| Daniel Ottens | TCU | DL | Nürnberg | Freshman | — | Rookie in Fort Worth; im Briefing §5.6 bestätigt (Jahrgang 2026, war zwischenzeitlich fälschlich als 2027 geführt). |
| Yilanan Issa Ouattara | Vanderbilt | DL | Köln | Graduate Student | Commodores (bereits VU) | Grad Student, Kölner — Erfahrungswerte-Story naheliegend. |
| Clemens Richter | UConn | TE | — | Junior | Huskies (bereits UConn) | 3. Jahr im Programm. |
| Fabian Rogosch | Troy | TE | Hamburg | Senior | Trojans (bereits Troy) | Senior-Jahr, Hamburger — letzte Chance für Podcast vor Draft. |
| Keon Rohé | Florida Atlantic | OL | — | Junior | Owls (bereits FAU) | Namensvariante „Rohe" → „Rohé" laut Briefing §3.3 korrigiert. |
| Max Stege | Boise State | DL | Köln | Junior | Broncos (bereits Boise State) | Kölner, zweiter Deutscher bei Boise State neben Starykh (S03E01). Gemeinsamer Podcast möglich? |
| Moritz Strempel | UMass | LB | — | Freshman | — | Rookie, zweiter Deutscher bei UMass neben von Saldern. |
| Magnus von Saldern | UMass | DL | Berlin | Graduate Student | Minutemen (bereits UMass) | Grad Student aus Berlin. Namensvariante „Von Saldern" → „von Saldern" laut §3.3. |
| Bruno Werner | Boston College | OL | Chemnitz | Freshman | — | Rookie aus Chemnitz — der einzige Sachse in der Liste, potenziell besondere Story. |
| Nico Wiedmann | Marshall | WR | — | Redshirt Freshman | Thundering Herd (bereits Marshall) | Zweiter Deutscher bei Marshall neben Nwabuisi-Ezeala. |

### FCS — 17 Spieler *(einschließlich Herbert-Namensfall, siehe oben)*

| Name | College | Pos. | Ort | Status 26 | Team 25 | Recherche-Notiz |
|---|---|---|---|---|---|---|
| Isaac Abraham | Wagner | OL | — | Freshman | — | Rookie; einer von zwei Deutschen bei Wagner. |
| Daniel Aganbi | Murray State | DL | Landshut | Freshman | Cavaliers (Virginia?) | Rookie; Namensvariante zu Josef Aganbi — Bruder? Bitte in Airtable prüfen. |
| Kevin Bentin | Long Island | DL | Hamburg | Redshirt Freshman | Sharks (LIU) | RS-Freshman, Hamburger. |
| Chidalu Gideon Izuchukwu Herbert | East Tennessee State | DL | — | Redshirt Sophomore | Red Wolves (Arkansas State) | **Wahrscheinlich identisch mit „Gideon Herbert" aus Bucket B/Strategiedoc — Namens-Konvention klären.** |
| Jakob Herbst | San Diego | LS | — | Freshman | — | Rookie, Long Snapper — im 58er-Feld eine Rarität. |
| Amir Hodžić | Bethune-Cookman | OL | Berlin | Redshirt Senior | Wildcats (Bethune-Cookman? Kentucky Wildcats?) | RS-Senior aus Berlin — letzte Chance. |
| Matti Kruger | Bucknell | DL | Berlin | Sophomore | Bison | Namensvariante „Kruger" → „Krüger" laut §3.3. |
| Marius Landsfeld | Tarleton State | DL | Brühl | Senior | Bears (Baylor? Missouri State?) | Senior aus Brühl. |
| Liam Lyck | Gardner-Webb | DL | — | Redshirt Junior | FIGHTING FALCONS (Air Force? MVSU?) | Team25 in Airtable-Grossbuchstaben — Datenqualität in Airtable ansehen. |
| Vito Moriana Sigel | Western Carolina | OL | — | Senior | Catamounts (bereits WCU) | Senior-Jahr. |
| Leon Müller | Eastern Illinois | DL | München | Senior | THOROBREDS (Kentucky State?) | Senior aus München; Team25 ebenfalls in Grossbuchstaben. |
| Jules Ney | UT Chattanooga | OL | Wiesbaden | Junior | Mocs (bereits Chattanooga) | 3. Jahr im Programm. |
| Jaco Pegha | Norfolk State | DL | Essen | Freshman | — | Rookie aus Essen. |
| Aik Peitz | Merrimack | OL | — | Freshman | — | Rookie. |
| Jan Pyc | Tennessee Tech | OL | Berlin | Freshman | — | Rookie aus Berlin. |
| Joel Queisser | Mississippi Valley State | LB | — | Freshman | — | Rookie. |
| Silas Tiedermann | Bryant | DL | Butzbach | Sophomore | Bulldogs | 2. Jahr. |
| Farradj Titikpina | Maine | DL | Bochum | Redshirt Junior | Black Bears (Maine) | RS-Junior aus Bochum. |

---

## Priorisierung für 5.7-Recherche

Wenn du beim Bearbeiten von Bucket D nur begrenzte Kapazität hast, sind das die Kandidaten, bei denen sich der Aufwand am ehesten lohnt:

1. **Interne Redundanz nutzen** — bei diesen Kombinationen sitzt eine plausible Erzählung schon im Roster:
   - **Max Stege** neben Daniil Starykh bei Boise State → Cross-Podcast oder Update-Folge zu S03E01 mit beiden.
   - **Nico Wiedmann** neben Terry Nwabuisi-Ezeala bei Marshall.
   - **Moritz Strempel + Magnus von Saldern** bei UMass, beide ohne Bio — gemeinsame Story?
   - **Daniel Aganbi** (Murray State) neben Josef Aganbi (Texas Southern, Bucket B) — mögliche Familien-Verbindung.
2. **Senioren im letzten College-Jahr** — kein Podcast-Auftritt bislang, Zeitfenster für Story schließt sich:
   Yilanan Ouattara, Fabian Rogosch, Magnus von Saldern, Amir Hodžić, Vito Moriana Sigel, Leon Müller, Marius Landsfeld.
3. **SEC-Kader mit hohem Podcast-Zugkraft-Faktor**: Jayden-Jamal Hanne (Georgia), Justin Okoronkwo (South Carolina).

Alle anderen sind sinnvoll erst nach dem Draft-Post-Release anzugehen — die Recherche-Kosten sind hoch (Rückfragen bei Spielern/Programmen), der Bio-Zugewinn im Vergleich zum Blockquote-Platzhalter im aktuellen Draft ist marginal.

---

## Was ich empfehle als nächsten Schritt

- **Deine Freigabe zur Hero-Kanu-Bio.** Wenn OK, patche ich sie morgens direkt in die playerCard `03525540323b` im Draft und dokumentiere den Patch hier. Wenn du redigieren willst — Text hier oben, du übernimmst.
- **Bucket-B-Bios einsetzen** ist §5.3 und braucht den Text aus dem Strategiedoc. Sobald du mir den zugänglich machst (paste rein, oder Datei hochladen, oder in einen Sanity-Draft rein), kann ich sie beim nächsten Turn direkt in die FCS-Karten patchen — sobald die playerCards da sind (§5.2). Reihenfolge idealerweise: erst FCS-Karten anlegen (§5.2 mit Canva-Bildern), dann Bios rein, dann Publizieren.
- **Die 34 Bucket-D-Zeilen** bleiben offen im obigen Sinn. Sie stehen im 2026er Post trotzdem — via `playerTable` (die 58-Zeilen-Tabelle) — nur die _prominenten_ playerCards mit ausführlicher Bio fehlen. Für einen Live-Post ist das inhaltlich völlig ok und im Briefing-Ton („Bei sieben Spielern endet die belegbare Spur") sogar erwünscht.

Guten Morgen ☕
