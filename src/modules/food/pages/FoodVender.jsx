import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────
import FoodVendorMealCategory from "../components/FoodVendor/FoodVendorMealCategory";
import FoodVendorProducts from "@/modules/food/containers/FoodVendor/FoodVendorProducts";
import FoodVendorHeader from "../components/FoodVendor/FoodVendorHeader";
import PaginationButtons from "@/shared/components/common/PaginationButtons";

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────
import { useVendorFoodsLivePaginated } from "../services/hooks/useLiveGetAllProductsPaginated";
import { useLiveGetCategoriesFromVendor } from "../services/hooks/useLiveGetCategoriesFromVendor";
import useBannersGallery from "../services/hooks/useBannersGallery";
import { useCurrentVendorLiveData } from "../services/hooks/useCurrentVendorLiveData";

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────
/** Returns localized field value if Arabic is active; falls back to default. */
const getLocalizedField = (item, field, isArabic) => (isArabic ? item?.[`${field}Arabic`] || item?.[field] : item?.[field]);

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const DESKTOP_PAGE_SIZE = 12;
const TABLET_PAGE_SIZE = 10;

/**
 * FoodVendor Page
 * - Shows a vendor header, category chips, product list, and pagination.
 * - Live-paginated foods from Firestore, client-side filter/search/sort per page.
 */
const FoodVendor = () => {
    // ── Routing & i18n ─────────────────────────────────────────────────────────
    const { vendorId } = useParams();
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    // ── Responsive page size ───────────────────────────────────────────────────
    const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);
    useEffect(() => {
        const updatePageSize = () => {
            setPageSize(window.innerWidth < 1524 ? TABLET_PAGE_SIZE : DESKTOP_PAGE_SIZE);
        };
        updatePageSize(); // initial
        window.addEventListener("resize", updatePageSize);
        return () => window.removeEventListener("resize", updatePageSize);
    }, []);

    // ── Global state (Redux) ───────────────────────────────────────────────────
    const { selectedVendorMealCategory, searchTerm, sortOption } = useSelector((state) => state.food);

    // ── Local UI state ─────────────────────────────────────────────────────────
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const productsRef = useRef(null);
    const scrollToProducts = () => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Reset to page 0 whenever filters change to avoid empty screens on later pages
    useEffect(() => {
        setCurrentPageIndex(0);
    }, [selectedVendorMealCategory, searchTerm, sortOption, pageSize]);

    // ─────────────────────────────────────────────────────────────────────────────
    // Hooks Destructuring
    // ─────────────────────────────────────────────────────────────────────────────
    // ── Data: Vendors list & Current vendor ────────────────────────────────────
    const { data: currentVendor, isLoading: isVendorLoading } = useCurrentVendorLiveData(vendorId);
    const {
        pages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isFoodsLoading,
    } = useVendorFoodsLivePaginated(currentVendor?.id, selectedVendorMealCategory, pageSize);
    const { categories: vendorCategories, loading: isCategoryLoading } = useLiveGetCategoriesFromVendor(currentVendor?.id);

    // Data: Vendor banner ────────────────────────────────────────
    const { banners: vendorBanners, loading: isBannerLoading } = useBannersGallery(currentVendor?.id);
    console.log(vendorBanners,"vendor banners check")

    // ── Derived loading flags ──────────────────────────────────────────────────
    const isHeaderLoading = isCategoryLoading || isVendorLoading || isBannerLoading;
    const isProductsLoading = isFoodsLoading || isVendorLoading;

    // ── Pagination handlers ────────────────────────────────────────────────────
    const handleNext = useCallback(() => {
        const totalPages = pages?.length || 0;

        if (currentPageIndex + 1 < totalPages) {
            setCurrentPageIndex((prev) => prev + 1);
            scrollToProducts();
            return;
        }

        if (hasNextPage) {
            // If next page exists on server, fetch then step forward
            Promise.resolve(fetchNextPage()).then(() => {
                setCurrentPageIndex((prev) => prev + 1);
                scrollToProducts();
            });
        }
    }, [currentPageIndex, pages?.length, hasNextPage, fetchNextPage]);

    const handlePrevious = useCallback(() => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex((prev) => prev - 1);
            scrollToProducts();
        }
    }, [currentPageIndex]);

    const isNextDisabled = (!hasNextPage && currentPageIndex === (pages?.length || 0) - 1) || isFetchingNextPage;

    // ── Filtering / Searching / Sorting (client-side per page) ─────────────────
    const filteredFoods = useMemo(() => {
        const currentFoods = pages?.[currentPageIndex]?.foods || [];
        let result = currentFoods;

        // Category filter (skip if "All" or falsy)
        if (selectedVendorMealCategory && selectedVendorMealCategory !== "All") {
            result = result.filter((food) => food?.category === selectedVendorMealCategory);
        }

        // Search (localized fields)
        if (searchTerm?.trim()) {
            const lower = searchTerm.toLowerCase();
            result = result.filter((food) =>
                ["name", "description", "category"].some((field) =>
                    getLocalizedField(food, field, isArabic)?.toLowerCase().includes(lower)
                )
            );
        }

        // Sort
        if (sortOption === "lowToHigh") {
            result = [...result].sort((a, b) => (a.itemPrice ?? 0) - (b.itemPrice ?? 0));
        } else if (sortOption === "highToLow") {
            result = [...result].sort((a, b) => (b.itemPrice ?? 0) - (a.itemPrice ?? 0));
        }

        return result;
    }, [pages, currentPageIndex, selectedVendorMealCategory, searchTerm, sortOption, isArabic]);

    // Respect the dynamic page size for the visible grid
    const visibleFoods = useMemo(() => filteredFoods.slice(0, pageSize), [filteredFoods, pageSize]);

    // ── Memoized bits for cheap props ──────────────────────────────────────────
    const memoizedLogo = useMemo(() => currentVendor?.image, [currentVendor?.image]);
    const memoizedIsOnline = useMemo(() => currentVendor?.isOnline, [currentVendor?.isOnline]);

    // ── Early guard: vendor not found ──────────────────────────────────────────
    if (!isVendorLoading && !currentVendor) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="max-w-lg w-full text-center">
                    <h2 className="text-2xl font-semibold mb-2">
                        {isArabic ? "لم يتم العثور على المطعم" : "Vendor not found"}
                    </h2>
                    <p className="text-gray-500">
                        {isArabic ? "تحقق من الرابط أو جرب مرة أخرى لاحقًا." : "Please check the link or try again later."}
                    </p>
                </div>
            </div>
        );
    }

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gradient-to-br" dir={isArabic ? "rtl" : "ltr"}>
            {/* Header */}
            <FoodVendorHeader vendorBanners={vendorBanners} isLoading={isHeaderLoading} currentVendor={currentVendor} />

            {/* Body */}
            <div className="overflow-y-hidden bg-white rounded-t-2xl z-30 -mt-4 scrollbar-hide">
                <div ref={productsRef} className="bg-white shadow-xl p-4">
                    {/* Category Chips */}
                    <FoodVendorMealCategory
                        setCurrentPageIndex={setCurrentPageIndex}
                        isOnline={memoizedIsOnline}
                        isLoading={isHeaderLoading}
                        categories={vendorCategories}
                        selectedCategory={selectedVendorMealCategory}
                    />

                    {/* Product Grid */}
                    <FoodVendorProducts
                        isLoading={isProductsLoading}
                        isOnline={memoizedIsOnline}
                        foodItems={visibleFoods}
                        isArabic={isArabic}
                        venderLogo={memoizedLogo}
                    />

                    {/* Pagination */}
                    {!isProductsLoading && (
                        <PaginationButtons
                            isOnline={memoizedIsOnline}
                            currentPageIndex={currentPageIndex}
                            handleNext={handleNext}
                            handlePrevious={handlePrevious}
                            isArabic={isArabic}
                            isFetchingNextPage={isFetchingNextPage}
                            isNextDisabled={isNextDisabled}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodVendor;
