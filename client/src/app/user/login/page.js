"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import LoginModal from "@/components/user/auth/LoginModal";

/**
 * /user/login page — renders the LoginModal directly on the page.
 * If the user is already logged in they are bounced to the redirect target.
 * The modal's onClose here navigates back (or to /user) so the UX
 * still makes sense when someone lands on the URL directly.
 */
export default function UserLoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { token, hydrated } = useSelector((s) => s.userAuth);

  const redirectTo = searchParams.get("redirect") || "/user";

  // Already logged in → bounce
  useEffect(() => {
    if (hydrated && token) router.replace(redirectTo);
  }, [hydrated, token, redirectTo, router]);

  const handleClose = () => {
    // If there's a referrer / history entry go back, otherwise go home
    if (window.history.length > 1) router.back();
    else router.replace("/user");
  };

  const handleSuccess = () => router.replace(redirectTo);

  return (
    /* Page background so the modal sits over something meaningful */
    <div className="min-h-[80vh] bg-gray-50">
      <LoginModal
        isOpen={true}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
