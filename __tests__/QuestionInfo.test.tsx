import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionInfo from '../src/components/QuestionComponents/QuestionInfo/Component'

test('QuestionInfo 默认属性', () => {
  render(<QuestionInfo />)
  const h = screen.getByText('问卷标题')
  expect(h).toBeInTheDocument() // 判断元素是否在文档中
})

test('QuestionInfo 传入属性', () => {
  render(<QuestionInfo title="自定义标题" desc="自定义描述" />)

  const h = screen.getByText('自定义标题')
  expect(h).toBeInTheDocument() // 判断元素是否在文档中

  const p = screen.getByText('自定义描述')
  expect(p).toBeInTheDocument() // 判断元素是否在文档中
})

test('QuestionInfo 多行文字', () => {
  render(<QuestionInfo desc={'1\n2\n3\n4'} />)
  const span = screen.getByText('1')

  expect(span).toBeInTheDocument()
  expect(span).toHaveTextContent('1')
  expect(span).not.toHaveTextContent('1234')
})
