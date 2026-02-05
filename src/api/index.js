import http from '@/request/http';

/** 商品-分类列表（所有） */
export const getCateList = () =>
    http('/car-film/v1/product/cate', {
        method: 'GET',
    });

/** 商品-分类详情 */
export const getCateinfo = ({ id }) =>
    http('/car-film/v1/product/cate-info', {
        method: 'GET',
        params: {
            id,
        },
    });

/** 商品-列表（分页） */
export const getProductIndexApi = (params) =>
    http('/car-film/v1/product/index', {
        method: 'GET',
        params,
    });

/** 商品-商品详情 */
export const getProductInfoApi = (params) =>
    http('/car-film/v1/product/info', {
        method: 'GET',
        params,
    });

/** 质保查询 */
export const getWarrantyQueryApi = (params) =>
    http('/car-film/v1/warranty/query', {
        method: 'GET',
        params,
    });

/** 案例-列表（分页） */
export const getCaseIndexApi = (params) =>
    http('/car-film/v1/case/index', {
        method: 'GET',
        params,
    });

/** 案例-详情 */
export const getCaseInfoApi = (params) =>
    http('/car-film/v1/case/info', {
        method: 'GET',
        params,
    });