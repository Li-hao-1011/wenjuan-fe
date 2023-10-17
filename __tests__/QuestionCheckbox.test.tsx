import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionCheckbox from '../src/components/QuestionComponents/QuestionCheckbox/Component'

test('QuestionCheckbox 默认属性', () => {
  render(<QuestionCheckbox />)
  const p = screen.getByText('多选标题')
  expect(p).toBeInTheDocument() // 判断元素是否在文档中

  const item = ['选项一', '选项二', '选项三', '选项四', '选项五']
  item.forEach((it, index) => {
    const checkbox = screen.getByDisplayValue(index + 1)
    expect(checkbox).toBeInTheDocument()

    const label = screen.getByText(it)
    expect(label).toBeInTheDocument()

    expect(checkbox).not.toBeChecked()
  })
})

test('QuestionCheckbox 传入属性', () => {
  const list = [
    { text: 't1', value: 'v1', checked: false },
    { text: 't2', value: 'v2', checked: true },
    { text: 't3', value: 'v3', checked: true },
  ]
  render(<QuestionCheckbox title="自定义title" isVertical={true} list={list} />)

  const p = screen.getByText('自定义title')
  expect(p).toBeInTheDocument() // 判断元素是否在文档中

  const checkbox1 = screen.getByDisplayValue(`v1`)
  expect(checkbox1).toBeInTheDocument()
  expect(checkbox1.getAttribute('checked')).toBeNull()

  const checkbox2 = screen.getByDisplayValue(`v2`)
  expect(checkbox2).toBeInTheDocument()
  expect(checkbox2.getAttribute('checked')).not.toBeNull()

  const checkbox3 = screen.getByDisplayValue(`v3`)
  expect(checkbox3).toBeInTheDocument()
  expect(checkbox3.getAttribute('checked')).not.toBeNull()
})
