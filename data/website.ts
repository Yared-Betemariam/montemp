export const FAQData = [
  {
    q: "Is it a subscription?",
    a: "Nope. You pay once and it's yours forever.",
  },
  {
    q: "Is it accessible?",
    a: "Yes. It comes with default styles that matches the other components&apos; aesthetic.",
  },
];

export const TestimonialsData = [
  {
    name: "Oliyad Abenet.",
    comment:
      "I was having trouble setting up html and all that kind of stuff when i wanted to send email to my customers, but when using Customail i setted it up in under a 5 minutes",
    imageAddress: "",
    job: "AI saas developer",
  },
  {
    name: "Abenezer",
    comment:
      "eazy to grasp ui, live updates and bunch more features, really good product",
    imageAddress: "",
    job: "Freelance developer",
  },
];

export const pricingPlan = [
  {
    tag: "",
    id: "free",
    name: "Free",
    price: 0,
    priceIds: {
      test: "",
      production: "",
    },
    disCountPrice: 0,
    desc: "Start with a taste of Customail",
    features: [
      "5 Projects",
      "5 Templates",
      "Full customization ability",
      // "Send a test email functionality",
    ],
  },
  {
    tag: "Popular",
    id: "pro",
    name: "Pro",
    price: 24,
    priceIds: {
      test: "price_1PNmsOIwT7blYDqOYdSL34eT",
      production: "",
    },
    disCountPrice: 48,
    desc: "Unlimited email customization to all your websites",
    features: [
      "Unlimited Projects",
      "Unlimited Templates",
      "Full customization ability",
      // "100 test email sends per month",
    ],
  },
];
