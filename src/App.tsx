import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutWithFooter from "@/layouts/LayoutWithFooter";
import MainLayout from "@/layouts/MainLayout";
import BidItemPage from "@/pages/bidItem/BidItemPage";
import ChatPage from "@/pages/chat/ChatPage";
import HomePage from "@/pages/home/HomePage";
import ItemDetailPage from "@/pages/itemDetail/ItemDetailPage";
import AdditionalInfoPage from "@/pages/login/AdditionalInfoPage";
import KakaoRedirectPage from "@/pages/login/KakaoRedirect";
import LoginPage from "@/pages/login/LoginPage";
import ChargePointPage from "@/pages/my/ChargePointPage";
import MyPage from "@/pages/my/MyPage";
import NewAutionPage from "@/pages/my/NewAutionPage";
import PointInquiryPage from "@/pages/my/PointInquiryPage";
import NotFoundPage from "@/pages/notFound/NotFoundPage";
import OnboardingPage from "@/pages/onboarding/OnboardingPage";
import CategoryResultPage from "@/pages/search/CategoryResultPage";
import CategorySearchPage from "@/pages/search/CategorySearchPage";
import CategorySelectPage from "@/pages/search/CategorySelectPage";
import SearchPage from "@/pages/search/SearchPage";
import SearchResultPage from "@/pages/search/SearchResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
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

          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/auth/kakao/callback" element={<KakaoRedirectPage />} />
          <Route
            path="/register/additional-info"
            element={<AdditionalInfoPage />}
          />
          <Route path="item/:id" element={<ItemDetailPage />} />
          <Route path="chat/:id" element={<ChatPage />} />
          <Route path="my/points" element={<PointInquiryPage />} />
          <Route path="my/points/charge" element={<ChargePointPage />} />
          <Route path="my/items/new" element={<NewAutionPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
