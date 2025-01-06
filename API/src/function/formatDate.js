export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate =
        date.toLocaleDateString("ko-KR") +
        " " +
        date.toLocaleTimeString("ko-KR", { hour12: false });
    return formattedDate;
};
