import { useState } from "react"
import { login } from "../services/auth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e: any) => {
        e.preventDefault()

        if (!email || !password) {
            return toast.error("All fields required")
        }

        try {
            const res = await login({ email, password })
            localStorage.setItem("token", res.data.token)
            toast.success("Welcome back!")
            setTimeout(() => {
                navigate("/dashboard")
            }, 800)
        } catch (err: any) {
            const msg = err.response?.data?.message || "Login failed"
            toast.error(msg)
        }
    }

    return (
        <div className="split-layout">
            <style>{`
                /* Base Reset & Layout */
                .split-layout {
                    display: flex;
                    min-height: 100vh;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    background-color: #ffffff;
                    color: #0f172a;
                    overflow: hidden;
                }
                
                /* Animations */
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
                    from { transform: scale(1.05); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                /* Form Side (Left) */
                .form-side {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem;
                    position: relative;
                    z-index: 2;
                }
                .form-wrapper {
                    width: 100%;
                    max-width: 400px;
                }
                
                /* Staggered Animations */
                .animate-1 { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
                .animate-2 { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
                .animate-3 { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
                .animate-4 { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }

                /* Typography */
                .brand-logo {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #000000 0%, #333333 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    animation: float 6s ease-in-out infinite;
                }
                .brand-logo svg { width: 24px; height: 24px; fill: none; stroke: #fff; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
                
                h2 { font-size: 2rem; font-weight: 800; letter-spacing: -0.04em; margin: 0 0 0.5rem 0; color: #020617; }
                .subtitle { color: #64748b; margin-bottom: 2.5rem; font-size: 1rem; }

                /* Inputs */
                .input-group { margin-bottom: 1.5rem; }
                .input-group label { display: block; font-size: 0.875rem; font-weight: 600; color: #334155; margin-bottom: 0.5rem; }
                .form-control {
                    width: 100%;
                    padding: 1rem 1.25rem;
                    background: #f8fafc;
                    border: 2px solid transparent;
                    border-radius: 12px;
                    font-size: 1rem;
                    color: #0f172a;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-sizing: border-box;
                }
                .form-control::placeholder { color: #94a3b8; }
                .form-control:hover { background: #f1f5f9; }
                .form-control:focus { outline: none; background: #ffffff; border-color: #000000; box-shadow: 0 4px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }

                /* Button */
                .btn-submit {
                    width: 100%;
                    padding: 1rem;
                    background: #000000;
                    color: #ffffff;
                    border: none;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 1rem;
                    position: relative;
                    overflow: hidden;
                }
                .btn-submit::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: all 0.5s ease;
                }
                .btn-submit:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
                .btn-submit:hover::after { left: 100%; }
                .btn-submit:active { transform: translateY(0); }

                /* Links */
                .footer-link { text-align: center; margin-top: 2.5rem; font-size: 0.95rem; color: #64748b; font-weight: 500; }
                .footer-link a { color: #000000; text-decoration: none; font-weight: 700; transition: color 0.2s ease; }
                .footer-link a:hover { color: #4f46e5; text-decoration: underline; }

                /* Image Side (Right) */
                .image-side {
                    flex: 1.2;
                    position: relative;
                    background-color: #f1f5f9;
                    overflow: hidden;
                    display: flex;
                    align-items: flex-end;
                    padding: 3rem;
                }
                .bg-image {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    object-fit: cover;
                    animation: imageReveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .image-overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%);
                }
                .quote-card {
                    position: relative;
                    z-index: 10;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 2rem;
                    border-radius: 20px;
                    color: white;
                    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
                    opacity: 0;
                    max-width: 450px;
                }
                .quote-card p { font-size: 1.25rem; font-weight: 500; line-height: 1.6; margin: 0 0 1.5rem 0; }
                .quote-author { display: flex; align-items: center; gap: 1rem; }
                .author-avatar { width: 40px; height: 40px; border-radius: 50%; background: #4f46e5; }
                .author-info h4 { margin: 0; font-size: 1rem; font-weight: 700; }
                .author-info span { font-size: 0.85rem; color: rgba(255,255,255,0.8); }

                /* Responsive */
                @media (max-width: 960px) {
                    .image-side { display: none; }
                    .form-side { background: #f8fafc; }
                    .form-wrapper { background: #ffffff; padding: 2.5rem; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
                }
            `}</style>

            <div className="form-side">
                <div className="form-wrapper">
                    <div className="animate-1">
                        <div className="brand-logo">
                            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        </div>
                        <h2>Log in</h2>
                        <p className="subtitle">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="input-group animate-2">
                            <label>Email</label>
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
                                placeholder="••••••••"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="animate-4">
                            <button type="submit" className="btn-submit">
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="footer-link animate-4">
                        Don't have an account? <a href="/signup">Sign up for free</a>
                    </div>
                </div>
            </div>

            <div className="image-side">
                {/* Premium Unsplash Workspace Image */}
                <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80" 
                    alt="Workspace" 
                    className="bg-image" 
                />
                <div className="image-overlay"></div>
                
                <div className="quote-card">
                    <p>"WorkTracker has completely transformed how our team manages projects. The intuitive design and speed are unmatched."</p>
                    <div className="quote-author">
                        <div className="author-avatar" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=47)', backgroundSize: 'cover'}}></div>
                        <div className="author-info">
                            <h4>Sarah Jenkins</h4>
                            <span>Product Manager at TechCorp</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}