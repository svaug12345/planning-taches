"use client";

import { useState } from "react";

type ChildId = "nanon" | "gaby" | "tom";

type ChildInfo = {
  id: ChildId;
  name: string;
  avatar: string;
  badgeClass: string;
  cardClass: string;
};

type Task = {
  id: string;
  childId: ChildId;
  title: string;
  day: string;
  timeSlot: "Matin" | "Midi / Après-midi" | "Soir";
  done: boolean;
};

const CHILDREN: Record<ChildId, ChildInfo> = {
  nanon: {
    id: "nanon",
    name: "Nanon",
    avatar: "🌸",
    badgeClass: "bg-pink-100 text-pink-700 border-pink-200",
    cardClass: "border-pink-200/80 bg-pink-50/40 text-pink-950",
  },
  gaby: {
    id: "gaby",
    name: "Gaby",
    avatar: "⚡",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
    cardClass: "border-amber-200/80 bg-amber-50/40 text-amber-950",
  },
  tom: {
    id: "tom",
    name: "Tom",
    avatar: "🚀",
    badgeClass: "bg-sky-100 text-sky-700 border-sky-200",
    cardClass: "border-sky-200/80 bg-sky-50/40 text-sky-950",
  },
};

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const SLOTS: Task["timeSlot"][] = ["Matin", "Midi / Après-midi", "Soir"];

export default function PlanningPage() {
  const [selectedDay, setSelectedDay] = useState<string>("Lundi");
  const [selectedChild, setSelectedChild] = useState<ChildId | "all">("all");

  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", childId: "gaby", title: "Promener le chien", day: "Lundi", timeSlot: "Matin", done: false },
    { id: "2", childId: "nanon", title: "Mettre la table", day: "Lundi", timeSlot: "Soir", done: true },
    { id: "3", childId: "tom", title: "Sortir les poubelles", day: "Lundi", timeSlot: "Soir", done: false },
    { id: "4", childId: "tom", title: "Arroser les plantes", day: "Mardi", timeSlot: "Matin", done: false },
    { id: "5", childId: "nanon", title: "Ranger sa chambre", day: "Mardi", timeSlot: "Midi / Après-midi", done: false },
    { id: "6", childId: "gaby", title: "Vider le lave-vaisselle", day: "Mardi", timeSlot: "Soir", done: false },
    { id: "7", childId: "nanon", title: "Donner aux animaux", day: "Mercredi", timeSlot: "Matin", done: false },
    { id: "8", childId: "tom", title: "Passer l'aspirateur", day: "Mercredi", timeSlot: "Midi / Après-midi", done: false },
    { id: "9", childId: "gaby", title: "Débarrasser la table", day: "Jeudi", timeSlot: "Soir", done: false },
    { id: "10", childId: "nanon", title: "Plier le linge", day: "Vendredi", timeSlot: "Midi / Après-midi", done: false },
    { id: "11", childId: "tom", title: "Nettoyer l'entrée", day: "Samedi", timeSlot: "Matin", done: false },
    { id: "12", childId: "gaby", title: "Brosser le chien", day: "Dimanche", timeSlot: "Midi / Après-midi", done: false },
  ]);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesDay = task.day === selectedDay;
    const matchesChild = selectedChild === "all" || task.childId === selectedChild;
    return matchesDay && matchesChild;
  });

  const completedCount = tasks.filter((t) => t.day === selectedDay && t.done).length;
  const totalDayCount = tasks.filter((t) => t.day === selectedDay).length;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-400">
              Organisation maison
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">
              Planning Hebdomadaire
            </h1>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-sm overflow-x-auto">
            <button
              onClick={() => setSelectedChild("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedChild === "all"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Tous
            </button>
            {Object.values(CHILDREN).map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  selectedChild === child.id
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <span>{child.avatar}</span>
                <span>{child.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 border-t border-stone-100 flex gap-2 overflow-x-auto py-2.5">
          {DAYS.map((day) => {
            const isSelected = selectedDay === day;
            const dayTaskCount = tasks.filter((t) => t.day === day).length;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-white text-stone-600 border border-stone-200/80 hover:bg-stone-50"
                }`}
              >
                <span>{day}</span>
                {dayTaskCount > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-stone-700 text-stone-200"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {dayTaskCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-stone-900">{selectedDay}</h2>
          <p className="text-sm text-stone-500">
            {totalDayCount === 0
              ? "Aucune mission prévue pour ce jour."
              : `${completedCount} sur ${totalDayCount} tâche(s) complétée(s)`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SLOTS.map((slot) => {
            const slotTasks = visibleTasks.filter((t) => t.timeSlot === slot);

            return (
              <section
                key={slot}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
                  <h3 className="font-semibold text-stone-700 text-sm tracking-wide uppercase">
                    {slot}
                  </h3>
                  <span className="text-xs text-stone-400 font-mono">
                    {slotTasks.length} mission{slotTasks.length > 1 ? "s" : ""}
                  </span>
                </div>

                {slotTasks.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center py-8 text-xs text-stone-400 border border-dashed border-stone-200 rounded-xl bg-stone-50/50">
                    Rien à faire
                  </div>
                ) : (
                  <div className="space-y-3">
                    {slotTasks.map((task) => {
                      const child = CHILDREN[task.childId];
                      return (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`group cursor-pointer rounded-xl border p-4 transition-all duration-150 ${child.cardClass} ${
                            task.done
                              ? "opacity-50 grayscale hover:opacity-75"
                              : "hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${child.badgeClass}`}
                            >
                              <span>{child.avatar}</span>
                              <span>{child.name}</span>
                            </span>

                            <input
                              type="checkbox"
                              checked={task.done}
                              readOnly
                              aria-label={task.title}
                              className="mt-0.5 h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-0 pointer-events-none"
                            />
                          </div>

                          <p
                            className={`text-sm font-semibold leading-snug ${
                              task.done ? "line-through text-stone-500" : "text-stone-900"
                            }`}
                          >
                            {task.title}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}