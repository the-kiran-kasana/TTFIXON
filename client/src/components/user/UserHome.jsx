import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles, Star } from "lucide-react";

const services = [
  { icon: "🛠️", title: "Repairs & fixes", text: "Plumbing, electrical and appliance help." },
  { icon: "✨", title: "Cleaning", text: "Fresh, reliable cleaning for every room." },
  { icon: "🎨", title: "Home improvement", text: "Painting and upgrades made simple." },
];

export default function UserHome() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-900">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-xl font-extrabold tracking-tight">on<span className="text-orange-500">demand</span></span>
        <Link href="/admin-dashboard" className="text-sm font-semibold text-slate-600 hover:text-slate-950">Admin dashboard</Link>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:pt-20">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700"><Sparkles size={16} /> Home services, made easy</p>
          <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight sm:text-6xl">Your home deserves <span className="text-orange-500">expert care.</span></h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">Book trusted professionals for the jobs that keep your home running beautifully.</p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800">Explore services <ArrowRight size={18} /></button>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-emerald-500" /> Verified professionals</span>
            <span className="flex items-center gap-2"><Clock3 size={17} className="text-emerald-500" /> Easy scheduling</span>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-orange-400 to-amber-300 p-7 shadow-2xl shadow-orange-200 sm:p-10">
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-slate-500">Popular this week</p><h2 className="mt-1 text-2xl font-extrabold">Deep home cleaning</h2></div><span className="text-4xl">✨</span></div>
            <div className="my-6 h-px bg-slate-100" />
            <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-1 font-bold text-amber-500"><Star size={16} fill="currentColor" /> 4.8</span><span className="font-semibold text-slate-500">From ₹499</span></div>
            <button className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-bold text-white hover:bg-orange-600">Book now</button>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-16"><div className="mx-auto max-w-6xl px-6"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wider text-orange-500">What we do</p><h2 className="mt-2 text-3xl font-extrabold">Services for every home</h2></div><ShieldCheck className="hidden text-slate-300 sm:block" size={42} /></div><div className="grid gap-5 md:grid-cols-3">{services.map((service) => <article key={service.title} className="rounded-2xl border border-stone-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"><span className="text-3xl">{service.icon}</span><h3 className="mt-4 text-lg font-extrabold">{service.title}</h3><p className="mt-2 leading-6 text-slate-600">{service.text}</p></article>)}</div></div></section>
    </main>
  );
}
