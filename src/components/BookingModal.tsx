import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, Car, Tag, Sparkles, User, BadgeAlert, FileCheck, Phone, Check, ArrowLeft, ArrowRight, ClipboardCheck, History } from "lucide-react";
import { DetailingPackage, CustomAddOn, BookingRecord } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: DetailingPackage[];
  addOns: CustomAddOn[];
  initialSelectedPackageId?: string;
  initialSelectedAddOnIds?: string[];
  onBookingSuccess: (record: BookingRecord) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  packages,
  addOns,
  initialSelectedPackageId,
  initialSelectedAddOnIds = [],
  onBookingSuccess,
}: BookingModalProps) {
  const [step, setStep] = useState(1); // Step 1: Config, Step 2: Date/Time & Form, Step 3: Receipt Success
  const [selectedPackId, setSelectedPackId] = useState(packages[1].id);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [isBaseRemoved, setIsBaseRemoved] = useState<boolean>(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");

  // Scheduling Details
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState("");

  const [activeReceipt, setActiveReceipt] = useState<BookingRecord | null>(null);
  const [historyRecords, setHistoryRecords] = useState<BookingRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Synchronize on parameters from parent
  useEffect(() => {
    if (initialSelectedPackageId === "none") {
      setIsBaseRemoved(true);
      setSelectedPackId(packages[1].id);
    } else if (initialSelectedPackageId) {
      setIsBaseRemoved(false);
      setSelectedPackId(initialSelectedPackageId);
    }
  }, [initialSelectedPackageId]);

  useEffect(() => {
    if (initialSelectedAddOnIds.length > 0) {
      setSelectedAddOnIds(initialSelectedAddOnIds);
    }
  }, [initialSelectedAddOnIds]);

  // Read historic logs
  useEffect(() => {
    const list = localStorage.getItem("apex_bookings_list");
    if (list) {
      try {
        setHistoryRecords(JSON.parse(list));
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  const activePackage = packages.find((p) => p.id === selectedPackId) || packages[1];
  const basePrice = isBaseRemoved ? 0 : activePackage.price;
  const selectedAddOnsCost = addOns
    .filter((a) => selectedAddOnIds.includes(a.id))
    .reduce((sum, item) => sum + item.price, 0);
  const totalPrice = basePrice + selectedAddOnsCost;

  // Render 8 calendar projection days for booking
  const getBookingDays = () => {
    const days = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const formatted = d.toISOString().split("T")[0];
      days.push({
        dateStr: formatted,
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        monthName: months[d.getMonth()],
        weekend: isWeekend,
      });
    }
    return days;
  };

  const availableHours = [
    "08:30 AM", "10:30 AM", "01:00 PM", "03:30 PM", "06:00 PM"
  ];

  const handleToggleAddon = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const cleanForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCarModel("");
    setLicensePlate("");
    setSelectedDate("");
    setSelectedTime("");
    setStep(1);
    setIsBaseRemoved(false);
    setShowHistory(false);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select a convenient date and hour slot.");
      return;
    }

    const bookingId = `RAYYMAN-${Date.now().toString().slice(-5)}-${Math.floor(Math.random() * 900 + 100)}`;

    const newRecord: BookingRecord = {
      id: bookingId,
      name,
      email,
      phone,
      carModel,
      licensePlate,
      packageId: isBaseRemoved ? "none" : activePackage.id,
      packageName: isBaseRemoved ? "None" : activePackage.name,
      addOnIds: selectedAddOnIds,
      totalPrice,
      date: selectedDate,
      timeSlot: selectedTime,
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    // Store reservation list
    const updated = [newRecord, ...historyRecords];
    localStorage.setItem("apex_bookings_list", JSON.stringify(updated));
    setHistoryRecords(updated);
    setActiveReceipt(newRecord);
    onBookingSuccess(newRecord);
    setStep(3); // Receipt Step
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = historyRecords.filter((x) => x.id !== id);
    localStorage.setItem("apex_bookings_list", JSON.stringify(updated));
    setHistoryRecords(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 select-none">
      {/* Dimmed backdrop background */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Primary Card */}
      <div className="relative w-full max-w-3xl bg-white border border-neutral-300 rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh] text-neutral-800">
        {/* Header bar */}
        <div className="p-6 bg-neutral-50 border-b border-neutral-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-md bg-blue-600 border border-blue-600 flex items-center justify-center text-white">
              <Sparkles size={14} />
            </span>
            <div>
              <h2 className="font-display font-bold text-xs tracking-widest uppercase text-black font-mono">
                {showHistory ? "STUDIO RECORD HISTORIES" : "RESERVE SCHEDULING SLOT"}
              </h2>
              <p className="text-[9px] text-neutral-500 uppercase font-mono tracking-wider mt-0.5">
                {showHistory ? "Locally logged appointments" : "Studio correction floor slots"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {historyRecords.length > 0 && !showHistory && step !== 3 && (
              <button
                onClick={() => setShowHistory(true)}
                className="text-[10px] font-mono tracking-wider uppercase text-black hover:text-neutral-500 transition-colors flex items-center gap-1.5 cursor-pointer bg-neutral-100 px-3 py-1.5 rounded-md border border-neutral-200 font-bold"
              >
                <History size={13} />
                <span>My Appointments ({historyRecords.length})</span>
              </button>
            )}

            {showHistory && (
              <button
                onClick={() => setShowHistory(false)}
                className="text-[10px] font-mono tracking-wider uppercase text-neutral-500 hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer bg-neutral-100 px-3 py-1.5 rounded-md border border-neutral-200"
              >
                <span>← Back & Reserve</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-md bg-neutral-100 text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer border border-neutral-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Panel scrollable */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8">
          {showHistory ? (
            /* Booking history panel style */
            <div className="space-y-6">
              <div className="flex gap-3 bg-blue-50/50 p-4 rounded-lg border border-blue-200">
                <BookmarkInfoIcon className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-500 leading-relaxed">
                  These records are stored local-first inside your browser cache. Please arrive at the studio bay 10 minutes prior to your selected slot for clear paint depth appraisal.
                </p>
              </div>

              {historyRecords.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 space-y-2">
                  <ClipboardCheck size={28} className="mx-auto opacity-40 text-neutral-400" />
                  <p className="text-xs tracking-wider uppercase font-mono">No Appointments booked yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historyRecords.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-5 rounded-lg bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-neutral-400 transition-all"
                    >
                      <div>
                        <div className="flex gap-2 items-center">
                          <span className="font-display font-bold text-sm text-black tracking-wide">{rec.id}</span>
                          <span className="text-[9px] font-mono tracking-wide px-2 py-0.5 rounded bg-neutral-200 text-black border border-neutral-300 uppercase font-bold">
                            {rec.packageName}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-3 text-xs font-sans text-neutral-500">
                          <div>
                            🚗 <span className="font-bold text-black">{rec.carModel}</span> ({rec.licensePlate})
                          </div>
                          <div>
                            📅 {rec.date} at <span className="font-bold text-black">{rec.timeSlot}</span>
                          </div>
                          <div>
                            👤 Name: {rec.name}
                          </div>
                          <div>
                            💵 Premium Total: <span className="font-bold text-emerald-600 font-mono">TSh {rec.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteHistoryItem(rec.id)}
                        className="text-[10px] uppercase font-mono tracking-widest bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-md border border-red-200 transition-all cursor-pointer font-bold"
                      >
                        Delete Log
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : step === 1 ? (
            /* STEP 1: CHOOSE PACKAGE & ADDONS */
            <div className="space-y-6">
              {/* Packages Deck */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-display text-[11px] uppercase tracking-widest text-neutral-500 font-bold font-mono">
                    Baseline Detailing Formulation
                  </h3>
                  {!isBaseRemoved ? (
                    <button
                      type="button"
                      onClick={() => setIsBaseRemoved(true)}
                      className="text-[10px] uppercase font-mono tracking-wider text-red-500 hover:text-red-700 transition-colors font-bold cursor-pointer"
                    >
                      Remove Base Package ×
                    </button>
                  ) : (
                    <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-600 font-bold">
                      Base Package Removed (Addons Only)
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pack) => {
                    const selected = !isBaseRemoved && pack.id === selectedPackId;
                    return (
                      <div
                        key={pack.id}
                        onClick={() => {
                          setSelectedPackId(pack.id);
                          setIsBaseRemoved(false);
                        }}
                        className={`p-4 rounded-lg border transition-all cursor-pointer ${
                          selected
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 font-bold"
                            : "bg-white text-neutral-800 border-neutral-200 hover:border-blue-600"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-display font-semibold text-xs tracking-wider uppercase">
                            {pack.name}
                          </h4>
                          <span className={`font-display text-xs font-bold font-mono ${selected ? "text-white font-black" : "text-black"}`}>
                            TSh {pack.price.toLocaleString()}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-2 line-clamp-2 ${selected ? "text-blue-100" : "text-neutral-500"}`}>
                          {pack.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Addons Selection checklist */}
              <div>
                <h3 className="font-display text-[11px] uppercase tracking-widest text-neutral-500 mb-3 font-bold font-mono">
                  Supplementary Gloss Inoculations (Optional)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addOns.map((add) => {
                    const active = selectedAddOnIds.includes(add.id);
                    return (
                      <div
                        key={add.id}
                        onClick={() => handleToggleAddon(add.id)}
                        className={`p-3.5 rounded-lg border transition-all cursor-pointer flex justify-between items-center ${
                          active
                            ? "bg-blue-50/50 border-blue-400 text-blue-900"
                            : "bg-white border-neutral-200 hover:border-blue-400 text-neutral-500 hover:text-black"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-5 h-5 rounded-sm border text-[11px] flex items-center justify-center font-bold border-neutral-300 shrink-0 ${active ? "bg-black text-white border-black" : "bg-white"}`}>
                            {active ? <Check size={12} className="stroke-[3]" /> : ""}
                          </div>
                          <div>
                            <div className="text-[11.5px] font-bold uppercase tracking-wider text-black">{add.name}</div>
                            <div className="text-[10.5px] text-neutral-500">{add.description}</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-black font-mono shrink-0 pl-1">
                          +TSh {add.price.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Action Box */}
              <div className="border-t border-neutral-200 pt-6 flex justify-between items-center">
                <div>
                  <div className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">ESTIMATED VALUATION</div>
                  <div className="font-display text-xl font-extrabold text-emerald-600 tracking-tight font-mono mt-1">
                    TSh {totalPrice.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-md font-sans tracking-widest text-[10px] uppercase font-black transition-all flex items-center gap-1 cursor-pointer border border-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 duration-200"
                >
                  <span>Select Date & Form</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            /* STEP 2: DATE/TIME SELECTION & AUTOMOTIVE FORM */
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visual Calendar Picker */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-xs uppercase tracking-widest text-black mb-1 font-bold flex items-center gap-2 font-mono">
                      <Calendar size={13} className="text-black" /> Choose Available Date
                    </h3>
                    <p className="text-[9px] text-neutral-500 uppercase font-mono">Bays projected 8 days out</p>
                  </div>

                  <div className="grid grid-cols-4 gap-2.5">
                    {getBookingDays().map((day) => {
                      const isPicked = selectedDate === day.dateStr;
                      return (
                        <button
                          type="button"
                          key={day.dateStr}
                          onClick={() => setSelectedDate(day.dateStr)}
                          className={`p-2 rounded-md border flex flex-col items-center justify-between transition-all cursor-pointer ${
                            isPicked
                              ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 font-bold"
                              : "bg-white border-neutral-200 hover:border-blue-600 text-neutral-500 hover:text-black"
                          }`}
                        >
                          <span className={`text-[8.5px] uppercase font-mono ${isPicked ? "text-blue-100" : "text-neutral-500"}`}>{day.dayName}</span>
                          <span className={`font-display text-sm font-bold my-0.5 font-mono ${isPicked ? "text-white" : "text-black"}`}>{day.dayNum}</span>
                          <span className={`text-[8px] uppercase tracking-wider font-mono ${isPicked ? "text-blue-100" : "text-neutral-400"}`}>{day.monthName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Hour slots selection */}
                  <div className="pt-2">
                    <h3 className="font-display text-xs uppercase tracking-widest text-black mb-2 font-bold flex items-center gap-2 font-mono">
                      <Clock size={13} className="text-black" /> Available Daily Hour Slots
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {availableHours.map((hour) => {
                        const isPicked = selectedTime === hour;
                        return (
                          <button
                            type="button"
                            key={hour}
                            onClick={() => setSelectedTime(hour)}
                            className={`text-[10px] font-mono uppercase tracking-widest py-1.5 px-3.5 rounded-md border transition-all cursor-pointer ${
                              isPicked
                                ? "bg-blue-600 text-white font-bold border-blue-600 shadow-md shadow-blue-500/20"
                                : "bg-white border-neutral-200 text-neutral-500 hover:text-black hover:border-blue-600"
                            }`}
                          >
                            {hour}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Registration details form */}
                <div className="space-y-3.5">
                  <div>
                    <h3 className="font-display text-xs uppercase tracking-widest text-black mb-1 font-bold flex items-center gap-2 font-mono">
                      <User size={13} className="text-black" /> Owner Registration Details
                    </h3>
                    <p className="text-[9px] text-neutral-500 uppercase font-mono">Ensuring bespoke clearcoat service</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9.5px] font-mono tracking-widest text-neutral-500 uppercase mb-1 font-bold">Owner Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. David Sterling"
                        className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-black outline-none font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9.5px] font-mono tracking-widest text-neutral-500 uppercase mb-1 font-bold">Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="david@sterling.com"
                          className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-black outline-none font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[9.5px] font-mono tracking-widest text-neutral-500 uppercase mb-1 font-bold">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +255 754 051 980"
                          className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-black outline-none font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9.5px] font-mono tracking-widest text-neutral-500 uppercase mb-1 font-bold">Car Model & Year *</label>
                        <input
                          type="text"
                          required
                          value={carModel}
                          onChange={(e) => setCarModel(e.target.value)}
                          placeholder="e.g. Toyota Vanguard (2018)"
                          className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-black outline-none font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[9.5px] font-mono tracking-widest text-neutral-500 uppercase mb-1 font-bold">License Plate *</label>
                        <input
                          type="text"
                          required
                          value={licensePlate}
                          onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                          placeholder="e.g. RAYYMAN 1"
                          className="w-full bg-white border border-neutral-300 rounded-md px-3.5 py-2 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-black outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submission actions row */}
              <div className="border-t border-neutral-200 pt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-neutral-100 text-neutral-500 hover:text-black hover:bg-neutral-200 px-4 py-2.5 rounded-md font-sans tracking-widest text-[9.5px] uppercase font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-neutral-300"
                >
                  <ArrowLeft size={12} />
                  <span>Adjust Packages</span>
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3.5 rounded-md font-sans tracking-widest text-[10px] uppercase font-extrabold transition-all flex items-center gap-2 cursor-pointer border border-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 duration-200"
                >
                  <FileCheck size={14} />
                  <span>Confirm Reserve Booking</span>
                </button>
              </div>
            </form>
          ) : (
            /* STEP 3: RESERVATION COMPLETED RECEIPT TICKET */
            <div className="space-y-6 text-center py-4 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 border-2 border-blue-600 flex items-center justify-center text-white mb-2 shadow-lg shadow-blue-500/20">
                <Check size={28} className="stroke-[3]" />
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">
                  CORRECTION FLOOR SLOT RESERVED
                </span>
                <h3 className="font-display text-2xl font-extrabold text-black tracking-tight mt-1.5">
                  See you at Rayyman Car Wash, {activeReceipt?.name}!
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed mt-2 font-light">
                  A premium appointment has been recorded. Please secure a copy of the detailing receipt coupon below.
                </p>
              </div>

              {/* Stylized premium ticket mock coupon */}
              <div className="w-full max-w-md bg-white border border-neutral-300 rounded-xl overflow-hidden shadow-sm relative text-left p-6 font-mono border-dashed border-2 text-black">
                {/* Side tickets circles match standard backdrop */}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-100 border border-neutral-300" />
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-100 border border-neutral-300" />

                <div className="flex justify-between items-start pb-4 border-b border-neutral-200 border-dashed">
                  <div>
                    <div className="text-[9px] text-neutral-400 uppercase tracking-wider leading-none">APPOINTMENT PASS</div>
                    <div className="text-xs font-bold text-black uppercase tracking-wide mt-1">RAYYMAN CAR WASH</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-black font-bold tracking-wider">{activeReceipt?.id}</div>
                    <div className="text-[8px] text-neutral-400 mt-0.5">ISSUED: 16 JUNE 2026</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 text-xs">
                  <div>
                    <span className="block text-[8.5px] text-neutral-400 uppercase leading-none">FOUNDER MECHANIC</span>
                    <span className="block text-black font-extrabold mt-1 font-sans text-xs">Rayyman Mechanic (Founder)</span>
                  </div>
                  <div>
                    <span className="block text-[8.5px] text-neutral-400 uppercase leading-none">AUTOLINE MODEL</span>
                    <span className="block text-black font-extrabold mt-1 uppercase text-xs">{activeReceipt?.carModel}</span>
                  </div>

                  <div>
                    <span className="block text-[8.5px] text-neutral-400 uppercase leading-none">TIME & DATE</span>
                    <span className="block text-black font-extrabold mt-1 text-xs">{activeReceipt?.date} // {activeReceipt?.timeSlot}</span>
                  </div>
                  <div>
                    <span className="block text-[8.5px] text-neutral-400 uppercase leading-none">REGISTRATION</span>
                    <span className="block text-black font-extrabold mt-1 text-xs">{activeReceipt?.licensePlate}</span>
                  </div>
                </div>

                <div className="py-4 border-t border-neutral-200 border-dashed">
                  <span className="block text-[8.5px] text-neutral-400 uppercase mb-1.5">FORMULA DETAIL SHEET</span>
                  <div className="space-y-1">
                    {activeReceipt?.packageId !== "none" && (
                      <div className="flex justify-between text-[11px] text-black font-sans font-bold">
                        <span>• {activeReceipt?.packageName}</span>
                        <span className="font-mono text-black">TSh {packages.find(p => p.id === activeReceipt?.packageId)?.price.toLocaleString()}</span>
                      </div>
                    )}

                    {activeReceipt?.addOnIds.map((aid) => (
                      <div key={aid} className="flex justify-between text-[10.5px] text-neutral-500 font-sans pl-2">
                        <span>+ {addOns.find((a) => a.id === aid)?.name}</span>
                        <span className="font-mono text-neutral-700">TSh {addOns.find((a) => a.id === aid)?.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex justify-between items-end border-dashed">
                  <div className="w-16 h-16 bg-white p-1 rounded-md shrink-0 flex items-center justify-center border border-neutral-200">
                    {/* Simulated High-Res QR code vector elements */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current animate-none">
                      <rect x="0" y="0" width="20" height="20" />
                      <rect x="5" y="5" width="10" height="10" fill="white" />
                      <rect x="80" y="0" width="20" height="20" />
                      <rect x="85" y="5" width="10" height="10" fill="white" />
                      <rect x="0" y="80" width="20" height="20" />
                      <rect x="5" y="85" width="10" height="10" fill="white" />
                      <rect x="40" y="40" width="20" height="20" />
                      <rect x="25" y="25" width="10" height="10" />
                      <rect x="65" y="25" width="10" height="10" />
                      <rect x="25" y="65" width="15" height="15" />
                      <rect x="65" y="65" width="10" height="10" />
                    </svg>
                  </div>

                  <div className="text-right">
                    <span className="block text-[8.5px] text-neutral-400 uppercase leading-none">TOTAL LOCKED IN PRICE</span>
                    <span className="block text-xl font-extrabold text-emerald-600 tracking-tight mt-1 font-mono">TSh {activeReceipt?.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Bottom complete action buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={cleanForm}
                  className="bg-neutral-100 text-neutral-500 hover:text-black hover:bg-neutral-200 px-6 py-3 rounded-md font-sans tracking-widest text-[10px] uppercase font-bold transition-all cursor-pointer border border-neutral-300"
                >
                  Book New Slot
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-md font-sans tracking-widest text-[10px] uppercase font-bold transition-all cursor-pointer border border-blue-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 duration-200"
                >
                  Finish & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple Bookmark / info icon representation
function BookmarkInfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
