import React from 'react'
import { render, screen } from '@testing-library/react'

import QuestionRadio from '../src/components/QuestionComponents/QuestionRadio/Component'

test('QuestionRadio 默认属性', () => {
  render(<QuestionRadio />)
  const p = screen.getByText('单选标题')
  expect(p).toBeInTheDocument() // 判断元素是否在文档中

  const item = ['选项一', '选项二']
  item.forEach((it, index) => {
    const radio = screen.getByDisplayValue(index + 1)
    expect(radio).toBeInTheDocument()

    const label = screen.getByText(it)
    expect(label).toBeInTheDocument()
  })
})

test('QuestionRadio 传入属性', () => {
  const options = [
    { text: 'v1', value: '1' },
    { text: 'v2', value: '2' },
    { text: 'v3', value: '3' },
  ]
  render(<QuestionRadio title="自定义title" value="2" isVertical={true} options={options} />)

  const p = screen.getByText('自定义title')
  expect(p).toBeInTheDocument() // 判断元素是否在文档中

  const value = '2'
  for (let i = 1; i <= 3; i++) {
    const radio = screen.getByDisplayValue(`${i}`)
    expect(radio).toBeInTheDocument()

    const label = screen.getByText(`v${i}`)
    expect(label).toBeInTheDocument()

    if (`${i}` === value) {
      expect(radio).toBeChecked()
      expect(radio.getAttribute('checked')).not.toBeNull()
    }
  }
})
