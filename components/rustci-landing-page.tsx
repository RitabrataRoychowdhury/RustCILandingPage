"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Zap,
  Shield,
  Cpu,
  Clock,
  Network,
  Database,
  BarChart3,
  CheckCircle,
  TrendingUp,
  Users,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { WaitlistForm } from "./waitlist-form"

function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
}: { end: number | string; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && typeof end === "number") {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <div ref={ref} className="text-4xl font-serif font-bold text-cyan-400 mb-2 drop-shadow-lg">
      {prefix}
      {typeof end === "number" ? count : end}
      {suffix}
    </div>
  )
}

function FuturisticBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Data streams */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 255, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${-100 + i * 150},${200 + i * 80} Q${300 + i * 100},${100 + i * 60} ${700 + i * 150},${300 + i * 40}`}
            stroke="url(#stream-gradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

function RotatingGlobe() {
  return (
    <motion.div
      className="relative w-32 h-32 mx-auto mb-8"
      animate={{ rotateY: 360 }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-400/20" />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${30 + Math.cos((i * 60 * Math.PI) / 180) * 20}%`,
            top: `${30 + Math.sin((i * 60 * Math.PI) / 180) * 20}%`,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Number.POSITIVE_INFINITY }}
        />
      ))}
    </motion.div>
  )
}

export default function RustCILandingPage() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const [waitlistForm, setWaitlistForm] = useState<{
    isOpen: boolean
    type: "investor" | "early-access"
  }>({
    isOpen: false,
    type: "early-access",
  })

  const openWaitlistForm = (type: "investor" | "early-access") => {
    setWaitlistForm({ isOpen: true, type })
  }

  const closeWaitlistForm = () => {
    setWaitlistForm({ isOpen: false, type: "early-access" })
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <motion.header
        className="border-b border-cyan-400/20 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif font-bold text-xl">RustCI & Valkyrie</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#vision" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Vision
              </a>
              <a href="#product" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Product
              </a>
              <a href="#market" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Market
              </a>
              <a href="#roadmap" className="text-slate-300 hover:text-cyan-400 transition-colors">
                Roadmap
              </a>
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                onClick={() => openWaitlistForm("investor")}
              >
                Invest Early
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600"
                onClick={() => openWaitlistForm("early-access")}
              >
                Early Access
              </Button>
            </nav>
          </div>
        </div>
      </motion.header>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <FuturisticBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="secondary" className="mb-6 bg-cyan-400/10 text-cyan-400 border-cyan-400/30">
                <Zap className="h-3 w-3 mr-1" />
                Pre-Launch • Seeking Early Investors
              </Badge>
            </motion.div>
            <motion.h1
              className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl mb-6 text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">CI/CD</span>{" "}
              is Here
            </motion.h1>
            <motion.p
              className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto text-balance leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Revolutionary CI/CD engine meets ultra-low-latency networking protocol. We're building the infrastructure
              that will power the next generation of distributed applications.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="text-lg px-8 bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 relative overflow-hidden group"
                  onClick={() => openWaitlistForm("early-access")}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  Join Early Access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                  onClick={() => openWaitlistForm("investor")}
                >
                  Invest in the Future
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="vision" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6">The Problem We're Solving</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Current CI/CD systems are too slow. Network protocols are inefficient. Performance-critical applications
              deserve better.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif font-bold text-2xl mb-6 text-red-400">Current Reality</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Build times measured in minutes, not microseconds</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Network protocols with unnecessary data copying</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">No quality-of-service guarantees for critical workloads</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Scaling bottlenecks in distributed systems</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif font-bold text-2xl mb-6 text-cyan-400">Our Vision</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Sub-100μs job scheduling for instant feedback</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Zero-copy messaging with adaptive compression</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">QoS-aware traffic management for predictable performance</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">Seamless scaling from prototype to enterprise</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="product" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/10 to-slate-900" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6">Dive Into the Architecture</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Experience a journey through RustCI & Valkyrie's revolutionary components
            </p>
          </motion.div>

          <div className="space-y-20">
            {/* RustCI Pipeline */}
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="font-serif font-bold text-3xl mb-6 text-cyan-400">RustCI Engine</h3>
                <p className="text-slate-300 mb-6 text-lg">
                  Imagine a CI/CD pipeline that thinks in microseconds. Our distributed build system orchestrates
                  parallel workers with sub-100μs precision.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-cyan-400 mr-3" />
                    <span className="text-slate-300">Microsecond job scheduling</span>
                  </div>
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-cyan-400 mr-3" />
                    <span className="text-slate-300">Intelligent hybrid caching</span>
                  </div>
                  <div className="flex items-center">
                    <Cpu className="h-5 w-5 text-cyan-400 mr-3" />
                    <span className="text-slate-300">Distributed worker coordination</span>
                  </div>
                </div>
              </div>
              <motion.div
                className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-cyan-400/20 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10" />
                {/* Animated pipeline visualization */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded"
                    style={{ left: `${10 + i * 15}%`, top: "40%" }}
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Number.POSITIVE_INFINITY }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Valkyrie Protocol */}
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-purple-400/20 overflow-hidden order-2 lg:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-400/10" />
                {/* Network nodes visualization */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-purple-400 rounded-full"
                    style={{
                      left: `${20 + (i % 3) * 25}%`,
                      top: `${20 + Math.floor(i / 3) * 25}%`,
                    }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Number.POSITIVE_INFINITY }}
                  />
                ))}
              </motion.div>
              <div className="order-1 lg:order-2">
                <h3 className="font-serif font-bold text-3xl mb-6 text-purple-400">Valkyrie Protocol</h3>
                <p className="text-slate-300 mb-6 text-lg">
                  Step into the networking core where data flows without friction. Zero-copy messaging meets intelligent
                  traffic management.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Network className="h-5 w-5 text-purple-400 mr-3" />
                    <span className="text-slate-300">Zero-copy data transfer</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-purple-400 mr-3" />
                    <span className="text-slate-300">QoS-aware traffic management</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-purple-400 mr-3" />
                    <span className="text-slate-300">Adaptive compression algorithms</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Performance Dashboard */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif font-bold text-3xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Real-Time Performance Metrics
              </h3>
              <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <AnimatedCounter end="<100" suffix="μs" />
                  <div className="text-slate-400">Job Scheduling</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter end="0" suffix=" Copy" />
                  <div className="text-slate-400">Data Transfer</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={99.99} suffix="%" />
                  <div className="text-slate-400">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={1000} suffix="x" />
                  <div className="text-slate-400">Faster Builds</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="market" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6">Massive Market Opportunity</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The convergence of cloud computing, microservices, and real-time applications creates a $50B+ addressable
              market
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif font-bold text-2xl mb-8 text-cyan-400">Target Industries</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-cyan-400/20">
                  <div>
                    <div className="font-semibold text-white">Cloud Infrastructure</div>
                    <div className="text-slate-400 text-sm">Microservices, containers, serverless</div>
                  </div>
                  <div className="text-cyan-400 font-bold">$28B</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-purple-400/20">
                  <div>
                    <div className="font-semibold text-white">Gaming & Entertainment</div>
                    <div className="text-slate-400 text-sm">Multiplayer, streaming, real-time</div>
                  </div>
                  <div className="text-purple-400 font-bold">$15B</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-green-400/20">
                  <div>
                    <div className="font-semibold text-white">Financial Services</div>
                    <div className="text-slate-400 text-sm">HFT, algorithmic trading, fintech</div>
                  </div>
                  <div className="text-green-400 font-bold">$12B</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <RotatingGlobe />
              <h4 className="font-serif font-bold text-xl mb-4">Market Potential</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <AnimatedCounter end={28} suffix="M+" />
                  <div className="text-slate-400 text-sm">Active DevOps Teams</div>
                </div>
                <div>
                  <AnimatedCounter end={23} suffix="%" />
                  <div className="text-slate-400 text-sm">Annual Market Growth</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6">Development Roadmap</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">Our journey from concept to market leader</p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400" />

            <div className="space-y-12">
              {[
                { quarter: "Q3 2025", title: "Core Engine Development", status: "current", color: "purple" },
                { quarter: "Q4 2025", title: "Valkyrie Protocol Alpha", status: "upcoming", color: "slate" },
                { quarter: "Q1 2026", title: "Private Beta Testing", status: "upcoming", color: "slate" },
                { quarter: "Q2 2026", title: "Public Beta Launch", status: "upcoming", color: "slate" },
                { quarter: "Q3 2026", title: "Enterprise Features", status: "upcoming", color: "slate" },
                { quarter: "Q4 2026", title: "Global Availability", status: "upcoming", color: "slate" },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <Card className={`border-${milestone.color}-400/20 bg-slate-900/50`}>
                      <CardContent className="p-6">
                        <div className={`text-${milestone.color}-400 font-semibold mb-2`}>{milestone.quarter}</div>
                        <h4 className="font-serif font-bold text-lg text-white mb-2">{milestone.title}</h4>
                        <Badge
                          variant={milestone.status === "completed" ? "default" : "secondary"}
                          className={
                            milestone.status === "completed"
                              ? "bg-green-500/20 text-green-400 border-green-400/30"
                              : milestone.status === "current"
                                ? "bg-purple-500/20 text-purple-400 border-purple-400/30"
                                : "bg-slate-500/20 text-slate-400 border-slate-400/30"
                          }
                        >
                          {milestone.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-${milestone.color}-400 bg-slate-900`}
                    animate={milestone.status === "current" ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-cyan-400/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(128, 0, 255, 0.1), rgba(0, 255, 255, 0.1))",
              "linear-gradient(225deg, rgba(128, 0, 255, 0.1), rgba(0, 255, 255, 0.1), rgba(128, 0, 255, 0.1))",
              "linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(128, 0, 255, 0.1), rgba(0, 255, 255, 0.1))",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6">Be Part of the Revolution</h2>
            <p className="text-xl text-slate-300 mb-8">
              Join us in building the future of distributed computing. Whether you're an investor or an early adopter,
              we have a place for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-cyan-400/20 bg-slate-900/50 h-full">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-2xl mb-4 text-cyan-400">For Investors</h3>
                  <p className="text-slate-300 mb-6">
                    Get in early on the next-generation infrastructure that will power tomorrow's applications. Limited
                    Series A opportunities available.
                  </p>
                  <ul className="text-left space-y-2 mb-6 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-slate-300">$50B+ addressable market</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-slate-300">Proven technical team</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-slate-300">Early customer validation</span>
                    </li>
                  </ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700"
                      onClick={() => openWaitlistForm("investor")}
                    >
                      Invest Early
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-purple-400/20 bg-slate-900/50 h-full">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-2xl mb-4 text-purple-400">For Developers</h3>
                  <p className="text-slate-300 mb-6">
                    Be among the first to experience sub-100μs CI/CD and zero-copy networking. Shape the future with
                    your feedback.
                  </p>
                  <ul className="text-left space-y-2 mb-6 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-slate-300">Free beta access</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-slate-300">Direct feedback channel</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-slate-300">Lifetime early adopter benefits</span>
                    </li>
                  </ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700"
                      onClick={() => openWaitlistForm("early-access")}
                    >
                      Request Early Access
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.footer
        className="border-t border-cyan-400/20 bg-slate-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-white" />
                </div>
                <span className="font-serif font-bold text-white">RustCI & Valkyrie</span>
              </div>
              <p className="text-sm text-slate-400 mb-4">Building the future of distributed computing infrastructure</p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#vision" className="hover:text-cyan-400 transition-colors">
                    Vision
                  </a>
                </li>
                <li>
                  <a href="#product" className="hover:text-cyan-400 transition-colors">
                    Architecture
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="hover:text-cyan-400 transition-colors">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Investors</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Pitch Deck
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Financial Projections
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:hello@rustci.dev" className="hover:text-cyan-400 transition-colors">
                    hello@rustci.dev
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Partnerships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Press Kit
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            © 2025 RustCI & Valkyrie. All rights reserved. • Building the future of distributed computing.
          </div>
        </div>
      </motion.footer>

      <WaitlistForm isOpen={waitlistForm.isOpen} onClose={closeWaitlistForm} type={waitlistForm.type} />
    </div>
  )
}
