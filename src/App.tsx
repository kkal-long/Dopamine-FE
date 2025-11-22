// App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutWithFooter from "@/layouts/LayoutWithFooter";
import MainLayout from "@/layouts/MainLayout";

// 메인(홈)
import HomePage from "@/pages/home/HomePage";

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
import MyPage from "@/pages/my/MyPage";
import NewAutionPage from "@/pages/my/NewAutionPage";
import PointInquiryPage from "@/pages/my/PointInquiryPage";

// 알림
import AlarmPage from "@/pages/alarm/AlarmPage";

// 기타
import ChatPage from "@/pages/chat/ChatPage";
import LoginPage from "@/pages/login/LoginPage";
import NotFoundPage from "@/pages/notFound/NotFoundPage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Footer가 필요한 화면 */}
          <Route element={<LayoutWithFooter />}>
            <Route index element={<HomePage />} />

            <Route path="items" element={<BidItemPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="search/result" element={<SearchResultPage />} />
            <Route
              path="search/category-select"
              element={<CategorySelectPage />}
            />
            <Route
              path="search/category-search"
              element={<CategorySearchPage />}
            />
            <Route
              path="search/category-result"
              element={<CategoryResultPage />}
            />
            <Route path="my" element={<MyPage />} />
          </Route>

          {/* Footer가 필요 없는 화면 */}
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="item/:id" element={<ItemDetailPage />} />
          <Route path="chat/:id" element={<ChatPage />} />
          <Route path="my/points" element={<PointInquiryPage />} />
          <Route path="my/points/charge" element={<ChargePointPage />} />
          <Route path="my/item/new" element={<NewAutionPage />} />

          {/* 알림 */}
          <Route path="alarm" element={<AlarmPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
