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
