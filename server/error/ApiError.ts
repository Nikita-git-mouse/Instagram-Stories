class ApiError extends Error{
    private status: any;
    constructor(status: number, message: string) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message: string){
        return new ApiError(404, message)
    }
    static internal(message: string){
        return new ApiError(500, message)
    }
    static forbiden(message: string){ // доступ отстутвует
        return new ApiError(403, message)
    }
}

module.exports = ApiError
