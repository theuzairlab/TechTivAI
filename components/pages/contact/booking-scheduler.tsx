"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { getAvailableDates, timeSlots } from "@/lib/contact-page-data";
import { cn } from "@/lib/utils";

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function BookingScheduler() {
  const dates = useMemo(() => getAvailableDates(), []);
  const [selectedDate, setSelectedDate] = useState(formatDateKey(dates[0]));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState(false);

  const selectedDateObj = dates.find((d) => formatDateKey(d) === selectedDate) ?? dates[0];

  const handleBook = () => {
    if (!selectedTime || !name.trim() || !email.trim()) return;
    setBooking(true);
    window.setTimeout(() => {
      setBooking(false);
      setBooked(true);
    }, 800);
  };

  if (booked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-surface-xl border border-brand-cyan/25 bg-brand-cyan/5 px-6 py-14 text-center"
      >
        <AnimatedIcon icon={CheckCircle2} size={40} className="mb-4 text-brand" />
        <h3 className="font-display text-xl font-semibold text-text-primary">
          Strategy call booked
        </h3>
        <p className="mt-2 max-w-md text-sm text-text-muted">
          {name.split(" ")[0]}, you&apos;re confirmed for{" "}
          <span className="font-medium text-text-primary">
            {formatDateLabel(selectedDateObj)} at {selectedTime}
          </span>
          . Calendar invite sent to {email}.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setBooked(false);
            setSelectedTime(null);
            setName("");
            setEmail("");
          }}
        >
          Book another slot
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <AnimatedIcon icon={CalendarCheck} size={18} className="text-brand-cyan" interactive={false} />
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
            Select a date
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {dates.map((date) => {
            const key = formatDateKey(date);
            const active = selectedDate === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedDate(key);
                  setSelectedTime(null);
                }}
                className={cn(
                  "rounded-xl border px-3 py-3 text-left text-sm transition-all",
                  active
                    ? "border-brand-cyan/40 bg-brand-cyan/10 text-text-primary ring-1 ring-brand-cyan/30"
                    : "border-border-subtle bg-surface-card/60 text-text-muted hover:border-border-highlight",
                )}
              >
                <span className="block text-[10px] font-bold tracking-wider text-brand-cyan uppercase">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="mt-0.5 block font-medium">
                  {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2">
            <AnimatedIcon icon={Clock} size={16} className="text-brand-cyan" interactive={false} />
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Available times — 30 min
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {timeSlots.map((slot) => {
              const active = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={cn(
                    "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "border-brand bg-brand/10 text-text-primary"
                      : "border-border-subtle bg-surface-card/60 text-text-muted hover:border-border-highlight",
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTime ?? "empty"}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-surface-xl border border-border-subtle bg-bg-secondary/40 p-6"
        >
          {selectedTime ? (
            <>
              <h3 className="font-display text-lg font-semibold text-text-primary">
                Confirm your booking
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {formatDateLabel(selectedDateObj)} · {selectedTime} EST · 30 minutes
              </p>

              <div className="mt-5 space-y-4">
                <Input
                  label="Full name"
                  placeholder="Jane Smith"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Work email"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                size="lg"
                className="mt-6 w-full"
                disabled={booking || !name.trim() || !email.trim()}
                onClick={handleBook}
              >
                {booking ? "Booking…" : "Confirm Strategy Call"}
              </Button>

              <p className="mt-3 text-center text-[10px] text-text-muted">
                Demo scheduler — live Cal.com / Calendly integration in Phase 4
              </p>
            </>
          ) : (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
              <Clock size={28} className="mb-3 text-faint" />
              <p className="text-sm text-text-muted">
                Select a date and time to continue
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
