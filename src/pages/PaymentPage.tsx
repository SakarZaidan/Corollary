import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { useUserStore } from "../store/userStore";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import { FiCheck, FiX, FiCreditCard, FiLock, FiHelpCircle, FiArrowLeft, FiArrowRight } from "react-icons/fi";

export function PaymentPage() {
  const { user, profile, isAuthenticated } = useUserStore();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: plan selection, 1: payment details

  // Pricing data
  const pricingPlans = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for beginners and casual learners",
      price: { monthly: 0, yearly: 0 },
      features: [
        { text: "5 projects", included: true },
        { text: "Basic visualizations", included: true },
        { text: "Community support", included: true },
        { text: "Standard export options", included: true },
        { text: "Limited scene complexity", included: false },
        { text: "Advanced customization", included: false },
        { text: "Priority support", included: false },
        { text: "Offline access", included: false },
      ],
      cta: "Current Plan",
      popular: false,
      color: "bg-primary-main",
      borderColor: "border-white/10",
    },
    {
      id: "pro",
      name: "Pro",
      description: "For students and educators who need more power",
      price: { monthly: 12, yearly: 99 },
      features: [
        { text: "Unlimited projects", included: true },
        { text: "Advanced visualizations", included: true },
        { text: "Email support", included: true },
        { text: "All export options", included: true },
        { text: "High scene complexity", included: true },
        { text: "Advanced customization", included: true },
        { text: "Priority support", included: false },
        { text: "Offline access", included: false },
      ],
      cta: "Get Pro",
      popular: true,
      color: "bg-gradient-to-br from-accent-purple to-accent-blue",
      borderColor: "border-accent-purple",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For institutions and research teams",
      price: { monthly: 49, yearly: 499 },
      features: [
        { text: "Unlimited projects", included: true },
        { text: "All visualizations", included: true },
        { text: "Dedicated support", included: true },
        { text: "All export options", included: true },
        { text: "Unlimited scene complexity", included: true },
        { text: "Advanced customization", included: true },
        { text: "Priority support", included: true },
        { text: "Offline access", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
      color: "bg-primary-main",
      borderColor: "border-white/10",
    },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated amount for the remainder of your billing cycle. If you downgrade, you'll receive credit towards your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), as well as PayPal. For Enterprise plans, we also offer invoice payment options."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all paid plans come with a 14-day free trial. You won't be charged until the trial period ends, and you can cancel anytime during the trial."
    },
    {
      question: "Do you offer educational discounts?",
      answer: "Yes, we offer special pricing for educational institutions. Contact our sales team for more information about our educational licensing options."
    },
    {
      question: "How do refunds work?",
      answer: "If you're not satisfied with your purchase, you can request a refund within 30 days of your initial purchase. For annual subscriptions, we offer prorated refunds after the 30-day period."
    },
  ];

  // Calculate current price based on selected plan and billing cycle
  const getCurrentPrice = () => {
    const plan = pricingPlans.find(p => p.id === selectedPlan);
    return plan ? plan.price[billingCycle] : 0;
  };

  // Calculate savings percentage for yearly billing
  const calculateSavings = (plan) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyTotal = plan.price.yearly;
    return Math.round((monthlyTotal - yearlyTotal) / monthlyTotal * 100);
  };

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <DashboardHeader />
      <Container>
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {checkoutStep === 0 ? (
              <>
                {/* Pricing Header */}
                <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
                  <p className="text-neutral-light max-w-2xl mx-auto">
                    Select the perfect plan for your needs. All plans include access to our core visualization features.
                  </p>
                  
                  {/* Billing Toggle */}
                  <div className="mt-8 inline-flex items-center bg-primary-main p-1 rounded-lg border border-white/10">
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-accent-purple text-white' : 'text-neutral-light hover:text-white'}`}
                      onClick={() => setBillingCycle("monthly")}
                    >
                      Monthly
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === 'yearly' ? 'bg-accent-purple text-white' : 'text-neutral-light hover:text-white'}`}
                      onClick={() => setBillingCycle("yearly")}
                    >
                      Yearly
                      <span className="ml-1 text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                        Save 20%
                      </span>
                    </button>
                  </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {pricingPlans.map((plan) => {
                    const isCurrentPlan = user && user.subscription === plan.id;
                    const savings = calculateSavings(plan);
                    
                    return (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: pricingPlans.indexOf(plan) * 0.1 }}
                        className={`rounded-xl overflow-hidden ${plan.popular ? 'ring-2 ring-accent-purple' : 'border border-white/10'} relative flex flex-col h-full`}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 bg-accent-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            Most Popular
                          </div>
                        )}
                        <div className={`${plan.color} p-6`}>
                          <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                          <p className="text-sm text-white/80 mb-4">{plan.description}</p>
                          <div className="mb-4">
                            <span className="text-3xl font-bold">
                              ${plan.price[billingCycle]}
                            </span>
                            {plan.price[billingCycle] > 0 && (
                              <span className="text-white/80 ml-1">
                                /{billingCycle === 'monthly' ? 'month' : 'year'}
                              </span>
                            )}
                          </div>
                          {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                            <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full inline-block mb-4">
                              Save {savings}% with annual billing
                            </div>
                          )}
                        </div>
                        <div className="bg-primary-main p-6 flex-grow">
                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                {feature.included ? (
                                  <FiCheck className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <FiX className="h-5 w-5 text-neutral-light mr-2 flex-shrink-0 mt-0.5" />
                                )}
                                <span className={feature.included ? 'text-white' : 'text-neutral-light'}>
                                  {feature.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-primary-main p-6 border-t border-white/10">
                          {isCurrentPlan ? (
                            <Button
                              variant="outline"
                              className="w-full"
                              disabled
                            >
                              Current Plan
                            </Button>
                          ) : plan.id === 'enterprise' ? (
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => window.location.href = '/contact'}
                            >
                              Contact Sales
                            </Button>
                          ) : (
                            <Button
                              variant={plan.popular ? "gradient" : "outline"}
                              className="w-full"
                              onClick={() => {
                                setSelectedPlan(plan.id);
                                setCheckoutStep(1);
                              }}
                            >
                              {plan.price[billingCycle] > 0 ? 'Select Plan' : 'Get Started'}
                            </Button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Feature Comparison */}
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-8 text-center">Compare All Features</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-4 px-6 text-left">Feature</th>
                          {pricingPlans.map(plan => (
                            <th key={plan.id} className="py-4 px-6 text-center">{plan.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="py-4 px-6 font-medium">Projects</td>
                          <td className="py-4 px-6 text-center">5</td>
                          <td className="py-4 px-6 text-center">Unlimited</td>
                          <td className="py-4 px-6 text-center">Unlimited</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-4 px-6 font-medium">Visualization Types</td>
                          <td className="py-4 px-6 text-center">Basic</td>
                          <td className="py-4 px-6 text-center">Advanced</td>
                          <td className="py-4 px-6 text-center">All</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-4 px-6 font-medium">Scene Complexity</td>
                          <td className="py-4 px-6 text-center">Limited</td>
                          <td className="py-4 px-6 text-center">High</td>
                          <td className="py-4 px-6 text-center">Unlimited</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-4 px-6 font-medium">Export Options</td>
                          <td className="py-4 px-6 text-center">Standard</td>
                          <td className="py-4 px-6 text-center">All</td>
                          <td className="py-4 px-6 text-center">All</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-4 px-6 font-medium">Support</td>
                          <td className="py-4 px-6 text-center">Community</td>
                          <td className="py-4 px-6 text-center">Email</td>
                          <td className="py-4 px-6 text-center">Dedicated</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-4 px-6 font-medium">Offline Access</td>
                          <td className="py-4 px-6 text-center"><FiX className="h-5 w-5 text-neutral-light mx-auto" /></td>
                          <td className="py-4 px-6 text-center"><FiX className="h-5 w-5 text-neutral-light mx-auto" /></td>
                          <td className="py-4 px-6 text-center"><FiCheck className="h-5 w-5 text-green-400 mx-auto" /></td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-4 px-6 font-medium">Team Collaboration</td>
                          <td className="py-4 px-6 text-center"><FiX className="h-5 w-5 text-neutral-light mx-auto" /></td>
                          <td className="py-4 px-6 text-center">Limited</td>
                          <td className="py-4 px-6 text-center">Advanced</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 font-medium">Custom Branding</td>
                          <td className="py-4 px-6 text-center"><FiX className="h-5 w-5 text-neutral-light mx-auto" /></td>
                          <td className="py-4 px-6 text-center"><FiX className="h-5 w-5 text-neutral-light mx-auto" /></td>
                          <td className="py-4 px-6 text-center"><FiCheck className="h-5 w-5 text-green-400 mx-auto" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                  <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqItems.map((item, index) => (
                      <div key={index} className="bg-primary-main rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <FiHelpCircle className="mr-2 text-accent-purple" />
                          {item.question}
                        </h3>
                        <p className="text-neutral-light">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                  <p className="mb-6 max-w-2xl mx-auto">Our team is here to help you find the perfect plan for your needs. Contact us for a personalized consultation.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="light">Contact Sales</Button>
                    <Button variant="outline" className="border-white/30 hover:border-white/50">
                      Schedule a Demo
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Checkout Process */}
                <div className="max-w-2xl mx-auto">
                  <button 
                    className="flex items-center text-neutral-light hover:text-white mb-6"
                    onClick={() => setCheckoutStep(0)}
                  >
                    <FiArrowLeft className="mr-2" />
                    Back to Plans
                  </button>
                  
                  <div className="bg-primary-main rounded-xl border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                      <h2 className="text-xl font-bold mb-1">Complete Your Purchase</h2>
                      <p className="text-neutral-light">You're just a few steps away from upgrading your experience</p>
                    </div>
                    
                    <div className="p-6">
                      {/* Order Summary */}
                      <div className="mb-8">
                        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                        <div className="bg-primary-dark rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <span>Plan</span>
                            <span className="font-medium">
                              {pricingPlans.find(p => p.id === selectedPlan)?.name} ({billingCycle})
                            </span>
                          </div>
                          {billingCycle === 'yearly' && (
                            <div className="flex justify-between mb-2 text-sm text-neutral-light">
                              <span>Yearly discount</span>
                              <span className="text-green-400">
                                -{calculateSavings(pricingPlans.find(p => p.id === selectedPlan))}%
                              </span>
                            </div>
                          )}
                          <div className="border-t border-white/10 my-2 pt-2">
                            <div className="flex justify-between font-medium">
                              <span>Total</span>
                              <span>${getCurrentPrice()}{billingCycle === 'monthly' ? '/month' : '/year'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Form */}
                      <form>
                        <h3 className="text-lg font-medium mb-4">Payment Details</h3>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">Card Information</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FiCreditCard className="h-5 w-5 text-neutral-light" />
                            </div>
                            <input 
                              type="text" 
                              placeholder="Card number"
                              className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-lg bg-primary-dark focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Expiration Date</label>
                            <input 
                              type="text" 
                              placeholder="MM/YY"
                              className="block w-full px-3 py-2.5 border border-white/10 rounded-lg bg-primary-dark focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Security Code</label>
                            <input 
                              type="text" 
                              placeholder="CVC"
                              className="block w-full px-3 py-2.5 border border-white/10 rounded-lg bg-primary-dark focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium mb-2">Name on Card</label>
                          <input 
                            type="text" 
                            placeholder="Full name"
                            className="block w-full px-3 py-2.5 border border-white/10 rounded-lg bg-primary-dark focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-sm font-medium mb-2">Billing Address</label>
                          <input 
                            type="text" 
                            placeholder="Address line 1"
                            className="block w-full px-3 py-2.5 border border-white/10 rounded-lg bg-primary-dark focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light mb-3"
                          />
                          <input 
                            type="text" 
                            placeholder="Address line 2 (optional)"
                            className="block w-full px-3 py-2.5 border border-white/10 rounded-lg bg-primary-dark focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light mb-3"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input 
                              type="text" 
                              placeholder="City"
                              className="block w-full px-3 py-2.5 border border-white/10 rounded-lg bg-primary-dark focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
                            />
                            <input 
                              type="text" 
                              placeholder="Postal code"
                              className="block w-full px-3 py-2.5 border border-white/10 rounded-lg bg-primary-dark focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-6">
                          <input 
                            type="checkbox" 
                            id="save-card" 
                            className="rounded border-white/20 text-accent-purple focus:ring-accent-purple bg-primary-dark"
                          />
                          <label htmlFor="save-card" className="ml-2 text-sm text-neutral-light">
                            Save this card for future payments
                          </label>
                        </div>
                        
                        <div className="flex flex-col space-y-4">
                          <Button variant="gradient" className="w-full py-3">
                            <FiLock className="mr-2" />
                            Complete Payment
                          </Button>
                          <p className="text-xs text-center text-neutral-light">
                            By completing your purchase, you agree to our <a href="/terms" className="text-accent-purple hover:underline">Terms of Service</a> and <a href="/privacy" className="text-accent-purple hover:underline">Privacy Policy</a>.
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </Container>
    </div>
  );
}