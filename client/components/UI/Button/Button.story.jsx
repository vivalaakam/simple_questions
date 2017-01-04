import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';
import Button from './index';

storiesOf('Button', module)
  .add('default view', () => (
    <Button onClick={linkTo('Button', 'some emojies as the text')}>Next Story</Button>
  ))
  .add('some emojies as the text', () => (
    <Button>😀 😎 👍 💯</Button>
  ));
