# Prompt pentru personalizarea aplicatiei

Copiaza promptul de mai jos intr-un chat AI impreuna cu proiectul aplicatiei. Este complet si poate fi folosit direct, fara alte alegeri sau completari.

```text
Lucreaza direct in aplicatia React existenta din acest workspace. Scopul este sa ii dai o identitate vizuala proprie, memorabila si placuta, astfel incat rezultatul sa fie clar diferit de aplicatiile colegilor, fara sa pierzi rolul ei de laborator pentru invatarea React.

Inainte sa modifici codul:
1. Inspecteaza structura existenta, componentele, demo-urile si CSS-ul deja folosit.
2. Pastreaza toate demo-urile, pasii, titlurile, navigarea si comportamentele interactive. Nu sterge si nu rescrie conceptele React pentru a obtine un rezultat vizual.
3. Foloseste direct urmatoarea directie vizuala coerenta. Nu folosi un layout generic de dashboard si nu copia stilul Vite.

Directia vizuala obligatorie:
- Tema / atmosfera: un caiet editorial de laborator React, care combina precizia unei fise de experiment cu caldura unui jurnal personal de invatare.
- Paleta: fundal crem cald `#f7f3ea`, text cerneala `#17212b`, suprafete albe `#fffdf8`, accent coral `#d95d4f` pentru actiuni si pasul activ, verde menta `#6f9f8f` pentru stari pozitive si accente secundare, galben unt `#e7c56b` pentru marcaje discrete. Pastreaza contrastul suficient pentru text si controale.
- Tipografie: foloseste o combinatie editoriala cu personalitate, cu un font serif pentru titlurile principale si un font sans-serif clar pentru continut si controale. Daca nu exista fonturi externe configurate, foloseste stack-uri locale cu serif si sans-serif, fara sa adaugi o dependenta doar pentru fonturi.
- Element distinctiv: transforma navigarea demo-urilor intr-un index lateral de caiet, cu numarul pasului vizibil ca eticheta de sectiune. Meniul trebuie sa ramana practic, accesibil si usor de folosit pe ecrane mici, unde poate deveni o lista orizontala derulabila.
- Nivelul de expresivitate: editorial, calm si usor jucaus. Interfata trebuie sa para lucrata de un student curios, nu generata dintr-un template de SaaS.
- Detalii de finisare: foloseste linii subtile ca de hartie, delimitatoare fine, colturi usor rotunjite de maximum 8px pentru elementele incadrate si o umbra foarte discreta doar unde ajuta ierarhia. Pastreaza mult spatiu alb si o ierarhie clara intre titlu, navigare si demo.

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

## Cum il folosesc studentii

Pentru a respecta cerinta de minimum doua prompturi, studentul poate folosi acest prompt pentru prima transformare si poate formula al doilea prompt cerand aceeasi pastrare a functionalitatii, dar o directie complet diferita. A doua directie recomandata este un observator nocturn: fundal albastru-negru, accente cyan si chihlimbar, tipografie monospace pentru titluri, navigare ca o consola de misiune si animatii inspirate de scanarea unui panou tehnic. Cele doua rezultate vor ramane distincte daca nu sunt amestecate in aceeasi implementare.
