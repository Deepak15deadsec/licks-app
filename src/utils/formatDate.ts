export const formatDate = (date: any) => {
    

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${year}-${month}`;
};