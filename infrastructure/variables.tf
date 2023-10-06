variable "api_gateway_name" {
  description = "AWS API Gateway to hold all lambda triggers"
  type        = string
  default     = "pluvial-api"
}

variable "api_gateway_stage_name" {
  description = "AWS API Gateway stage name"
  type        = string
  default     = "production"
}

variable "api_gateway_domain_name" {
  description = "AWS API Gateway domain name"
  type        = string
  default     = "api.pluvial.brainiax.com.br"
}

variable "api_gateway_methods" {
  description = "AWS API Gateway lambda method"
  type        = list(string)
  default     = ["GET", "PUT", "OPTIONS", "DELETE", "POST"]
}

variable "api_gateway_paths" {
  description = "AWS API Gateway lambda paths"
  type        = list(string)
  default     = ["shelter"]
}

variable "api_gateway_resources" {
  description = "Path where AWS Lambda will be stored"
  type        = list(string)
  default     = ["api", "chansey", "v1"]
}

variable "lambda_function_name" {
  description = "AWS Lambda function name"
  type        = string
  default     = "chansey-api"
}

variable "lambda_function_description" {
  description = "AWS Lambda function description"
  type        = string
  default     = "Chansey API Lambda function"
}

variable "lambda_function_handler" {
  description = "AWS Lambda function handler"
  type        = string
  default     = "index.handler"
}

variable "lambda_function_source_code_path" {
  description = "Path where AWS Lambda source code will be stored"
  type        = string
  default     = "../dist"
}

variable "lambda_function_output_path" {
  description = "Path where AWS Lambda output will be stored"
  type        = string
  default     = "../dist"
}

variable "lambda_function_env" {
  description = "AWS Lambda environment variables"
  type        = map(string)
  default     = {}
}
