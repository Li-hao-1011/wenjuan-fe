import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionParagraph from '../src/components/QuestionComponents/QuestionParagraph/Component'

test('QuestionParagraph 默认属性', () => {
  render(<QuestionParagraph />)
  const span = screen.getByText('一行段落...')
  expect(span).toBeInTheDocument() // 判断元素是否在文档中
})

test('QuestionParagraph 传入属性', () => {
  render(<QuestionParagraph text="hello" isCenter={true} />)

  const span = screen.getByText('hello')
  expect(span).toBeInTheDocument() // 判断元素是否在文档中

  const p = span.parentElement
  expect(p).not.toBeNull()
  const style = p!.style || {}
  expect(style.textAlign).toEqual('center')
})

test('QuestionParagraph 多行文字', () => {
  render(<QuestionParagraph text={'a\nb\nc'} />)

  const span = screen.getByText('a')
  expect(span).toBeInTheDocument() // 判断元素是否在文档中

  expect(span).toHaveTextContent('a')
  expect(span).not.toHaveTextContent('abc')
})
