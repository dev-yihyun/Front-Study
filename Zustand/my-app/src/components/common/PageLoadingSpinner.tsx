import React from "react";
import { Spinner } from "../ui/spinner";

/**
 * 특정 UI 영역(페이지 일부, 모달, API 요청 결과 등)이 로딩 중일 때 사용
 * 단순히 중앙에 스피너만 배치 (flex h-screen items-center justify-center)
 * - API 요청 중
 * - 모달 내부 데이터 로딩
 * - 일부 섹션/컴포넌트 로딩 표시
 * @returns 페이지 전용 로딩 화면
 */
function PageLoadingSpinner() {
    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner className="size-8 text-gray-700" />
        </div>
    );
}

export default React.memo(PageLoadingSpinner);
