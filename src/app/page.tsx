"use client";

import AuditForm from "@/components/forms/audit-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-24">
      <div className="max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          AI Spend Audit Tool
        </p>

        <h1 className="mt-6 text-6xl font-bold tracking-tight">
          SpendLens
        </h1>

        <p className="mt-6 text-lg text-zinc-400 leading-8">
          Discover where your startup is overspending on AI tools and uncover smarter alternatives in minutes.
        </p>
      </div>

      <AuditForm
        onSubmit={(formData) => {
          console.log("Form submitted:", formData);
        }}
      />
    </main>
  );
}