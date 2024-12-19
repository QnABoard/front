import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avator';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Atoms/Avatar',
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'big',
    src: 'https://jmagazine.joins.com/_data2/photo/2021/04/838745483_Kw79V5Pa_3.jpg',
    alt: 'Default Avatar',
  },
  render: (args) => <Avatar {...args} />,
};

export const Outlined: Story = {
  args: {
    size: 'small',
    src: 'https://jmagazine.joins.com/_data2/photo/2021/04/838745483_D5lXOQuU_5.jpg',
    alt: 'Outlined Avatar',
  },
  render: (args) => <Avatar {...args} />,
};
