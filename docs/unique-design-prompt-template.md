# Prompt template pentru personalizarea aplicației

Acesta este varianta cu placeholder-uri. O folosești atunci când vrei să lași studentul să aleagă singur direcția vizuală, dar fără a pierde constrângerile de proiect.

```text
Lucreaza direct in aplicatia React existenta din acest workspace. Scopul este sa ii dai o identitate vizuala proprie, memorabila si placuta, astfel incat rezultatul sa fie clar diferit de aplicatiile colegilor, fara sa pierzi rolul ei de laborator pentru invatarea React.

Inainte sa modifici codul:
1. Inspecteaza structura existenta, componentele, demo-urile si CSS-ul deja folosit.
2. Pastreaza toate demo-urile, pasii, titlurile, navigarea si comportamentele interactive. Nu sterge si nu rescrie conceptele React pentru a obtine un rezultat vizual.
3. Alege o singura directie vizuala coerenta pe baza preferintelor mele de mai jos. Nu folosi un layout generic de dashboard si nu copia stilul Vite.

Preferintele mele pentru aceasta varianta:
- Tema / atmosfera: [exemplu: laborator editorial, atelier digital, arhiva botanica, studio de muzica, harta de calatorie etc.]
- Paleta: [exemplu: fundal crem, text cerneala, accent coral, accent verde menta, accent galben unt. Scrie 3-5 culori si ce rol are fiecare]
- Tipografie: [exemplu: serif elegant pentru titluri + sans-serif clar pentru text si controale]
- Element distinctiv: [exemplu: index lateral cu etichete, timeline, grila de notite, marcaje de caiet, etc.]
- Nivelul de expresivitate: [calm / editorial / jucaus / experimental / tehnic]
- Detaliile vizuale suplimentare: [exemplu: linii subtile, colțuri rotunjite, umbre discreta, multi-column layout, accent pe materiale de hartie etc.]

Constrangeri de implementare:
- Pastreaza React si TypeScript si foloseste componentele si fisierele existente atunci cand este potrivit.
- Nu adauga dependinte noi fara un motiv tehnic clar si fara sa explici motivul.
- Centralizeaza culorile, spatierea, tipografia si umbrele in variabile CSS coerente.
- Pastreaza codul accesibil: contrast bun, focus vizibil, elemente semantice, aria-label unde este necesar si navigare functionala cu tastatura.
- Asigura un layout bun pe mobil si desktop. Meniul demo-urilor trebuie sa ramana usor de parcurs, iar continutul demo-urilor sa nu fie ascuns sau inghesuit.
- Foloseste animatii discrete si cu scop, doar pentru aparitia continutului sau feedback-ul interactiunilor. Respecta prefers-reduced-motion.
- Nu transforma fiecare sectiune intr-un card decorativ si nu adauga text de marketing. Interfata trebuie sa ramana un instrument de invatare.
- Pastreaza comentariile existente si conventiile proiectului. Nu schimba API-urile componentelor fara necesitate.

Lucreaza incremental:
1. Propune inainte de editare o directie vizuala in 5-8 randuri si enumera fisierele pe care le vei modifica.
2. Dupa aprobare, implementeaza cea mai mica schimbare coerenta care produce identitatea vizuala aleasa.
3. Verifica `npm run build` si `npm run lint`.
4. Daca un check esueaza, repara doar cauza relevanta pentru aceasta personalizare si ruleaza din nou verificarea.
5. La final, rezuma ce face varianta unica, ce alegeri vizuale o diferentiaza de alte implementari si ce verificari au trecut.

Nu inventa un produs nou si nu inlocui laboratorul React cu o pagina de prezentare. Rezultatul trebuie sa fie aceeasi aplicatie educationala, dar sa para proiectul personal al unui student.
```

## Cum se foloseste

Studentul completeaza toate câmpurile din paranteze și aleargă promptul de una singură, apoi îl poate repeta cu o altă direcție vizuală pentru a obține un al doilea rezultat distinct.
