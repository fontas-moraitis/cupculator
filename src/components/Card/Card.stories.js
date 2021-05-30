import React from 'react';

import Card from './Card';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Card',
  component: Card,
  argTypes: { handleCardSelection: { action: 'Card is selected' } },
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <div style={{backgroundColor: 'rgba(107,96,246, 1)', padding: '5%'}}><Card {...args} /></div>;

export const unselectedCard = Template.bind({});
unselectedCard.args = {
  /*👇 The args you need here will depend on your component */
  ingredient: { id: 'allPurposeFlour', label: 'All Purpose Flour'},
  activeIngredient: 'bakingSoda',
};

export const selectedCard = Template.bind({});
selectedCard.args = {
  /*👇 The args you need here will depend on your component */
  ingredient: { id: 'allPurposeFlour', label: 'All Purpose Flour'},
  activeIngredient: 'allPurposeFlour',
};