import Link from 'next/link'

// Belgelerdeki ../belge/ linkleri, sondaki / olmadan açılan sayfalarda da doğru çözülsün.
function resolveHref(href, basePath) {
  if (!basePath || !href.startsWith('../')) return href
  return `${basePath}/${href.slice(3)}`.replace(/\/+$/, '')
}

function inline(text, key, basePath) {
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g)
  return tokens.map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return link[2].startsWith('http') || link[2].startsWith('mailto:')
      ? <a key={`${key}-${index}`} href={link[2]}>{link[1]}</a>
      : <Link key={`${key}-${index}`} href={resolveHref(link[2], basePath)}>{link[1]}</Link>
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={`${key}-${index}`}>{token.slice(2, -2)}</strong>
    if (token.startsWith('`') && token.endsWith('`')) return <code key={`${key}-${index}`}>{token.slice(1, -1)}</code>
    return token
  })
}

export default function MarkdownDocument({ source, basePath }) {
  const blocks = source.trim().split(/\n\s*\n/)
  return <article className="legal-document">
    {blocks.map((block, index) => {
      if (block.startsWith('# ')) return <h1 key={index}>{inline(block.slice(2), index, basePath)}</h1>
      if (block.startsWith('## ')) return <h2 key={index}>{inline(block.slice(3), index, basePath)}</h2>
      if (block.startsWith('### ')) return <h3 key={index}>{inline(block.slice(4), index, basePath)}</h3>
      if (block.split('\n').every((line) => line.startsWith('- '))) return <ul key={index}>{block.split('\n').map((line, item) => <li key={item}>{inline(line.slice(2), `${index}-${item}`, basePath)}</li>)}</ul>
      return <p key={index}>{inline(block.replace(/\n/g, ' '), index, basePath)}</p>
    })}
  </article>
}

