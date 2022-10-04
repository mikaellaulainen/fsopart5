import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Creator from './Creator'
import userEvent from '@testing-library/user-event'

test('Testing form props', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<Creator createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendBtn = screen.getByText('Add')

  await user.type(inputs[0], 'title tony')
  await user.type(inputs[1], 'Author amy')
  await user.type(inputs[2], 'uniform url')
  await user.click(sendBtn)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0].author)
  expect(createBlog.mock.calls[0][0].title).toBe('title tony')
  expect(createBlog.mock.calls[0][0].author).toBe('Author amy')
  expect(createBlog.mock.calls[0][0].url).toBe('uniform url')

})