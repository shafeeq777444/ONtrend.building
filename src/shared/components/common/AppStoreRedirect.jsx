import React, { useState } from "react";
import { Button, Modal, Row, Col } from "antd";
import { AppleOutlined, AndroidOutlined, DownloadOutlined } from "@ant-design/icons";
import '@/shared/styles/pseudo.css'
// Responsive media query hook
function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
    React.useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);
    return matches;
}

// Colors
const BLACK = "#151515";
const GOLD = "#D1B060";
const GOLD_GLASS = "rgba(209,176,96,0.14)";
const WHITE_GLASS = "rgba(255,255,255,0.09)";
const FONT_FAMILY = "'Montserrat', 'Segoe UI', 'Roboto', Arial, sans-serif";

const BG_IMG = "/images/bg-premium.png"; // <--- Replace with your uploaded file path

const AppStoreRedirect = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const isMobile = useMediaQuery("(max-width: 767px)");

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const redirectToStore = (platform) => {
        if (platform === "ios") {
            window.open("https://apps.apple.com/om/app/ontrend-oman/id6708237851", "_blank");
        } else if (platform === "android") {
            window.open("https://play.google.com/store/apps/details?id=com.ontrendcustomer.app", "_blank");
        }
        setModalVisible(false);
    };

    return (
        <div
            style={{
                minHeight: "100dvh",
                width: "100vw",
                background: `url(${BG_IMG}) center/cover no-repeat, #111`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT_FAMILY,
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* Glassy Black Overlay */}
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(18, 18, 18, 0.76)",
                zIndex: 0
            }} />
            <Row
                style={{
                    zIndex: 1,
                    width: "100%",
                    // maxWidth: 1160,
                    minHeight: isMobile ? "100dvh" : 550,
                    margin: isMobile ? 0 : "0 auto",
                    boxShadow: isMobile ? "none" : "0 6px 44px #000a",
                    borderRadius: isMobile ? 0 : 40,
                    background: "rgba(12,12,12,0.82)",
                    overflow: "hidden",
                    alignItems: "stretch",
                    flexDirection: isMobile ? "column" : undefined,
                }}
                gutter={[0, 0]}
            >
                {/* LEFT: Brand + Message */}
                <Col
                    xs={24}
                    md={12}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: isMobile ? "flex-start" : "center",
                        alignItems: isMobile ? "center" : "flex-start",
                        padding: isMobile ? "38px 10px 28px 10px" : "72px 56px 72px 62px",
                        minHeight: isMobile ? 260 : 400,
                        position: "relative",
                        textAlign: isMobile ? "center" : "left"
                    }}
                >
                    {/* ONtrend LOGO */}
                    <div style={{
                        width: isMobile ? 56 : 78,
                        height: isMobile ? 56 : 78,
                        borderRadius: 20,
                        background: "#fff2",
                        marginBottom: isMobile ? 15 : 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 2px 28px ${GOLD_GLASS}`,
                    }}>
                        <img
                            src="/images/Ontrend.png"
                            alt="ONtrend"
                            style={{
                                width: isMobile ? 38 : 54,
                                borderRadius: "17%",
                                filter: "drop-shadow(0 0px 10px #d1b06011)"
                            }}
                        />
                    </div>
                    <h1 style={{
                        fontWeight: 900,
                        fontSize: isMobile ? 28 : 40,
                        lineHeight: 1.12,
                        marginBottom: isMobile ? 13 : 16,
                        letterSpacing: ".02em",
                        color: GOLD,
                        textShadow: "0 2px 32px #d1b0601c",
                        textAlign: 'left'
                    }}>
                        Download<br />
                        <span style={{ color: "#fff", fontWeight: 700 }}>ONtrend Oman</span>
                    </h1>
                    <div style={{
                        fontSize: isMobile ? 15.5 : 19,
                        marginBottom: isMobile ? 25 : 35,
                        lineHeight: 1.6,
                        color: "#fff9",
                        fontWeight: 500,
                        textShadow: "0 2px 12px #000a"
                    }}>
                        The premium way to shop, order food, and unlock exclusive offers in Oman.
                    </div>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        size={isMobile ? "middle" : "large"}
                        onClick={showModal}
                        style={{
                            background: GOLD,
                            color: BLACK,
                            borderRadius: 22,
                            padding: isMobile ? "8px 28px" : "12px 56px",
                            fontWeight: 900,
                            fontSize: isMobile ? 17 : 22,
                            letterSpacing: ".04em",
                            boxShadow: `0 2px 16px ${GOLD_GLASS}`,
                            border: "none",
                            textTransform: "uppercase",
                            transition: "all 0.25s",
                        }}
                    >
                        Download Now
                    </Button>
                    <div style={{
                        marginTop: isMobile ? 25 : 36,
                        fontSize: isMobile ? 12.5 : 15,
                        color: GOLD,
                        fontWeight: 600,
                        letterSpacing: ".05em",
                        opacity: 0.77,
                        textShadow: "0 1px 10px #d1b06012"
                    }}>
                        Available on iOS &amp; Android
                    </div>
                    <div style={{
                        marginTop: 10,
                        color: "#fff5",
                        fontSize: isMobile ? 10.5 : 13,
                        letterSpacing: ".02em"
                    }}>
                        Version 1.7.5 · ONtrend Oman
                    </div>
                </Col>

                {/* RIGHT: Card Mockup + Features */}
                <Col
                    xs={24}
                    md={12}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: isMobile ? "22px 2vw 34px 2vw" : "44px 22px",
                        background: "rgba(21,21,21,0.65)",
                        minHeight: isMobile ? 350 : 450
                    }}
                >
                    <div style={{
                        width: isMobile ? 120 : 400,
                        height: isMobile ? 230 : 700,
                        borderRadius: isMobile ? 19 : 30,
                        background: GOLD_GLASS,
                        boxShadow: `0 6px 36px ${GOLD_GLASS}`,
                        marginBottom: isMobile ? 16 : 26,
                        marginTop: isMobile ? 10 : 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        border: `2px solid ${GOLD_GLASS}`,
                    }}>
                        <img
                            src="/images/phone.png" // optional: show a chip/smartcard
                            alt="Card Chip"
                            style={{
                                width: isMobile ? 230 : 600,
                                filter: "drop-shadow(0 0px 12px #ffe5b6cc)"
                            }}
                        />
                    </div>
                    <ul style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 auto",
                        textAlign: "left",
                        fontSize: isMobile ? 13.2 : 18,
                        color: GOLD,
                        fontWeight: 500,
                        lineHeight: isMobile ? 1.7 : 2,
                        maxWidth: 330,
                        letterSpacing: ".01em"
                    }}>
                        <li>🛒 All-in-one food & shopping</li>
                        <li>🔥 Exclusive deals & cashback</li>
                        <li>💳 Secure wallet & payment</li>
                        <li>📦 Fast delivery anywhere</li>
                        <li>🌙 Arabic & English support</li>
                    </ul>
                </Col>
            </Row>

            {/* Modal: Platform Picker */}
            <Modal
                open={modalVisible}
                onCancel={hideModal}
                footer={null}
                centered
                title={null}
                style={{
                    borderRadius: isMobile ? 20 : 34,
                    padding: 0,
                    background: "#ffffff00" 
                }}
                bodyStyle={{
                    padding: isMobile ? "20px 10px 14px 10px" : "44px 44px 30px 44px",
                    background: WHITE_GLASS,
                    borderRadius: isMobile ? "20px" : "34px",
                    boxShadow: `0 10px 56px #000a, 0 1.5px 0 #fff`,
                    minWidth: isMobile ? 270 : 430,
                    backdropFilter: "blur(15px)",
                    border: `1.5px solid ${GOLD_GLASS}`,
                    position: "relative"
                }}
            >
                <div style={{
                    textAlign: "center",
                    marginBottom: isMobile ? 18 : 26,
                    fontWeight: 900,
                    fontSize: isMobile ? 21 : 25,
                    letterSpacing: ".01em",
                    color: GOLD,
                    textShadow: "0 2px 22px #d1b06014"
                }}>
                    Select your platform
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? 18 : 34,
                    justifyContent: "center",
                    alignItems: "stretch",
                    margin: "0 auto"
                }}>
                    {/* iOS Card */}
                    <div
                        tabIndex={0}
                        role="button"
                        aria-label="Download from App Store"
                        onClick={() => redirectToStore("ios")}
                        onKeyPress={e => { if (e.key === "Enter") redirectToStore("ios"); }}
                        style={{
                            cursor: "pointer",
                            userSelect: "none",
                            background: "#181818dd",
                            borderRadius: 18,
                            padding: isMobile ? "16px 10px" : "24px 26px 18px 26px",
                            minWidth: isMobile ? 0 : 148,
                            flex: 1,
                            boxShadow: `0 3px 28px ${GOLD_GLASS}, 0 1.5px 0 #fff1`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            transition: "transform 0.13s cubic-bezier(.16,.86,.49,1.08),box-shadow 0.16s",
                            border: `2.5px solid ${GOLD_GLASS}`,
                            position: "relative",
                        }}
                        onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
                        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div style={{
                            background: GOLD,
                            borderRadius: "50%",
                            padding: isMobile ? 13 : 18,
                            marginBottom: 12,
                            marginTop: 2,
                            display: "flex",
                            boxShadow: `0 1.5px 12px ${GOLD_GLASS}`,
                        }}>
                            <AppleOutlined style={{
                                color: BLACK,
                                fontSize: isMobile ? 29 : 38,
                                verticalAlign: "middle"
                            }} />
                        </div>
                        <div style={{
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: isMobile ? 16 : 19,
                            marginBottom: 2,
                            letterSpacing: ".01em"
                        }}>
                            App Store
                        </div>
                        <div style={{
                            fontSize: isMobile ? 12.5 : 14,
                            color: GOLD,
                            opacity: 0.94,
                            fontWeight: 700,
                            marginTop: 2
                        }}>
                            For iPhone & iPad
                        </div>
                    </div>

                    {/* Android Card */}
                    <div
                        tabIndex={0}
                        role="button"
                        aria-label="Download from Play Store"
                        onClick={() => redirectToStore("android")}
                        onKeyPress={e => { if (e.key === "Enter") redirectToStore("android"); }}
                        style={{
                            cursor: "pointer",
                            userSelect: "none",
                            background: "#181818dd",
                            borderRadius: 18,
                            padding: isMobile ? "16px 10px" : "24px 26px 18px 26px",
                            minWidth: isMobile ? 0 : 148,
                            flex: 1,
                            boxShadow: `0 3px 28px ${GOLD_GLASS}, 0 1.5px 0 #fff1`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            transition: "transform 0.13s cubic-bezier(.16,.86,.49,1.08),box-shadow 0.16s",
                            border: `2.5px solid ${GOLD_GLASS}`,
                            position: "relative"
                        }}
                        onMouseDown={e => e.currentTarget.style.transform = "scale(0.96)"}
                        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div style={{
                            background: GOLD,
                            borderRadius: "50%",
                            padding: isMobile ? 13 : 18,
                            marginBottom: 12,
                            marginTop: 2,
                            display: "flex",
                            boxShadow: `0 1.5px 12px ${GOLD_GLASS}`,
                        }}>
                            <AndroidOutlined style={{
                                color: BLACK,
                                fontSize: isMobile ? 29 : 38,
                                verticalAlign: "middle"
                            }} />
                        </div>
                        <div style={{
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: isMobile ? 16 : 19,
                            marginBottom: 2,
                            letterSpacing: ".01em"
                        }}>
                            Play Store
                        </div>
                        <div style={{
                            fontSize: isMobile ? 12.5 : 14,
                            color: GOLD,
                            opacity: 0.94,
                            fontWeight: 700,
                            marginTop: 2
                        }}>
                            For Android devices
                        </div>
                    </div>
                </div>
                <div style={{
                    color: GOLD,
                    fontSize: isMobile ? 10 : 13,
                    marginTop: isMobile ? 15 : 24,
                    fontWeight: 600,
                    letterSpacing: ".01em",
                    textAlign: "center"
                }}>
                    ONtrend Oman &bull; v1.7.5
                </div>
            </Modal>
        </div>
    );
};

export default AppStoreRedirect;