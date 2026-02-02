export const setupInterceptors = (service) => {
    service.interceptors.request.use(
        (config) => {
            return config;
        },
        (error) => Promise.reject(error)
    );

    service.interceptors.response.use(
        (response) => {
            const { data } = response;

            // ⭐ 成功
            if (data?.code === 200) {
                return data.data;
            }

            // ⭐ 业务错误
            return Promise.reject(data?.message || '接口错误');
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};
