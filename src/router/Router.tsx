import { createBrowserRouter } from "react-router-dom";

import LayoutWithFooter from "@/layouts/LayoutWithFooter";
import MainLayout from "@/layouts/MainLayout";

// 메인(홈)
import HomePage from "@/pages/home/HomePage";

// 로그인
import AdditionalInfoPage from "@/pages/login/AdditionalInfoPage";
import KakaoRedirectPage from "@/pages/login/KakaoRedirectPage";
import LoginPage from "@/pages/login/LoginPage";

// 검색
import CategoryResultPage from "@/pages/search/CategoryResultPage";
import CategorySearchPage from "@/pages/search/CategorySearchPage";
import CategorySelectPage from "@/pages/search/CategorySelectPage";
import SearchPage from "@/pages/search/SearchPage";
import SearchResultPage from "@/pages/search/SearchResultPage";

// 입찰/아이템
import BidItemPage from "@/pages/bidItem/BidItemPage";
import ItemDetailPage from "@/pages/itemDetail/ItemDetailPage";

// 마이/포인트
import ChargePointPage from "@/pages/my/charge/ChargePointPage";
import PaymentFailPage from "@/pages/my/charge/PaymentFailPage";
import PaymentSuccessPage from "@/pages/my/charge/PaymentSuccessPage";
import MyPage from "@/pages/my/MyPage";
import NewAutionPage from "@/pages/my/NewAutionPage";
import PointInquiryPage from "@/pages/my/PointInquiryPage";

// 알림
import AlarmPage from "@/pages/alarm/AlarmPage";

// 기타
import ChatPage from "@/pages/chat/ChatPage";
import NotFoundPage from "@/pages/notFound/NotFoundPage";
import RequireAuth from "@/router/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // 공개 라우트
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "auth/kakao/callback",
        element: <KakaoRedirectPage />,
      },

      // 보호된 라우트
      {
        element: <RequireAuth />,
        children: [
          // Footer가 있는 화면
          {
            element: <LayoutWithFooter />,
            children: [
              { index: true, element: <HomePage /> },
              { path: "items", element: <BidItemPage /> },
              { path: "search", element: <SearchPage /> },
              { path: "search/result", element: <SearchResultPage /> },
              {
                path: "search/category-select",
                element: <CategorySelectPage />,
              },
              {
                path: "search/category-search",
                element: <CategorySearchPage />,
              },
              {
                path: "search/category-result",
                element: <CategoryResultPage />,
              },
              { path: "my", element: <MyPage /> },
            ],
          },

          // Footer가 없는 화면
          {
            path: "register/additional-info",
            element: <AdditionalInfoPage />,
          },
          { path: "item/:id", element: <ItemDetailPage /> },
          { path: "chat/:id", element: <ChatPage /> },
          { path: "alarm", element: <AlarmPage /> },
          { path: "my/points", element: <PointInquiryPage /> },
          { path: "my/points/charge", element: <ChargePointPage /> },
          { path: "my/item/new", element: <NewAutionPage /> },
          { path: "/payment/success", element: <PaymentSuccessPage /> },
          { path: "/payment/fail", element: <PaymentFailPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
