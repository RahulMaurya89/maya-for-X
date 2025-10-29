import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./Auth.css";

const Auth = () => {
  const [phoneQuickstart, setPhoneQuickstart] = useState("");
  const [emailQuickstart, setEmailQuickstart] = useState("");
  const [phoneFull, setPhoneFull] = useState("");
  const [fullPhoneQuickstart, setFullPhoneQuickstart] = useState("");
  const [fullPhoneFull, setFullPhoneFull] = useState("");
  const [itiQuickstart, setItiQuickstart] = useState(null);
  const [itiFull, setItiFull] = useState(null);
  const [trialPhone, setTrialPhone] = useState("");
  const [authMode, setAuthMode] = useState("demo"); // 'demo' or 'full'

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const phone = urlParams.get("phone") || "";
    setTrialPhone(phone);
    setPhoneQuickstart(phone);
    setPhoneFull(phone);

    let quickInstance = null;
    let fullInstance = null;

    const initializePhoneInputs = () => {
      const quickstartInput = document.querySelector("#phone_quickstart");
      const fullInput = document.querySelector("#phone_full");

      if (quickstartInput) {
        quickInstance = window.intlTelInput(quickstartInput, {
          initialCountry: "auto",
          geoIpLookup: (callback) => {
            fetch("https://ipapi.co/json")
              .then((res) => res.json())
              .then((data) => callback(data.country_code))
              .catch(() => callback("us"));
          },
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          separateDialCode: true,
          preferredCountries: ["us", "gb", "ca"],
        });
        setItiQuickstart(quickInstance);
      }

      if (fullInput) {
        fullInstance = window.intlTelInput(fullInput, {
          initialCountry: "auto",
          geoIpLookup: (callback) => {
            fetch("https://ipapi.co/json")
              .then((res) => res.json())
              .then((data) => callback(data.country_code))
              .catch(() => callback("us"));
          },
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          separateDialCode: true,
          preferredCountries: ["us", "gb", "ca"],
        });
        setItiFull(fullInstance);
      }
    };

    if (!window.intlTelInput) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
      script.onload = initializePhoneInputs;
      document.head.appendChild(script);
    } else {
      initializePhoneInputs();
    }

    return () => {
      quickInstance?.destroy();
      fullInstance?.destroy();
    };
  }, []);

  const updateFullPhoneNumbers = () => {
    if (itiQuickstart && phoneQuickstart.trim()) {
      setFullPhoneQuickstart(itiQuickstart.getNumber());
    }
    if (itiFull && phoneFull.trim()) {
      setFullPhoneFull(itiFull.getNumber());
    }
  };

  const handlePhoneChange = (value, type) => {
    if (type === "quickstart") {
      setPhoneQuickstart(value);
      if (itiQuickstart && value.trim()) {
        setFullPhoneQuickstart(itiQuickstart.getNumber());
      }
    } else {
      setPhoneFull(value);
      if (itiFull && value.trim()) {
        setFullPhoneFull(itiFull.getNumber());
      }
    }
  };

  const handleQuickStart = async (e) => {
    e.preventDefault();
    updateFullPhoneNumbers();

    const fullNumber =
      fullPhoneQuickstart ||
      (itiQuickstart ? itiQuickstart.getNumber() : phoneQuickstart);

    if (!itiQuickstart?.isValidNumber()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailQuickstart)) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("📞 Requesting your demo call...");

    try {
      // Include email as a query parameter in the URL
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL || "https://maya-system.onrender.com"
        }/maya-api/quick-start/${encodeURIComponent(
          fullNumber
        )}?email=${encodeURIComponent(emailQuickstart)}`;

      const response = await fetch(apiUrl, { method: "POST" });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to initiate call");
      }

      toast.success("✅ Maya is calling you now! Please answer your phone.");

      if (typeof gtag !== "undefined") {
        gtag("event", "demo_call_requested", {
          event_category: "engagement",
          event_label: "quick_start",
          user_email: emailQuickstart,
        });
      }
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    }
  };

  const handleFullRegistration = async (e) => {
    e.preventDefault();
    updateFullPhoneNumbers();

    const phone = fullPhoneFull || (itiFull ? itiFull.getNumber() : phoneFull);

    if (!itiFull?.isValidNumber()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL || "https://maya-system.onrender.com";

      // Check if the user already exists
      const checkUserResponse = await fetch(
        `${apiBase}/maya-api/check-user/${encodeURIComponent(phone)}`
      );
      const userExistsData = await checkUserResponse.json();

      if (userExistsData.exists) {
        toast.error("This phone number is already registered.");
        return;
      }

      toast.success("Redirecting to Google...");

      const response = await fetch(
        `${apiBase}/maya-api/auth/google?phone=${encodeURIComponent(phone)}`
      );

      if (!response.ok) {
        throw new Error("Failed to get authorization URL");
      }

      const data = await response.json();

      if (data.authorization_url) {
        // Redirect the user to Google OAuth
        window.location.href = data.authorization_url;
      } else {
        throw new Error("No authorization URL received");
      }
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    }
  };

  return (
    <div id="auth" className="auth-page">
      <div className="auth-shell">
        <Toaster position="top-center" containerStyle={{ marginTop: "5%" }} />
        <div className="auth-container">
          <section className="auth-right">
            {trialPhone && (
              <div className="auth-alert info">
                📞 Welcome back! Ready for another call?
              </div>
            )}

            <div className="auth-card">
              <div className="auth-toggle">
                <button
                  onClick={() => setAuthMode("demo")}
                  className={`auth-toggle-btn ${authMode === "demo" ? "active" : ""
                    }`}
                >
                  Instant Demo Call
                </button>
                {/* <button
                  onClick={() => setAuthMode("full")}
                  className={`auth-toggle-btn ${authMode === "full" ? "active" : ""
                    }`}
                >
                  Unlock Full Access
                </button> */}
              </div>

              <div className="auth-form-container">
                <div
                  className={`auth-form-wrapper ${authMode === "demo" ? "active" : ""
                    }`}
                >
                  <div className="auth-card-header">
                    <div className="auth-card-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fa8080ff"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z" /></svg></div>
                    <div>
                      <h3>Instant demo call</h3>
                      <p>
                        Experience Maya in under a minute—no account required.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleQuickStart} className="auth-form">
                    
                    <label htmlFor="name_quickstart">Name</label>
                    <input
                      id="name_quickstart"
                      type="string"
                      className="auth-input"
                      value={phoneQuickstart}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, "quickstart")
                      }
                      placeholder="Your Nickname"
                      required
                    />

                    <label htmlFor="phone_quickstart">Phone number</label>
                    <input
                      id="phone_quickstart"
                      type="tel"
                      className="auth-input"
                      value={phoneQuickstart}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, "quickstart")
                      }
                      placeholder="Phone number"
                      required
                    />

                    <label htmlFor="email_quickstart">Email address</label>
                    <input
                      id="email_quickstart"
                      type="email"
                      className="auth-input"
                      value={emailQuickstart}
                      onChange={(e) => setEmailQuickstart(e.target.value)}
                      placeholder="Email address"
                      required
                    />

                    <button type="submit" className="auth-button primary">
                      Call me now
                    </button>
                    <p className="auth-card-note">
                      Free preview • No credit card required
                    </p>
                  </form>
                </div>
                <div
                  className={`auth-form-wrapper ${authMode === "full" ? "active" : ""
                    }`}
                >
                  <div className="auth-card-header">
                    <div className="auth-card-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8453d3ff"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" /></svg></div>
                    <div>
                      <h3>Unlock full access</h3>
                      <p>
                        Connect Google to sync calendars, email, contacts, and
                        voice notes.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleFullRegistration} className="auth-form">
                    <label htmlFor="phone_full">Phone number</label>
                    <input
                      id="phone_full"
                      type="tel"
                      className="auth-input"
                      value={phoneFull}
                      onChange={(e) =>
                        handlePhoneChange(e.target.value, "full")
                      }
                      placeholder="Enter your phone number"
                      required
                    /><br />
                    <button type="submit" className="auth-button secondary">
                      <img
                        src="https://www.gstatic.com/images/branding/product/1x/gsa_48dp.png"
                        alt="Google logo"
                      />
                      Continue with Google
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          <section className="auth-left">
            <span className="auth-pill">Your AI emotional companion</span>
            <h3>
              Share your thoughts with Maya — she listens, cares, and understands you.
            </h3>
            <p className="auth-subtitle">
              Maya helps you express your emotions, find comfort in conversations, and feel
              connected even during lonely moments. She’s always here to listen with empathy.
            </p>

            <ul className="auth-feature-list">
              <li>Talk about your day, dreams, or feelings anytime</li>
              <li>Get gentle emotional support and calming guidance</li>
              <li>Receive warm, thoughtful responses that lift your mood</li>
            </ul>

            <div className="auth-support">
              Need a help?{" "}
              <a href="mailto:heymaya@mayaagent.ai">heymaya@mayaagent.ai</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Auth;
