import { useGlobalLoadingWithReload } from '@/hooks/useGlobalLoadingWithReload'
const { showLoading, hideLoading, showReloadDialog } = useGlobalLoadingWithReload()
export const setupInterceptors = (service) => {
    service.interceptors.request.use(
        (config) => {
            showLoading()
            return config;
        },
        (error) => {
            hideLoading()
            return Promise.reject(error)
        }
    );

    service.interceptors.response.use(
        (response) => {
            hideLoading()
            const { data } = response;
            // ⭐ 成功
            if (data?.code === 200) {
                return data.data;
            }

            // ⭐ 系统错误
            showReloadDialog('Failed to load data. Please refresh the page.')

            // ⭐ 业务错误
            return Promise.reject(data?.message || 'Request failed');
        },
        (error) => {
            // ⭐ 系统错误
            showReloadDialog('Failed to load data. Please refresh the page.')
            return Promise.reject(error);
        }
    );
};
