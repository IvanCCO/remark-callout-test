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
## Animal Extractivism
### Definition
The pursuit and slaughter of animals for food, fur, and other animal-derived resources.
### Examples
- Hunting for meat, leather, and fur.
- Fishing for food and industrial raw materials.
### Impacts
- Overhunting and overfishing threaten species with extinction.
- Disruption of food chains and ecosystems.
- Modern efforts to regulate and control these practices are ongoing.

---

## Fishing

### Definition
The removal of aquatic species from rivers, lakes, seas, and oceans for food, raw materials, and leisure.

### Examples
- Commercial fishing for food supply.
- Recreational fishing as a leisure activity.

### Impacts
- Overfishing depletes fish populations and disrupts marine ecosystems.
- Bycatch (unintentional capture of non-target species) harms biodiversity.
- Fishing is a vital economic activity for many communities.

---

> [!note] Para ficar de olho
> - Environmental degradation due to mining activities.
> - Use of advanced machinery by large corporations increases extraction efficiency but also environmental harm because it can lead to damage.
> - Traditional mining methods are less efficient but often more sustainable.

> [!warning] Cai na prova
> - Environmental degradation due to mining activities.
> - Use of advanced machinery by large corporations increases extraction efficiency but also environmental harm because it can lead to damage.
> - Traditional mining methods are less efficient but often more sustainable.

---

## Questions for Reflection
1. How can we balance the economic benefits of extractivism with its environmental impacts?
2. What policies or practices could help reduce the risk of species extinction caused by extractivism?
3. How does extractivism in developing countries differ from that in developed countries?
4. What role does technology play in modern extractivism, and how can it be used sustainably?
5. How can local communities benefit from extractivism without compromising their natural resources?
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
