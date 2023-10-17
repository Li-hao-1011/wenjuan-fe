import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionInput from '../src/components/QuestionComponents/QuestionInput/Component'

test('QuestionInput 默认属性', () => {
  render(<QuestionInput />)
  const p = screen.getByText('输入框标题')
  expect(p).toBeInTheDocument() // 判断元素是否在文档中

  const input = screen.getByPlaceholderText('请输入')
  expect(input).toBeInTheDocument()
})

test('QuestionInput 传入属性', () => {
  render(<QuestionInput title="hello" placeholder="world" />)

  const h3 = screen.getByText('hello')
  expect(h3).toBeInTheDocument() // 判断元素是否在文档中

  const input = screen.getByPlaceholderText('world')
  expect(input).toBeInTheDocument()
})
