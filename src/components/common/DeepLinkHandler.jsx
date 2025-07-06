import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DeepLinkHandler = () => {
    const { vendorId } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleDeepLink = () => {
            const userAgent = navigator.userAgent;
            const sanitizedVendorId = encodeURIComponent(vendorId);

            // Deep link format for your app using backticks for template literals
            const appLink = `ontrend://vendor/${sanitizedVendorId}`;

            // Check if the user is on Android
            if (userAgent.includes('Android')) {
                window.location.href = appLink;

                // Redirect to the Play Store if the app is not installed
                setTimeout(() => {
                    window.location.href = 'https://play.google.com/store/apps/details?id=com.ontrendcustomer.app&pcampaignid=web_share';
                }, 1000);
            }
            // Check if the user is on iOS
            else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
                window.location.href = appLink;

                // Redirect to the App Store if the app is not installed
                setTimeout(() => {
                    window.location.href = 'https://apps.apple.com/om/app/ontrend-oman/id6708237851'; // Replace with your actual App ID
                }, 1000);
            }
            // Fallback for desktop users
            else {
                window.location.href = `https://ontrend.live/vendor/${sanitizedVendorId}`;
            }
        };

        try {
            handleDeepLink();
        } catch (error) {
            console.error('Deep link handling failed:', error);
            setLoading(false);
        }

        // Simulate a loading state for 2 seconds
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Cleanup the timeout on component unmount
        return () => clearTimeout(loadingTimeout);
    }, [vendorId]);

    return (
        <div>
            {loading ? (
                <p>Redirecting to the Ontrend app...</p>
            ) : (
                <p>
                    If you are not redirected, please click{' '}
                    <a href={`https://ontrend.live/vendor/${encodeURIComponent(vendorId)}`}>here</a>.
                </p>
            )}
        </div>
    );
};

export default DeepLinkHandler;