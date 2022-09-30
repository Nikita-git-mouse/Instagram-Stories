class ApiError extends Error{
    private status: any;
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message){
        return new ApiError(404, message)
    }
    static internal(message){
        return new ApiError(500, message)
    }
    static forbiden(message){ // доступ отстутвует
        return new ApiError(403, message)
    }
}

module.exports = ApiError