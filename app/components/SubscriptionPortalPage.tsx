import { ExternalLink } from 'lucide-react';

interface SubscriptionPortalPageProps {
  portalUrl: string | null;
}

export const SubscriptionPortalPage = ({ portalUrl }: SubscriptionPortalPageProps) => {
  const openPortalInNewWindow = () => {
    if (portalUrl) {
      window.open(portalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // TODO - add some metadata about the subscription

  return (
    <div>
      {/* Header section matching Clerk's style */}
      <div className="border-b border-[rgba(255,255,255,0.07)] pb-4">
        <h2 className="text-[16px] font-bold text-gray-100">Subscription details</h2>
      </div>

      {/* Content sections */}
      <div className="divide-y divide-gray-100">
        {/* Subscription Status Section */}
        <div className="py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-200">Customer Portal</h3>
              <p className="mt-1 text-sm text-gray-400">
                Manage your subscription and billing
              </p>
            </div>
            {portalUrl ? (
              <button
                onClick={openPortalInNewWindow}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none cursor-pointer"
              >
                Open Portal
                <ExternalLink size={14} />
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}; 