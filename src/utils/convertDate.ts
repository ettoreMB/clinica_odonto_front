import dayjs from "dayjs";

export const convertDate = (date: any) => { return dayjs(date).format('DD/MM/YY') }