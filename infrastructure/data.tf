data "aws_api_gateway_rest_api" "api_gateway" {
  name = var.api_gateway_name
}

data "aws_api_gateway_resource" "api_gateway_resource_n1" {
  rest_api_id = data.aws_api_gateway_rest_api.api_gateway.id
  path        = "/${var.api_gateway_resources[0]}"
}