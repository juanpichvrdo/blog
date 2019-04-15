export const POST_STATE = {
    deleted: 0,
    published: 1,
    draft: 2
};

export function formatDate(date) {
    return moment(date, "YYYY-MM-DD HH:mm:ss").fromNow();
}

export function currentDate() {
    return moment().format("YYYY-MM-DD HH:mm:ss");
}

export const MAX_LIST_SIZE = 5;
