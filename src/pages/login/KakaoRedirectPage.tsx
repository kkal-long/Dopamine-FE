import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useAuthApi } from "@/hooks/auth/useAuthApi";
import { useAuthStore } from "@/store/useAuthStore";

// 쿠키 문자열에서 특정 이름의 쿠키 값을 추출하는 함수
const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const KakaoRedirectPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authLogin = useAuthStore(state => state.login);
  const { getUserProfileMutation } = useAuthApi();

  const isProcessing = useRef(false);

  useEffect(() => {
    if (isProcessing.current) return;

    const accessToken = searchParams.get("token");
    const firstLoginParam = searchParams.get("isFirstLogin");
    const refreshToken = getCookie("refresh_token");

    if (accessToken) {
      isProcessing.current = true;

      authLogin(accessToken, refreshToken || "");

      // refreshToken 쿠키 초기화
      document.cookie =
        "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      if (firstLoginParam === "true") {
        navigate("/register/additional-info", { replace: true });
      } else {
        getUserProfileMutation
          .mutateAsync(undefined)
          .then(() => {
            navigate("/", { replace: true });
          })
          .catch(error => {
            console.error("유저 정보 조회 실패:", error);
            navigate("/login", { replace: true });
          });
      }
    } else {
      console.error("로그인 토큰을 찾을 수 없습니다.");
      navigate("/login", { replace: true });
    }
  }, [navigate, authLogin, searchParams]);

  return <LoadingSpinner />;
};

export default KakaoRedirectPage;
