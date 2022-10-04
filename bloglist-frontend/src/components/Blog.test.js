import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    'title': 'First',
    'author': 'testi tei',
    'url': 'wjgiogij.wfegfwa',
    'user': {
      'username': 'root',
      'name': 'root',
      'id': '633542bb262997bbd44e7e00'
    },
    'likes': 4,
    'id': '633ac5ef4ec58431e5d13dc4'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('First, testi tei')
  expect(element).toBeDefined()
})

test('Renders also url and likes after presing view',async () => {
  const blog = {
    'title': 'First',
    'author': 'testi tei',
    'url': 'wjgiogij.wfegfwa',
    'user': {
      'username': 'root',
      'name': 'root',
      'id': '633542bb262997bbd44e7e00'
    },
    'likes': 4,
    'id': '633ac5ef4ec58431e5d13dc4'
  }

  const testUser= {
    'username': 'root',
    'name': 'root',
    'id': '633542bb262997bbd44e7e00'
  }

  render(<Blog blog={blog} user= {testUser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const element = screen.getByText('wjgiogij.wfegfwa')
  expect(element).toBeDefined()

  const element2 = screen.getByText('Likes: 4')
  expect(element2).toBeDefined()

})

test('Pressing like button twice calls eventhandler twice', async () => {
  const blog = {
    'title': 'First',
    'author': 'testi tei',
    'url': 'wjgiogij.wfegfwa',
    'user': '633542bb262997bbd44e7e00',
    'likes': 4,
    'id': '633ac5ef4ec58431e5d13dc4'
  }

  const testUser= {
    'username': 'root',
    'name': 'root',
    'id': '633542bb262997bbd44e7e00'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user= {testUser} handleClick={mockHandler}/>)

  const user = userEvent.setup()
  const button1 = screen.getByText('Like')
  await user.click(button1)

  expect(mockHandler.mock.calls).toHaveLength(1)
})