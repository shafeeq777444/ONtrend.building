import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReferralDeepLinkHandler = () => {
    const { referralCode } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleDeepLink = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const sanitizedReferralCode = encodeURIComponent(referralCode);
            const appLink = `ontrend://uvw/${sanitizedReferralCode}`;

            const isAndroid = /Android/i.test(userAgent);
            const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
            const isMobile = isAndroid || isIOS;

            console.log('ReferralDeepLinkHandler mounted.');
            console.log('User Agent:', userAgent);
            console.log('Referral Code:', referralCode);
            console.log('Sanitized Referral Code:', sanitizedReferralCode);
            console.log('App link generated:', appLink);

            if (isMobile) {
                console.log('Mobile device detected. Attempting to open app...');

                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = appLink;
                document.body.appendChild(iframe);

                const fallbackTimer = setTimeout(() => {
                    console.log('App did not open, fallback triggered.');

                    if (isAndroid) {
                        console.log('Redirecting to Play Store...');
                        window.location.href = 'https://play.google.com/store/apps/details?id=com.ontrendcustomer.app&pcampaignid=referral_share';
                    } else if (isIOS) {
                        console.log('Redirecting to App Store...');
                        window.location.href = 'https://apps.apple.com/om/app/ontrend-oman/id6708237851';
                    } else {
                        console.log('Redirecting to fallback website...');
                        window.location.href = `https://ontrend.live/uvw/${sanitizedReferralCode}`;
                    }
                }, 1500); // fallback timeout

                // Cleanup iframe and timeout if component unmounts
                return () => {
                    clearTimeout(fallbackTimer);
                    document.body.removeChild(iframe);
                };

            } else {
                console.log('Desktop detected. Redirecting to fallback website immediately...');
                window.location.href = `https://ontrend.live/referral/${sanitizedReferralCode}`;
            }
        };

        try {
            handleDeepLink();
        } catch (error) {
            console.error('Deep link handling failed:', error);
            setLoading(false);
        }

        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Cleanup loading timeout
        return () => clearTimeout(loadingTimeout);

    }, [referralCode]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {loading ? (
                <p>Redirecting to the Ontrend app...</p>
            ) : (
                <p>
                    If you are not redirected, please  click{' '}
                    <a href={`https://ontrend.live/referral/${encodeURIComponent(referralCode)}`}>
                        here
                    </a>.
                </p>
            )}
        </div>
    );
};

export default ReferralDeepLinkHandler;