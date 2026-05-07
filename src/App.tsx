/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  MessageSquare, 
  Rocket, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Zap,
  TrendingUp,
  User,
  ShieldCheck,
  Eye,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  Flame,
  Frown,
  Check,
  AlertCircle
} from 'lucide-react';
import { GIAAnalysis, VideoAnalysis } from './types';

// Mock Data from PDF samples
const MOCK_REPORT: GIAAnalysis = {
  username: "@peng.mendoza",
  videosAnalyzed: 30,
  overallScore: 84,
  bestVideo: {
    title: "May mga tamang paraan para mapalapit sa tamang environment",
    reason: "This video achieved the highest views, shares, and bookmarks, indicating strong viral reach and perceived value, largely because its broad advice on self-improvement resonated deeply and validated viewers."
  },
  worstVideo: {
    title: "Ilang beses na nangyari 'to sa'yo? Baka hindi sapat ang ipon",
    reason: "Despite a strong hook, this video had the lowest overall engagement rate and only one emoji comment, suggesting that while the initial problem was relatable, the content failed to sustain interest."
  },
  audienceSignals: {
    whatTheyShare: "Viewers share content that validates their experiences, offers practical, broadly applicable life advice, or challenges common societal beliefs.",
    whatTheySave: "Viewers bookmark content offering actionable advice, inspiring perspectives on personal growth, financial wisdom, or business strategies.",
    whatTheyComment: "Comments primarily express validation and agreement, share personal experiences, or ask for more in-depth advice.",
    tellingComment: "Thanks for this video... Nang dahil sa video na to... I realized Tama.. And after ko nakita ang video na to.. Nag start ako ng business..."
  },
  themes: {
    work: [
      "Financial Mindset & Planning",
      "Personal Growth & Empowerment",
      "Challenging Conventional Wisdom"
    ],
    avoid: [
      "Generic problem identification",
      "Content identifying pain points without depth",
      "Direct Q&A without strong visual hook"
    ]
  },
  roadmap: {
    idealHookFormula: "Start with a bold, relatable statement or rhetorical question (using both text overlay and spoken words) that immediately challenges a common belief, then hint at a solution within 3s.",
    visualStyle: "The creator should continue speaking directly to the camera with expressive hand gestures in an elegant indoor setting, complemented by a prominent red text overlay.",
    emotionalTrigger: "relatability",
    postingStrategy: "Prioritize a content mix that frequently addresses relatable financial or personal growth challenges, occasionally incorporating controversial takes to spark discussion."
  },
  nextVideoBrief: {
    say: "Akala mo sapat na ginagawa mo para yumaman? Mali ka. Bakit hindi pa rin lumalaki ang yaman mo?",
    show: "Creator with a confident, slightly challenging expression, overlaid with bold text: 'Bakit Hindi Pa Rin Lumalaki Ang Yaman Mo?' followed by a quick graphic of stagnant money."
  },
  videos: [
    {
      id: 1,
      title: "Piliin mo kung sino ang may karapatang pakinggan na opinyon.",
      views: 2131,
      engagementRate: 3.99,
      hookScore: 8,
      hookType: "CONTROVERSY",
      thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      likes: 71,
      shares: 7,
      saves: 6,
      commentsCount: 1,
      trigger: "Relatability",
      pacing: "Static",
      textOverlay: "Dedma Lang Dapat Sa Mga Walang Kwentang Opinyon!",
      spokenHook: "Mag-ingat ka rin sa mga opinyon ng mga tao. Kasi madali lang magsalita. Mura lang.",
      spokenHookAnalysis: "The creator immediately advises viewers to 'be careful with people's opinions', stating that it's easy to speak and it's cheap.",
      analysis: {
        whyItWorks: "The bold, confrontational text overlay instantly captures attention with a strong, relatable statement about ignoring useless opinions.",
        improvement: "To enhance engagement, the creator could start with a quick visual montage of common annoying scenarios where unsolicited opinions are given."
      },
      commentInsights: "The single emotional comment suggests a positive general sentiment towards the creator but doesn't offer specific drivers.",
      topComments: ["@fabulozalagreta (0❤️) ■❤️■■"]
    },
    {
      id: 2,
      title: "Sa ganitong panahon, mas mahalaga ang paghahanda kahit wala ka sa bansa.",
      views: 2180,
      engagementRate: 3.90,
      hookScore: 8,
      hookType: "TUTORIAL",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
      likes: 75,
      shares: 6,
      saves: 2,
      commentsCount: 2,
      trigger: "Relatability",
      pacing: "Static",
      textOverlay: "What You Should Do During The Current War",
      spokenHook: "May giyera ngayon, krisis. Paano na? Ano ba'ng gagawin natin sa buhay natin?",
      spokenHookAnalysis: "The creator immediately establishes a serious and urgent context by mentioning 'war' and 'crisis'.",
      analysis: {
        whyItWorks: "The clear, direct text overlay combined with the creator's immediate spoken acknowledgement taps into current global anxieties.",
        improvement: "To increase dynamism, the creator could briefly cut to a graphic showing headlines related to 'war/crisis' or a quick montage of worried faces."
      },
      commentInsights: "The comments indicate that the hook successfully addressed a highly relatable and timely concern for viewers.",
      topComments: ["@nanettesanjaun (0❤️) aray ko.tamang tama skin.■"]
    }
  ]
};

// --- Components ---

function Nav({ onStart }: { onStart: () => void }) {
  return (
    <nav className="fixed top-0 w-full z-50 glass px-8 py-4 flex justify-between items-center max-w-7xl mx-auto left-0 right-0 rounded-b-3xl">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
        <div className="size-8 bg-tiktok-black rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-xl italic leading-none">G</span>
        </div>
        <span className="font-black text-xl tracking-tighter italic">GIA <span className="text-slate-400 font-normal underline decoration-tiktok-pink decoration-2 underline-offset-4 not-italic tracking-normal text-lg ml-1">Analyst</span></span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
        <a href="#" className="hover:text-tiktok-pink transition-colors">What she does</a>
        <a href="#" className="hover:text-tiktok-pink transition-colors">How it works</a>
        <a href="#" className="hover:text-tiktok-pink transition-colors">Pricing</a>
      </div>
      <button 
        onClick={onStart}
        className="bg-tiktok-black text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        Live report <ArrowRight size={14} />
      </button>
    </nav>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="bg-white selection:bg-tiktok-pink selection:text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-900 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-slate-100">
              now analyzing philippine creators
            </div>
            <h1 className="text-7xl md:text-[100px] font-display font-black leading-[0.85] mb-8 tracking-tighter italic text-slate-900">
              your TikTok <br />
              <span className="font-serif font-bold text-slate-400 not-italic">finally has</span> <br />
              someone watching
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-10 leading-relaxed font-medium">
              GIA analyzes your TikTok account — every hook, every comment, every pattern — and tells you exactly what to post next. <span className="text-slate-900 font-bold decoration-tiktok-pink decoration-4 underline underline-offset-4">no cap.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={onStart}
                className="bg-tiktok-black text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all cursor-pointer shadow-xl active:scale-95"
              >
                meet GIA ✦
              </button>
              <button className="px-8 py-5 rounded-3xl font-bold flex items-center justify-center gap-2 text-slate-500 hover:text-slate-900 transition-all cursor-pointer group">
                see how it works <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="size-10 rounded-full bg-slate-100 border-2 border-white overflow-hidden shadow-sm flex items-center justify-center font-serif italic text-slate-400">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
                <div className="size-10 rounded-full bg-slate-900 border-2 border-white overflow-hidden shadow-sm flex items-center justify-center font-black text-white text-[10px]">+</div>
              </div>
              <span className="max-w-[200px]">30+ creators already know what their audience really wants</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="high-contrast-card rounded-[3.5rem] p-10 shadow-[20px_20px_0px_0px_#f8fafc] relative bg-white border-2 border-slate-900">
              <div className="flex justify-between items-start mb-12">
                <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                  ✦ hook score 8.2/10
                </div>
              </div>

              <div className="flex flex-col items-center mb-10">
                <div className="size-40 rounded-full bg-slate-50 mb-6 overflow-hidden border-2 border-slate-900 shadow-2xl relative flex items-center justify-center transform hover:rotate-6 transition-transform">
                  <img src="/gia.png" alt="GIA" className="w-full h-full object-cover object-[center_15%]" />
                </div>
                <h3 className="font-black italic text-4xl tracking-tighter mb-1 text-slate-900">GIA</h3>
                <p className="text-[10px] font-black text-slate-900 tracking-[0.3em] uppercase">Generative Influencer Analyst</p>
              </div>

              <div className="editorial-border rounded-3xl p-8 bg-slate-50 relative border-2 border-slate-900">
                <div className="absolute -top-4 left-6 px-3 py-1 bg-white border-2 border-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">14 content requests</div>
                <div className="absolute -bottom-4 right-6 px-3 py-1 bg-white border-2 border-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest text-tiktok-pink shadow-sm">+93% vs avg</div>
                <p className="font-serif italic text-2xl leading-tight text-slate-800 text-center py-4">
                  "okay so I've been watching your account and girl... we need to talk about your hooks 💅"
                </p>
                <div className="flex justify-center mt-2">
                   <div className="px-4 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-widest uppercase italic">myth-buster era</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What GIA Does Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="mb-20">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-tiktok-pink mb-4">What GIA Does</div>
          <h2 className="text-6xl md:text-8xl font-display font-black italic tracking-tighter leading-[0.9] text-slate-900">
            she doesn't just look at <br />
            <span className="font-serif font-bold text-slate-300 not-italic">the numbers</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mt-8 font-medium leading-relaxed">
            GIA goes deeper than any analytics tool — she reads your comments, scores your hooks, and tells you what your audience is actually asking for.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Hook scoring", desc: "Every video gets a hook score out of 10 with a breakdown of why it worked (or didn't) — and exactly how to rewrite it.", icon: <Zap className="text-tiktok-pink" /> },
            { title: "Comment intelligence", desc: "GIA categorizes every comment — validation, content requests, questions, objections — and turns them into your next content brief.", icon: <MessageSquare className="text-tiktok-cyan" /> },
            { title: "Performance patterns", desc: "Which hook types get you saves? What triggers shares? GIA finds the patterns across all your videos, not just the viral ones.", icon: <TrendingUp className="text-indigo-500" /> },
            { title: "Content roadmap", desc: "5 ready-to-film video ideas — complete with hook scripts — pulled directly from what your audience is already asking for in the comments.", icon: <Layers className="text-amber-500" /> },
            { title: "GIA score", desc: "One number that captures your account health — hooks, save rate, comment quality, consistency — so you can track it over time.", icon: <Sparkles className="text-emerald-500" /> },
            { title: "Shareable story card", desc: "A ready-to-post Instagram story card with GIA summarizing your month. your audience will want one too — that's the point.", icon: <Share2 className="text-rose-500" /> }
          ].map((feature, i) => (
            <div key={i} className="high-contrast-card rounded-[3rem] p-10 hover:editorial-shadow-cyan bg-white border-2 border-slate-900 transition-all duration-300">
              <div className="size-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 border-2 border-slate-900 mb-8 shadow-[4px_4px_0px_0px_#0f172a]">
                {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
              </div>
              <h4 className="text-3xl font-display font-black italic mb-4 text-slate-900 leading-tight">{feature.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-tiktok-pink mb-4">How it works</div>
          <h2 className="text-7xl md:text-9xl font-display font-black italic tracking-tighter leading-[0.8] mb-8 text-slate-900">
            four steps. <br />
            <span className="font-serif font-bold text-slate-300 not-italic">one brutal honest report.</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          {[
            { step: 1, title: "drop your handle", desc: "give GIA your TikTok username and the number of videos you want analyzed" },
            { step: 2, title: "GIA gets to work", desc: "she pulls your videos, comments, and metrics — scores every hook and reads every comment" },
            { step: 3, title: "report lands in 24hrs", desc: "a full PDF with scorecard, video breakdowns, comment insights, and your 5 next video ideas" },
            { step: 4, title: "post. grow. repeat.", desc: "use the roadmap, film the briefs, and watch what happens when you post with strategy" }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="size-24 rounded-full border-2 border-slate-900 mx-auto mb-8 flex items-center justify-center text-3xl font-serif font-bold text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-xl">
                {item.step}
              </div>
              <h4 className="text-2xl font-display font-black italic mb-4 text-slate-900 leading-tight">{item.title}</h4>
              <p className="text-slate-900 text-xs uppercase font-black tracking-widest leading-loose max-w-[200px] mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GIA in Action Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-tiktok-pink mb-4">GIA in action</div>
            <h2 className="text-7xl md:text-8xl font-display font-black italic tracking-tighter leading-[0.9] mb-8 text-slate-900">
              she will say what your <br />
              <span className="font-serif font-bold text-slate-300 not-italic">manager won't</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12">
              GIA doesn't just give you data. she gives you the honest read on what's actually happening on your account — with the receipts to back it up.
            </p>

            <div className="editorial-border rounded-[3rem] p-10 bg-slate-50 space-y-10 border-2 border-slate-900 shadow-[12px_12px_0px_0px_#0f172a]">
               <div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-tiktok-pink border-b-2 border-tiktok-pink/20 pb-2 mb-6 inline-block">GIA says</div>
                 <p className="font-serif italic text-3xl leading-snug text-slate-900">
                   "okay so your top 3 videos all opened with a myth challenge. this one opened with a complaint. that's why saves dropped 40%."
                 </p>
               </div>
               <div className="h-px bg-slate-200" />
               <p className="text-slate-500 italic text-lg leading-relaxed">
                 your comment section is basically a group therapy session for aspiring CEOs — and 14 of them are asking the same question 💅
               </p>
               <div className="p-6 rounded-[2rem] bg-white border-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GIA recommends:</span>
                 <span className="text-sm font-black italic underline text-slate-900 decoration-tiktok-cyan decoration-4 underline-offset-4">film "Paano mag-negosyo ng PHP 5K pababa" next.</span>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            {[
              { val: "8.2/10", desc: "avg hook score on myth-challenge videos", icon: <Zap className="text-tiktok-pink" />, shadow: "editorial-shadow-pink" },
              { val: "3x", desc: "more saves on videos with actionable frameworks", icon: <Bookmark className="text-indigo-500" />, shadow: "editorial-shadow-cyan" },
              { val: "14", desc: "comment requests for the same video idea — hiding in plain sight", icon: <MessageSquare className="text-tiktok-cyan" />, shadow: "editorial-shadow-pink" },
              { val: "84/100", desc: "GIA account score — above average, room to grow", icon: <Sparkles className="text-amber-500" />, shadow: "editorial-shadow-cyan" }
            ].map((stat, i) => (
              <div key={i} className={`high-contrast-card rounded-[2.5rem] p-8 flex items-center gap-8 bg-white border-2 border-slate-900 ${stat.shadow}`}>
                <div className="size-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border-2 border-slate-900">
                   {React.cloneElement(stat.icon as React.ReactElement, { size: 32 })}
                </div>
                <div>
                  <div className="text-4xl font-black italic text-slate-900 leading-none mb-1">{stat.val}</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-32 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tiktok-pink blur-[250px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="aspect-square rounded-[4rem] border-2 border-white/10 p-10 flex items-center justify-center relative">
               <div className="size-full rounded-[3rem] bg-slate-800 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" alt="Sophia Sy" className="w-full h-full object-cover" />
                 <div className="absolute bottom-8 left-8 right-8 p-6 glass bg-white/5 text-white border border-white/20 rounded-[2rem] backdrop-blur-xl">
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-2 text-tiktok-cyan">hired because of her TikTok</p>
                    <p className="text-xl font-serif italic leading-tight">now she analyzes yours. 💅</p>
                 </div>
               </div>
             </div>
          </div>

          <div>
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-tiktok-cyan mb-6">The story behind GIA</div>
             <h2 className="text-7xl md:text-9xl font-display font-black italic tracking-tighter leading-[0.8] mb-12">
               we found our intern <br />
               <span className="font-serif font-bold text-slate-500 not-italic">on TikTok.</span>
             </h2>
             <div className="space-y-8 text-slate-400 font-medium text-lg leading-relaxed max-w-lg">
               <p>
                 SOFI AI founder Sophia Sy wasn't looking for an intern. then she stumbled on a TikTok from a girl named Gia — and hired her on the spot. not through LinkedIn, not through a referral. through a 60-second video.
               </p>
               <p>
                 that moment proved something: in 2025, your TikTok is your resume. your content is your personal brand. and most creators have no idea how powerful — or how fixable — theirs actually is.
               </p>
             </div>
             
             <div className="mt-16 p-10 border-l-2 border-tiktok-cyan bg-white/5 rounded-r-[3rem]">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-6 underline decoration-tiktok-cyan/40 decoration-2">the original tiktok intern</p>
                <p className="text-4xl font-serif italic text-tiktok-cyan leading-tight mb-8">
                  "attention is currency. and most creators are leaving it on the table."
                </p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  so we built GIA. the AI version of that intern — the one who actually watches your content, reads your comments, and tells you the truth.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-tiktok-pink mb-4">Pricing</div>
          <h2 className="text-7xl md:text-9xl font-display font-black italic tracking-tighter leading-[0.8] mb-8 text-slate-900">
            honest reports. <br />
            <span className="font-serif font-bold text-slate-300 not-italic">honest prices.</span>
          </h2>
          <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">no subscriptions you forget to cancel. pay for what you need.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch pt-12">
          {/* Starter */}
          <div className="high-contrast-card rounded-[3.5rem] p-12 space-y-12 bg-white border-2 border-slate-900 flex flex-col">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Starter Pack</div>
              <div className="text-7xl font-black italic tracking-tighter mb-2 text-slate-900">₱3,500</div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest italic">one-time report</div>
            </div>
            <ul className="space-y-6 text-sm font-bold text-slate-600 flex-1">
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> 10 video analysis</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> Hook scoring + breakdown</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> Comment sentiment</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> 3 video ideas</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> Shareable story card</li>
            </ul>
            <button className="w-full py-6 bg-slate-50 text-slate-900 border-2 border-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-slate-900 hover:text-white transition-all cursor-pointer active:scale-95">get started</button>
          </div>

          {/* Deep Dive */}
          <div className="high-contrast-card rounded-[3.5rem] p-12 space-y-12 bg-slate-900 text-white relative editorial-shadow-pink scale-105 border-transparent flex flex-col z-10">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-tiktok-pink text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest leading-none shadow-xl border-2 border-slate-900">most popular</div>
            <div className="absolute top-10 right-10 size-12 bg-white/10 rounded-full flex items-center justify-center transform rotate-12">
               <Sparkles className="text-tiktok-cyan" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8">Deep Dive</div>
              <div className="text-7xl font-black italic tracking-tighter mb-2">₱6,500</div>
              <div className="text-xs font-black text-white/40 uppercase tracking-widest italic">one-time report</div>
            </div>
            <ul className="space-y-6 text-sm font-bold text-white/80 flex-1">
              <li className="flex items-center gap-4 text-tiktok-cyan"><Check size={16} /> 30 video analysis</li>
              <li className="flex items-center gap-4"><Check size={16} /> Full hook + comment deep dive</li>
              <li className="flex items-center gap-4"><Check size={16} /> GIA account score</li>
              <li className="flex items-center gap-4"><Check size={16} /> 5 video ideas + hook scripts</li>
              <li className="flex items-center gap-4"><Check size={16} /> 30-day content roadmap</li>
              <li className="flex items-center gap-4"><Check size={16} /> Shareable story card</li>
            </ul>
            <button className="w-full py-6 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:editorial-shadow-cyan transition-all cursor-pointer active:scale-95">get your report ✦</button>
          </div>

          {/* Monthly */}
          <div className="high-contrast-card rounded-[3.5rem] p-12 space-y-12 bg-white border-2 border-slate-900 flex flex-col">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Monthly Era</div>
              <div className="text-7xl font-black italic tracking-tighter mb-2 text-slate-900">₱12,000</div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest italic">per month</div>
            </div>
            <ul className="space-y-6 text-sm font-bold text-slate-600 flex-1">
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> Weekly mini-reports</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> Monthly full deep dive</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> Strategy calls included</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> Priority turnaround</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> 4 story cards/month</li>
              <li className="flex items-center gap-4"><div className="size-1.5 bg-slate-900 rounded-full" /> Slack access to GIA</li>
            </ul>
            <button className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:editorial-shadow-pink transition-all cursor-pointer active:scale-95">let's talk strategy</button>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-60 text-center bg-white px-6">
         <h2 className="text-7xl md:text-9xl font-display font-black italic tracking-tighter leading-[0.8] mb-12 text-slate-900">
            ready to know what <br />
            <span className="font-serif font-bold text-slate-300 not-italic uppercase tracking-[0.1em] text-4xl md:text-6xl">your audience actually wants?</span>
         </h2>
         <p className="text-slate-400 font-black mb-16 italic text-2xl">GIA's been watching. it's time you heard what she has to say. 💅</p>
         <div className="flex flex-col sm:flex-row justify-center gap-8">
            <button 
              onClick={onStart}
              className="px-16 py-8 bg-tiktok-black text-white rounded-[2.5rem] font-black uppercase tracking-widest hover:editorial-shadow-pink transition-all cursor-pointer text-sm shadow-2xl active:scale-95"
            >
              get your GIA report ✦
            </button>
            <button className="px-16 py-8 rounded-[2.5rem] font-black leading-none uppercase tracking-widest border-2 border-slate-100 bg-slate-50 hover:bg-slate-100 transition-all text-slate-900 cursor-pointer text-sm active:scale-95">
              read the story
            </button>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="flex items-center gap-4">
            <div className="size-10 bg-slate-900 rounded-full flex items-center justify-center font-black italic text-white text-xs">G</div>
            <span className="font-black italic tracking-tighter text-xl">SOFI AI / GIA</span>
         </div>
         <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">© 2025 SOFI AI. built for creators who care.</div>
         <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
            <a href="#" className="hover:text-tiktok-pink transition-colors">Privacy</a>
            <a href="#" className="hover:text-tiktok-pink transition-colors">Terms</a>
            <a href="#" className="hover:text-tiktok-pink transition-colors">Contact</a>
         </div>
      </footer>
    </div>
  );
}

function AnalyzingView({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    "Waking up GIA...",
    "Crawling your TikTok profile...",
    "Watching your last 30 videos...",
    "Reading your comment section (it's a lot, girl)...",
    "Calculating hook effectiveness...",
    "Drafting your content roadmap..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => {
        if (s === steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return s;
        }
        return s + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-tiktok-pink/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-tiktok-cyan/5 blur-[120px] rounded-full" />
      
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="size-56 rounded-full bg-slate-50 flex items-center justify-center mb-16 relative border-2 border-slate-900 shadow-2xl overflow-hidden"
      >
        <img src="/gia.png" alt="GIA" className="z-10 w-full h-full object-cover object-[center_15%]" />
        <div className="absolute -inset-4 rounded-full border-2 border-dashed border-slate-900/10 animate-[spin_10s_linear_infinite]" />
      </motion.div>
      
      <div className="text-center relative">
        <h2 className="text-5xl font-black italic tracking-tighter mb-4 text-slate-900">GIA is watching...</h2>
        <AnimatePresence mode="wait">
          <motion.p 
            key={step}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-tiktok-pink font-black uppercase tracking-[0.25em] text-xs h-6"
          >
            {steps[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm border-2 border-slate-900 h-4 rounded-full mt-16 p-0.5 bg-white shadow-[4px_4px_0px_0px_#f1f5f9]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          className="h-full bg-linear-to-r from-tiktok-pink to-tiktok-cyan rounded-full transition-all duration-1000"
        />
      </div>
    </div>
  );
}

function Dashboard({ report }: { report: GIAAnalysis }) {
  const [activeTab, setActiveTab] = useState<'overview'|'hooks'|'roadmap'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b-2 border-slate-900 pb-12">
          <div className="flex flex-col space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-widest border border-green-200 w-fit">
              <ShieldCheck size={14} /> AI Score: High Potential
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-2">
              Hello, <br/><span className="text-tiktok-pink">Creator.</span>
            </h1>
            <p className="text-slate-500 max-w-xl font-medium leading-relaxed">
              Your content is hitting the <span className="text-slate-900 font-bold underline decoration-tiktok-cyan decoration-4">Metro Manila</span> vibe perfectly. Your authenticity is your biggest hook.
            </p>
          </div>
          <div className="flex items-center gap-10">
            <div className="bg-slate-50 p-6 rounded-[2.5rem] border-2 border-slate-900 text-center min-w-32 shadow-[8px_8px_0px_0px_#f1f5f9]">
              <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1 leading-none">Hook Score</div>
              <div className="text-5xl font-black italic">{report.overallScore / 10}<span className="text-sm font-normal text-slate-900 ml-1">/10</span></div>
            </div>
            <button className="bg-tiktok-black text-white px-8 py-5 rounded-3xl font-black uppercase tracking-widest hover:translate-y-[-4px] active:translate-y-0 transition-all flex items-center gap-3 shadow-xl">
              Export Analysis <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-12 mt-12 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { id: 'overview', label: 'Audience Vibe', icon: <Eye size={20}/> },
            { id: 'hooks', label: 'Hook Lab', icon: <Zap size={20}/> },
            { id: 'roadmap', label: 'Next Era', icon: <Rocket size={20}/> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 whitespace-nowrap px-1 pb-4 border-b-4 transition-all font-black uppercase tracking-widest text-xs tracking-[0.2em] ${activeTab === tab.id ? 'border-tiktok-cyan text-tiktok-black' : 'border-transparent text-slate-900 hover:text-slate-700'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-12 gap-8"
          >
            {/* Top Analysis Card */}
            <div className="lg:col-span-8 space-y-8">
              <div className="high-contrast-card rounded-[3rem] p-10 group hover:editorial-shadow-cyan">
                <h3 className="font-black italic text-3xl tracking-tighter mb-8 underline decoration-slate-100 decoration-8 underline-offset-8">
                  Overall Strategy
                </h3>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                      <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Best Performing</div>
                      <h4 className="font-bold text-slate-900 mb-2">{report.bestVideo.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed italic">"{report.bestVideo.reason}"</p>
                    </div>
                    <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100">
                      <div className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-3">Worst Performing</div>
                      <h4 className="font-bold text-slate-900 mb-2">{report.worstVideo.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed italic">"{report.worstVideo.reason}"</p>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                        <Check size={14} className="text-emerald-500" /> Themes that work
                      </h4>
                      <ul className="space-y-2">
                        {report.themes.work.map((t, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm font-bold">
                            <div className="size-1.5 bg-tiktok-cyan rounded-full" /> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                        <Frown size={14} className="text-rose-500" /> Themes to avoid
                      </h4>
                      <ul className="space-y-2">
                        {report.themes.avoid.map((t, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <div className="size-1.5 bg-slate-300 rounded-full" /> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audience Signals (From PDF) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-slate-900 text-white rounded-[3rem] p-10 border-none relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tiktok-cyan blur-[60px] opacity-20 translate-x-10 -translate-y-10" />
                <h3 className="font-black italic text-xl tracking-tighter mb-8 text-tiktok-cyan underline decoration-tiktok-cyan/20">
                  Audience Signals
                </h3>
                <div className="space-y-8 flex-1">
                  <div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">What they SHARE</div>
                    <p className="text-xs font-medium leading-relaxed leading-relaxed">{report.audienceSignals.whatTheyShare}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">What they SAVE</div>
                    <p className="text-xs font-medium leading-relaxed">{report.audienceSignals.whatTheySave}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">What they COMMENT ABOUT</div>
                    <p className="text-xs font-medium leading-relaxed">{report.audienceSignals.whatTheyComment}</p>
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-4">Most Telling Comment</div>
                  <p className="text-sm italic font-medium text-tiktok-cyan leading-tight">
                    "{report.audienceSignals.tellingComment}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'hooks' && (
          <motion.div 
            key="hooks"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-12"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {report.videos.map((v, i) => (
                <div key={v.id} className="high-contrast-card rounded-[2.5rem] p-8 overflow-hidden hover:editorial-shadow-pink">
                  <div className="flex justify-between items-start mb-8 pb-4 border-b border-slate-100">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Video {i+1} of {report.videosAnalyzed}</div>
                      <h4 className="font-black italic text-xl leading-tight text-tiktok-pink">{v.title}</h4>
                    </div>
                    <div className="bg-slate-900 text-white p-3 rounded-2xl rotate-3">
                      <div className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Hook Score</div>
                      <div className="text-xl font-black italic">{v.hookScore}/10</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Visual & Metrics */}
                    <div className="space-y-6">
                      <div className="aspect-video rounded-2xl overflow-hidden border-2 border-slate-900 shadow-sm relative group">
                        <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Zap size={32} className="text-tiktok-cyan animate-pulse" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Views', val: v.views.toLocaleString() },
                          { label: 'Likes', val: v.likes },
                          { label: 'Shares', val: v.shares },
                          { label: 'Saves', val: v.saves },
                          { label: 'Comments', val: v.commentsCount },
                          { label: 'Eng. Rate', val: `${v.engagementRate}%` }
                        ].map(m => (
                          <div key={m.label} className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-center">
                            <div className="text-[8px] font-black uppercase text-slate-400">{m.label}</div>
                            <div className="text-xs font-bold">{m.val}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="space-y-4 text-[11px] font-medium text-slate-600">
                      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-50">
                        <div>
                          <div className="font-black uppercase text-slate-400 mb-1">Hook Type</div>
                          <div className="text-slate-900 font-bold">{v.hookType}</div>
                        </div>
                        <div>
                          <div className="font-black uppercase text-slate-400 mb-1">Trigger</div>
                          <div className="text-slate-900 font-bold">{v.trigger}</div>
                        </div>
                        <div>
                          <div className="font-black uppercase text-slate-400 mb-1">Pacing</div>
                          <div className="text-slate-900 font-bold">{v.pacing}</div>
                        </div>
                        <div>
                          <div className="font-black uppercase text-slate-400 mb-1">Visuals</div>
                          <div className="text-slate-900 font-bold">Creator Speaking</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-black uppercase text-slate-400 mb-1">Spoken Hook Analysis</div>
                        <p className="italic leading-relaxed">{v.spokenHookAnalysis}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-2 pt-2">
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-slate-700">
                          <div className="font-black uppercase text-[8px] text-emerald-600 mb-1">Why it works</div>
                          <p className="leading-tight">{v.analysis.whyItWorks}</p>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-slate-700">
                          <div className="font-black uppercase text-[8px] text-indigo-600 mb-1">Improvement</div>
                          <p className="leading-tight">{v.analysis.improvement}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="high-contrast-card rounded-[2.5rem] p-10 bg-slate-900 text-white border-none flex flex-col justify-center items-center text-center space-y-6">
                 <div className="size-20 rounded-3xl bg-white/10 flex items-center justify-center text-tiktok-cyan rotate-3"><Zap size={40} /></div>
                 <h4 className="text-2xl font-black italic tracking-tighter">View all 30 Video Analyses</h4>
                 <p className="text-white/40 text-xs font-medium uppercase tracking-widest leading-relaxed">Upgrade to view the full detailed breakdown for your entire library.</p>
                 <button className="bg-tiktok-cyan text-slate-900 font-black px-8 py-3 rounded-full uppercase tracking-widest text-xs mt-4 hover:scale-105 active:scale-95 transition-all">Unlock Premium Report</button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'roadmap' && (
          <motion.div 
            key="roadmap"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
             <div className="lg:col-span-12">
               <div className="inline-flex items-center gap-3 mb-10">
                 <h2 className="text-5xl font-black italic tracking-tighter">Your Roadmap to <span className="text-tiktok-cyan">Icon</span> Status</h2>
                 <div className="h-1 flex-1 bg-slate-100 rounded-full min-w-[200px]" />
               </div>
             </div>

             <div className="lg:col-span-5 space-y-8">
                <div className="high-contrast-card rounded-[3rem] p-10 border-slate-200 shadow-[10px_10px_0px_0px_#f8fafc] bg-slate-50">
                   <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 italic underline decoration-tiktok-pink decoration-4 underline-offset-4">GIA's Strategy</h4>
                   <div className="space-y-10">
                      {[
                        { label: "The Hook Formula", icon: <Zap />, text: report.roadmap.idealHookFormula, color: "text-tiktok-pink" },
                        { label: "Visual Pacing", icon: <Layers />, text: report.roadmap.visualStyle, color: "text-tiktok-cyan" },
                        { label: "Community Signal", icon: <MessageSquare />, text: report.roadmap.emotionalTrigger, color: "text-indigo-500" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-6 group">
                          <div className={`size-14 rounded-2xl bg-white border-2 border-slate-900 shrink-0 flex items-center justify-center ${item.color} group-hover:rotate-6 transition-transform`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Step 0{idx+1} — {item.label}</div>
                            <p className="text-slate-900 font-bold leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="lg:col-span-7 bg-slate-900 text-white rounded-[3rem] p-12 border-none relative overflow-hidden flex flex-col min-h-[600px] hover:editorial-shadow-pink transition-all">
                <div className="absolute top-0 right-0 p-12 rotate-12 opacity-5 pointer-events-none">
                   <Rocket size={300} />
                </div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-12">
                    <div className="px-4 py-1.5 bg-white text-tiktok-black rounded-full text-[10px] font-black uppercase tracking-widest italic">
                       Ready to Film ✦ Script 01
                    </div>
                  </div>
                  
                  <h3 className="text-6xl font-black italic tracking-tighter leading-[0.8] mb-12">What to post <br/><span className="text-tiktok-cyan">next.</span></h3>
                  
                  <div className="grid grid-cols-2 gap-12 mt-auto">
                    <div className="space-y-4">
                      <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4">First 3 Seconds</div>
                      <p className="text-3xl font-black italic leading-tight text-white border-l-4 border-tiktok-pink pl-6">
                        "{report.nextVideoBrief.say}"
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Visual Cue</div>
                        <p className="text-sm font-medium leading-relaxed italic text-slate-400">
                          {report.nextVideoBrief.show}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Era Target</div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10">
                          <Flame size={12} className="text-tiktok-pink" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Myth-buster Era</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-16 w-full bg-white text-tiktok-black py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                     Generate full 30-day Brief 🔐
                  </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'landing' | 'input' | 'analyzing' | 'report'>('landing');
  const [handle, setHandle] = useState("");

  const startAnalysis = () => {
    if (handle.trim()) {
      setView('analyzing');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Nav onStart={() => setView('input')} />
            <LandingPage onStart={() => setView('input')} />
          </motion.div>
        )}

        {view === 'input' && (
          <motion.div 
            key="input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center px-6"
          >
             <button 
              onClick={() => setView('landing')}
              className="absolute top-10 left-10 text-slate-900 hover:scale-110 transition-transform flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
            >
              ← Back
            </button>

            <div className="max-w-2xl w-full text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-tiktok-pink mb-6">Step 01 / Profile sync</div>
              <h2 className="text-6xl md:text-8xl font-display font-black italic tracking-tighter leading-[0.85] mb-12 text-slate-900">
                drop your <br />
                <span className="font-serif font-bold text-slate-300 not-italic">tiktok handle</span>
              </h2>
              
              <div className="relative mb-8">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-900" size={24} />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="tiktok.com/@your_handle" 
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && startAnalysis()}
                  className="w-full pl-16 pr-8 py-8 rounded-[2.5rem] border-4 border-slate-900 bg-white focus:outline-none transition-all text-2xl font-black placeholder:font-medium placeholder:text-slate-400 shadow-[12px_12px_0px_0px_#f8fafc]"
                />
              </div>
              
              <p className="text-slate-900 text-sm font-medium mb-12 leading-relaxed">
                GIA will look at your last 30 videos. <br />
                private accounts cannot be analyzed. 💅
              </p>
              
              <button 
                onClick={startAnalysis}
                disabled={!handle.trim()}
                className="group relative bg-slate-900 text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-lg hover:editorial-shadow-pink transition-all disabled:opacity-50 disabled:editorial-shadow-pink/0 cursor-pointer active:scale-95"
              >
                <div className="flex items-center gap-3">
                  Analyze My Era <Sparkles className="text-tiktok-cyan group-hover:rotate-12 transition-transform" />
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {view === 'analyzing' && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <AnalyzingView onComplete={() => setView('report')} />
          </motion.div>
        )}

        {view === 'report' && (
          <motion.div 
            key="report"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Nav onStart={() => setView('input')} />
            <Dashboard report={{ ...MOCK_REPORT, username: handle.startsWith('@') ? handle : `@${handle}` }} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="size-6 bg-tiktok-black rounded flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs italic">G</span>
            </div>
            <span className="font-display font-bold text-slate-900 italic">GIA <span className="text-[10px] text-slate-400 font-medium">by SOFI AI</span></span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-tiktok-pink">Tiktok</a>
            <a href="#" className="hover:text-tiktok-pink">Instagram</a>
            <a href="#" className="hover:text-tiktok-pink">Email us</a>
            <a href="#" className="hover:text-tiktok-pink">Privacy</a>
          </div>
          <div className="text-xs text-slate-400 font-medium tracking-tight">
            Powered by SOFI AI • © 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
