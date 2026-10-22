import { useCallback, useState } from "react";
import {
    RefreshCw,
    Mail,
    Phone,
    LogOut,
    Users,
    Clock,
    CheckCircle,
    BriefcaseBusiness,
} from "lucide-react";

import "./AdminDashboard.css";

const STATUSES = ["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"];

export default function AdminDashboard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("ALL");

    const getAuthHeader = useCallback(() => {
        return `Basic ${btoa(`${username}:${password}`)}`;
    }, [username, password]);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/v1/leads", {
                headers: {
                    Authorization: getAuthHeader(),
                },
            });

            if (response.status === 401 || response.status === 403) {
                setAuthenticated(false);
                throw new Error("Invalid credentials or admin access denied.");
            }

            if (!response.ok) {
                throw new Error(`Failed to load enquiries (${response.status}).`);
            }

            const data = await response.json();

            setLeads(data);
            setAuthenticated(true);
        } catch (err) {
            setError(err.message || "Unable to load enquiries.");
        } finally {
            setLoading(false);
        }
    }, [getAuthHeader]);

    async function handleLogin(event) {
        event.preventDefault();
        await fetchLeads();
    }

    async function updateStatus(id, status) {
        setError("");

        try {
            const response = await fetch(
                `/api/v1/leads/${id}/status?status=${encodeURIComponent(status)}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: getAuthHeader(),
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Status update failed (${response.status}).`);
            }

            const updatedLead = await response.json();

            setLeads((current) =>
                current.map((lead) =>
                    lead.id === updatedLead.id ? updatedLead : lead
                )
            );
        } catch (err) {
            setError(err.message);
        }
    }

    function logout() {
        setAuthenticated(false);
        setUsername("");
        setPassword("");
        setLeads([]);
        setError("");
    }

    if (!authenticated) {
        return (
            <main className="admin-login-page">
                <form className="admin-login" onSubmit={handleLogin}>
                    <a href="/" className="admin-brand">
                        <span className="admin-logo">G</span>
                        GenNum1 Solutions
                    </a>

                    <p className="admin-eyebrow">ADMINISTRATION</p>
                    <h1>Welcome back</h1>
                    <p>Sign in to manage customer enquiries.</p>

                    <label>
                        Username
                        <input
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            autoComplete="username"
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </label>

                    {error && (
                        <p className="admin-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        className="admin-primary-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    <a className="back-link" href="/">
                        Back to website
                    </a>
                </form>
            </main>
        );
    }

    const newCount = leads.filter((lead) => lead.status === "NEW").length;
    const contactedCount = leads.filter(
        (lead) => lead.status === "CONTACTED"
    ).length;
    const inProgressCount = leads.filter(
        (lead) => lead.status === "IN_PROGRESS"
    ).length;
    const closedCount = leads.filter(
        (lead) => lead.status === "CLOSED"
    ).length;

    const visibleLeads =
        filter === "ALL"
            ? leads
            : leads.filter((lead) => lead.status === filter);

    return (
        <main className="admin-page">
            <header className="admin-header">
                <a href="/" className="admin-brand">
                    <span className="admin-logo">G</span>
                    GenNum1 Solutions
                    <span className="admin-label">ADMIN</span>
                </a>

                <div className="admin-header-actions">
                    <button
                        className="admin-refresh"
                        onClick={fetchLeads}
                        disabled={loading}
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>

                    <button className="admin-logout" onClick={logout}>
                        <LogOut size={16} />
                        Log out
                    </button>
                </div>
            </header>

            <section className="admin-content">
                <p className="admin-eyebrow">OVERVIEW</p>
                <h1>Enquiries Dashboard</h1>
                <p className="admin-subtitle">
                    View customer enquiries and manage their progress.
                </p>

                {error && (
                    <p className="admin-error" role="alert">
                        {error}
                    </p>
                )}

                <div className="admin-stats">
                    <article className="admin-stat">
                        <Users />
                        <span>Total enquiries</span>
                        <strong>{leads.length}</strong>
                    </article>

                    <article className="admin-stat">
                        <Clock />
                        <span>New enquiries</span>
                        <strong>{newCount}</strong>
                    </article>

                    <article className="admin-stat">
                        <BriefcaseBusiness />
                        <span>In progress</span>
                        <strong>{inProgressCount}</strong>
                    </article>

                    <article className="admin-stat">
                        <CheckCircle />
                        <span>Closed</span>
                        <strong>{closedCount}</strong>
                    </article>
                </div>

                <section className="admin-table-section">
                    <div className="admin-table-heading">
                        <div>
                            <h2>Customer enquiries</h2>
                            <p>{visibleLeads.length} enquiries shown</p>
                        </div>

                        <select
                            value={filter}
                            onChange={(event) => setFilter(event.target.value)}
                            aria-label="Filter enquiries by status"
                        >
                            <option value="ALL">All statuses</option>
                            {STATUSES.map((status) => (
                                <option key={status} value={status}>
                                    {status.replace("_", " ")}
                                </option>
                            ))}
                        </select>
                    </div>

                    {loading ? (
                        <p className="admin-empty">Loading enquiries...</p>
                    ) : visibleLeads.length === 0 ? (
                        <p className="admin-empty">No enquiries found.</p>
                    ) : (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Service</th>
                                    <th>Project details</th>
                                    <th>Submitted</th>
                                    <th>Status</th>
                                </tr>
                                </thead>

                                <tbody>
                                {visibleLeads.map((lead) => (
                                    <tr key={lead.id}>
                                        <td>
                                            <strong>{lead.name}</strong>

                                            <a href={`mailto:${lead.email}`}>
                                                <Mail size={13} />
                                                {lead.email}
                                            </a>

                                            {lead.phone && (
                                                <a href={`tel:${lead.phone}`}>
                                                    <Phone size={13} />
                                                    {lead.phone}
                                                </a>
                                            )}
                                        </td>

                                        <td>{lead.service}</td>

                                        <td className="admin-message">
                                            {lead.message}
                                        </td>

                                        <td>
                                            {lead.createdAt
                                                ? new Date(lead.createdAt).toLocaleString()
                                                : "—"}
                                        </td>

                                        <td>
                                            <select
                                                value={lead.status}
                                                onChange={(event) =>
                                                    updateStatus(lead.id, event.target.value)
                                                }
                                                aria-label={`Update status for ${lead.name}`}
                                            >
                                                {STATUSES.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status.replace("_", " ")}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <p className="admin-footer-note">
                    {contactedCount} contacted · {newCount} new · {closedCount} closed
                </p>
            </section>
        </main>
    );
}