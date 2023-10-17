import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionTitle from '../src/components/QuestionComponents/QuestionTitle/Component'

test('QuestionTitle 默认属性', () => {
  render(<QuestionTitle />)
  const h = screen.getByText('一级标题')
  expect(h).toBeInTheDocument() // 判断元素是否在文档中
})

test('QuestionTitle 传入属性', () => {
  render(<QuestionTitle text="hello" level={3} isCenter={true} />)

  const h3 = screen.getByText('hello')
  expect(h3).toBeInTheDocument() // 判断元素是否在文档中

  // 判断标签是否是h2
  expect(h3.tagName).toEqual('H3')

  const style = h3.style
  expect(style.textAlign).toEqual('center')
})
