export const categoriesObject = {
    electronics: { _id: "65ce80c2eeeac84ae1ae5fdf", name: "Электроника" },
    jewelery: { _id: "65ce80c2eeeac84ae1ae5fe0", name: "Ювилирные изделия" },
    men_clothing: { _id: "65ce80c2eeeac84ae1ae5fe1", name: "Мужская одежда" },
    women_clothing: { _id: "65ce80c2eeeac84ae1ae5fe2", name: "Женская одежда" },
    foldsack: { _id: "65ce80c2eeeac84ae1ae5fe3", name: "Рюкзак" }
};
export const categories = [
    { _id: "65ce80c2eeeac84ae1ae5fdf", name: "Электроника" },
    { _id: "65ce80c2eeeac84ae1ae5fe0", name: "Ювилирные изделия" },
    { _id: "65ce80c2eeeac84ae1ae5fe1", name: "Мужская одежда" },
    { _id: "65ce80c2eeeac84ae1ae5fe2", name: "Женская одежда" },
    { _id: "65ce80c2eeeac84ae1ae5fe3", name: "Рюкзак" }
];
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(categories);
        }, 2000);
    });

export default {
    fetchAll
};
