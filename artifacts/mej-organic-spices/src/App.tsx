import { useMemo, useState, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDownRight, ArrowRight, Check, ChevronLeft, ChevronRight, CircleCheck, Clock3, Flower2, Leaf, Mail, MapPin, Menu, Minus, Phone, Search, ShoppingBag, Sparkles, Utensils, X } from 'lucide-react';
import { Router as WouterRouter, Switch, Route, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';
import logo from '@assets/logo_1787222897185.jpg';
import friedRice from '@assets/friedrice3_1787222897185.jpg';
import friedRiceTable from '@assets/friedrice_1787222936510.jpg';
import jollof from '@assets/jollof-rice_1787222897185.jpg';
import egusi from '@assets/egusi-soup1_1787222897185.jpg';
import okro from '@assets/okrosoup2_1787222897185.jpg';
import banga from '@assets/bangasoup_1787222897185.jpg';
import moiMoi from '@assets/moimoi1_1787222897185.jpg';
import harvard from '@assets/harvardstew_1787222897185.jpg';
import whiteSoup from '@assets/whitesoup1_1787222897185.jpg';
import catfish from '@assets/catfishpeppersoup2_1787222897185.jpg';
import nativeRice from '@assets/nativerice3_1787222897185.jpg';
import goatSoup from '@assets/goatmeatpeppersoup2_1787222897185.jpg';
import beans from '@assets/beansvegetable-stew_1787222897185.jpeg';
import flyer from '@assets/Mej_kitchen_flyer_page-0001_1787222897185.jpg';
import foodPoster from '@assets/FOOD_page-0001_1787222897185.jpg';
import sticker from '@assets/MEJ_KITCHEN_STICKER_1787222897185.jpg';

const queryClient = new QueryClient();

type Food = { name: string; detail: string; category: string; image: string; tag?: string };
const foods: Food[] = [
  { name: 'Jollof Rice', detail: 'Smoky, tomato-rich party rice', category: 'Rice & mains', image: jollof, tag: 'Best seller' },
  { name: 'Fried Rice & Chicken', detail: 'Colourful rice with tender roast chicken', category: 'Rice & mains', image: friedRice },
  { name: 'Egusi Soup', detail: 'Ground melon seed, greens and rich stock', category: 'Soups & stews', image: egusi },
  { name: 'Okro Soup', detail: 'A bright, seafood-laced West African classic', category: 'Soups & stews', image: okro },
  { name: 'Banga Soup', detail: 'Palm fruit, spices and comforting depth', category: 'Soups & stews', image: banga },
  { name: 'Moi Moi', detail: 'Steamed bean pudding wrapped with care', category: 'Small plates', image: moiMoi },
  { name: 'Harvard Stew', detail: 'Peppery stew with eggs and offal', category: 'Soups & stews', image: harvard },
  { name: 'Catfish Pepper Soup', detail: 'Fragrant broth, catfish and fresh herbs', category: 'Soups & stews', image: catfish },
  { name: 'Native Rice', detail: 'Heritage rice with smoky, savoury notes', category: 'Rice & mains', image: nativeRice },
  { name: 'Goat Meat Pepper Soup', detail: 'Slow-cooked goat with warming spice', category: 'Soups & stews', image: goatSoup },
  { name: 'Beans & Vegetable Stew', detail: 'Hearty beans with a vibrant pepper base', category: 'Small plates', image: beans },
  { name: 'White Soup', detail: 'Silky, peppered broth for gathering days', category: 'Soups & stews', image: whiteSoup },
];

const stories = [
  ['Amaka O.', 'Leeds', '“The jollof arrived fragrant and generous. It made our naming day feel like home, even three hours away.”'],
  ['Chinonso E.', 'London', '“MEJ understood the brief immediately — beautiful florals, warm service, and food our whole family could share.”'],
  ['Bisi A.', 'Birmingham', '“The pepper soup was the first dish to disappear. Everyone asked who had cooked it.”'],
  ['Tobi & Femi', 'Manchester', '“Our wedding table looked considered, not overdone. Every detail felt personal.”'],
  ['Kemi R.', 'Sheffield', '“I ordered pantry staples for my mum and added flowers for myself. Both arrived with so much care.”'],
  ['Yemi D.', 'Nottingham', '“Authentic flavours, no fuss, and a team that listens. MEJ is now our family’s first call.”'],
];

const flowerFilters = ['All', 'Weddings', 'Sympathy', 'Everyday', 'Events'];
const flowerNotes: Record<string, { title: string; copy: string; image: string }> = {
  All: { title: 'A thoughtful starting point', copy: 'Tell us the feeling, colour and scale you have in mind. We shape the rest together.', image: flyer },
  Weddings: { title: 'For the day you keep', copy: 'Soft, celebratory arrangements designed to sit naturally alongside your food and your people.', image: flyer },
  Sympathy: { title: 'For quiet moments', copy: 'Considered blooms with a gentle presence, prepared with care and delivered respectfully.', image: sticker },
  Everyday: { title: 'A little beauty, often', copy: 'Fresh flowers for the kitchen table, a thank-you, or simply because it is Tuesday.', image: sticker },
  Events: { title: 'Make the room sing', copy: 'Floral details for celebrations and gatherings, made to complement the atmosphere.', image: flyer },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Header({ onQuote }: { onQuote: () => void }) {
  const [open, setOpen] = useState(false);
  const go = (id: string) => { setOpen(false); scrollToId(id); };
  return (
    <>
      <div className="bg-[hsl(var(--primary))] px-5 py-2 text-center text-[10px] font-bold uppercase tracking-[.2em] text-[hsl(var(--accent))]">
        Grimsby, UK · rooted in nature, served with love
      </div>
      <header className="sticky top-0 z-40 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <button onClick={() => go('home')} className="focus-ring rounded-md" data-testid="button-logo-home" aria-label="MEJ Organic & Spices home">
            <img src={logo} alt="MEJ Organic & Spices" className="h-12 w-[112px] object-cover object-center mix-blend-multiply md:h-14 md:w-[132px]" />
          </button>
          <nav className="hidden items-center gap-7 text-xs font-semibold text-[hsl(var(--primary))] lg:flex" aria-label="Main navigation">
            <button className="focus-ring hover:text-[hsl(var(--accent))]" onClick={() => go('services')} data-testid="link-services">What we do</button>
            <button className="focus-ring hover:text-[hsl(var(--accent))]" onClick={() => go('food')} data-testid="link-food">Food collection</button>
            <button className="focus-ring hover:text-[hsl(var(--accent))]" onClick={() => go('flowers')} data-testid="link-flowers">Flowers</button>
            <button className="focus-ring hover:text-[hsl(var(--accent))]" onClick={() => go('story')} data-testid="link-story">Our story</button>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+447901161062" className="focus-ring flex items-center gap-2 text-xs font-semibold text-[hsl(var(--primary))]" data-testid="link-header-phone"><Phone size={14} /> +44 7901 161062</a>
            <button onClick={onQuote} className="focus-ring rounded-full bg-[hsl(var(--accent))] px-5 py-3 text-xs font-bold text-[hsl(var(--primary))] transition-transform hover:-translate-y-0.5" data-testid="button-header-quote">Plan something beautiful <ArrowRight size={14} className="ml-1 inline" /></button>
          </div>
          <button className="focus-ring rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)} data-testid="button-mobile-menu" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-[hsl(var(--border))] px-5 pb-5 pt-3 lg:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {['services', 'food', 'flowers', 'story'].map((item) => <button key={item} onClick={() => go(item)} className="focus-ring rounded-lg px-3 py-3 text-left text-sm font-semibold capitalize text-[hsl(var(--primary))] hover:bg-[hsl(var(--muted))]" data-testid={`link-mobile-${item}`}>{item === 'food' ? 'Food collection' : item === 'story' ? 'Our story' : item === 'services' ? 'What we do' : 'Flowers'}</button>)}
              <button onClick={() => { setOpen(false); onQuote(); }} className="mt-2 rounded-full bg-[hsl(var(--accent))] px-4 py-3 text-sm font-bold text-[hsl(var(--primary))]" data-testid="button-mobile-quote">Plan something beautiful</button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

function SectionHeading({ kicker, title, copy, light = false }: { kicker: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`max-w-2xl ${light ? 'text-[hsl(var(--background))]' : 'text-[hsl(var(--primary))]'}`}>
      <p className={`eyebrow mb-4 ${light ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--accent))]'}`}>{kicker}</p>
      <h2 className="serif text-4xl font-semibold leading-[.98] tracking-[-.025em] md:text-6xl">{title}</h2>
      {copy && <p className={`mt-5 max-w-xl text-base leading-7 ${light ? 'text-[hsl(var(--background))]/70' : 'text-[hsl(var(--muted-foreground))]'}`}>{copy}</p>}
    </div>
  );
}

function QuoteModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', event: '', guests: '', services: [] as string[], date: '', location: '', notes: '' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const toggleService = (service: string) => setForm((current) => ({ ...current, services: current.services.includes(service) ? current.services.filter((item) => item !== service) : [...current.services, service] }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const body = [`Name: ${form.name}`, `Email: ${form.email}`, `Phone: ${form.phone}`, `Event type: ${form.event}`, `Guests: ${form.guests}`, `Services: ${form.services.join(', ') || 'Not selected'}`, `Date: ${form.date}`, `Location: ${form.location}`, `Notes: ${form.notes || 'None'}`].join('\n');
    window.location.href = `mailto:hello@mejorganicandspices.co.uk?subject=${encodeURIComponent(`MEJ request from ${form.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <div className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center bg-[hsl(var(--primary))]/70 p-0 backdrop-blur-sm md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="quote-title">
      <div className="modal-panel max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 shadow-2xl md:rounded-[2rem] md:p-9">
        <div className="mb-7 flex items-start justify-between">
          <div><p className="eyebrow text-[hsl(var(--accent))]">A good place to begin</p><h2 id="quote-title" className="serif mt-2 text-4xl font-semibold text-[hsl(var(--primary))]">{sent ? 'Your request is on its way' : 'Let’s make something beautiful'}</h2></div>
          <button onClick={onClose} className="focus-ring rounded-full border border-[hsl(var(--border))] p-2 text-[hsl(var(--primary))]" data-testid="button-close-quote" aria-label="Close request form"><X size={18} /></button>
        </div>
        {sent ? (
          <div className="rounded-2xl bg-[hsl(var(--secondary))] p-7 text-center" data-testid="status-quote-success">
            <CircleCheck className="mx-auto mb-4 text-[hsl(var(--primary))]" size={42} />
            <p className="text-lg font-semibold text-[hsl(var(--primary))]">Thank you, {form.name.split(' ')[0] || 'friend'}.</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">Your email app should have opened with the details. If it did not, email us directly at hello@mejorganicandspices.co.uk.</p>
            <button onClick={onClose} className="mt-6 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-bold text-[hsl(var(--background))]" data-testid="button-success-close">Back to MEJ</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="mb-8 flex items-center gap-2" aria-label={`Step ${step} of 3`}>
              {[1, 2, 3].map((number) => <div key={number} className={`flex items-center gap-2 ${number < 3 ? 'flex-1' : ''}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${number <= step ? 'bg-[hsl(var(--primary))] text-[hsl(var(--background))]' : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]'}`}>{number < step ? <Check size={14} /> : number}</span>{number < 3 && <span className={`h-px flex-1 ${number < step ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--border))]'}`} />}</div>)}
            </div>
            {step === 1 && <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" value={form.name} onChange={(v) => update('name', v)} required testId="input-quote-name" placeholder="Full name" />
              <Field label="Email address" type="email" value={form.email} onChange={(v) => update('email', v)} required testId="input-quote-email" placeholder="you@example.com" />
              <Field label="Phone number" type="tel" value={form.phone} onChange={(v) => update('phone', v)} required testId="input-quote-phone" placeholder="+44..." />
              <label className="block"><span className="mb-2 block text-xs font-bold text-[hsl(var(--primary))]">Event type</span><select required value={form.event} onChange={(e) => update('event', e.target.value)} className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm text-[hsl(var(--primary))]" data-testid="select-quote-event"><option value="">Choose one</option><option>Wedding</option><option>Birthday</option><option>Corporate lunch</option><option>Family gathering</option><option>Special occasion</option></select></label>
            </div>}
            {step === 2 && <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2"><Field label="Guest count" type="number" value={form.guests} onChange={(v) => update('guests', v)} required testId="input-quote-guests" placeholder="Approx. number" /><Field label="Date" type="date" value={form.date} onChange={(v) => update('date', v)} required testId="input-quote-date" /><Field label="Location" value={form.location} onChange={(v) => update('location', v)} required testId="input-quote-location" placeholder="Town or venue" /></div>
              <fieldset><legend className="mb-3 text-xs font-bold text-[hsl(var(--primary))]">What can we help with?</legend><div className="grid gap-2 sm:grid-cols-3">{['Catering & events', 'Fresh flowers', 'African foodstuff'].map((service) => <label key={service} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm ${form.services.includes(service) ? 'border-[hsl(var(--accent))] bg-[hsl(var(--secondary))]' : 'border-[hsl(var(--border))]'}`}><input type="checkbox" checked={form.services.includes(service)} onChange={() => toggleService(service)} className="accent-[hsl(var(--primary))]" data-testid={`checkbox-service-${service.toLowerCase().replaceAll(' ', '-')}`} />{service}</label>)}</div></fieldset>
              <label className="block"><span className="mb-2 block text-xs font-bold text-[hsl(var(--primary))]">Anything else we should know?</span><textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={3} className="focus-ring w-full resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm" data-testid="textarea-quote-notes" placeholder="Colour ideas, dietary notes, timings..." /></label>
            </div>}
            {step === 3 && <div className="space-y-4">
              <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">Please check your details. Selecting “Send request” will open your email app addressed to hello@mejorganicandspices.co.uk.</p>
              <div className="grid gap-3 rounded-2xl bg-[hsl(var(--secondary))] p-5 text-sm text-[hsl(var(--primary))] sm:grid-cols-2" data-testid="summary-quote"><Summary label="Name" value={form.name} /><Summary label="Email" value={form.email} /><Summary label="Event" value={form.event} /><Summary label="Guests" value={form.guests} /><Summary label="Services" value={form.services.join(', ') || 'Not selected'} /><Summary label="Date & place" value={`${form.date} · ${form.location}`} /></div>
            </div>}
            <div className="mt-8 flex items-center justify-between gap-3 border-t border-[hsl(var(--border))] pt-5">{step > 1 ? <button type="button" onClick={() => setStep(step - 1)} className="focus-ring flex items-center gap-1 rounded-full px-3 py-3 text-sm font-semibold text-[hsl(var(--primary))]" data-testid="button-quote-back"><ChevronLeft size={16} /> Back</button> : <span />}{step < 3 ? <button type="button" onClick={() => setStep(step + 1)} className="focus-ring flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-6 py-3 text-sm font-bold text-[hsl(var(--primary))]" data-testid={`button-quote-next-${step}`}>Continue <ChevronRight size={16} /></button> : <button type="submit" className="focus-ring flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-sm font-bold text-[hsl(var(--background))]" data-testid="button-quote-submit">Send request <Mail size={16} /></button>}</div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required = false, testId, placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; testId: string; placeholder?: string }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold text-[hsl(var(--primary))]">{label}</span><input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm text-[hsl(var(--primary))]" data-testid={testId} /></label>;
}
function Summary({ label, value }: { label: string; value: string }) { return <div><p className="text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{label}</p><p className="mt-1 font-semibold">{value || '—'}</p></div>; }

function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [foodCategory, setFoodCategory] = useState('All');
  const [foodSearch, setFoodSearch] = useState('');
  const [flowerFilter, setFlowerFilter] = useState('All');
  const [storyIndex, setStoryIndex] = useState(0);
  const categories = ['All', 'Rice & mains', 'Soups & stews', 'Small plates'];
  const visibleFoods = useMemo(() => foods.filter((food) => (foodCategory === 'All' || food.category === foodCategory) && `${food.name} ${food.detail}`.toLowerCase().includes(foodSearch.toLowerCase())), [foodCategory, foodSearch]);
  const flower = flowerNotes[flowerFilter];

  return (
    <div className="mej-page bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Header onQuote={() => setQuoteOpen(true)} />
      <main>
        <section id="home" className="grain relative overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--background))]">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:min-h-[680px] md:grid-cols-[.9fr_1.1fr] md:px-8 md:py-20">
            <div className="relative z-10 reveal">
              <p className="eyebrow mb-5 text-[hsl(var(--accent))]">MEJ Organic & Spices · Grimsby</p>
              <h1 className="serif max-w-xl text-6xl font-semibold leading-[.86] tracking-[-.04em] md:text-8xl">Rooted in<br /><em className="font-medium text-[hsl(var(--accent))]">Nature.</em><br />Served with<br />Love.</h1>
              <p className="mt-7 max-w-md text-base leading-7 text-[hsl(var(--background))]/75 md:text-lg">Premium catering, fresh flowers, and authentic African foodstuff — made for the moments that bring us together.</p>
              <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setQuoteOpen(true)} className="focus-ring rounded-full bg-[hsl(var(--accent))] px-6 py-3.5 text-sm font-bold text-[hsl(var(--primary))] transition-transform hover:-translate-y-1" data-testid="button-hero-quote">Request a catering quote <ArrowRight size={16} className="ml-2 inline" /></button><button onClick={() => scrollToId('food')} className="focus-ring rounded-full border border-[hsl(var(--background))]/35 px-6 py-3.5 text-sm font-bold text-[hsl(var(--background))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="button-hero-shop">Browse the food shop</button></div>
              <div className="mt-11 flex items-center gap-7 border-t border-[hsl(var(--background))]/20 pt-5 text-xs text-[hsl(var(--background))]/65"><span><strong className="block text-2xl text-[hsl(var(--accent))]">100%</strong>organic</span><span><strong className="block text-2xl text-[hsl(var(--accent))]">UK</strong>based & local</span><span><strong className="block text-2xl text-[hsl(var(--accent))]">3</strong>ways to gather</span></div>
            </div>
            <div className="relative min-h-[420px] md:min-h-[570px] reveal reveal-delay-2">
              <div className="absolute right-0 top-0 h-[65%] w-[66%] overflow-hidden rounded-[10rem_1.5rem_1.5rem_1.5rem] border-8 border-[hsl(var(--accent))]/20 shadow-2xl"><img src={friedRiceTable} alt="A generous dish of fried rice and chicken" className="img-transition h-full w-full object-cover" /></div>
              <div className="image-wash absolute bottom-0 left-0 h-[58%] w-[62%] overflow-hidden rounded-[1.5rem_7rem_1.5rem_1.5rem] border-8 border-[hsl(var(--background))]/10 shadow-2xl"><img src={egusi} alt="Egusi soup prepared for a shared table" className="img-transition h-full w-full object-cover" /><span className="absolute bottom-5 left-5 z-10 text-sm font-semibold text-[hsl(var(--background))]">Made for the shared table</span></div>
              <div className="absolute bottom-16 right-3 z-10 flex h-28 w-28 rotate-6 items-center justify-center rounded-full bg-[hsl(var(--accent))] p-4 text-center text-xs font-bold uppercase leading-4 text-[hsl(var(--primary))] shadow-xl md:right-12"><Sparkles size={17} className="absolute top-3" />Freshness in every detail</div>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-[hsl(var(--accent))]/25" />
        </section>

        <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary))]">
          <div className="mx-auto grid max-w-7xl gap-0 px-5 py-5 md:grid-cols-3 md:px-8">
            {[['01', '100% organic', 'Quality ingredients selected with care.'], ['02', 'Sourced with tradition', 'Authentic flavours and heritage at the heart.'], ['03', 'Bespoke service', 'Thoughtful details shaped around your occasion.']].map(([number, title, copy]) => <div key={number} className="flex gap-4 border-b border-[hsl(var(--primary))]/10 py-5 last:border-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-0"><span className="serif text-3xl text-[hsl(var(--accent))]">{number}</span><div><h3 className="font-semibold text-[hsl(var(--primary))]">{title}</h3><p className="mt-1 text-sm leading-5 text-[hsl(var(--muted-foreground))]">{copy}</p></div></div>)}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading kicker="Three ways to gather" title="Good things, made personal." copy="From the first conversation to the last plate, we bring warmth, care and a sense of occasion." /><button onClick={() => setQuoteOpen(true)} className="focus-ring flex w-fit items-center gap-2 border-b border-[hsl(var(--accent))] pb-2 text-sm font-bold text-[hsl(var(--primary))]" data-testid="button-services-quote">Talk to us about your plans <ArrowDownRight size={17} /></button></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <ServiceCard number="01" icon={<Utensils size={22} />} title="Catering & events" copy="Deliciously prepared meals for weddings, parties, family gatherings and corporate lunches." image={foodPoster} onClick={() => setQuoteOpen(true)} />
            <ServiceCard number="02" icon={<Flower2 size={22} />} title="Boutique fresh flowers" copy="Beautiful blooms for every moment. Handpicked for freshness, crafted with care." image={flyer} onClick={() => scrollToId('flowers')} />
            <ServiceCard number="03" icon={<Leaf size={22} />} title="African foodstuff" copy="Authentic African ingredients sourced with care — pure, natural and full of tradition." image={sticker} onClick={() => scrollToId('food')} />
          </div>
        </section>

        <section id="food" className="bg-[hsl(var(--card))] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><SectionHeading kicker="From our kitchen" title="Food that starts a conversation." copy="A browseable taste of the dishes and flavours we bring to your table. Ask us what is fresh for your date." /><div className="relative w-full md:w-64"><Search size={17} className="absolute left-4 top-3.5 text-[hsl(var(--muted-foreground))]" /><input type="search" value={foodSearch} onChange={(e) => setFoodSearch(e.target.value)} placeholder="Search dishes" className="focus-ring w-full rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] py-3 pl-11 pr-4 text-sm" data-testid="input-food-search" /></div></div>
            <div className="mobile-scroll mt-9 flex gap-2 pb-2">{categories.map((category) => <button key={category} onClick={() => setFoodCategory(category)} className={`focus-ring whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition-colors ${foodCategory === category ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--background))]' : 'border-[hsl(var(--border))] text-[hsl(var(--primary))] hover:border-[hsl(var(--accent))]'}`} data-testid={`button-food-filter-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}</div>
            {visibleFoods.length ? <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{visibleFoods.map((food, index) => <FoodCard key={food.name} food={food} index={index} />)}</div> : <div className="rounded-2xl border border-dashed border-[hsl(var(--border))] py-14 text-center" data-testid="empty-food-results"><ShoppingBag className="mx-auto mb-3 text-[hsl(var(--accent))]" /><p className="font-semibold text-[hsl(var(--primary))]">Nothing on that plate just yet.</p><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Try a different search or browse all of the collection.</p><button onClick={() => { setFoodSearch(''); setFoodCategory('All'); }} className="mt-4 text-sm font-bold underline" data-testid="button-reset-food">Reset collection</button></div>}
          </div>
        </section>

        <section id="flowers" className="bg-[hsl(var(--primary))] px-5 py-20 text-[hsl(var(--background))] md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-end"><SectionHeading light kicker="The floral edit" title="Flowers with a feeling." copy="A fresh bloom can say what words cannot. Choose the occasion and we will begin with the right mood, colour and shape." /><div className="flex flex-wrap gap-2 md:justify-end">{flowerFilters.map((filter) => <button key={filter} onClick={() => setFlowerFilter(filter)} className={`focus-ring rounded-full border px-4 py-2 text-xs font-bold transition-colors ${flowerFilter === filter ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))] text-[hsl(var(--primary))]' : 'border-[hsl(var(--background))]/30 text-[hsl(var(--background))] hover:border-[hsl(var(--accent))]'}`} data-testid={`button-flower-filter-${filter.toLowerCase()}`}>{filter}</button>)}</div></div>
            <div className="mt-12 grid gap-5 md:grid-cols-[1.1fr_.9fr]">
              <div className="relative min-h-[370px] overflow-hidden rounded-[2rem] border border-[hsl(var(--background))]/15 bg-[hsl(var(--background))]/10"><img src={flower.image} alt={`MEJ floral inspiration for ${flowerFilter}`} className="h-full min-h-[370px] w-full object-cover object-center transition-opacity duration-300" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[hsl(var(--primary))] to-transparent p-7 pt-24"><p className="eyebrow text-[hsl(var(--accent))]">Selected: {flowerFilter}</p><h3 className="serif mt-2 text-4xl">{flower.title}</h3></div></div>
              <div className="flex flex-col justify-between rounded-[2rem] bg-[hsl(var(--secondary))] p-7 text-[hsl(var(--primary))] md:p-10"><div><Flower2 size={30} className="text-[hsl(var(--accent))]" /><h3 className="serif mt-8 text-4xl leading-none">The right bloom<br />changes the room.</h3><p className="mt-5 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{flower.copy}</p></div><div className="mt-10 border-t border-[hsl(var(--primary))]/15 pt-5"><p className="text-xs leading-5 text-[hsl(var(--muted-foreground))]">Our current floral imagery is shown in the MEJ flyer and sticker. We keep every arrangement honest to what is fresh and available.</p><button onClick={() => setQuoteOpen(true)} className="focus-ring mt-5 flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-bold text-[hsl(var(--background))]" data-testid="button-flower-request">Discuss your flowers <ArrowRight size={15} /></button></div></div>
            </div>
          </div>
        </section>

        <section id="story" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[.85fr_1.15fr] md:items-center md:px-8 md:py-28">
          <div className="relative mx-auto w-full max-w-md"><div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-[hsl(var(--accent))]" /><img src={flyer} alt="MEJ Organic & Spices brand flyer" className="relative w-full rounded-[2rem] shadow-xl" /></div>
          <div><SectionHeading kicker="Our story" title="A little bit of home, made here." copy="MEJ Organic & Spices began with a simple belief: food, flowers and generosity belong in the same conversation. From our base in Grimsby, we bring the best of nature to celebrations across the UK — with Nigerian heritage at the heart of every detail." /><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-[hsl(var(--secondary))] p-5"><Clock3 className="text-[hsl(var(--accent))]" size={21} /><p className="mt-4 text-sm font-semibold text-[hsl(var(--primary))]">Prepared with patience</p><p className="mt-1 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Quality, freshness and love in every detail.</p></div><div className="rounded-2xl bg-[hsl(var(--primary))] p-5 text-[hsl(var(--background))]"><MapPin className="text-[hsl(var(--accent))]" size={21} /><p className="mt-4 text-sm font-semibold">Made in Grimsby</p><p className="mt-1 text-xs leading-5 text-[hsl(var(--background))]/65">Rooted locally, ready to travel for your occasion.</p></div></div></div>
        </section>

        <section className="bg-[hsl(var(--secondary))] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl"><div className="flex items-end justify-between gap-5"><SectionHeading kicker="Kind words from the table" title="Stories worth passing on." /><div className="hidden gap-2 sm:flex"><button onClick={() => setStoryIndex((storyIndex - 1 + stories.length) % stories.length)} className="focus-ring rounded-full border border-[hsl(var(--primary))]/20 p-3 text-[hsl(var(--primary))]" data-testid="button-testimonials-previous" aria-label="Previous testimonial"><ChevronLeft size={18} /></button><button onClick={() => setStoryIndex((storyIndex + 1) % stories.length)} className="focus-ring rounded-full border border-[hsl(var(--primary))]/20 p-3 text-[hsl(var(--primary))]" data-testid="button-testimonials-next" aria-label="Next testimonial"><ChevronRight size={18} /></button></div></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">{[0, 1, 2].map((offset) => { const [name, city, quote] = stories[(storyIndex + offset) % stories.length]; return <article key={`${name}-${offset}`} className="testimonial-card rounded-[1.5rem] border border-[hsl(var(--primary))]/10 bg-[hsl(var(--background))] p-6" data-testid={`card-testimonial-${offset}`}><div className="mb-8 flex items-center justify-between"><span className="flex gap-1 text-[hsl(var(--accent))]">{[1, 2, 3, 4, 5].map((star) => <Sparkles key={star} size={12} fill="currentColor" />)}</span><span className="text-xs font-bold text-[hsl(var(--muted-foreground))]">UK / {city}</span></div><p className="serif text-2xl leading-[1.05] text-[hsl(var(--primary))]">{quote}</p><p className="mt-7 text-sm font-bold text-[hsl(var(--primary))]">{name}</p></article>; })}</div><div className="mt-5 flex gap-2 sm:hidden"><button onClick={() => setStoryIndex((storyIndex - 1 + stories.length) % stories.length)} className="focus-ring rounded-full border border-[hsl(var(--primary))]/20 p-3" data-testid="button-testimonials-previous-mobile" aria-label="Previous testimonial"><ChevronLeft size={18} /></button><button onClick={() => setStoryIndex((storyIndex + 1) % stories.length)} className="focus-ring rounded-full border border-[hsl(var(--primary))]/20 p-3" data-testid="button-testimonials-next-mobile" aria-label="Next testimonial"><ChevronRight size={18} /></button></div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[hsl(var(--accent))] px-5 py-20 md:px-8 md:py-24"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><p className="eyebrow text-[hsl(var(--primary))]">For your next gathering</p><h2 className="serif mt-4 max-w-2xl text-5xl font-semibold leading-[.92] text-[hsl(var(--primary))] md:text-7xl">Bring everyone<br />to the table.</h2></div><button onClick={() => setQuoteOpen(true)} className="focus-ring flex items-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-4 text-sm font-bold text-[hsl(var(--background))] transition-transform hover:-translate-y-1" data-testid="button-bottom-quote">Start a request <ArrowRight size={16} /></button></div><div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border border-[hsl(var(--primary))]/20" /></section>
      </main>
      <footer className="bg-[hsl(var(--primary))] px-5 py-14 text-[hsl(var(--background))] md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl"><div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]"><div><img src={logo} alt="MEJ Organic & Spices" className="h-16 w-[150px] object-cover object-center mix-blend-screen" /><p className="serif mt-6 max-w-xs text-3xl leading-none text-[hsl(var(--accent))]">Rooted in nature,<br />served with love.</p></div><div><p className="eyebrow text-[hsl(var(--accent))]">Find us</p><p className="mt-5 flex items-start gap-2 text-sm leading-6 text-[hsl(var(--background))]/70"><MapPin size={17} className="mt-1 shrink-0 text-[hsl(var(--accent))]" />Grimsby, United Kingdom</p><a href="tel:+447901161062" className="focus-ring mt-3 flex items-center gap-2 text-sm text-[hsl(var(--background))]/70 hover:text-[hsl(var(--accent))]" data-testid="link-footer-phone"><Phone size={17} className="text-[hsl(var(--accent))]" />+44 7901 161062</a><a href="mailto:hello@mejorganicandspices.co.uk" className="focus-ring mt-3 flex items-center gap-2 break-all text-sm text-[hsl(var(--background))]/70 hover:text-[hsl(var(--accent))]" data-testid="link-footer-email"><Mail size={17} className="text-[hsl(var(--accent))]" />hello@mejorganicandspices.co.uk</a></div><div><p className="eyebrow text-[hsl(var(--accent))]">Keep exploring</p><div className="mt-5 flex flex-col items-start gap-3 text-sm text-[hsl(var(--background))]/70"><button onClick={() => scrollToId('services')} className="focus-ring hover:text-[hsl(var(--accent))]" data-testid="link-footer-services">What we do</button><button onClick={() => scrollToId('food')} className="focus-ring hover:text-[hsl(var(--accent))]" data-testid="link-footer-food">Food collection</button><button onClick={() => scrollToId('flowers')} className="focus-ring hover:text-[hsl(var(--accent))]" data-testid="link-footer-flowers">Flowers</button><button onClick={() => setQuoteOpen(true)} className="focus-ring hover:text-[hsl(var(--accent))]" data-testid="link-footer-quote">Request a quote</button></div></div></div><div className="mt-14 flex flex-col justify-between gap-3 border-t border-[hsl(var(--background))]/15 pt-5 text-[10px] uppercase tracking-[.14em] text-[hsl(var(--background))]/45 sm:flex-row"><span>© {new Date().getFullYear()} MEJ Organic & Spices</span><span>Quality · Freshness · Love</span></div></div>
      </footer>
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </div>
  );
}

function ServiceCard({ number, icon, title, copy, image, onClick }: { number: string; icon: React.ReactNode; title: string; copy: string; image: string; onClick: () => void }) {
  return <button onClick={onClick} className="service-card group relative min-h-[390px] overflow-hidden rounded-[1.75rem] border border-[hsl(var(--border))] bg-[hsl(var(--primary))] text-left text-[hsl(var(--background))]" data-testid={`card-service-${number}`}><img src={image} alt="" className="img-transition absolute inset-0 h-full w-full object-cover opacity-55" /><div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))] via-[hsl(var(--primary))]/55 to-transparent" /><div className="relative flex h-full min-h-[390px] flex-col justify-between p-6"><div className="flex items-start justify-between"><span className="serif text-4xl text-[hsl(var(--accent))]">{number}</span><span className="rounded-full border border-[hsl(var(--background))]/30 p-3 text-[hsl(var(--accent))]">{icon}</span></div><div><h3 className="serif text-4xl leading-none">{title}</h3><p className="mt-4 max-w-xs text-sm leading-6 text-[hsl(var(--background))]/72">{copy}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--accent))]">Explore <ArrowUpRightIcon /></span></div></div></button>;
}
function ArrowUpRightIcon() { return <ArrowRight size={15} className="-rotate-45" />; }
function FoodCard({ food, index }: { food: Food; index: number }) {
  return <article className="food-card overflow-hidden rounded-[1.25rem] border border-[hsl(var(--border))] bg-[hsl(var(--background))]" data-testid={`card-food-${index}`}><div className="relative aspect-[1.08] overflow-hidden"><img src={food.image} alt={food.name} className="img-transition h-full w-full object-cover" />{food.tag && <span className="absolute left-3 top-3 rounded-full bg-[hsl(var(--accent))] px-2.5 py-1 text-[10px] font-bold text-[hsl(var(--primary))]">{food.tag}</span>}</div><div className="p-4"><h3 className="serif text-2xl leading-none text-[hsl(var(--primary))]">{food.name}</h3><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">{food.detail}</p><span className="mt-4 inline-block text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--accent))]">{food.category}</span></div></article>;
}

function Router() { const [location] = useLocation(); return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>; }
export default App;