import React from "react";
import { Spinner } from "../ui/spinner";

/**
 * 전체 화면 덮는 오버레이 로딩
 * 페이지 전체 전환 또는 SSR 대기 중 화면 전체를 덮는 로딩
 * 반투명 배경 + 화면 전체 덮음 (fixed inset-0 bg-white/70)
 * - Next.js 페이지 전환 중
 * - SSR 데이터 로딩 중
 * - 전역 라우트 변경 감지 시
 * @returns 전체 화면 덮는 오버레이 로딩
 */
function LoadingOverlay() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-[9999]">
            <Spinner className="size-8 text-gray-700" />
        </div>
    );
}

export default React.memo(LoadingOverlay);
