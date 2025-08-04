import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router";
import { useSidebar } from "../../Context/SidebarContext";
import { useAuth } from "../../Context/AuthContext";
import { ThemeToggleButton } from "../header/ThemeToggleButton";
import NotificationDropdown from "../header/NotificationDropdown";
import UserDropdown from "../header/UserDropdown";

interface Command {
  id: string;
  title: string;
  description: string;
  route?: string;
  action?: () => void;
  icon: string;
  category: 'navigation' | 'action' | 'admin';
  adminOnly?: boolean;
}

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const commandPaletteRef = useRef<HTMLDivElement>(null);

  // Define available commands
  const commands: Command[] = [
    // Navigation Commands
    { id: 'dashboard', title: 'Dashboard', description: 'Go to dashboard', route: user?.isAdmin ? '/admin/dashboard' : '/user/dashboard', icon: '🏠', category: 'navigation' },
    { id: 'products', title: 'View Products', description: 'Browse insurance products', route: '/user/products', icon: '📦', category: 'navigation' },
    { id: 'claims', title: 'My Claims', description: 'View and manage claims', route: '/user/claims', icon: '📋', category: 'navigation' },
    { id: 'policies', title: 'My Policies', description: 'View insurance policies', route: '/user/policies', icon: '📄', category: 'navigation' },
    { id: 'profile', title: 'Edit Profile', description: 'Update profile information', route: '/user/profilepicture', icon: '👤', category: 'navigation' },
    { id: 'settings', title: 'Account Settings', description: 'Manage account settings', route: '/user/accountsettings', icon: '⚙️', category: 'navigation' },
    
    // Action Commands
    { id: 'new-claim', title: 'Create New Claim', description: 'Submit a new insurance claim', route: '/user/new-claim', icon: '➕', category: 'action' },
    { id: 'new-policy', title: 'Get New Policy', description: 'Apply for a new insurance policy', route: '/user/new-policy', icon: '📝', category: 'action' },
    
    // Admin Commands (only for admins)
    { id: 'admin-users', title: 'Manage Users', description: 'Admin: Manage system users', route: '/admin/users', icon: '👥', category: 'admin', adminOnly: true },
    { id: 'admin-claims', title: 'Manage Claims', description: 'Admin: Review and process claims', route: '/admin/claims', icon: '📊', category: 'admin', adminOnly: true },
    { id: 'admin-policies', title: 'Manage Policies', description: 'Admin: Manage insurance policies', route: '/admin/policies', icon: '📋', category: 'admin', adminOnly: true },
    { id: 'admin-products', title: 'Manage Products', description: 'Admin: Create and edit products', route: '/admin/products', icon: '🛠️', category: 'admin', adminOnly: true },
    { id: 'admin-analytics', title: 'Analytics', description: 'Admin: View system analytics', route: '/admin/analytics', icon: '📈', category: 'admin', adminOnly: true },
    { id: 'admin-settings', title: 'System Settings', description: 'Admin: Configure system settings', route: '/admin/settings', icon: '🔧', category: 'admin', adminOnly: true },
  ];

  // Get current section based on route
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path.includes('/claims')) return 'claims';
    if (path.includes('/policies')) return 'policies';
    if (path.includes('/products')) return 'products';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/settings')) return 'settings';
    if (path.includes('/users')) return 'admin-users';
    if (path.includes('/analytics')) return 'admin-analytics';
    if (path.includes('/admin')) return 'admin';
    return 'dashboard';
  };

  // Filter and sort commands based on search query, user permissions, and current section
  const filteredCommands = commands
    .filter(command => {
      if (command.adminOnly && !user?.isAdmin) return false;
      return true;
    })
    .filter(command => {
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        command.title.toLowerCase().includes(query) ||
        command.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      // If no search query, prioritize current section
      if (!searchQuery) {
        const currentSection = getCurrentSection();
        const aIsCurrentSection = a.id === currentSection || 
          (currentSection === 'admin' && a.category === 'admin') ||
          (currentSection === 'dashboard' && a.id === 'dashboard');
        const bIsCurrentSection = b.id === currentSection || 
          (currentSection === 'admin' && b.category === 'admin') ||
          (currentSection === 'dashboard' && b.id === 'dashboard');
        
        if (aIsCurrentSection && !bIsCurrentSection) return -1;
        if (!aIsCurrentSection && bIsCurrentSection) return 1;
      }
      
      // Otherwise maintain original order
      return 0;
    });

  const executeCommand = (command: Command) => {
    if (command.route) {
      navigate(command.route);
    } else if (command.action) {
      command.action();
    }
    setIsCommandPaletteOpen(false);
    setSearchQuery("");
    setSelectedCommandIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsCommandPaletteOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      
      if (isCommandPaletteOpen) {
        if (event.key === "Escape") {
          setIsCommandPaletteOpen(false);
          setSearchQuery("");
          setSelectedCommandIndex(0);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setSelectedCommandIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          setSelectedCommandIndex(prev => 
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
        } else if (event.key === "Enter") {
          event.preventDefault();
          if (filteredCommands[selectedCommandIndex]) {
            executeCommand(filteredCommands[selectedCommandIndex]);
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCommandPaletteOpen, filteredCommands, selectedCommandIndex]);

  // Close command palette when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandPaletteRef.current && !commandPaletteRef.current.contains(event.target as Node)) {
        setIsCommandPaletteOpen(false);
        setSearchQuery("");
        setSelectedCommandIndex(0);
      }
    };

    if (isCommandPaletteOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCommandPaletteOpen]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedCommandIndex(0);
  }, [searchQuery]);

  // Group commands by category for better organization
  const groupedCommands = filteredCommands.reduce((groups, command) => {
    const category = command.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(command);
    return groups;
  }, {} as Record<string, Command[]>);

  const categoryLabels = {
    navigation: 'Navigation',
    action: 'Actions',
    admin: 'Administration'
  };

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {/* Cross Icon */}
          </button>

          <Link to="/" className="lg:hidden">
            <img
              className="dark:hidden"
              src="./images/logo/logo.svg"
              alt="Logo"
            />
            <img
              className="hidden dark:block"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <div className="hidden lg:block relative">
            <form>
              <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2 z-10">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400 transition-colors"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search or type command..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsCommandPaletteOpen(true)}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm py-2.5 pl-12 pr-16 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white/90 dark:placeholder:text-white/40 dark:focus:border-blue-500 dark:focus:bg-gray-800 xl:w-[450px]"
                />

                {/* Command Palette Dropdown */}
                {isCommandPaletteOpen && (
                  <div 
                    ref={commandPaletteRef}
                    className="absolute top-full left-0 right-0 mt-3 bg-white/98 backdrop-blur-xl dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-600/50 rounded-2xl shadow-2xl z-50 max-h-[32rem] overflow-hidden"
                    style={{
                      animation: 'fadeInScale 0.15s ease-out forwards',
                    }}
                  >
                    <style>{`
                      @keyframes fadeInScale {
                        from {
                          opacity: 0;
                          transform: translateY(-8px) scale(0.96);
                        }
                        to {
                          opacity: 1;
                          transform: translateY(0) scale(1);
                        }
                      }
                    `}</style>
                    
                    {filteredCommands.length > 0 ? (
                      <div className="relative">
                        {/* Custom Scrollbar Container */}
                        <div 
                          className="max-h-80 overflow-y-auto py-3 px-1"
                          style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                          }}
                        >
                          <style>{`
                            div::-webkit-scrollbar {
                              display: none;
                            }
                          `}</style>
                          
                          {Object.entries(groupedCommands).map(([category, commands]) => (
                            <div key={category} className="mb-4 last:mb-0">
                              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {categoryLabels[category as keyof typeof categoryLabels]}
                              </div>
                              <div className="space-y-1 px-2">
                                {commands.map((command) => {
                                  const commandIndex = filteredCommands.findIndex(c => c.id === command.id);
                                  return (
                                    <button
                                      key={command.id}
                                      onClick={() => executeCommand(command)}
                                      className={`w-full text-left px-3 py-3 rounded-xl flex items-center gap-3 transition-all duration-150 ${
                                        commandIndex === selectedCommandIndex 
                                          ? 'bg-blue-50 dark:bg-blue-900/30 shadow-sm ring-1 ring-blue-200 dark:ring-blue-800 transform scale-[1.02]' 
                                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:scale-[1.01]'
                                      }`}
                                    >
                                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <span className="text-base">{command.icon}</span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                          {command.title}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                          {command.description}
                                        </div>
                                      </div>
                                      {commandIndex === selectedCommandIndex && (
                                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <div className="text-sm font-medium mb-1">No commands found</div>
                        <div className="text-xs">Try a different search term</div>
                      </div>
                    )}
                    
                    {/* Enhanced Footer */}
                    <div className="border-t border-gray-200/60 dark:border-gray-700/60 px-4 py-3 bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-sm">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-xs font-mono shadow-sm">↑↓</kbd>
                            Navigate
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-xs font-mono shadow-sm">↵</kbd>
                            Select
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-xs font-mono shadow-sm">Esc</kbd>
                            Close
                          </span>
                        </div>
                        <span className="text-gray-400 dark:text-gray-500 font-medium">
                          {filteredCommands.length} {filteredCommands.length === 1 ? 'command' : 'commands'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-lg border border-gray-200 bg-gray-50/80 px-2 py-1.5 text-xs font-mono text-gray-500 backdrop-blur-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-700">
                  <span>⌘</span>
                  <span>K</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          <div className="flex items-center gap-2 2xsm:gap-3">
            {/* <!-- Dark Mode Toggler --> */}
            <ThemeToggleButton />
            {/* <!-- Dark Mode Toggler --> */}
            <NotificationDropdown />
            {/* <!-- Notification Menu Area --> */}
          </div>
          {/* <!-- User Area --> */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;