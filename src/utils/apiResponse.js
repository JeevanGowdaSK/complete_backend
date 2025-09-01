class apiResponse{
    constructor(statusCode,data,message="succes"){
        this.statuscode=statuscode
        this.data=data
        this.message=message
        this.success=statusCode < 400
    }
}