import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { useUserStore } from "../store/userStore";
import { useTheme } from "../components/ThemeProvider";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import { FiUser, FiSettings, FiCreditCard, FiLock, FiBell, FiEye, FiHelpCircle, FiAlertTriangle } from "react-icons/fi";

export function SettingsPage() {
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, isLoading, updateProfile } = useUserStore();
  const { colorScheme, toggleColorScheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    notifications: {
      email: true,
      product: true,
      updates: false,
    },
    privacy: {
      profileVisibility: "public",
      contentPrivacy: "private",
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Initialize form data from user profile
  useEffect(() => {
    if (user && profile) {
      setFormData({
        email: user.email || "",
        fullName: profile.full_name || "",
        notifications: {
          email: true,
          product: true,
          updates: false,
        },
        privacy: {
          profileVisibility: "public",
          contentPrivacy: "private",
        },
      });
    }
  }, [user, profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [name]: checked,
      },
    });
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      privacy: {
        ...formData.privacy,
        [name]: value,
      },
    });
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Update profile in Supabase
      await updateProfile({
        full_name: formData.fullName,
        // Add other fields as needed
      });
      // Show success message
      alert("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      // Implement account deletion logic
      alert("Account deletion functionality will be implemented in the future.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark">
        <div className="w-12 h-12 border-4 border-accent-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <DashboardHeader />
      <Container>
        <div className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Navigation */}
              <div className="w-full lg:w-64 flex-shrink-0">
                <div className="bg-primary-main rounded-xl p-4 sticky top-24">
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab("account")}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "account" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiUser className="flex-shrink-0" />
                      <span>Account</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("appearance")}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "appearance" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiEye className="flex-shrink-0" />
                      <span>Appearance</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("notifications")}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "notifications" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiBell className="flex-shrink-0" />
                      <span>Notifications</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("privacy")}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "privacy" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiLock className="flex-shrink-0" />
                      <span>Privacy</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("billing")}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "billing" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiCreditCard className="flex-shrink-0" />
                      <span>Billing</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("help")}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "help" ? "bg-accent-purple/20 text-accent-purple" : "text-white hover:bg-white/10"}`}
                    >
                      <FiHelpCircle className="flex-shrink-0" />
                      <span>Help & Support</span>
                    </button>
                  </nav>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-grow">
                <div className="bg-primary-main rounded-xl p-6">
                  {/* Account Settings */}
                  {activeTab === "account" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="email">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            disabled
                          />
                          <p className="text-xs text-neutral-light mt-1">Your email address cannot be changed</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="fullName">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Password
                          </label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => alert("Password change functionality will be implemented in the future.")}
                          >
                            Change Password
                          </Button>
                        </div>

                        <div className="pt-4 border-t border-neutral-light/20">
                          <Button onClick={handleSaveChanges} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Appearance Settings */}
                  {activeTab === "appearance" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Appearance</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Theme</label>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={toggleColorScheme}
                              className={`px-4 py-2 rounded-lg border ${colorScheme === "dark" ? "border-accent-purple bg-accent-purple/20 text-accent-purple" : "border-neutral-light/20"}`}
                            >
                              Dark
                            </button>
                            <button
                              onClick={toggleColorScheme}
                              className={`px-4 py-2 rounded-lg border ${colorScheme === "light" ? "border-accent-purple bg-accent-purple/20 text-accent-purple" : "border-neutral-light/20"}`}
                            >
                              Light
                            </button>
                          </div>
                          <p className="text-xs text-neutral-light mt-1">Choose your preferred theme</p>
                        </div>

                        <div className="pt-4 border-t border-neutral-light/20">
                          <Button onClick={handleSaveChanges} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Notification Settings */}
                  {activeTab === "notifications" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                      
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Email Notifications</h3>
                              <p className="text-sm text-neutral-light">Receive important updates via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="email"
                                checked={formData.notifications.email}
                                onChange={handleNotificationChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-primary-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-purple"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Product Updates</h3>
                              <p className="text-sm text-neutral-light">Get notified about new features and improvements</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="product"
                                checked={formData.notifications.product}
                                onChange={handleNotificationChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-primary-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-purple"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Marketing Updates</h3>
                              <p className="text-sm text-neutral-light">Receive promotional content and offers</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                name="updates"
                                checked={formData.notifications.updates}
                                onChange={handleNotificationChange}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-primary-dark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-purple"></div>
                            </label>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-neutral-light/20">
                          <Button onClick={handleSaveChanges} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Privacy Settings */}
                  {activeTab === "privacy" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="profileVisibility">
                            Profile Visibility
                          </label>
                          <select
                            id="profileVisibility"
                            name="profileVisibility"
                            value={formData.privacy.profileVisibility}
                            onChange={handlePrivacyChange}
                            className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          >
                            <option value="public">Public - Anyone can view your profile</option>
                            <option value="private">Private - Only you can view your profile</option>
                            <option value="contacts">Contacts Only - Only your contacts can view your profile</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2" htmlFor="contentPrivacy">
                            Content Privacy
                          </label>
                          <select
                            id="contentPrivacy"
                            name="contentPrivacy"
                            value={formData.privacy.contentPrivacy}
                            onChange={handlePrivacyChange}
                            className="w-full px-4 py-2 bg-primary-dark border border-neutral-light/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          >
                            <option value="public">Public - Anyone can view your content</option>
                            <option value="private">Private - Only you can view your content</option>
                            <option value="unlisted">Unlisted - Only people with the link can view your content</option>
                          </select>
                        </div>

                        <div className="pt-4 border-t border-neutral-light/20">
                          <Button onClick={handleSaveChanges} disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Billing Settings */}
                  {activeTab === "billing" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Billing & Subscription</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-primary-dark p-4 rounded-lg border border-neutral-light/20">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Current Plan</h3>
                            <span className="px-2 py-1 bg-accent-purple/20 text-accent-purple text-xs rounded-full">
                              {profile?.account_tier || "Free"}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-light mb-4">
                            {profile?.account_tier === "premium" 
                              ? "You have access to all premium features" 
                              : "Upgrade to Premium for advanced features"}
                          </p>
                          {profile?.account_tier !== "premium" && (
                            <Button variant="gradient" onClick={() => navigate("/pricing")}>
                              Upgrade Plan
                            </Button>
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium mb-4">Payment Methods</h3>
                          <p className="text-sm text-neutral-light mb-4">
                            {profile?.account_tier === "premium" 
                              ? "Manage your payment methods" 
                              : "Add a payment method when you upgrade"}
                          </p>
                          {profile?.account_tier === "premium" && (
                            <Button variant="outline" size="sm">
                              Manage Payment Methods
                            </Button>
                          )}
                        </div>

                        <div>
                          <h3 className="font-medium mb-4">Billing History</h3>
                          <p className="text-sm text-neutral-light mb-4">
                            {profile?.account_tier === "premium" 
                              ? "View your past invoices and payment history" 
                              : "Your billing history will appear here after your first payment"}
                          </p>
                          {profile?.account_tier === "premium" && (
                            <Button variant="outline" size="sm">
                              View Billing History
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Help & Support */}
                  {activeTab === "help" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl font-semibold mb-6">Help & Support</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-primary-dark p-4 rounded-lg border border-neutral-light/20">
                          <h3 className="font-medium mb-2">Documentation</h3>
                          <p className="text-sm text-neutral-light mb-4">
                            Browse our comprehensive documentation to learn more about Corollary's features
                          </p>
                          <Button variant="outline" size="sm">
                            View Documentation
                          </Button>
                        </div>

                        <div className="bg-primary-dark p-4 rounded-lg border border-neutral-light/20">
                          <h3 className="font-medium mb-2">Contact Support</h3>
                          <p className="text-sm text-neutral-light mb-4">
                            Need help? Our support team is ready to assist you
                          </p>
                          <Button variant="outline" size="sm">
                            Contact Support
                          </Button>
                        </div>

                        <div className="bg-primary-dark p-4 rounded-lg border border-neutral-light/20">
                          <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                          <p className="text-sm text-neutral-light mb-4">
                            Find answers to common questions about Corollary
                          </p>
                          <Button variant="outline" size="sm">
                            View FAQs
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Danger Zone */}
                  {activeTab === "account" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-12"
                    >
                      <div className="border border-error/30 rounded-lg p-6 bg-error/10">
                        <div className="flex items-start">
                          <FiAlertTriangle className="text-error mr-4 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-medium text-error mb-2">Danger Zone</h3>
                            <p className="text-sm text-neutral-light mb-4">
                              Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={handleDeleteAccount}
                            >
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};