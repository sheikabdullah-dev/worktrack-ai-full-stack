import { useState } from "react"
import { signup } from "../services/auth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignup = async (e: any) => {
        e.preventDefault()

        if (!email || !password) {
            return toast.error("All fields required")
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 chars")
        }

        try {
            await signup({ email, password })
            toast.success("Account created successfully")
            setTimeout(() => {
                navigate("/login")
            }, 1000)
        } catch (err: any) {
            const msg = err.response?.data?.message || "Signup failed"
            toast.error(msg)
        }
    }

    return (
        <div className="split-layout">
            <style>{`
                /* Sharing the exact same core premium styles to maintain brand consistency */
                .split-layout {
                    display: flex;
                    min-height: 100vh;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    background-color: #ffffff;
                    color: #0f172a;
                    overflow: hidden;
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes imageReveal {
                    from { transform: scale(1.05) translateX(20px); opacity: 0; }
                    to { transform: scale(1) translateX(0); opacity: 1; }
                }

                .form-side { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; z-index: 2; }
                .form-wrapper { width: 100%; max-width: 400px; }
                
                .animate-1 { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
                .animate-2 { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
                .animate-3 { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
                .animate-4 { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }

                .brand-logo {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
                    animation: float 6s ease-in-out infinite;
                }
                .brand-logo svg { width: 24px; height: 24px; fill: none; stroke: #fff; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
                
                h2 { font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; margin: 0 0 0.5rem 0; color: #020617; }
                .subtitle { color: #64748b; margin-bottom: 2.5rem; font-size: 1rem; }

                .input-group { margin-bottom: 1.5rem; }
                .input-group label { display: block; font-size: 0.875rem; font-weight: 600; color: #334155; margin-bottom: 0.5rem; }
                .form-control {
                    width: 100%; padding: 1rem 1.25rem; background: #f8fafc; border: 2px solid transparent; border-radius: 12px;
                    font-size: 1rem; color: #0f172a; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box;
                }
                .form-control::placeholder { color: #94a3b8; }
                .form-control:hover { background: #f1f5f9; }
                .form-control:focus { outline: none; background: #ffffff; border-color: #4f46e5; box-shadow: 0 4px 20px rgba(79, 70, 229, 0.1); transform: translateY(-2px); }

                .btn-submit {
                    width: 100%; padding: 1rem; background: #4f46e5; color: #ffffff; border: none; border-radius: 12px;
                    font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; margin-top: 1rem;
                    position: relative; overflow: hidden; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
                }
                .btn-submit::after {
                    content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transition: all 0.5s ease;
                }
                .btn-submit:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4); }
                .btn-submit:hover::after { left: 100%; }
                .btn-submit:active { transform: translateY(0); }

                .footer-link { text-align: center; margin-top: 2.5rem; font-size: 0.95rem; color: #64748b; font-weight: 500; }
                .footer-link a { color: #4f46e5; text-decoration: none; font-weight: 700; transition: color 0.2s ease; }
                .footer-link a:hover { color: #3730a3; text-decoration: underline; }

                /* Image Side - Order reversed for variety */
                .image-side {
                    flex: 1.2; position: relative; background-color: #e2e8f0; overflow: hidden; display: flex; align-items: flex-end; padding: 3rem;
                    order: -1; /* Puts image on the left for Signup page */
                }
                .bg-image { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; animation: imageReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .image-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 100%); }
                
                .feature-list {
                    position: relative; z-index: 10; color: white; animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0;
                }
                .feature-list h3 { font-size: 2rem; margin: 0 0 1.5rem 0; font-weight: 700; }
                .feature-item { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; font-size: 1.1rem; }
                .feature-icon { width: 24px; height: 24px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }

                @media (max-width: 960px) {
                    .image-side { display: none; }
                    .form-side { background: #f8fafc; }
                    .form-wrapper { background: #ffffff; padding: 2.5rem; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
                }
            `}</style>

            <div className="image-side">
                {/* Abstract Architecture/Creative Image */}
                <img 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1548&q=80" 
                    alt="Abstract Creative" 
                    className="bg-image" 
                />
                <div className="image-overlay"></div>
                
                <div className="feature-list">
                    <h3>Join top performing teams.</h3>
                    <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <span>Unlimited task creation & tracking</span>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <span>Real-time team collaboration</span>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">✓</div>
                        <span>Advanced analytics dashboard</span>
                    </div>
                </div>
            </div>

            <div className="form-side">
                <div className="form-wrapper">
                    <div className="animate-1">
                        <div className="brand-logo">
                            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        </div>
                        <h2>Create Account</h2>
                        <p className="subtitle">Start tracking your work beautifully today.</p>
                    </div>

                    <form onSubmit={handleSignup}>
                        <div className="input-group animate-2">
                            <label>Work Email</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group animate-3">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Min. 6 characters"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="animate-4">
                            <button type="submit" className="btn-submit">
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="footer-link animate-4">
                        Already have an account? <a href="/login">Log in here</a>
                    </div>
                </div>
            </div>
        </div>
    )
}