"use client";

import { useSearchParams } from "next/navigation";
import { JSX, useEffect, useMemo, useRef, useState } from "react";

type Category = {
  key: "mutual-funds" | "real-estate" | "insurance";
  label: string;
};

type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

type Article = {
  title: string;
  category: Category;
  content: ArticleSection[];
};

const CATEGORIES: Category[] = [
  { key: "mutual-funds", label: "Mutual funds" },
  { key: "real-estate", label: "Real estate" },
  { key: "insurance", label: "Insurance" },
];

/* ---------- icons ---------- */

function IconTrendingUp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="14 6 21 6 21 13" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4.5h4V19a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

const CATEGORY_ICON: Record<
  Category["key"],
  (props: { className?: string }) => JSX.Element
> = {
  "mutual-funds": IconTrendingUp,
  "real-estate": IconHome,
  insurance: IconShield,
};

/* ---------- content ---------- */

const articles: Article[] = [
  {
    title: "Why Do You Need a Mutual Fund Advisor?",
    category: CATEGORIES[0],
    content: [
      {
        paragraphs: [
          "Investing in mutual funds has never been easier. With a few clicks, anyone can start a SIP, choose from thousands of schemes, and track their portfolio on an app. But does having easy access to investments mean you should manage your entire financial journey alone?",
          "The role of a Mutual Fund Distributor is not simply to help you purchase a mutual fund. The real value lies in understanding your financial situation, creating a strategy around your goals, keeping you disciplined through different market cycles, and continuously reviewing whether your investments are still working towards what you want to achieve.",
        ],
      },
      {
        heading: "Do You Know What You’re Actually Investing For?",
        paragraphs: [
          "Before asking “Which mutual fund should I invest in?”, the more important question is “Why am I investing?”",
          "Imagine two investors, both investing ₹50,000 every month. One is saving to purchase a house in five years, while the other is building a retirement corpus for the next 25 years. Should they have the same portfolio? Probably not.",
          "The first investor has a relatively shorter time horizon and may need greater emphasis on capital preservation and liquidity as the goal approaches. The second investor has a much longer horizon and may have greater capacity to take equity risk for long-term growth.",
          "This is why financial planning should come before fund selection. A professional can understand your income, existing investments, liabilities, financial goals, risk tolerance, and investment horizon and then help structure an appropriate strategy.",
          "Instead of asking “Which fund will give me the highest return?”, the conversation becomes “How much do I need to invest, how much risk should I take, and what strategy gives me a reasonable path towards my goal?”",
          "The fund should fit the plan, not the plan fit the fund.",
        ],
      },
      {
        heading: "What Will You Do When the Market Falls 20%?",
        paragraphs: [
          "Anyone can feel confident about investing when markets are rising. The real test comes when they fall.",
          "Suppose you have built a ₹20 lakh equity portfolio and, during a major correction, its value falls to ₹16 lakh. Your first reaction might be to stop your SIP or sell your investments to “protect” what remains. But what if the underlying reasons for your investment haven't changed? What if your goal is still 15 years away? Selling purely because the market has fallen could turn a temporary decline into a permanent loss. The opposite can happen during a bull market. After seeing a particular sector or fund generate exceptional returns, investors may suddenly want to move more money into it because they fear missing out.",
          "A professional can act as an objective second opinion during these moments. They can help you distinguish between a genuine change in your financial situation and normal market volatility.",
          "The purpose isn't to predict whether the market will rise tomorrow or fall next month. Nobody can consistently predict that. The purpose is to ensure that short-term emotions don't derail a long-term financial plan.",
          "Sometimes the best investment decision is to stay invested. Sometimes it may be to rebalance. And sometimes the strategy genuinely needs to change. Having a professional who can evaluate the situation objectively can help you make that decision.",
        ],
      },
      {
        heading: "Does Having 10 Mutual Funds Mean You’re Diversified?",
        paragraphs: [
          "Many investors believe that owning more mutual funds automatically means having a safer portfolio.",
          "It doesn't.",
          "An investor may own ten different equity schemes and still have substantial exposure to the same companies, sectors, or investment styles. For example, three different funds may all have significant holdings in the same large-cap companies. On paper, the investor owns three funds; in reality, there may be considerable overlap.",
          "A professional can evaluate your portfolio at an overall level, rather than looking at each mutual fund individually. They can assess asset allocation, fund overlap, concentration, risk, investment style, and whether the portfolio is appropriate for your objectives.",
          "This also becomes important as your wealth grows. A portfolio that was suitable when you had ₹5 lakh invested may not necessarily be appropriate when your investments reach ₹50 lakh or ₹1 crore.",
          "The objective is not to keep adding funds whenever you have more money.",
          "The objective is to build a portfolio where every investment has a purpose.",
        ],
      },
      {
        heading: "Is the Additional 1% Really Just an Expense?",
        paragraphs: [
          "This is perhaps the most important question for an investor considering whether to work with a Mutual Fund Distributor.",
          "If you can invest directly, why pay an additional cost for professional distribution?",
          "The answer is that you shouldn't look at the cost in isolation. You should look at the value created in return for that cost.",
          "You aren't paying someone simply to click the “Invest” button. You're potentially paying for financial planning, portfolio construction, regular reviews, behavioural guidance, investment discipline, and ongoing support.",
          "Consider an investor who panics during a market correction and exits a long-term portfolio. Six months later, after the market has recovered significantly, they decide to invest again. The cost of that one behavioural mistake could potentially be much larger than years of professional fees.",
          "Similarly, an investor might spend years holding an inappropriate asset allocation, chasing high-performing funds, or maintaining unnecessary portfolio overlap simply because nobody is reviewing the portfolio objectively.",
          "This doesn't mean professional guidance guarantees higher returns. It doesn't. No distributor or financial professional can guarantee market performance.",
          "The value is in helping you make better-informed decisions, maintain discipline, and keep your financial strategy aligned with your objectives.",
          "So instead of asking only, “Why should I pay an extra 1%?”, ask: “What is the potential cost of making financial decisions without guidance?”",
        ],
      },
      {
        heading: "Do You Need Another Fund? or Someone to Keep You on Track?",
        paragraphs: [
          "Your financial life will change.",
          "Your salary may increase. You may purchase a house, take a loan, get married, start a business, have children, or move closer to retirement. Each of these events can change your financial priorities and the amount of risk you should take.",
          "This is where financial planning becomes an ongoing process rather than a one-time activity.",
          "A professional can periodically review your investments and ask important questions: Are your goals still the same? Has your income changed? Has your risk capacity changed? Is your asset allocation still appropriate? Are you investing enough to achieve your targets?",
          "For example, if your salary increases from ₹10 lakh to ₹15 lakh a year, simply keeping the same SIP forever may mean you're not taking advantage of your increased ability to invest. Similarly, if you are approaching a major financial goal, continuing to take the same level of risk may no longer be appropriate.",
          "The role of a professional is to help you make these adjustments thoughtfully rather than reactively.",
          "More importantly, they provide accountability. Just as a fitness coach can help you stay consistent with your fitness goals, a financial professional can help you remain disciplined with your financial goals.",
        ],
      },
      {
        heading: "Are You Looking for Returns? or Building Wealth?",
        paragraphs: [
          "This is an important distinction.",
          "Investing is often reduced to a simple question: “Which fund will give me the highest return?”",
          "But wealth creation is much more than that.",
          "A good financial strategy considers how much you save, how consistently you invest, how much risk you take, how you diversify, how you respond to market volatility, when you need the money, and how you eventually use your wealth.",
          "A fund that generated 20% last year may not necessarily be the right investment for you. The right investment is the one that fits into your overall financial strategy and helps you progress towards your goals without taking unnecessary risk.",
          "Returns are important. But the right returns, with the right amount of risk, for the right goal, at the right time, that is financial planning.",
        ],
      },
      {
        heading: "Verdict: Investing Online vs Investing with a Professional",
        paragraphs: [
          "You can absolutely invest on your own. Technology has made investing more accessible than ever before. But access to investments and financial planning are two very different things.",
          "A Mutual Fund Distributor can help you move from simply owning investments to having a structured financial strategy, one that considers your goals, risk profile, time horizon, behaviour, and changing financial circumstances.",
          "The real question isn't: “Can I invest without a distributor?”",
          "You can.",
          "The better question is: “Would having a professional who helps me plan, stay disciplined, review my portfolio, and avoid costly financial mistakes provide enough value to justify the cost?”",
          "Because investing is easy. Building wealth with a plan, and staying committed to that plan, is where professional guidance can make a difference.",
        ],
      },
    ],
  },
  {
    title: "Why Do You Need a Real Estate Professional?",
    category: CATEGORIES[1],
    content: [
      {
        paragraphs: [
          "Buying or selling a property is one of the biggest financial decisions most people make. Today, you can search properties online, compare prices, view photos, check locations on maps, and even schedule site visits without speaking to an agent. So the obvious question is: if technology has made property discovery so easy, why do you still need a real estate agent?",
          "Because finding a property is only the beginning. The real challenge is determining whether the property is right for you, whether you're paying the right price, whether the transaction is structured properly, and whether you are making a sound financial decision. A good real estate agent brings local knowledge, negotiation experience, access, and transaction management that a property listing cannot provide.",
        ],
      },
      {
        heading: "1. Do You Know What You’re Actually Buying?",
        paragraphs: [
          "A property can look perfect on paper and still be the wrong purchase.",
          "You may find a ₹1.5 crore apartment in a location you like, with excellent amenities and a beautiful interior. But is ₹1.5 crore actually a fair price? How does it compare with similar properties in the same building or nearby? What is the quality of construction? How old is the building? What are the maintenance charges? Is the layout practical? How is the parking situation? What is the demand for similar properties in the area?",
          "These are questions that go beyond what you see on a property portal.",
          "An experienced agent who understands the local market can provide context around the property, not just its features. They can help you compare alternatives, understand the neighbourhood, identify potential concerns, and determine whether the property actually fits your requirements.",
          "For example, two apartments of the same size in the same locality may have a ₹15–20 lakh difference in value because of the floor, view, condition, parking, building quality, age, or exact location.",
          "The right property isn't necessarily the one that looks the best. It's the one that makes the most sense for your needs, finances, and objectives.",
        ],
      },
      {
        heading: "2. Are You Paying the Right Price?",
        paragraphs: [
          "This is one of the biggest areas where professional representation can create value.",
          "Suppose you find a property listed at ₹1.50 crore. You may assume the seller expects around ₹1.50 crore and negotiate from there. But what if comparable properties have recently transacted around ₹1.35–₹1.40 crore?",
          "Without local market knowledge, you may not know where the realistic market value lies.",
          "A professional agent can help you understand comparable properties, recent transactions, seller expectations, inventory levels, demand, and market conditions. This can give you a stronger foundation for negotiation.",
          "But negotiation isn't simply about getting the lowest possible price.",
          "Imagine you negotiate a ₹10 lakh discount but lose the property because another buyer offers slightly more or can close faster. A good negotiation considers the entire transaction, price, payment terms, timelines, possession, conditions, and certainty.",
          "For sellers, the opposite problem exists. Pricing too high can result in months of limited interest, while pricing too low can leave significant money on the table.",
          "A good agent doesn't simply negotiate harder. They help you negotiate from a position of information.",
        ],
      },
      {
        heading: "3. Do You Really Know the Local Market?",
        paragraphs: [
          "Real estate is extremely local.",
          "Saying that a property is in “Mumbai” or even “Andheri” doesn't tell you enough. Two buildings just a few streets apart can have very different rental demand, resale values, connectivity, tenant profiles, and future potential.",
          "An experienced real estate professional often understands these micro-markets through years of dealing with buyers, sellers, landlords, tenants, developers, and other market participants.",
          "They may know which locations have stronger demand, which buildings consistently attract buyers, where new infrastructure is coming up, which projects have better rental potential, and which properties may be difficult to resell.",
          "This can be particularly valuable for investors.",
          "For example, an investor may find a property that appears inexpensive because the price per square foot is lower than surrounding areas. But if rental demand is weak and resale liquidity is poor, the lower purchase price may not necessarily make it a better investment.",
          "In real estate, location matters, but understanding the micro-market matters even more.",
        ],
      },
      {
        heading: "4. Are You Looking Only at the Property Price?",
        paragraphs: [
          "One of the most common mistakes buyers make is focusing entirely on the quoted property price.",
          "A ₹1 crore property doesn't necessarily mean your total financial commitment is ₹1 crore.",
          "Depending on the transaction, there may be stamp duty, registration charges, brokerage, taxes, loan-related costs, maintenance, parking, renovation, society charges, and other expenses.",
          "Then there are the documents and legal considerations. Is the title clear? Are the required approvals in place? Are there outstanding dues? Are there restrictions or other issues that need to be investigated?",
          "A real estate agent should not replace a qualified lawyer, architect, surveyor, or other specialist. Instead, a good agent helps coordinate the process and ensures that important questions are raised and the appropriate professionals are involved.",
          "The value of an agent isn't that they personally perform every form of due diligence. It is that they help ensure the transaction moves through the right process and that potential issues don't get overlooked simply because the buyer is excited about the property.",
          "The goal isn't just to find a property. It's to make sure you understand what you're committing to.",
        ],
      },
      {
        heading: "5. Can You Handle the Negotiation Yourself?",
        paragraphs: [
          "Of course you can.",
          "But there is a difference between negotiating occasionally and negotiating property transactions regularly.",
          "A buyer may emotionally fall in love with a particular apartment and become reluctant to walk away. A seller may have an unrealistic expectation of what their property is worth because of personal attachment or the price they paid years ago.",
          "An experienced agent can act as a buffer between the parties.",
          "Instead of the buyer and seller negotiating emotionally, the agent can focus the conversation on market value, comparable properties, transaction terms, and practical considerations.",
          "This becomes particularly important when negotiations involve more than just price.",
          "Payment schedules, possession dates, furniture, repairs, parking, timelines, documentation, and other conditions can all influence whether a transaction is actually attractive.",
          "The best deal isn't always the cheapest deal. It's the deal where the overall terms make sense.",
        ],
      },
      {
        heading: "6. What Happens After You Say “Yes”?",
        paragraphs: [
          "Many people think the agent's job ends once the buyer agrees to purchase the property.",
          "In reality, that's when a significant portion of the work begins.",
          "There may be negotiations, document collection, legal review, loan coordination, agreement preparation, payment schedules, registration, possession, and communication between multiple parties.",
          "For a buyer, coordinating the seller, lawyer, bank, society, developer, and other stakeholders can become overwhelming.",
          "For a seller, managing enquiries, filtering serious buyers, arranging site visits, negotiating offers, coordinating documentation, and closing the transaction can consume a significant amount of time.",
          "A professional agent can act as the central point of coordination, helping keep everyone aligned and reducing unnecessary friction.",
          "This doesn't mean the agent replaces your lawyer, bank, or other professionals. Instead, they help connect the different parts of the transaction.",
          "A good agent doesn't just help you find a deal. They help you get the deal completed.",
        ],
      },
      {
        heading: "7. Are You Buying a Home or Making an Investment?",
        paragraphs: [
          "The answer changes how you should evaluate the property.",
          "If you're buying a home, factors such as location, commute, schools, neighbourhood, lifestyle, layout, and long-term suitability may matter more than simply maximising financial returns.",
          "If you're buying an investment property, the analysis can be very different.",
          "You may need to consider rental yield, vacancy risk, maintenance costs, liquidity, tenant demand, financing costs, capital appreciation potential, and your expected holding period.",
          "For example, a ₹1.2 crore property generating ₹30,000 in monthly rent may look attractive because of its location, but an investor should calculate the actual yield after considering expenses and other costs.",
          "A professional can help you ask the right questions and evaluate the property objectively.",
          "A home should fit your life. An investment should fit your financial strategy.",
        ],
      },
      {
        heading: "8. Do You Really Have Access to the Entire Market?",
        paragraphs: [
          "Another advantage of a good agent is access.",
          "Not every property is publicly advertised. Some owners prefer discreet transactions. Some sellers may only consider buyers introduced through trusted relationships. Developers may also have different inventory, payment structures, offers, or availability at different points in time.",
          "A professional who actively operates in a particular market may have access to opportunities that aren't immediately visible through online searches.",
          "This doesn't mean every off-market property is a better opportunity. It simply means that your pool of options can be wider when you have someone with an established network.",
          "The best property isn't necessarily the one you find first on a portal.",
          "Sometimes, the right opportunity is the one you wouldn't have found on your own.",
        ],
      },
      {
        heading:
          "Verdict: Finding a Property vs Finding a Property with a Professional",
        paragraphs: [
          "You can absolutely search for properties yourself. Technology has made property discovery easier than ever before.",
          "But finding a property and making a good property decision are two very different things.",
          "A good real estate agent brings market knowledge, access to opportunities, negotiation expertise, transaction experience, and coordination throughout the process. More importantly, they can provide an objective perspective when a transaction involves significant money and strong emotions.",
          "The real question isn't: “Can I find a property without any professional help?”",
          "You can.",
          "The better question is: “Would having a professional who can help me identify the right opportunity, understand its value, negotiate effectively, coordinate the transaction, and avoid costly mistakes be worth the value they provide?”",
          "Because anyone can find a property. The real skill is knowing which property to choose, what it is actually worth, and how to complete the transaction on the right terms.",
        ],
      },
    ],
  },
  {
    title: "Why Do You Need an Insurance Professional?",
    category: CATEGORIES[2],
    content: [
      {
        paragraphs: [
          "Today, buying insurance is easier than ever. You can compare premiums online, read reviews, check policy features, and purchase a policy within minutes. So the obvious question is: if you can buy insurance yourself, why do you need an insurance agent?",
          "Because insurance isn't simply a product you purchase. It is a risk-management strategy designed to protect your income, savings, family, health, assets, and financial goals from events that you cannot predict. Whether it is term insurance, health insurance, motor insurance, home insurance, or other general insurance, choosing the right policy requires more than comparing premiums.",
          "A good insurance professional helps you understand the risk, determine the protection you need, choose appropriate coverage, understand the fine print, and review your protection as your life changes.",
        ],
      },
      {
        heading: "Do You Know What Risks You Actually Need to Protect Against?",
        paragraphs: [
          "Before buying any insurance, the first question should be: what could financially disrupt your life?",
          "For someone with a family that depends on their income, the biggest risk may be the loss of their earning capacity. For another person, it could be a major medical expense. For a homeowner, it could be damage to their property. For a vehicle owner, it could be an accident, theft, or third-party liability.",
          "This is why insurance planning should start with understanding your financial responsibilities and risks, rather than starting with a policy or premium.",
          "A professional can look at your income, liabilities, dependents, assets, lifestyle, and existing insurance and help identify where significant financial gaps may exist.",
          "The goal isn't to insure everything. It is to protect yourself against the risks that could cause the greatest financial damage.",
        ],
      },
      {
        heading: "Do You Have Enough Term Insurance to Protect Your Family?",
        paragraphs: [
          "Term insurance is primarily designed to protect your family's financial future if something happens to you during the policy term.",
          "Consider someone earning ₹15 lakh annually with a spouse, two children, a ₹70 lakh home loan, and long-term education and retirement goals. A ₹50 lakh life cover may sound substantial, but would it actually replace the income and financial support the family would lose?",
          "The appropriate amount of life cover depends on factors such as income, existing assets, outstanding liabilities, dependents, future financial goals, and the years of income that need to be protected.",
          "A professional can help you calculate the financial gap rather than simply recommending a round number.",
          "Term insurance can also involve decisions around policy duration, premium payment options, riders, and other features. These choices should be evaluated based on your circumstances rather than simply choosing the cheapest premium.",
          "Term insurance isn't about putting a value on your life. It's about protecting the financial commitments that depend on your income.",
        ],
      },
      {
        heading: "3. Do You Really Understand Your Health Insurance?",
        paragraphs: [
          "Health insurance is another area where choosing a policy based purely on the premium can create problems later.",
          "Two policies may both offer ₹10 lakh of coverage but have very different terms and conditions. Differences may exist in areas such as waiting periods, room-rent restrictions, co-payments, deductibles, disease-specific limits, restoration benefits, exclusions, network hospitals, and other policy conditions.",
          "For example, a policy with a lower premium may look attractive initially, but if it has restrictions that are unsuitable for your circumstances, the apparent saving may not be worth it.",
          "Your health insurance requirements may also change over time. A young individual may have different needs from a family with children or ageing parents. As medical costs increase, relying solely on employer-provided health insurance may also leave gaps, particularly when changing jobs or retiring.",
          "An insurance professional can help you understand the differences between policies and assess whether your coverage, limits, and overall protection are appropriate.",
          "The cheapest health insurance isn't necessarily the best value. The right policy is the one that provides meaningful protection when you actually need medical care.",
        ],
      },
      {
        heading: "What About the Risks Beyond Life and Health?",
        paragraphs: [
          "Insurance isn't limited to term and health insurance.",
          "Your car, home, business, travel, and other assets can also expose you to financial risks. This is where general insurance becomes important.",
          "Motor insurance can protect against risks associated with accidents, theft, and third-party liabilities, subject to the policy terms. Home insurance can provide protection against specified risks affecting your property and belongings. Travel insurance can help cover certain unexpected expenses during a trip. Businesses may require different forms of protection depending on their operations and risks.",
          "The important point is that every person does not need every type of insurance.",
          "For example, someone who owns a car has different risks from someone who owns a commercial property or operates a business. The objective should be to identify the risks that could create a significant financial setback and determine whether transferring some of that risk through insurance makes sense.",
          "Insurance planning is not about collecting policies. It's about identifying risks and deciding which ones should be insured.",
        ],
      },
      {
        heading: "Are You Choosing the Cheapest Policy? or the Right Policy?",
        paragraphs: [
          "Premium is one of the easiest things to compare.",
          "Coverage is much harder.",
          "Suppose one health insurance policy costs ₹20,000 per year and another costs ₹25,000. Saving ₹5,000 may seem attractive. But if the cheaper policy has less suitable coverage, more restrictive conditions, or features that don't match your requirements, the lower premium may not represent better value.",
          "The same applies to term and general insurance.",
          "A professional can help compare policies based on coverage, exclusions, limits, conditions, features, insurer suitability, and your specific requirements, rather than simply choosing the lowest premium.",
          "This doesn't mean the most expensive policy is automatically better either.",
          "The objective is value, not the lowest price or the highest price.",
        ],
      },
      {
        heading: "What Happens When You Actually Need to Make a Claim?",
        paragraphs: [
          "This is where the true importance of insurance becomes clear.",
          "When you're healthy and everything is going well, insurance can feel like an unnecessary expense. But when a family member is hospitalised, a vehicle is involved in an accident, property is damaged, or a family loses its primary earner, the policy suddenly becomes extremely important.",
          "At that point, you may have to deal with documentation, claim procedures, policy conditions, timelines, and communication with the insurer, often while already dealing with a stressful situation.",
          "An insurance agent can serve as a point of contact, helping you understand the process and the documentation required and assisting with communication where appropriate.",
          "However, an agent cannot guarantee that a claim will be approved. The insurer ultimately assesses claims according to the policy's terms and conditions.",
          "The value of professional support is that you don't have to figure out the entire process alone.",
          "You buy insurance hoping you never need it. But when you do need it, understanding how to use it matters.",
        ],
      },
      {
        heading: "Does Your Insurance Still Match Your Life?",
        paragraphs: [
          "Your insurance requirements change as your life changes.",
          "When you're young and single, your financial responsibilities may be relatively limited. Later, you may get married, have children, purchase a home, take loans, start a business, support parents, or significantly increase your income.",
          "Every one of these changes can affect your insurance requirements.",
          "For example, someone who purchased ₹50 lakh of term insurance early in their career may later have a ₹1 crore home loan, two children, and significantly higher income. Their original cover may no longer provide the same level of financial protection.",
          "Similarly, a health insurance policy purchased when you were single may not be sufficient once you have a family. Your general insurance requirements may also change as your assets and responsibilities grow.",
          "This is why insurance should be reviewed periodically, rather than purchased once and forgotten.",
          "Your responsibilities evolve. Your protection should evolve with them.",
        ],
      },
      {
        heading:
          "Do You Know What Your Family Would Have to Do Without Your Income?",
        paragraphs: [
          "This may be the most uncomfortable question, but it is also one of the most important.",
          "If your income disappeared tomorrow, how long could your family maintain their current lifestyle?",
          "Could they continue paying the home loan? What about children's education? Household expenses? Existing loans? Medical costs? Long-term financial goals?",
          "Term insurance can help address the financial consequences of losing an income. Health insurance can help reduce the impact of major medical expenses. General insurance can protect certain assets and liabilities against specified risks.",
          "Together, these forms of protection can become an important part of a broader financial plan.",
          "The purpose isn't to create fear or convince someone to buy unnecessary policies.",
          "It is to ensure that one unexpected event doesn't force years of savings and investments to be used for a risk that could have been appropriately insured.",
          "You spend years building wealth. Insurance helps protect the financial foundation you're building.",
        ],
      },
      {
        heading: "9. Do You Need More Policies? or Better Protection?",
        paragraphs: [
          "Having five insurance policies doesn't necessarily mean you are adequately protected.",
          "Someone may have multiple small life policies but still have insufficient term cover. Another person may have health insurance through their employer but no personal policy. Someone else may have comprehensive motor insurance but no protection for their home or business risks.",
          "A professional can review your existing policies as a portfolio, identify what you already have, highlight potential gaps or overlaps, and help determine whether additional coverage is actually necessary.",
          "The objective isn't to keep adding policies every year.",
          "The objective is to have the right protection for the risks that matter most.",
        ],
      },
      {
        heading:
          "Verdict: Buying Insurance Online vs. Buying Insurance with a Professional",
        paragraphs: [
          "You can absolutely buy insurance online. Technology has made insurance more accessible than ever before.",
          "But buying insurance and planning your protection are two very different things.",
          "A good insurance agent can help you understand your risks, determine appropriate coverage, compare suitable policies, explain important conditions, review your protection as your circumstances change, and provide guidance when you need to navigate the claims process.",
          "Whether it is term insurance to protect your family's income, health insurance to protect your savings from medical expenses, or general insurance to protect your assets and liabilities, the objective remains the same: protecting the financial life you've worked hard to build.",
          "The real question isn't: “Can I buy insurance without an agent?”",
          "You can.",
          "The better question is: “Would having a professional who understands my financial situation, helps me identify the right risks, chooses appropriate protection, and stays with me as my circumstances change be worth the value they provide?”",
          "Because insurance isn't about buying a policy. It's about transferring the financial risks you cannot afford to take on yourself.",
        ],
      },
    ],
  },
];

/* ---------- helpers ---------- */

function estimateReadMinutes(article: Article) {
  const words = article.content.reduce((sum, section) => {
    const headingWords = section.heading
      ? section.heading.split(/\s+/).length
      : 0;
    const bodyWords = section.paragraphs.join(" ").split(/\s+/).length;
    return sum + headingWords + bodyWords;
  }, 0);
  return Math.max(1, Math.round(words / 220));
}

/* ---------- article modal ---------- */

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleScroll() {
    const el = contentRef.current;
    if (!el) return;

    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);

    let current = 0;
    sectionRefs.current.forEach((node, i) => {
      if (node && node.offsetTop - el.offsetTop <= el.scrollTop + 96) {
        current = i;
      }
    });
    setActiveSection(current);
  }

  const headedSections = article.content
    .map((section, index) => ({ ...section, index }))
    .filter((section) => Boolean(section.heading));

  const Icon = CATEGORY_ICON[article.category.key];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--accent)]/45 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
        className="relative flex max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
      >
        <div
          className="absolute left-0 top-0 z-10 h-[3px] bg-[var(--text)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />

        {headedSections.length > 1 && (
          <nav
            className="scrollbar-hide hidden w-56 shrink-0 overflow-y-auto border-r border-[var(--border)] bg-[var(--surface-2)] p-6 lg:block"
            aria-label="Sections in this article"
          >
            <p className="text-xs font-medium text-[var(--muted)]">
              In this article
            </p>
            <ul className="mt-4 space-y-1">
              {headedSections.map((section) => (
                <li key={section.index}>
                  <button
                    type="button"
                    onClick={() =>
                      sectionRefs.current[section.index]?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm leading-snug transition ${
                      activeSection === section.index
                        ? "bg-[var(--accent-soft)] font-medium text-[var(--text)]"
                        : "text-[var(--muted)] hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {section.heading}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-6 border-b border-[var(--border)] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--text)]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-[var(--text)]">
                  {article.category.label}
                </p>
                <h2
                  id="article-modal-title"
                  className="text-lg font-semibold tracking-tight text-[var(--foreground)] sm:text-xl"
                >
                  {article.title}
                </h2>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close article"
              className="shrink-0 rounded-full p-2 text-[var(--muted)] transition hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="scrollbar-hide flex-1 overflow-y-auto px-6 py-7 sm:px-8 sm:py-8"
          >
            <div className="mx-auto max-w-2xl space-y-8">
              {article.content.map((section, index) => (
                <section
                  key={`${section.heading ?? "intro"}-${index}`}
                  ref={(node) => {
                    sectionRefs.current[index] = node;
                  }}
                >
                  {section.heading && (
                    <h3 className="mb-3 text-lg font-semibold text-[var(--foreground)]">
                      {section.heading}
                    </h3>
                  )}
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-sm leading-7 text-[var(--muted)] sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- main section ---------- */

export function ArticlesSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [activeFilter, setActiveFilter] = useState<Category["key"] | "all">(
    "all",
  );

  const searchParams = useSearchParams();
  const articleFilter = searchParams.get("article");

  useEffect(() => {
    if (
      articleFilter === "mutual-funds" ||
      articleFilter === "real-estate" ||
      articleFilter === "insurance"
    ) {
      setActiveFilter(articleFilter);
    } else {
      setActiveFilter("all");
    }
  }, [articleFilter]);

  const filteredArticles = useMemo(
    () =>
      activeFilter === "all"
        ? articles
        : articles.filter((a) => a.category.key === activeFilter),
    [activeFilter],
  );
  return (
    <>
      <section
        id="articles"
        className="border-b border-[var(--border)] py-16 sm:py-20"
        aria-labelledby="articles-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="articles-heading"
                className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
              >
                Articles
              </h2>

              <p className="mt-2 max-w-lg text-sm text-[var(--muted)]">
                Straight answers on mutual funds, real estate, and insurance,
                written for people who&apos;d rather understand their money than
                guess at it.
              </p>
            </div>

            <div
              className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end"
              role="group"
              aria-label="Filter articles by category"
            >
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  activeFilter === "all"
                    ? "border-[var(--text)] bg-[var(--text)] text-white"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)]/40 hover:text-[var(--foreground)]"
                }`}
              >
                All
              </button>

              {CATEGORIES.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveFilter(category.key)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    activeFilter === category.key
                      ? "border-[var(--text)] bg-[var(--text)] text-white"
                      : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)]/40 hover:text-[var(--foreground)]"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {filteredArticles.map((article) => {
              const Icon = CATEGORY_ICON[article.category.key];

              return (
                <article
                  key={article.title}
                  onClick={() => setSelectedArticle(article)}
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--text)]/30 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full group-hover:bg-[var(--text)] group-hover:text-white bg-[var(--accent-soft)] text-[var(--text)] transition group-hover:scale-105 duration-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-[var(--text)]">
                      {article.category.label}
                    </span>
                  </div>
                  <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug text-[var(--foreground)]">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
                    {article.content[0].paragraphs[0]}
                  </p>

                  <div className="mt-6 flex items-end justify-between border-t border-[var(--border)] pt-5">
                    <span className="text-xs text-[var(--muted)]">
                      {estimateReadMinutes(article)} min read
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text)] transition group-hover:gap-2.5"
                    >
                      Read full article
                      <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
}
