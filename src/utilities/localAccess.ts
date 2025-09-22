const access = (function () {
    let navigation: any = null;
    let isOnline: boolean = true;
    let logout: any = null
    
    const setNavigationAccess = function(val: any) {
        navigation = val
    }
    const getNavigationAccess = function() {
        return navigation;
    }
    const setInternetStatus = function(val: boolean) {
        isOnline = val
    }
    const getInternetStatus = function() {
        return isOnline;
    }
    const setLogoutHandler = function(val: any) {
        logout = val
    }

    const getLogoutHandler = function() {
        return logout;
    }

    return {
        setNavigationAccess,
        getNavigationAccess,
        setInternetStatus,
        getInternetStatus,
        setLogoutHandler,
        getLogoutHandler
    }
})()

export default access