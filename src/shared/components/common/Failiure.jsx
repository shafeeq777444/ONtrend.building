/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Button, Card } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

function Failiure() {
    const [showConfetti, setShowConfetti] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [countdown, setCountDown] = useState(6);
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountDown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
console.log()
        }
    }, [countdown]);
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

    return (
        <div style={{ textAlign: "center", padding: "20px", display: 'flex', justifyContent: 'stretch', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>

            {/* Display the checkmark icon */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/images/fail.gif" alt="Order Complete" style={{ width: '300px' }} />
            </div>
            <CloseCircleTwoTone style={{ fontSize: '54px', color: '#ff3131' }} twoToneColor="#ff3131" />
            <h2 style={{ fontWeight: "bold", marginTop: "10px" }}>Your payment got cancelled</h2>
            <p>Please Try Again!!</p>

            {/* Card to show order details */}
            <Card
                style={{ width: '90%', maxWidth: '500px', margin: '20px auto', borderRadius: '10px', border: '1px solid #eaeaea' }}
                bodyStyle={{ padding: '20px' }}
            >

                <h2>"Remember everything you desire is Just one click away"</h2>
                <p>Try new varieties we have in store for you!</p>
            </Card>

            {/* Button to track the order */}
            {/* <Button
                type="primary"
                shape="round"
                size="large"
                style={{
                    backgroundColor: '#ff3131',
                    borderColor: '#ff3131',
                    color: '#fff',
                    width: '80%',
                    maxWidth: '300px',
                    marginBottom: '20px'
                }}
            >
                Track your order
            </Button> */}

            <Button
                type="default"
                shape="round"
                size="large"
                style={{
                    width: '80%',
                    maxWidth: '300px',
                    borderColor: '#ff3131',
                    color: '#ff3131'
                }}
            >
                Back to Home In {countdown}s
            </Button>
        </div>
    );
}

export default Failiure;