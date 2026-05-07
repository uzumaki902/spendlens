"use client";

import { useEffect, useMemo, useState } from "react";
import { tools, type Tool, type UseCase } from "@/data/tools";

interface ToolEntry {
    enabled: boolean;
    plan: string;
    monthlySpend: string;
    seats: string;
}

interface FormState {
    teamSize: string;
    useCase: UseCase;
    tools: Record<string, ToolEntry>;
}

interface AuditFormProps {
    onSubmit?: (state: FormState) => void;
}

const STORAGE_KEY = "spendlens-form";

const USE_CASES: { value: UseCase; label: string }[] = [
    { value: "coding", label: "Coding" },
    { value: "writing", label: "Writing" },
    { value: "data", label: "Data" },
    { value: "research", label: "Research" },
    { value: "mixed", label: "Mixed" },
];

const createDefaultState = (): FormState => ({
    teamSize: "",
    useCase: "mixed",
    tools: Object.fromEntries(
        tools.map((tool) => [
            tool.id,
            {
                enabled: false,
                plan: tool.plans[0]?.name ?? "",
                monthlySpend: "",
                seats: "1",
            },
        ])
    ),
});

export default function AuditForm({
    onSubmit,
}: AuditFormProps) {
    const [form, setForm] = useState<FormState>(
        createDefaultState
    );

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                setForm(JSON.parse(saved));
            }
        } catch (error) {
            console.error(
                "Failed to load saved form state",
                error
            );
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(form)
            );
        } catch (error) {
            console.error(
                "Failed to persist form state",
                error
            );
        }
    }, [form]);

    const enabledCount = useMemo(
        () =>
            Object.values(form.tools).filter(
                (tool) => tool.enabled
            ).length,
        [form.tools]
    );

    const updateTool = (
        toolId: Tool["id"],
        field: keyof ToolEntry,
        value: string | boolean
    ) => {
        setForm((prev) => ({
            ...prev,
            tools: {
                ...prev.tools,
                [toolId]: {
                    ...prev.tools[toolId],
                    [field]: value,
                },
            },
        }));
    };

    const toggleTool = (toolId: Tool["id"]) => {
        updateTool(
            toolId,
            "enabled",
            !form.tools[toolId].enabled
        );
    };

    const handleSubmit = () => {
        if (!onSubmit) return;

        onSubmit(form);
    };

    return (
        <section className="mx-auto mt-24 w-full max-w-6xl px-6">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tight">
                    Audit Your AI Stack
                </h2>

                <p className="mt-4 text-zinc-400">
                    Add the AI tools your team currently pays for and
                    estimate your potential savings.
                </p>
            </div>

            {/* Team Context */}
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-lg font-semibold">
                    Team Context
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm text-zinc-400">
                            Team Size
                        </label>

                        <input
                            type="number"
                            min="1"
                            placeholder="e.g. 5"
                            value={form.teamSize}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    teamSize: e.target.value,
                                }))
                            }
                            className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-zinc-400">
                            Primary Use Case
                        </label>

                        <select
                            value={form.useCase}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    useCase: e.target.value as UseCase,
                                }))
                            }
                            className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                        >
                            {USE_CASES.map((useCase) => (
                                <option
                                    key={useCase.value}
                                    value={useCase.value}
                                >
                                    {useCase.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Tool Cards */}
            <div className="mt-6 grid gap-5">
                {tools.map((tool) => {
                    const entry = form.tools[tool.id];
                    const isEnabled = entry.enabled;

                    return (
                        <div
                            key={tool.id}
                            className={`rounded-3xl border p-6 transition-all duration-200 ${isEnabled
                                    ? "border-zinc-600 bg-zinc-950"
                                    : "border-zinc-800 bg-zinc-950 opacity-50"
                                }`}
                        >
                            {/* Tool Header */}
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        aria-label={`Toggle ${tool.name}`}
                                        onClick={() => toggleTool(tool.id)}
                                        className={`relative h-6 w-10 rounded-full transition-colors ${isEnabled
                                                ? "bg-white"
                                                : "bg-zinc-700"
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-1 h-4 w-4 rounded-full transition-all ${isEnabled
                                                    ? "left-5 bg-black"
                                                    : "left-1 bg-zinc-400"
                                                }`}
                                        />
                                    </button>

                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {tool.name}
                                        </h3>

                                        <p className="text-sm capitalize text-zinc-500">
                                            {tool.category} tool
                                        </p>
                                    </div>
                                </div>

                                <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
                                    {tool.useCases.join(", ")}
                                </span>
                            </div>

                            {/* Tool Inputs */}
                            {isEnabled && (
                                <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm text-zinc-400">
                                            Plan
                                        </label>

                                        <select
                                            value={entry.plan}
                                            onChange={(e) =>
                                                updateTool(
                                                    tool.id,
                                                    "plan",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                                        >
                                            {tool.plans.map((plan) => (
                                                <option
                                                    key={plan.name}
                                                    value={plan.name}
                                                >
                                                    {plan.name}
                                                    {plan.pricePerSeat > 0
                                                        ? ` — $${plan.pricePerSeat}/seat`
                                                        : ""}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm text-zinc-400">
                                            Monthly Spend ($)
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Your actual spend"
                                            value={entry.monthlySpend}
                                            onChange={(e) =>
                                                updateTool(
                                                    tool.id,
                                                    "monthlySpend",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm text-zinc-400">
                                            Seats
                                        </label>

                                        <input
                                            type="number"
                                            min="1"
                                            placeholder="1"
                                            value={entry.seats}
                                            onChange={(e) =>
                                                updateTool(
                                                    tool.id,
                                                    "seats",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-2xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition focus:border-zinc-500"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Submit */}
            <div className="mt-10 flex flex-col items-center gap-3">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                        enabledCount === 0 || !form.teamSize
                    }
                    className="w-full max-w-md rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {enabledCount === 0
                        ? "Enable at least one tool"
                        : `Audit ${enabledCount} tool${enabledCount > 1 ? "s" : ""
                        } →`}
                </button>

                <p className="text-xs text-zinc-600">
                    Your data stays in your browser. No account
                    required.
                </p>
            </div>
        </section>
    );
}