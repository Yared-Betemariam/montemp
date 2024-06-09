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

export const defaultPlanId: string = "free";

export const pricingPlan = [
  {
    id: "free",
    name: "Free",
    price: 0,
    disCountPrice: 0,
    priceIds: {
      test: "",
      production: "",
    },
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
    id: "subscription1",
    name: "Pro",
    price: 14,
    paymentLink: "https://buy.stripe.com/test_14k0424V0cde5jy9AA",
    disCountPrice: 28,
    priceIds: {
      test: "price_1PNmsOIwT7blYDqOYdSL34eT",
      production: "",
    },
    desc: "Unlimited email customization to all your websites",
    features: [
      "Unlimited Projects",
      "Unlimited Templates",
      "Full customization ability",
      // "100 test email sends per month",
    ],
  },
  {
    id: "oneTimePayment1",
    name: "One time payment",
    price: 169,
    disCountPrice: 199,
    paymentLink: "https://buy.stripe.com/test_eVa8Ay87ccdeeU8fYZ",
    priceIds: {
      test: "price_1POKcrIwT7blYDqOTGbK4yMp",
      production: "",
    },
    desc: "Unlimited email customization to all your websites",
    features: [
      "Unlimited Projects",
      "Unlimited Templates",
      "Full customization ability",
      "Only pay once",
      // "100 test email sends per month",
    ],
  },
];
