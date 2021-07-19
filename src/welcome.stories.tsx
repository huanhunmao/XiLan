import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>组件库</h1>
        <p>一起学习组件库，慢慢完善</p>
        <h3>安装试试</h3>
        <code>
          npm install vikingship --save
        </code>
      </>
    )
  }, { info : { disable: true }})