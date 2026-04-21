# KI gegen Redaktion: Fünf Mock Drafts für den NFL Draft 2026 – und ein Scoring, das am Samstag die Wahrheit sagt

*Part 1 – Die Boards. Part 2 folgt nach dem Draft mit dem Scoring.*

Am Donnerstagabend fällt in Pittsburgh der erste Pick des NFL Draft 2026. 32 Franchises entscheiden für die nächste Dekade, welche Rookies ihren Kader prägen sollen, und das Internet produziert parallel ungefähr drei Mock Drafts pro Sekunde. Wir haben das Problem auf eine einfache Frage reduziert:

**Können vier große Sprachmodelle einen NFL Draft genauso gut prognostizieren wie ein Redaktions-Bauchgefühl mit zu viel Kaffee?**

Vier KI-Modelle sind angetreten: **Gemini 2.5** (Google), **ChatGPT GPT-5** (OpenAI), **Perplexity Pro Search** mit **Grok 4.1** als Backend (xAI im Wrapper), und **Claude Opus 4.7** (Anthropic). Als fünfter Teilnehmer: das **Footballschland-Team** – kein Prompt, kein Web-Search, keine Quellen-Liste. Nur erwachsene Fans mit zu vielen College-Spielen im Kopf und einem gemeinsamen Bauchgefühl.

Jeder Teilnehmer hat die komplette Runde 1 geliefert, 32 Picks, Spieler, Position, College, Team. Am Samstagabend wird abgeglichen – nach dem Scoring-Schema von FantasyPros, das es seit Jahren für die eigenen Mock Draft Challenges verwendet. Das Ergebnis gibt's in Part 2 am Sonntag, inklusive Sieger-Krönung und der Antwort auf die Frage, ob der Mensch noch eine Chance hat.

Das hier ist Part 1: die Boards, die Eigenheiten jedes Teilnehmers, die Halluzinationen, die auf dem Weg entstanden sind. Und schon ein ganz gutes Bauchgefühl dafür, wer am Samstag vorne liegen dürfte.

---

## Die Scoring-Regeln – angelehnt an FantasyPros

Jeder Pick kann bis zu **10 Punkte** holen. Maximal theoretisch möglich pro Board: **320 Punkte** (10 × 32 Picks). FantasyPros verwendet dieses Schema seit Jahren in den eigenen Mock Draft Challenges – wir übernehmen es, weil es etabliert ist und die Art Metrik, bei der sich niemand streiten muss.

**Regel 1 – Slot Accuracy** (max. 4 Punkte)

- 4 Punkte, wenn der Spieler exakt auf dem vorhergesagten Pick gedraftet wird
- 3 Punkte bei ±1 Pick
- 2 Punkte bei ±2 Picks
- 1 Punkt bei ±5 Picks

**Regel 2 – Positional Rank** (max. 3 Punkte, nur bei Drafts in R1/R2)

Positional ranks werden nicht separat gepromptet, sondern mechanisch aus der Pick-Reihenfolge abgeleitet: Der erste QB auf einem Board ist QB1, der zweite QB2, usw. Dasselbe Verfahren bei den tatsächlichen Draft-Ergebnissen.

- 3 Punkte bei exakt richtigem positional rank
- 2 Punkte bei ±1
- 1 Punkt bei ±2

**Regel 3 – Team + Position in Runde 1** (2 Punkte)

Wenn das Team, das laut Vorhersage einen Spieler mit Position X wählt, tatsächlich in Runde 1 einen Spieler dieser Position wählt – auch wenn Pick-Nummer und konkreter Spieler abweichen. Belohnt Positional Intuition und Team-Fit-Gespür.

**Regel 4 – Team + Spieler** (1 Punkt)

Wenn der vorhergesagte Spieler tatsächlich vom vorhergesagten Team gedraftet wird – auch an einer anderen Pick-Position. Konsolationspunkt für „richtiger Name, falscher Slot".

Alle vier Regeln stacken. Ein perfekter Pick (richtiger Slot, richtiger positional rank, richtiges Team + Position, richtiger Spieler) liefert 4 + 3 + 2 + 1 = **10 Punkte**.

---

## Die Methodik – oder: wie fair ist der Vergleich?

Ehrlich bleiben: **Die Prompts pro Modell waren leicht angepasst.** Gemini bekam eine stark strukturierte, multi-phasige Version mit strikten Format-Vorgaben. Perplexity, Claude und ChatGPT bekamen kürzere Varianten mit den gleichen inhaltlichen Anforderungen. Alle bekamen dieselbe Aufgabe: komplette Runde 1, 32 Picks, Deutsch, mit Begründung und Quellen. Alle fünf Boards wurden am **20. April 2026** erstellt, drei Tage vor Draft-Start.

**Web-Search-Status der Teilnehmer:**

- Gemini: Search Grounding aktiv
- Perplexity: Pro Search, Backend Grok 4.1
- ChatGPT: Web-Browsing aktiviert
- Claude: Web Search + Web Fetch aktiv
- Footballschland: zwei Augen, ein Kopf, ein Kaffee

Das heißt: Jedes KI-Modell hatte Echtzeit-Zugriff auf aktuelle Mock Drafts der großen Analysten (Jeremiah, Kiper, Brugler, PFF, Miller). Die Aufgabe war nicht, aus dem Nichts zu prognostizieren, sondern die vorhandene Draft-Intelligence zu verdichten. Footballschland war der einzige Teilnehmer ohne diesen Echtzeit-Zugang – kein Handicap, eine andere Methode.

---

## Block 1 – Gemini 2.5 (Google): Der Pflicht-Erfüller mit Faktenschwäche

Google hat den Prompt bekommen, Google hat ihn abgearbeitet. Gemini liefert mit rigoroser Präzision, was verlangt war: 32 Picks, jeder im Tabellenformat, jeder mit Begründung, Upside/Risiko und Konsens-Ranking. Phase-4-Analyse mit Positional Trends, Risers, Trade-Szenarien. Marlin Klein an Pick 28 zu den Eagles mit eigenem Deutschland-Absatz. Struktur: eine Eins mit Sternchen.

<details>
<summary>Unser Prompt an Gemini 2.5 (anzeigen)</summary>

```
# ROLLE & KONTEXT
Du bist Senior NFL Draft Analyst mit 15+ Jahren Erfahrung im Scouting,
Cap Management und College Football Evaluation. Du schreibst für
Footballschland, eine deutschsprachige Football-Medienplattform mit
fachlich versiertem Publikum.

# HAUPTAUFGABE
Erstelle einen vollständigen Mock Draft für die erste Runde des NFL
Draft 2026 — alle 32 Picks, basierend auf aktueller, verifizierter
Recherche.

# ARBEITSABLAUF
Phase 1: Recherche mit Google Search Grounding (Draft Order,
Big Boards, Team Needs, Prospect-Intel)
Phase 2: 32 Picks im rigorosen Markdown-Tabellenformat
Phase 3: Deutsche Prospects 🇩🇪
Phase 4: Round 1 Analyse (Trends, Risers, Trades, Value vs. Need)
Phase 5: Meta (Datum, Stand, Disclaimer)

# HARTE REGELN
1. Zero Halluzinationen — bei Unsicherheit kennzeichnen
2. Quellen-Transparenz bei strittigen Claims
3. Scheme-Fit vor Best Player Available
4. Trade-Picks klar markieren
5. Bei widersprüchlichen Quellen: beide nennen, mehrheitlich gestützte wählen
```
</details>

**Das Board:**

| Pick | Team | Spieler | Pos | College |
|------|------|---------|-----|---------|
| 1 | Raiders | Fernando Mendoza | QB | Indiana |
| 2 | Jets | Arvell Reese | EDGE | Ohio State |
| 3 | Cardinals | Francis Mauigoa | OT | Miami |
| 4 | Titans | David Bailey | EDGE | Texas Tech |
| 5 | Giants | Jeremiyah Love | RB | Notre Dame |
| 6 | Browns | Kadyn Proctor | OT | Alabama |
| 7 | Panthers | Rueben Bain Jr. | EDGE | Miami |
| 8 | Bears | Peter Woods | DT | Clemson |
| 9 | Saints | Caleb Downs | S | Ohio State |
| 10 | Patriots | Ty Simpson | QB | Alabama |
| 11 | Broncos | Malachi Lawrence | EDGE | UCF |
| 12 | Commanders | Carnell Tate | WR | Ohio State |
| 13 | Rams | Jordyn Tyson | WR | Arizona State |
| 14 | Colts | Zachariah Branch | WR | Georgia |
| 15 | Jaguars | Kenyon Sadiq | TE | Oregon |
| 16 | Buccaneers | Max Iheanachor | OT | Arizona State |
| 17 | Dolphins | Makai Lemon | WR | USC |
| 18 | Vikings | Garrett Nussmeier | QB | LSU |
| 19 | Steelers | Dillon Thieneman | S | Oregon |
| 20 | Seahawks | Sonny Styles | LB | Ohio State |
| 21 | Cowboys | Keldric Faulk | EDGE/DT | Auburn |
| 22 | Chargers | Caleb Banks | DT | Florida |
| 23 | Packers | Mansoor Delane | CB | LSU |
| 24 | Falcons | R Mason Thomas | EDGE | Oklahoma |
| 25 | Bengals | Christen Miller | DT | Georgia |
| 26 | Texans | Brandon Cisse | CB | South Carolina |
| 27 | Bills | Germie Bernard | WR | Alabama |
| 28 | Eagles | Marlin Klein 🇩🇪 | TE | Michigan |
| 29 | 49ers | Caleb Lomu | OT | Utah |
| 30 | Lions | Blake Miller | OT | Clemson |
| 31 | Ravens | Jadarian Price | RB | Notre Dame |
| 32 | Chiefs | Zion Young | EDGE | Missouri |

**Fazit:** Inhaltlich strukturiert, stilistisch okay (der „die Geister von Dave Gettleman wehen durchs MetLife Stadium"-Seitenhieb beim Giants-Pick sitzt), aber Gemini hat beim Search-Grounding an mehreren Stellen Roster-Fiction verkauft. „Tyler Linderbaum bei den Raiders in der FA geholt" – Linderbaum ist bekanntermaßen Ravens-Center. Das Spannende: Claude hat in seinem Mock exakt denselben Linderbaum-Wechsel behauptet. Entweder haben wir die Free Agency verschlafen, oder beide Modelle ziehen aus derselben fehlerhaften Quelle. „Michael Pittman Jr. getradet" (Colts), „Tyreek Hill gecuttet und Jaylen Waddle getradet" (Dolphins), „Taylor Decker hat Detroit verlassen" – alles als Begründungen für Picks eingeflochten, einiges davon auch von ChatGPT und Claude gespiegelt. Wer die Saison eng verfolgt hat, weiß, was stimmt. Wer nicht, kauft es ohne Widerspruch.

Zweites Problem: Das Draft-Datum. Gemini sagt „30. April – 2. Mai 2026". Das ist falsch – der Draft beginnt am 23. April. Drittens: Die penibel genauen „Konsens-Ranking"-Zeilen pro Pick („CB1 bei Jeremiah, #14 Brugler, #11 PFF") wirken souverän, aber bei Stichproben sollte man sich nicht drauf verlassen.

**Das größte Problem aber: die Draft-Order selbst.** Ab Pick 7 bricht Gemini aus der Realität aus. Die offizielle 2026er-Order enthält fünf Teams ohne R1-Pick (Atlanta, Green Bay, Indianapolis, Denver, Jacksonville haben ihre Firsts alle getradet) – Gemini ignoriert das komplett und setzt sie trotzdem ins Board (Broncos #11, Colts #14, Jaguars #15, Packers #23, Falcons #24, Bengals #25). Dazu verschiebt sich die gesamte zweite Runden-Hälfte. Commanders, die real an #7 picken, landen bei Gemini auf #12. Panthers (real #19) auf #7. Ravens (real #14) auf #31. Insgesamt 24 von 32 Team-Zuordnungen ungekennzeichnet falsch – Gemini hat offenbar eine reverse-record-Order rekonstruiert und die Trades aus dem Radar verloren. Im FantasyPros-Scoring ist das in der zweiten Runden-Hälfte fast ein Totalausfall auf Regel 3 und Regel 4.

---

## Block 2 – Perplexity Pro Search, Backend Grok 4.1 (xAI): Der Schaumschläger

Perplexity wollte zunächst nicht verraten, welches Modell unter der Haube rechnet. Auf Nachfrage kam raus: **Grok 4.1 von xAI.** Der Output erklärt, warum das relevant ist – das Board hat Eigenarten, die mit GPT-5 oder Claude nicht passieren würden.

<details>
<summary>Unser Prompt an Perplexity (anzeigen)</summary>

```
Erstelle einen vollständigen Mock Draft für Runde 1 des NFL Draft 2026
(alle 32 Picks) basierend auf aktuellster verfügbarer Recherche.

Bevor du startest, schreibe bitte, welche KI du nutzt und warte auf
das GO.

## Recherche-Quellen
Priorisiere: NFL.com (Jeremiah, Zierlein), The Athletic (Brugler),
ESPN (Kiper, Miller, Yates), PFF Draft Board, OverTheCap/Spotrac,
Tankathon. Mindestens 4 Big Boards für Konsens. Jede Quelle mit
Datum zitieren.

## Was recherchiert werden muss
1. Aktuelle Draft Order 2026 inkl. Trades
2. Konsens Big Boards
3. Team Needs aller 32 Franchises
4. Scheme Fit
5. Prospect-Intel
6. Deutsche Prospects 🇩🇪 falls R1 projiziert

## Output-Format pro Pick
Pick #X — Team (Record) · Spieler | Pos | College | Jahrgang
Measurables · Begründung (2-3 Sätze) · Upside/Risiko (1 Satz) ·
Konsens-Ranking

## Harte Regeln
Keine Halluzinationen. Quellen-Transparenz. Unsicherheiten mit
[Projected] markieren. Scheme-Fit > BPA. Getradete Picks
kennzeichnen.
```
</details>

**Das Board:**

| Pick | Team | Spieler | Pos | College |
|------|------|---------|-----|---------|
| 1 | Raiders | Fernando Mendoza | QB | Indiana |
| 2 | Jets | Caleb Downs | S | Ohio State |
| 3 | Cardinals | Arvell Reese | LB | Ohio State |
| 4 | Titans | David Bailey | EDGE | Texas Tech |
| 5 | Giants | Mansoor Delane | CB | LSU |
| 6 | Browns | Jeremiyah Love | RB | Notre Dame |
| 7 | Commanders | Jermod McCoy | CB | Tennessee |
| 8 | Saints | Carnell Tate | WR | Ohio State |
| 9 | Chiefs | Makai Lemon | WR | USC |
| 10 | Giants via CIN | Francis Mauigoa | OT | Miami |
| 11 | Dolphins | Rueben Bain Jr. | EDGE | Miami |
| 12 | Cowboys | Sonny Styles | LB | Ohio State |
| 13 | Rams via ATL | Caleb Tiernan | OT | Northwestern |
| 14 | Ravens | Dani Dennis-Sutton | EDGE | Penn State |
| 15 | Colts | Treydan Stukes | CB | Arizona |
| 16 | Falcons* | Ted Hurst | WR | Georgia State |
| 17 | Steelers | Zachariah Branch | WR | Georgia |
| 18 | Seahawks | Genesis Smith | S | Arizona |
| 19 | Texans | Joshua Josephs | EDGE | Tennessee |
| 20 | Bengals | Elijah Sarratt | WR | Indiana |
| 21 | Chargers | Kamari Ramsey | S | USC |
| 22 | Buccaneers | Domonique Orange | NT | Iowa State |
| 23 | Packers | Devin Moore | CB | Florida |
| 24 | Vikings | Garrett Nussmeier | QB | LSU |
| 25 | Bills | Jonah Coleman | RB | Washington |
| 26 | Eagles | Emmett Johnson | RB | Nebraska |
| 27 | Lions | LT Overton | DL | Alabama |
| 28 | Ravens** | Jalen Farmer | iOL | Kentucky |
| 29 | Chiefs** | Davison Igbinosun | CB | Ohio State |
| 30 | Dolphins** | Jake Slaughter | iOL | Florida |
| 31 | Patriots | Carson Beck | QB | Miami |
| 32 | Seahawks** | Justin Joly | TE | NC State |

*vermutlich gebrochene Team-Zuordnung; **Team hat in diesem Board bereits einen früheren Pick

**Fazit:** An der Oberfläche beeindruckend. Jede Behauptung bekommt einen Source-Tag (Metro Philadelphia, FantasyPros, SI, ESPN), jedes Pick-Feld wird ausgefüllt. Darunter liegt ein Board, das sich selbst widerspricht.

**Vier Picks gehen an Teams, die im gleichen Board bereits gewählt haben** – Ravens an #14 *und* #28, Chiefs an #9 *und* #29, Dolphins an #11 *und* #30, Seahawks an #18 *und* #32. Kein NFL-Team hat in Runde 1 zwei Picks ohne einen dokumentierten Trade, und Perplexity führt keinen dieser Trades aus. Das ist keine Runde 1, das ist Buchhaltungs-Chaos.

Fairerweise muss man Perplexity eines gutschreiben: Der Pick 10 „Giants via CIN/Dexter Lawrence Trade" ist inhaltlich korrekt. Lawrence wurde tatsächlich nach Cincinnati getradet, die Giants bekamen dafür den #10-Pick als Gegenleistung. Das hat auch ChatGPT richtig eingeordnet – beide Modelle haben hier sauber gearbeitet, während Gemini und Claude den Trade nicht abbilden.

**Ted Hurst, WR, Georgia State** auf Pick 16 ist kein erfundener Spieler – er existiert als Prospect, wird aber in den großen Big Boards als Day-2-Talent gehandelt. In Runde 1 ist das ein klarer Reach.

Stilistisch auch eine Eigenart: Perplexity schreibt die Sarkasmus-Regieanweisung selbst mit rein. Beim Browns-Pick steht *„Sarkastisch: Kevin's RB-Liebe"*, beim Eagles-Pick *„Sarkastisch: Sirian's Fetisch"* (inklusive Tippfehler bei Sirianni). Das Modell beschreibt den gewünschten Ton, statt ihn zu liefern. Meta-Humor, der seinen eigenen Witz erklärt – der Todesstoß jeder Pointe.

**Draft-Order-Check:** Picks 1 bis 14 inklusive Lawrence-Trade sauber. Ab Pick 15 verrutscht das Board, Teams ohne R1-Pick tauchen auf (Colts #15, Falcons #16, Bengals #20, Packers #23), die real pickenden Franchises verschieben sich nach hinten – Lions von real #17 fliegen bei Perplexity ganz raus, Vikings von #18 auf #24, Panthers von #19 verschwinden. Am Ende sind zufällig Picks 29–32 wieder ziemlich richtig: Chiefs (= Chiefs via LAR), Dolphins (= Dolphins via DEN), Patriots und Seahawks stimmen, wenn auch ohne erklärte Trade-Origins. In Summe 14 ungekennzeichnete Team-Falschzuordnungen – nicht so brutal wie bei Gemini, aber genug, um im Scoring die Regeln 3 und 4 reihenweise kosten zu können.

---

## Block 3 – ChatGPT GPT-5 (OpenAI): Der Stilist mit Schema-Allergie

ChatGPT liefert den lesbarsten Mock Draft der Runde – und das ist gleichzeitig sein Prompt-Problem. Statt das geforderte Format mit getrennten Feldern für Measurables, Upside, Risiko und Konsens-Ranking auszufüllen, schreibt OpenAI einfach durch: fließende Prosa mit trockenem Humor, eingebauten Seitenhieben, Begründungen, die tatsächlich wie Begründungen klingen. Für den Leser ein Gewinn, für einen methodischen Vergleich eine Abweichung.

<details>
<summary>Unser Prompt an ChatGPT GPT-5 (anzeigen)</summary>

```
# Rolle
Erfahrener NFL Draft Analyst für ein deutschsprachiges, fachlich
versiertes Football-Publikum.

# Aufgabe
Aktueller Mock Draft für die erste Runde des NFL Draft 2026.

# Arbeitsschritte
1. Web-Recherche (Draft Order, mind. 3 Big Boards aus Jeremiah,
   Brugler, PFF, Kiper/McShay, Miller, Team Needs, Prospect-Updates)
2. 32 Picks im Format: Team, Spieler (Name, Pos, College, Jahrgang),
   Measurables, Begründung (2-3 Sätze), Upside/Risiko, Konsens-Ranking
3. Deutsche Prospects 🇩🇪 falls R1 projiziert
4. Zusammenfassung + Disclaimer + Draft-Datum

# Stil
Deutsch, Football-Terminologie englisch, trockener Humor,
sarkastisch bei Reaches. Keine Hype-Sprache.

# Wichtig
Keine Erfindungen. Quellen am Ende jedes Picks.
```
</details>

**Das Board:**

| Pick | Team | Spieler | Pos | College |
|------|------|---------|-----|---------|
| 1 | Raiders | Fernando Mendoza | QB | Indiana |
| 2 | Jets | Arvell Reese | EDGE | Ohio State |
| 3 | Cardinals | Francis Mauigoa | OT | Miami |
| 4 | Titans | Jeremiyah Love | RB | Notre Dame |
| 5 | Giants | Sonny Styles | LB | Ohio State |
| 6 | Browns | Carnell Tate | WR | Ohio State |
| 7 | Commanders | David Bailey | EDGE | Texas Tech |
| 8 | Saints | Jordyn Tyson | WR | Arizona State |
| 9 | Chiefs | Rueben Bain Jr. | EDGE | Miami |
| 10 | Giants via CIN | Caleb Downs | S | Ohio State |
| 11 | Dolphins | Mansoor Delane | CB | LSU |
| 12 | Cowboys | Keldric Faulk | EDGE | Auburn |
| 13 | Rams | Omar Cooper Jr. | WR | Indiana |
| 14 | Ravens | Spencer Fano | OL | Utah |
| 15 | Buccaneers | Jermod McCoy | CB | Tennessee |
| 16 | Jets | Makai Lemon | WR | USC |
| 17 | Lions | Monroe Freeling | OT | Georgia |
| 18 | Vikings | Dillon Thieneman | S | Oregon |
| 19 | Panthers | Kadyn Proctor | OT | Alabama |
| 20 | Cowboys | Colton Hood | CB | Tennessee |
| 21 | Steelers | Olaivavega Ioane | G | Penn State |
| 22 | Chargers | Chase Bisontis | G | Texas A&M |
| 23 | Eagles | Kenyon Sadiq | TE | Oregon |
| 24 | Browns | Max Iheanachor | OT | Arizona State |
| 25 | Bears | Peter Woods | DT | Clemson |
| 26 | Bills | Chris Johnson | CB | San Diego State |
| 27 | 49ers | Caleb Lomu | OT | Utah |
| 28 | Texans | Blake Miller | OT | Clemson |
| 29 | Chiefs | Kayden McDonald | DT | Ohio State |
| 30 | Dolphins | KC Concepcion | WR | Texas A&M |
| 31 | Patriots | Malachi Lawrence | EDGE | UCF |
| 32 | Seahawks | Jadarian Price | RB | Notre Dame |

**Fazit:** Bester Text der fünf Teilnehmer. Trockener Sarkasmus, der ohne Regieanweisung sitzt (*„ein glorifiziertes Planspiel mit Schulterpads"*, *„Ohio State in diesem Mock mal wieder praktisch eine eigene Expansion Franchise"*, *„Front Office mit schlechtem Impulskontrollmanagement"*, *„Menschen lieben Chaos, GMs leider auch"*). Die Team-Doppelungen sind konsistent konstruiert – sechs Teams mit zwei Picks (Giants, Jets, Browns, Cowboys, Chiefs, Dolphins), sechs Teams komplett aus Runde 1 raus. Anders als bei Perplexity wirkt das wie bewusste Trade-Projektion, nicht wie Buchhaltungs-Unfall. Draft-Datum korrekt: 23.–25. April 2026.

Dafür: **Das Format-Schema des Prompts wurde komplett ignoriert.** Keine Measurables-Zeilen, keine strukturierten Upside/Risiko-Blöcke, kein Jahrgang pro Pick – alles zu fließendem Text zusammengeschoben. Quellen-Angabe auf ein trockenes `(NFL.com)` an jedem Pick reduziert, obwohl mindestens drei Quellen verlangt waren. Jeremiah, Miller, Kiper tauchen im Fließtext auf, aber nicht als saubere Zitation.

Inhaltliche Stichproben: „Tyler Linderbaum" und „Taylor Decker" als abgegangen – beides auch von Gemini und Claude behauptet. **Chris Johnson, CB, San Diego State** an Pick 26 ist der Reach-Kandidat des Boards: SDSU hat keine First-Round-CB-Tradition, und in Runde 1 ist der Name ein Statement.

**Draft-Order-Check: Volltreffer.** Alle 32 Team-Zuordnungen decken sich mit der offiziellen 2026er-Order. Den Dexter-Lawrence-Trade an #10 (Giants via CIN) hat ChatGPT explizit gekennzeichnet, bei den übrigen Trades (Picks 13, 16, 20, 24, 29, 30) verweist das Modell pauschal auf *„bestehende Pick-Trades sind eingerechnet"* und liefert einfach die korrekten Teams ohne jede „via"-Anmerkung. Methodisch nicht maximal transparent – aber inhaltlich von allen fünf Boards die sauberste Draft-Order-Arbeit. Dafür im Scoring vermutlich der stärkste Regel-3-Kandidat: wer das Team richtig hat, hat die halbe Miete.

---

## Block 4 – Claude Opus 4.7 (Anthropic): Der Methodische

Claude ist der einzige Teilnehmer, der sowohl das Format vollständig liefert *als auch* lesbar schreibt. Alle fünf geforderten Pick-Felder sauber ausgefüllt, dazu Transparenz über Analysten-Divergenzen, Alternativ-Szenarien und ehrliche Hinweise, wo Logik gegen Konsens entschieden wurde. Wo Kiper und Jeremiah unterschiedliche Ideen hatten (Steelers #21, Rams #29), nennt Claude beide und begründet seine Wahl.

<details>
<summary>Unser Prompt an Claude Opus 4.7 (anzeigen)</summary>

```
<rolle>
Erfahrener NFL Draft Analyst mit Spezialisierung auf Scouting,
Team Building, Cap Management und College Football. Schreibst für
ein deutschsprachiges, fachlich versiertes Football-Publikum
(Footballschland-Niveau).
</rolle>

<aufgabe>
Kompletter Mock Draft für Runde 1 NFL Draft 2026 — alle 32 Picks.
</aufgabe>

<arbeitsschritte>
1. Recherche (Draft Order, mind. 4 Big Boards aus Jeremiah,
   Brugler, PFF, Kiper/McShay, Miller, Zierlein, Team Needs,
   Prospect-Intel)
2. 32 Picks im Format: Team, Spieler | Pos | College | Jahrgang,
   Measurables, Begründung, Upside/Risiko, Konsens-Ranking
3. Deutsche Prospects 🇩🇪 bei R1-Projektion
4. Round 1 Themes & Analyse (Trends, Überraschungen, Trades,
   Value vs. Need)
5. Disclaimer & Meta
</arbeitsschritte>

<stil>
Deutsch, Football-Terminologie englisch, trockener Humor,
sarkastisch bei Reaches. Substanziell, aber ohne Füllwörter.
</stil>

<wichtige_regeln>
Keine Erfindungen. Quellen-Transparenz. Scheme-Fit > BPA.
Getradete Picks kennzeichnen.
</wichtige_regeln>
```
</details>

**Das Board:**

| Pick | Team | Spieler | Pos | College |
|------|------|---------|-----|---------|
| 1 | Raiders | Fernando Mendoza | QB | Indiana |
| 2 | Jets | David Bailey | EDGE | Texas Tech |
| 3 | Cardinals | Arvell Reese | LB/EDGE | Ohio State |
| 4 | Titans | Jeremiyah Love | RB | Notre Dame |
| 5 | Giants | Caleb Downs | S | Ohio State |
| 6 | Browns | Sonny Styles | LB | Ohio State |
| 7 | Commanders | Carnell Tate | WR | Ohio State |
| 8 | Saints | Rueben Bain Jr. | DE | Miami |
| 9 | Chiefs | Jordyn Tyson | WR | Arizona State |
| 10 | Bengals | Mansoor Delane | CB | LSU |
| 11 | Dolphins | Francis Mauigoa | OT | Miami |
| 12 | Cowboys | Kadyn Proctor | OT | Alabama |
| 13 | Rams via ATL | Makai Lemon | WR | USC |
| 14 | Ravens | Spencer Fano | OL | Utah |
| 15 | Buccaneers | Kenyon Sadiq | TE | Oregon |
| 16 | Jets via IND | Omar Cooper Jr. | WR | Indiana |
| 17 | Lions | Monroe Freeling | OT | Georgia |
| 18 | Vikings | Dillon Thieneman | S | Oregon |
| 19 | Panthers | Emmanuel McNeil-Warren | S | Toledo |
| 20 | Cowboys via GB | Denzel Boston | WR | Washington |
| 21 | Steelers | Olaivavega Ioane | G | Penn State |
| 22 | Chargers | Peter Woods | DT | Clemson |
| 23 | Eagles | Blake Miller | OT | Clemson |
| 24 | Browns via JAX | Jermod McCoy | CB | Tennessee |
| 25 | Bears | Zion Young | DE | Missouri |
| 26 | Bills | Keldric Faulk | DE | Auburn |
| 27 | 49ers | Max Iheanachor | OT | Arizona State |
| 28 | Texans | Christen Miller | DT | Georgia |
| 29 | Rams | Malachi Lawrence | EDGE | UCF |
| 30 | Broncos | Caleb Banks | DT | Florida |
| 31 | Patriots | Akheem Mesidor | DE | Miami |
| 32 | Seahawks | Jadarian Price | RB | Notre Dame |

**Fazit:** Claude handhabt die deutschen Prospects am besten von allen vier KIs: kein erzwungener Pick in Runde 1, dafür ein sauber begründeter Absatz darüber, dass Marlin Klein (TE, Michigan) realistisch Day 2 projiziert wird, mit genannten Pre-Draft-Visits bei Falcons, Steelers und Lions. Zusatz-Bonus: der Hinweis auf die RTL-NITRO-Übertragung für deutsches Publikum. Das ist die Sorte Kontext, die den Block gegenüber den anderen KIs absetzt.

Stichprobe: „Tyler Linderbaum zu den Raiders" taucht auch bei Gemini auf – zwei Modelle mit derselben Behauptung, die wir bisher nicht bestätigen konnten. Dafür sitzen die Coaching-Zuordnungen: Mike LaFleur als Cardinals-HC, Jeff Hafley als Dolphins-HC, Klint Kubiak als Raiders-HC – alle drei korrekt. Das ist die Art Detail-Präzision, die im Vergleich auffällt, weil andere Modelle genau daran hängen.

Auch das Draft-Datum stimmt (23.–25. April). Und bei strittigen Picks macht Claude die Alternativen transparent sichtbar (Steelers-Pick mit Kiper-vs-Jeremiah-Disagreement, Rams-Pick mit Edge-vs-OT-Alternative). Das ist die Art Methodik-Ehrlichkeit, die ChatGPT nie liefert und Gemini hinter der Phasen-Struktur versteckt.

**Draft-Order-Check: 29 von 32 Team-Zuordnungen korrekt, drei ungekennzeichnete Trade-Misses.** An Pick 10 setzt Claude die Bengals ins Board – real halten die Giants den Pick via Lawrence-Trade. An Pick 29 schreibt Claude *„Rams sind die Trade-Up-Könige der NFL, aber hier bleiben sie sitzen und kassieren Value"* – die Rams haben ihren Pick aber an Kansas City abgegeben (real: Chiefs via LAR). An Pick 30 erzählt Claude sogar eine vollständige Trade-Story, bloß in der falschen Richtung: *„Denver holt sich seinen eigenen Pick zurück – Jaylen Waddle wurde mit der #30 an Miami verscherbelt. Die Broncos bekamen Pick #30 …"* – in Wirklichkeit ist es andersrum, Broncos haben den Pick abgegeben und Miami hält ihn (real: Dolphins via DEN). Drei Regel-3-Verluste auf dem Papier, aber mit dem besten Erklär-Aufwand aller vier KIs. Die Trades, die Claude abbildet (ATL, IND, GB, JAX), markiert es sauber mit „via" – nur drei hat es übersehen.

---

## Block 5 – Footballschland-Redaktion: Bauchgefühl gegen die Maschinen

Kein Prompt. Kein Search-Grounding. Kein Big-Board-Spickzettel in Echtzeit. Sondern ein Raum voll Leuten, die seit Jahren Tape schauen, Podcasts machen, bei Pro Days zweimal hingucken und sich beim Bier darüber streiten, ob der dritte Tackle der Klasse wirklich ein First-Rounder sein sollte. Die Redaktions-Methode: Positionen durchspielen, Team Needs abgleichen, Reaches zulassen wo's Sinn ergibt, Bauchgefühl für die späten Picks. Kein Konsens-Zwang – dafür ein Board, das weiß, dass Cashius Howell existiert und dass Avieon Terrell mehr ist als der kleine Bruder von A.J.

**Das Board:**

| Pick | Team | Spieler | Pos | College |
|------|------|---------|-----|---------|
| 1 | Raiders | Fernando Mendoza | QB | Indiana |
| 2 | Jets | David Bailey | EDGE | Texas Tech |
| 3 | Saints via Cardinals | Ty Simpson | QB | Alabama |
| 4 | Titans | Arvell Reese | EDGE/LB | Ohio State |
| 5 | Giants | Sonny Styles | LB | Ohio State |
| 6 | Browns | Carnell Tate | WR | Ohio State |
| 7 | Commanders | Caleb Downs | S | Ohio State |
| 8 | Cardinals via Saints | Rueben Bain Jr. | EDGE | Miami |
| 9 | Chiefs | Mansoor Delane | CB | LSU |
| 10 | Giants | Francis Mauigoa | OT | Miami |
| 11 | Dolphins | Makai Lemon | WR | USC |
| 12 | Cowboys | Jermod McCoy | CB | Tennessee |
| 13 | Rams via Falcons | Jordyn Tyson | WR | Arizona State |
| 14 | Ravens | Spencer Fano | OL | Utah |
| 15 | Buccaneers | Kenyon Sadiq | TE | Oregon |
| 16 | Jets via Colts | Omar Cooper Jr. | WR | Indiana |
| 17 | Lions | Monroe Freeling | OT | Georgia |
| 18 | Vikings | Jeremiyah Love | RB | Notre Dame |
| 19 | Panthers | Dillon Thieneman | S | Oregon |
| 20 | Cowboys via Packers | Keldric Faulk | EDGE | Auburn |
| 21 | Steelers | Olaivavega Ioane | G | Penn State |
| 22 | Chargers | Peter Woods | DT | Clemson |
| 23 | Eagles | Blake Miller | OT | Clemson |
| 24 | Browns via Jaguars | Kadyn Proctor | OT | Alabama |
| 25 | Bears | Zion Young | EDGE | Missouri |
| 26 | Bills | Kayden McDonald | DT | Ohio State |
| 27 | 49ers | Caleb Lomu | OT | Utah |
| 28 | Texans | Caleb Banks | DT | Florida |
| 29 | Chiefs | Akheem Mesidor | EDGE | Miami |
| 30 | Dolphins | Cashius Howell | EDGE | Texas A&M |
| 31 | Patriots | R Mason Thomas | EDGE | Oklahoma |
| 32 | Seahawks | Avieon Terrell | CB | Clemson |

**Was wir anders sehen als die KIs:**

**Erstens: Ty Simpson an #3 via Trade zu den Saints.** Während Gemini Simpson an #10 zu den Patriots schickt, Perplexity an #24 zu den Vikings, ChatGPT ihn aus Runde 1 komplett raushält und Claude ihn explizit in Runde 2 fallen lässt, sehen wir einen aggressiven Saints-Move nach oben für den QB2 der Klasse. Das ist der spezifisch-redaktionelle Take, der das Board von den Maschinen absetzt. Entweder wird's der Mutigkeits-Bonus des Wochenendes, oder der teuerste Reach.

**Zweitens: Jeremiyah Love fällt bei uns bis #18 zu den Vikings.** Alle vier KIs haben Love in den Top 6 (Gemini #5, Perplexity #6, ChatGPT #4, Claude #4). Wir trauen dem Positional-Value-Argument mehr als dem Talent-Top-5-Hype. Wenn Love tatsächlich früher geht, kostet uns das Punkte. Wenn er fällt – haben wir's gesagt.

**Drittens: Zwei Picks, die keine der KIs auf dem Zettel hatte.** Cashius Howell (EDGE, Texas A&M) an #30 zu den Dolphins und Avieon Terrell (CB, Clemson, der Bruder von A.J. Terrell) an #32 zu den Seahawks. Das ist das Nischen-Scouting-Wissen, das aus Jahren College-Football-Konsum kommt – und die Art Picks, bei der sich das Bauchgefühl am härtesten beweisen muss.

**Draft-Order-Check:** Bis auf die zwei bewusst prognostizierten Trade-Picks an #3 und #8 deckt sich das Board mit der offiziellen 2026er-Order. Lawrence-Trade (Pick 10 Giants), Falcons-Trade (Pick 13 Rams), Colts-Trade (Pick 16 Jets), Packers-Trade (Pick 20 Cowboys), Jaguars-Trade (Pick 24 Browns) – alles korrekt gesetzt und mit „via"-Vermerk gekennzeichnet. Die Picks 29 und 30 haben die richtigen Teams (Chiefs, Dolphins), ohne dass „via LAR / via DEN" explizit dransteht – hier denselben Transparenz-Abzug wie bei ChatGPT. Keine ungekennzeichneten Team-Falschzuweisungen. Die zwei prognostizierten Saints/Cardinals-Swap-Picks sind bewusste Redaktions-Wetten und im Text begründet, also ebenfalls sauber.

Am Samstagabend sehen wir, was das wert war.

---

## Die Gesamt-Vergleichstabelle

Zum schnellen Überblick: alle 32 Picks, alle fünf Boards nebeneinander. Am Sonntag kommt diese Tabelle mit der sechsten Spalte zurück – der tatsächlichen Draft-Realität. Und dann wird gerechnet.

| # | Gemini | Perplexity | ChatGPT | Claude | Footballschland |
|---|--------|------------|---------|--------|-----------------|
| 1 | Mendoza (QB) | Mendoza (QB) | Mendoza (QB) | Mendoza (QB) | Mendoza (QB) |
| 2 | Reese (EDGE) | Downs (S) | Reese (EDGE) | Bailey (EDGE) | Bailey (EDGE) |
| 3 | Mauigoa (OT) | Reese (LB) | Mauigoa (OT) | Reese (LB) | Simpson (QB) |
| 4 | Bailey (EDGE) | Bailey (EDGE) | Love (RB) | Love (RB) | Reese (EDGE) |
| 5 | Love (RB) | Delane (CB) | Styles (LB) | Downs (S) | Styles (LB) |
| 6 | Proctor (OT) | Love (RB) | Tate (WR) | Styles (LB) | Tate (WR) |
| 7 | Bain Jr. (EDGE) | McCoy (CB) | Bailey (EDGE) | Tate (WR) | Downs (S) |
| 8 | Woods (DT) | Tate (WR) | Tyson (WR) | Bain Jr. (DE) | Bain Jr. (EDGE) |
| 9 | Downs (S) | Lemon (WR) | Bain Jr. (EDGE) | Tyson (WR) | Delane (CB) |
| 10 | Simpson (QB) | Mauigoa (OT) | Downs (S) | Delane (CB) | Mauigoa (OT) |
| 11 | Lawrence (EDGE) | Bain Jr. (EDGE) | Delane (CB) | Mauigoa (OT) | Lemon (WR) |
| 12 | Tate (WR) | Styles (LB) | Faulk (EDGE) | Proctor (OT) | McCoy (CB) |
| 13 | Tyson (WR) | Tiernan (OT) | Cooper Jr. (WR) | Lemon (WR) | Tyson (WR) |
| 14 | Branch (WR) | Dennis-Sutton (EDGE) | Fano (OL) | Fano (OL) | Fano (OL) |
| 15 | Sadiq (TE) | Stukes (CB) | McCoy (CB) | Sadiq (TE) | Sadiq (TE) |
| 16 | Iheanachor (OT) | Hurst (WR) | Lemon (WR) | Cooper Jr. (WR) | Cooper Jr. (WR) |
| 17 | Lemon (WR) | Branch (WR) | Freeling (OT) | Freeling (OT) | Freeling (OT) |
| 18 | Nussmeier (QB) | Smith (S) | Thieneman (S) | Thieneman (S) | Love (RB) |
| 19 | Thieneman (S) | Josephs (EDGE) | Proctor (OT) | McNeil-Warren (S) | Thieneman (S) |
| 20 | Styles (LB) | Sarratt (WR) | Hood (CB) | Boston (WR) | Faulk (EDGE) |
| 21 | Faulk (EDGE) | Ramsey (S) | Ioane (G) | Ioane (G) | Ioane (G) |
| 22 | Banks (DT) | Orange (NT) | Bisontis (G) | Woods (DT) | Woods (DT) |
| 23 | Delane (CB) | Moore (CB) | Sadiq (TE) | Miller (OT) | Miller (OT) |
| 24 | Thomas (EDGE) | Nussmeier (QB) | Iheanachor (OT) | McCoy (CB) | Proctor (OT) |
| 25 | Miller (DT) | Coleman (RB) | Woods (DT) | Young (DE) | Young (EDGE) |
| 26 | Cisse (CB) | Johnson (RB) | Johnson (CB) | Faulk (DE) | McDonald (DT) |
| 27 | Bernard (WR) | Overton (DL) | Lomu (OT) | Iheanachor (OT) | Lomu (OT) |
| 28 | Klein 🇩🇪 (TE) | Farmer (iOL) | Miller (OT) | Miller (DT) | Banks (DT) |
| 29 | Lomu (OT) | Igbinosun (CB) | McDonald (DT) | Lawrence (EDGE) | Mesidor (EDGE) |
| 30 | Miller (OT) | Slaughter (iOL) | Concepcion (WR) | Banks (DT) | Howell (EDGE) |
| 31 | Price (RB) | Beck (QB) | Lawrence (EDGE) | Mesidor (DE) | Thomas (EDGE) |
| 32 | Young (EDGE) | Joly (TE) | Price (RB) | Price (RB) | Terrell (CB) |

---

## Was jetzt? Teil 2 am Sonntag

**Ab Donnerstagabend wird es ernst.** 20:00 Uhr Ortszeit in Pittsburgh, 02:00 Uhr Freitagmorgen deutscher Zeit, ruft der Commissioner den ersten Namen auf. Bis Samstagabend steht die komplette Runde 1 in der Realität. Dann nehmen wir FantasyPros-Scoring zur Hand, rechnen jedes Board durch, addieren die Punkte.

**Die Frage, die wir am Sonntag beantworten:** Hat sich der KI-Wettlauf zugunsten einer Maschine entschieden? Ist die Redaktion peinlich abgestürzt oder hat das Bauchgefühl die geballte Rechenkraft von Google, OpenAI, xAI und Anthropic geschlagen?

Unsere Hypothesen vor dem Pfiff, basierend auf dem Abgleich gegen die offizielle Draft-Order:

- **ChatGPT** startet mit dem Maximum-Vorsprung: Alle 32 Team-Zuordnungen korrekt. Wenn die Picks inhaltlich nicht grob daneben liegen, sammelt GPT-5 Regel-3-Punkte auf breiter Front.
- **Claude** liegt bei 29 von 32 korrekten Team-Zuweisungen – solide Basis, aber drei Trade-Misses (Picks 10, 29, 30) kosten bis zu 9 Punkte allein auf Regel 3 und 4.
- **Footballschland** ist bei den Team-Zuordnungen fast auf ChatGPT-Niveau – die zwei bewusst prognostizierten Trade-Picks (Simpson zu Saints an #3, Cardinals runter auf #8) können aufgehen oder richtig teuer werden.
- **Gemini** hat ab Pick 7 komplett aus der Post-Trade-Order heraus geschrieben. Teams ohne R1-Pick stehen im Board, die halbe Runde ist gegen die Realität verschoben. Inhaltlich oft plausible Picks, strukturell kaputt.
- **Perplexity/Grok** verliert Punkte durch das gebrochene Board-Setup (vier Picks an bereits pickende Teams) und eine ab #15 komplett verrutschte Team-Reihenfolge. Picks 1–14 und 29–32 könnten trotzdem punkten.

Am Sonntag sind wir schlauer. Bis dahin: der Draft selbst.

---

## Disclaimer & Methodik-Transparenz

- **Stichtag der KI-Prompts:** 20. April 2026. Alle fünf Boards wurden innerhalb von 24 Stunden erstellt.
- **Prompts pro Modell:** leicht angepasst (Format, Länge), inhaltliche Aufgabe identisch. Die kompletten Prompts sind in den Ausklappern der jeweiligen Blöcke dokumentiert.
- **Web-Search:** Alle vier KI-Teilnehmer hatten Echtzeit-Research-Zugang. Footballschland nicht.
- **Scoring:** FantasyPros-Schema (10 Punkte pro Pick, 320 Punkte theoretisches Maximum pro Board), nach dem Draft am Samstag berechnet.
- **Halluzinations-Hinweise im Text:** Wir haben Stichproben gemacht, aber nicht jede einzelne Behauptung (Trades, Roster-Abgänge, Coaching-Bezüge) einzeln verifiziert. Wo mehrere Modelle dieselbe Behauptung aufstellen, ist sie entweder real oder eine geteilte Fehlquelle – das ist Teil der Erzählung.
- **Deutsche Prospects:** Gemini hat Marlin Klein (TE, Michigan) als einziger KI-Teilnehmer in Runde 1 gesetzt. Claude hat Klein korrekt als Day-2-Projection eingeordnet. Perplexity, ChatGPT und Footballschland haben keinen deutschen Spieler in R1 – was dem aktuellen Projection-Stand der großen Analysten entspricht.

Part 2 folgt am **Sonntag, 26. April 2026**, nach Abschluss des Drafts. Dann wissen wir's.
