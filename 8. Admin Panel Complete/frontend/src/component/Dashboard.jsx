import React from 'react';
import { LayoutDashboard, BarChart2, ShoppingCart, Users, FileText, Mail, MessageSquare, Folder, Kanban, Search, Plus, Moon, Bell, LogOut, ArrowUpRight, ArrowDownRight, Eye, Menu, ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';

const SidebarItem = ({ icon: Icon, label, active, badge }) => (
  <div
    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'text-gray-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon size={18} />
      <span className="font-medium text-sm">{label}</span>
    </div>
    {badge && (
      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

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
      <span
        className={`flex items-center font-medium ${
          isPositive ? 'text-green-600' : 'text-red-500'
        }`}
      >
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </span>
      <span className="text-gray-400">vs last month</span>
    </div>
    <div className="mt-4 h-8 w-full">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 20">
        <path
          d="M0,15 Q10,5 20,10 T40,15 T60,5 T80,10 T100,0"
          fill="none"
          stroke={isPositive ? "#0ea5e9" : "#ef4444"}
          strokeWidth="2"
        />
      </svg>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        <Sidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Welcome back, John Doe. Here's what's happening with your business today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard
                title="Total Revenue"
                value="$48,295"
                change="+12.5%"
                isPositive={true}
                icon={BarChart2}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
              />
              <StatCard
                title="Active Users"
                value="2,847"
                change="+8.2%"
                isPositive={true}
                icon={Users}
                iconBg="bg-teal-50"
                iconColor="text-teal-600"
              />
              <StatCard
                title="Total Orders"
                value="1,432"
                change="-3.1%"
                isPositive={false}
                icon={ShoppingCart}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
              />
              <StatCard
                title="Page Views"
                value="284K"
                change="+24.7%"
                isPositive={true}
                icon={Eye}
                iconBg="bg-yellow-50"
                iconColor="text-yellow-600"
              />
            </div>

            {/* Charts & Activity Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Chart (Overview) */}
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
                {/* Mock Area Chart */}
                <div className="h-90 w-full relative flex items-end">
                   {/* Y-Axis Labels */}
                   <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-400">
                     <span>$60k</span><span>$45k</span><span>$30k</span><span>$15k</span><span>$0k</span>
                   </div>
                   {/* Grid Lines */}
                   <div className="absolute left-10 right-0 top-2 bottom-6 flex flex-col justify-between">
                      <div className="border-t border-gray-100 border-dashed w-full"></div>
                      <div className="border-t border-gray-100 border-dashed w-full"></div>
                      <div className="border-t border-gray-100 border-dashed w-full"></div>
                      <div className="border-t border-gray-100 border-dashed w-full"></div>
                      <div className="border-t border-gray-100 border-dashed w-full"></div>
                   </div>
                   {/* SVG Curve */}
                   <div className="ml-10 w-full h-[calc(100%-1.5rem)] relative overflow-hidden">
                     <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0,80 Q10,75 20,80 T40,60 T60,70 T80,40 T100,30 L100,100 L0,100 Z" fill="rgba(59, 130, 246, 0.1)" />
                        <path d="M0,80 Q10,75 20,80 T40,60 T60,70 T80,40 T100,30" fill="none" stroke="#3b82f6" strokeWidth="2" />
                     </svg>
                   </div>
                   {/* X-Axis Labels */}
                   <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-400 pt-2">
                     <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                   </div>
                </div>
              </div>

              {/* Side Column */}
              <div className="space-y-6">
                
                {/* Traffic Sources */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900">Traffic Sources</h3>
                  <p className="text-sm text-gray-500 mb-6">Where your visitors come from</p>
                  <div className="flex items-center gap-6">
                     <div className="relative w-32 h-32 shrink-0">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                           {/* Social */}
                           <circle cx="18" cy="18" r="16" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="0"></circle>
                           {/* Referral */}
                           <circle cx="18" cy="18" r="16" fill="transparent" stroke="#0ea5e9" strokeWidth="4" strokeDasharray="22 100" strokeDashoffset="-15"></circle>
                           {/* Organic */}
                           <circle cx="18" cy="18" r="16" fill="transparent" stroke="#14b8a6" strokeWidth="4" strokeDasharray="28 100" strokeDashoffset="-37"></circle>
                           {/* Direct */}
                           <circle cx="18" cy="18" r="16" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="35 100" strokeDashoffset="-65"></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="font-bold text-xl text-gray-900">284K</span>
                           <span className="text-xs text-gray-500">Visits</span>
                        </div>
                     </div>
                     <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-700"></div><span className="text-gray-600">Direct</span></div>
                           <span className="font-semibold text-gray-900">35%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal-500"></div><span className="text-gray-600">Organic</span></div>
                           <span className="font-semibold text-gray-900">28%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sky-500"></div><span className="text-gray-600">Referral</span></div>
                           <span className="font-semibold text-gray-900">22%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-violet-500"></div><span className="text-gray-600">Social</span></div>
                           <span className="font-semibold text-gray-900">15%</span>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Monthly Goals */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900">Monthly Goals</h3>
                  <p className="text-sm text-gray-500 mb-6">Track progress toward targets</p>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900">Monthly Revenue</span>
                        <span className="text-gray-500">88%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>$48,295</span><span>Target: $55,000</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900">New Customers</span>
                        <span className="text-gray-500">85%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>847</span><span>Target: 1,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">Recent Orders</h3>
                    <p className="text-sm text-gray-500">Latest transactions from your store</p>
                  </div>
                  <a href="#" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                    View all <ArrowUpRight size={16} />
                  </a>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-500">
                      <tr>
                        <th className="px-6 py-3 font-medium">Customer</th>
                        <th className="px-6 py-3 font-medium">Order ID</th>
                        <th className="px-6 py-3 font-medium">Product</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { name: "Emma Wilson", email: "emma@example.com", id: "ORD-7891", product: "Pro Dashboard License", status: "Completed", amount: "$299.00", color: "bg-blue-500", stBg: "bg-green-100 text-green-700" },
                        { name: "James Chen", email: "james@company.io", id: "ORD-7890", product: "Team Plan Upgrade", status: "Processing", amount: "$599.00", color: "bg-teal-500", stBg: "bg-blue-100 text-blue-700" },
                        { name: "Sofia Garcia", email: "sofia@startup.co", id: "ORD-7889", product: "Enterprise License", status: "Completed", amount: "$1,499.00", color: "bg-indigo-500", stBg: "bg-green-100 text-green-700" },
                        { name: "Alex Thompson", email: "alex@dev.com", id: "ORD-7888", product: "Single License", status: "Pending", amount: "$79.00", color: "bg-yellow-500", stBg: "bg-yellow-100 text-yellow-700" },
                      ].map((order, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-medium text-xs ${order.color}`}>
                                {order.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{order.name}</p>
                                <p className="text-xs text-gray-500">{order.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{order.id}</td>
                          <td className="px-6 py-4 text-gray-700">{order.product}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.stBg}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-gray-900">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900">Recent Activity</h3>
                    <p className="text-sm text-gray-500">Latest events from your store</p>
                  </div>
                  <a href="#" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                    View all <ArrowUpRight size={16} />
                  </a>
                </div>
                
                <div className="space-y-6">
                   {[
                     { title: "New order placed", desc: "Emma Wilson purchased Pro Dashboard License", time: "2 min ago", icon: ShoppingCart, bg: "bg-blue-50 text-blue-600" },
                     { title: "New customer registered", desc: "James Chen created an account", time: "15 min ago", icon: Users, bg: "bg-teal-50 text-teal-600" },
                     { title: "5-star review received", desc: '"Amazing template, exactly what I needed!"', time: "1 hour ago", icon: MessageSquare, bg: "bg-pink-50 text-pink-600" },
                     { title: "Payment received", desc: "$1,499 from Sofia Garcia", time: "2 hours ago", icon: FileText, bg: "bg-indigo-50 text-indigo-600" },
                   ].map((activity, i) => (
                     <div key={i} className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${activity.bg}`}>
                           <activity.icon size={18} />
                        </div>
                        <div>
                           <p className="font-medium text-sm text-gray-900">{activity.title}</p>
                           <p className="text-xs text-gray-500 mt-0.5">{activity.desc}</p>
                           <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}