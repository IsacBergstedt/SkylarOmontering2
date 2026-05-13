"use client";

import { useState, type FormEvent } from "react";
import { EB_Garamond } from "next/font/google";
import { Dialog } from "@base-ui/react/dialog";

const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
import { X, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/quote-modal";

const SERVICES = [
  "Skyltmontering",
  "Fordonsfoliering",
  "Fönsterfoliering",
  "Fasadskyltar",
  "Ljusskyltning",
  "Butiksprofil",
  "Övrigt",
];

type FormState = {
  namn: string;
  epost: string;
  telefon: string;
  tjanst: string;
  meddelande: string;
};

const EMPTY: FormState = {
  namn: "",
  epost: "",
  telefon: "",
  tjanst: "",
  meddelande: "",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-base font-medium text-black drop-shadow-sm">
        {label}
        {required && <span className="ml-0.5 text-black">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-black bg-transparent px-4 py-3 text-base text-black outline-none placeholder:text-black transition-colors focus:border-black focus:ring-2 focus:ring-black/20";

export default function QuoteModal() {
  const { open, setOpen } = useQuoteModal();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setForm(EMPTY);
      setSent(false);
    }, 300);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />

        {/* Popup wrapper – scrollable on small screens */}
        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
          <div
            className={cn(
              "relative w-full max-w-xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden",
              "bg-cover bg-center bg-no-repeat",
              "transition-all duration-300",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:translate-y-4",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:translate-y-4"
            )}
            style={{ 
              backgroundImage: "url('/images/steelcard.png')",
              backgroundAttachment: "fixed"
            }}
          >
            {/* Content */}
            <div className={`${garamond.className} font-medium relative z-10 overflow-y-auto max-h-[90vh]`}>
            <div className="px-7 pb-8 pt-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-black drop-shadow-sm">
                      Begär offert
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-base text-black drop-shadow-sm">
                      Fyll i formuläret så återkommer vi inom 24 timmar.
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    onClick={handleClose}
                    className="rounded-lg p-1.5 text-black transition-colors hover:bg-white/20 drop-shadow-sm"
                    aria-label="Stäng"
                  >
                    <X size={18} />
                  </Dialog.Close>
                </div>

                {/* Content */}
                {sent ? (
                  <div className="mt-10 flex flex-col items-center gap-4 text-center pb-4">
                    <div className="flex size-16 items-center justify-center rounded-full bg-brand-orange/10">
                      <CheckCircle2 size={32} className="text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-black drop-shadow-sm">
                        Tack för din förfrågan!
                      </p>
                      <p className="mt-2 text-base text-black drop-shadow-sm">
                        Vi hör av oss till{" "}
                        <span className="font-medium text-black">{form.epost}</span>{" "}
                        så snart som möjligt.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-2 rounded-xl bg-brand-navy px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-brand-navy/85"
                    >
                      Stäng
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Namn" required>
                        <input
                          type="text"
                          required
                          placeholder="Anna Karlsson"
                          value={form.namn}
                          onChange={set("namn")}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Telefonnummer">
                        <input
                          type="tel"
                          placeholder="070-000 00 00"
                          value={form.telefon}
                          onChange={set("telefon")}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <Field label="E-postadress" required>
                      <input
                        type="email"
                        required
                        placeholder="din@epost.se"
                        value={form.epost}
                        onChange={set("epost")}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Tjänst" required>
                      <select
                        required
                        value={form.tjanst}
                        onChange={set("tjanst")}
                        className={cn(inputClass, "appearance-none cursor-pointer")}
                      >
                        <option value="" disabled>
                          Välj tjänst…
                        </option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Beskriv ditt projekt">
                      <textarea
                        rows={4}
                        placeholder="Berätta kort om vad du behöver hjälp med, var projektet ska genomföras och eventuell tidsram…"
                        value={form.meddelande}
                        onChange={set("meddelande")}
                        className={cn(inputClass, "resize-none")}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={sending}
                      className="group mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-black bg-transparent py-3 text-base font-semibold text-black shadow-sm transition-all outline-none hover:bg-black/10 focus:ring-2 focus:ring-black/20 disabled:opacity-60"
                    >
                      {sending ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                          Skickar…
                        </>
                      ) : (
                        <span className="flex items-center gap-2 transition-transform duration-200 group-hover:scale-110">
                          <Send size={15} />
                          Skicka förfrågan
                        </span>
                      )}
                    </button>

                    <p className="text-center text-base text-black drop-shadow-sm">
                      Inga bindande avtal — bara ett förutsättningslöst samtal.
                    </p>
                  </form>
                )}
            </div>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}