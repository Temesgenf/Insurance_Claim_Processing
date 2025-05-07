import React, { useState } from 'react';

const TAB_LIST = [
  { key: 'overview', label: 'Overview' },
  { key: 'coverages', label: 'Coverages' },
  { key: 'keyFeatures', label: 'Key Features' },
  { key: 'terminologies', label: 'Terminologies' },
  { key: 'claimProcess', label: 'Claim Process' },
];

interface ProductTabsProps {
  product: any; // Structure from productsData
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = product.tabs;

  return (
    <div>
      <div className="flex border-b border-yellow-400 bg-white rounded-t-xl overflow-x-auto">
        {TAB_LIST.map((tab, idx) => (
          <button
            key={tab.key}
            className={`px-8 py-3 text-base font-semibold focus:outline-none transition-colors duration-200
              ${activeTab === tab.key
                ? 'bg-green-400 text-black rounded-t-xl shadow-sm'
                : 'bg-white text-black hover:bg-green-200'}
            `}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-bold mb-2">What is {product.name}?</h2>
            <p className="text-gray-800 text-lg">{tabs.overview}</p>
          </div>
        )}
        {activeTab === 'coverages' && (
          <div>
            <h2 className="text-xl font-bold mb-2">Coverages</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {tabs.coverages.map((c: string, i: number) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'keyFeatures' && (
          <div>
            <h2 className="text-xl font-bold mb-2">Key Features</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {tabs.keyFeatures.map((f: string, i: number) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'terminologies' && (
          <div>
            <h2 className="text-xl font-bold mb-2">Terminologies</h2>
            <ul className="list-disc ml-6 text-gray-800">
              {tabs.terminologies.map((t: string, i: number) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'claimProcess' && (
          <div>
            <h2 className="text-xl font-bold mb-2">Claim Process</h2>
            <ol className="list-decimal ml-6 text-gray-800">
              {tabs.claimProcess.map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
