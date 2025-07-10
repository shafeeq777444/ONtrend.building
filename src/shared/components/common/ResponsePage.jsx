/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { Button, Card } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import CryptoJS from "crypto-js";

function ResponsePage() {
    const [showConfetti, setShowConfetti] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [countdown, setCountDown] = useState(6);

    // Resource key and IV as per the integration (update these with your actual values)
    const resourceKey = "42744391192442744391192442744391"; // Replace with your actual resource key
    const iv = CryptoJS.enc.Utf8.parse("PGKEYENCDECIVSPC"); // Initialization vector used in the encryption process

    // Catch the trandata and paymentId from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const trandata = queryParams.get("trandata");
    const paymentId = queryParams.get("paymentId");

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        // Confetti will stop after 5 seconds
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (trandata) {
            console.log("Trandata received (encrypted):", trandata);
            const decryptedData = decryptTrandata(trandata);
            console.log("Decrypted trandata:", decryptedData);
        }

        if (paymentId) {
            console.log("PaymentId received:", paymentId);
        }
    }, [trandata, paymentId]);

    // Decrypt function for the trandata
    const decryptTrandata = (encryptedTrandata) => {
        try {
            // Convert hex string to word array format for CryptoJS
            const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedTrandata);

            // Decrypt using AES with CBC mode and PKCS7 padding
            const decrypted = CryptoJS.AES.decrypt(
                { ciphertext: encryptedBytes },
                CryptoJS.enc.Utf8.parse(resourceKey),
                {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                }
            );

            // Convert decrypted bytes to a UTF-8 string
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

            return decryptedText;
        } catch (error) {
            console.error("Error decrypting trandata:", error);
            return null;
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "5px", display: 'flex', justifyContent: 'stretch', flexDirection: 'column', alignItems: 'center' }}>
            {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

            {/* Display the checkmark icon */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/images/order-complete.gif" alt="Order Complete" style={{ width: '180px' }} />
            </div>
            <CheckCircleTwoTone style={{ fontSize: '54px', color: '#ff3131' }} twoToneColor="#4caf50" />
            <h2 style={{ fontWeight: "bold", marginTop: "10px" }}>Your payment is complete!</h2>
            <p>Congratulations! Your payment has been successfully processed, and we will process your order as soon as possible!</p>

            {/* Card to show order details */}
            <Card
                style={{ width: '90%', maxWidth: '500px', margin: '20px auto', borderRadius: '10px', border: '1px solid #eaeaea' }}
                bodyStyle={{ padding: '20px' }}
            >
                <h2>"Remember everything you desire is Just one click away"</h2>
                <p>While you wait for your order explore the wide variety of foods available on <strong>ONtrend</strong></p>
            </Card>
            <p>NB: <strong>Please don't refresh or close the portal, you'll be automatically taken back to our application</strong></p>
            {/* Button to go back to home */}
            <Button
                type="default"
                shape="round"
                size="large"
                style={{
                    width: '80%',
                    maxWidth: '350px',
                    borderColor: '#ff3131',
                    color: '#ff3131',
                    padding: '10px',
                    marginTop: '20px'
                }}
            >
                <Link to='https://ontrend.live/foodPage' >Back to Home</Link>
            </Button>

        </div>
    );
}

export default ResponsePage;