import React, { useEffect, useState } from 'react';
import { LayoutDashboard, BarChart2, ShoppingCart, Users, FileText, MessageSquare, ArrowUpRight, ArrowDownRight, Eye, Calendar, CheckCircle, Clock, MoreHorizontal, TrendingUp, CreditCard, Send, Ticket, RefreshCw, Briefcase, Activity, Plus, Bell, ChevronUp, ChevronDown } from 'lucide-react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

// --- Reusable Components ---
const StatCard = ({ title, value, change, isPositive, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="flex items-center gap-2 text-sm mt-auto">
      <span className={`flex items-center font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </span>
      <span className="text-gray-400">vs last month</span>
    </div>
    <div className="mt-4 h-8 w-full">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
        <path d="M0,15 Q10,5 20,10 T40,15 T60,5 T80,10 T100,0" fill="none" stroke={isPositive ? "#0ea5e9" : "#ef4444"} strokeWidth="2" />
      </svg>
    </div>
  </div>
);

// 1. USER DASHBOARD 
const UserDashboard = ({ user }) => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.email?.split('@')[0] || 'User'}</h1>
        <p className="text-sm text-gray-500 mt-1">Your personal dashboard overview</p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left & Center Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center relative">
            <RefreshCw size={16} className="absolute top-4 right-4 text-gray-400 cursor-pointer" />
            <div className="w-20 h-20 rounded-full border-4 border-blue-100 mb-3 flex items-center justify-center bg-blue-50 text-blue-600 text-xl font-bold">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h3 className="font-bold text-gray-900">{user?.email?.split('@')[0] || 'User'}</h3>
            <p className="text-xs text-gray-500 mb-4">Design Manager</p>
            <div className="flex gap-4 text-xs font-medium text-gray-600">
              <span className="flex items-center gap-1"><Users size={14} className="text-orange-500"/> 11</span>
              <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-500"/> 56</span>
              <span className="flex items-center gap-1"><Activity size={14} className="text-red-500"/> 12</span>
            </div>
          </div>
          
          {/* Prioritized Tasks (linear) */}
          <div className="bg-linear-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-red-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-800">Prioritized<br/>tasks</span>
              <Clock size={18} className="text-gray-500" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-1">83%</h2>
              <p className="text-xs text-gray-500">Avg. Completed</p>
            </div>
          </div>

          {/* Additional Tasks (linear) */}
          <div className="bg-linear-to-br from-cyan-50 to-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-800">Additional<br/>tasks</span>
              <CheckCircle size={18} className="text-gray-500" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-1">56%</h2>
              <p className="text-xs text-gray-500">Avg. Completed</p>
            </div>
          </div>
        </div>

        {/* Focusing Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Focusing</h3>
              <p className="text-xs text-gray-400">Productivity analytics</p>
            </div>
            <select className="text-xs border-gray-100 rounded-lg bg-gray-50 px-3 py-1.5 font-medium text-gray-600 outline-none hover:bg-gray-100 transition-colors cursor-pointer">
              <option>Range: Last month</option>
            </select>
          </div>

          <div className="flex flex-1 gap-4 sm:gap-8 mt-2">
            {/* Custom Y-Axis (Months) */}
            <div className="flex flex-col justify-between items-center py-6 text-xs font-medium text-gray-400">
              <ChevronUp size={16} className="cursor-pointer hover:text-gray-900 transition-colors" />
              <span className="cursor-pointer hover:text-gray-900">Aug</span>
              <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-md shadow-blue-200 cursor-pointer">Sep</span>
              <span className="cursor-pointer hover:text-gray-900">Oct</span>
              <span className="cursor-pointer hover:text-gray-900">Nov</span>
              <ChevronDown size={16} className="cursor-pointer hover:text-gray-900 transition-colors" />
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative min-h-55 flex flex-col justify-between">
              <div className="absolute top-[35%] left-[36%] z-10 flex flex-col items-center transform -translate-x-1/2 -translate-y-full">
                <div className="bg-white shadow-xl shadow-gray-200/60 rounded-xl px-4 py-2 text-center border border-gray-50 mb-1">
                  <p className="text-sm font-bold text-gray-900">Week 8</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Unbalanced</p>
                </div>
                <div className="w-px h-6 bg-gray-200"></div>
                <div className="w-3.5 h-3.5 bg-white border-[3px] border-blue-500 rounded-full shadow-sm z-20 transform translate-y-1/2"></div>
              </div>

              <div className="absolute inset-0 w-full h-[calc(100%-3rem)]">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 200">
                  <defs>
                    <pattern id="dotGrid" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                      <circle cx="1.5" cy="1.5" r="1.5" fill="#e5e7eb" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dotGrid)" />

                  <path d="M 0 160 C 80 160, 100 80, 180 100 C 260 120, 280 190, 380 110 C 430 70, 470 90, 500 150" fill="none" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round"  strokeLinejoin="round" />

                  {/* Blue Line (Smooth Bezier Curve) */}
                  <path d="M 0 110 C 70 110, 120 150, 180 120 C 240 90, 280 60, 350 120 C 420 180, 460 160, 500 130" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Bottom Area: Legend & Stats */}
              <div className="flex justify-between items-end relative z-10 mt-auto pt-4">
                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3.5 rounded-sm bg-red-400"></div>
                    Maximum of focus
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3.5 rounded-sm bg-blue-500"></div>
                    Min or lack of focus
                  </div>
                </div>
                <div className="text-right pl-4">
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-none">41%</h2>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Avg. Conc-ion</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* My Meetings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">My meetings</h3>
            <Calendar size={18} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { date: "Tue, 11 Jul", time: "08:15 am", title: "Quick Daily Meeting", platform: "Zoom" },
              { date: "Tue, 11 Jul", time: "09:30 pm", title: "John Onboarding", platform: "Google Meet" },
              { date: "Tue, 12 Jul", time: "02:30 pm", title: "Call With a New Team", platform: "Google Meet" },
            ].map((meet, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0">
                <div>
                  <p className="text-xs text-gray-500">{meet.date}</p>
                  <p className="text-xs font-semibold text-gray-900">{meet.time}</p>
                </div>
                <div className="flex-1 ml-4">
                  <p className="text-sm font-medium text-gray-900">{meet.title}</p>
                  <p className="text-xs text-blue-500 flex items-center gap-1"><Calendar size={12}/> {meet.platform}</p>
                </div>
                <ArrowUpRight size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Developed Areas */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-1">Developed areas</h3>
          <p className="text-xs text-gray-500 mb-6">Most common areas of interests</p>
          <div className="space-y-4">
            {[
              { name: "Sport Skills", val: "71%", w: "71%" },
              { name: "Blogging", val: "92%", w: "92%" },
              { name: "Leadership", val: "33%", w: "33%" },
              { name: "Meditation", val: "56%", w: "56%" }
            ].map((skill, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-24 text-gray-700">{skill.name}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{width: skill.w}}></div>
                </div>
                <span className="text-gray-500 w-8 text-right text-xs">{skill.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// 2. ADMIN DASHBOARD (Based on Image 2)
// ==========================================
const AdminDashboard = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      <div className="flex gap-3 text-gray-400">
        <Bell size={20} /> <MessageSquare size={20} />
      </div>
    </div>

    {/* Top Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: "Balance", amount: "$2000", icon: CreditCard },
        { title: "Income", amount: "$25.25", icon: TrendingUp },
        { title: "Savings", amount: "$1900", icon: Briefcase },
        { title: "Expenses", amount: "$15.14", icon: ShoppingCart }
      ].map((stat, i) => (
        <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between items-center text-center relative">
          <MoreHorizontal size={16} className="absolute top-4 right-4 text-gray-300" />
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl mb-3"><stat.icon size={20}/></div>
          <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.amount}</h3>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Finance Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900">Finance</h3>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-teal-500 rounded-full"></div> Income</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-400 rounded-full"></div> Outcome</span>
          </div>
        </div>
        <div className="h-48 w-full flex items-end">
           <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path d="M0,35 Q10,20 20,30 T40,15 T60,25 T80,10 T100,20 L100,40 L0,40 Z" fill="rgba(20, 184, 166, 0.2)" />
              <path d="M0,35 Q10,20 20,30 T40,15 T60,25 T80,10 T100,20" fill="none" stroke="#14b8a6" strokeWidth="2" />
           </svg>
        </div>
      </div>

      {/* My Card & Quick Transfer */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">My Card</h3>
            <MoreHorizontal size={16} className="text-gray-400" />
          </div>
          <div className="bg-linear-to-r from-teal-400 to-teal-500 rounded-xl p-5 text-white shadow-md">
            <p className="text-teal-100 text-xs mb-1">Balance</p>
            <h2 className="text-2xl font-bold mb-6">$25,756</h2>
            <div className="flex justify-between text-xs font-medium">
              <span>7025 **** **** 1234</span>
              <span>12/24</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Quick Transfer</h3>
          <div className="flex gap-2 mb-4">
             {/* Mock Avatars */}
             {[1,2,3,4,5].map(n => (
               <div key={n} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shrink-0"></div>
             ))}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Card Number" className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <button className="bg-teal-500 text-white p-2 rounded-lg"><Send size={16}/></button>
          </div>
        </div>
      </div>
    </div>

    {/* Transaction History */}
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Transaction History</h3>
        <span className="text-sm text-teal-600 font-medium cursor-pointer">See All</span>
      </div>
      <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-gray-100">
          {[
            { name: "Danley Moriyo", cat: "Figma", date: "14/02/2024", time: "03:25 PM", amount: "$15.25", status: "Pending", sColor: "text-red-500" },
            { name: "Miliya Buritos", cat: "Plaid", date: "10/02/2024", time: "10:15 AM", amount: "$12.34", status: "Completed", sColor: "text-teal-500" },
            { name: "Cinema Alert", cat: "Spotify", date: "16/02/2024", time: "04:55 PM", amount: "$10.15", status: "Completed", sColor: "text-teal-500" }
          ].map((tx, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="py-3 font-medium flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div> {tx.name}
              </td>
              <td className="py-3 text-gray-500">{tx.cat}</td>
              <td className="py-3 text-gray-500">{tx.date}</td>
              <td className="py-3 text-gray-500">{tx.time}</td>
              <td className="py-3 font-semibold">{tx.amount}</td>
              <td className={`py-3 font-medium ${tx.sColor}`}>{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 3. MANAGER DASHBOARD 
const ManagerDashboard = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-sm text-gray-500">Manage and track your projects</p>
        <h1 className="text-2xl font-bold text-gray-900">Project Dashboard</h1>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      
      {/* Left Col: My Tasks */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-auto ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">My Tasks</h3>
          <Plus size={18} className="text-gray-400"/>
        </div>
        <div className="flex gap-2 mb-4">
          <button className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-xs font-medium">Today</button>
          <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Tomorrow</button>
        </div>
        <div className="flex-1 overflow-auto space-y-3">
          {[
            { title: "BrightBridge - Website", desc: "Design a frame website with modern templates", tag: "Design", bg: "bg-red-50 border-red-100" },
            { title: "Github - Upload Dev", desc: "Collaborate with Developers to handle...", tag: "Files & Images", bg: "bg-blue-50 border-blue-100" },
            { title: "9TDesign - Mobile App", desc: "Ready prototype for testing user in this week", tag: "Prototype", bg: "bg-pink-50 border-pink-100" },
          ].map((task, i) => (
            <div key={i} className={`p-4 rounded-xl border ${task.bg}`}>
              <div className="flex justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-1 bg-white rounded shadow-sm">{task.tag}</span>
                <CheckCircle size={16} className="text-gray-400" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">{task.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{task.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Col: Charts & Invoices */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center">
            <h3 className="font-bold text-gray-900 self-start mb-6">Projects Overview</h3>
            <div className="w-32 h-32 rounded-full border-8 border-orange-400 border-r-blue-500 border-t-gray-200 mb-6"></div>
            <div className="flex gap-4 text-xs font-medium text-gray-600">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-400 rounded-full"></div> In Progress: 14</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Completed: 32</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Income VS Expense</h3>
            <div className="h-32 w-full flex items-end">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path d="M0,25 Q15,10 40,20 T75,10 T100,25" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M0,35 Q30,25 50,30 T90,20 T100,35" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Invoice Overview</h3>
          <div className="space-y-4">
            {[
              { label: "Overdue", val: "5 | USD 183.00$", p: "80%", color: "bg-purple-500" },
              { label: "Not Paid", val: "5 | USD 183.00$", p: "60%", color: "bg-red-500" },
              { label: "Partially Paid", val: "5 | USD 183.00$", p: "40%", color: "bg-blue-500" },
              { label: "Fully Paid", val: "5 | USD 183.00$", p: "30%", color: "bg-green-500" },
            ].map((inv, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1 font-medium text-gray-700">
                  <span>{inv.label}</span> <span>{inv.val}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${inv.color} h-2 rounded-full`} style={{width: inv.p}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Col: Meetings & Tickets */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">My Meetings</h3>
            <Calendar size={16} className="text-gray-400"/>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center"><Calendar size={16} className="text-gray-500"/></div>
              <div><p className="font-medium text-sm">App Project</p><p className="text-xs text-gray-500">6:45 PM</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><Calendar size={16} className="text-blue-500"/></div>
              <div><p className="font-medium text-sm">User Research</p><p className="text-xs text-gray-500">6:45 PM</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Open Tickets</h3>
            <Ticket size={16} className="text-gray-400"/>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((t) => (
              <div key={t} className="p-3 border border-gray-100 bg-gray-50 rounded-xl flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0"></div>
                 <div>
                   <p className="text-xs font-semibold">User Name</p>
                   <p className="text-xs text-gray-500 mt-0.5">I need 3 more new features on the mobile app design.</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 4. SUPERADMIN DASHBOARD 
const SuperAdminDashboard = ({user}) => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-sm text-gray-500 mt-1">
        Welcome back, <span className='font-bold'>{user?.email?.split('@')[0].toUpperCase() || 'User'} </span>. Here's what's happening with your business today.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <StatCard title="Total Revenue" value="$48,295" change="+12.5%" isPositive={true} icon={BarChart2} iconBg="bg-blue-50" iconColor="text-blue-600" />
      <StatCard title="Active Users" value="2,847" change="+8.2%" isPositive={true} icon={Users} iconBg="bg-teal-50" iconColor="text-teal-600" />
      <StatCard title="Total Orders" value="1,432" change="-3.1%" isPositive={false} icon={ShoppingCart} iconBg="bg-blue-50" iconColor="text-blue-600" />
      <StatCard title="Page Views" value="284K" change="+24.7%" isPositive={true} icon={Eye} iconBg="bg-yellow-50" iconColor="text-yellow-600" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-gray-900">Overview</h3>
            <p className="text-sm text-gray-500">Monthly performance for the current year</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button className="px-3 py-1 bg-white shadow-sm rounded-md text-sm font-medium">Revenue</button>
            <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">Orders</button>
            <button className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-gray-900">Profit</button>
          </div>
        </div>
        <div className="h-90 w-full relative flex items-end">
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-400">
              <span>$60k</span><span>$45k</span><span>$30k</span><span>$15k</span><span>$0k</span>
            </div>
            <div className="absolute left-10 right-0 top-2 bottom-6 flex flex-col justify-between">
              {[1,2,3,4,5].map(i => <div key={i} className="border-t border-gray-100 border-dashed w-full"></div>)}
            </div>
            <div className="ml-10 w-full h-[calc(100%-1.5rem)] relative overflow-hidden">
              <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,80 Q10,75 20,80 T40,60 T60,70 T80,40 T100,30 L100,100 L0,100 Z" fill="rgba(59, 130, 246, 0.1)" />
                <path d="M0,80 Q10,75 20,80 T40,60 T60,70 T80,40 T100,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
              </svg>
            </div>
            <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-400 pt-2">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900">Traffic Sources</h3>
          <p className="text-sm text-gray-500 mb-6">Where your visitors come from</p>
          <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="0"></circle>
                    <circle cx="18" cy="18" r="16" fill="transparent" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="22 100" strokeDashoffset="-15"></circle>
                    <circle cx="18" cy="18" r="16" fill="transparent" stroke="#14b8a6" strokeWidth="4" strokeDasharray="28 100" strokeDashoffset="-37"></circle>
                    <circle cx="18" cy="18" r="16" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="35 100" strokeDashoffset="-65"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-bold text-xl text-gray-900">284K</span>
                    <span className="text-xs text-gray-500">Visits</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-700"></div><span className="text-gray-600">Direct</span></div><span className="font-semibold text-gray-900">35%</span></div>
                <div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal-500"></div><span className="text-gray-600">Organic</span></div><span className="font-semibold text-gray-900">28%</span></div>
                <div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sky-500"></div><span className="text-gray-600">Referral</span></div><span className="font-semibold text-gray-900">22%</span></div>
                <div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-violet-500"></div><span className="text-gray-600">Social</span></div><span className="font-semibold text-gray-900">15%</span></div>
              </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900">Monthly Goals</h3>
          <p className="text-sm text-gray-500 mb-6">Track progress toward targets</p>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium text-gray-900">Monthly Revenue</span><span className="text-gray-500">88%</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1"><div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div></div>
              <div className="flex justify-between text-xs text-gray-400"><span>$48,295</span><span>Target: $55,000</span></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium text-gray-900">New Customers</span><span className="text-gray-500">85%</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-1"><div className="bg-teal-500 h-2 rounded-full" style={{ width: '85%' }}></div></div>
              <div className="flex justify-between text-xs text-gray-400"><span>847</span><span>Target: 1,000</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-500">Latest transactions from your store</p>
          </div>
          <a href="#" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">View all <ArrowUpRight size={16} /></a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr><th className="px-6 py-3 font-medium">Customer</th><th className="px-6 py-3 font-medium">Order ID</th><th className="px-6 py-3 font-medium">Product</th><th className="px-6 py-3 font-medium">Status</th><th className="px-6 py-3 font-medium text-right">Amount</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: "Emma Wilson", email: "emma@example.com", id: "ORD-7891", product: "Pro Dashboard", status: "Completed", amount: "$299.00", color: "bg-blue-500", stBg: "bg-green-100 text-green-700" },
                { name: "James Chen", email: "james@company.io", id: "ORD-7890", product: "Team Plan", status: "Processing", amount: "$599.00", color: "bg-teal-500", stBg: "bg-blue-100 text-blue-700" },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-medium text-xs ${order.color}`}>{order.name.charAt(0)}</div>
                      <div><p className="font-medium text-gray-900">{order.name}</p><p className="text-xs text-gray-500">{order.email}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.product}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.stBg}`}>{order.status}</span></td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h3 className="font-bold text-gray-900">Recent Activity</h3><p className="text-sm text-gray-500">Latest events from your store</p></div>
          <a href="#" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">View all <ArrowUpRight size={16} /></a>
        </div>
        <div className="space-y-6">
            {[
              { title: "New order placed", desc: "Emma Wilson purchased Pro Dashboard License", time: "2 min ago", icon: ShoppingCart, bg: "bg-blue-50 text-blue-600" },
              { title: "New customer registered", desc: "James Chen created an account", time: "15 min ago", icon: Users, bg: "bg-teal-50 text-teal-600" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${activity.bg}`}><activity.icon size={18} /></div>
                <div><p className="font-medium text-sm text-gray-900">{activity.title}</p><p className="text-xs text-gray-500 mt-0.5">{activity.desc}</p><p className="text-xs text-gray-400 mt-1">{activity.time}</p></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth-check", { withCredentials: true });
      if (res.data.success) {
        setUser(res.data.user);
        setRole(res.data.user.role || 'user'); // Fallback if undefined
      }
    } catch (error) {
      console.error("Failed to fetch user", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to Fetch User Data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        {/* SIDEBAR REMAINS UNTOUCHED */}
        <Sidebar />
        
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">Loading Dashboard...</div>
          ) : (
            <>
              {role === "user" && <UserDashboard user={user} />}
              {role === "admin" && <AdminDashboard user={user} />}
              {role === "manager" && <ManagerDashboard user={user} />}
              {role === "superadmin" && <SuperAdminDashboard user={user} />}
              
              {/* Fallback for safety */}
              {!["user", "admin", "manager", "superadmin"].includes(role) && (
                 <div className="text-center mt-20 text-red-500 font-bold">Unrecognized User Role</div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}