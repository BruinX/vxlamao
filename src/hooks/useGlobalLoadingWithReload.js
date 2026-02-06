import { ElLoading, ElMessageBox } from 'element-plus'

let loadingInstance = null
let dialogVisible = false

export const useGlobalLoadingWithReload = () => {
    const showLoading = (text = 'Loading...') => {
        if (loadingInstance) return
        loadingInstance = ElLoading.service({
            lock: true,
            text,
            background: 'rgba(0, 0, 0, 0.6)',
        })
    }

    const hideLoading = () => {
        loadingInstance?.close()
        loadingInstance = null
    }

    const showReloadDialog = (message) => {
        if (dialogVisible) return
        dialogVisible = true

        ElMessageBox.confirm(
            message ||
            'A network error occurred. Would you like to refresh the page and try again?',
            'Network Error',
            {
                confirmButtonText: 'Refresh',
                cancelButtonText: 'Cancel',
                type: 'error',
                closeOnClickModal: false,
                closeOnPressEscape: false,
            }
        )
            .then(() => {
                window.location.reload()
            })
            .finally(() => {
                dialogVisible = false
            })
    }

    return {
        showLoading,
        hideLoading,
        showReloadDialog,
    }
}
