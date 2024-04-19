import httpService from "./http.service";

const productEndpoint = "product/";

const productService = {
    update: async (content) => {
        const { data } = await httpService.put(productEndpoint, content);
        return data;
    },

    getProduct: async (_id, content) => {
        const { data } = await httpService.put(productEndpoint + _id, {
            _id,
            ...content
        });
        return data;
    },

    fetchAll: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    create: async (_id, content) => {
        const { data } = await httpService.put(productEndpoint + _id, {
            _id,
            ...content
        });
        return data;
    },

    delete: async (id) => {
        const { data } = await httpService.delete(productEndpoint + id);
        return data;
    }
};

export default productService;
