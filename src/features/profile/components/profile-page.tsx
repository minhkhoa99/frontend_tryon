'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserCircle, Phone, Mail, MapPin, ShieldCheck, Package, Heart, Ruler, Pencil, Check, X } from 'lucide-react'
import { useProfile } from '@/features/profile/hooks/use-profile'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { convertTimeZone } from '@/shared/lib/date'
import type { UserProfile } from '@/app/api/profile/route'

const sidebarItems = [
  { id: 'profile', label: 'Hồ sơ', href: '/profile', active: true },
  { id: 'metrics', label: 'Số đo cá nhân', href: '/profile/body-metrics' },
  { id: 'orders', label: 'Đơn hàng', href: '/orders' },
  { id: 'wishlist', label: 'Wishlist', href: '/wishlist' },
]

// ---------------------------------------------------------------------------
// Edit form
// ---------------------------------------------------------------------------
function EditProfileForm({
  profile,
  onSaved,
  onCancel,
}: {
  profile: UserProfile
  onSaved: (updated: UserProfile) => void
  onCancel: () => void
}) {
  const [fullName, setFullName] = useState(profile.full_name)
  const [email, setEmail] = useState(profile.email ?? '')
  const [address, setAddress] = useState(profile.address)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ full_name: fullName, email, address }),
      })
      const body = await res.json()

      if (!res.ok || !body.success) {
        setError(body.message ?? 'Cập nhật thất bại')
        return
      }

      // Merge updated fields back into profile
      onSaved({ ...profile, full_name: fullName, email: email || null, address })
    } catch {
      setError('Lỗi kết nối')
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'h-[46px] w-full rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 text-[14px] text-[#f4ece7] outline-none focus:border-[#d89aae]/50 transition'

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
      <p className="mb-4 text-[13px] font-semibold text-[#a79f9a] uppercase tracking-wider">
        Chỉnh sửa thông tin
      </p>

      {error && (
        <p className="mb-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-[13px] text-red-400">{error}</p>
      )}

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] text-[#6b6560]">Họ và tên</span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập họ và tên"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] text-[#6b6560]">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] text-[#6b6560]">Địa chỉ</span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ"
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#f6d2db] to-[#d89aae] px-5 py-2.5 text-[13px] font-semibold text-[#140e12] disabled:opacity-60"
        >
          <Check size={14} />
          {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-[13px] text-[#a79f9a] transition hover:text-[#e0d8d4]"
        >
          <X size={14} />
          Huỷ
        </button>
      </div>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export function ProfilePage() {
  const state = useProfile()
  const { logout, isLoading: isLoggingOut } = useAuth()
  const [editing, setEditing] = useState(false)
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null)

  const profile = localProfile ?? (state.status === 'success' ? state.data : null)

  return (
    <main className="min-h-screen bg-[#090a0e] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden w-52 shrink-0 lg:block">
            <p className="mb-4 text-[11px] font-semibold tracking-widest text-[#6b6560] uppercase">
              Tài khoản của tôi
            </p>
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`rounded-xl px-4 py-2.5 text-[13px] font-medium transition ${
                    item.active
                      ? 'bg-white/[0.07] text-[#f4ece7]'
                      : 'text-[#a79f9a] hover:bg-white/[0.04] hover:text-[#e0d8d4]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {state.status === 'loading' && (
              <div className="flex items-center justify-center py-24">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d89aae] border-t-transparent" />
              </div>
            )}

            {state.status === 'error' && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-5 text-[14px] text-red-400">
                {state.message}
              </div>
            )}

            {profile && (
              <div className="flex flex-col gap-6">
                {/* Avatar + name */}
                <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-[#f6d2db] to-[#d89aae]">
                    <UserCircle size={32} className="text-[#140e12]" />
                  </div>
                  <div>
                    <p className="text-[18px] font-semibold text-[#f4ece7]">
                      {profile.full_name || profile.phone}
                    </p>
                    <p className="mt-0.5 text-[13px] text-[#a79f9a]">{profile.phone}</p>
                    <p className="mt-0.5 text-[11px] text-[#6b6560]">ID: {profile.uuid}</p>
                  </div>
                  <span className={`ml-auto rounded-full px-3 py-1 text-[11px] font-medium ${
                    profile.status === 'active'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {profile.status === 'active' ? 'Hoạt động' : profile.status}
                  </span>
                </div>

                {/* Info / Edit form */}
                {editing ? (
                  <EditProfileForm
                    profile={profile}
                    onSaved={(updated) => {
                      setLocalProfile(updated)
                      setEditing(false)
                    }}
                    onCancel={() => setEditing(false)}
                  />
                ) : (
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-[13px] font-semibold text-[#a79f9a] uppercase tracking-wider">
                        Thông tin cá nhân
                      </p>
                      <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-[#a79f9a] transition hover:border-[#d89aae]/40 hover:text-[#e0d8d4]"
                      >
                        <Pencil size={12} />
                        Chỉnh sửa
                      </button>
                    </div>
                    <div className="flex flex-col gap-4">
                      <InfoRow
                        icon={<UserCircle size={15} />}
                        label="Họ và tên"
                        value={profile.full_name || '—'}
                      />
                      <InfoRow
                        icon={<Phone size={15} />}
                        label="Số điện thoại"
                        value={profile.phone}
                        badge={profile.phone_verified ? 'Đã xác thực' : 'Chưa xác thực'}
                        badgeOk={profile.phone_verified}
                      />
                      <InfoRow
                        icon={<Mail size={15} />}
                        label="Email"
                        value={profile.email ?? '—'}
                      />
                      <InfoRow
                        icon={<MapPin size={15} />}
                        label="Địa chỉ"
                        value={profile.address || '—'}
                      />
                      <InfoRow
                        icon={<ShieldCheck size={15} />}
                        label="Ngày tham gia"
                        value={convertTimeZone(profile.created_at)}
                      />
                    </div>
                  </div>
                )}

                {/* Quick links */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { icon: <Package size={16} />, label: 'Đơn hàng', href: '/orders' },
                    { icon: <Heart size={16} />, label: 'Wishlist', href: '/wishlist' },
                    { icon: <Ruler size={16} />, label: 'Số đo AI', href: '/profile/body-metrics' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-[13px] text-[#c9c2bc] transition hover:bg-white/[0.07] hover:text-[#f4ece7]"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Logout */}
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() => void logout()}
                  className="self-start rounded-full border border-red-500/20 bg-red-500/5 px-5 py-2.5 text-[13px] text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoRow({
  icon,
  label,
  value,
  badge,
  badgeOk,
}: {
  icon: React.ReactNode
  label: string
  value: string
  badge?: string
  badgeOk?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[#6b6560]">{icon}</span>
      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-[11px] text-[#6b6560]">{label}</span>
        <span className="text-[14px] text-[#e0d8d4]">{value}</span>
      </div>
      {badge && (
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
          badgeOk ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
        }`}>
          {badge}
        </span>
      )}
    </div>
  )
}
