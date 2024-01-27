import { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Pricing | Blueprint' },
    {
      name: 'description',
      content: 'This app is the best',
    },
  ];
};

type Price = {
  title: string;
  price: string;
  description: string;
  features: string[];
};

const prices: Price[] = [
  {
    title: 'Self Host',
    price: 'Free',
    description:
      'Host Blueprint on your own server! You get all the features and you own your own data.',
    features: ['Unlimited Users', 'Unlimited Projects', 'Unlimited Storage'],
  },
  {
    title: 'Starter',
    price: 'Free',
    description:
      'We host Blueprint for you, but you get limited features and storage.',
    features: ['Unlimited Users', 'Unlimited Projects', '1GB Storage'],
  },
  {
    title: 'Pro',
    price: 'Free',
    description:
      'We host Blueprint for you, but you get limited features and storage.',
    features: ['Unlimited Users', 'Unlimited Projects', '1GB Storage'],
  },
];

const PricingCard = () => (
  <div>
    <h1>hello</h1>
  </div>
);

export default function Pricing() {
  return (
    <div>
      <PricingCard />
    </div>
  );
}
