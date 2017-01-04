import { configure } from '@kadira/storybook';

function loadStories() {
  require('../client/components/UI/Button/Button.story');
}

configure(loadStories, module);
