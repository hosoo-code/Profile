"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Account {
  id: string;
  title: string;
  rank: string;
  skins: string;
  price: string;
  imageUrl: string;
  cloudinaryPublicId: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState("");
  const [skins, setSkins] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Accounts
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Profile picture
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfileImageUrl(data.imageUrl || "");
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    setAccountsLoading(true);
    try {
      const res = await fetch("/api/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data);
      }
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
    } finally {
      setAccountsLoading(false);
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check");
        if (res.ok) {
          setAuthenticated(true);
        }
      } catch {
        // not authenticated
      } finally {
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchAccounts();
      fetchProfile();
    }
  }, [authenticated, fetchAccounts, fetchProfile]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        const data = await res.json();
        setLoginError(data.error || "Нууц үг буруу");
      }
    } catch {
      setLoginError("Алдаа гарлаа");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setPassword("");
    router.push("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
      setProfileError("");
      setProfileSuccess("");
    }
  };

  const handleProfileUpload = async () => {
    if (!profileFile) return;
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", profileFile);

      const uploadRes = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Зураг upload хийхэд алдаа гарлаа");
      }

      const { url: imageUrl, publicId: cloudinaryPublicId } =
        await uploadRes.json();

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, cloudinaryPublicId }),
      });

      if (!res.ok) {
        throw new Error("Профайл шинэчлэхэд алдаа гарлаа");
      }

      const { oldPublicId } = await res.json();

      // Clean up the previous Cloudinary image
      if (oldPublicId) {
        await fetch("/api/cloudinary/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId: oldPublicId }),
        });
      }

      setProfileImageUrl(imageUrl);
      setProfileFile(null);
      setProfilePreview("");
      setProfileSuccess("Профайл зураг шинэчлэгдлээ!");
    } catch (err: unknown) {
      setProfileError(
        err instanceof Error ? err.message : "Алдаа гарлаа"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!title || !rank || !skins || !price) {
      setFormError("Бүх талбарыг бөглөнө үү");
      return;
    }

    if (!imageFile) {
      setFormError("Зураг оруулна уу");
      return;
    }

    setSubmitLoading(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Зураг upload хийхэд алдаа гарлаа");
      }

      const { url: imageUrl, publicId: cloudinaryPublicId } =
        await uploadRes.json();

      // Create account
      const accountRes = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          rank,
          skins,
          price,
          imageUrl,
          cloudinaryPublicId,
        }),
      });

      if (!accountRes.ok) {
        throw new Error("Аккаунт үүсгэхэд алдаа гарлаа");
      }

      // Reset form
      setTitle("");
      setRank("");
      setSkins("");
      setPrice("");
      setImageFile(null);
      setImagePreview("");
      setFormSuccess("Аккаунт амжилттай нэмэгдлээ!");

      // Refresh accounts
      fetchAccounts();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Алдаа гарлаа");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (account: Account) => {
    if (!confirm("Энэ аккаунтыг устгахдаа итгэлтэй байна уу?")) return;

    setDeleteLoading(account.id);

    try {
      // Delete from database
      const res = await fetch(`/api/accounts?id=${account.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Устгахад алдаа гарлаа");

      const data = await res.json();

      // Also delete from Cloudinary
      if (data.cloudinaryPublicId) {
        await fetch("/api/cloudinary/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId: data.cloudinaryPublicId }),
        });
      }

      // Refresh
      fetchAccounts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Устгахад алдаа гарлаа");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-white/40 text-sm mt-2">
              Админ панелд нэвтрэх
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Нууц үг"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
              autoFocus
            />
            {loginError && (
              <p className="text-red-400 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading || !password}
              className="w-full px-4 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Нэвтрэх..." : "Нэвтрэх"}
            </button>
          </form>
          <button
            onClick={() => router.push("/")}
            className="w-full mt-4 px-4 py-3 rounded-xl text-white/50 hover:text-white transition-colors text-sm"
          >
            ← Нүүр хуудас руу буцах
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3">
          <h1 className="text-white font-semibold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Сайт харах
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Гарах
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Picture */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Зуучлагчийн профайл зураг
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 bg-white/10 ring-1 ring-white/15">
                {profilePreview || profileImageUrl ? (
                  <Image
                    src={profilePreview || profileImageUrl}
                    alt="Профайл"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30 text-2xl font-semibold">
                    ?
                  </div>
                )}
              </div>

              <div className="flex-1 w-full space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="w-full text-white/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors"
                />
                {profileError && (
                  <p className="text-red-400 text-sm">{profileError}</p>
                )}
                {profileSuccess && (
                  <p className="text-green-400 text-sm">{profileSuccess}</p>
                )}
                <button
                  onClick={handleProfileUpload}
                  disabled={!profileFile || profileLoading}
                  className="px-4 py-2.5 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {profileLoading ? "Хадгалж байна..." : "Профайл зураг солих"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Account Form */}
        <div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Шинэ аккаунт нэмэх
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-1.5">
                  Гарчиг
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Жишээ: Mythic Glory Account"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-1.5">
                  Ранк
                </label>
                <input
                  type="text"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="Жишээ: Mythic 100★"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-1.5">
                  Скин
                </label>
                <input
                  type="text"
                  value={skins}
                  onChange={(e) => setSkins(e.target.value)}
                  placeholder="Жишээ: 250+ скин, Legend 5"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-1.5">
                  Үнэ
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Жишээ: 350,000₮"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-1.5">
                  Зураг
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-white/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors"
                />
                {imagePreview && (
                  <div className="mt-3 relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              {formError && (
                <p className="text-red-400 text-sm">{formError}</p>
              )}
              {formSuccess && (
                <p className="text-green-400 text-sm">{formSuccess}</p>
              )}

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full px-4 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLoading ? "Хадгалж байна..." : "Нэмэх"}
              </button>
            </form>
          </div>
        </div>

        {/* Account List */}
        <div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Нийтэлсэн аккаунтууд ({accounts.length})
            </h2>

            {accountsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white/5 border border-white/10 p-4 animate-pulse"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg bg-white/10 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/10 rounded w-3/4" />
                        <div className="h-3 bg-white/10 rounded w-1/2" />
                        <div className="h-3 bg-white/10 rounded w-1/3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : accounts.length === 0 ? (
              <p className="text-white/40 text-center py-8">
                Одоогоор аккаунт байхгүй байна
              </p>
            ) : (
              <div className="space-y-3">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-3 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white/5">
                      <Image
                        src={account.imageUrl}
                        alt={account.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {account.title}
                      </p>
                      <p className="text-white/40 text-sm truncate">
                        {account.rank} • {account.price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(account)}
                      disabled={deleteLoading === account.id}
                      className="shrink-0 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors disabled:opacity-50"
                    >
                      {deleteLoading === account.id ? "..." : "Устгах"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
