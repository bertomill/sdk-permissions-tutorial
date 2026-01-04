"use client";

import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    title: "Why Permissions Matter",
    description: "Understanding the value of controlled AI agent access",
    href: "/why",
    icon: "💡",
  },
  {
    title: "Permissions Quiz",
    description: "Test your knowledge with 10 questions on SDK permissions",
    href: "/quiz",
    icon: "?",
  },
  {
    title: "Q&A",
    description: "Common questions about SDK permissions",
    href: "/qa",
    icon: "Q&A",
  },
  {
    title: "Code Examples",
    description: "Run the agent with different permission modes",
    href: "/examples",
    icon: "</>",
  },
  {
    title: "Wrap Up",
    description: "Cheatsheets, key takeaways, and what's next",
    href: "/wrapup",
    icon: "🎯",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image src="/logo.svg" alt="SDK Permissions Logo" width={80} height={80} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Claude Agent SDK</h1>
          <p className="text-xl text-gray-400">Permissions Tutorial</p>
        </div>

        <div className="grid gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block p-6 rounded-xl border-2 transition-all border-gray-700 bg-gray-800 hover:border-blue-500 hover:bg-gray-800/80"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center text-xl font-mono">
                  {item.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          Built for the Claude Agent SDK YouTube Tutorial
        </div>
      </div>
    </main>
  );
}
