type HTMLElement = string
type CustomElement = (attributes: unknown, children: string) => Child
type Element = HTMLElement | CustomElement
type Attributes<T> = Record<string, T> | null
type Child = string
type Children = Child[]

const parseAttrValue = (value: unknown) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

const parseAttr = (attr: Attributes<unknown>): string => {
  if (!attr) return ''
  return Object
    .entries(attr)
    .reduce((attributes, [key, value]) => value === true
      ? `${attributes} ${key}`
      : `${attributes} ${key}="${parseAttrValue(value)}"`,
    '')
}

const parseChildren = (children: Children): string => children.join('')

const parseHTMLElement = (el: HTMLElement, attr: Attributes<unknown>, children: Children) => {
  if (el === 'doctype') return `<!doctype${parseAttr(attr)}>`
  return `<${el}${parseAttr(attr)}>${parseChildren(children)}</${el}>`
}

export const createElement = (el: Element, attr: Attributes<unknown>, ...children: Children): string => {
  return typeof el === 'string' ? parseHTMLElement(el, attr, children) : el(attr, parseChildren(children))
}

export const Fragment: CustomElement = (_, children) => children
