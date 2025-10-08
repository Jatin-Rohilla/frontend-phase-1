"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tradeDropdownOpen, setTradeDropdownOpen] = useState(false)
  const [mobileTradeOpen, setMobileTradeOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo/mainlogo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-6 sm:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Trade Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setTradeDropdownOpen(true)}
              onMouseLeave={() => setTradeDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80">
                Trade
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {tradeDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-[800px] z-50">
                  <div className="bg-background border border-foreground/10 rounded-lg shadow-lg p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Column 1 */}
                      <div className="space-y-4">
                        <Link href="/strategy-builder" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">Strategy Builder</span>
                                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Popular</span>
                              </div>
                              <p className="text-xs text-foreground/60 mt-1">Analyse your positions, or create and analyse new trades</p>
                            </div>
                          </div>
                        </Link>
                        
                        <Link href="/strategy-wizard" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-medium text-sm">Strategy Wizard</span>
                              <p className="text-xs text-foreground/60 mt-1">Give a target and get the best trades for your target</p>
                            </div>
                          </div>
                        </Link>
                        
                        <Link href="/expiry-trades" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-medium text-sm">Expiry Trades</span>
                              <p className="text-xs text-foreground/60 mt-1">Predict the expiry and get profitable option trades</p>
                            </div>
                          </div>
                        </Link>
                        
                        <Link href="/easy-options" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-medium text-sm">Easy Options</span>
                              <p className="text-xs text-foreground/60 mt-1">Just guess up or down, and get simple trades with small risks</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      
                      {/* Column 2 */}
                      <div className="space-y-4">
                        <Link href="/practice-trade" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-medium text-sm">Practice Trade / Draft Portfolios</span>
                              <p className="text-xs text-foreground/60 mt-1">Create, record, and track trades</p>
                            </div>
                          </div>
                        </Link>
                        
                        <Link href="/mindful-trading" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">Mindful Trading</span>
                                <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded">New</span>
                              </div>
                              <p className="text-xs text-foreground/60 mt-1">Stop Impulsive Trading</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                      
                      {/* Column 3 */}
                      <div className="space-y-4">
                        <Link href="/learn-options-strategies" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">Learn Options Strategies</span>
                                <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded">New</span>
                              </div>
                              <p className="text-xs text-foreground/60 mt-1">Learn about different Options trading strategies</p>
                            </div>
                          </div>
                        </Link>
                        
                        <Link href="/learn-options-trading" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-medium text-sm">Learn Options Trading</span>
                              <p className="text-xs text-foreground/60 mt-1">Free video courses on Options Trading</p>
                            </div>
                          </div>
                        </Link>
                        
                        <Link href="/verified-by-sensibull" className="block group">
                          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-foreground/5 transition-colors">
                            <div className="text-foreground/70">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-medium text-sm">Verified By Sensibull</span>
                              <p className="text-xs text-foreground/60 mt-1">Share your verified P&L, or follow verified profitable traders</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Analyse */}
            <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80">
              Analyse
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {/* Watchlist with New badge */}
            <Link href="/watchlist" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80">
              Watchlist
              <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded font-semibold">New</span>
            </Link>
            
            {/* Positions */}
            <Link href="/positions" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Positions
            </Link>
            
            {/* Orders */}
            <Link href="/orders" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Orders
            </Link>
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>

          {/* Mobile menu button & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-foreground/10">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {/* Trade with dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full rounded-md px-3 py-2 text-base font-medium hover:bg-foreground/5"
                onClick={() => setMobileTradeOpen(!mobileTradeOpen)}
              >
                <span>Trade</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileTradeOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {mobileTradeOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/strategy-builder"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Strategy Builder</span>
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Popular</span>
                    </div>
                    <p className="text-xs text-foreground/60 mt-1">Analyse your positions, or create and analyse new trades</p>
                  </Link>
                  
                  <Link
                    href="/strategy-wizard"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Strategy Wizard</span>
                    <p className="text-xs text-foreground/60 mt-1">Give a target and get the best trades for your target</p>
                  </Link>
                  
                  <Link
                    href="/expiry-trades"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Expiry Trades</span>
                    <p className="text-xs text-foreground/60 mt-1">Predict the expiry and get profitable option trades</p>
                  </Link>
                  
                  <Link
                    href="/easy-options"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Easy Options</span>
                    <p className="text-xs text-foreground/60 mt-1">Just guess up or down, and get simple trades with small risks</p>
                  </Link>
                  
                  <Link
                    href="/practice-trade"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Practice Trade / Draft Portfolios</span>
                    <p className="text-xs text-foreground/60 mt-1">Create, record, and track trades</p>
                  </Link>
                  
                  <Link
                    href="/mindful-trading"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Mindful Trading</span>
                      <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded">New</span>
                    </div>
                    <p className="text-xs text-foreground/60 mt-1">Stop Impulsive Trading</p>
                  </Link>
                  
                  <Link
                    href="/learn-options-strategies"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Learn Options Strategies</span>
                      <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded">New</span>
                    </div>
                    <p className="text-xs text-foreground/60 mt-1">Learn about different Options trading strategies</p>
                  </Link>
                  
                  <Link
                    href="/learn-options-trading"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Learn Options Trading</span>
                    <p className="text-xs text-foreground/60 mt-1">Free video courses on Options Trading</p>
                  </Link>
                  
                  <Link
                    href="/verified-by-sensibull"
                    className="block rounded-md px-3 py-2 text-sm hover:bg-foreground/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">Verified By Sensibull</span>
                    <p className="text-xs text-foreground/60 mt-1">Share your verified P&L, or follow verified profitable traders</p>
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              href="/analyse"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-foreground/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analyse
            </Link>
            <Link
              href="/watchlist"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium hover:bg-foreground/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Watchlist
              <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded font-semibold">New</span>
            </Link>
            <Link
              href="/positions"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-foreground/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Positions
            </Link>
            <Link
              href="/orders"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-foreground/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Orders
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
