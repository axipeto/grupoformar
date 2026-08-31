export function sanitizeHtml(raw: string): string {
  if (typeof raw !== 'string' || raw.length === 0)
    return '';

  try {
    const parser = new DOMParser();
    const textareaDoc = parser.parseFromString('<div></div>', 'text/html');
    const textarea = textareaDoc.createElement('textarea');
    textarea.innerHTML = raw;
    const decoded = textarea.value || '';

    const doc = parser.parseFromString('<div></div>', 'text/html');
    const container = doc.createElement('div');
    container.innerHTML = decoded;

    const allowedTags = new Set(['a', 'b', 'strong', 'i', 'em', 'u', 'p', 'br', 'ul', 'ol', 'li', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'code', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td']);
    const removeFully = new Set(['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'base', 'form']);

    const walker = doc.createTreeWalker(container, NodeFilter.SHOW_ELEMENT);
    let node = walker.nextNode() as Element | null;

    while (node) {
      const tag = node.tagName.toLowerCase();

      if (removeFully.has(tag)) {
        node.parentNode?.removeChild(node);
        node = walker.nextNode() as Element | null;
        continue;
      }
      if (!allowedTags.has(tag)) {
        const parent = node.parentNode;
        if (parent) {
          while (node.firstChild) parent.insertBefore(node.firstChild, node);
          parent.removeChild(node);
        }
        node = walker.nextNode() as Element | null;
        continue;
      }
      for (const attr of Array.from(node.attributes)) {
        const name = attr.name.toLowerCase();
        const value = (attr.value || '').trim();
        if (name.startsWith('on') || name === 'style') {
          node.removeAttribute(attr.name);
          continue;
        }
        if (tag === 'a' && name === 'href') {
          const lower = value.toLowerCase();
          const safe = /^(?:https?:\/\/|mailto:|tel:|\/|#)/.test(lower) && !lower.startsWith('javascript:');
          if (!safe) node.removeAttribute(attr.name);
          continue;
        }
        if (tag === 'a' && name === 'target') {
          if (value === '_blank') {
            const rel = new Set((node.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
            rel.add('noopener');
            rel.add('noreferrer');
            node.setAttribute('rel', Array.from(rel).join(' '));
          }
          else if (value !== '_self') {
            node.removeAttribute(attr.name);
          }
          continue;
        }
        if (tag !== 'a') node.removeAttribute(attr.name);
      }
      node = walker.nextNode() as Element | null;
    }
    return container.innerHTML;
  }
  catch {
    return '';
  }
}
