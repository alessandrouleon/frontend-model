const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = -30;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export const listPermision = [
    { name: "ADMIN" },
    { name: "CLIENT_ADMIN" },
    { name: "USER" },
    { name: "MANAGER" },
    { name: "GUEST" },
];