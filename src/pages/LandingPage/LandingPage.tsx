import {useState} from 'react'
import { CheckCircle, ChevronUp} from 'lucide-react'
import faqs from '../../faq.json'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
interface FAQ {
    question: string;
    answer: string;
  }
export default function LandingPage() {

    const [visibleItems, setVisibleItems] = useState<{[key: number]: boolean}>({});
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();
    if(isAuthenticated){
        navigate('/home')
    }
    const handleToggle = (index: number) => {
      setVisibleItems(prevState  => ({
        ...prevState,
        [index]: !prevState[index],
      }))
    };

  return (
    <div className="w-full ">
      
      {/* Hero Section */}
      <div className="relative w-full bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
              WE will CHAT and Save TIME for YOU
            </h1>
            <p className="mt-8 text-lg text-gray-700">
              Trained Agents will Chat with your Users and help them about the information within NO TIME.
            </p>
            
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6 lg:row-span-5">
  <div className="m-4 overflow-hidden rounded-lg shadow-lg">
    <img
      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
      src="https://blog.formilla.com/wp-content/uploads/2021/01/chat-bot-vector-ai-graphic-e1609975066435.png"
      alt="Chatbot Illustration"
    />
  </div>
</div>



        </div>
      </div>
      {/* Features Section */}
      <div className="mx-auto my-32 max-w-7xl px-2 lg:px-8">
        <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-9 w-9 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Privacy</h3>
            <p className="mt-4 text-sm text-gray-600">
              We care about privacy. We train on what you provide. Upload docs and links then we give you an powerful agent to handle your customers.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
              <svg
                className="h-9 w-9 text-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Fast and Efficient</h3>
            <p className="mt-4 text-sm text-gray-600">
              Using the power of AI we train the bot on data you provide to provide powerful agents.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-9 w-9 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Update and Version</h3>
            <p className="mt-4 text-sm text-gray-600">
              Have functionality to add or remove the training files whenever you want to update agent.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-9 w-9 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">Filter</h3>
            <p className="mt-4 text-sm text-gray-600">
              We help you to filter the customers for you to give a list of customers who interacted to our bot and what sort of things they asked.
            </p>
          </div>
        </div>
      </div>
            {/* Pricing Section */}
            <div className="mx-auto my-12 max-w-7xl md:my-24 lg:my-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="px-4 py-10 lg:col-span-5 lg:px-0">
            <span className="mb-8 inline-block rounded-full border p-1 px-3 text-xs font-semibold">
              Pricing that fits your budget
            </span>
            <h1 className="text-3xl font-bold md:text-5xl">
              Best Fit For YOU
            </h1>
            <p className="mt-8 font-medium">
              Our customers are happy with the chat we do for them.</p>
              <p className="mt-8 font-medium">Some are building FOUNDATION. </p>
              <p className="mt-8 font-medium">Some are staying in SUMMIT.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row lg:col-span-7">
            <div className="w-full p-5 md:w-1/2">
              <div className="rounded-md border bg-white bg-opacity-90">
                <div className=" border-b">
                  <div className="px-9 py-7">
                    <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">Foundation</h3>
                    <p className="font-medium leading-relaxed text-gray-500">
                      Start here to reach summit with the foundation.
                    </p>
                  </div>
                </div>
                <div className="px-9 pb-9 pt-8">
                  <p className="mb-6 font-medium leading-relaxed text-gray-600">
                    Features included:
                  </p>
                  <ul className="mb-11">
                    <li className="mb-4 flex items-center">
                      <CheckCircle className="mr-2" size={16} />
                      <p className="font-semibold leading-normal">3 polished Bots</p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <CheckCircle className="mr-2" size={16} />
                      <p className="font-semibold leading-normal">12000 Conversations</p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <CheckCircle className="mr-2" size={16} />
                      <p className="font-semibold leading-normal">Lead Tracking</p>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2" size={16} />
                      <p className="font-semibold leading-normal">Support</p>
                    </li>
                  </ul>
                  <p className="mb-6 text-lg font-semibold leading-normal text-gray-600">
                    <span>Starting from</span>
                    <span className="ml-2 text-gray-900">$29/mo</span>
                  </p>
                  <div className="md:inline-block">
                    <button
                      type="button"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Start with Foundation
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-5 md:w-1/2">
              <div className="rounded-md border bg-white bg-opacity-90">
                <div className=" border-b">
                  <div className="px-9 py-7">
                    <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900">Summit</h3>
                    <p className="font-medium leading-relaxed text-gray-500">
                      Start here to stay in summit with customers.
                    </p>
                  </div>
                </div>
                <div className="px-9 pb-9 pt-8">
                  <p className="mb-6 font-medium leading-relaxed text-gray-600">
                    Features included:
                  </p>
                  <ul className="mb-11">
                    <li className="mb-4 flex items-center">
                      <CheckCircle className="mr-2" size={16} />
                      <p className="font-semibold leading-normal">5 polished Bots</p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <CheckCircle className="mr-2" size={16} />
                      <p className="font-semibold leading-normal">50000+ Conversations</p>
                    </li>
                    <li className="mb-4 flex items-center">
                      <CheckCircle className="mr-2" size={16} />
                      <p className="font-semibold leading-normal">Lead Tracking and Email </p>
                    </li>
                    
                    <li className="flex items-center">
                      <CheckCircle className="mr-2" size={16} />
                      <p className="font-semibold leading-normal">Premium Support</p>
                    </li>
                  </ul>
                  <p className="mb-6 text-lg font-semibold leading-normal text-gray-600">
                    <span>Starting from</span>
                    <span className="ml-2 text-gray-900">$49/mo</span>
                  </p>
                  <div className="md:inline-block">
                    <button
                      type="button"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Start from Summit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FAQs */}
      <section className="mx-auto max-w-7xl bg-gray-50 px-2 py-10 md:px-0">
        <div>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, assumenda
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 md:mt-16">
          {faqs.map((faq: FAQ, i: number) => (
        <div key={i} className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
          <button
            type="button"
            className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
            onClick={() => handleToggle(i)}
          >
            <span className="flex text-lg font-semibold text-black">{faq.question}</span>
            <ChevronUp className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${visibleItems[i] ? 'rotate-180' : ''}`} />
          </button>
          {visibleItems[i] && (
            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
          </div>
          <p className="textbase mt-6 text-center text-gray-600">
            Can&apos;t find what you&apos;re looking for?{' '}
            <a href="#" title="" className="font-semibold text-black hover:underline">
              Contact our support
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
