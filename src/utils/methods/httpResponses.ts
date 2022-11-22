import {GenericServiceResponse, GenericServiceErrorResponse} from '../interfaces'

export const status200Ok = (responseBody: any, resourceFound?: String, detailMessage?: String, isPut = false): GenericServiceResponse => {
  if(!resourceFound || resourceFound.length === 0){
    return {
      httpStatus: 202,
      serverMessage: !isPut ? 'Resource found' : 'Resource updated',
      moreDetails: { responseMessage: detailMessage },
      responseBody: responseBody
    }
  }
  return {
    httpStatus: 200,
    serverMessage: !isPut ? `Resource ${resourceFound} found` : `Resource ${resourceFound} updated`,
    moreDetails: { responseMessage: detailMessage },
    responseBody: responseBody
  }
}

export const status201Created = (responseBody: any, resourceCreated?: String, detailMessage?: String): GenericServiceResponse => {
  if(!resourceCreated || resourceCreated.length === 0){
    return {
      httpStatus: 201,
      serverMessage: 'Resource created',
      moreDetails: {responseMessage: detailMessage},
      responseBody: responseBody
    }
  }
  return{
    httpStatus: 201,
    serverMessage: `Resource ${resourceCreated} created`,
    moreDetails: {responseMessage: detailMessage},
    responseBody: responseBody
  }
}

export const status400BadRequest = (motiveBadRequest?: String, detailMessage?: String | Array<any>): GenericServiceErrorResponse =>{
  if(!motiveBadRequest || motiveBadRequest.length === 0){
    return {
      httpStatus: 400,
      serverMessage: 'Bad request',
      errorMessage: detailMessage 
    }
  }
  return {
    httpStatus: 400,
    serverMessage: `Bad request: ${motiveBadRequest}`,
    errorMessage: detailMessage 
  }
}

export const status401Unauthorized = (reason?: String, detailMessage?: String): GenericServiceErrorResponse => {
  if(!reason){
    return {
      httpStatus: 401,
      serverMessage: "Unauthorized",
      errorMessage: detailMessage
    }
  }
  return {
    httpStatus: 401,
    serverMessage: `Unauthorized: ${reason}`,
    errorMessage: detailMessage
  }
}

export const status404NotFound = (resourceNotFound?: String, detailMessage?: String):GenericServiceErrorResponse => {
  return {
    httpStatus: 404,
    serverMessage: `Resource ${resourceNotFound} not found`,
    errorMessage: detailMessage    
  }
}

export const status500InternalServerError = (detailMessage?: String): GenericServiceErrorResponse => {
  return {
    httpStatus: 500,
    serverMessage: 'Internal server error',
    errorMessage: detailMessage
  }
}