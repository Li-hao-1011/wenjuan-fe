import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionTextarea from '../src/components/QuestionComponents/QuestionTextarea/Component'

test('QuestionTextarea 默认属性', () => {
  render(<QuestionTextarea />)
  const p = screen.getByText('多行输入框标题')
  expect(p).toBeInTheDocument() // 判断元素是否在文档中

  const textarea = screen.getByPlaceholderText('请输入多行')
  expect(textarea).toBeInTheDocument()
})

test('QuestionTextarea 传入属性', () => {
  render(<QuestionTextarea title="hello" placeholder="world" />)

  const p = screen.getByText('hello')
  expect(p).toBeInTheDocument() // 判断元素是否在文档中

  const textarea = screen.getByPlaceholderText('world')
  expect(textarea).toBeInTheDocument()
})
