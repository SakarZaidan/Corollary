import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiSettings, FiLogOut, FiSearch, FiGrid, FiBook, FiDollarSign, FiChevronDown } from "react-icons/fi";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useUserStore } from "../../store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

export function DashboardHeader() {
  const navigate = useNavigate();
  const { user, profile, logout } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-primary-dark border-b border-white/10 sticky top-0 z-50">
      <Container>
        <div className="flex h-16 items-center justify-between py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-md bg-gradient-to-br from-accent-purple to-accent-teal">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                  C
                </div>
              </div>
              <span className="text-xl font-bold text-white">
                Corollary
              </span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-neutral-light" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-primary-main focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
                  placeholder="Search visualizations, topics, or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              to="/dashboard"
              className="hidden md:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white hover:text-accent-purple"
            >
              <FiGrid className="h-4 w-4 mr-1" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/explore"
              className="hidden md:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white hover:text-accent-purple"
            >
              <FiBook className="h-4 w-4 mr-1" />
              <span>Explore</span>
            </Link>

            <Link
              to="/payment"
              className="hidden md:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white hover:text-accent-purple"
            >
              <FiDollarSign className="h-4 w-4 mr-1" />
              <span>Pricing</span>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white hover:text-accent-purple rounded-lg hover:bg-white/5">
                  <div className="relative h-8 w-8 rounded-full bg-accent-purple/20 flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={profile?.full_name || user?.email?.split('@')[0] || 'User'} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FiUser className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <span className="hidden md:inline-block">
                    {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <FiChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full items-center">
                    <FiUser className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex w-full items-center">
                    <FiSettings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button 
                    onClick={handleLogout} 
                    className="flex w-full items-center text-red-400 hover:text-red-300"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Create Button */}
            <Button
              variant="gradient"
              size="sm"
              onClick={() => navigate("/workspace")}
              className="ml-2"
            >
              Create
            </Button>
          </nav>
        </div>
      </Container>

      {/* Search Bar - Mobile */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-neutral-light" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg bg-primary-main focus:ring-accent-purple focus:border-accent-purple text-white placeholder-neutral-light"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
}