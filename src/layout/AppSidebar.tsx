"use client";
import React, { useEffect, useRef, useState,useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";
import { useAtom } from "jotai";
import { menuRoutinesAtom } from "@/jotai/global/menu.jotai";
import { TMenuRoutine } from "@/types/global/menu.type";
import { iconAtom } from "@/jotai/global/icons.jotai";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/", pro: false }],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },

  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const [menu] = useAtom(menuRoutinesAtom);
  const [icons] = useAtom(iconAtom);
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { index };
    });
  };

  const [openChildMenus, setOpenChildMenus] = useState<string[]>([]);

  const toggleChildMenu = (code: string) => {
    setOpenChildMenus((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  return (
    <aside className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200  ${ isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]" } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`} onMouseEnter={() => !isExpanded && setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`py-8 flex w-full ${ !isExpanded && !isHovered ? "lg:justify-center" : "justify-start" }`} >
        <Link href="/" className="w-full flex justify-center">
          {isExpanded || isHovered || isMobileOpen ? (
            <div>
              <Image
                className="dark:hidden"
                src="/assets/images/logo.png"
                alt="Logo"
                width={200}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/assets/images/logo.png"
                alt="Logo"
                width={200}
                height={40}
              />
            </div>
          ) : (
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={200}
              height={110}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <ul className="flex flex-col gap-4">
                {menu.map((nav: TMenuRoutine, index) => {
                  const IconComponent = nav.icon ? icons[nav.icon] : null;

                  return (
                    <li key={nav.code}>
                      {nav.subMenu ? (
                        /* ITEM PAI COM SUBMENU */
                        <button
                          onClick={() => handleSubmenuToggle(index)}
                          className={`menu-item group ${
                            openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"
                          } cursor-pointer ${
                            !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
                          }`}
                        >
                          <span className={`${openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                            {IconComponent && <IconComponent size={15} />}
                          </span>

                          {(isExpanded || isHovered || isMobileOpen) && (
                            <>
                              <span className={`menu-item-text`}>{nav.description}</span>
                              <ChevronDownIcon
                                className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                  openSubmenu?.index === index ? "rotate-180 text-brand-500" : ""
                                }`}
                              />
                            </>
                          )}
                        </button>
                      ) : (
                        /* ITEM PAI SIMPLES (LINK DIRETO) */
                        nav.link && (
                          <Link
                            href={nav.link}
                            className={`menu-item group ${isActive(nav.link) ? "menu-item-active" : "menu-item-inactive"}`}
                          >
                            <span className={`${isActive(nav.link) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>
                              {IconComponent && <IconComponent size={15} />}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                              <span className={`menu-item-text`}>{nav.description}</span>
                            )}
                          </Link>
                        )
                      )}

                      {/* --- NÍVEL 1 DO SUBMENU --- */}
                      {nav.subMenu && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            openSubmenu?.index === index 
                              ? "grid-rows-[1fr] opacity-100" 
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <ul className="mt-2 space-y-1 ml-6 overflow-hidden">
                            {nav.subMenu.map((subItem) => {
                              const hasChildren = subItem.subMenu && subItem.subMenu.length > 0;
                              const isChildOpen = openChildMenus.includes(subItem.code);

                              return (
                                <li key={subItem.code || subItem.description} className="flex flex-col">
                                  {/* Botão de Toggle ou Link Direto */}
                                  {hasChildren ? (
                                    <button
                                      type="button"
                                      onClick={() => toggleChildMenu(subItem.code)}
                                      className={`menu-dropdown-item flex items-center justify-between w-full ${
                                        isChildOpen ? "text-[var(--color-brand-500)]" : "text-gray-500"
                                      }`}
                                    >
                                      <span>{subItem.description}</span>
                                      <ChevronDownIcon 
                                        className={`w-4 h-4 transition-transform duration-200 ${isChildOpen ? "rotate-180" : ""}`} 
                                      />
                                    </button>
                                  ) : (
                                    <Link
                                      href={subItem.link || "#"}
                                      className={`menu-dropdown-item ${
                                        isActive(subItem.link) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"
                                      }`}
                                    >
                                      {subItem.description}
                                    </Link>
                                  )}

                                  {/* --- NÍVEL 2 (SUB-SUBMENU) --- */}
                                  {hasChildren && (
                                    <div 
                                      className={`grid transition-all duration-300 ease-in-out ${
                                        isChildOpen 
                                          ? "grid-rows-[1fr] opacity-100 mt-1" 
                                          : "grid-rows-[0fr] opacity-0"
                                      }`}
                                    >
                                      <ul className="ml-4 space-y-1 overflow-hidden">
                                        {subItem.subMenu.map((child: TMenuRoutine) => (
                                          <li key={child.code}>
                                            <Link
                                              href={child.link || "#"}
                                              className={`block py-1.5 px-3 text-xs rounded-md menu-dropdown-item ${
                                                isActive(child.link) 
                                                  ? "menu-dropdown-item-active" 
                                                  : "menu-dropdown-item-inactive"
                                              }`}
                                            >
                                              {child.description}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
