output "base_url" {
  value = aws_api_gateway_deployment.api_gateway_deployment.invoke_url
}

output "lambda_function_arn" {
  value = aws_lambda_function.lambda_function.arn
}