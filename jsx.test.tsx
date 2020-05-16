import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'
import * as React from './jsx.ts'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [el: string]: unknown
    }
  }
}

Deno.test('jsx parses special characters', () => {
  assertEquals(<div data-test={'\'"&<>'}/>, '<div data-test="&#039;&quot;&amp;&lt;&gt;"></div>')
})

Deno.test('jsx short-circuits true', () => {
  assertEquals(<button disabled />, '<button disabled></button>')
})

Deno.test('jsx doctype', () => {
  assertEquals(<doctype html />, '<!doctype html>')
})

Deno.test('jsx multiple attributes', () => {
  assertEquals(<div data-title='jsx' data-author='aidant' />, '<div data-title="jsx" data-author="aidant"></div>')
})

Deno.test('jsx multiple children', () => {
  assertEquals(<div><div></div><div></div></div>, '<div><div></div><div></div></div>')
})

Deno.test('jsx custom components', () => {
  const Typography = (attributes: object, children: string) => <p {...attributes}>{children}</p> 
  assertEquals(<Typography class='pre'>Hello World</Typography>, '<p class="pre">Hello World</p>')
})
