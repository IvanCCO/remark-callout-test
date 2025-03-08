import React from "react";
import Markdown from "react-markdown";
import remarkCallout from "@r4ai/remark-callout";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype"
import remarkParse from "remark-parse"
import { unified } from "unified"
import rehypeStringify from "rehype-stringify"
import MarkdownFormatter from "./MarkdownFormatter";
import ExportPDF from "./ExportPDF";
import { useState } from "react";


const md = `
# 🌍 Ecossistemas  

## 📌 O que é um Ecossistema?  

Um **ecossistema** é um conjunto formado pelos **seres vivos** e pelos **elementos não vivos** de um ambiente, incluindo as relações entre eles.  

Cada ecossistema possui características próprias e pode ser diferente de outros.  
Aqui estão alguns exemplos de ecossistemas:  

- 🌿 **Florestas**  
- 🏝️ **Recifes de corais**  
- 🏞️ **Lagos**  
- ⛰️ **Cavernas**  
- 💧 **Rios**  

A ciência que estuda as interações entre os seres vivos e o ambiente é chamada de **ecologia**.  

📖 A palavra **Ecologia** vem do grego:  
- **"Oikos"** (casa)  
- **"Logos"** (estudo)  

Ou seja, **"estudo da casa"**, o lugar onde os seres vivos vivem! 🏡🌱  

> [!note] Ecossistemas e suas Relações  
> Os seres vivos interagem entre si e com os elementos não vivos, formando um equilíbrio natural. Se um dos componentes for alterado, todo o ecossistema pode ser afetado.  

---

## 🔬 Componentes de um Ecossistema  

Um ecossistema é formado por **componentes vivos** e **componentes não vivos**.  

### 🌱 Componentes Vivos  
São os **seres vivos** do ecossistema, como:  
- Animais 🐻  
- Plantas 🌳  
- Fungos 🍄  
- Bactérias 🦠  

### 🪨 Componentes Não Vivos (Fatores Físico-Químicos)  
Também chamados de **fatores abióticos**, incluem:  
- Rochas e minerais 🪨  
- Solo 🌿  
- Água 💧  
- Ar 🌬️  
- Luz ☀️  
- Temperatura 🌡️  

> [!note] Relação entre Seres Vivos e o Meio  
> Os seres vivos dependem dos fatores não vivos para sobreviver. As plantas, por exemplo, precisam de luz para realizar a fotossíntese, enquanto os animais precisam de água e oxigênio para viver.  

---

## 🐵 Exemplo: O Primata Coata-Preto  

O **Coata-Preto** é um primata que vive nas florestas do Pará e Maranhão.  

Aqui estão algumas curiosidades sobre ele:  

- Vive em grupos de **30 indivíduos** 🐒  
- Pode se deslocar por **vários quilômetros** todos os dias 🌳  
- Se alimenta de **flores, frutos, sementes e brotos** 🍎  
- Ao comer frutas, ele **espalha sementes**, ajudando as plantas a crescerem em novos lugares 🌱  
- Quando há pouca comida, o grupo se divide em **grupos menores** para evitar competição 🥭  
- Para se proteger, ele se move **rápido e com agilidade** ⚡, fugindo de predadores como cobras 🐍 e onças 🐆!  

> [!note] Importância do Coata-Preto  
> Esse primata desempenha um papel fundamental no ecossistema ao espalhar sementes, ajudando na regeneração das florestas.  

---

## 💧 A Importância dos Fatores Físico-Químicos  

Os fatores **físico-químicos** podem influenciar muito os organismos que vivem no ecossistema.  

Por exemplo:  
- **A água é essencial para quase todos os seres vivos**. 🌊  
- Mas **algumas espécies precisam de pouca água**, enquanto outras só sobrevivem se houver **muita água**!  

Cada organismo se adapta ao seu ambiente para sobreviver.  

> [!note] Adaptação ao Meio  
> Algumas plantas crescem em ambientes secos, como os cactos, enquanto outras só sobrevivem em locais úmidos, como as vitórias-régias.  

---

## 🏠 O que é Habitat?  

O **habitat** é o local onde um organismo vive, se alimenta, se reproduz e se protege.  

Por exemplo:  
- O habitat do **coata-preto** são as **florestas tropicais** 🌳🌧️  
- O habitat dos **peixes-palhaço** é o **recife de corais** 🐠🏝️  

Cada ser vivo tem um habitat adequado para sua sobrevivência!  

> [!note] Diferença entre Habitat e Nicho Ecológico  
> O habitat é o "endereço" do ser vivo. Já o **nicho ecológico** representa o seu papel no ecossistema, como o que ele come e como interage com outros seres.  

---

## 🎯 Perguntas para Reflexão  

1️⃣ Como os seres vivos dependem dos fatores não vivos do ecossistema?  
2️⃣ O que aconteceria se um ecossistema perdesse um de seus componentes?  
3️⃣ Você consegue dar mais exemplos de habitats diferentes?  

Essa foi nossa aula sobre ecossistemas! Continue explorando a natureza e descobrindo mais sobre o mundo ao seu redor! 🌎😊  

`

function App() {

  const [html, setHtml] = useState<string>('');

  const handleHtmlRendered = (htmlContent: string) => {
    setHtml(htmlContent);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <MarkdownFormatter text={md} onHtmlRendered={handleHtmlRendered} />
      <div style={{ marginTop: '2rem' }}>
        {html && <ExportPDF text={html} />}
      </div>
    </div>
  );
}

export default App;
